// RSS feed for the blog
import { DOMAIN, SITE_NAME } from '$lib/const';
import { getAllPosts } from '$lib/server/posts.js';
import { Feed } from 'feed';

export const prerender = true;

export async function GET() {
	const posts = getAllPosts();

	const feed = new Feed({
		title: SITE_NAME,
		id: `https://${DOMAIN}`,
		link: `https://${DOMAIN}`,
		language: 'zh-Hans',
		copyright: `© ${new Date().getFullYear()} Guanran928, 内容以 [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans) 授权`,
		favicon: `https://${DOMAIN}/favicon.ico`,
		updated: new Date(posts[0]?.date)
	});

	for (const post of posts) {
		if (!post.title || !post.date) continue;
		feed.addItem({
			title: post.title,
			id: `https://${DOMAIN}/posts/${post.slug}`,
			link: `https://${DOMAIN}/posts/${post.slug}`,
			date: new Date(post.date)
		});
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}
