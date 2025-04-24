import { Nullable } from '~/types/generics';

type LinkType = 'GITHUB' | 'LINKEDIN' | 'EMAIL' | 'TELEGRAM' | 'INSTAGRAM';
type Links = Record<LinkType, Nullable<string>>;

// link value could be a string or null
export const links: Links = {
  GITHUB: 'https://github.com/moonlitgrace',
  LINKEDIN: 'https://www.linkedin.com/in/suneeth-suresh',
  EMAIL: 'mailto:moonlitgrace.gaia@gmail.com',
  TELEGRAM: 'http://t.me/moonlitgrace',
  INSTAGRAM: 'https://www.instagram.com/sssuneeth',
};
