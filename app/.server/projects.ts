import fs from 'fs/promises';
import path from 'path';

const projectsDir = path.join(process.cwd(), 'content/projects');

export async function getProjectsSlugs(): Promise<string[]> {
  const files = await fs.readdir(projectsDir);
  return files.map((file) => file.replace(/\.md$/, ''));
}
