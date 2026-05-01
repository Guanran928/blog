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

<span
	{...props}
	class={cn(
		'rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium',
		className
	)}
>
	{@render children?.()}
</span>
