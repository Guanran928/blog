import { error } from '@sveltejs/kit';

export const CACHE_TTL = 3_600_000;
export type CacheEntry<T> = { data: T; ts: number };

export async function fetchCached<TRaw, T>(
	cache: CacheEntry<T> | null,
	setCache: (entry: CacheEntry<T>) => void,
	url: URL,
	transform: (raw: TRaw) => T | null,
	parse: (res: Response) => Promise<TRaw> = (res) => res.json(),
	fetchFn: typeof fetch = globalThis.fetch,
	ttl: number = CACHE_TTL
): Promise<T> {
	if (isCached(cache, ttl)) {
		return cache!.data;
	}

	let res: Response;
	try {
		res = await fetchFn(url);
	} catch (e) {
		error(500, `Network error: ${e instanceof Error ? e.message : String(e)}`);
	}

	if (!res.ok) {
		error(res.status, `HTTP ${res.status} ${res.statusText}`);
	}

	let raw: TRaw;
	try {
		raw = await parse(res);
	} catch (e) {
		error(500, `Failed to parse response: ${e instanceof Error ? e.message : String(e)}`);
	}

	const data = transform(raw);
	if (data === null) {
		error(500, 'Transform returned null');
	}

	setCache({ data, ts: Date.now() });
	return data;
}

export function isCached<T>(cache: CacheEntry<T> | null, ttl: number = CACHE_TTL) {
	return cache !== null && Date.now() - cache.ts < ttl;
}
