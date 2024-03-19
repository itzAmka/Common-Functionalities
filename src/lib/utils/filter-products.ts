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

export const filterByRateRange = (products: TProduct[], rateRange: string): TProduct[] => {
	if (rateRange === 'all') {
		return products;
	}

	// split the rate range string into an array of two strings, then convert them to numbers
	const [min, max] = rateRange.split('-').map(Number);

	return products.filter((product) => product.rating.rate >= min && product.rating.rate <= max);
};

export const filterProducts = (
	products: TProduct[],
	category: string,
	priceRange: string
): TProduct[] => {
	if (category === 'all' && priceRange === 'all') {
		return products;
	}

	let filteredProducts = products;

	if (category !== 'all') {
		filteredProducts = filterByCategory(filteredProducts, category);
	}

	if (priceRange !== 'all') {
		filteredProducts = filterByPriceRange(filteredProducts, priceRange);
	}

	return filteredProducts;
};
