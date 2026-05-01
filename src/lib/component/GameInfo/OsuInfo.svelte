<script lang="ts">
	import SiOsu from '@icons-pack/svelte-simple-icons/icons/SiOsu';
	import Card from '$lib/component/Card.svelte';

	// Source - https://stackoverflow.com/a/78881602
	// Posted by Suhail Gupta
	// Retrieved 2026-04-15, License - CC BY-SA 4.0
	function countryCodeToFlag(countryCode: string) {
		// Validate the input to be exactly two characters long and all alphabetic
		if (!countryCode || countryCode.length !== 2 || !/^[a-zA-Z]+$/.test(countryCode)) {
			return '🏳️'; // White Flag Emoji for unknown or invalid country codes
		}

		// Convert the country code to uppercase to match the regional indicator symbols
		const code = countryCode.toUpperCase();

		// Calculate the offset for the regional indicator symbols
		const offset = 127397;

		// Convert each letter in the country code to its corresponding regional indicator symbol
		const flag = Array.from(code)
			.map((letter) => String.fromCodePoint(letter.charCodeAt(0) + offset))
			.join('');

		return flag;
	}

	function formatDuration(sec: number) {
		const days = Math.floor(sec / 86400);
		const hours = Math.floor((sec % 86400) / 3600);
		const minutes = Math.floor((sec % 3600) / 60);

		return new Intl.DurationFormat('en', { style: 'narrow' }).format({ days, hours, minutes });
	}

	let { data } = $props();
</script>

<a href={`https://osu.ppy.sh/users/${data.user_id}`} aria-label="osu! profile for {data.username}">
	<Card class="flex w-fit flex-col">
		<div class="flex justify-between align-bottom">
			<div class="space-x-1.5">
				<span class="text-xl">{data.username}</span><span>{countryCodeToFlag(data.country)}</span>
			</div>

			<SiOsu />
		</div>

		<div
			class="grid grid-cols-4 gap-4 [&>div>p:first-child]:text-sm [&>div>p:last-child]:text-xl [&>div>p:last-child]:text-muted-foreground"
		>
			<div>
				<p>Global Ranking</p>
				<p>#{data.pp_rank}</p>
			</div>

			<div>
				<p>Country Ranking</p>
				<p>#{data.pp_country_rank}</p>
			</div>

			<div>
				<p>pp</p>
				<p>{data.pp_raw}</p>
			</div>

			<div>
				<p>Total Play Time</p>
				<p>{formatDuration(Number.parseInt(data.total_seconds_played))}</p>
			</div>
		</div>
	</Card>
</a>
