import type { TProduct } from '$lib/types/products';

export const filterByCategory = (products: TProduct[], category: string): TProduct[] => {
	if (category === 'all') {
		return products;
	}

	return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
};

export const filterByPriceRange = (products: TProduct[], priceRange: string): TProduct[] => {
	if (priceRange === 'all') {
		return products;
	}

	// split the price range string into an array of two strings, then convert them to numbers
	const [min, max] = priceRange.split('-').map(Number);

	return products.filter((product) => product.price >= min && product.price <= max);
};
