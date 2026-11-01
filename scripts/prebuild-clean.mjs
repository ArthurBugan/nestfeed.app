// scripts/prebuild-clean.mjs
// Removes stale static landing artifacts so the Nitro build never bakes an
// index.html (and .br/.gz variants) with a previous build's hashed asset
// links into the public-assets manifest — "/" must be rendered by SSR only.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const stale = [
	path.join(root, "public", "index.html"),
	...["index.html", "index.html.br", "index.html.gz"].map((name) =>
		path.join(root, ".output", "public", name),
	),
];
for (const file of stale) {
	fs.rmSync(file, { force: true });
}
console.log("[prebuild-clean] removed stale static landing artifacts");
