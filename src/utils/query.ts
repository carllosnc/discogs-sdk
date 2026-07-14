export function toSnakeCase(key: string): string {
  return key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
}

export interface BuildQueryParamsOptions {
  transforms?: Record<string, (value: unknown) => unknown>;
}

export function buildQueryParams(
  params?: Record<string, any>,
  options?: BuildQueryParamsOptions,
): Record<string, any> {
  const queryParams: Record<string, any> = {};
  if (!params) return queryParams;

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    queryParams[toSnakeCase(key)] = options?.transforms?.[key]
      ? options.transforms[key](value)
      : value;
  }

  return queryParams;
}