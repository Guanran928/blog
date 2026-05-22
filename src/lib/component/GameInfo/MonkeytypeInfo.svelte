<script lang="ts">
	import Card from '$lib/component/Card.svelte';
	import SiMonkeytype from '@icons-pack/svelte-simple-icons/icons/SiMonkeytype';

	function formatDuration(sec: number) {
		const days = Math.floor(sec / 86400);
		const hours = Math.floor((sec % 86400) / 3600);
		const minutes = Math.floor((sec % 3600) / 60);

		return new Intl.DurationFormat('en', { style: 'digital', hours: '2-digit' }).format({
			days,
			hours,
			minutes
		});
	}

	let { data } = $props();

	let best60 = $derived(data.data.personalBests.time['60'][0]);
	let testsDisplay = $derived(data.data.typingStats.completedTests.toLocaleString());
	let timeDisplay = $derived(formatDuration(data.data.typingStats.timeTyping));
	let streakDisplay = $derived(
		data.data.streak > 0 ? `${data.data.streak} day${data.data.streak !== 1 ? 's' : ''}` : '—'
	);
</script>

<Card class="flex size-full items-center gap-3" aria-label="Monkeytype typing statistics">
	<SiMonkeytype class="m-2 size-8 shrink-0" />

	<div class="flex flex-1 flex-col">
		<p class="text-xs font-semibold text-muted-foreground">Monkeytype</p>
		<div class="flex items-baseline gap-2">
			<p><span class="text-3xl leading-none font-bold">{best60.wpm}</span> <span>wpm</span></p>
			<p class="text-sm text-muted-foreground">
				{Math.floor(best60.acc)}% acc
			</p>
		</div>
		<div class="flex gap-3 text-xs text-muted-foreground">
			<span>{testsDisplay} tests</span>
			<span class="text-border">|</span>
			<span>{timeDisplay} typed</span>
			<span class="text-border">|</span>
			<span>streak {streakDisplay}</span>
		</div>
	</div>
</Card>
