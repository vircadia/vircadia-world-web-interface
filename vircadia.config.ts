import { z } from 'zod';

const envSchema = z.object({
  VRCA_DEFAULT_TITLE: z.string().default('Vircadia World Web Interface'),
  VRCA_DEFAULT_DESCRIPTION: z.string().default('...'),
  VRCA_DEFAULT_URL: z.string().url().default('https://app.vircadia.com'),
  VRCA_DEFAULT_OG_IMAGE: z.string().default('/brand/logo_icon.webp'),
  VRCA_DEFAULT_OG_TYPE: z.string().default('website'),
  VRCA_DEFAULT_FAVICON: z.string().default('/brand/favicon.svg'),

  VRCA_BASE_URL: z.string().url().default('https://app.vircadia.com')
});

const env = envSchema.parse(import.meta.env);

export const config = {
  defaultTitle: env.VRCA_DEFAULT_TITLE,
  defaultDescription: env.VRCA_DEFAULT_DESCRIPTION,
  defaultUrl: env.VRCA_DEFAULT_URL,
  defaultFavicon: env.VRCA_DEFAULT_FAVICON,
  defaultOgImage: env.VRCA_DEFAULT_OG_IMAGE,
  defaultOgType: env.VRCA_DEFAULT_OG_TYPE,
  baseUrl: env.VRCA_BASE_URL
};
