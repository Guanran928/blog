<script lang="ts">
	import 'prism-themes/themes/prism-gruvbox-dark.min.css';
	import { onMount } from 'svelte';
	import Toc from '$lib/component/Toc.svelte';
	import TableOfContents from '@lucide/svelte/icons/table-of-contents';
	import X from '@lucide/svelte/icons/x';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import Badge from '$lib/component/Badge.svelte';

	let { data } = $props();

	let open = $state(false);
	let Content = $derived(data.content.default);
	let article = $state<HTMLElement | null>(null);
	const copyResetTimers = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>();

	async function copyCode(event: Event) {
		if (!(event.target instanceof Element)) return;

		const button = event.target.closest<HTMLButtonElement>('[data-copy-code]');
		if (!button) return;

		const code = button.closest('pre')?.querySelector('code')?.textContent;
		if (!code) return;

		await navigator.clipboard.writeText(code);

		const resetTimer = copyResetTimers.get(button);
		if (resetTimer) clearTimeout(resetTimer);

		button.dataset.copied = 'true';
		copyResetTimers.set(
			button,
			setTimeout(() => {
				delete button.dataset.copied;
				copyResetTimers.delete(button);
			}, 1200)
		);
	}

	function addCopyButtons() {
		for (const pre of article?.querySelectorAll<HTMLPreElement>('pre:has(> code)') ?? []) {
			if (pre.querySelector('[data-copy-code]')) continue;

			pre.classList.add('group', 'relative');
			pre.dataset.language =
				[...pre.classList, ...pre.querySelector('code')!.classList]
					.find((className) => className.startsWith('language-'))
					?.replace('language-', '') ?? 'text';

			const button = document.createElement('button');
			button.type = 'button';
			button.ariaLabel = 'Copy code';
			button.dataset.copyCode = 'true';
			button.className =
				'copy-code-button absolute top-11 right-2 z-10 border border-border bg-surface px-2 py-1 font-sans text-xs opacity-0 shadow-xs transition-opacity group-hover:opacity-100 focus-visible:opacity-100';

			pre.insertBefore(button, pre.firstChild);
		}
	}

	onMount(() => {
		addCopyButtons();
		article?.addEventListener('click', copyCode);
		return () => article?.removeEventListener('click', copyCode);
	});

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
	<header class="flex flex-col gap-2 pt-3 pb-8">
		<div class="flex flex-col items-baseline justify-between sm:flex-row">
			<!-- leading-normal fixes view transition's ghost image -->
			<h1 class="text-4xl leading-normal font-semibold text-pretty" style:--tag="h-{data.slug}">
				{data.content.metadata?.title ?? data.slug}
			</h1>

			<!-- the position of this looks imbalanced with the <Toc>... -->
			<time
				datetime={data.content.metadata?.date ?? undefined}
				style:--tag="t-{data.slug}"
				class="text-muted-foreground"
			>
				{data.content.metadata?.date
					? new Date(data.content.metadata?.date).toLocaleDateString()
					: 'Invalid Date'}
			</time>
		</div>

		{#if data.content.metadata?.tags}
			<div class="flex gap-1.5">
				{#each data.content.metadata.tags as tag (tag)}
					<Badge>#{tag}</Badge>
				{/each}
			</div>
		{/if}
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
						class="self-end rounded-lg border border-border bg-surface p-4 shadow-sm sm:order-last"
					/>
					<button
						aria-label="目录"
						class="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-stone-200 dark:bg-stone-700"
						onclick={() => (open = false)}><X size={20} strokeWidth={2.5} /></button
					>
				</div>
			{/if}

			<button
				class="fixed right-4 bottom-4 z-40 rounded-lg border border-border bg-surface p-2 shadow-sm"
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

		<div class="flex w-full min-w-0 flex-col gap-8">
			{#if data.content.metadata?.draft}
				<div
					class="not-prose flex flex-col border-l-[1.5px] border-accent-foreground px-3 font-sans text-sm"
				>
					<b class="text-accent-foreground">警告</b>
					<span>本文为草稿，内容可能不完整或有所变动。</span>
				</div>
			{/if}
			<div
				class="prose w-full max-w-none wrap-break-word prose-neutral dark:prose-invert prose-headings:scroll-mt-8 prose-headings:decoration-underline prose-a:decoration-underline prose-a:transition-[text-decoration-color] prose-a:hover:decoration-accent-foreground"
				bind:this={article}
			>
				<Content />
			</div>
		</div>
	</div>
</article>

<style>
	@reference "../../layout.css";

	:global(.footnote-backref) {
		@apply pl-2;
	}

	:global(pre[data-language]) {
		@apply pt-10;
	}

	:global(pre[data-language]::before) {
		content: attr(data-language);
		@apply absolute top-0 right-0 left-0 border-b border-white/10 px-4 py-2 font-sans text-xs text-white/60 uppercase;
	}

	:global(.copy-code-button) {
		@apply h-7 min-w-18 overflow-hidden text-transparent;
		transform: scale(1);
		transition:
			opacity 150ms ease,
			transform 150ms ease;
	}

	:global(.copy-code-button:active) {
		transform: scale(0.97);
	}

	:global(.copy-code-button::before),
	:global(.copy-code-button::after) {
		@apply absolute inset-0 flex items-center justify-center gap-1.5 text-foreground;
		transition:
			opacity 150ms ease,
			transform 150ms ease,
			filter 150ms ease;
	}

	:global(.copy-code-button::before) {
		content: '⧉ Copy';
		opacity: 1;
		filter: blur(0);
		transform: scale(1);
	}

	:global(.copy-code-button::after) {
		content: '✓ Copied';
		opacity: 0;
		filter: blur(4px);
		transform: scale(0.8);
	}

	:global(.copy-code-button[data-copied='true']::before) {
		opacity: 0;
		filter: blur(4px);
		transform: scale(0.8);
	}

	:global(.copy-code-button[data-copied='true']::after) {
		opacity: 1;
		filter: blur(0);
		transform: scale(1);
	}
</style>
