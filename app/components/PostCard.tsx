import { IPost } from '~/interfaces/post';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/date';
import ExternalLinkIcon from './icons/ExternalLink';

interface Props extends IPost {
  translateDown: boolean;
}

export default function PostCard({ translateDown, apiURL, tag, createdAt, title, description }: Props) {
  return (
    <a
      href={apiURL}
      target="_blank"
      className={cn(
        translateDown && 'translate-y-10 transform',
        'bg-secondary flex aspect-square flex-col gap-2 p-10 transition group-hover:opacity-50 hover:scale-110 hover:opacity-100'
      )} rel="noreferrer"
    >
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">{tag}</span>
      <span className="text-xs">{formatDate(createdAt)}</span>
      <h3 className="text-foreground mt-auto text-2xl font-bold">{title}</h3>
      <p className="line-clamp-2">{description}</p>
      <span className="inline-flex items-center gap-1 text-xs">
        <ExternalLinkIcon className="size-5" />
        Read
      </span>
    </a>
  );
}
