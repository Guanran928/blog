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

	let { data } = $props();

	let accPct = $derived(Number(data.accuracy).toFixed(2));
	let ppDisplay = $derived(Number(data.pp_raw).toLocaleString());
</script>

<a href={`https://osu.ppy.sh/users/${data.user_id}`} aria-label="osu! profile for {data.username}">
	<Card class="flex size-full flex-col justify-between gap-2">
		<div class="flex justify-between text-xs font-semibold text-muted-foreground">
			<p class="flex gap-1 tracking-wide uppercase">
				<SiOsu class="size-4 shrink-0" />osu!
			</p>
			<div class="flex gap-2">
				<span class="">{data.username}</span>
				<span class="">{countryCodeToFlag(data.country)}</span>
			</div>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div>
				<p class="text-sm text-muted-foreground">Global</p>
				<p class="text-xl font-semibold">#{data.pp_rank}</p>
			</div>
			<div>
				<p class="text-sm text-muted-foreground">Country</p>
				<p class="text-xl font-semibold">#{data.pp_country_rank}</p>
			</div>

			<div>
				<p class="text-sm text-muted-foreground">pp</p>
				<p class="text-xl font-semibold">{ppDisplay}</p>
			</div>
			<div>
				<p class="text-sm text-muted-foreground">Acc</p>
				<p class="text-xl font-semibold">{accPct}%</p>
			</div>
		</div>
	</Card>
</a>
