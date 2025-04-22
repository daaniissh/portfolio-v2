export interface IGithubStats {
  stars: number;
  language: string;
  languages: string[];
  ok: boolean;
}

export interface INpmStats {
  downloads: number;
  ok: boolean;
}
