import { LRUCache } from 'lru-cache';

type GithubCache = { stars: number; language: string; languages: string[]; ok: boolean };

const cache = new LRUCache<string, GithubCache>({
  max: 10,
  ttl: 1000 * 60 * 60, // 1 hr
});

const INVALID_STATS = { stars: 0, language: 'Nil', languages: [], ok: false } satisfies GithubCache;

export async function fetchGithubStats(repoUrl: string): Promise<GithubCache> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return INVALID_STATS;

  const [, owner, repo] = match;
  const cacheKey = `${owner}/${repo}`;

  // early return cached stars
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  // fetch from API
  const [repoRes, repoLangsRes] = await Promise.all([
    await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
    await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
  ]);

  if (!repoRes.ok || !repoLangsRes.ok) return INVALID_STATS;
  const repoData = await repoRes.json();
  const repoLangsData = await repoLangsRes.json();

  const result = {
    stars: repoData.stargazers_count,
    language: repoData.language,
    languages: Object.keys(repoLangsData),
    ok: true,
  } satisfies GithubCache;

  // update cache
  cache.set(cacheKey, result);
  return result;
}
