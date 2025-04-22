import { IPost } from '~/interfaces/post';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/date';
import { Link } from '@remix-run/react';
import ExternalLinkIcon from '~/components/icons/ExternalLink';

interface Props extends IPost {
  translateDown: boolean;
}

export default function PostCard({ translateDown, apiURL, tag, createdAt, title, description }: Props) {
  return (
    <Link
      to={apiURL}
      target="_blank"
      className={cn(
        translateDown && 'lg:translate-y-10 lg:transform',
        'bg-secondary flex flex-col gap-2 p-5 md:p-10 lg:aspect-square lg:transition lg:group-hover:opacity-50 lg:hover:scale-110 lg:hover:opacity-100'
      )}
      rel="noreferrer"
    >
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">{tag}</span>
      <span className="text-xs">{formatDate(createdAt)}</span>
      <h3 className="text-foreground mt-auto text-2xl font-bold">{title}</h3>
      <p className="line-clamp-2">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs">
        <ExternalLinkIcon className="size-5" />
        Read
      </span>
    </Link>
  );
}
