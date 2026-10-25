// Restores vendored dependencies that nitro hoists out of packages which use
// hardcoded relative imports. html-dom-parser's server entry (used by
// html-react-parser during blog SSR) requires `../node_modules/domhandler/...`
// relative to its own lib dir; nitro's output hoists those to
// .output/server/node_modules/<dep> and drops the nest, breaking resolution
// at runtime ("ResolveMessage" -> full client re-render, React #419).
import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const src = path.join(rootDir, "node_modules/html-dom-parser/lib/node_modules");
const dest = path.join(
	rootDir,
	".output/server/node_modules/html-dom-parser/lib/node_modules",
);

if (!existsSync(src)) {
	console.warn("[fix-server-deps] vendored deps not found, skipping");
} else if (existsSync(dest)) {
	console.log("[fix-server-deps] already restored");
} else {
	mkdirSync(path.dirname(dest), { recursive: true });
	cpSync(src, dest, { recursive: true });
	console.log("[fix-server-deps] restored html-dom-parser vendored deps");
}
