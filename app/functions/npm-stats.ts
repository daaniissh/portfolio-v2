import { INpmCache } from '~/interfaces/cache';

const invalidObj = {
  downloads: 0,
  ok: false,
} satisfies INpmCache;

export async function fetchNpmStats(packageName: string): Promise<INpmCache> {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
  if (!response.ok) return invalidObj;

  const data = await response.json();
  return {
    downloads: data.downloads,
    ok: true,
  };
}
