import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export interface PostMetadata {
	title?: string;
	date?: string;
	tags?: string[];
}

export interface PostModule {
	metadata?: PostMetadata;
	default: Component;
}

export interface Heading {
	level: number;
	text: string;
	id: string;
}

const contentModules = import.meta.glob<PostModule>('/src/posts/**/+page.svx');

export async function getPostBySlug(slug: string): Promise<PostModule> {
	const loader = contentModules[`/src/posts/${slug}/+page.svx`];
	if (!loader) throw error(404, 'Post Not found');
	return await loader();
}
