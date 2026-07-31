<script lang="ts">
	import SiCounterstrike from '@icons-pack/svelte-simple-icons/icons/SiCounterstrike';
	import Card from '$lib/component/Card.svelte';
	import type { SteamGame } from '$lib/types/steam';

	const TIER_COLORS = ['#b0c3d9', '#8cc6ff', '#6a7dff', '#c166ff', '#f03cff', '#eb4b4b', '#ffd700'];

	let { data, premier }: { data: SteamGame; premier?: number } = $props();

	let playtime = $derived(Math.floor(data.playtime_forever / 60));
	let tierColor = $derived(
		TIER_COLORS[Math.min(Math.floor((premier ?? 0) / 5000), TIER_COLORS.length - 1)]
	);
	let dateLastPlayed = $derived(
		new Intl.DateTimeFormat('en-GB', {
			day: 'numeric',
			month: 'short'
		}).format(new Date(data.rtime_last_played * 1000))
	);
</script>

<a
	href="https://steamcommunity.com/profiles/76561198855505856"
	class="size-full"
	aria-label="Counter-Strike 2 - {playtime} hrs on record, last played {dateLastPlayed}"
>
	<Card class="flex size-full items-center gap-3">
		<SiCounterstrike class="m-2 size-8 shrink-0" />
		<div class="flex flex-1 flex-col justify-between">
			<p class="text-xs font-semibold text-muted-foreground">Counter-Strike 2</p>
			<p class="text-2xl font-bold">
				{playtime}<span class="ml-0.5 text-base font-normal text-muted-foreground">hrs</span>
			</p>
			<p class="text-xs text-muted-foreground">last played {dateLastPlayed}</p>
		</div>

		{#if premier != null}
			<span
				class="m-2 flex h-7 w-18 shrink-0 items-center justify-center border-2 border-l-4 select-none"
				style:background="color-mix(in srgb, {tierColor} 50%, black)"
				style:border-color={tierColor}
				style:transform="skewX(-10deg)"
				title="CS rating {premier}"
				aria-hidden="true"
			>
				<span
					class="font-sans leading-none font-semibold"
					style:text-box="trim-both cap"
					style:color="color-mix(in srgb, {tierColor} 50%, white)"
					style:text-shadow="0 1px 1px rgb(0 0 0 / 0.6)">{premier}</span
				>
			</span>
		{/if}
	</Card>
</a>
