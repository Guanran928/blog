<script lang="ts">
	import 'prism-themes/themes/prism-gruvbox-dark.min.css';
	import Toc from '$lib/component/Toc.svelte';
	import TableOfContents from '@lucide/svelte/icons/table-of-contents';
	import X from '@lucide/svelte/icons/x';
	import { cubicOut, cubicIn } from 'svelte/easing';

	let { data } = $props();

	let open = $state(false);
	let Content = $derived(data.content.default);
	let article = $state<HTMLElement | null>(null);

	const menuTransition = (_node: Element, { direction }: { direction: 'in' | 'out' }) => ({
		duration: 150,
		easing: direction === 'in' ? cubicOut : cubicIn,
		css: (t: number) => `
			opacity: ${t};
			transform: scale(${0.98 + 0.02 * t});
			translate: ${4 - 4 * t}px ${4 - 4 * t}px;
			filter: blur(${4 - 4 * t}px);
			transform-origin: bottom right;
		`
	});
</script>

<svelte:head>
	<meta name="fediverse:creator" content="@nyancat:mastodon.ny4.dev" />

	<meta property="article:published_time" content={data.content.metadata?.date} />
	<meta property="article:author" content="Guanran Wang" />
</svelte:head>

<article>
	<header class="flex flex-col items-baseline justify-between pt-3 pb-8 sm:flex-row">
		<!-- leading-normal fixes view transition's ghost image -->
		<h1 class="text-4xl leading-normal font-semibold text-pretty" style:--tag="h-{data.slug}">
			{data.content.metadata?.title ?? data.slug}
		</h1>
		<time
			datetime={data.content.metadata?.date ?? undefined}
			style:--tag="t-{data.slug}"
			class="text-muted-foreground"
		>
			{data.content.metadata?.date
				? new Date(data.content.metadata?.date).toLocaleDateString()
				: 'Invalid Date'}
		</time>
	</header>

	{#if data.headings.length > 0}
		<div class="sm:hidden">
			{#if open}
				<div
					class="fixed right-0 bottom-0 z-50 m-2"
					in:menuTransition={{ direction: 'in' }}
					out:menuTransition={{ direction: 'out' }}
				>
					<Toc
						headings={data.headings}
						{article}
						class="self-end  border border-border bg-surface p-4 shadow-sm sm:order-last"
					/>
					<button
						aria-label="目录"
						class="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-700"
						onclick={() => (open = false)}><X size={20} strokeWidth={2.5} /></button
					>
				</div>
			{/if}

			<button
				class="fixed right-4 bottom-4 z-40 border border-border bg-surface p-2 shadow-sm"
				onclick={() => (open = true)}
			>
				<TableOfContents />
			</button>
		</div>
	{/if}

	<div class="flex flex-col items-start gap-8 sm:flex-row">
		{#if data.headings.length > 0}
			<Toc headings={data.headings} {article} class="sticky top-8 hidden sm:order-last sm:block" />
		{/if}
		<div
			class="prose w-full max-w-none min-w-0 wrap-break-word prose-neutral dark:prose-invert prose-headings:scroll-mt-8 prose-headings:decoration-underline prose-a:decoration-underline prose-a:transition-[text-decoration-color] prose-a:hover:decoration-accent-foreground"
			bind:this={article}
		>
			<Content />
		</div>
	</div>
</article>

<style>
	@reference "../../layout.css";

	:global(.footnote-backref) {
		@apply pl-2;
	}
</style>
