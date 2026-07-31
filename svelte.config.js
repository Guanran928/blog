import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import footnotes from 'remark-footnotes';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';

const codeBlockLanguagesKey = 'codeBlockLanguages';

function collectCodeBlockLanguages() {
	return (tree, file) => {
		const languages = [];

		visit(tree, 'code', (node) => {
			languages.push(node.lang?.toLowerCase() || 'text');
		});

		file.data[codeBlockLanguagesKey] = languages;
	};
}

function escapeAttribute(value) {
	return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function addClassName(openingTag, className) {
	const classAttribute = openingTag.match(/ class="([^"]*)"/);
	if (!classAttribute) return openingTag.replace(/>$/, ` class="${className}">`);

	const classes = classAttribute[1].split(/\s+/);
	if (classes.includes(className)) return openingTag;

	return openingTag.replace(classAttribute[0], ` class="${classAttribute[1]} ${className}"`);
}

function addCodeBlockHeaders() {
	return (tree, file) => {
		const languages = file.data[codeBlockLanguagesKey];
		if (!Array.isArray(languages)) return;

		let index = 0;

		visit(tree, 'raw', (node) => {
			if (typeof node.value !== 'string' || !node.value.startsWith('<pre')) return;

			const language = escapeAttribute(languages[index++] ?? 'text');
			node.value = node.value.replace(/^<pre[^>]*>/, (openingTag) => {
				const withClass = addClassName(addClassName(openingTag, 'relative'), 'group');
				return withClass.replace(/>$/, ` data-language="${language}">`);
			});
		});
	};
}

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
			remarkPlugins: [footnotes, collectCodeBlockLanguages],
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
				},
				addCodeBlockHeaders
			]
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
