import { type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getAllPosts } from '~/.server/posts';
import { getAllProjects } from '~/.server/projects';
import SectionNav from '~/components/shared/SectionNav';
import BlogSection from '~/features/home/components/BlogSection';
import ContactSection from '~/features/home/components/ContactSection';
import HeroSection from '~/features/home/components/HeroSection';
import ProjectsSection from '~/features/home/components/ProjectsSection';
import SkillsSection from '~/features/home/components/SkillsSection';
import SocialLinks from '~/features/home/components/SocialLinks';
import useBlogAPIURL from '~/features/home/hooks/useBlogApiURL';

export const meta: MetaFunction = () => {
  return [{ title: 'Suneeth S.' }, { name: 'description', content: 'Portfolio' }];
};

export const loader = async () => {
  const projects = await getAllProjects();
  const posts = await getAllPosts();
  return { projects, posts };
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const blogApiURL = useBlogAPIURL();

  return (
    <>
      <div className="top-0 col-span-1 flex flex-col gap-5 py-10 md:sticky md:max-h-dvh md:w-2/5 md:gap-10 lg:py-20">
        <HeroSection />
        <SectionNav />
        <SocialLinks blogApiURL={blogApiURL} />
      </div>
      <div className="space-y-10 py-5 md:w-3/5 md:py-10 lg:space-y-20 lg:py-20">
        <ProjectsSection projects={data.projects} />
        <BlogSection blogApiURL={blogApiURL} posts={data.posts} />
        <section id="sections" className="space-y-10 lg:space-y-20">
          <SkillsSection />
          <ContactSection />
        </section>
      </div>
    </>
  );
}
