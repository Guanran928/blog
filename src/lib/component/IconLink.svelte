<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet, Component } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		children,
		class: className,
		icon: Icon,
		...props
	}: {
		children: Snippet;
		class: string;
		icon: Component;
	} & HTMLAnchorAttributes = $props();
</script>

<a class={cn('inline-flex items-center gap-1 no-underline', className)} {...props}>
	<Icon class="size-3 shrink-0" />
	<span
		class="underline decoration-underline transition-[text-decoration-color] hover:decoration-accent-foreground"
	>
		{@render children?.()}
	</span>
</a>
