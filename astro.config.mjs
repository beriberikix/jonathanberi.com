// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://jonathanberi.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
