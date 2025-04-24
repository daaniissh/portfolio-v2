import { LinkItem } from '~/interfaces/link';
import { cn } from '~/utils/cn';

interface Props {
  links: LinkItem[];
  className?: string;
  linkClassname?: string;
}

interface ValidLink extends LinkItem {
  href: string;
}

export default function LinkList({ links, className, linkClassname }: Props) {
  const validLinks = links.filter((link): link is ValidLink => Boolean(link.href));

  return (
    <div className={cn(className, 'flex flex-wrap items-center gap-5 gap-y-2')}>
      {validLinks.map(({ href, Icon, label }, idx) => (
        <a
          key={idx}
          href={href}
          target="_blank"
          className={cn(linkClassname, 'link flex items-center gap-2')}
          rel="noreferrer"
        >
          <Icon className="size-5" />
          {label}
        </a>
      ))}
    </div>
  );
}
