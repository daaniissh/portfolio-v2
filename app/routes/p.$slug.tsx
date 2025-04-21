import { LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getProjectData } from '~/.server/projects';
import BackIcon from '~/components/icons/Back';
import DownloadIcon from '~/components/icons/Download';
import GithubIcon from '~/components/icons/Github';
import SiteIcon from '~/components/icons/Site';
import StarIcon from '~/components/icons/Star';
import Markdown from '~/components/Markdown';

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
        <div className="flex flex-col gap-5">
          <Link
            to={'/'}
            className="text-foreground inline-flex items-center gap-2 text-[0.75em] font-bold tracking-widest uppercase"
          >
            <BackIcon className="text-primary size-4" />
            Back
          </Link>
          <h1 className="text-foreground text-4xl font-bold">{data.name}</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold">
              <StarIcon className="size-5" />
              {data.stars}
            </span>
            {data.is_npm_package && (
              <span className="inline-flex items-center gap-1 text-xs font-bold">
                <DownloadIcon className="size-5" />
                {data.downloads}/mo
              </span>
            )}
          </div>
          <p>{data.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">languages</span>
          <div className="flex flex-wrap items-center gap-2">
            {data.languages.map((lang, idx) => (
              <div
                key={idx}
                className="bg-primary text-foreground p-1 px-1.5 text-[0.75em] font-bold tracking-wide uppercase"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-foreground text-[0.75em] font-bold tracking-widest uppercase">links</span>
          <div className="flex items-center gap-5">
            {data.githubURL && (
              <a href={data.githubURL} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
                <GithubIcon className="size-5" />
                Github
              </a>
            )}
            {data.liveURL && (
              <a href={data.liveURL} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
                <SiteIcon className="size-5" />
                Live URL
              </a>
            )}
          </div>
        </div>
      </div>
      <Markdown markdown={data.content} />
    </>
  );
}
