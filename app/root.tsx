import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import './tailwind.css';
import { getPublicEnvs } from './.server/env';
import PublicEnv from './components/shared/PublicEnv';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader() {
  return getPublicEnvs();
}

export function Layout() {
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="mx-auto flex min-h-dvh max-w-6xl flex-col gap-10 px-5 text-sm md:flex-row lg:gap-20">
          <Outlet />
        </main>
        <ScrollRestoration />
        {data !== undefined && <PublicEnv {...data.ENV} />}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
