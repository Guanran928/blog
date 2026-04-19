import { FRIENDS_DATA } from '$lib/const';
import type { RequestHandler } from './$types';
import sharp from 'sharp';

const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h

interface AvatarCache {
	data: Buffer;
	ts: number;
}

const cache = new Map<string, AvatarCache>();

const validURLs = FRIENDS_DATA.map((friend) => friend.url);

export const GET: RequestHandler = async ({ url }) => {
	const src = url.searchParams.get('url');
	if (!src) return new Response('Missing url', { status: 400 });

	if (!validURLs.includes(src)) {
		return new Response('Invalid url', { status: 400 });
	}

	const hit = cache.get(src);
	if (hit && Date.now() - hit.ts < CACHE_TTL) {
		return respond(hit.data);
	}

	const res = await fetch(src);
	if (!res.ok) {
		return new Response('Upstream error', { status: 502 });
	}

	const raw = Buffer.from(await res.arrayBuffer());
	const resized = await sharp(raw)
		// 3x of 48px * 48px
		.resize(144, 144, { fit: 'cover', position: 'centre' })
		.webp({ quality: 80 })
		.toBuffer();

	cache.set(src, { data: resized, ts: Date.now() });

	return respond(resized);
};

function respond(data: Buffer) {
	return new Response(new Uint8Array(data), {
		headers: {
			'Content-Type': 'image/webp',
			'Cache-Control': 'public, max-age=86400, immutable'
		}
	});
}
