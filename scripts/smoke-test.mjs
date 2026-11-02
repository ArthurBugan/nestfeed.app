// scripts/smoke-test.mjs
// Post-deploy smoke test: verifies every asset referenced by the SSR HTML
// actually resolves on the server. Catches the "SSR bundle references a CSS
// chunk that was replaced on disk without a server restart" failure mode:
// the page first-paints unstyled (giant unstyled inline icons) and Tailwind
// never applies.
//
// Usage: bun scripts/smoke-test.mjs https://nestfeed.app [other-url...]

const targets = process.argv.slice(2);
if (targets.length === 0) {
	console.error(
		"Usage: bun scripts/smoke-test.mjs <base-url> [...more-base-urls]",
	);
	process.exit(1);
}

const accept = "text/html";
const failed = new Set();

async function checkPath(base, route) {
	const url = new URL(route, base).href;
	const res = await fetch(url, {
		headers: { accept },
		redirect: "manual",
	});
	if (res.status !== 200) {
		failed.add(`${res.status} ${url}`);
		return null;
	}
	return res.text();
}

for (const base of targets) {
	const html = await checkPath(base, "/");
	if (html === null) continue;

	// Every asset the shell references must exist on the server. Redirects
	// count as failures: hashed assets should answer 200 directly, and a
	// fallback router answering 200 with HTML would corrupt the MIME type.
	const refs = new Set();
	for (const match of html.matchAll(/(?:href|src)=?"(\/assets\/[^"?#]+)"/g)) {
		refs.add(match[1]);
	}
	// Shell JSON may embed additional entry listings.
	for (const match of html.matchAll(/"\/assets\/[^"?#]+?\.js"/g)) {
		const m = match[0].slice(1, -1);
		refs.add(m);
	}
	if (refs.size === 0) {
		failed.add(`no /assets/ references found in ${new URL(base).href}`);
	}

	console.log(`${new URL(base).href}: ${refs.size} assets referenced`);
	for (const route of refs) {
		const url = new URL(route, base).href;
		const res = await fetch(url, { method: "HEAD", redirect: "manual" });
		const type = res.headers.get("content-type") ?? "";
		if (res.status !== 200 || type.includes("text/html")) {
			failed.add(
				`${res.status} ${type || "no content-type"} ${url} (referenced by SSR HTML)`,
			);
		}
	}
}

if (failed.size > 0) {
	console.error(`\n❌ ${failed.size} failed asset checks:`);
	for (const line of [...failed].sort()) console.error(`  ${line}`);
	process.exit(1);
}

console.log("\n✅ All SSR-referenced assets resolve.");
