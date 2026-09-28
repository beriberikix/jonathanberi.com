// Build-time GitHub metadata for the open source section.
// Owners with several listed repos get one paginated list call; the rest are
// fetched individually. That keeps a build to a handful of requests, far below
// the unauthenticated rate limit. Any failure degrades to "no stats" rather
// than failing the build; set GITHUB_TOKEN to raise the limit in CI.

import { opensource, type RepoEntry } from '../data/opensource';
import { profile } from '../data/profile';

export interface RepoMeta {
  name: string;
  href: string;
  description: string | null;
  stars: number;
  language: string | null;
  pushedAt: string;
  archived: boolean;
}

interface ApiRepo {
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  archived: boolean;
}

const API = 'https://api.github.com';

const LIST_THRESHOLD = 3;

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function get(url: string): Promise<Response> {
  const res = await fetch(url, { headers: headers(), signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

async function listRepos(owner: string): Promise<ApiRepo[]> {
  const repos: ApiRepo[] = [];
  let url: string | null = `${API}/users/${owner}/repos?per_page=100&type=owner`;
  while (url) {
    const res = await get(url);
    repos.push(...((await res.json()) as ApiRepo[]));
    url = res.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1] ?? null;
  }
  return repos;
}

async function getRepo(fullName: string): Promise<ApiRepo[]> {
  return [(await (await get(`${API}/repos/${fullName}`)).json()) as ApiRepo];
}

async function load(): Promise<Map<string, RepoMeta>> {
  const byOwner = new Map<string, string[]>();
  for (const { repo } of opensource.repos) {
    const owner = repo.split('/')[0].toLowerCase();
    byOwner.set(owner, [...(byOwner.get(owner) ?? []), repo]);
  }

  const jobs: { label: string; run: () => Promise<ApiRepo[]> }[] = [];
  for (const [owner, repos] of byOwner) {
    if (repos.length >= LIST_THRESHOLD) jobs.push({ label: owner, run: () => listRepos(owner) });
    else repos.forEach((r) => jobs.push({ label: r, run: () => getRepo(r) }));
  }

  const meta = new Map<string, RepoMeta>();
  const results = await Promise.allSettled(jobs.map((j) => j.run()));
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.warn(`[github] ${jobs[i].label}: ${r.reason}; rendering without stats`);
      return;
    }
    for (const repo of r.value) {
      meta.set(repo.full_name.toLowerCase(), {
        name: repo.full_name.split('/')[1],
        href: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
        archived: repo.archived,
      });
    }
  });
  return meta;
}

// Shared across pages so a build fetches once.
let cache: Promise<Map<string, RepoMeta>> | undefined;
export function getRepoMeta(): Promise<Map<string, RepoMeta>> {
  return (cache ??= load());
}

// Repos under this account show a bare name; others keep their owner prefix.
const HOME_OWNER = profile.links.github.split('/').pop()!.toLowerCase();

export interface ResolvedRepo {
  name: string;
  role: string;
  href: string;
  blurb: string;
  stars?: number;
  language?: string;
  pushedAt?: string;
  archived?: boolean;
}

/** Merge a curated entry with fetched metadata; curated blurb wins. */
export function resolveRepo(
  fullName: string,
  meta: Map<string, RepoMeta>,
  entry?: Partial<RepoEntry>
): ResolvedRepo {
  const m = meta.get(fullName.toLowerCase());
  const [owner, name] = fullName.split('/');
  return {
    name: entry?.name ?? (owner.toLowerCase() === HOME_OWNER ? name : fullName),
    role: entry?.role ?? 'Author',
    href: entry?.href ?? m?.href ?? `https://github.com/${fullName}`,
    blurb: entry?.blurb ?? m?.description ?? '',
    stars: m?.stars,
    language: m?.language ?? undefined,
    pushedAt: m?.pushedAt,
    archived: m?.archived,
  };
}

// Single-digit-ish star counts read as noise, not signal.
const MIN_STARS = 5;

/** "★ 122 · Swift", or '' when nothing was fetched. */
export function statLine(r: Pick<ResolvedRepo, 'stars' | 'language'>): string {
  const stars = r.stars && r.stars >= MIN_STARS ? `★ ${r.stars}` : '';
  return [stars, r.language ?? ''].filter(Boolean).join(' · ');
}
