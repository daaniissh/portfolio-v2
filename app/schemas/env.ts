import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BLOG_API_URL: z.string().min(1),
  GITHUB_TOKEN: z.string().min(1),
});

export const publicEnvKeys = ['BLOG_API_URL'] as const satisfies ReadonlyArray<keyof z.infer<typeof envSchema>>;
export type PublicEnvKeys = (typeof publicEnvKeys)[number];

export type PublicEnvs = Pick<z.infer<typeof envSchema>, PublicEnvKeys>;
