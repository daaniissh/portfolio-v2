import { LRUCache } from 'lru-cache';

type NpmCache = { downloads: number; ok: boolean };

const cache = new LRUCache<string, NpmCache>({
  max: 100,
  ttl: 1000 * 60 * 60 * 12, // 12 hr
});

const INVALID_STATS_OBJ = { downloads: 0, ok: false } satisfies NpmCache;

export async function fetchNpmStats(packageName: string): Promise<NpmCache> {
  const cached = cache.get(packageName);
  if (cached) return cached;

  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
  if (!response.ok) return INVALID_STATS_OBJ;

  const data = await response.json();
  const result = {
    downloads: data.downloads,
    ok: true,
  } satisfies NpmCache;

  cache.set(packageName, result);
  return result;
}
