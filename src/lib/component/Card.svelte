<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		class: className = '',
		...props
	}: {
		children?: Snippet;
		class?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...props} class={cn('border border-border bg-surface px-3 py-2 shadow-xs', className)}>
	{@render children?.()}
</div>
