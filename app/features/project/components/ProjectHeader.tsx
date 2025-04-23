import { Link } from '@remix-run/react';
import BackIcon from '~/components/icons/Back';
import DownloadIcon from '~/components/icons/Download';
import StarIcon from '~/components/icons/Star';
import { IProject } from '~/interfaces/project';

type Props = Pick<IProject, 'name' | 'stars' | 'is_npm_package' | 'downloads' | 'description'>;

export default function ProjectHeader({ name, stars, is_npm_package, downloads, description }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <Link
        to={'/'}
        className="text-foreground inline-flex items-center gap-2 text-[0.75em] font-bold tracking-widest uppercase"
      >
        <BackIcon className="text-primary size-4" />
        Back
      </Link>
      <h1 className="text-foreground text-3xl font-bold md:text-4xl">{name}</h1>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-bold">
          <StarIcon className="size-5" />
          {stars}
        </span>
        {is_npm_package && (
          <span className="inline-flex items-center gap-1 text-xs font-bold">
            <DownloadIcon className="size-5" />
            {downloads}/mo
          </span>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
}
