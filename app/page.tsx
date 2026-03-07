"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// EDITABLE DATA — update numbers here when ready to "bajar a tierra"
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: "$8.5B",
    label: "China Electronic Music Market",
    sub: "2025 market size — projected to reach $19.1B by 2033 (10.6% CAGR)",
  },
];

const MARKET_GROWTH = [
  { year: "2021", value: 5.2, projected: false },
  { year: "2022", value: 5.7, projected: false },
  { year: "2023", value: 6.3, projected: false },
  { year: "2024", value: 7.0, projected: false },
  { year: "2025", value: 8.5, projected: false },
  { year: "2026", value: 9.4, projected: true },
  { year: "2027", value: 10.4, projected: true },
];

const REVENUE_PHASES = [
  {
    phase: "01",
    title: "Recovery Phase",
    ins: 60,
    artist: 40,
    desc: "INS recoups initial investment from China territory revenues",
  },
  {
    phase: "02",
    title: "Profit Phase (3 yr)",
    ins: 30,
    artist: 70,
    desc: "3 years post-recovery: artist takes majority, INS retains 30%",
  },
  {
    phase: "03",
    title: "Long-term (up to 10 yr)",
    ins: 10,
    artist: 90,
    desc: "INS retains 10% royalty on China territory revenues up to year 10",
  },
];

// ── FINANCIAL MODEL ──────────────────────────────────────────────────────────
// 3-year projection per pillar. Shows = trueque (no cash outlay for production)
const FINANCIAL_YEARS = ["Year 1", "Year 2", "Year 3"];

// Prophecy: marketing + creative director (€1K/mo) + marketing director (€1K/mo) = €24K/yr directors
const PROPHECY_MODEL = {
  label: "Prophecy",
  share: 30,
  investment: [39, 59, 104],   // K EUR — marketing (15/35/80) + directors (24/24/24)
  revenue:    [25, 84, 275],   // K EUR — China revenue (streams, sync, shows, merch)
  insReturn:  [7.5, 25.2, 82.5], // K EUR — INS 30%
};

// AIRE: 3 shows/yr × $500×2 (DJ+VJ) = $3K ≈ €2.7K + content + directors (€24K/yr)
const AIRE_MODEL = {
  label: "AIRE Live",
  share: 35,
  investment: [30, 32, 35],    // K EUR — shows (3/5/8K) + content (3/3/3K) + directors (24/24/24K)
  revenue:    [12, 48, 150],   // K EUR — show fees ($4K+ per show), content licensing
  insReturn:  [4.2, 16.8, 52.5], // K EUR — INS 35%
};

// Local Artists: ghost production + development
const LOCALS_MODEL = {
  label: "Local Artists",
  share: 20,
  investment: [5, 15, 40],
  revenue:    [8, 35, 120],
  insReturn:  [1.6, 7, 24],
};

const COMBINED = {
  investment: [74, 106, 179],    // sum of above
  revenue:    [45, 167, 545],
  insReturn:  [13.3, 49, 159],
  cumInvest:  [74, 180, 359],    // cumulative
  cumReturn:  [13.3, 62.3, 221.3],
};

const STREAM_REACH = [
  { platform: "Spotify", label: "300K+ monthly listeners" },
  { platform: "YouTube", label: "500K+ views (Tiësto collab)" },
  { platform: "Beatport", label: "Active catalog" },
  { platform: "DJ Support", label: "Tiësto · Guetta · MORTEN · ARTBAT" },
];

const PHASES = [
  {
    num: "01",
    title: "Initial Investment",
    body: "INS co-funds marketing, live logistics, creative direction and content for the Chinese market. Capital flows in, risk is shared from day one.",
  },
  {
    num: "02",
    title: "Artist Development",
    body: "Exclusive Asia territory activation: shows, masterclasses, social media, brand-building, and strategic label collaborations.",
  },
  {
    num: "03",
    title: "Long-term Revenue",
    body: "Structured 3-phase revenue share on China territory: 60/40 until recovery, 30/70 for 3 years, then 10% INS royalty up to year 10.",
  },
];

