import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		products: []
	};
}) satisfies PageServerLoad;
