import { IProjectCard } from '~/interfaces/project';
import StarIcon from './icons/Star';

export default function ProjectCard({ language, name, description, stars }: IProjectCard) {
  return (
    <div className="bg-secondary flex flex-col gap-2 p-10">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">{language}</span>
      <h3 className="text-foreground text-2xl font-bold">{name}</h3>
      <p>{description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-bold">
        <StarIcon className="size-5" />
        {stars}
      </span>
    </div>
  );
}
