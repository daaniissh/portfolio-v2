import { z } from 'zod';

export const projectMetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  githubURL: z.string().url().optional(),
  npmURL: z.string().url().optional(),
  liveURL: z.string().url().optional(),
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;
