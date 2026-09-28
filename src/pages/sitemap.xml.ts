// Static sitemap. Add a path here when a new page is added.
import type { APIRoute } from 'astro';

const PATHS = ['/', '/open-source/'];

export const GET: APIRoute = ({ site }) => {
  const urls = PATHS.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
