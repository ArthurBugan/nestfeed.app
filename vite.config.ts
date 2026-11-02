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
		rollupOptions: {
			output: {
				// CSS must keep a stable filename across the client and SSR builds.
				// Hashed names split the two builds (client emits app-<hashA>.css,
				// SSR references app-<hashB>.css) and the SSR reference 404s at
				// runtime — unstyled first paint. Only one css asset is ever built
				// (src/styles/app.css is the sole css import), so the unhashed name
				// is collision-free.
				assetFileNames(buildInfo) {
					const names = (buildInfo.names ?? [buildInfo.name])
						.filter((n) => typeof n === "string");
					if (names.some((n) => n.endsWith(".css"))) {
						return "assets/[name][extname]";
					}
					return "assets/[name]-[hash][extname]";
				},
			},
		},
	},
	plugins: [
		nitroV2Plugin({
			preset: "bun",
			// Pre-compress public assets (.gz/.br) and serve them when the client
			// accepts the encoding — needed because the bun preset has no
			// reverse proxy doing compression in front of it.
			compressPublicAssets: true,
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
