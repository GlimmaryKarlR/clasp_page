import React, { useState } from 'react';
import {
  Cpu, Download as DownloadIcon, ArrowRight, ArrowUpRight, Github, Menu, X, Check,
  Monitor, Command, AppWindow, CircleDot, Radar, Network, HeartPulse, Factory, TerminalSquare,
  Scale, Plane, Braces, Database, Bot, ShieldCheck, Smartphone, ChevronRight,
  Layers3, Sparkles, Building2, Clapperboard, Cog,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Industries', href: '#industries' },
  { label: 'Releases', href: 'https://github.com/GlimmaryKarlR/ClaspOs-Releases' },
  { label: 'Download', href: '#download' },
];

const STATS = [
  { value: '67', label: 'Industries preloaded', note: 'Domain workflows, standards, and terminology ready on day one.' },
  { value: '1,340+', label: 'Apps & devices mapped', note: 'Native software integrations and local network protocols.' },
  { value: '100%', label: 'Local-first & BYOC', note: 'Runs on your hardware or inside your private OIDC cloud.' },
  { value: '10+', label: 'Model providers', note: 'Local open weights, custom endpoints, or frontier APIs.' },
];

const INDUSTRIES = [
  'Lawyers & Legal', 'Graphic Design', 'Architecture & BIM', 'Automotive & Industrial',
  'Accounting & Finance', 'Marketing', 'Construction', 'Insurance',
  'Mechanical & Structural Engineering', 'Healthcare', 'Video & Film Production',
  'Game Development & 3D', 'Data Science & ML', 'Software Engineering & DevOps',
  'Real Estate & Property', 'Human Resources', 'Financial Trading & Wealth',
  'Logistics & Supply Chain', 'E-Commerce & Retail', 'Cybersecurity & IT',
  'Pharmaceutical & Biotech R&D', 'Semiconductors', 'Defense Tech', 'AppSec',
  'IP Protection', 'Inspection & NDT', 'Federal Compliance',
  'Industrial Automation & Robotics', 'Aviation & Aerospace', 'Renewable Energy & Utilities',
  'Mining & Resources', 'Agriculture & AgTech', 'Government & Public Sector',
  'Interior Design', 'Music & Sound Engineering', 'Advertising & Media Buying',
  'Non-Profit & Fundraising', 'Humanoid Systems', 'Space & Satellite', 'Wearables',
  'XR & Spatial Computing', 'Smart Buildings',
];

