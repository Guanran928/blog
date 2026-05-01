<script lang="ts">
	import Badge from '$lib/component/Badge.svelte';
	import Card from '$lib/component/Card.svelte';
	import Skeleton from '$lib/component/Skeleton.svelte';

	let loaded = $state(false);
	let error = $state(false);
</script>

{#if !loaded}
	{#if !error}
		<Card class="flex h-[48px] w-[240px] items-center justify-center font-sans"><Skeleton /></Card>
	{:else}
		<Card class="flex h-[48px] w-[240px] items-center justify-center gap-1 font-sans">
			<Badge variant="destructive">Error</Badge>
			Image loading failed
		</Card>
	{/if}
{/if}

<img
	src="/api/maimai"
	alt="maimai DX score card"
	width="240"
	height="48"
	class:hidden={!loaded || error}
	onload={() => (loaded = true)}
	onerror={() => (error = true)}
/>
