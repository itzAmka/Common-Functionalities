import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const res = await fetch('https://fakestoreapi.com/products');

	if (!res.ok) {
		error(res.status, 'Failed to load products');
	}

	const products = await res.json();

	return {
		products
	};
}) satisfies PageServerLoad;
