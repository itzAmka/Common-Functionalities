import type { PageServerLoad } from './$types';
import type { TUser } from '$lib/types/users';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const usersRes = await fetch('https://dummyjson.com/users?limit=10');

	if (!usersRes.ok) {
		error(usersRes.status, 'Failed to load products');
	}

	const usersData = await usersRes.json();

	return {
		users: usersData.users as TUser[],
		pagination: {}
	};
}) satisfies PageServerLoad;
