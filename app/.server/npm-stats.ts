import { INpmCache, npmCache } from '~/utils/cache.server';

const INVALID_STATS_OBJ = { downloads: 0, ok: false } satisfies INpmCache;

export async function fetchNpmStats(packageName: string): Promise<INpmCache> {
  const cached = npmCache.get(packageName);
  if (cached) return cached;

  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
  if (!response.ok) return INVALID_STATS_OBJ;

  const data = await response.json();
  const result = {
    downloads: data.downloads,
    ok: true,
  } satisfies INpmCache;

  npmCache.set(packageName, result);
  return result;
}
