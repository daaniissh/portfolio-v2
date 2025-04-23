import type { ProjectMetadata } from '~/schemas/project';

export interface IProject extends ProjectMetadata {
  slug: string;
  stars: number;
  downloads: number;
  language: string;
  languages: string[];
  isNpmPackage: boolean;
  content: string;
}