const REVENUE_SOURCES = [
  { source: "Live Shows", desc: "Show fees from INS venues and partner clubs across Asia" },
  { source: "Streaming", desc: "China-territory streaming revenue (QQ Music, NetEase, Douyin)" },
  { source: "Sync & Licensing", desc: "Brand partnerships, TV, gaming, and advertising placements" },
  { source: "Merchandise", desc: "Artist merch sold through INS retail and online channels" },
  { source: "Ghost Production", desc: "Production fees from INS-affiliated local artists" },
  { source: "Content Licensing", desc: "Masterclass content, DJ sets, and media library licensing" },
];

const TIMELINE = [
  {
    date: "April 2026",
    title: "Shanghai Activation",
    items: [
      "Illuzion Phuket — Apr 18",
      "INS Shanghai — Apr 21–24",
      "Artist masterclass + scouting",
      "Park Coffee Club (300 cap)",
    ],
  },
  {
    date: "Q3 2026",
    title: "Asia Expansion",
    items: [
      "Seoul · Tokyo · Hanoi · HCMC",
      "Vietnam market entry",
      "DJ Max campaign launch",
      "Label partnerships",
    ],
  },
  {
    date: "Q4 2026",
    title: "Full Rollout",
    items: [
      "Ghost production revenue",
      "44 Label integration",
      "Revenue phase activation",
      "Second wave of AIRE shows",
    ],
  },
];

const ARTISTS = [
  {
    name: "PROPHECY",
    genre: "Melodic Techno",
    origin: "Almada, Portugal",
    support: ["David Guetta", "MORTEN", "ARTBAT", "Armin van Buuren", "Fideles", "Chris Avantgarde"],
    highlights: [
      "Insomniac · Spinnin\u2019 / Warner · Future Rave",
      "Shanghai confirmed Apr 21–24 · Phuket Apr 18",
      "Available to ghost-produce for INS artists",
    ],
  },
];

const A2G_STATS = [
  { n: "3", l: "Artists Managed" },
  { n: "8", l: "Active Businesses" },
  { n: "UAE", l: "Dubai HQ, Global Ops" },
  { n: "6+", l: "Major Label Deals" },
];

