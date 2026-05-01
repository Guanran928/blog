import { posts } from '$lib/server/posts.js';

export const prerender = true;

export function load() {
	return { posts };
}
