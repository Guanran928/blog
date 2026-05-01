import { getAllPosts } from '$lib/server/posts.js';

export const prerender = true;

export function load() {
	return {
		posts: getAllPosts().slice(0, 6)
	};
}
