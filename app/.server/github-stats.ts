import fs from 'fs/promises';
import path from 'path';

type Cache = Record<string, CacheValue>;
type CacheValue = { stars: number; language: string; ok: boolean };

const CACHE_FILE = path.join(process.cwd(), '.github-stars-cache.json');
const invalidStats = { stars: 0, language: 'Nil', ok: false } satisfies CacheValue;

async function readCache(): Promise<Cache> {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error while parsing cache: ', err);
    return {};
  }
}

async function writeCache(data: Cache) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(data));
  } catch (err) {
    console.error('Error while writing cache: ', err);
  }
}

export async function fetchGithubStats(repoUrl: string): Promise<CacheValue> {
  const cache = await readCache();
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return invalidStats;

  const [, owner, repo] = match;
  const cacheKey = `${owner}/${repo}`;

  // early return cached stars
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // fetch from API
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  if (!response.ok) return invalidStats;

  const data = await response.json();
  const statsObj = {
    stars: data.stargazers_count,
    language: data.language,
    ok: true,
  } satisfies CacheValue;

  // update cache
  cache[cacheKey] = statsObj;
  await writeCache(cache);

  return statsObj;
}
