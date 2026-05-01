<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostMetadata } from '$lib/posts';

	let { data }: { data: (PostMetadata & { slug: string })[] } = $props();
</script>

<ul class="space-y-3 md:space-y-2">
	{#each data as { slug, title, date } (slug)}
		<li class="flex justify-between gap-2">
			<a
				href={resolve('/posts/[slug]', { slug })}
				style:--tag="h-{slug}"
				class="decoration-underline hover:underline"
			>
				{title ?? slug}
			</a>
			<time datetime={date} style:--tag="t-{slug}" class="text-muted-foreground">
				{date ? new Date(date).toLocaleDateString() : 'Invalid Date'}
			</time>
		</li>
	{/each}
</ul>
