import { DOMAIN, SITE_NAME } from '$lib/const';
import { posts } from '$lib/server/posts.js';
import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
	if (posts.length === 0) {
		return new Response(null, { status: 204 });
	}

	const feed = new Feed({
		title: SITE_NAME,
		id: `https://${DOMAIN}`,
		link: `https://${DOMAIN}`,
		language: 'zh-Hans',
		copyright: `© ${new Date().getFullYear()} Guanran928, 内容以 [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans) 授权`,
		favicon: `https://${DOMAIN}/favicon.ico`,
		updated: new Date(posts[0].metadata?.date ?? Date.now())
	});

	for (const post of posts) {
		if (!post.metadata?.title || !post.metadata?.date) continue;
		feed.addItem({
			title: post.metadata?.title,
			id: `https://${DOMAIN}/posts/${post.slug}`,
			link: `https://${DOMAIN}/posts/${post.slug}`,
			date: new Date(post.metadata.date)
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}
