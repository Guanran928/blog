import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';
import remarkFrontmatter from 'remark-frontmatter';
import type { PostMetadata, PostModule, Heading } from '$lib/posts.js';

export type { PostMetadata, PostModule, Heading };

const metaGlob = import.meta.glob<PostModule>('/src/posts/**/+page.svx', {
	eager: true
});

const markdownGlob = import.meta.glob<{ default: string }>('/src/posts/**/+page.svx', {
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

export const headingsBySlug = new Map(
	Object.entries(markdownGlob).map(([path, mod]) => [
		path.replace('/src/posts/', '').replace('/+page.svx', ''),
		extractHeadings(mod.default)
	])
);

export const posts = Object.entries(metaGlob)
	.map(([path, mod]) => ({
		path,
		slug: path.replace('/src/posts/', '').replace('/+page.svx', ''),
		...mod
	}))
	.toSorted((a, b) => {
		const dateA = a.metadata?.date ? +new Date(a.metadata.date) : -Infinity;
		const dateB = b.metadata?.date ? +new Date(b.metadata.date) : -Infinity;
		return dateB - dateA;
	});
