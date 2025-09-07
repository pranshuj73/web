import { colors } from './src/utils/colorHash';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    ...colors.map(color => `bg-${color}-500`),
  ],
}
