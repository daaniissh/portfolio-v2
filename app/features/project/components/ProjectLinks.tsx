import GithubIcon from '~/components/icons/Github';
import SiteIcon from '~/components/icons/Site';

interface Props {
  githubURL?: string;
  liveURL?: string;
}

export default function ProjectLinks({ githubURL, liveURL }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">links</span>
      <div className="flex items-center gap-5">
        {githubURL && (
          <a href={githubURL} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
            <GithubIcon className="size-5" />
            Github
          </a>
        )}
        {liveURL && (
          <a href={liveURL} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
            <SiteIcon className="size-5" />
            Live URL
          </a>
        )}
      </div>
    </div>
  );
}
