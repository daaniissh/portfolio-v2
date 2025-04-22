import { LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProjectData } from '~/.server/projects';
import Markdown from '~/components/Markdown';
import ProjectHeader from '~/features/project/components/ProjectHeader';
import ProjectLanguages from '~/features/project/components/ProjectLanguages';
import ProjectLinks from '~/features/project/components/ProjectLinks';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.name }, { name: 'description', content: data?.description }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) return redirect('/', { status: 404 });

  const project = await getProjectData(slug);
  return project;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="top-0 col-span-1 flex flex-col gap-5 py-10 md:sticky md:max-h-dvh md:w-2/5 md:gap-10 lg:py-20">
        <ProjectHeader {...data} />
        <ProjectLanguages languages={data.languages} />
        <ProjectLinks githubURL={data.githubURL} liveURL={data.liveURL} />
      </div>
      <Markdown markdown={data.content} />
    </>
  );
}
