<script lang="ts">
	import { cn } from '$lib/cn';
	import { page } from '$app/state';
	import { pushState } from '$app/navigation';
	import { SvelteSet } from 'svelte/reactivity';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Heading {
		level: number;
		text: string;
		id: string;
	}

	let {
		headings,
		article,
		class: className,
		...props
	}: {
		headings: Heading[];
		article: HTMLElement | null;
	} & HTMLAttributes<HTMLElement> = $props();

	let activeHeading = $state<string | null>(null);
	const minLevel = $derived(Math.min(...headings.map((h) => h.level)));

	$effect(() => {
		if (!article) return;

		const intersecting = new SvelteSet<Element>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						intersecting.add(entry.target);
					} else {
						intersecting.delete(entry.target);
					}
				}

				const top = [...intersecting].sort(
					(a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
				)[0];

				if (!top) return;

				let el: Element | null = top;
				while (el) {
					if (/^H[2-6]$/.test(el.tagName)) {
						activeHeading = (el as HTMLElement).id;
						break;
					}
					el = el.previousElementSibling;
				}
			},
			{ rootMargin: '-32px 0% 0% 0%' }
		);

		article.querySelectorAll(':scope > *').forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<aside class={cn('min-w-50 overflow-hidden', className)} {...props}>
	<nav class="space-y-2">
		<h2 class="ml-[-0.1em] text-2xl font-bold text-(--text-toc-primary)">目录</h2>
		<ol
			class="max-h-[50vh] space-y-1.5 overflow-y-auto text-(--text-toc-secondary) md:max-h-[70vh]"
		>
			{#each headings as heading (heading.id)}
				{@const indent = heading.level - minLevel}
				{@const active = heading.id === activeHeading}
				<li
					style:margin-left="{indent}em"
					class={cn(
						'hover:text-foreground hover:underline ',
						active
							? 'text-foreground underline decoration-accent-foreground'
							: 'decoration-background transition-[text-decoration] hover:decoration-underline'
					)}
				>
					<a
						href={`#${heading.id}`}
						onclick={(e) => {
							e.preventDefault();
							document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
							// FIXME: https://github.com/sveltejs/kit/issues/14750
							// eslint-disable-next-line svelte/no-navigation-without-resolve
							pushState(`${page.url.pathname}#${heading.id}`, {});
						}}
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
</aside>

<style>
	aside {
		--text-toc-primary: var(--color-neutral-900);
		--text-toc-secondary: var(--color-neutral-700);
	}

	@media (prefers-color-scheme: dark) {
		aside {
			--text-toc-primary: var(--color-neutral-100);
			--text-toc-secondary: var(--color-neutral-300);
		}
	}
</style>
