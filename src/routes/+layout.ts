import { SITE_DESCRIPTION, SITE_NAME } from '$lib/const';

export function load() {
	return {
		og: {
			type: 'website',
			title: SITE_NAME,
			description: SITE_DESCRIPTION
		}
	};
}
