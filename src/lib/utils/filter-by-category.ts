import type { TProduct } from '$lib/types/products';

export const filterByCategory = (products: TProduct[], category: string): TProduct[] => {
	if (category === 'all') {
		return products;
	}

	return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
};
