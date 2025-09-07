/**
 * Generates a complete Tailwind CSS class based on the input string using a simple hash function
 * @param input - The string to generate a color for
 * @returns A complete Tailwind CSS class (e.g., 'bg-violet-500', 'bg-blue-500')
 */
export function getColorFromHash(input: string): string {
  // Define available colors
  const colors = [
    'bg-violet-500',
    'bg-lime-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-fuchsia-500',
    'bg-sky-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-blue-500',
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
