<script lang="ts">
	import ArticleList from '$lib/component/ArticleList.svelte';

	let { data } = $props();
</script>

<h2 class="pb-2 text-2xl font-semibold">文章列表</h2>

<ArticleList data={data.posts} />
