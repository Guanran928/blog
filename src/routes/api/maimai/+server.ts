import { fetchCached, type CacheEntry, CACHE_TTL } from '$lib/server/fetchCached';
import { MAIMAI_DX_FRIEND_CODE } from '$env/static/private';

type ImageData = { buffer: ArrayBuffer; contentType: string };
let MaimaiCache: CacheEntry<ImageData> | null = null;

function fetchMaimaiImage() {
	return fetchCached<ImageData, ImageData>(
		MaimaiCache,
		(entry) => (MaimaiCache = entry),
		new URL(`https://dxrating.luoling.moe/api/luoxue/genImage/${MAIMAI_DX_FRIEND_CODE}`),
		(raw) => raw,
		async (res) => ({
			buffer: await res.arrayBuffer(),
			contentType: res.headers.get('Content-Type') ?? 'image/png'
		})
	);
}

export async function GET() {
	const result = await fetchMaimaiImage();

	return new Response(result.buffer, {
		headers: {
			'Content-Type': result.contentType,
			'Cache-Control': `public, max-age=${CACHE_TTL / 1000}`
		}
	});
}
