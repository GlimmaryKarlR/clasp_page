import React, { useState } from 'react';
import {
  Cpu, Download as DownloadIcon, ArrowRight, ArrowUpRight, Github, Menu, X, Check,
  Monitor, Command, AppWindow, CircleDot, Radar, HeartPulse, TerminalSquare,
  Scale, Plane, Braces, Database, ShieldCheck, Smartphone, ChevronRight,
  Layers3, Sparkles, Cog, PenTool,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'How it works', href: '#how' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Industry Atlas', href: '#industries' },
  { label: 'Releases', href: 'https://github.com/GlimmaryKarlR/ClaspOs-Releases' },
  { label: 'Download', href: '#download' },
];

const ATLAS_URL = 'https://ai.studio/apps/a8b8518d-7767-45da-8635-02d61f58923a';

const STATS = [
  { value: '67', label: 'Industries mapped', note: 'Domain rules, standards, and workflows preloaded.' },
  { value: '1,340+', label: 'Clasped devices & apps', note: 'Software hooks and local hardware protocols.' },
  { value: '42', label: 'Baseline hubs', note: 'Ready-to-run industry starter stacks.' },
  { value: '10+', label: 'Model providers', note: 'Local open models or Bring Your Own Cloud.' },
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
      className="inline-flex items-center justify-center rounded-[10px] border border-white/15 bg-neutral-900"
      style={{ width: size, height: size }}
    >
      <Cpu className="text-neutral-100" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.6} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero graphic — compact, static circular chord diagram               */
/* ------------------------------------------------------------------ */

const ATLAS_SECTORS = [
  { name: 'Legal & Gov', color: '#A78BFA' },
  { name: 'Design & Media', color: '#FBBF24' },
  { name: 'Engineering', color: '#F87171' },
  { name: 'Data & DevOps', color: '#60A5FA' },
  { name: 'Health & Biotech', color: '#2DD4BF' },
  { name: 'Finance & Ops', color: '#34D399' },
  { name: 'Energy & Robotics', color: '#CBD5E1' },
];

const SEG_PER_SECTOR = 8;
const SEG_COUNT = ATLAS_SECTORS.length * SEG_PER_SECTOR;
const CCX = 260;
const CCY = 260;
const R_OUT = 148;
const R_IN = 136;
const R_ATTACH = 134;

function polar(r: number, a: number) {
  return { x: CCX + r * Math.sin(a), y: CCY - r * Math.cos(a) };
}

function segAngle(i: number) {
  return ((i + 0.5) / SEG_COUNT) * Math.PI * 2;
}

