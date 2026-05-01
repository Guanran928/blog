<script lang="ts">
	import Card from '$lib/component/Card.svelte';

	import iron1 from '$lib/assets/ranks/iron-1.svg';
	import iron2 from '$lib/assets/ranks/iron-2.svg';
	import iron3 from '$lib/assets/ranks/iron-3.svg';

	import bronze1 from '$lib/assets/ranks/bronze-1.svg';
	import bronze2 from '$lib/assets/ranks/bronze-2.svg';
	import bronze3 from '$lib/assets/ranks/bronze-3.svg';

	import silver1 from '$lib/assets/ranks/silver-1.svg';
	import silver2 from '$lib/assets/ranks/silver-2.svg';
	import silver3 from '$lib/assets/ranks/silver-3.svg';

	import gold1 from '$lib/assets/ranks/gold-1.svg';
	import gold2 from '$lib/assets/ranks/gold-2.svg';
	import gold3 from '$lib/assets/ranks/gold-3.svg';

	import platinum1 from '$lib/assets/ranks/platinum-1.svg';
	import platinum2 from '$lib/assets/ranks/platinum-2.svg';
	import platinum3 from '$lib/assets/ranks/platinum-3.svg';

	import diamond1 from '$lib/assets/ranks/diamond-1.svg';
	import diamond2 from '$lib/assets/ranks/diamond-2.svg';
	import diamond3 from '$lib/assets/ranks/diamond-3.svg';

	import ascendant1 from '$lib/assets/ranks/ascendant-1.svg';
	import ascendant2 from '$lib/assets/ranks/ascendant-2.svg';
	import ascendant3 from '$lib/assets/ranks/ascendant-3.svg';

	import immortal1 from '$lib/assets/ranks/immortal-1.svg';
	import immortal2 from '$lib/assets/ranks/immortal-2.svg';
	import immortal3 from '$lib/assets/ranks/immortal-3.svg';

	import radiant from '$lib/assets/ranks/radiant.svg';

	const rankMap: Record<string, string> = {
		'Iron 1': iron1,
		'Iron 2': iron2,
		'Iron 3': iron3,

		'Bronze 1': bronze1,
		'Bronze 2': bronze2,
		'Bronze 3': bronze3,

		'Silver 1': silver1,
		'Silver 2': silver2,
		'Silver 3': silver3,

		'Gold 1': gold1,
		'Gold 2': gold2,
		'Gold 3': gold3,

		'Platinum 1': platinum1,
		'Platinum 2': platinum2,
		'Platinum 3': platinum3,

		'Diamond 1': diamond1,
		'Diamond 2': diamond2,
		'Diamond 3': diamond3,

		'Ascendant 1': ascendant1,
		'Ascendant 2': ascendant2,
		'Ascendant 3': ascendant3,

		'Immortal 1': immortal1,
		'Immortal 2': immortal2,
		'Immortal 3': immortal3,

		Radiant: radiant
	};

	let { data } = $props();
</script>

<Card
	class="flex w-fit items-center gap-2"
	aria-label="Valorant profile for {data.name}#{data.tag}, currently ranked at {data.rank}"
>
	<img src={rankMap[data.rank]} alt="" class="size-12" />
	<div class="flex flex-col">
		<span class="font-semibold">
			{data.name}<span class="text-muted-foreground">#{data.tag}</span>
		</span>
		<span class="text-sm text-muted-foreground">
			{data.rank}
		</span>
	</div>
</Card>
