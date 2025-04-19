import { PublicEnvKeys } from '~/schemas/env';
import { Nullable } from '~/types/generics';

export function getPublicEnv(key: PublicEnvKeys): Nullable<string> {
  if (typeof window === 'undefined') return null;
  return window.ENV[key] ?? null;
}
