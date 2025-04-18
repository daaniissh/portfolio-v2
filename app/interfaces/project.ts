export interface IProjectCard {
  name: string;
  slug: string;
  description: string;
  languages: string[];
  isNpmPackage: boolean;
  language: string;
  stars: number;
  downloads: number;
  liveUrl?: string;
  githubUrl?: string[];
  contentHTML: string;
}
