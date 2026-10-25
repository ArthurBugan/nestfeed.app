// scripts/gen-static-landing.mjs
// Post-build step: turns the SSR landing page into a react-free static
// document served at "/" by server/landing-middleware.ts (nitro middleware).
//
// Flow:
//   1. remove any previously generated static landing from .output/public so
//      that GET "/" falls through the middleware to the SSR renderer
//   2. boot the built server on a scratch port and fetch the SSR HTML
//   3. strip the hydration pipeline (module scripts, modulepreloads, TSR
//      runtime) but keep the next-themes bootstrap script
//   4. inject the vanilla interactivity island + inline pt/es translations
//   5. write the result to .output/public and the repo's public/ dir, with
//      brotli + gzip pre-compressed variants
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { transform } from "esbuild";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, ".output", "public");
// Use a fresh scratch port every run — a stale preview server from a previous
// build would otherwise serve SSR HTML with outdated asset hashes.
const PORT = 20000 + Math.floor(Math.random() * 20000);
const BASE = `http://127.0.0.1:${PORT}`;

const removedFiles = ["index.html", "index.html.br", "index.html.gz"];
for (const name of removedFiles) {
	fs.rmSync(path.join(OUT, name), { force: true });
}

function log(...parts) {
	console.log("[static-landing]", ...parts);
}

// ---------------------------------------------------------------------------
// 1. Tracker tokens — extracted from lib/analytics.ts so there is one source
// ---------------------------------------------------------------------------
const analyticsSrc = fs.readFileSync(
	path.join(ROOT, "lib", "analytics.ts"),
	"utf8",
);
function grab(re) {
	const found = analyticsSrc.match(re);
	if (!found) {
		throw new Error(`tracking token not found: ${re}`);
	}
	return found[1];
}
const TOKENS = {
	GTM_ID: grab(/GTM_ID = "([^"]+)"/),
	GA_ID: grab(/GA_ID = "([^"]+)"/),
	ADSENSE_CLIENT: grab(/ADSENSE_CLIENT = "([^"]+)"/),
	CLARITY_ID: process.env.VITE_CLARITY_PROJECT_ID ?? "",
	RYBBIT_HOST: grab(/RYBBIT_HOST = "([^"]+)"/),
	RYBBIT_SITE_ID: grab(/RYBBIT_SITE_ID = "([^"]+)"/),
};

// ---------------------------------------------------------------------------
// 2. Translation dictionaries (en values -> key, pt/es values keyed)
// ---------------------------------------------------------------------------
const enMod = await import(
	pathToFileURL(path.join(ROOT, "components", "translations", "en.ts")).href
);
const ptMod = await import(
	pathToFileURL(path.join(ROOT, "components", "translations", "pt.ts")).href
);
const esMod = await import(
	pathToFileURL(path.join(ROOT, "components", "translations", "es.ts")).href
);
const en = enMod.translations;
const pt = ptMod.translations;
const es = esMod.translations;

