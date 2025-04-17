import { type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllProjects } from '~/.server/projects';
import GithubIcon from '~/components/icons/Github';
import LinkedInIcon from '~/components/icons/LinkedIn';
import ProjectCard from '~/components/ProjectCard';
import SectionNav from '~/components/SectionNav';

export const meta: MetaFunction = () => {
  return [{ title: 'Suneeth S.' }, { name: 'description', content: 'Portfolio' }];
};

export const loader = async () => {
  const projects = await getAllProjects();
  return { projects };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl gap-20 text-sm">
      <div className="sticky top-0 col-span-1 flex max-h-dvh w-2/5 flex-col gap-10 py-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-foreground text-7xl font-bold">
            Hello, I’m
            <br />
            Suneeth S<span className="text-primary">.</span>
          </h1>
          <p>
            Based in India, Kerala 🌴. I enjoy designing and developing thoughtful digital experiences. Lately, I’ve
            been building{' '}
            <a href="https://github.com/coreproject-moe" target="_blank" rel="noreferrer" className="link">
              CoreProject
            </a>{' '}
            and{' '}
            <a href="https://github.com/quibble-dev" target="_blank" rel="noreferrer" className="link">
              Quibble
            </a>
            —two creative spaces where I explore ideas, community, and design.
          </p>
        </div>
        <SectionNav />
        <div className="mt-auto flex items-center gap-5">
          <a
            href="https://github.com/moonlitgrace"
            target="_blank"
            className="link flex items-center gap-2"
            rel="noreferrer"
          >
            <GithubIcon className="size-5" />
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/suneeth-suresh"
            target="_blank"
            className="link flex items-center gap-2"
            rel="noreferrer"
          >
            <LinkedInIcon className="size-5" />
            LinkedIn
          </a>
        </div>
      </div>
      <div className="col-span-2 w-3/5 space-y-20 py-20">
        <section id="projects" className="group space-y-2">
          {data.projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </section>
        <section id="blog" className="bg-secondary min-h-screen">
          ...
        </section>
        <section id="contact" className="bg-secondary min-h-screen">
          ...
        </section>
      </div>
    </main>
  );
}
