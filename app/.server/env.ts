import { envSchema, publicEnvKeys } from '~/schemas/env';
import { typedPick } from '~/types/generics';

const env = () => envSchema.parse(process.env);

export function getPublicEnvs() {
  return {
    ENV: typedPick(env(), publicEnvKeys),
  };
}
