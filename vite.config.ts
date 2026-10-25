// vite.config.ts

import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import sitemapPlugin from "vite-plugin-tanstack-router-sitemap";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		cors: true,
		proxy: {
			"/api": {
				target: "http://localhost:3010",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		allowedHosts: true,
		port: 3000,
	},
	build: {
		outDir: "./output",
		assetsDir: "assets",
	},
	plugins: [
		nitroV2Plugin({
			preset: "bun",
			// Pre-compress public assets (.gz/.br) and serve them when the client
			// accepts the encoding — needed because the bun preset has no
			// reverse proxy doing compression in front of it.
			compressPublicAssets: true,
			// Serves the pre-built, JS-free static landing page at "/" (falling
			// back to the SSR renderer when the generated document is absent).
			handlers: [
				{
					route: "/",
					middleware: true,
					handler: "./server/landing-middleware.ts",
				},
			],
			routeRules: {
				// Hashed build assets can be cached forever.
				"/assets/**": {
					headers: {
						"cache-control": "public, max-age=31536000, immutable",
					},
				},
			},
		}) as any,
		tsconfigPaths({
			projects: ["./tsconfig.json"],
		}),
		contentCollections(),
		tanstackStart({
			target: "bun",
			customViteReactPlugin: true,
			autoCodeSplitting: true,
			tsr: {
				routeToken: "layout",
				target: "react",
				// Specifies the directory TanStack Router uses for your routes.
				routesDirectory: "src/routes", // Defaults to "src/routes"
			},
		}),
		tailwindcss(),
		react(),
	],
});
