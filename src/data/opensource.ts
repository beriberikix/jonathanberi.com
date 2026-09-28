// Open source: curated list for the home section and /open-source.
// Repo stats (stars, language, last push) are fetched from GitHub at build
// time by src/lib/github.ts; everything here is the editorial layer.
//
// `featured: true` surfaces an entry in the home page section (keep it to ~6).
// A repo `blurb` overrides its GitHub description. Give featured repos one so
// the home page keeps its copy if the GitHub fetch fails.

export interface Theme {
  id: string;
  label: string;
}

export interface Organization {
  name: string;
  href: string;
  role: string;
  blurb: string;
  /** Small inline links, e.g. an org's key repos. */
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export interface RepoEntry {
  /** owner/name on GitHub */
  repo: string;
  theme: string;
  /** Display name and link overrides, e.g. for work that lives in a PR. */
  name?: string;
  href?: string;
  /** Defaults to 'Author'; anything else is shown as a tag. */
  role?: string;
  blurb?: string;
  featured?: boolean;
}

export const opensource = {
  intro:
    'I build in the open: libraries, board ports, and tools for embedded developers, plus long-running work in the communities behind Zephyr and Golioth.',

  themes: [
    { id: 'zephyr', label: 'Zephyr libraries & boards' },
    { id: 'provisioning', label: 'Connectivity & provisioning' },
    { id: 'sim', label: 'Simulation & Zephyr in the browser' },
    { id: 'hardware', label: 'USB, probes & hardware access' },
    { id: 'ai', label: 'AI, agents & LLM-ready docs' },
    { id: 'tooling', label: 'Developer tooling & ecosystem' },
    { id: 'languages', label: 'Languages & runtimes' },
    { id: 'other', label: 'Other' },
  ] satisfies Theme[],

  orgs: [
    {
      name: 'Zephyr Project',
      href: 'https://zephyrproject.org',
      role: 'Silver-member representative',
      blurb:
        'The open source RTOS for connected, resource-constrained devices. Formerly on the Technical Steering and Marketing Committees.',
      featured: true,
    },
    {
      name: 'Golioth',
      href: 'https://github.com/golioth',
      role: 'Founder',
      blurb:
        'Open source device SDKs, reference designs, and examples for the Golioth IoT platform, now part of Canonical.',
      featured: true,
    },
    {
      name: 'Embedded Containers',
      href: 'https://github.com/embeddedcontainers',
      role: 'Creator & maintainer',
      blurb: 'Performance-optimized container images for building embedded firmware.',
      links: [
        { label: 'zephyr', href: 'https://github.com/embeddedcontainers/zephyr' },
        { label: 'ncs', href: 'https://github.com/embeddedcontainers/ncs' },
        { label: 'arduino', href: 'https://github.com/embeddedcontainers/arduino' },
      ],
    },
    {
      name: 'OpenThread',
      href: 'https://github.com/openthread/openthread',
      role: 'Launched at Google / Nest',
      blurb: 'Nest’s first open source initiative, now the default Thread stack for Matter.',
    },
  ] satisfies Organization[],

  repos: [
    // Zephyr libraries & boards
    { repo: 'beriberikix/zephyrdb', theme: 'zephyr' },
    { repo: 'beriberikix/flatcc-zephyr', theme: 'zephyr' },
    { repo: 'beriberikix/senml-zephyr', theme: 'zephyr' },
    { repo: 'beriberikix/macaroons-zephyr', theme: 'zephyr' },
    {
      repo: 'beriberikix/zephyr-rproc-ipc',
      theme: 'zephyr',
      blurb: 'Remoteproc and RPMsg for Linux-hosted cores, with an IPC service backend and MCUmgr transport.',
    },
    { repo: 'beriberikix/zephyr-desktop', theme: 'zephyr' },
    {
      repo: 'beriberikix/presto-zephyr',
      theme: 'zephyr',
      blurb: 'Zephyr board support for the Pimoroni Presto, including an out-of-tree RGB display driver.',
    },
    { repo: 'beriberikix/tufty2350-zephyr', theme: 'zephyr', blurb: 'Zephyr board support for the Pimoroni Tufty 2350.' },

    // Connectivity & provisioning
    { repo: 'beriberikix/network-provisioning-zephyr', theme: 'provisioning' },
    { repo: 'beriberikix/improv-zephyr', theme: 'provisioning', blurb: 'Improv Wi-Fi provisioning for Zephyr.' },
    {
      repo: 'beriberikix/pouch-network-provisioning',
      theme: 'provisioning',
      blurb: 'BLE provisioning for blank Zephyr devices, with zero-touch Golioth enrollment.',
    },
    {
      repo: 'beriberikix/pouch.mpy',
      theme: 'provisioning',
      blurb: 'The Golioth Pouch protocol in pure Python for MicroPython and OpenMV.',
    },
    {
      repo: 'beriberikix/ArduinoCore-zephyr',
      name: 'Golioth on Arduino',
      href: 'https://github.com/beriberikix/ArduinoCore-zephyr/pull/1',
      theme: 'provisioning',
      blurb: 'Golioth Pouch from Arduino sketches on ArduinoCore-zephyr, as a Wi-Fi device, a BLE device, and a BLE gateway.',
    },
    {
      repo: 'beriberikix/wifi-provision',
      theme: 'provisioning',
      blurb: 'Wi-Fi setup for headless Ubuntu Core devices through a temporary captive portal.',
    },

    // Simulation & Zephyr in the browser
    { repo: 'beriberikix/zephyr-wasm-soc', theme: 'sim' },
    {
      repo: 'beriberikix/qemu-wasm-zephyr',
      theme: 'sim',
      blurb: 'Zephyr on QEMU x86 compiled to WebAssembly, with a terminal in the browser.',
    },
    {
      repo: 'beriberikix/zephyr-v86',
      theme: 'sim',
      blurb: 'Runs Zephyr native_sim binaries inside a Linux guest on the v86 browser emulator.',
    },
    {
      repo: 'beriberikix/zephyr-simulator-server',
      theme: 'sim',
      blurb: 'Upload and run Zephyr native_sim binaries in isolated containers, with live UART streaming.',
    },

    // USB, probes & hardware access
    {
      repo: 'beriberikix/usbipd-mac',
      theme: 'hardware',
      blurb: 'A macOS implementation of the USB/IP protocol, for sharing USB devices with VMs and containers.',
      featured: true,
    },
    { repo: 'beriberikix/usb-macos-vm', theme: 'hardware' },
    {
      repo: 'beriberikix/usbip-browser',
      theme: 'hardware',
      blurb: 'A USB/IP client in the browser: JavaScript access to USB devices on a remote machine.',
    },
    { repo: 'beriberikix/probe-web', theme: 'hardware' },
    { repo: 'boogie/mcumgr-web', theme: 'hardware', role: 'Contributor', blurb: 'MCU Manager in the browser. Added the Web Serial transport.' },
    { repo: 'beriberikix/webhw', theme: 'hardware' },
    { repo: 'beriberikix/sbcview', theme: 'hardware' },

    // AI, agents & LLM-ready docs
    {
      repo: 'beriberikix/zephyr-agent-skills',
      theme: 'ai',
      blurb: 'A complete catalog of Agent Skills for Zephyr RTOS development.',
      featured: true,
    },
    {
      repo: 'beriberikix/zephyr-cli',
      theme: 'ai',
      blurb: 'An agent-optimized CLI for Zephyr that emits structured JSON for boards, Kconfig, devicetree, and builds.',
    },
    { repo: 'beriberikix/awesome-mcp-hardware', theme: 'ai' },
    { repo: 'beriberikix/zephyr-west-mcp', theme: 'ai', blurb: 'An MCP server for west, Zephyr’s meta-tool.' },
    {
      repo: 'beriberikix/zephyrdocs.md',
      theme: 'ai',
      blurb: 'Zephyr documentation bundled as Markdown for LLM and RAG use.',
    },

    // Developer tooling & ecosystem
    {
      repo: 'golioth/awesome-zephyr-rtos',
      theme: 'tooling',
      role: 'Creator & maintainer',
      blurb: 'A curated list of awesome projects and resources for the Zephyr RTOS.',
      featured: true,
    },
    {
      repo: 'beriberikix/zephyr-vscode-example',
      theme: 'tooling',
      blurb: 'A reference setup for developing Zephyr applications in Visual Studio Code.',
      featured: true,
    },
    { repo: 'beriberikix/multipass-zephyr', theme: 'tooling' },
    {
      repo: 'beriberikix/west-modules-registry',
      theme: 'tooling',
      blurb: 'A curated, Git-based index of third-party Zephyr modules.',
    },
    {
      repo: 'beriberikix/wmr-discover-extension',
      theme: 'tooling',
      blurb: 'A west discover command: search the modules registry and install modules into west.yml.',
    },
    {
      repo: 'beriberikix/doxygen.md',
      theme: 'tooling',
      blurb: 'Reusable moxygen templates for turning Doxygen XML into Markdown and Docusaurus pages.',
    },
    { repo: 'beriberikix/devurn-generator-web', theme: 'tooling' },

    // Languages & runtimes
    {
      repo: 'silica-lang/si',
      theme: 'languages',
      role: 'Creator',
      blurb: 'Silica, an experimental embedded-native and agent-native programming language.',
    },

    // Other
    { repo: 'beriberikix/market-mapper', theme: 'other' },
  ] satisfies RepoEntry[],
};
