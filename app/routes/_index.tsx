import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Suneeth S.' }, { name: 'description', content: 'Portfolio' }];
};

export default function Index() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-6xl gap-20 text-sm">
      <div className="col-span-1 w-2/5 py-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-foreground text-7xl font-bold">
            Hello, I’m
            <br />
            Suneeth S<span className="text-primary">.</span>
          </h1>
          <p>
            Based in India, Kerala, I enjoy designing and developing thoughtful digital
            experiences. Lately, I’ve been building{' '}
            <a href="https://github.com/coreproject-moe" target="_blank">
              CoreProject
            </a>{' '}
            and{' '}
            <a href="https://github.com/quibble-dev" target="_blank">
              Quibble
            </a>
            —two creative spaces where I explore ideas, community, and design.
          </p>
        </div>
      </div>
      <div className="bg-secondary col-span-2 w-3/5"></div>
    </main>
  );
}
