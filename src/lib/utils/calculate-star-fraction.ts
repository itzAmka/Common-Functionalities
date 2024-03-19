type TStar = 'full' | 'half' | 'empty';

export const calculateStarFraction = (value: number) => {
	const integerPart = Math.floor(value);

	const decimalPart = value - integerPart;

	const stars: TStar[] = [];

	for (let i = 0; i < integerPart; i++) {
		stars.push('full');
	}

	if (decimalPart >= 0.5) {
		stars.push('half');
	}

	const remainingStars = 5 - stars.length;

	for (let i = 0; i < remainingStars; i++) {
		stars.push('empty');
	}

	return stars;
};
