<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostMetadata } from '$lib/posts';
	import type { Component } from 'svelte';
	import Badge from './Badge.svelte';

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

<ul class="space-y-3 md:space-y-2">
	{#each data as { slug, metadata } (slug)}
		<li class="flex justify-between gap-2">
			<a
				href={resolve('/posts/[slug]', { slug })}
				style:--tag="h-{slug}"
				class="decoration-underline hover:underline"
			>
				{#if metadata?.draft}
					<Badge>Draft</Badge>
				{/if}
				{metadata?.title ?? slug}
			</a>
			<time datetime={metadata?.date} style:--tag="t-{slug}" class="text-muted-foreground">
				{metadata?.date ? new Date(metadata?.date).toLocaleDateString() : 'Invalid Date'}
			</time>
		</li>
	{/each}
</ul>
