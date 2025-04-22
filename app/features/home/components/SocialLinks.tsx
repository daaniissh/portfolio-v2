import GithubIcon from '~/components/icons/Github';
import LinkedInIcon from '~/components/icons/LinkedIn';
import { Nullable } from '~/types/generics';

interface Props {
  blogApiURL: Nullable<string>;
}

export default function SocialLinks({ blogApiURL }: Props) {
  return (
    <div className="mt-auto flex items-center gap-5">
      <a href={`https://${blogApiURL}`} target="_blank" className="link flex items-center gap-2" rel="noreferrer">
        <GithubIcon className="size-5" />
        Github
      </a>
      <a
        href="https://www.linkedin.com/in/suneeth-suresh"
        target="_blank"
        className="link flex items-center gap-2"
        rel="noreferrer"
      >
        <LinkedInIcon className="size-5" />
        LinkedIn
      </a>
    </div>
  );
}
