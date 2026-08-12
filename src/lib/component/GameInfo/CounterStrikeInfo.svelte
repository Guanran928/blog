<script lang="ts">
	import SiCounterstrike from '@icons-pack/svelte-simple-icons/icons/SiCounterstrike';
	import Card from '$lib/component/Card.svelte';
	import type { SteamGame } from '$lib/types/steam';

	// https://github.com/SteamTracking/GameTracking-CS2/blob/d9a01ef158cfee22512acc6980bf4c8d5c0fb654/game/csgo/pak01_dir/panorama/styles/csgostyles.css#L97-L103
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
			<div>
				<span
					id="rating"
					class="m-2 flex w-20 aspect-178/64 shrink-0 items-center justify-center border-l-4 pl-1 select-none skew-x-[-11.5deg]"
					style:--tier-color={tierColor}
					style:background="color-mix(in hsl, {tierColor} 45%, black)"
					style:border-color="color-mix(in hsl, {tierColor} 80%, black)"
					title="CS rating {premier}"
					aria-hidden="true"
				>
					<span
						class="font-sans leading-none font-bold"
						style="text-box: trim-both cap alphabetic;"
						style:color="color-mix(in hsl, {tierColor} 90%, black)"
					>
						{premier.toLocaleString('en-US')}
					</span>
				</span>
			</div>
		{/if}
	</Card>
</a>

<style>
#rating:before {
  content: " ";
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 1px;
  bottom: 0px;
  border: 2px solid color-mix(in hsl, var(--tier-color) 80%, black);
}
</style>
