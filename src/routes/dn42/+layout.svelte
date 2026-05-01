<script lang="ts">
	let { children } = $props();
</script>

<article class="prose max-w-none prose-neutral dark:prose-invert">
	{@render children()}
</article>
