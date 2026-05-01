<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		...props
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<span {...props} class={cn('skeleton inline-block h-6 rounded', className)}
	>{@render children?.()}</span
>

<style>
	.skeleton {
		background-color: var(--skeleton-base);
		background-image: linear-gradient(
			90deg,
			transparent 0%,
			var(--skeleton-shine) 50%,
			transparent 100%
		);
		background-size: 200% 100%;
		animation: shimmer 3s linear infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}

	.skeleton {
		--skeleton-base: var(--color-neutral-100);
		--skeleton-shine: var(--color-neutral-300);
	}

	@media (prefers-color-scheme: dark) {
		.skeleton {
			--skeleton-base: var(--color-neutral-800);
			--skeleton-shine: var(--color-neutral-600);
		}
	}
</style>
