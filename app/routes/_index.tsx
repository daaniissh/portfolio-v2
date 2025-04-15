import type { MetaFunction } from '@remix-run/node';
import GithubIcon from '~/components/icons/Github';
import LinkedInIcon from '~/components/icons/LinkedIn';

export const meta: MetaFunction = () => {
  return [{ title: 'Suneeth S.' }, { name: 'description', content: 'Portfolio' }];
};

export default function Index() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl gap-20 text-sm">
      <div className="col-span-1 flex w-2/5 flex-col gap-10 py-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-foreground text-7xl font-bold">
            Hello, I’m
            <br />
            Suneeth S<span className="text-primary">.</span>
          </h1>
          <p>
            Based in India, Kerala. I enjoy designing and developing thoughtful digital experiences. Lately, I’ve been
            building{' '}
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
        <div className="flex flex-col gap-5">
          {['projects', 'blog', 'contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item}`}
              className="text-foreground flex items-center gap-2.5 text-xs font-bold tracking-[0.5em] uppercase"
            >
              0{idx + 1}
              <span className="bg-foreground h-px w-10"></span>
              {item}
            </a>
          ))}
        </div>
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
      <div className="bg-secondary col-span-2 w-3/5"></div>
    </main>
  );
}
