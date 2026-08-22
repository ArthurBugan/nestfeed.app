import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// @ts-expect-error -- vite/vitest vendored-type skew between plugin-react and vitest
	plugins: [react(), tsconfigPaths()],
	test: {
		environment: "happy-dom",
		include: ["tests/**/*.test.{ts,tsx}"],
	},
});
