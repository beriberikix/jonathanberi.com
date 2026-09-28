// Schema.org JSON-LD, built from the same data the pages render so search and
// answer engines see exactly what visitors see.

import { profile } from '../data/profile';
import { opensource } from '../data/opensource';
import { getRepoMeta, resolveRepo } from './github';

const SITE = 'https://jonathanberi.com';
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

const personRef = { '@id': PERSON_ID };

export function personSchema() {
  const [locality, region] = profile.location.split(',').map((s) => s.trim());
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: `${SITE}/`,
    image: new URL(profile.headshot.jpg, SITE).href,
    jobTitle: profile.currentRole.title,
    worksFor: {
      '@type': 'Organization',
      name: profile.currentRole.org,
      url: profile.currentRole.href,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profile.education.name,
      url: profile.education.href,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressRegion: region,
      addressCountry: 'US',
    },
    description: profile.summary[0],
    knowsAbout: [...profile.focusAreas, ...profile.competencies],
    sameAs: Object.values(profile.links),
  };
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: profile.name,
    url: `${SITE}/`,
    inLanguage: 'en',
    publisher: personRef,
  };
}

/** Home page: a ProfilePage about Jonathan. */
export function homeSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': `${SITE}/#profile`,
          url: `${SITE}/`,
          name: `${profile.name} · ${profile.kicker}`,
          isPartOf: { '@id': WEBSITE_ID },
          mainEntity: personRef,
        },
        personSchema(),
        websiteSchema(),
      ],
    },
  ];
}

/** /open-source: a collection of repos and organizations. */
export async function openSourceSchema(description: string) {
  const meta = await getRepoMeta();
  const url = `${SITE}/open-source/`;

  const orgs = opensource.orgs.map((o) => ({
    '@type': 'Organization',
    name: o.name,
    url: o.href,
    description: o.blurb,
  }));

  const repos = opensource.repos.map((entry) => {
    const r = resolveRepo(entry.repo, meta, entry);
    const authored = r.role === 'Author' || r.role.startsWith('Creator');
    return {
      '@type': 'SoftwareSourceCode',
      name: r.name,
      url: r.href,
      codeRepository: `https://github.com/${entry.repo}`,
      description: r.blurb || undefined,
      programmingLanguage: r.language,
      ...(authored ? { author: personRef } : { contributor: personRef }),
    };
  });

  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': url,
          url,
          name: `Open source · ${profile.name}`,
          description,
          isPartOf: { '@id': WEBSITE_ID },
          about: personRef,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [...orgs, ...repos].map((item, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item,
            })),
          },
        },
        personSchema(),
        websiteSchema(),
      ],
    },
  ];
}
