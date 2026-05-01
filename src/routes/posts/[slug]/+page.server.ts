import { headingsBySlug } from '$lib/server/posts.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types';

export const prerender = true;

export function load({ params }: PageServerLoadEvent) {
	const headings = headingsBySlug.get(params.slug);
	if (!headings) throw error(404, 'Post not found');

	return { headings };
}
