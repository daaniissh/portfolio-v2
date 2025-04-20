import { type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '~/.server/posts';
import { getAllProjects } from '~/.server/projects';
import GithubIcon from '~/components/icons/Github';
import LinkedInIcon from '~/components/icons/LinkedIn';
import PostCard from '~/components/PostCard';
import ProjectCard from '~/components/ProjectCard';
import SectionNav from '~/components/shared/SectionNav';
import { Nullable } from '~/types/generics';
import { getPublicEnv } from '~/utils/env';

export const meta: MetaFunction = () => {
  return [{ title: 'Suneeth S.' }, { name: 'description', content: 'Portfolio' }];
};

export const loader = async () => {
  const projects = await getAllProjects();
  const posts = await getAllPosts();
  return { projects, posts };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [blogApiURL, setBlogApiURL] = useState<Nullable<string>>(null);

  useEffect(() => {
    const _url = getPublicEnv('BLOG_API_URL');
    if (_url) {
      const newUrl = new URL(_url);
      setBlogApiURL(newUrl.hostname);
    }
  }, []);

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
          <a href={`https://${blogApiURL}`} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
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
        <section id="blog" className="group relative grid grid-cols-2 gap-2">
          <a
            href="https://moonlitgrace.space"
            target="_blank"
            className="text-foreground absolute top-5 left-1/2 ml-1 text-[0.75em] font-bold tracking-widest uppercase"
            rel="noreferrer"
          >
            {blogApiURL}
          </a>
          {data.posts.map((post, idx) => (
            <PostCard key={idx} translateDown={idx % 2 !== 0} {...post} />
          ))}
        </section>
        <section id="sections" className="flex min-h-screen flex-col gap-2">
          <h3 className="text-foreground text-2xl font-bold">Skills</h3>
          <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">languages</span>
          <img src="https://go-skill-icons.vercel.app/api/icons?i=py,ts,js,html,css,bash" alt="languages" />
          <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">
            frameworks & libraries
          </span>
          <img
            src="https://go-skill-icons.vercel.app/api/icons?i=svelte,react,django,nodejs,tailwind,nextjs,express"
            alt="frameworks & libraries"
          />
          <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">tools & platforms</span>
          <img
            src="https://go-skill-icons.vercel.app/api/icons?i=docker,git,linux,vite,figma,postgres,vercel,flyio"
            alt="tools & platforms"
          />
        </section>
      </div>
    </main>
  );
}
