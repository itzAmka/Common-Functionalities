import type { PageServerLoad } from './$types';
import type { TUser } from '$lib/types/users';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, url }) => {
	let pageNumber = Number(url.searchParams.get('pageNumber') || '1');
	const limit = 10;
	const skip = (pageNumber - 1) * limit;

	const usersRes = await fetch(
		`https://dummyjson.com/users?limit=${limit}&skip=${skip}&page=${pageNumber}`
	);

	if (!usersRes.ok) {
		error(usersRes.status, 'Failed to load products');
	}

	const usersData = await usersRes.json();

	const totalCount = usersData.total;
	pageNumber = Math.min(Math.ceil(totalCount / limit), pageNumber);
	const totalPages = Math.ceil(totalCount / limit);

	return {
		users: usersData.users as TUser[],
		pagination: {
			totalCount,
			skip,
			pageNumber,
			limit,
			totalPages
		}
	};
}) satisfies PageServerLoad;
