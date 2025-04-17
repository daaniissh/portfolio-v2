import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { IProjectCard } from '~/interfaces/project';
import { fetchGithubStats } from './github-stats';

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
  // fetch stars count if githubUrl exists
  let stars = 0;
  let language = 'Nil';
  if (data.githubUrl) {
    const stats = await fetchGithubStats(data.githubUrl);
    (stars = stats.stars), (language = stats.language);
  }

  return {
    ...data,
    stars,
    language,
    slug,
    contentHTML,
  } as IProjectCard;
}

export async function getAllProjects(): Promise<IProjectCard[]> {
  const slugs = await getProjectsSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectData(slug)));
  return projects.sort((a, b) => b.stars - a.stars);
}
