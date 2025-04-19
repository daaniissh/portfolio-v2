import { PublicEnvs } from '~/schemas/env';

declare global {
  interface Window {
    ENV: PublicEnvs;
  }
}

export default function PublicEnv(props: PublicEnvs) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(props)}`,
      }}
    />
  );
}
