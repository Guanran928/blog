import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import footnotes from 'remark-footnotes';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		experimental: {
			handleRenderingErrors: true
		}
	},
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [footnotes],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'wrap',
						properties: {
							className: ['not-prose', 'hover:underline']
						}
					}
				],

				// make tables not overflow
				() => (tree) => {
					visit(tree, 'element', (node, index, parent) => {
						if (node.tagName !== 'table' || !parent || index === undefined) return;
						parent.children[index] = {
							type: 'element',
							tagName: 'div',
							properties: { class: 'overflow-x-auto' },
							children: [node]
						};
					});
				}
			]
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
