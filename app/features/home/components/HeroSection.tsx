export default function HeroSection() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-foreground text-5xl font-bold lg:text-7xl">
        Hello, I’m
        <br />
        Suneeth S<span className="text-primary">.</span>
      </h1>
      <p>
        Based in India, Kerala 🌴. I enjoy designing and developing thoughtful digital experiences. Lately, I’ve been
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
  );
}
