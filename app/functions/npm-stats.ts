import { INpmStats } from '~/interfaces/cache';

const invalidObj = {
  downloads: 0,
  ok: false,
} satisfies INpmStats;

export async function fetchNpmStats(packageName: string): Promise<INpmStats> {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
  if (!response.ok) return invalidObj;

  const data = await response.json();
  return {
    downloads: data.downloads,
    ok: true,
  };
}
