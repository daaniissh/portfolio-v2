import { IPost } from '~/interfaces/post';
import { cache } from './cache';

const API_URL = process.env.BLOG_API_URL!;

export async function getAllPosts(): Promise<IPost[]> {
  const cached = cache.get('posts');
  if (cached) return cached;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }

    const { data }: { data: IPost[] } = await response.json();
    const newData = data.map((post) => ({
      ...post,
      apiURL: getApiURL(post.slug),
    }));

    cache.set('posts', newData);
    return newData;
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
