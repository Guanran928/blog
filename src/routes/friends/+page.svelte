<script lang="ts">
	import Card from '$lib/component/Card.svelte';

	import { FRIENDS_DATA } from '$lib/const';
</script>

<h2 class="pb-2 text-2xl font-semibold" style:--tag="c-header">好友</h2>
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
	{#each FRIENDS_DATA as link (link.name)}
		<a href={link.url} target="_blank" rel="external">
			<Card class="group relative flex items-center justify-between gap-2 pr-2">
				<div class="flex flex-col truncate">
					<span class="font-semibold">
						{link.name}
					</span>
					<span class="text-sm text-muted-foreground decoration-underline group-hover:underline">
						{link.description}
					</span>
				</div>
				<img src={`/api/avatar?url=${encodeURIComponent(link.image)}`} data-origin={link.image} alt={link.name} class="size-12 rounded" />
			</Card>
		</a>
	{/each}
</div>
