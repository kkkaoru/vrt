import { resolve } from "node:path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/bin.ts"),
			name: "reg-config-generator",
		},
		rollupOptions: {
			external: ["node:util", "node:fs"],
		},
	},
	// plugins: [nodePolyfills()],
	// lib: {
	// 	entry: [
	// 		resolve(__dirname, "src/index.ts"),
	// 		resolve(__dirname, "src/client-only.ts"),
	// 	],
	// },
	// externals: ["hark"],
});
