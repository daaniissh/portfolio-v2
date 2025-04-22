export default function SkillsSection() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground text-2xl font-bold">
        Skills<span className="text-primary">.</span>
      </h3>
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">languages</span>
      <img src="https://go-skill-icons.vercel.app/api/icons?i=py,ts,js,html,css,bash" alt="languages" />
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">frameworks & libraries</span>
      <img
        src="https://go-skill-icons.vercel.app/api/icons?i=django,svelte,react,remix,solidjs,tailwind,nextjs"
        alt="frameworks & libraries"
      />
      <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">tools & platforms</span>
      <img
        src="https://go-skill-icons.vercel.app/api/icons?i=docker,git,linux,vite,figma,postgres,vercel,flyio"
        alt="tools & platforms"
      />
    </div>
  );
}
