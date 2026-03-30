function getPokeApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
  if (!raw) {
    throw new Error("NEXT_PUBLIC_POKEAPI_BASE_URL is not set");
  }
  return raw.trim().replace(/\/$/, "");
}

// start with /
// if not, add /
// return the full url
export function pokeApiUrl(path: string = ""): string {
  const base = getPokeApiBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  return res.json() as Promise<T>;
}
