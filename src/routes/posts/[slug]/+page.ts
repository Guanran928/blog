import { getPostBySlug } from '$lib/posts';
import type { PageLoadEvent } from './$types';

export async function load({ parent, params, data }: PageLoadEvent) {
	const parentData = await parent();
	const post = await getPostBySlug(params.slug);

	return {
		headings: data.headings,
		og: {
			...parentData.og,
			type: 'article',
			title: post.metadata?.title ?? 'Invalid Title'
		},
		content: post,
		slug: params.slug
	};
}
