import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://app.vircadia.com",
  integrations: [vue()]
});
