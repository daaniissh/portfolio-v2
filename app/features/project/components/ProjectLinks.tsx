import React from 'react';
import GithubIcon from '~/components/icons/Github';
import NpmIcon from '~/components/icons/Npm';
import SiteIcon from '~/components/icons/Site';

interface Props {
  githubURL?: string;
  npmURL?: string;
  liveURL?: string;
}

interface LinkConfig {
  url?: string;
  Icon: React.ComponentType<{ className: string }>;
  label: string;
}

export default function ProjectLinks({ githubURL, npmURL, liveURL }: Props) {
  const links: LinkConfig[] = [
    { url: githubURL, Icon: GithubIcon, label: 'Github' },
    { url: npmURL, Icon: NpmIcon, label: 'Npm' },
    { url: liveURL, Icon: SiteIcon, label: 'Live Site' },
  ];

  const validLinks = links.filter((link) => link.url);
  if (validLinks.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">links</span>
      <div className="flex items-center gap-5">
        {validLinks.map(({ url, Icon, label }, idx) => (
          <a key={idx} href={url} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
            <Icon className="size-5" />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
