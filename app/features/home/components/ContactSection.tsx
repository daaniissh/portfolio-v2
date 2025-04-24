import EmailIcon from '~/components/icons/Email';
import InstagramIcon from '~/components/icons/Instagram';
import TelegramIcon from '~/components/icons/Telegram';
import LinkList from '~/components/LinkList';
import { links } from '~/config/me';

export default function ContactSection() {
  const linksMap = [
    { href: links.EMAIL, Icon: EmailIcon, label: 'Email' },
    { href: links.TELEGRAM, Icon: TelegramIcon, label: 'Telegram' },
    { href: links.INSTAGRAM, Icon: InstagramIcon, label: 'Instagram' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground text-2xl font-bold">
        Contact<span className="text-primary">.</span>
      </h3>
      <LinkList links={linksMap} />
    </div>
  );
}
