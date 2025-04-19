import { LRUCache } from 'lru-cache';
import { IPost } from '~/interfaces/post';

// interfaces
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

// caches
export const postsCache = new LRUCache<string, IPost[]>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24, // 1 day
});

export const githubCache = new LRUCache<string, IGithubCache>({
  max: 10,
  ttl: 1000 * 60 * 60, // 1 hr
});

export const npmCache = new LRUCache<string, INpmCache>({
  max: 10,
  ttl: 1000 * 60 * 60 * 12, // 12 hr
});
