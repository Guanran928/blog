export interface LeetifyProfile {
	privacy_mode: string;
	winrate: number;
	total_matches: number;
	first_match_date: string;
	name: string;
	steam64_id: string;
	id: string;
	ranks?: {
		leetify: number | null;
		premier: number | null;
		faceit: number | null;
		faceit_elo: number | null;
		wingman: number | null;
		renown: number | null;
		competitive: { map_name: string; rank: number }[] | null;
	};
	rating: Record<string, number>;
	stats: Record<string, number>;
	recent_matches: unknown[];
}
