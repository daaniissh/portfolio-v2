import { Post } from '~/interfaces/post';

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(process.env.BLOG_API_URL!);
    if (!response.ok) {
      throw new Error(`Error, status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error('Failed to fetch posts: ', err);
    return [];
  }
}
