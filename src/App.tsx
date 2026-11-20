import React, { useEffect, useState } from 'react';
import {
  Cpu, Download as DownloadIcon, ArrowRight, ArrowUpRight, Globe2, ShieldCheck, Workflow, Boxes,
  Layers3, Network, Sparkles, TerminalSquare, Activity, Github, Menu, X, Check,
  Monitor, Command, AppWindow, CircleDot, Zap, Radar, Building2, HeartPulse,
  Factory, Plane, Scale, WandSparkles, Database, Bot, Braces, ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Industries', href: '#industries' },
  { label: 'Download', href: '#download' },
];

const STATS = [
  { value: '67', label: 'Industries mapped' },
  { value: '1,340', label: 'Clasped devices & apps' },
  { value: '42', label: 'Baseline hubs' },
  { value: '10+', label: 'Model providers' },
];

const INDUSTRIES = [
  'Lawyers & Legal', 'Graphic Design', 'Architecture / BIM', 'Automotive & Industrial',
  'Accounting & Finance', 'Marketing', 'Construction', 'Insurance', 'Engineering',
  'Healthcare', 'Video & Film', 'Game Development', 'Data Science', 'DevOps',
  'Real Estate', 'Human Resources', 'Financial Trading', 'Logistics', 'E-Commerce',
  'Cybersecurity', 'Pharmaceutical R&D', 'Semiconductors', 'Defense Tech', 'AppSec',
  'IP Protection', 'Inspection & NDT', 'Federal Compliance', 'Robotics', 'Aviation',
  'Renewable Energy', 'Mining', 'Agriculture', 'Government', 'Interior Design',
  'Music Production', 'Advertising', 'Non-Profit', 'Humanoid Systems', 'Space & Satellite',
  'AI Assistants', 'Wearables', 'XR / Spatial', 'Maritime', 'Rail', 'Smart Buildings',
];

function Logo({ size = 28 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 via-teal-400 to-emerald-400 shadow-[0_0_30px_-8px_rgba(45,212,191,0.7)]"
      style={{ width: size, height: size }}
    >
      <span className="inline-flex items-center justify-center rounded-[8px] bg-neutral-950 w-[calc(100%-3px)] h-[calc(100%-3px)]">
        <Cpu className="text-neutral-100" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.8} />
      </span>
    </span>
  );
}

function GradientRule() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />;
}

/* ------------------------------------------------------------------ */
/* Hero graphic — animated clasp graph                                 */
/* ------------------------------------------------------------------ */

const DEVICES = [
  { label: 'OT-2 Liquid Handler', y: 74 },
  { label: 'Niton XRF Analyzer', y: 146 },
  { label: 'Matrice 350 RTK', y: 218 },
  { label: 'Niton XL3t / CMM', y: 290 },
  { label: 'USRP B210 SDR', y: 362 },
];
const APPS = [
  { label: 'Benchling ELN', y: 74 },
  { label: 'Corsearch Watch', y: 146 },
  { label: 'Autoware Stack', y: 218 },
  { label: 'InspectView NDT', y: 290 },
  { label: 'GNU Radio', y: 362 },
];

