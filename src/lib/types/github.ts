export type GithubContributionDay = {
	date: string;
	contributionCount: number;
};

export type GithubContributionsResponse = {
	data?: {
		user?: {
			contributionsCollection: {
				restrictedContributionsCount: number;
				contributionCalendar: {
					totalContributions: number;
					weeks: {
						contributionDays: GithubContributionDay[];
					}[];
				};
			};
		};
	};
	errors?: { message: string }[];
};

export type GithubContributions = {
	data: Record<string, number>;
	restricted: number;
	total: number;
	year: number;
};
