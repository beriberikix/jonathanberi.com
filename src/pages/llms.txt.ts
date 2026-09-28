// llms.txt (https://llmstxt.org): a plain-Markdown brief for AI answer engines,
// generated from the same data as the pages.
import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { opensource } from '../data/opensource';
import { getRepoMeta, resolveRepo } from '../lib/github';

export const GET: APIRoute = async ({ site }) => {
  const meta = await getRepoMeta();
  const url = (p: string) => new URL(p, site).href;
  const { name, tagline, kicker, currentRole, founderLine, location } = profile;

  const lines: string[] = [
    `# ${name}`,
    '',
    `> ${name} is a ${kicker.toLowerCase()} and ${currentRole.title} at ${currentRole.org}. Previously ${founderLine.charAt(0).toLowerCase()}${founderLine.slice(1)}. Based in ${location}. "${tagline}"`,
    '',
    ...profile.summary.flatMap((p) => [p, '']),
    `Focus areas: ${profile.focusAreas.join(', ')}.`,
    '',
    '## Pages',
    '',
    `- [Profile](${url('/')}): summary, selected work, recognition, and contact links.`,
    `- [Open source](${url('/open-source/')}): libraries, tools, and open source communities.`,
    '',
    '## Experience',
    '',
    ...profile.experience.map(
      (j) => `- ${j.role}, [${j.org}](${j.href}) (${j.period}${'note' in j ? `, ${j.note}` : ''}): ${j.lede}`
    ),
    ...profile.earlier.map((j) => `- ${j.role}, ${j.org} (${j.period})`),
    '',
    '## Recognition',
    '',
    ...profile.recognition.map((r) => `- ${r.label}${'detail' in r ? ` (${r.detail})` : ''}`),
    '',
    '## Open source: organizations & communities',
    '',
    ...opensource.orgs.map((o) => `- [${o.name}](${o.href}): ${o.role}. ${o.blurb}`),
    '',
    ...opensource.themes.flatMap((t) => {
      const items = opensource.repos.filter((r) => r.theme === t.id);
      if (!items.length) return [];
      return [
        `## Open source: ${t.label}`,
        '',
        ...items.map((entry) => {
          const r = resolveRepo(entry.repo, meta, entry);
          const role = r.role === 'Author' ? '' : ` (${r.role})`;
          return `- [${r.name}](${r.href})${role}${r.blurb ? `: ${r.blurb}` : ''}`;
        }),
        '',
      ];
    }),
    '## Links',
    '',
    ...Object.entries(profile.links).map(
      ([k, v]) => `- ${k === 'linkedin' ? 'LinkedIn' : k === 'github' ? 'GitHub' : 'Bluesky'}: ${v}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
