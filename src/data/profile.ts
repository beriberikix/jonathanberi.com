// Single source of truth for all site copy & links.
// Edit here to update content across the site.

export const profile = {
  name: 'Jonathan Beri',
  // The hero leads with this point of view, not a job title.
  tagline: 'I help companies connect sand to the internet.',
  kicker: 'Product & Strategy Executive',
  focusAreas: ['Edge AI', 'Physical AI', 'Edge Computing', 'Silicon Ecosystems'],
  currentRole: {
    title: 'Head of Product, IoT',
    org: 'Canonical',
    href: 'https://canonical.com',
  },
  founderLine: 'Founder & CEO of Golioth — acquired by Canonical',
  location: 'San Francisco, California',
  headshot: {
    webp: '/img/jonathanberi_headshot.webp',
    jpg: '/img/jonathanberi_headshot.jpg',
    alt: 'Portrait of Jonathan Beri',
  },

  // Short executive summary (generalized — no single-vendor framing).
  summary: [
    'Product and platform executive — and a venture-backed founder with one exit — with 15+ years building the systems that bring AI to the physical edge: from silicon and embedded compute to connectivity, fleet deployment, and inference on constrained devices.',
    'I founded and scaled Golioth from zero to acquisition, raising $8M+ to build the developer platform that turns connected-hardware prototypes into deployed products. Developers are in my DNA, and I love open source.',
  ],

  // Scannable metric cards — the proof, not a résumé table.
  highlights: [
    { value: '15+', unit: 'years', label: 'building at the edge' },
    { value: '1x', unit: 'exit', label: 'founder & operator' },
    { value: '$8M+', unit: 'raised', label: 'venture-backed' },
    { value: '23', unit: 'people · 5 countries', label: 'team built & led' },
  ],

  // Curated narrative of things built — each role is one strong line + outcomes.
  experience: [
    {
      org: 'Canonical',
      role: 'Head of Product, IoT',
      period: '2026 — now',
      current: true,
      href: 'https://canonical.com',
      lede: 'Leading global product strategy for the embedded and edge portfolio — the OS layer beneath much of the edge-AI ecosystem.',
      points: [
        'Own product across Ubuntu Core, Ubuntu Pro for Devices, and Golioth — the foundation customers use to deploy and secure compute and AI workloads at the edge.',
        'Accountable for top-level KPIs and revenue; lead and scale a distributed org of product managers and developer-relations professionals.',
      ],
    },
    {
      org: 'Golioth',
      role: 'Founder & CEO',
      period: '2020 — 2026',
      note: 'Acquired by Canonical',
      href: 'https://golioth.io',
      lede: 'Built the developer platform for connected hardware and Edge AI — from zero to acquisition.',
      points: [
        'Founded and led the company through exit, owning all product, engineering, and go-to-market while growing a fully distributed team to 23 across five countries.',
        'Raised $8M+ and managed full P&L — budgets, headcount, investor reporting, and runway across multiple fundraising cycles.',
        'Defined the architecture connecting constrained devices to the cloud — managed connectivity, OTA, and data pipelines — the substrate increasingly central to Edge and Physical AI.',
        'Structured partnerships across leading semiconductor vendors, then negotiated and closed the acquisition and led integration. Member of the Zephyr Project Technical Steering Committee.',
      ],
    },
    {
      org: 'Particle',
      role: 'Senior Product Manager',
      period: '2017 — 2019',
      href: 'https://particle.io',
      lede: 'Owned the embedded device platform for one of the most widely adopted edge-hardware developer ecosystems.',
      points: [
        'Shipped Particle Mesh, Particle Workbench, Device OS 1.0 (embedded RTOS), and new mobile apps — from silicon selection to developer-facing C++ APIs.',
      ],
    },
    {
      org: 'Google / Nest',
      role: 'Product Manager',
      period: '2011 — 2017',
      href: 'https://github.com/openthread/openthread',
      lede: 'Edge platform work across networking protocols, embedded platforms, and open-source developer ecosystems.',
      points: [
        'Led product for Thread, OpenThread, and Weave — and launched Nest’s first open-source initiative, OpenThread, now the default Thread stack for the Matter standard.',
        'Represented Alphabet/Google/Nest as an alternate Board member of the Thread Group.',
      ],
    },
  ],

  // De-emphasized earlier roles — a compact, structured list.
  earlier: [
    { org: 'WeWork', role: 'Product, Core Platform', period: '2019 — 2020' },
    { org: 'Magento', role: 'Senior Technical PM', period: '2010 — 2011' },
    {
      org: 'MySpace',
      role: 'Senior PM — early OpenID Connect / OAuth2',
      period: '2008 — 2010',
    },
  ],

  // Airy inline chips — not a competency matrix.
  competencies: [
    'Edge AI & Physical AI strategy',
    'Developer programs & DevRel',
    'P&L & operating leadership',
    'Venture fundraising',
    'SDKs / APIs / platforms',
    'Open source & standards',
    'Silicon & ecosystem partnerships',
    'Global, distributed teams',
    'Product vision & roadmap',
    'Hardware–software co-design',
  ],

  // Light single-line recognition list.
  recognition: [
    { label: 'Fellow, Conduit Venture Labs', detail: '2023 — now' },
    { label: 'Board of Directors, Thread Group', detail: '2016 — 2017' },
    { label: 'Technical Steering & Marketing Committees, Zephyr Project' },
    { label: 'Author, Make: JavaScript Robotics', detail: 'Maker Media / O’Reilly' },
    { label: 'Frequent speaker on embedded, edge & developer platforms' },
  ],

  // Personality, not self-deprecation.
  beyond: [
    'Off the clock I’m a maker and roboticist, and I keep a small lab of computing experiments running — embedded tooling, inference engines, MCP servers, and agentic skills.',
    'B.S. in Computer Science & Business Administration, University of Southern California.',
  ],

  links: {
    email: 'mailto:jmberi@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jonathanberi',
    github: 'https://github.com/beriberikix',
    bluesky: 'https://bsky.app/profile/jonathanberi.com',
  },
} as const;

export type Profile = typeof profile;
