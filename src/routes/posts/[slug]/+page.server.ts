import { getHeadingsBySlug, getAllPosts } from '$lib/server/posts.js';

export const prerender = true;

export function entries() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function load({ params }) {
	return { headings: getHeadingsBySlug(params.slug) };
}
