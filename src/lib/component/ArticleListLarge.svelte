<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostMetadata } from '$lib/posts';

	let { data }: { data: (PostMetadata & { slug: string })[] } = $props();
</script>

<ul class="flex flex-col gap-4">
	{#each data as { slug, title, date } (slug)}
		<li>
			<a href={resolve('/posts/[slug]', { slug })} class="group flex flex-col justify-between">
				<span
					style:--tag="h-{slug}"
					class="w-fit text-lg font-medium decoration-underline group-hover:underline"
				>
					{title ?? slug}
				</span>
				<time datetime={date} style:--tag="t-{slug}" class="w-fit text-sm text-muted-foreground">
					{date ? new Date(date).toLocaleDateString() : 'Invalid Date'}
				</time>
			</a>
		</li>
	{/each}
</ul>
