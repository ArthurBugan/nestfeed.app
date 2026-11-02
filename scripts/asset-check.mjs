// scripts/asset-check.mjs
// Runs inside the Docker build stage after `bun run build`: verifies every
// asset reference in .output/server/index.mjs resolves to a file under
// .output/public. Failing here keeps a known-unstyled deployment from
// shipping as an image.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const srcDir = ".output/public";
const entryPath = ".output/server/index.mjs";

const byExt = (ext) => {
	const matches = [
		...entrySource.matchAll(new RegExp(`assets/[A-Za-z0-9_.-]+\\.${ext}`, "g")),
	].map((match) => match[0]);
	return [...new Set(matches)];
};

const entrySource = readFileSync(entryPath, "utf8");
const refs = [...byExt("css"), ...byExt("js")];
const missing = refs.filter((ref) => !existsSync(join(srcDir, ref)));

const publicAssets = existsSync(srcDir)
	? readdirSync(srcDir).map((name) => {
			const stat = statSync(join(srcDir, name));
			return stat.isDirectory() ? `${name}/` : name;
		})
	: [];

if (missing.length > 0) {
	console.error(
		`asset-check: ${missing.length} SSR-referenced asset(s) missing from ${srcDir}:`,
	);
	for (const ref of missing) console.error(`  MISSING ${ref}`);
	console.error("--- referenced by index.mjs:");
	for (const ref of refs) console.error(`  ${ref}`);
	console.error(`--- present under ${srcDir}:`);
	for (const file of publicAssets.slice(0, 60)) console.error(`  ${file}`);
	process.exit(1);
}

console.log(`asset check ok: ${refs.length} references all present`);
