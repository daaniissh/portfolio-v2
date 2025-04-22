import { IGithubStats } from '~/interfaces/cache';

const invalidStats = {
  stars: 0,
  language: 'Nil',
  languages: [],
  ok: false,
} satisfies IGithubStats;

export async function fetchGithubStats(repoUrl: string): Promise<IGithubStats> {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return invalidStats;

  const [, owner, repo] = match;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  // fetch from API
  const [repoRes, repoLangsRes] = await Promise.all([
    await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
    await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
  ]);

  if (!repoRes.ok || !repoLangsRes.ok) return invalidStats;
  const repoData = await repoRes.json();
  const repoLangsData = await repoLangsRes.json();

  return {
    stars: repoData.stargazers_count,
    language: repoData.language,
    languages: Object.keys(repoLangsData),
    ok: true,
  };
}
