import { DOMAIN } from '$lib/const';
import { posts } from '$lib/server/posts';
import { create } from 'xmlbuilder2';

export async function GET() {
	const rootPages = ['/', '/dn42', '/friends', '/posts', '/services'].map((page) => ({
		loc: `https://${DOMAIN}${page}`,
		changefreq: 'daily',
		priority: '0.7'
	}));

	// the order is reversed... but it doesn't matter in sitemaps
	const postPages = posts.map((post) => ({
		loc: `https://${DOMAIN}/posts/${post.slug}`,
		lastmod: post.metadata?.date,
		changefreq: 'daily',
		priority: '0.7'
	}));

	const body = create(
		{ version: '1.0', encoding: 'UTF-8' },
		{
			urlset: {
				'@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
				'@xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
				'@xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
				'@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
				'@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
				'@xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',

				url: [...rootPages, ...postPages]
			}
		}
	).end({
		prettyPrint: true
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
