import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { IProject } from '~/interfaces/project';
import { fetchGithubStats } from '../functions/github-stats';
import { fetchNpmStats } from '../functions/npm-stats';
import { cache } from './cache';
import { projectMetadataSchema } from '~/schemas/project';

const projectsDir = path.join(process.cwd(), 'data/projects');

export async function getProjectsSlugs(): Promise<string[]> {
  const files = await fs.readdir(projectsDir);
  return files.map((file) => file.replace(/\.md$/, ''));
}

export async function getProjectData(slug: string): Promise<IProject> {
  const cached = cache.get('projects')?.find((p) => p.slug === slug);
  if (cached) return cached;

  const filePath = path.join(projectsDir, `${slug}.md`);
  const fileContent = await fs.readFile(filePath, 'utf8');

  // parse frontmatter
  const { data, content } = matter(fileContent);
  const parsedData = projectMetadataSchema.parse(data);
  // fetch stars count if githubUrl exists
  let stars = 0;
  let language = 'Nil';
  let languages: string[] = [];
  let downloads = 0;

  const [githubStats, npmStats] = await Promise.all([
    parsedData.githubURL ? fetchGithubStats(parsedData.githubURL) : Promise.resolve(null),
    parsedData.npmURL ? fetchNpmStats(parsedData.npmURL) : Promise.resolve(null),
  ]);

  if (npmStats) downloads = npmStats.downloads;
  if (githubStats) {
    stars = githubStats.stars;
    language = githubStats.language;
    languages = githubStats.languages;
  }

  return {
    ...parsedData,
    isNpmPackage: Boolean(parsedData.npmURL),
    stars,
    language,
    languages,
    downloads,
    slug,
    content,
  };
}

export async function getAllProjects(): Promise<IProject[]> {
  const cached = cache.get('projects');
  if (cached) return cached;

  const slugs = await getProjectsSlugs();
  const projects = await Promise.all(slugs.map((slug) => getProjectData(slug)));
  const sorted = projects.sort((a, b) => b.stars - a.stars);

  cache.set('projects', sorted);
  return sorted;
}
