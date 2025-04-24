import GithubIcon from '~/components/icons/Github';
import LinkedInIcon from '~/components/icons/LinkedIn';
import LinkList from '~/components/LinkList';
import { links } from '~/config/me';

export default function SocialLinks() {
  const linksMap = [
    { href: links.GITHUB, Icon: GithubIcon, label: 'Github' },
    { href: links.LINKEDIN, Icon: LinkedInIcon, label: 'LinkedIn' },
  ];

  return <LinkList links={linksMap} className="mt-auto" />;
}
