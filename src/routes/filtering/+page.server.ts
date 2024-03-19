import type { PageServerLoad } from './$types';
import type { TProduct } from '$lib/types/products';
import { error } from '@sveltejs/kit';

export const load = (async ({ fetch }) => {
	const productsRes = await fetch('https://fakestoreapi.com/products');
	const productCategoriesRes = await fetch('https://fakestoreapi.com/products/categories');

	if (!productsRes.ok) {
		error(productsRes.status, 'Failed to load products');
	}

	if (!productCategoriesRes.ok) {
		error(productCategoriesRes.status, 'Failed to load product categories');
	}

	const products = await productsRes.json();
	const productCategories = await productCategoriesRes.json();

	return {
		products: products as TProduct[],
		productCategories
	};
}) satisfies PageServerLoad;
