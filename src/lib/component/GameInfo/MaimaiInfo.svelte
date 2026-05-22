<script lang="ts">
	import Badge from '$lib/component/Badge.svelte';
	import Card from '$lib/component/Card.svelte';
	import Skeleton from '$lib/component/Skeleton.svelte';

	let loaded = $state(false);
	let error = $state(false);
</script>

<div class="size-full">
	<Card class="flex size-full items-center justify-center">
		{#if loaded && !error}
			<img
				src="/api/maimai"
				alt="maimai DX score card"
				width="240"
				height="48"
				onerror={() => (error = true)}
			/>
		{:else if error}
			<div class="flex items-center gap-1 font-sans">
				<Badge variant="destructive">Error</Badge>
				<span class="text-sm">Image loading failed</span>
			</div>
		{:else}
			<Skeleton class="h-12 w-60 shrink-0" />
		{/if}
	</Card>

	<img
		src="/api/maimai"
		alt=""
		class="hidden"
		onload={() => (loaded = true)}
		onerror={() => (error = true)}
	/>
</div>
