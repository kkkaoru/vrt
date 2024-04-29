import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/bin.ts'),
			name: 'reg-config-generator',
		},
		rollupOptions: {
			external: [/^node:/],
		},
	},
});
