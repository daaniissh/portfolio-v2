import { LRUCache } from 'lru-cache';

type GithubStatsCache = { stars: number; language: string; ok: boolean };

const cache = new LRUCache<string, GithubStatsCache>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hr
});

const INVALID_STATS_OBJ = { stars: 0, language: 'Nil', ok: false } satisfies GithubStatsCache;

export async function fetchGithubStats(repoUrl: string): Promise<GithubStatsCache> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return INVALID_STATS_OBJ;

  const [, owner, repo] = match;
  const cacheKey = `${owner}/${repo}`;

  // early return cached stars
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // fetch from API
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!response.ok) return INVALID_STATS_OBJ;
  const data = await response.json();

  const result = {
    stars: data.stargazers_count,
    language: data.language,
    ok: true,
  } satisfies GithubStatsCache;

  // update cache
  cache.set(cacheKey, result);
  return result;
}
