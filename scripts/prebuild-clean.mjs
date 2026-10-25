// scripts/prebuild-clean.mjs
// Prepares the tree for `vite build`: the static landing document must NOT
// exist before the Nitro build runs, otherwise the generated index.html (and
// its .br/.gz variants) get baked into the public-assets manifest with the
// previous build's hashed asset links, which makes "/" 500 when the new
// document is generated. They are re-created after the build by
// scripts/gen-static-landing.mjs.
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
