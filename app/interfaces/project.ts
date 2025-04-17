export interface IProjectCard {
  name: string;
  slug: string;
  description: string;
  contentHTML: string;
  languages: string[];
  stars: number;
  liveUrl?: string;
  githubUrl?: string[];
}
