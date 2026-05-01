import { posts } from '$lib/server/posts.js';

export const prerender = true;

export function load() {
	return {
		posts: posts
			.map(({ metadata, slug }) => ({ metadata, slug }))
			.filter((post) => post.metadata?.draft !== true)
			.slice(0, 6)
	};
}
