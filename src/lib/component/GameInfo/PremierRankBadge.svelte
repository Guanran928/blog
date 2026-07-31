<script lang="ts">
	const TIER_COLORS = ['#b0c3d9', '#8cc6ff', '#6a7dff', '#c166ff', '#f03cff', '#eb4b4b', '#ffd700'];

	let { rating }: { rating: number } = $props();

	let tierColor = $derived(
		TIER_COLORS[Math.min(Math.floor(rating / 5000), TIER_COLORS.length - 1)]
	);
</script>

<span
	class="m-2 flex h-7 w-18 shrink-0 items-center justify-center border-2 border-l-4 select-none"
	style:background="color-mix(in srgb, {tierColor} 50%, black)"
	style:border-color={tierColor}
	style:transform="skewX(-10deg)"
	title="CS rating {rating}"
	aria-hidden="true"
>
	<span
		class="font-sans leading-none font-semibold"
		style:text-box="trim-both cap"
		style:color="color-mix(in srgb, {tierColor} 50%, white)"
		style:text-shadow="0 1px 1px rgb(0 0 0 / 0.6)">{rating}</span
	>
</span>
