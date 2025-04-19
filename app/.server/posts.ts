import { Post } from '~/interfaces/post';

export async function getAllPosts(): Promise<Post[]> {
  const response = await fetch('https://moonlitgrace.space/api/blog');
  const data = await response.json();
  return data.data;
}
