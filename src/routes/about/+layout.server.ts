import { fetchCached, type CacheEntry } from '$lib/server/fetchCached';
import { OSU_API_KEY, STEAM_API_KEY } from '$env/static/private';

import type { mmr } from '$lib/types/valorant';
import type { OsuUser } from '$lib/types/osu';
import type { SteamGame, SteamOwnedGames } from '$lib/types/steam';
import type { ProfileResponse } from '$lib/types/monkeytype';

let ValCache: CacheEntry<mmr> | null = null;
let OsuCache: CacheEntry<OsuUser> | null = null;
let SteamCache: CacheEntry<SteamGame> | null = null;
let MonkeyTypeCache: CacheEntry<ProfileResponse> | null = null;

// TODO: use the official Riot API
function fetchVal(_fetch: typeof fetch) {
	return fetchCached<mmr, mmr>(
		ValCache,
		(entry) => (ValCache = entry),
		new URL('https://www.reng.ar/api/mmr/%E5%91%A8%20%E6%9D%B0%E5%80%AB/dylib'),
		(json) => json,
		undefined,
		_fetch
	);
}

function fetchOsu(_fetch: typeof fetch) {
	const url = new URL('https://osu.ppy.sh/api/get_user');
	url.search = new URLSearchParams({ k: OSU_API_KEY, u: '22963178', m: '3' }).toString();

	return fetchCached<OsuUser[], OsuUser>(
		OsuCache,
		(entry) => (OsuCache = entry),
		url,
		(json) => json[0] ?? null,
		undefined,
		_fetch
	);
}

function fetchSteam(_fetch: typeof fetch) {
	const url = new URL('https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/');
	url.search = new URLSearchParams({ key: STEAM_API_KEY, steamid: '76561198855505856' }).toString();

	return fetchCached<SteamOwnedGames, SteamGame>(
		SteamCache,
		(entry) => (SteamCache = entry),
		url,
		(json) => json.response.games.find((g) => g.appid === 730) ?? null,
		undefined,
		_fetch
	);
}

function fetchMonkeyType(_fetch: typeof fetch) {
	return fetchCached<ProfileResponse, ProfileResponse>(
		MonkeyTypeCache,
		(entry) => (MonkeyTypeCache = entry),
		new URL('https://api.monkeytype.com/users/Guanran928/profile'),
		(json) => json,
		undefined,
		_fetch
	);
}

export async function load({ fetch }) {
	const valPromise = fetchVal(fetch);
	const osuPromise = fetchOsu(fetch);
	const csPromise = fetchSteam(fetch);
	const monkeytypePromise = fetchMonkeyType(fetch);

	return {
		val: valPromise,
		osu: osuPromise,
		cs: csPromise,
		monkeytype: monkeytypePromise
	};
}
