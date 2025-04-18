export interface IProjectCard {
  name: string;
  slug: string;
  description: string;
  languages: string[];
  is_npm_package: boolean;
  language: string;
  stars: number;
  downloads: number;
  liveUrl?: string;
  githubUrl?: string[];
  contentHTML: string;
}
