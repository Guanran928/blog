<script lang="ts">
	import './layout.css';

	import { cn } from '$lib/cn';
	import { DOMAIN, SITE_NAME } from '$lib/const';
	import favicon from '$lib/assets/favicon.svg';

	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';

	onNavigate(async (navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((oldStateCaptureResolve) => {
			document.startViewTransition(async () => {
				oldStateCaptureResolve();
				await navigation.complete;
			});
		});
	});

	const navLinks: { href: Pathname; label: string; match?: string }[] = [
		{ href: '/posts', label: '文章', match: 'startsWith' },
		{ href: '/friends', label: '好友' },
		{ href: '/services', label: '服务' },
		// PEER REQUEST HALTED
		// { href: resolve('/dn42'), label: 'DN42' },
		{ href: '/about', label: '关于' }
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page.data.og.title}</title>

	<link rel="alternate" type="application/atom+xml" title={SITE_NAME} href="/index.xml" />

	<meta name="description" content={page.data.og.description} />
	<link rel="canonical" href={`https://${DOMAIN + page.url.pathname}`} />

	<meta property="og:type" content={page.data.og.type} />
	<meta property="og:title" content={page.data.og.title} />
	<meta property="og:description" content={page.data.og.description} />
	<meta property="og:url" content={`https://${DOMAIN + page.url.pathname}`} />
</svelte:head>

<nav class="flex flex-col items-center justify-between gap-1 pb-5 sm:flex-row" style:--tag="nav">
	<a href={resolve('/')} class="text-xl font-medium">{SITE_NAME}</a>
	<div class="flex items-center gap-3">
		{#each navLinks as link, i (link.href)}
			{@const isCurrent =
				link.match === 'startsWith'
					? page.url.pathname.startsWith(link.href)
					: page.url.pathname === link.href}

			{#if i > 0}
				<span aria-hidden="true" class="text-neutral-300 dark:text-neutral-700">·</span>
			{/if}

			<a
				href={resolve(link.href)}
				aria-current={isCurrent ? 'page' : undefined}
				class="group relative text-muted-foreground transition-[color] duration-150 hover:text-foreground aria-[current=page]:text-foreground"
			>
				{link.label}
				<span
					class={cn(
						'absolute right-0 bottom-0 left-0 h-[1.5px] origin-left',
						isCurrent
							? 'bg-accent-foreground'
							: 'bg-transparent group-hover:bg-underline group-hover:transition-[background-color] group-hover:duration-150'
					)}
					style:view-transition-name={isCurrent ? 'nav-underline-active' : undefined}
				></span>
			</a>
		{/each}
	</div>
</nav>

<main class="flex-1">
	{@render children()}
</main>

<footer class="pt-4 text-center text-sm text-muted-foreground" style:--tag="footer">
	© {new Date().getFullYear()} Guanran928, 内容以
	<a
		href="https://creativecommons.org/licenses/by-sa/4.0/"
		class="decoration-underline hover:underline">CC-BY-SA-4.0</a
	>
	授权
</footer>
