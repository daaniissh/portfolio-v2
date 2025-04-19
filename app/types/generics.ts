export type Nullable<T> = T | null;

export function typedPick<T extends object, U extends keyof T>(obj: T, keys: readonly U[]) {
  const result = {} as Pick<T, U>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
