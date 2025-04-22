interface Props {
  languages: string[];
}

export default function ProjectLanguages({ languages }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">languages</span>
      <div className="flex flex-wrap items-center gap-2">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="bg-primary text-foreground p-1 px-1.5 text-[0.75em] font-bold tracking-wide uppercase"
          >
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
}
