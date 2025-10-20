// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    port: 12000
  },
  vite: {
    plugins: [tailwindcss()]
  }
});