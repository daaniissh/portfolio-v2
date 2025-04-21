export interface IProject {
  name: string;
  slug: string;
  description: string;
  stars: number;
  is_npm_package: boolean;
  downloads: number;
  language: string;
  languages: string[];
  liveURL?: string;
  githubURL?: string;
  content: string;
}
