import { LRUCache } from 'lru-cache';
import { IPost } from '~/interfaces/post';
import { IProject } from '~/interfaces/project';

interface CacheKeyMap {
  projects: IProject[];
  posts: IPost[];
}

class TypedCache {
  private cache = new LRUCache<keyof CacheKeyMap, CacheKeyMap[keyof CacheKeyMap]>({
    max: 10,
    ttl: 1000 * 60 * 60, // 1 hour
  });

  get<K extends keyof CacheKeyMap>(key: K): CacheKeyMap[K] | undefined {
    return this.cache.get(key) as CacheKeyMap[K] | undefined;
  }

  set<K extends keyof CacheKeyMap>(key: K, value: CacheKeyMap[K]): void {
    this.cache.set(key, value);
  }
}

export const cache = new TypedCache();
