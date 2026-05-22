import { fetchCached, type CacheEntry } from '$lib/server/fetchCached';
import { GITHUB_TOKEN, MONKEYTYPE_APE_KEY, OSU_API_KEY, STEAM_API_KEY } from '$env/static/private';

import type { mmr } from '$lib/types/valorant';
import type { OsuUser } from '$lib/types/osu';
import type { SteamGame, SteamOwnedGames } from '$lib/types/steam';
import type { ProfileResponse } from '$lib/types/monkeytype';
import type { GithubContributions, GithubContributionsResponse } from '$lib/types/github';
import type { LayoutServerLoadEvent } from './$types';

export const prerender = false;

let ValCache: CacheEntry<mmr> | null = null;
let OsuCache: CacheEntry<OsuUser> | null = null;
let SteamCache: CacheEntry<SteamGame> | null = null;
let MonkeyTypeCache: CacheEntry<ProfileResponse> | null = null;
let GithubCache: CacheEntry<GithubContributions> | null = null;

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
		new Request('https://api.monkeytype.com/users/Guanran928/profile', {
			headers: { Authorization: `ApeKey ${MONKEYTYPE_APE_KEY}` }
		}),
		(json) => json,
		undefined,
		_fetch
	);
}

const githubHeaders = () =>
	new Headers({
		Accept: 'application/vnd.github+json',
		Authorization: `Bearer ${GITHUB_TOKEN}`,
		'Content-Type': 'application/json',
		'User-Agent': 'blog.ny4.dev',
		'X-GitHub-Api-Version': '2022-11-28'
	});

function fetchGithubContributions(_fetch: typeof fetch) {
	const year = new Date().getFullYear();

	return fetchCached<GithubContributionsResponse, GithubContributions>(
		GithubCache,
		(entry) => (GithubCache = entry),
		new Request('https://api.github.com/graphql', {
			method: 'POST',
			headers: githubHeaders(),
			body: JSON.stringify({
				query: `query UserContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
					user(login: $login) {
						contributionsCollection(from: $from, to: $to) {
							restrictedContributionsCount
							contributionCalendar {
								totalContributions
								weeks {
									contributionDays {
										date
										contributionCount
									}
								}
							}
						}
					}
				}`,
				variables: {
					login: 'Guanran928',
					from: `${year}-01-01T00:00:00Z`,
					to: `${year}-12-31T23:59:59Z`
				}
			})
		}),
		(json) => {
			const contributions = json.data?.user?.contributionsCollection;
			const calendar = contributions?.contributionCalendar;
			if (!calendar)
				throw new Error(json.errors?.[0]?.message ?? 'Missing GitHub contribution calendar');

			return {
				data: Object.fromEntries(
					calendar.weeks.flatMap((week) =>
						week.contributionDays.map((day) => [day.date, day.contributionCount] as const)
					)
				),
				restricted: contributions.restrictedContributionsCount,
				total: calendar.totalContributions + contributions.restrictedContributionsCount,
				year
			};
		},
		undefined,
		_fetch
	);
}

export async function load({ fetch }: LayoutServerLoadEvent) {
	const valPromise = fetchVal(fetch);
	const osuPromise = fetchOsu(fetch);
	const csPromise = fetchSteam(fetch);
	const monkeytypePromise = fetchMonkeyType(fetch);
	const githubPromise = fetchGithubContributions(fetch);

	return {
		val: valPromise,
		osu: osuPromise,
		cs: csPromise,
		monkeytype: monkeytypePromise,
		github: githubPromise
	};
}
