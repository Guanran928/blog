<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	// <enhanced:img> doesn't work in MDSveX .svx files because:
	// 1. The enhanced-img markup plugin (vite-plugin-enhanced-img-markup) scans
	//    ALL imports matching SvelteKit's file filter, including .svx?raw imports
	//    used by posts.ts for build-time heading extraction.
	// 2. When processing a ?raw string, the plugin finds <enhanced:img> tags but
	//    can't locate their enhanced import variables (the <script> block is raw
	//    text at that point), failing with "Cannot determine dimensions".
	// 3. Using ?enhanced on the import (processed by the imagetools plugin only)
	//    and rendering via this wrapper component bypasses the markup plugin.

	const mime: Record<string, string> = {
		avif: 'image/avif',
		webp: 'image/webp',
		jpeg: 'image/jpeg',
		jpg: 'image/jpeg',
		png: 'image/png',
		gif: 'image/gif'
	};

	let {
		src,
		alt,
		loading = 'lazy' as 'lazy' | 'eager',
		...rest
	}: {
		src: string | Picture;
		alt: string;
		loading?: 'lazy' | 'eager';
		[x: string]: unknown;
	} = $props();

	let imgSrc = $derived(typeof src === 'string' ? src : src.img.src);
	let imgW = $derived(typeof src === 'string' ? undefined : src.img.w);
	let imgH = $derived(typeof src === 'string' ? undefined : src.img.h);
	let sourceEntries = $derived(
		typeof src === 'string' ? ([] as [string, string][]) : Object.entries(src.sources)
	);
</script>

{#if sourceEntries.length > 0}
	<picture>
		{#each sourceEntries as [format, srcset] (format)}
			<source {srcset} type={mime[format]} />
		{/each}
		<img src={imgSrc} width={imgW} height={imgH} {alt} {loading} {...rest} />
	</picture>
{:else}
	<img src={imgSrc} {alt} {loading} {...rest} />
{/if}
