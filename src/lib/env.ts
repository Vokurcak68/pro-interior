export function envOptional(name: string) {
  const v = process.env[name];
  return v && v.length ? v : undefined;
}

export function envRequired(name: string) {
  const v = envOptional(name);
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}
