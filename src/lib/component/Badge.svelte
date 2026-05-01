<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = '',
		variant = 'normal',
		...props
	}: {
		children?: Snippet;
		class?: string;
		variant?: 'normal' | 'destructive';
	} = $props();

	const variantCSS = {
		normal: '',
		destructive: 'border-destructive-border bg-destructive'
	};
</script>

<span
	{...props}
	class={cn(
		'rounded-full border border-border bg-surface px-2 py-0.5 font-sans text-xs font-medium',
		variantCSS[variant],
		className
	)}
>
	{@render children?.()}
</span>
