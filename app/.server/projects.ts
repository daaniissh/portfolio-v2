import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { IProjectCard } from '~/interfaces/project';

const projectsDir = path.join(process.cwd(), 'content/projects');

export async function getProjectsSlugs(): Promise<string[]> {
  const files = await fs.readdir(projectsDir);
  return files.map((file) => file.replace(/\.md$/, ''));
}

export async function getProjectData(slug: string): Promise<IProjectCard> {
  const filePath = path.join(projectsDir, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');

  // parse frontmatter
  const { data, content } = matter(fileContent);
  // convert md to html
  const contentHTML = await marked.parse(content);

  return {
    ...data,
    slug,
    contentHTML,
    stars: 0, // get dynamic count
  } as IProjectCard;
}

export async function getAllProjects(): Promise<IProjectCard[]> {
  const slugs = await getProjectsSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectData(slug)));
  return projects;
}