// Keys used by the landing surfaces (header/footer/consent included).
const keySets = [
	"components/landing-page.tsx",
	"components/compact-header.tsx",
	"components/site-footer.tsx",
	"components/cookie-consent.tsx",
];
const usedKeys = new Set();
for (const rel of keySets) {
	const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
	for (const match of src.matchAll(/\bt\(\s*(["'`])([^"'`]+)\1/g)) {
		usedKeys.add(match[2]);
	}
}
const collisions = new Map();
const enValueMap = {}; // english value -> key
const enKeyDict = {}; // key -> english value
const ptDict = {};
const esDict = {};
for (const key of usedKeys) {
	const value = en[key];
	if (typeof value !== "string") continue; // key not part of the landing dict
	enKeyDict[key] = value;
	if (enValueMap[value] && enValueMap[value] !== key) {
		collisions.set(value, [enValueMap[value], key]);
		continue; // first key wins; log below
	}
	enValueMap[value] = key;
	ptDict[key] = pt[key] ?? null;
	esDict[key] = es[key] ?? null;
}
if (collisions.size) {
	log(
		`warning: ${collisions.size} english value collisions in key map:`,
		[...collisions.entries()].slice(0, 6),
	);
}
const dictJson = JSON.stringify({
	map: enValueMap,
	en: enKeyDict,
	pt: ptDict,
	es: esDict,
}).replaceAll("</", "<\\/");

// ---------------------------------------------------------------------------
// 3. Island script — minified, tracker constants substituted
// ---------------------------------------------------------------------------
let islandCode = fs.readFileSync(
	path.join(ROOT, "scripts", "static-island.js"),
	"utf8",
);
for (const [key, value] of Object.entries(TOKENS)) {
	islandCode = islandCode.replaceAll(`__${key}__`, value);
}
if (islandCode.includes("__GTM") || islandCode.includes("__GA_")) {
	throw new Error("island still contains unsubstituted token placeholders");
}
if (islandCode.includes("</scr")) {
	throw new Error("island script may not contain </script literals");
}
const minified = await transform(islandCode, {
	loader: "js",
	minify: true,
	target: "es2020",
});
const island = minified.code;

// ---------------------------------------------------------------------------
// 4. Vendor @rybbit/js (+ rrweb) for the consent-gated analytics import
// ---------------------------------------------------------------------------
fs.mkdirSync(path.join(ROOT, "public", "lib"), { recursive: true });
const rybbitSrc = path.join(
	ROOT,
	"node_modules",
	"@rybbit",
	"js",
	"dist",
	"index.mjs",
);
if (fs.existsSync(rybbitSrc)) {
	let rybbit = fs.readFileSync(rybbitSrc, "utf8");
	rybbit = rybbit.replaceAll('import("rrweb")', 'import("/lib/rrweb.js")');
	fs.writeFileSync(path.join(ROOT, "public", "lib", "rybbit.mjs"), rybbit);
} else {
	log("warning: @rybbit/js not installed — /lib/rybbit.mjs left untouched");
}
const rrwebSrc = path.join(ROOT, "node_modules", "rrweb", "dist", "rrweb.js");
if (fs.existsSync(rrwebSrc)) {
	fs.copyFileSync(rrwebSrc, path.join(ROOT, "public", "lib", "rrweb.js"));
} else {
	log("warning: rrweb not installed — /lib/rrweb.js left untouched");
}

// ---------------------------------------------------------------------------
// 5. Boot built server, fetch SSR document
// ---------------------------------------------------------------------------
async function waitForServer(proc, deadlineMs = 25000) {
	const start = Date.now();
	while (Date.now() - start < deadlineMs) {
		if (proc.exitCode !== null) {
			throw new Error(`preview server exited early with ${proc.exitCode}`);
		}
		try {
			const res = await fetch(`${BASE}/`, {
				headers: { "x-ssr-bypass": "static-gen" },
			});
			if (res.ok && (res.headers.get("content-type") ?? "").includes("html")) {
				return await res.text();
			}
		} catch {
			/* not up yet */
		}
		await new Promise((resolve) => setTimeout(resolve, 250));
	}
	throw new Error("preview server did not become ready in time");
}

function bootPreview() {
	return new Promise((resolve, reject) => {
		const proc = spawn("bun", ["run", ".output/server/index.mjs"], {
			cwd: ROOT,
			env: { ...process.env, PORT: String(PORT) },
			stdio: ["ignore", "ignore", "pipe"],
		});
		let stderr = "";
		proc.stderr.on("data", (chunk) => {
			stderr += chunk.toString();
		});
		proc.on("error", reject);
		resolve({ proc, stderr: () => stderr });
	});
}

const { proc } = await bootPreview();
let html;
try {
	html = await waitForServer(proc);
} finally {
	proc.kill("SIGKILL");
	await new Promise((resolve) => {
		proc.on("exit", resolve);
		setTimeout(resolve, 1500).unref?.();
	});
}

// ---------------------------------------------------------------------------
// 6. Strip the hydration pipeline, keep the theme bootstrap
// ---------------------------------------------------------------------------
const before = html;
html = html.replace(/<script\b[^>]*(?:>[\s\S]*?<\/script>|\/>)/gi, (script) => {
	if (/application\/ld\+json/i.test(script)) return script; // SEO structured data
	const body = script.slice(script.indexOf(">") + 1, script.lastIndexOf("<"));
	if (body.includes("storageKey") && body.includes("documentElement")) {
		return script; // next-themes bootstrap (prevents dark-mode flash)
	}
	return "";
});
html = html.replace(/<link\b[^>]*rel=["'](?:modulepreload)["'][^>]*>/gi, "");
html = html.replace(
	/<link\b[^>]*rel=["']preload["'][^>]*as=["']script["'][^>]*>/gi,
	"",
);

// ---------------------------------------------------------------------------
// 7. Inject island + translations before </body>
// ---------------------------------------------------------------------------
const islandTag = `<script>${island}</script>`;
const i18nTag = `<script type="application/json" id="i18n-landing">${dictJson}</script>`;
html = html.replace("</body>", `${i18nTag}${islandTag}</body>`);

// ---------------------------------------------------------------------------
// 8. Sanity checks
// ---------------------------------------------------------------------------
const scriptCount = [...html.matchAll(/<script\b/g)].length;
if (scriptCount !== 3) {
	console.error(
		`expected exactly 3 script tags (theme bootstrap, i18n json, island), found ${scriptCount}`,
	);
	console.error(before.slice(0, 400));
	process.exit(1);
}
if (html.includes("modulepreload")) {
	console.error("modulepreload links survived the strip");
	process.exit(1);
}
// The document must reference THIS build's stylesheet. The SSR stream and the
// copied public assets can disagree on the hash when build environments
// diverge (e.g. stale docker layer caches): anchor the document to the css
// this build actually emitted so the page can never be served unstyled.
const cssLink = html.match(/href="\/assets\/app-([^"']+)\.css"/)?.[1];
const assetsDir = path.join(OUT, "assets");

function emittedCss() {
	try {
		return fs
			.readdirSync(assetsDir)
			.filter((name) => /^app-.+\.css$/.test(name));
	} catch {
		return [];
	}
}

const emitted = emittedCss();
if (!fs.existsSync(assetsDir) || emitted.length === 0) {
	console.error("no stylesheet was emitted to .output/public/assets");
	console.error("html head:", html.slice(0, 400));
	process.exit(1);
}
if (!cssLink) {
	console.error("SSR document carries no stylesheet link");
	console.error("html head:", html.slice(0, 400));
	process.exit(1);
}
if (!fs.existsSync(path.join(assetsDir, `app-${cssLink}.css`))) {
	// Prefer the stylesheet referenced anywhere in the emitted client build;
	// otherwise the largest one is the main app stylesheet.
	const clientAssets = path.join(ROOT, "output", "client", "assets");
	let chosen = null;
	if (fs.existsSync(clientAssets)) {
		const inClient = fs
			.readdirSync(clientAssets)
			.filter((name) => /^app-.+\.css$/.test(name));
		if (inClient.length === 1) chosen = inClient[0];
	}
	chosen ??= emitted.reduce((largest, name) => {
		const candidate = fs.statSync(path.join(assetsDir, name)).size;
		const leader = fs.statSync(path.join(assetsDir, largest)).size;
		return candidate > leader ? name : largest;
	}, emitted[0]);
	console.error(
		`SSR document references a stylesheet that is not part of this build: ${cssLink}`,
	);
	console.error(`rewriting link to the emitted stylesheet: ${chosen}`);
	html = html.replaceAll(
		`href="/assets/app-${cssLink}.css"`,
		`href="/assets/${chosen}"`,
	);
}
const finalLink = html.match(/href="\/assets\/app-([^"']+)\.css"/)?.[1];
if (
	!finalLink ||
	!fs.existsSync(path.join(assetsDir, `app-${finalLink}.css`))
) {
	console.error("stylesheet link still missing after repair");
	process.exit(1);
}
const dynamicCounts = html.match(/data-i18n|modulepreload|__TSR|tsrSplit/g);
if (dynamicCounts) {
	console.error("leftover bits:", dynamicCounts);
	process.exit(1);
}

// ---------------------------------------------------------------------------
// 9. Write outputs (runtime + brotli + gzip + repo copy)
// ---------------------------------------------------------------------------
const buffer = Buffer.from(html);
fs.writeFileSync(path.join(OUT, "index.html"), buffer);
fs.writeFileSync(
	path.join(OUT, "index.html.br"),
	brotliCompressSync(buffer, {
		params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
	}),
);
fs.writeFileSync(
	path.join(OUT, "index.html.gz"),
	gzipSync(buffer, { level: 9 }),
);
fs.writeFileSync(path.join(ROOT, "public", "index.html"), buffer);

const brSize = fs.statSync(path.join(OUT, "index.html.br")).size;
log(
	`static landing written: ${(buffer.length / 1024).toFixed(1)} KB raw, ${(brSize / 1024).toFixed(1)} KB brotli`,
);
