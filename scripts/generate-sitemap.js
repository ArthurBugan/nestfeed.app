import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Production domain (override with SITE_URL when generating for another host)
const HOSTNAME = (process.env.SITE_URL || "https://groupify.dev").replace(
	/\/$/,
	"",
);

// Content server (Directus) that backs the runtime blog API
const CONTENT_API =
	process.env.CONTENT_POSTS_URL ||
	"https://directus.nestfeed.app/items/posts?limit=-1";

// Public content routes only — never index the app itself
const EXCLUDED_PREFIXES = [
	"/dashboard",
	"/login",
	"/register",
	"/forgot-password",
	"/subscriptions",
	"/share",
];

// 1. Get static routes from src/routes
function getStaticRoutes(dir, base = "") {
	const routes = [];
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			// Skip directories starting with $ (dynamic) or __ (root)
			if (item.startsWith("$") || item.startsWith("__")) continue;

			// Handle pathless layouts (starting with _)
			const nextBase = item.startsWith("_") ? base : `${base}/${item}`;
			routes.push(...getStaticRoutes(fullPath, nextBase));
		} else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
			// Skip files starting with $ or __
			if (item.startsWith("$") || item.startsWith("__")) continue;

			const routeName = item.replace(/\.(tsx|ts)$/, "");

			// Handle index files
			if (routeName === "index") {
				routes.push(base || "/");
			} else if (routeName === "route") {
				// route.tsx is usually a layout or a base route
				if (base) routes.push(base);
			} else if (!routeName.startsWith("_")) {
				routes.push(`${base}/${routeName}`);
			}
		}
	}
	return [...new Set(routes)];
}

// 2. Get published blog posts from the content server
async function getBlogPosts() {
	try {
		const response = await fetch(CONTENT_API);

		if (!response.ok) {
			console.warn(
				"Failed to fetch blog posts from content server:",
				response.status,
			);
			return [];
		}

		const data = await response.json();

		// Only include published posts with valid slugs in sitemap
		return (data.data || [])
			.filter(
				(post) =>
					post.status === "published" &&
					typeof post.slug === "string" &&
					post.slug.trim() !== "" &&
					post.slug.toLowerCase() !== "null",
			)
			.map((post) => `/blog/${post.slug}`);
	} catch (error) {
		console.warn(
			"Error fetching blog posts from content server:",
			error.message,
		);
		return [];
	}
}

async function generate() {
	console.log(`Generating sitemap for ${HOSTNAME}...`);

	const routesDir = path.join(rootDir, "src/routes");
	const staticRoutes = getStaticRoutes(routesDir);
	const blogPosts = await getBlogPosts();

	const filteredStaticRoutes = staticRoutes.filter(
		(route) =>
			!EXCLUDED_PREFIXES.some((prefix) => route.startsWith(prefix)) &&
			route !== "",
	);

	const allRoutes = [...new Set(["/", ...filteredStaticRoutes, ...blogPosts])];

	console.log(
		`📝 Found ${blogPosts.length} published blog posts from content server`,
	);
	console.log(`📄 Static public routes: ${filteredStaticRoutes.length}`);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.sort()
	.map(
		(route) => `  <url>
    <loc>${HOSTNAME}${route === "/" ? "" : route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "/" ? "daily" : route.startsWith("/blog") ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "/" ? "1.0" : route.startsWith("/blog") ? "0.8" : "0.5"}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	const publicDir = path.join(rootDir, "public");
	if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

	fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
	fs.writeFileSync(
		path.join(publicDir, "sitemap.txt"),
		allRoutes.map((r) => `${HOSTNAME}${r === "/" ? "" : r}`).join("\n"),
	);

	console.log(`✅ Sitemap generated with ${allRoutes.length} routes!`);
	console.log(`📍 Saved to: ${path.join(publicDir, "sitemap.xml")}`);
}

generate().catch(console.error);
