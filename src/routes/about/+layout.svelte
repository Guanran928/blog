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

	import Heatmap from '$lib/component/Heatmap.svelte';
	import { GITHUB_PROFILE } from '$lib/const';
	import SiGithub from '@icons-pack/svelte-simple-icons/icons/SiGithub';
	import { cn } from '$lib/cn';
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

	<div class="not-prose">
		{#snippet loading(cls: string)}
			<Card class={cn('flex size-full items-center justify-center', cls)}
				><Skeleton class="size-full" /></Card
			>
		{/snippet}

		{#snippet failed(cls: string, badgeString: string, error: Error)}
			<Card class={cn('flex size-full items-center justify-center gap-1 font-sans', cls)}>
				<Badge variant="destructive">{badgeString}</Badge>
				{error.message}
			</Card>
		{/snippet}

		<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
			<Card class="sm:col-span-2">
				<div class="flex items-center justify-between gap-4 pb-3 font-sans text-sm">
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a href={GITHUB_PROFILE.url} class="flex shrink-0 items-center gap-2 no-underline">
						<SiGithub class="size-4" />
						{GITHUB_PROFILE.username}
					</a>
					{#await data.github}
						<Skeleton class="h-5 w-44" />
					{:then github}
						<span class="w-44 text-right text-muted-foreground">
							{github.total} contributions in {github.year}
						</span>
					{/await}
				</div>

				{#await data.github}
					<Heatmap data={{}} loading />
				{:then github}
					<Heatmap data={github.data} year={github.year} />
				{:catch error}
					<div class="flex min-h-30 items-center justify-center gap-1 font-sans">
						<Badge variant="destructive">GitHub Error</Badge>
						{error.message}
					</div>
				{/await}
			</Card>

			{#await data.val}
				{@render loading('min-h-[80px]')}
			{:then data}
				<ValorantInfo {data} />
			{:catch error}
				{@render failed('min-h-[80px]', 'VALORANT Error', error)}
			{/await}

			{#await data.cs}
				{@render loading('min-h-[80px]')}
			{:then data}
				<CounterStrikeInfo {data} />
			{:catch error}
				{@render failed('min-h-[80px]', 'Counter-Strike 2 Error', error)}
			{/await}

			{#await data.monkeytype}
				{@render loading('min-h-[85px]')}
			{:then data}
				<MonkeyTypeInfo {data} />
			{:catch error}
				{@render failed('min-h-[85px]', 'MonkeyType Error', error)}
			{/await}

			<MaimaiInfo />

			<div class="sm:col-span-2">
				{#await data.osu}
					{@render loading('min-h-[95px]')}
				{:then data}
					<OsuInfo {data} />
				{:catch error}
					{@render failed('min-h-[95px]', 'osu! error', error)}
				{/await}
			</div>
		</div>
	</div>
</article>
