import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import { config } from './vircadia.config';

// https://astro.build/config
export default defineConfig({
  site: config.baseUrl,
  integrations: [vue()]
});
