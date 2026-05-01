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
</script>

<Card class="flex w-fit space-x-6" aria-label="Monkeytype typing statistics">
	<div class="space-y-1">
		<div>
			<p class="text-sm text-muted-foreground">tests started</p>
			<p class="text-xl">{data.data.typingStats.startedTests}</p>
		</div>
		<div>
			<p class="text-sm text-muted-foreground">test completed</p>
			<p class="text-xl">{data.data.typingStats.completedTests}</p>
		</div>
		<div>
			<p class="text-sm text-muted-foreground">time typing</p>
			<p class="text-xl">{formatDuration(data.data.typingStats.timeTyping)}</p>
		</div>
	</div>
	<div class="relative flex flex-col justify-center">
		<SiMonkeytype class="absolute top-0 right-0" />
		<div class="flex flex-col items-center">
			<p class="text-sm text-muted-foreground">60 seconds</p>
			<p class="text-2xl">
				{data.data.personalBests.time['60'][0].wpm}
			</p>
			<p class="text-muted-foreground">
				{Math.floor(data.data.personalBests.time['60'][0].acc)}%
			</p>
		</div>
	</div>
</Card>
