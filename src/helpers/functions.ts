export const showChangeInDollar = (input: number): string => {
	if (input > 0) {
		return `$${input.toFixed(2)}`;
	}

	return `-$${(Math.abs(input)).toFixed(2)}`;
};
