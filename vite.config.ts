import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit()],
	ssr: {
		noExternal: ['@icons-pack/svelte-simple-icons', '@lucide/svelte']
	},
	build: {
		rollupOptions: {
			plugins: [visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true })]
		}
	}
});
