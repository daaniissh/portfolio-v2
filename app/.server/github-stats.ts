import { githubCache, IGithubCache } from '~/utils/cache.server';

const INVALID_STATS = { stars: 0, language: 'Nil', languages: [], ok: false } satisfies IGithubCache;

export async function fetchGithubStats(repoUrl: string): Promise<IGithubCache> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return INVALID_STATS;

  const [, owner, repo] = match;
  const cacheKey = `${owner}/${repo}`;

  // early return cached stars
  const cached = githubCache.get(cacheKey);
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
  } satisfies IGithubCache;

  // update cache
  githubCache.set(cacheKey, result);
  return result;
}
