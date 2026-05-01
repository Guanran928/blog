export type ProfileResponse = {
	message: string;
	data: ProfileData;
};

export type ProfileData = {
	name: string;
	addedAt: number;
	typingStats: TypingStats;
	personalBests: PersonalBests;
	discordId: string;
	xp: number;
	streak: number;
	maxStreak: number;
	isPremium: boolean;
	inventory: Inventory;
	details: UserDetails;
	allTimeLbs: AllTimeLbs;
	uid: string;
};

export type TypingStats = {
	completedTests: number;
	startedTests: number;
	timeTyping: number;
};

export type PersonalBests = {
	time: Record<string, TestResult[]>;
	words: Record<string, TestResult[]>;
};

export type TestResult = {
	acc: number;
	consistency: number;
	difficulty: 'normal' | string;
	lazyMode: boolean;
	language: string;
	punctuation: boolean;
	raw: number;
	wpm: number;
	numbers: boolean;
	timestamp: number;
};

export type Inventory = {
	badges: unknown[];
};

export type UserDetails = {
	bio: string;
	keyboard: string;
	socialProfiles: SocialProfiles;
	showActivityOnPublicProfile: boolean;
};

export type SocialProfiles = {
	github?: string;
	twitter?: string;
	website?: string;
};

export type AllTimeLbs = {
	time: Record<string, Record<string, RankEntry>>;
};

export type RankEntry = {
	rank: number;
	count: number;
};
