/**
 * Generates a color name based on the input string using a simple hash function
 * @param input - The string to generate a color for
 * @returns A base color name (e.g., 'red', 'blue', 'green')
 */
export function getColorFromHash(input: string): string {
  // Define available colors (randomized order)
  const colors = [
    'violet',
    'lime',
    'cyan',
    'amber',
    'indigo',
    'emerald',
    'fuchsia',
    'sky',
    'yellow',
    'purple',
    'orange',
    'green',
    'blue',
  ];

  // Simple hash function based on string length and character codes
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value and modulo to get index
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
