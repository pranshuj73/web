// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://prnsh.site',
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()], },
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Doto",
      weights: [900],
      cssVariable: "--font-pixel"
    }]
  }
});

