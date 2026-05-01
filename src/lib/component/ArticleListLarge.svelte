<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostMetadata } from '$lib/posts';
	import type { Component } from 'svelte';

	let {
		data
	}: {
		data: {
			metadata?: PostMetadata;
			default: Component;
			path: string;
			slug: string;
		}[];
	} = $props();
</script>

<ul class="flex flex-col gap-4">
	{#each data as { slug, metadata } (slug)}
		<li>
			<a href={resolve('/posts/[slug]', { slug })} class="group flex flex-col justify-between">
				<span
					style:--tag="h-{slug}"
					class="w-fit text-lg font-medium decoration-underline group-hover:underline"
				>
					{metadata?.title ?? slug}
				</span>
				<time
					datetime={metadata?.date}
					style:--tag="t-{slug}"
					class="w-fit text-sm text-muted-foreground"
				>
					{metadata?.date ? new Date(metadata?.date).toLocaleDateString() : 'Invalid Date'}
				</time>
			</a>
		</li>
	{/each}
</ul>
