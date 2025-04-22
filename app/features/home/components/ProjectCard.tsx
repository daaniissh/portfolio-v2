import { IProject } from '~/interfaces/project';
import { Link } from '@remix-run/react';
import StarIcon from '~/components/icons/Star';
import DownloadIcon from '~/components/icons/Download';

export default function ProjectCard({ language, name, description, stars, slug, downloads, is_npm_package }: IProject) {
  return (
    <Link
      to={`/p/${slug}`}
      className="bg-secondary flex flex-col gap-2 p-5 md:p-10 lg:transition lg:group-hover:opacity-50 lg:hover:scale-110 lg:hover:opacity-100"
    >
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">{language}</span>
      <h3 className="text-foreground text-2xl font-bold">
        {is_npm_package && '[npm] '}
        {name}
      </h3>
      <p>{description}</p>
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
    </Link>
  );
}