function ringSlice(i: number) {
  const step = (Math.PI * 2) / SEG_COUNT;
  const gap = step * 0.18;
  const a0 = i * step + gap / 2;
  const a1 = (i + 1) * step - gap / 2;
  const p0 = polar(R_OUT, a0), p1 = polar(R_OUT, a1);
  const p2 = polar(R_IN, a1), p3 = polar(R_IN, a0);
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${R_OUT} ${R_OUT} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} A ${R_IN} ${R_IN} 0 0 0 ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} Z`;
}

function chordPath(i: number, j: number) {
  const a = segAngle(i), b = segAngle(j);
  const p1 = polar(R_ATTACH, a), p2 = polar(R_ATTACH, b);
  const q1 = polar(R_ATTACH * 0.26, a), q2 = polar(R_ATTACH * 0.26, b);
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} C ${q1.x.toFixed(1)} ${q1.y.toFixed(1)}, ${q2.x.toFixed(1)} ${q2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

const CHORDS: { i: number; j: number; color: string; opacity: number; width: number }[] = (() => {
  let seed = 8675309;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const out: { i: number; j: number; color: string; opacity: number; width: number }[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < SEG_COUNT; i++) {
    for (let k = 0; k < 3; k++) {
      const j = Math.floor(rnd() * SEG_COUNT);
      if (j === i) continue;
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const sector = Math.floor(i / SEG_PER_SECTOR);
      const sameSector = sector === Math.floor(j / SEG_PER_SECTOR);
      const r = rnd();
      out.push({
        i, j,
        color: ATLAS_SECTORS[sector].color,
        opacity: sameSector ? 0.26 + r * 0.34 : 0.10 + r * 0.20,
        width: sameSector ? 1 : 0.7,
      });
    }
  }
  return out;
})();

const SECTOR_TICKS = ATLAS_SECTORS.map((_, s) => {
  const a = ((s * SEG_PER_SECTOR) / SEG_COUNT) * Math.PI * 2;
  const p1 = polar(R_OUT + 1, a), p2 = polar(R_OUT + 8, a);
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
});

const SECTOR_LABELS = ATLAS_SECTORS.map((sector, idx) => {
  const a = segAngle(idx * SEG_PER_SECTOR + (SEG_PER_SECTOR - 1) / 2);
  const p = polar(R_OUT + 14, a);
  const anchor = p.x > CCX + 8 ? 'start' : p.x < CCX - 8 ? 'end' : 'middle';
  return { ...sector, x: p.x, y: p.y + 3, anchor: anchor as 'start' | 'end' | 'middle' };
});

function ChordAtlas() {
  return (
    <div className="w-full select-none">
      <svg viewBox="0 0 520 520" className="mx-auto w-full" fill="none" aria-label="Circular chord diagram of 67 industries mapped in the Clasp Atlas">
        {/* faint guide rings */}
        <circle cx={CCX} cy={CCY} r={R_OUT + 10} stroke="white" strokeOpacity="0.045" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx={CCX} cy={CCY} r={R_IN - 12} stroke="white" strokeOpacity="0.035" strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />

        {/* chords */}
        <g>
          {CHORDS.map((c, i) => (
            <path
              key={i}
              d={chordPath(c.i, c.j)}
              stroke={c.color}
              strokeOpacity={c.opacity}
              strokeWidth={c.width}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* industry ring segments */}
        <g>
          {Array.from({ length: SEG_COUNT }, (_, i) => (
            <path
              key={i}
              d={ringSlice(i)}
              fill={ATLAS_SECTORS[Math.floor(i / SEG_PER_SECTOR)].color}
              fillOpacity={i % 3 === 0 ? 0.92 : 0.7}
            />
          ))}
        </g>

        {/* sector boundary ticks */}
        <g stroke="white" strokeOpacity="0.22" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {SECTOR_TICKS.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* sector labels */}
        <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.5">
          {SECTOR_LABELS.map((s) => (
            <text key={s.name} x={s.x} y={s.y} textAnchor={s.anchor} fill={s.color} fillOpacity="0.9">
              {s.name}
            </text>
          ))}
        </g>

        {/* centre hub */}
        <circle cx={CCX} cy={CCY} r="31" fill="#050506" stroke="white" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx={CCX} cy={CCY} r="36" stroke="white" strokeOpacity="0.05" strokeWidth="1" vectorEffect="non-scaling-stroke" />
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
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" /> Now shipping · v0.6.8
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[66px]">
            AI should do the busy work.<br /><span className="text-zinc-400">You should think.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Control your desktop software, shop floor, lab, or office network from one local-first
            workspace—and run it all from your phone without ever leaking proprietary data to
            frontier labs.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#download" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-zinc-200">
              Download ClaspOS <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#industries" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white">
              Explore the Atlas <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 font-mono text-[10px] text-zinc-600">macOS · Windows · Linux · Clasp Mobile · Free to start</p>
        </div>
        <div className="relative flex justify-center"><ChordAtlas /></div>
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
    icon: CircleDot, tag: '01 / CLASP', title: 'Prompt @devices and apps directly in chat',
    body: 'Real-time subnet discovery finds hardware on your local network and software already on your machine. Tag @device or @app right inside the conversation—ClaspOS speaks each manufacturer’s native protocol and executes the work.',
    art: 'device',
  },
  {
    icon: Layers3, tag: '02 / CLUSTER', title: 'Put AI, hardware, and humans in the same prompt',
    body: 'Initiate Clasp in one click. ClaspOS collects your tools, industry rules, and neighboring domain specialists into a single team—automating the busy work behind human approval gates while writing verified files straight to disk.',
    art: 'cluster',
  },
  {
    icon: Smartphone, tag: '03 / MOBILE', title: 'Control the entire stack from your phone',
    body: 'Pair Clasp Mobile to your desktop workstation in seconds with zero cloud storage. Trigger runs remotely, check on your shop floor or cluster from anywhere, and communicate over post-quantum encrypted links.',
    art: 'mobile',
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
  if (kind === 'mobile') return (
    <svg viewBox="0 0 260 90" className="h-20 w-full" fill="none">
      <rect x="104" y="6" width="52" height="78" rx="9" {...crisp} />
      <path d="M118 14 H142" stroke="white" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx="130" cy="70" r="2.5" fill="#6ee7b7" fillOpacity="0.9" />
      <path d="M104 40 H52 M52 40 V22 M156 56 H208 V38" stroke="white" strokeOpacity="0.2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="20" y="8" width="32" height="28" rx="4" {...crisp} />
      <rect x="208" y="10" width="32" height="28" rx="4" {...crisp} />
      <path d="M24 18 H44 M24 25 H38" stroke="white" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
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
    </svg>
  );
}

function Platform() {
  return (
    <section id="platform" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="max-w-3xl">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">The platform</div>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          One mind across your software,<br />hardware, and phone.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          In Asimov’s Foundation, the clasp was the state of two or more robots sharing one mind.
          ClaspOS brings that to your workstation—gathering your existing software, local Wi-Fi
          hardware, and AI models into one place so you never waste time copy-pasting or letting
          AI dictate how you work.
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
  { n: '01', title: 'Auto-discover your local network', body: 'ClaspOS scans your workstation and local Wi-Fi to map installed applications, IPs, and connected hardware automatically—no manual setup.', icon: Radar },
  { n: '02', title: 'Keep your data internal (BYOC)', body: 'Use local open-weight models or Bring Your Own Cloud (Mistral, Azure OpenAI, NVIDIA, Gemini, and more). Use any model you want without a third party “borrowing” your proprietary data.', icon: ShieldCheck },
  { n: '03', title: 'Initiate Clasp and dispatch', body: 'Describe the outcome on desktop or mobile. Your agents coordinate across tools, audit the output, and save real files directly to your project folders.', icon: Sparkles },
];

function How() {
  return (
    <section id="how" className="relative border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">How it works</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">One button.<br />No busy work.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">Three steps from local scan to finished deliverables—with your IP kept strictly internal.</p>
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
  { icon: Cog, title: 'Manufacturing & Robotics', sub: 'Shop Floor & CNC', body: 'Run an entire shop floor from your phone on-prem. ClaspOS translates one workflow across FANUC, ABB, KUKA, Haas, and 3D printers without leaking part files.' },
  { icon: PenTool, title: 'Engineering & Design', sub: 'CAD, BIM & Creative Suites', body: 'Connect Fusion 360, Revit, and Adobe InDesign, Illustrator, and Photoshop directly to your local agents for production-grade deliverables.' },
  { icon: HeartPulse, title: 'Healthcare & Biotech', sub: 'Labs & Instruments', body: 'Bridge liquid handlers, sequencers, and plate readers with electronic lab notebooks in validated, air-gapped environments.' },
  { icon: Scale, title: 'Legal & Compliance', sub: 'Vaults & Audits', body: 'Run contract review, eDiscovery, and SOC 1/2, DFARS, NIST, and ANSI evidence workflows without sensitive client files leaving your machine.' },
  { icon: Database, title: 'Software & Data', sub: 'Repos, GPUs & Pipelines', body: 'Orchestrate local IDEs, containers, GPU nodes, and data pipelines with diff-level approval gates and zero cloud lock-in.' },
  { icon: Plane, title: 'Aviation, Energy & Field Ops', sub: 'Remote & Off-Grid', body: 'Coordinate avionics benches, grid telemetry, and field inspections—even over encrypted SMS when cellular data drops.' },
];

function UseCases() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Use cases</div>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Built for your house, lab,<br />office, or shop floor.</h2>
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
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">The Industry Atlas</div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">67 industries,<br />mapped in one Atlas.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Never retrain a team from scratch on new software or hardware. Every industry stack ships
              with preloaded domain intelligence, protocols, and tool hooks out of the box.{' '}
              <a href={ATLAS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-zinc-200 underline decoration-zinc-600 underline-offset-2 transition-colors hover:text-white">
                Browse the full 67-industry Atlas <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </p>
          </div>
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
        <p className="max-w-4xl font-mono text-[10px] leading-relaxed text-zinc-600">…plus 22 more domains including Banking & Credit Risk, Consulting & Strategy, Higher Education & Research, Journalism & Publishing, Legal Tech & eDiscovery, Telecommunications, and Urban Planning.</p>
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
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Keep your IP internal.<br />Start in minutes.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">Free to download and run locally. Your keys, models, and files stay on your hardware.</p>
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
          <span className="text-zinc-600">— iOS &amp; Android companion</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-zinc-600">
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-zinc-500" /> Free to start</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-zinc-500" /> No cloud lock-in</span>
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
          <a href="#industries" className="hover:text-zinc-300">Industry Atlas</a>
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
