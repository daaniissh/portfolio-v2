import { useActiveSectionId } from '~/hooks/useActiveSectionId';
import { cn } from '~/utils/cn';

export default function SectionNav() {
  const activeSectionId = useActiveSectionId(['projects', 'blog', 'contact']);

  return (
    <div className="flex flex-col gap-5">
      {['projects', 'blog', 'contact'].map((item, idx) => {
        const isActive = item === activeSectionId;
        return (
          <a
            key={idx}
            href={`#${item}`}
            className={cn(
              isActive ? 'text-foreground' : 'text-neutral',
              'group hover:text-foreground inline-flex w-max items-center gap-2.5 text-[0.75em] font-bold tracking-widest uppercase transition-all'
            )}
          >
            <span className="tracking-wide">
              <span className="text-primary">0</span>
              {idx + 1}
            </span>
            <span
              className={cn(
                isActive ? 'bg-foreground w-10' : 'bg-neutral w-5',
                'group-hover:bg-foreground h-px transition-all group-hover:w-10'
              )}
            ></span>
            {item}
          </a>
        );
      })}
    </div>
  );
}
