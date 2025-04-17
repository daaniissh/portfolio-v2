export interface IProjectCard {
  name: string;
  slug: string;
  description: string;
  contentHTML: string;
  language: string;
  languages: string[];
  stars: number;
  liveUrl?: string;
  githubUrl?: string[];
}