function Logo({ size = 28 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[10px] border border-white/15 bg-neutral-900"
      style={{ width: size, height: size }}
    >
      <Cpu className="text-neutral-100" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.6} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero graphic — lightweight orthogonal clasp schematic              */
/* ------------------------------------------------------------------ */

const CLASP_PAIRS = [
  { device: 'OT-2 Liquid Handler', app: 'Benchling ELN', y: 66 },
  { device: 'Matrice 350 RTK', app: 'Autoware Stack', y: 146 },
  { device: 'USRP B210 SDR', app: 'GNU Radio', y: 226 },
];

function ClaspGraph() {
  return (
    <div className="w-full rounded-2xl border border-white/[0.08] bg-[#09090b] p-6 sm:p-7 select-none">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        <span>Hardware</span>
        <span className="text-zinc-400">Clasp Bridge</span>
        <span>Software</span>
      </div>

      <svg viewBox="0 0 480 288" className="my-2 w-full" fill="none" aria-label="Hardware to software clasp schematic">
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="white" fillOpacity="0.07" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="480" height="288" fill="url(#dots)" />

        {/* corner registration marks */}
        {[[8, 8], [472, 8], [8, 280], [472, 280]].map(([x, y], i) => (
          <g key={i} stroke="white" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <path d={`M${x - 4} ${y} H${x + 4} M${x} ${y - 4} V${y + 4}`} />
          </g>
        ))}

        {/* orthogonal connectors */}
        {CLASP_PAIRS.map((pair) => (
          <g key={pair.device}>
            <path d={`M 156 ${pair.y} H 204 V 146 H 214`} stroke="white" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={`M 266 146 H 276 V ${pair.y} H 324`} stroke="white" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx="204" cy={pair.y} r="1.6" fill="white" fillOpacity="0.3" />
            <circle cx="276" cy={pair.y} r="1.6" fill="white" fillOpacity="0.3" />
          </g>
        ))}

        {/* device nodes */}
        {CLASP_PAIRS.map((pair, i) => (
          <g key={`dev-${pair.device}`}>
            <rect x="8" y={pair.y - 20} width="148" height="40" rx="7" fill="#0f0f12" stroke="white" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx="24" cy={pair.y} r="2.5" fill="#93c5fd" fillOpacity="0.9" />
            <text x="36" y={pair.y + 3.5} fill="#e4e4e7" fontSize="10.5" fontFamily="var(--font-mono)">{pair.device}</text>
            <text x="148" y={pair.y + 3.5} textAnchor="end" fill="#52525b" fontSize="8" fontFamily="var(--font-mono)">0{i + 1}</text>
          </g>
        ))}

        {/* central bridge */}
        <rect x="214" y="118" width="52" height="56" rx="9" fill="#111115" stroke="white" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <text x="240" y="143" textAnchor="middle" fill="#f4f4f5" fontSize="10" fontWeight="600" letterSpacing="1" fontFamily="var(--font-display)">CLASP</text>
        <text x="240" y="158" textAnchor="middle" fill="#71717a" fontSize="7.5" letterSpacing="1.2" fontFamily="var(--font-mono)">CORE</text>

        {/* software nodes */}
        {CLASP_PAIRS.map((pair, i) => (
          <g key={`app-${pair.app}`}>
            <rect x="324" y={pair.y - 20} width="148" height="40" rx="7" fill="#0f0f12" stroke="white" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx="340" cy={pair.y} r="2.5" fill="#6ee7b7" fillOpacity="0.9" />
            <text x="352" y={pair.y + 3.5} fill="#e4e4e7" fontSize="10.5" fontFamily="var(--font-mono)">{pair.app}</text>
            <text x="464" y={pair.y + 3.5} textAnchor="end" fill="#52525b" fontSize="8" fontFamily="var(--font-mono)">0{i + 1}</text>
          </g>
        ))}
      </svg>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3.5 font-mono text-[10px] text-zinc-500">
        <span>Protocol bridge · Safety gates</span>
        <span>Local-first execution</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050506]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <Logo size={30} />
          <span className="font-display text-base font-semibold tracking-tight">ClaspOS</span>
          <span className="hidden font-mono text-[10px] text-zinc-500 sm:inline">v0.6.8</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.filter((n) => n.label !== 'Download').map((n) => (
            <a key={n.label} href={n.href} target={n.href.startsWith('http') ? '_blank' : undefined} rel={n.href.startsWith('http') ? 'noreferrer' : undefined}
               className="text-xs text-zinc-400 transition-colors hover:text-white">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://github.com/GlimmaryKarlR/ClaspOs-Releases" target="_blank" rel="noreferrer"
             className="hidden items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300 transition-colors hover:border-white/25 hover:text-white sm:inline-flex">
            <Github className="h-3.5 w-3.5" /> Releases
          </a>
          <a href="#download" className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950 transition-colors hover:bg-zinc-200">
            Download <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          <button type="button" className="text-zinc-400 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/[0.06] bg-[#050506] px-5 py-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-zinc-300">{n.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> Now shipping · v0.6.8
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[68px]">
            Every tool. Every machine.<br /><span className="text-zinc-400">One mind.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            ClaspOS is a local-first agentic operating layer that connects custom and frontier AI
            models directly to your desktop software, local hardware, and mobile devices — preloaded
            with domain intelligence across <span className="text-zinc-200">67 industries</span> so
            your team produces real deliverables, not just chat text.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#download" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-zinc-200">
              Download ClaspOS <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#platform" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white">
              Explore the platform <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 font-mono text-[10px] text-zinc-600">macOS · Windows · Linux · Free to start (15 runs included, no credit card)</p>
        </div>
        <div className="relative"><ClaspGraph /></div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`px-5 py-8 sm:px-7 sm:py-10 ${i > 0 ? 'border-l border-white/[0.06]' : ''} ${i === 2 ? 'max-lg:border-l-0' : ''}`}>
            <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400">{s.label}</div>
            <p className="mt-2 max-w-[240px] text-[11px] leading-relaxed text-zinc-600">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CONCEPTS = [
  {
    icon: CircleDot, tag: '01 / CLASP', title: 'Connect your software & hardware',
    body: 'Link AI directly to the tools you already rely on — from CAD, IDEs, and DAWs to CNC mills, lab instruments, and local network devices. No brittle glue scripts or manual API plumbing.',
    art: 'device',
  },
  {
    icon: Layers3, tag: '02 / CLUSTER', title: 'Assemble the right team automatically',
    body: 'Preloaded with intelligence across 67 professions. Start a task in Marketing or Engineering, and ClaspOS automatically recruits neighboring specialists — like Graphic Design, Legal, or Simulation — to review and contribute.',
    art: 'cluster',
  },
  {
    icon: Sparkles, tag: '03 / EXECUTE', title: 'Deliver verified files, anywhere',
    body: 'Agents plan, critique, and write production files to real project folders behind configurable human approval gates. Trigger and monitor runs remotely from your phone using Clasp Mobile.',
    art: 'execute',
  },
];

function ConceptArt({ kind }: { kind: string }) {
  const crisp = { stroke: 'white', strokeOpacity: 0.18, strokeWidth: 1, vectorEffect: 'non-scaling-stroke' as const };
  if (kind === 'device') return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      <rect x="10" y="20" width="74" height="50" rx="6" {...crisp} />
      <circle cx="30" cy="45" r="2.5" fill="#93c5fd" fillOpacity="0.9" />
      <path d="M84 45 H176" stroke="white" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="176" y="20" width="74" height="50" rx="6" {...crisp} />
      <circle cx="196" cy="45" r="2.5" fill="#6ee7b7" fillOpacity="0.9" />
      <path d="M196 58 H236 M196 66 H220" stroke="white" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
  if (kind === 'cluster') return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      {[[130, 45], [70, 24], [70, 66], [190, 24], [190, 66], [130, 8], [130, 82]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M130 45 L${x} ${y}`} stroke="white" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx={x} cy={y} r={i === 0 ? 9 : 4.5} fill={i === 0 ? '#e4e4e7' : '#52525b'} fillOpacity={i === 0 ? 0.95 : 0.8} />
        </g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      {[20, 80, 140, 200].map((x, i) => (
        <g key={x}>
          <rect x={x} y="28" width="40" height="34" rx="5" {...crisp} />
          <path d={`M${x + 8} 40 H${x + 32} M${x + 8} 48 H${x + 24}`} stroke="white" strokeOpacity="0.18" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {i < 3 && <path d={`M${x + 40} 45 H${x + 60}`} stroke="white" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />}
        </g>
      ))}
      <path d="M206 77 H240 M240 77 V68" stroke="#6ee7b7" strokeOpacity="0.6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Platform() {
  return (
    <section id="platform" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-3xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">The platform</div>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Stop copy-pasting between AI chat<br />and your actual tools.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          ClaspOS is not another browser chat wrapper. It is a workstation operating layer that knows
          what applications are installed on your computer, what hardware is connected to your local
          network, and how to coordinate specialized AI agents to execute multi-step work — writing
          verified files directly to your disk.
        </p>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {CONCEPTS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/20">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500"><Icon className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.6} /> {c.tag}</div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.body}</p>
              <div className="mt-6"><ConceptArt kind={c.art} /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', title: 'Scan your environment', body: 'ClaspOS automatically detects installed desktop applications and LAN-connected devices, building a live map of what your workstation can control.', icon: Radar },
  { n: '02', title: 'Set your guardrails & cloud', body: 'Use local open-weight models, frontier APIs, or Bring Your Own Cloud (BYOC) secured with your organization’s OIDC/SSO. Choose which actions run autonomously and which require your sign-off.', icon: ShieldCheck },
  { n: '03', title: 'Dispatch a mission', body: 'Describe the outcome you need from your desktop or mobile app. A coordinated agent team executes across your tools, audits the output, and saves finished artifacts to disk.', icon: Sparkles },
];

function How() {
  return (
    <section id="how" className="relative border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">How it works</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">From local setup to<br />finished deliverables.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">Three steps. Zero prompt archaeology, zero cloud lock-in, zero simulated outputs.</p>
        </div>
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-white/[0.08] md:block" />
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative">
                <div className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0c]">
                  <Icon className="h-6 w-6 text-zinc-200" strokeWidth={1.5} />
                  <span className="absolute -right-2 -top-2 font-mono text-[10px] text-zinc-500">{s.n}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const USES = [
  { icon: Cog, title: 'Engineering & Manufacturing', sub: 'CAD, CAM, CNC & Simulation', body: 'Generate parameterized parts, toolpaths, and stress reports across Fusion 360, SolidWorks, and MTConnect or OPC UA shop-floor machines.' },
  { icon: Braces, title: 'Software & DevOps', sub: 'IDEs, Repos & Infrastructure', body: 'Refactor codebases, automate CI/CD pipelines, and audit local containers with full repository context and diff-level approval gates.' },
  { icon: Scale, title: 'Legal & Compliance', sub: 'Contracts, eDiscovery & Audit', body: 'Redline agreements, run privilege reviews, and assemble SOC 2 or ISO evidence packages without sensitive client documents ever leaving your disk.' },
  { icon: HeartPulse, title: 'Healthcare & Biotech R&D', sub: 'Lab Instruments & Clinical Ops', body: 'Bridge liquid handlers, sequencers, and plate readers with ELNs and analysis pipelines in validated, air-gapped environments.' },
  { icon: Building2, title: 'Architecture & Construction', sub: 'BIM, Drafting & Field Capture', body: 'Automate Revit schedules, structural checks, and laser-scanner workflows from workstation to jobsite via mobile.' },
  { icon: Clapperboard, title: 'Creative, Audio & Film', sub: 'Design, Post-Production & DAWs', body: 'Coordinate vector assets, timeline edits, color grading, and spatial audio sessions across Adobe, DaVinci Resolve, and Pro Tools.' },
  { icon: Plane, title: 'Aerospace & Industrial', sub: 'Avionics, Robotics & Field Service', body: 'Pair PLCs, inspection rigs, and telemetry logs with compliance documentation and maintenance runbooks.' },
  { icon: Database, title: 'Data & Enterprise AI', sub: 'Pipelines, BI & Private BYOC', body: 'Orchestrate private custom models alongside data warehouses and vendor copilots under unified OIDC/SSO governance.' },
];

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Use cases</div>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Built for work that leaves<br />the chat window.</h2>
      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {USES.map((u) => {
          const Icon = u.icon;
          return (
            <div key={u.title} className="group flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.04] sm:p-6">
              <div className="mt-0.5 shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950"><Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.6} /></span>
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold">{u.title} <span className="font-normal text-zinc-500">— {u.sub}</span></h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">{u.body}</p>
              </div>
              <ArrowUpRight className="ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-200" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section id="industries" className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Coverage</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">67 industries,<br />one operating layer.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">Every industry pod ships with domain standards, file formats, software hooks, and hardware protocols out of the box.</p>
          </div>
          <a href="https://github.com/GlimmaryKarlR/ClaspOs-Releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white">
            See the full 67-industry catalog <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <div className="relative mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex shrink-0 gap-2 pr-2">
          {row.map((name, i) => (
            <span key={`${name}-${i}`} className="whitespace-nowrap rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2 text-xs text-zinc-400">{name}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <p className="max-w-4xl font-mono text-[10px] leading-relaxed text-zinc-600">…plus 25 more domains including Banking & Credit Risk, Consulting & Strategy, Higher Education & Research, Journalism & Publishing, Legal Tech & eDiscovery, Maritime, Rail, Telecommunications, and Urban Planning.</p>
      </div>
    </section>
  );
}

const RELEASES = 'https://github.com/GlimmaryKarlR/ClaspOs-Releases/releases/latest/download';
const DOWNLOADS = [
  { label: 'macOS · Apple Silicon', file: `${RELEASES}/ClaspOs-0.6.8-mac-applesilicon.dmg`, icon: Command, note: 'M1 / M2 / M3 / M4' },
  { label: 'macOS · Intel', file: `${RELEASES}/ClaspOs-0.6.8-mac-intel.dmg`, icon: Monitor, note: 'x86_64' },
  { label: 'Windows', file: `${RELEASES}/ClaspOs-0.6.8-windows.exe`, icon: AppWindow, note: '64-bit installer' },
  { label: 'Linux', file: `${RELEASES}/ClaspOs-0.6.8-linux.AppImage`, icon: TerminalSquare, note: 'Universal AppImage' },
];

function Download() {
  return (
    <section id="download" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Get started</div>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Connect your workspace today.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">Download free and run locally in minutes. Your files, keys, and models stay on your machine — with 15 free runs included and zero monthly subscription lock-in.</p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {DOWNLOADS.map((d) => {
            const Icon = d.icon;
            return (
              <a key={d.file} href={d.file}
                 className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition-all hover:border-white/25 hover:bg-white/[0.05]">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950"><Icon className="h-4 w-4 text-zinc-300" strokeWidth={1.6} /></span>
                  <span>
                    <span className="block font-display text-sm font-semibold">{d.label}</span>
                    <span className="mt-0.5 block font-mono text-[10px] text-zinc-500">{d.note}</span>
                  </span>
                </div>
                <DownloadIcon className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-200" />
              </a>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 text-sm text-zinc-300">
          <Smartphone className="h-4 w-4 text-zinc-400" strokeWidth={1.6} />
          <span className="font-display font-medium">Clasp Mobile</span>
          <span className="text-zinc-600">— iOS &amp; Android remote companion</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-zinc-600">
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-zinc-500" /> 15 free runs included</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-zinc-500" /> No credit card</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-zinc-500" /> Keys stay on your machine</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030304]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3"><Logo size={24} /><span className="font-display text-sm font-semibold">ClaspOS</span><span className="font-mono text-[10px] text-zinc-600">© 2026</span></div>
        <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-600">
          <a href="#platform" className="hover:text-zinc-300">Platform</a>
          <a href="#download" className="hover:text-zinc-300">Download</a>
          <a href="https://github.com/GlimmaryKarlR/ClaspOs-Releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-300">Releases <ArrowUpRight className="h-3 w-3" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#050506] text-zinc-100">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Platform />
        <How />
        <UseCases />
        <Industries />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