const ROSTER = [
  { artist: "Roger Sanchez", note: "House legend · Grammy-winning · 25+ years touring" },
  { artist: "Prophecy", note: "Signed: Insomniac · Spinnin\u2019/Warner · Future Rave" },
  { artist: "BABEL Music", note: "Melodic electronic · Tomorrowland-aligned" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="bg-[#050a10] text-white min-h-screen overflow-x-hidden relative z-10">
      {/* ── NAV ── */}
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-gold/[0.12]">
        <span className="font-display text-xl font-light tracking-[0.15em]">
          A2G <span className="text-gold/60 mx-1">×</span> INS
        </span>
        <span className="font-mono text-[9px] tracking-[0.35em] text-gold/50 uppercase hidden sm:block">
          Private Proposal · 2026
        </span>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-8 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent shadow-[0_0_15px_rgba(0,207,255,0.1)]" />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div>
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-10 opacity-80">
              Strategic Partnership Proposal
            </p>
            <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-[1.05] mb-8 tracking-tight">
              Co-Building<br />
              the Future of<br />
              <em className="italic gold-shimmer">Music in Asia</em>
            </h1>
            <p className="font-body text-sm text-white/45 leading-relaxed mb-12 max-w-md">
              A2G Company and INS propose a first-of-its-kind co-development model — transforming
              Western artist booking into long-term shared ownership in the Chinese market.
            </p>
            <a
              href="#opportunity"
              className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] text-gold border border-gold/30 px-7 py-4 hover:bg-gold/[0.08] hover:shadow-[0_0_20px_rgba(0,207,255,0.15)] transition-all duration-300 uppercase"
            >
              Explore the Proposal
              <span className="text-base leading-none">↓</span>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <ConcentricRings />
          </div>
        </div>
      </section>

      {/* ── THE OPPORTUNITY ── */}
      <section id="opportunity" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="hairline mb-16" />
          <div className="reveal flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
                The Opportunity
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light">
                Why China. Why now.
              </h2>
            </div>
          </div>

          {/* Market stat */}
          <div className="reveal border border-gold/[0.08] bg-[#050a10] p-10 hover:bg-[#0a1018] transition-colors">
            <p className="font-display text-5xl md:text-6xl font-light text-gold mb-5 leading-none">
              {STATS[0].value}
            </p>
            <p className="font-body text-sm font-medium text-white/80 mb-3">{STATS[0].label}</p>
            <p className="font-body text-xs text-white/35 leading-relaxed">{STATS[0].sub}</p>
          </div>

          {/* Market Growth Chart */}
          <MarketGrowthChart />
        </div>
      </section>

      {/* ── ARTISTS ── */}
      <section id="artists" className="py-32 px-8 md:px-16 lg:px-24 bg-[#040810]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              The Artists
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Western talent,<br />built for Asia.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prophecy */}
            <div className="reveal glow-card border border-white/[0.08] p-10 hover:border-gold/25 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-6 opacity-70">
                  Melodic Techno
                </p>
                <h3 className="font-display text-[3.5rem] font-light leading-none mb-2">PROPHECY</h3>
                <p className="font-body text-xs text-white/30 mb-10">Almada, Portugal</p>
                <div className="mb-10">
                  <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase mb-4">
                    Supported By
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ARTISTS[0].support.map((n) => (
                      <span
                        key={n}
                        className="font-mono text-[9px] border border-white/[0.12] px-3 py-1.5 text-white/45 hover:border-gold/30 hover:text-gold/70 transition-colors"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2.5">
                  {ARTISTS[0].highlights.map((h) => (
                    <p key={h} className="font-body text-xs text-white/35 flex items-start gap-2">
                      <span className="text-gold/40 shrink-0">·</span>
                      {h}
                    </p>
                  ))}
                </div>
              </div>
              <WaveformDecor />
            </div>

            {/* TBD */}
            <div className="reveal glow-card border border-dashed border-white/[0.12] p-10 flex flex-col items-center justify-center text-center min-h-72 hover:border-gold/20 transition-colors group">
              <p className="font-mono text-[9px] tracking-[0.45em] text-white/25 uppercase mb-8">
                To Be Discovered
              </p>
              <div className="w-14 h-14 border border-white/[0.12] flex items-center justify-center mb-8 group-hover:border-gold/25 transition-colors">
                <span className="text-2xl text-white/15 group-hover:text-gold/30 transition-colors">+</span>
              </div>
              <h3 className="font-display text-3xl font-light text-white/35 mb-4">
                Next A2G Artist
              </h3>
              <p className="font-body text-xs text-white/20 max-w-xs leading-relaxed">
                Identified through our joint Shanghai masterclass in April 2026. INS and A2G scout
                emerging Chinese-market talent together — co-ownership from day one.
              </p>
              <p className="font-mono text-[9px] text-gold/30 mt-8 tracking-[0.4em] uppercase">
                Masterclass · April 2026 · Shanghai
              </p>
            </div>
          </div>

          {/* Streaming reach — compact */}
          <div className="mt-6 border border-gold/[0.08] bg-[#060c14] p-8 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase mb-5">
              Prophecy — Estimated China Reach Potential
            </p>
            <div className="flex flex-wrap gap-6">
              {STREAM_REACH.map((d) => (
                <div key={d.platform} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">{d.platform}</span>
                  <span className="font-mono text-[10px] text-gold/70">{d.label}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[8px] text-white/15 mt-4 tracking-widest">
              Current global reach · Foundation for China market penetration
            </p>
          </div>
        </div>
      </section>

      {/* ── DEAL STRUCTURE ── */}
      <section id="deal" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              How It Works
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              The Structure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            <div className="absolute top-7 left-0 right-0 h-px hidden md:block overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
                style={{ transformOrigin: "left", animation: "line-in 1.2s ease forwards 0.5s", transform: "scaleX(0)" }}
              />
            </div>

            {PHASES.map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} p-10 border border-transparent hover:border-gold/10 transition-colors group`}
              >
                <div className="relative mb-10">
                  <div className="w-14 h-14 border border-gold/20 flex items-center justify-center relative z-10 bg-[#050a10] group-hover:border-gold/40 transition-colors">
                    <span className="font-mono text-xs text-gold/60">{p.num}</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-5">{p.title}</h3>
                <p className="font-body text-sm text-white/40 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Revenue split donuts */}
          <RevenueSplitChart />

          {/* Revenue sources — China territory */}
          <div className="mt-6 border border-gold/[0.08] bg-[#060c14] p-10 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase mb-8">
              China Territory — Revenue Sources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVENUE_SOURCES.map((r) => (
                <div key={r.source} className="flex items-start gap-3">
                  <span className="text-gold/40 shrink-0 mt-0.5">·</span>
                  <div>
                    <p className="font-body text-sm font-medium text-white/70 mb-1">{r.source}</p>
                    <p className="font-body text-xs text-white/30 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCIAL PROJECTIONS ── */}
      <section id="numbers" className="py-32 px-8 md:px-16 lg:px-24 bg-[#040810]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              The Numbers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              3-Year Financial<br />Projection
            </h2>
            <p className="font-body text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
              Conservative model based on standard industry percentages.
              Shows are structured as trueque (show fee = production cost), so production investment is zero.
            </p>
          </div>

          {/* Combined Investment vs Return */}
          <InvestmentReturnChart />

          {/* Per-pillar breakdown */}
          <PillarBreakdown />

          {/* Break-even + Upside */}
          <BreakEvenCard />
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-32 px-8 md:px-16 lg:px-24 bg-[#050a10]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              Timeline
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">2026 Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} border-l border-gold/15 pl-8 pr-6 pb-8 pt-2`}
              >
                <div className="w-2 h-2 rounded-full bg-gold/30 -ml-[calc(2rem+1px)] mb-6 mt-1 border border-gold/50 shadow-[0_0_8px_rgba(0,207,255,0.3)]" />
                <p className="font-mono text-[9px] tracking-[0.35em] text-gold/60 uppercase mb-4">
                  {t.date}
                </p>
                <h3 className="font-display text-xl font-light mb-5">{t.title}</h3>
                <ul className="space-y-2.5">
                  {t.items.map((item) => (
                    <li key={item} className="font-body text-xs text-white/35 flex items-start gap-2 leading-relaxed">
                      <span className="text-gold/30 shrink-0 mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT A2G ── */}
      <section id="about" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              About A2G
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">The Partner</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="reveal space-y-10">
              <p className="font-body text-base text-white/50 leading-relaxed">
                A2G Company is a Dubai-based music and technology holding. We develop artists, platforms,
                and intellectual property — not as a traditional booking agency, but as a co-building
                partner that takes long-term equity positions.
              </p>
              <div className="grid grid-cols-2 gap-px bg-gold/[0.08]">
                {A2G_STATS.map(({ n, l }) => (
                  <div key={l} className="bg-[#050a10] p-7 hover:bg-[#0a1018] transition-colors">
                    <p className="font-display text-4xl font-light text-gold mb-2">{n}</p>
                    <p className="font-body text-xs text-white/35">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal space-y-8">
              <div>
                <p className="font-mono text-[9px] tracking-[0.4em] text-white/25 uppercase mb-6">
                  Artist Roster
                </p>
                <div className="space-y-0">
                  {ROSTER.map(({ artist, note }) => (
                    <div
                      key={artist}
                      className="border-b border-white/[0.05] py-5 flex items-start justify-between gap-6 hover:border-gold/15 transition-colors"
                    >
                      <p className="font-display text-xl font-light">{artist}</p>
                      <p className="font-body text-xs text-white/30 text-right leading-relaxed max-w-44">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <p className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase mb-4">
                  Label Track Record
                </p>
                <p className="font-body text-xs text-white/30 leading-relaxed">
                  Insomniac Records · Spinnin&#39; / Warner Music · Future Rave ·
                  HILOMATIK (HI-LO) · CR2 Records · Persona Records · Guesstimate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-40 px-8 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/[0.06] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent shadow-[0_0_20px_rgba(0,207,255,0.1)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10 reveal">
          <p className="font-mono text-[9px] tracking-[0.5em] text-gold uppercase mb-10 opacity-70">
            Ready to Build?
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-none mb-10">
            Let&apos;s Build<br />
            <em className="italic gold-shimmer">Together</em>
          </h2>
          <p className="font-body text-sm text-white/40 mb-14 max-w-sm mx-auto leading-relaxed">
            We propose a long-term partnership, not a one-night booking.
            If the vision aligns, let&#39;s move fast.
          </p>
          <a
            href="mailto:aitzolarev@gmail.com"
            className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.35em] text-gold border border-gold/35 px-8 py-5 hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(0,207,255,0.3)] transition-all duration-300 uppercase group"
          >
            aitzolarev@gmail.com
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.05] py-8 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="font-display text-sm font-light text-white/20">A2G × INS</p>
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/15 uppercase">
            Private &amp; Confidential · 2026
          </p>
        </div>
      </footer>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHARTS
// ─────────────────────────────────────────────────────────────────────────────

function useChartVisible(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Chart 1: Market Growth (vertical bars) ────────────────────────────────────
function MarketGrowthChart() {
  const { ref, visible } = useChartVisible(0.2);
  const max = Math.max(...MARKET_GROWTH.map((d) => d.value));
  const BAR_HEIGHT = 180;

  return (
    <div ref={ref} className="mt-14 border border-gold/[0.08] bg-[#060c14] p-10 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
      <div className="flex items-center justify-between mb-8">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">
          China Electronic Music Market — USD Billions
        </p>
      </div>

      <div className="flex items-end gap-3 md:gap-5" style={{ height: `${BAR_HEIGHT + 40}px` }}>
        {MARKET_GROWTH.map((d, i) => {
          const h = (d.value / max) * BAR_HEIGHT;
          return (
            <div key={d.year} className="flex flex-col items-center gap-2 flex-1">
              {/* Value label */}
              <p
                className="font-mono text-[9px] text-gold/60 transition-opacity duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                ${d.value}B
              </p>
              {/* Bar */}
              <div className="w-full relative flex items-end" style={{ height: `${BAR_HEIGHT}px` }}>
                <div
                  className="w-full rounded-sm transition-all duration-700 ease-out"
                  style={{
                    height: visible ? `${h}px` : "0px",
                    transitionDelay: `${i * 0.08}s`,
                    background: d.projected
                      ? "linear-gradient(to top, rgba(0,207,255,0.25), rgba(0,207,255,0.08))"
                      : "linear-gradient(to top, #00cfff, rgba(0,207,255,0.6))",
                    border: d.projected ? "1px dashed rgba(0,207,255,0.3)" : "none",
                  }}
                />
              </div>
              {/* Year */}
              <p className="font-mono text-[9px] text-white/30 tracking-wider">
                {d.year}
                {d.projected && (
                  <span className="text-gold/30 ml-1">*</span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <p className="font-mono text-[9px] text-white/20 mt-6 tracking-widest">
        * Projected · Source: Market Research Reports, 2025
      </p>
    </div>
  );
}

// ── Chart 2: Revenue Split Donuts ─────────────────────────────────────────────
function RevenueSplitChart() {
  const { ref, visible } = useChartVisible(0.3);

  return (
    <div ref={ref} className="mt-14 border border-gold/[0.08] bg-[#060c14] p-10 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
      <div className="flex items-center justify-between mb-10">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">
          Revenue Split by Phase — Artist Share
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {REVENUE_PHASES.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              transitionDelay: `${i * 0.15}s`,
            }}
          >
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/50 uppercase mb-6">
              Phase {p.phase}
            </p>

            {/* Donut SVG */}
            <DonutChart percent={p.artist} visible={visible} delay={i * 0.2} />

            <h4 className="font-display text-xl font-light mt-6 mb-2">{p.title}</h4>
            <p className="font-body text-xs text-white/35 leading-relaxed max-w-[200px]">{p.desc}</p>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold/60" />
                <span className="font-mono text-[9px] text-white/40">Artist {p.artist}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10 border border-white/15" />
                <span className="font-mono text-[9px] text-white/40">INS {p.ins}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({
  percent,
  visible,
  delay,
}: {
  percent: number;
  visible: boolean;
  delay: number;
}) {
  const r = 42;
  const circ = 2 * Math.PI * r; // ≈ 263.9
  const dashoffset = visible ? circ * (1 - percent / 100) : circ;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg viewBox="0 0 100 100" width="128" height="128" className="absolute inset-0">
        {/* Track */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="7"
        />
        {/* Fill */}
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="#00cfff"
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{
            transition: `stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
          }}
        />
      </svg>
      {/* Center label */}
      <div className="relative z-10 text-center">
        <p className="font-display text-2xl font-light text-gold leading-none">{percent}%</p>
        <p className="font-mono text-[8px] text-white/30 tracking-wider mt-1">artist</p>
      </div>
    </div>
  );
}


// ── Chart 4: Investment vs Return (grouped bars) ────────────────────────────
function InvestmentReturnChart() {
  const { ref, visible } = useChartVisible(0.2);
  const maxVal = Math.max(...COMBINED.revenue, ...COMBINED.investment);
  const BAR_H = 200;

  return (
    <div ref={ref} className="border border-gold/[0.08] bg-[#060c14] p-10 mb-6 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
      <div className="flex items-center justify-between mb-10">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">
          Combined — Investment vs China Revenue (EUR K)
        </p>
      </div>

      <div className="flex items-end gap-4 md:gap-8" style={{ height: `${BAR_H + 60}px` }}>
        {FINANCIAL_YEARS.map((yr, i) => {
          const invH = (COMBINED.investment[i] / maxVal) * BAR_H;
          const revH = (COMBINED.revenue[i] / maxVal) * BAR_H;
          const retH = (COMBINED.insReturn[i] / maxVal) * BAR_H;
          return (
            <div key={yr} className="flex-1 flex flex-col items-center gap-2">
              {/* Labels */}
              <div
                className="flex items-center gap-3 font-mono text-[9px] transition-opacity duration-500"
                style={{ opacity: visible ? 1 : 0, transitionDelay: `${0.2 + i * 0.15}s` }}
              >
                <span className="text-white/30">{COMBINED.investment[i]}K</span>
                <span className="text-gold/70">{COMBINED.revenue[i]}K</span>
                <span className="text-emerald-400/70">{COMBINED.insReturn[i]}K</span>
              </div>

              {/* Bar group */}
              <div className="w-full flex items-end justify-center gap-1.5" style={{ height: `${BAR_H}px` }}>
                {/* Investment bar */}
                <div
                  className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                  style={{
                    height: visible ? `${invH}px` : "0px",
                    transitionDelay: `${i * 0.1}s`,
                    background: "linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
                  }}
                />
                {/* Revenue bar */}
                <div
                  className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                  style={{
                    height: visible ? `${revH}px` : "0px",
                    transitionDelay: `${0.05 + i * 0.1}s`,
                    background: "linear-gradient(to top, #00cfff, rgba(0,207,255,0.4))",
                  }}
                />
                {/* INS Return bar */}
                <div
                  className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                  style={{
                    height: visible ? `${retH}px` : "0px",
                    transitionDelay: `${0.1 + i * 0.1}s`,
                    background: "linear-gradient(to top, rgba(52,211,153,0.7), rgba(52,211,153,0.25))",
                  }}
                />
              </div>

              {/* Year label */}
              <p className="font-mono text-[9px] text-white/30 tracking-wider mt-1">{yr}</p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-8 mt-8 border-t border-white/[0.05] pt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 rounded-sm bg-white/10" />
          <span className="font-mono text-[9px] text-white/35">Investment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 rounded-sm bg-gold/60" />
          <span className="font-mono text-[9px] text-white/35">China Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 rounded-sm bg-emerald-400/50" />
          <span className="font-mono text-[9px] text-white/35">INS Return</span>
        </div>
      </div>
    </div>
  );
}

// ── Chart 5: Pillar Breakdown ───────────────────────────────────────────────
function PillarBreakdown() {
  const { ref, visible } = useChartVisible(0.2);
  const pillars = [PROPHECY_MODEL, AIRE_MODEL, LOCALS_MODEL];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/[0.08] mb-6">
      {pillars.map((p, pi) => (
        <div
          key={p.label}
          className="bg-[#060c14] p-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: `${pi * 0.12}s`,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="font-display text-xl font-light">{p.label}</p>
            <span className="font-mono text-[9px] text-gold/50 border border-gold/20 px-2 py-1">
              {p.share}%
            </span>
          </div>

          {/* Mini bars per year */}
          <div className="space-y-4">
            {FINANCIAL_YEARS.map((yr, yi) => {
              const maxRev = Math.max(...p.revenue);
              const w = (p.revenue[yi] / maxRev) * 100;
              return (
                <div key={yr}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] text-white/30">{yr}</span>
                    <span className="font-mono text-[9px] text-gold/60">
                      {p.insReturn[yi]}K return
                    </span>
                  </div>
                  <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${w}%` : "0%",
                        background: "linear-gradient(to right, #00cfff, rgba(0,207,255,0.4))",
                        transition: `width 1s cubic-bezier(0.25,1,0.5,1) ${pi * 0.1 + yi * 0.15}s`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[8px] text-white/20">
                      Invest: {p.investment[yi]}K
                    </span>
                    <span className="font-mono text-[8px] text-white/20">
                      Rev: {p.revenue[yi]}K
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Break-even + Upside Card ────────────────────────────────────────────────
function BreakEvenCard() {
  const { ref, visible } = useChartVisible(0.2);

  // Cumulative data for the progress line
  const cumInvest = COMBINED.cumInvest;
  const cumReturn = COMBINED.cumReturn;

  return (
    <div ref={ref} className="border border-gold/[0.08] bg-[#060c14] p-10 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Break-even timeline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase mb-6">
            Cumulative — Break-even Path
          </p>

          {/* Simple visual timeline */}
          <div className="space-y-5">
            {FINANCIAL_YEARS.map((yr, i) => {
              const ratio = cumReturn[i] / cumInvest[i];
              const pct = Math.min(ratio * 100, 100);
              const breakEven = ratio >= 1;
              return (
                <div key={yr}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] text-white/40">{yr}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-white/25">
                        {cumInvest[i]}K invested
                      </span>
                      <span className={`font-mono text-[9px] ${breakEven ? "text-emerald-400" : "text-gold/60"}`}>
                        {cumReturn[i]}K returned
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${pct}%` : "0%",
                        background: breakEven
                          ? "linear-gradient(to right, rgba(52,211,153,0.6), rgba(52,211,153,0.9))"
                          : "linear-gradient(to right, rgba(0,207,255,0.3), rgba(0,207,255,0.7))",
                        transition: `width 1.2s cubic-bezier(0.25,1,0.5,1) ${i * 0.2}s`,
                      }}
                    />
                    {/* 100% marker */}
                    <div className="absolute top-0 bottom-0 right-0 w-px bg-white/10" />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className={`font-mono text-[8px] ${breakEven ? "text-emerald-400/70" : "text-white/20"}`}>
                      {Math.round(pct)}% recovered
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Upside scenario */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            transitionDelay: "0.2s",
          }}
        >
          <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase mb-6">
            Upside Scenario
          </p>

          <div className="border border-gold/15 p-8 bg-gold/[0.02] mb-6 shadow-[0_0_25px_rgba(0,207,255,0.06)]">
            <p className="font-display text-3xl font-light text-gold mb-2">285K+</p>
            <p className="font-body text-xs text-white/40 leading-relaxed">
              Potential Year 3 INS return if Prophecy reaches Top 100 DJ Mag.
              Based on industry benchmarks for comparable artists at that ranking.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-gold/40 mt-0.5 shrink-0">+</span>
              <p className="font-body text-xs text-white/35 leading-relaxed">
                Ghost-production revenue from INS local artists creates additional recurring income stream
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold/40 mt-0.5 shrink-0">+</span>
              <p className="font-body text-xs text-white/35 leading-relaxed">
                AIRE live show development unlocks premium venue bookings at 2-3x standard fees
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gold/40 mt-0.5 shrink-0">+</span>
              <p className="font-body text-xs text-white/35 leading-relaxed">
                Local artist incubation builds a self-sustaining pipeline with minimal incremental cost
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/20 uppercase mb-2">
              Total 3-Year Summary
            </p>
            <div className="flex items-end gap-8">
              <div>
                <p className="font-display text-2xl font-light text-white/30">359K</p>
                <p className="font-mono text-[8px] text-white/20">total invested</p>
              </div>
              <div className="text-gold/30 text-xl mb-1">&rarr;</div>
              <div>
                <p className="font-display text-2xl font-light text-gold">221K</p>
                <p className="font-mono text-[8px] text-gold/40">base return</p>
              </div>
              <div className="text-gold/30 text-xl mb-1">&rarr;</div>
              <div>
                <p className="font-display text-2xl font-light text-emerald-400">500K+</p>
                <p className="font-mono text-[8px] text-emerald-400/50">upside return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DECORATIVE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ConcentricRings() {
  const rings = [
    { size: 90, opacity: 0.55, dur: 3.5, delay: 0 },
    { size: 72, opacity: 0.45, dur: 4.0, delay: 0.5 },
    { size: 54, opacity: 0.35, dur: 4.5, delay: 1.0 },
    { size: 38, opacity: 0.50, dur: 3.8, delay: 0.3 },
    { size: 22, opacity: 0.60, dur: 4.2, delay: 0.8 },
    { size: 8,  opacity: 0.70, dur: 3.0, delay: 0.2 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: "380px", height: "380px" }}>
      <div className="absolute inset-0 rounded-full bg-gradient-radial from-gold/[0.08] to-transparent" />
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-gold"
          style={{
            width: `${r.size}%`,
            height: `${r.size}%`,
            opacity: r.opacity,
            ["--ring-opacity-start" as string]: r.opacity,
            ["--ring-opacity-end" as string]: r.opacity * 0.3,
            animation: `ring-pulse ${r.dur}s ease-in-out ${r.delay}s infinite`,
          }}
        />
      ))}
      <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(0,207,255,0.5)]" style={{ animation: "dot-breathe 3s ease-in-out infinite" }} />
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="font-mono text-[9px] tracking-[0.4em] text-gold/30 uppercase">A2G × INS</p>
      </div>
    </div>
  );
}

function WaveformDecor() {
  const heights = [18, 28, 42, 55, 38, 62, 48, 30, 68, 52, 35, 70, 45, 58, 38, 72, 50, 40, 62, 30, 48, 55, 35, 22];
  return (
    <div className="absolute bottom-6 right-6 flex items-end gap-[2px] opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
      {heights.map((h, i) => (
        <div key={i} className="w-[2px] bg-gold rounded-sm" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}
