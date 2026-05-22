<script lang="ts">
	import SiCounterstrike from '@icons-pack/svelte-simple-icons/icons/SiCounterstrike';
	import Card from '$lib/component/Card.svelte';
	import type { SteamGame } from '$lib/types/steam';

	let { data }: { data: SteamGame } = $props();

	let playtime = $derived(Math.floor(data.playtime_forever / 60));
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
		<div class="flex flex-col justify-between">
			<p class="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
				Counter-Strike 2
			</p>
			<p class="text-2xl font-bold">
				{playtime}<span class="ml-0.5 text-base font-normal text-muted-foreground">hrs</span>
			</p>
			<p class="text-xs text-muted-foreground">last played {dateLastPlayed}</p>
		</div>
	</Card>
</a>
