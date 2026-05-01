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
	aria-label="Counter-Strike 2 - {playtime} hrs on record, last played {dateLastPlayed}"
>
	<Card class="flex w-64 flex-col">
		<p>Counter-Strike 2</p>
		<div class="flex justify-between">
			<SiCounterstrike class="mt-auto size-8" />
			<div>
				<p class="text-end">{playtime} hrs on record</p>
				<p class="text-end">
					last played on {dateLastPlayed}
				</p>
			</div>
		</div>
	</Card>
</a>
