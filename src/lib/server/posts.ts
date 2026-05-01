import { error } from '@sveltejs/kit';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import remarkFrontmatter from 'remark-frontmatter';
import type { PostMetadata, PostModule, Heading } from '$lib/posts.js';

export type { PostMetadata, PostModule, Heading };

const postModules = import.meta.glob<{ metadata?: PostMetadata }>('/src/posts/**/+page.svx', {
	eager: true
});

const sources = import.meta.glob<{ default: string }>('/src/posts/**/+page.svx', {
	query: '?raw',
	eager: true
});

function extractHeadings(markdown: string): Heading[] {
	const tree = remark().use(remarkFrontmatter).parse(markdown);
	const slugger = new GithubSlugger();
	const headings: Heading[] = [];

	visit(tree, 'heading', (node) => {
		const text = toString(node);
		headings.push({ level: node.depth, text, id: slugger.slug(text) });
	});

	return headings;
}

const headingsMap = new Map(
	Object.entries(sources).map(([path, mod]) => [
		path.replace('/src/posts/', '').replace('/+page.svx', ''),
		extractHeadings(mod.default)
	])
);

export function getHeadingsBySlug(slug: string): Heading[] {
	const headings = headingsMap.get(slug);
	if (!headings) throw error(404, 'Post not found');
	return headings;
}

export function getAllPosts(): (PostMetadata & { slug: string })[] {
	return Object.entries(postModules)
		.map(([path, mod]) => ({
			slug: path.replace('/src/posts/', '').replace('/+page.svx', ''),
			...mod.metadata
		}))
		.toSorted((a, b) => {
			const dateA = a.date ? +new Date(a.date) : -Infinity;
			const dateB = b.date ? +new Date(b.date) : -Infinity;
			return dateB - dateA;
		});
}