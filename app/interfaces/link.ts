import { Nullable } from '~/types/generics';

export interface LinkItem {
  href: Nullable<string>;
  Icon: React.ComponentType<{ className: string }>;
  label: string;
}
