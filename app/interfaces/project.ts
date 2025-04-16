export interface IProjectCardLegacy {
  lang: string;
  name: string;
  description: string;
  stars: number;
}

export interface IProjectCard {
  name: string;
  slug: string;
  description: string;
  contentHTML: string;
  languages: string[];
  liveUrl?: string;
  githubUrl?: string[];
}
