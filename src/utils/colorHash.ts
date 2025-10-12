export const getHash = (input: string): number => {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		const char = input.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return hash;
};

export const getTextColorFromHash = (
	input: string,
	hover: boolean = false,
): string => {
	const colors = [
		"text-violet-500",
		"text-lime-500",
		"text-cyan-500",
		"text-amber-500",
		"text-indigo-500",
		"text-emerald-500",
		"text-fuchsia-500",
		"text-sky-500",
		"text-yellow-500",
		"text-purple-500",
		"text-orange-500",
		"text-green-500",
		"text-blue-500",
	];

	const hoverColors = [
		"hover:text-violet-600",
		"hover:text-lime-600",
		"hover:text-cyan-600",
		"hover:text-amber-600",
		"hover:text-indigo-600",
		"hover:text-emerald-600",
		"hover:text-fuchsia-600",
		"hover:text-sky-600",
		"hover:text-yellow-600",
		"hover:text-purple-600",
		"hover:text-orange-600",
		"hover:text-green-600",
		"hover:text-blue-600",
	];

	const index = Math.abs(getHash(input)) % colors.length;
	return hover ? `${colors[index]} ${hoverColors[index]}` : colors[index];
};

/**
 * Generates a complete Tailwind CSS class based on the input string using a simple hash function
 * @param input - The string to generate a color for
 * @returns A complete Tailwind CSS class (e.g., 'bg-violet-500', 'bg-blue-500')
 */
export function getBackgroundColorFromHash(input: string): string {
	// Define available colors
	const colors = [
		"bg-violet-500",
		"bg-lime-500",
		"bg-cyan-500",
		"bg-amber-500",
		"bg-indigo-500",
		"bg-emerald-500",
		"bg-fuchsia-500",
		"bg-sky-500",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-orange-500",
		"bg-green-500",
		"bg-blue-500",
	];

	// Simple hash function based on string length and character codes

	// Use absolute value and modulo to get index
	const index = Math.abs(getHash(input)) % colors.length;
	return colors[index];
}
