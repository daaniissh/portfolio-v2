export interface IGithubCache {
  stars: number;
  language: string;
  languages: string[];
  ok: boolean;
}

export interface INpmCache {
  downloads: number;
  ok: boolean;
}
