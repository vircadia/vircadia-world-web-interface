import { z } from 'astro/zod';

const envSchema = z.object({
  DEFAULT_TITLE: z.string().default('Vircadia World Web Interface'),
  DEFAULT_DESCRIPTION: z.string().default('...'),
  DEFAULT_URL: z.string().url().default('https://app.vircadia.com'),
  DEFAULT_OG_IMAGE: z.string().default('/brand/logo_icon.webp'),
  DEFAULT_OG_TYPE: z.string().default('website'),
  DEFAULT_FAVICON: z.string().default('/brand/favicon.svg'),
});

const env = envSchema.parse(import.meta.env);

export const config = {
  defaultTitle: env.DEFAULT_TITLE,
  defaultDescription: env.DEFAULT_DESCRIPTION,
  defaultUrl: env.DEFAULT_URL,
  defaultFavicon: env.DEFAULT_FAVICON,
  defaultOgImage: env.DEFAULT_OG_IMAGE,
  defaultOgType: env.DEFAULT_OG_TYPE,
};
