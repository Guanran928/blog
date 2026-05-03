import { posts } from '$lib/server/posts.js';

export function load() {
	return {
		posts: posts.map(({ metadata, slug }) => ({ metadata, slug }))
	};
}
