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
	<Card class="flex size-full items-center gap-3">
		<SiOsu class="m-2 size-8 shrink-0" />

		<div class="flex flex-1 flex-col gap-2">
			<div class="flex justify-between text-xs">
				<span class="font-semibold text-muted-foreground">osu!</span>

				<div class="flex gap-2 text-muted-foreground">
					<span class="">{data.username}</span>
					<span class="">{countryCodeToFlag(data.country)}</span>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-x-2 sm:grid-cols-4">
				<div>
					<p class="text-xs text-muted-foreground">Global</p>
					<p class="text-xl font-medium">#{data.pp_rank}</p>
				</div>
				<div>
					<p class="text-xs text-muted-foreground">Country</p>
					<p class="text-xl font-medium">#{data.pp_country_rank}</p>
				</div>

				<div>
					<p class="text-xs text-muted-foreground">pp</p>
					<p class="text-xl font-medium">{ppDisplay}</p>
				</div>
				<div>
					<p class="text-xs text-muted-foreground">Acc</p>
					<p class="text-xl font-medium">{accPct}%</p>
				</div>
			</div>
		</div>
	</Card>
</a>
