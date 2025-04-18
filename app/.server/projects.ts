import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { IProjectCard } from '~/interfaces/project';
import { fetchGithubStats } from './github-stats';
import { fetchNpmStats } from './npm-stats';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

export async function getProjectsSlugs(): Promise<string[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  return files.map((file) => file.replace(/\.md$/, ''));
}

export async function getProjectData(slug: string): Promise<IProjectCard> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');

  // parse frontmatter
  const { data, content } = matter(fileContent);
  // convert md to html
  const contentHTML = await marked.parse(content);
  // fetch stars count if githubUrl exists
  let stars = 0;
  let language = 'Nil';
  let downloads = 0;

  const [githubStats, npmStats] = await Promise.all([
    data.githubURL ? fetchGithubStats(data.githubURL) : Promise.resolve(null),
    data.is_npm_package ? fetchNpmStats(data.name) : Promise.resolve(null),
  ]);

  if (githubStats) (stars = githubStats.stars), (language = githubStats.language);
  if (npmStats) downloads = npmStats.downloads;

  return {
    ...data,
    stars,
    language,
    downloads,
    slug,
    contentHTML,
  } as IProjectCard;
}

export async function getAllProjects(): Promise<IProjectCard[]> {
  const slugs = await getProjectsSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectData(slug)));
  return projects.sort((a, b) => b.stars - a.stars);
}
