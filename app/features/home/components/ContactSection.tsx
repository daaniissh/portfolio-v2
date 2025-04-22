import EmailIcon from '~/components/icons/Email';
import InstagramIcon from '~/components/icons/Instagram';
import TelegramIcon from '~/components/icons/Telegram';

export default function ContactSection() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground text-2xl font-bold">
        Contact<span className="text-primary">.</span>
      </h3>
      <div className="mt-auto flex flex-wrap items-center gap-5 gap-y-2">
        <a
          href="mailto:moonlitgrace.gaia@gmail.com"
          target="_blank"
          className="link flex items-center gap-2"
          rel="noreferrer"
        >
          <EmailIcon className="size-5" />
          Email
        </a>
        <a href="http://t.me/moonlitgrace" target="_blank" className="link flex items-center gap-2" rel="noreferrer">
          <TelegramIcon className="size-5" />
          Telegram
        </a>
        <a
          href="https://www.instagram.com/sssuneeth/"
          target="_blank"
          className="link flex items-center gap-2"
          rel="noreferrer"
        >
          <InstagramIcon className="size-5" />
          Instagram
        </a>
      </div>
    </div>
  );
}