function ClaspGraph() {
  return (
    <div className="relative w-full aspect-[520/460] select-none">
      {/* ambient halos */}
      <div className="absolute inset-[8%] rounded-full bg-teal-500/10 blur-[70px]" />
      <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-blue-500/10 blur-[60px]" />
      <svg viewBox="0 0 520 460" className="relative h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#60a5fa" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#2dd4bf" stopOpacity="0.85" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="core" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#3b82f6" /><stop offset="0.55" stopColor="#2dd4bf" /><stop offset="1" stopColor="#34d399" />
          </linearGradient>
          <radialGradient id="corefill"><stop stopColor="#134e4a" stopOpacity="0.9" /><stop offset="1" stopColor="#0b1220" stopOpacity="0.2" /></radialGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>

        {/* concentric rings */}
        {[66, 100, 136].map((r, i) => (
          <circle key={r} cx="260" cy="226" r={r} stroke="white" strokeOpacity={0.07 - i * 0.015} strokeWidth="1" strokeDasharray={i === 2 ? '3 8' : undefined} />
        ))}

        {/* clasped wires */}
        {DEVICES.map((d, i) => (
          <g key={i}>
            <path
              d={`M 158 ${d.y} C 205 ${d.y}, 230 226, 260 226 C 290 226, 315 ${APPS[i].y}, 362 ${APPS[i].y}`}
              stroke="url(#wire)"
              strokeWidth="1.6"
            />
            <path
              d={`M 158 ${d.y} C 205 ${d.y}, 230 226, 260 226 C 290 226, 315 ${APPS[i].y}, 362 ${APPS[i].y}`}
              stroke="#5eead4"
              strokeOpacity="0.9"
              strokeWidth="2"
              strokeDasharray="4 36"
              className="animate-dash"
            />
          </g>
        ))}

        {/* device nodes */}
        {DEVICES.map((d, i) => (
          <g key={`dev-${i}`} className="animate-float-a" style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx="152" cy={d.y} r="22" fill="#0b1220" stroke="#60a5fa" strokeOpacity="0.45" />
            <circle cx="152" cy={d.y} r="4" fill="#60a5fa" />
            <text x="120" y={d.y + 3} textAnchor="end" fill="#a1a1aa" fontSize="9.5" fontFamily="var(--font-mono)">{d.label}</text>
          </g>
        ))}
        {/* app nodes */}
        {APPS.map((a, i) => (
          <g key={`app-${i}`} className="animate-float-b" style={{ animationDelay: `${i * 0.5}s` }}>
            <circle cx="368" cy={a.y} r="22" fill="#0b1220" stroke="#34d399" strokeOpacity="0.45" />
            <circle cx="368" cy={a.y} r="4" fill="#34d399" />
            <text x="400" y={a.y + 3} textAnchor="start" fill="#a1a1aa" fontSize="9.5" fontFamily="var(--font-mono)">{a.label}</text>
          </g>
        ))}

        {/* core */}
        <circle cx="260" cy="226" r="48" fill="url(#soft)" opacity="0.55" />
        <circle cx="260" cy="226" r="41" fill="url(#corefill)" stroke="url(#core)" strokeWidth="1.5" />
        <circle cx="260" cy="226" r="52" stroke="#2dd4bf" strokeOpacity="0.4" className="animate-pulse-ring" />
        <text x="260" y="222" textAnchor="middle" fill="#f4f4f5" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">CLASP</text>
        <text x="260" y="237" textAnchor="middle" fill="#5eead4" fontSize="8" fontFamily="var(--font-mono)">AGENTIC CORE</text>

        {/* axis labels */}
        <text x="152" y="410" textAnchor="middle" fill="#71717a" fontSize="9" letterSpacing="2" fontFamily="var(--font-mono)">HARDWARE</text>
        <text x="368" y="410" textAnchor="middle" fill="#71717a" fontSize="9" letterSpacing="2" fontFamily="var(--font-mono)">SOFTWARE</text>
      </svg>
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
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-xs text-zinc-400 transition-colors hover:text-white">{n.label}</a>
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
          <button type="button" className="text-zinc-400 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/[0.06] bg-[#050506] px-5 py-4 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-zinc-300">{n.label}</a>
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
      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-teal-500/[0.07] blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>
            Now shipping · v0.6.8
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[68px]">
            The operating system<br />for <span className="glow-text">agentic clusters.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            ClaspOS pairs real hardware devices with the software that drives them — across
            <span className="text-zinc-200"> 67 industries</span> — then runs autonomous agent
            clusters to execute the work. Physical and digital, conjoined.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#download" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 p-[1.5px]">
              <span className="inline-flex items-center gap-2 rounded-[10px] bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-transparent">
                Download ClaspOS <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <a href="#platform" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white">
              Explore the platform <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 font-mono text-[10px] text-zinc-600">macOS · Windows · Linux · Free to start</p>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[40px] border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent" />
          <ClaspGraph />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:grid-cols-4 sm:px-8">
        {STATS.map((s) => (
          <div key={s.label} className="px-2 py-8 text-center sm:py-10">
            <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-[11px] uppercase tracking-wider text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const CONCEPTS = [
  {
    icon: CircleDot, tag: '01 / CLASP', title: 'Clasp a device',
    body: 'Pair a physical machine — a liquid handler, a drone, a PCR thermocycler, a WAF appliance — with the software that operates it. A real, durable link with a protocol and a workflow.',
    art: 'device',
  },
  {
    icon: Workflow, tag: '02 / CONJOIN', title: 'Conjoin applications',
    body: 'Chain devices and applications into a mission. Every clasp becomes a verifiable step, with safety gates, provenance, and files written to real mission folders.',
    art: 'chain',
  },
  {
    icon: Boxes, tag: '03 / CLUSTER', title: 'Run an agentic cluster',
    body: 'Autonomous agents plan, critique, and execute the mission across your workstation. Local-first, model-agnostic, and auditable from prompt to artifact.',
    art: 'cluster',
  },
];

function ConceptArt({ kind }: { kind: string }) {
  if (kind === 'device') return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      <rect x="10" y="20" width="74" height="50" rx="10" stroke="#60a5fa" strokeOpacity="0.5" />
      <circle cx="47" cy="45" r="9" fill="#60a5fa" fillOpacity="0.15" stroke="#60a5fa" />
      <path d="M84 45 H176" stroke="url(#wire)" strokeWidth="2" />
      <path d="M84 45 H176" stroke="#5eead4" strokeWidth="2.5" strokeDasharray="4 30" className="animate-dash" />
      <rect x="176" y="20" width="74" height="50" rx="10" stroke="#34d399" strokeOpacity="0.5" />
      <rect x="190" y="38" width="46" height="4" rx="2" fill="#34d399" fillOpacity="0.5" />
      <rect x="190" y="48" width="30" height="4" rx="2" fill="#34d399" fillOpacity="0.3" />
    </svg>
  );
  if (kind === 'chain') return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      {[20, 80, 140, 200].map((x, i) => (
        <g key={x}>
          <rect x={x} y="30" width="40" height="30" rx="8" stroke="white" strokeOpacity="0.2" />
          <circle cx={x + 20} cy="45" r="4" fill={i % 2 ? '#34d399' : '#60a5fa'} fillOpacity="0.8" />
          {i < 3 && <path d={`M${x + 40} 45 H${x + 60}`} stroke="white" strokeOpacity="0.25" strokeDasharray="3 4" />}
        </g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      {[[130, 45], [70, 24], [70, 66], [190, 24], [190, 66], [130, 10], [130, 80]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M130 45 L${x} ${y}`} stroke="white" strokeOpacity="0.13" />
          <circle cx={x} cy={y} r={i === 0 ? 11 : 6} fill={i === 0 ? '#2dd4bf' : '#52525b'} fillOpacity={i === 0 ? 0.9 : 0.7} />
        </g>
      ))}
      <circle cx="130" cy="45" r="18" stroke="#2dd4bf" strokeOpacity="0.5" className="animate-pulse-ring" />
    </svg>
  );
}

function Platform() {
  return (
    <section id="platform" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-2xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-400/80">The platform</div>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          One system. Every device.<br /><span className="text-zinc-500">Every industry.</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          ClaspOS is not a chat wrapper. It is a workstation operating layer that knows what is
          physically connected, what software controls it, and how to conjoin the two into an
          executable mission — with real files, real protocols, and real verification.
        </p>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {CONCEPTS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/20">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-teal-500/[0.07] blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500"><Icon className="h-3.5 w-3.5 text-teal-400" /> {c.tag}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
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
  { n: '01', title: 'Scan your workstation', body: 'Discover hardware on the local network and applications already installed — no manual inventory.', icon: Radar },
  { n: '02', title: 'Clasp & conjoin', body: 'Select a device and its companion software. ClaspOS builds the protocol bridge and safety gates.', icon: Network },
  { n: '03', title: 'Dispatch a cluster', body: 'Describe the outcome. Autonomous agents plan, execute, audit, and write the deliverables to disk.', icon: Sparkles },
];

function How() {
  return (
    <section id="how" className="relative border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-400/80">How it works</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">From discovery to delivery.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">Three moves. No prompt archaeology, no brittle scripts, no simulated results.</p>
        </div>
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-blue-500/40 via-teal-400/40 to-emerald-400/40 md:block" />
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative">
                <div className="relative z-10 inline-flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-xl">
                  <Icon className="h-6 w-6 text-teal-300" strokeWidth={1.6} />
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
  { icon: HeartPulse, title: 'Clinical & lab ops', body: 'Conjoin sequencers, plate readers, and ELNs into validated lab workflows.', tag: 'Healthcare' },
  { icon: Factory, title: 'Factory & field service', body: 'PLCs, torque wrenches, and inspection decks driving real maintenance missions.', tag: 'Industrial' },
  { icon: Scale, title: 'Legal & compliance', body: 'Evidence scanners, WORM vaults, and docketing platforms with chain of custody.', tag: 'Legal' },
  { icon: Plane, title: 'Aerospace & defense', body: 'Avionics benches, DO-178C workflows, and mission planning in one cluster.', tag: 'Aviation' },
  { icon: Braces, title: 'Engineering & design', body: 'CNC, CMM, CAD, and simulation tools conjoined into generative pipelines.', tag: 'Engineering' },
  { icon: Database, title: 'Data & analytics', body: 'Warehouses, pipelines, and notebooks orchestrated by agentic peers.', tag: 'Data' },
  { icon: Bot, title: 'AI assist & automation', body: 'Vendor copilots and local open models coordinated across your workstation.', tag: 'Automation' },
  { icon: ShieldCheck, title: 'Regulated industries', body: 'Federal, SOC 2, and ISO 17020 workflows with evidence and audit gates.', tag: 'Compliance' },
];

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-400/80">Use cases</div>
      <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">Built for work that actually happens.</h2>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {USES.map((u) => {
          const Icon = u.icon;
          return (
            <div key={u.title} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-teal-300" strokeWidth={1.6} />
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600">{u.tag}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{u.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">{u.body}</p>
              <ArrowUpRight className="mt-4 h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-teal-300" />
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
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-400/80">Coverage</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">67 industries, one substrate.</h2>
          </div>
          <a href="https://github.com/GlimmaryKarlR/ClaspOs-Releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white">
            See the full catalog <ArrowUpRight className="h-3.5 w-3.5" />
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
        <p className="font-mono text-[10px] text-zinc-600">…plus 25 more domains including Semiconductors, Federal Compliance, Inspection & NDT, Humanoid Robotics, Space & Satellite, and Vendor AI Assistants.</p>
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
    <section id="download" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/[0.06] blur-[130px]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal-400/80">Get started</div>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Clasp your first device today.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">Free to download and run locally. Your keys stay on your machine.</p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {DOWNLOADS.map((d) => {
            const Icon = d.icon;
            return (
              <a key={d.file} href={d.file}
                 className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition-all hover:border-teal-400/40 hover:bg-white/[0.05]">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-neutral-950"><Icon className="h-4 w-4 text-teal-300" strokeWidth={1.6} /></span>
                  <span>
                    <span className="block font-display text-sm font-semibold">{d.label}</span>
                    <span className="mt-0.5 block font-mono text-[10px] text-zinc-500">{d.note}</span>
                  </span>
                </div>
                <DownloadIcon className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-teal-300" />
              </a>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-zinc-600">
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" /> Local-first</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" /> No account required</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-emerald-400" /> Real files, real protocols</span>
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
          <a href="https://github.com/GlimmaryKarlR/ClaspOs-Releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-zinc-300">GitHub <ArrowUpRight className="h-3 w-3" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`min-h-screen bg-[#050506] text-zinc-100 ${scrolled ? '' : ''}`}>
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
