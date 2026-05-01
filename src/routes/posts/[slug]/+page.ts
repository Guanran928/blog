import { getPostBySlug } from '$lib/posts';

export async function load({ parent, params, data }) {
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
