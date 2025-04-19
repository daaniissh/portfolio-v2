import { IPost } from '~/interfaces/post';
import { LRUCache } from 'lru-cache';

const API_URL = process.env.BLOG_API_URL!;
const cache = new LRUCache<string, IPost[]>({
  max: 100,
  ttl: 1000 * 60 * 60 * 24, // 1 day
});

export async function getAllPosts(): Promise<IPost[]> {
  const cacheKey = 'all-posts';

  const cachedPosts = cache.get(cacheKey);
  if (cachedPosts) return cachedPosts;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }

    const { data }: { data: IPost[] } = await response.json();

    cache.set(cacheKey, data);
    return data.map((post) => ({
      ...post,
      apiURL: getApiURL(post.slug),
    }));
  } catch (err) {
    console.error('Failed to fetch posts: ', err);
    return [];
  }
}

// helper functions
function getApiURL(slug: string) {
  const blogURL = API_URL.replace('/api/', '/');
  return `${blogURL}/${slug}`;
}
