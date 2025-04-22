import { IProject } from '~/interfaces/project';
import ProjectCard from './ProjectCard';

interface Props {
  projects: IProject[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="group relative grid gap-2">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase md:hidden">projects</span>
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </section>
  );
}
