<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="flex flex-col items-center justify-center pt-8">
	<h1 class="pb-4 text-5xl font-medium md:text-9xl">{page.status}</h1>
	<h2>{page.error?.message ?? 'An unexpected error occurred'}</h2>

	<a href={resolve('/posts')} class="underline decoration-underline md:pt-2">回到文章列表</a>
</div>
