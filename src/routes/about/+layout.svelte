<script lang="ts">
	let { data, children } = $props();

	import Snowflake from '@lucide/svelte/icons/snowflake';
	import Card from '$lib/component/Card.svelte';
	import Badge from '$lib/component/Badge.svelte';
	import {
		CounterStrikeInfo,
		OsuInfo,
		ValorantInfo,
		MonkeyTypeInfo,
		MaimaiInfo
	} from '$lib/component/GameInfo';
	import Skeleton from '$lib/component/Skeleton.svelte';
</script>

<article
	class="prose max-w-none pt-3 wrap-break-word prose-neutral dark:prose-invert prose-headings:scroll-mt-8 prose-headings:decoration-underline prose-a:decoration-underline prose-a:transition-[text-decoration-color] prose-a:hover:decoration-accent-foreground"
>
	<div class="not-prose flex flex-row items-center gap-4">
		<img
			src="https://avatars.githubusercontent.com/u/68757440?s=192"
			alt="Guanran928"
			class="size-16 rounded-full border border-border md:size-16"
		/>
		<div>
			<h1 class="text-3xl font-semibold">Guanran928</h1>
			<p class="flex items-center text-muted-foreground">
				高中生，<Snowflake class="mr-1 inline size-4" />NixOS 用户
			</p>
		</div>
	</div>

	{@render children()}

	<div class="not-prose space-y-1">
		<div class="flex flex-col gap-4">
			<MaimaiInfo />

			{#snippet loading(cls: string)}
				<Card class="flex {cls} items-center justify-center font-sans"><Skeleton /></Card>
			{/snippet}

			{#snippet failed(cls: string, error: Error)}
				<Card class="flex {cls} items-center justify-center gap-1 font-sans">
					<Badge class="border-destructive-border bg-destructive">Error</Badge>
					{error.message}
				</Card>
			{/snippet}

			{#await data.val}
				{@render loading('h-16.5 w-48')}
			{:then data}
				<ValorantInfo {data} />
			{:catch error}
				{@render failed('h-16.5 w-48', error)}
			{/await}

			{#await data.cs}
				{@render loading('h-22.5 w-64')}
			{:then data}
				<CounterStrikeInfo {data} />
			{:catch error}
				{@render failed('h-22.5 w-64', error)}
			{/await}

			{#await data.osu}
				{@render loading('h-23.5 w-96')}
			{:then data}
				<OsuInfo {data} />
			{:catch error}
				{@render failed('h-23.5 w-96', error)}
			{/await}

			{#await data.monkeytype}
				{@render loading('h-[170px] w-[200px]')}
			{:then data}
				<MonkeyTypeInfo {data} />
			{:catch error}
				{@render failed('h-[170px] w-[200px]', error)}
			{/await}
		</div>
	</div>
</article>
