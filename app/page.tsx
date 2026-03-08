"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_DATA, loadData, resetData, saveData } from "./lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// EDITABLE DATA — update numbers here when ready to "bajar a tierra"
// ─────────────────────────────────────────────────────────────────────────────

// STATS, ARTISTS, PHASES, REVENUE_SOURCES, ROADMAP are now in proposalData (loaded from data.ts)

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
const FINANCIAL_YEARS = ["Year 1", "Year 2", "Year 3"];
const PILLAR_COLORS = ["#00cfff", "#7dd3fc", "#38bdf8"] as const;

type ComputedTotals = {
  revenue: number[];
  investment: number[];
  insReturn: number[];
  cumInvest: number[];
  cumReturn: number[];
};

// ── Inline edit helpers ───────────────────────────────────────────────────────
type UpdateFn = (path: (string | number)[], val: number | string) => void;

function EditNum({ value, path, onUpdate, editMode, className = "" }: {
  value: number; path: (string | number)[];
  onUpdate: UpdateFn; editMode: boolean; className?: string;
}) {
  if (!editMode) return <>{value}</>;
  return (
    <input
      type="number"
      defaultValue={value}
      onBlur={(e) => onUpdate(path, Number(e.target.value))}
      className={`bg-transparent border-b border-gold/40 outline-none text-center ${className}`}
      style={{ width: `${String(value).length + 1}ch`, fontFamily: "inherit", fontSize: "inherit", color: "inherit" }}
    />
  );
}

function EditTxt({ value, path, onUpdate, editMode, className = "" }: {
  value: string; path: (string | number)[];
  onUpdate: UpdateFn; editMode: boolean; className?: string;
}) {
  if (!editMode) return <>{value}</>;
  return (
    <input
      type="text"
      defaultValue={value}
      onBlur={(e) => onUpdate(path, e.target.value)}
      className={`bg-transparent border-b border-gold/30 outline-none ${className}`}
      style={{ width: `${Math.max(value.length, 8)}ch`, fontFamily: "inherit", fontSize: "inherit", color: "inherit" }}
    />
  );
}

function EditArea({ value, path, onUpdate, editMode, className = "" }: {
  value: string; path: (string | number)[];
  onUpdate: UpdateFn; editMode: boolean; className?: string;
}) {
  if (!editMode) return <>{value}</>;
  return (
    <textarea
      defaultValue={value}
      onBlur={(e) => onUpdate(path, e.target.value)}
      rows={Math.max(2, Math.ceil(value.length / 55))}
      className={`bg-transparent border border-gold/20 outline-none resize-none w-full p-1 rounded-sm ${className}`}
      style={{ fontFamily: "inherit", fontSize: "inherit", color: "inherit", lineHeight: "inherit" }}
    />
  );
}

// All content consts moved to proposalData (data.ts)

// A2G_STATS, ROSTER moved to proposalData.about

// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeArtist, setActiveArtist] = useState(0);
  const [proposalData, setProposalData] = useState(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setProposalData(loadData());
    setCanEdit(new URLSearchParams(window.location.search).get("edit") === "1");
  }, []);

  const updateField: UpdateFn = (path, val) => {
    setProposalData(prev => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next = JSON.parse(JSON.stringify(prev)) as typeof DEFAULT_DATA;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cur: any = next;
      for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
      cur[path[path.length - 1]] = val;
      saveData(next);
      return next;
    });
  };

  const computed = useMemo(() => {
    const revenue = [0, 1, 2].map(yi =>
      proposalData.revenueDetail.reduce((s, r) => s + r.years[yi].lines.reduce((ls, l) => ls + l.v, 0), 0)
    );
    const investment = [0, 1, 2].map(yi =>
      proposalData.investmentDetail.reduce((s, p) => s + p.years[yi].lines.reduce((ls, l) => ls + l.v, 0), 0)
    );
    const insReturn = [0, 1, 2].map(yi =>
      proposalData.revenueDetail.reduce((s, r) => {
        const tot = r.years[yi].lines.reduce((ls, l) => ls + l.v, 0);
        return s + Math.round(tot * r.insShare[yi] / 100);
      }, 0)
    );
    const cumInvest = investment.map((_, i) => investment.slice(0, i + 1).reduce((s, v) => s + v, 0));
    const cumReturn = insReturn.map((_, i) => insReturn.slice(0, i + 1).reduce((s, v) => s + v, 0));
    return { revenue, investment, insReturn, cumInvest, cumReturn };
  }, [proposalData.revenueDetail, proposalData.investmentDetail]);

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
      <nav className="nav-blur fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        {/* Logos */}
        <div className="flex items-center gap-5 shrink-0">
          <span className="font-display text-2xl font-light tracking-[0.25em] text-white">A2G</span>
          <div className="flex items-center gap-5">
            <div className="w-px h-5 bg-white/15" />
            <span
              className="font-display text-2xl font-light tracking-[0.25em]"
              style={{ color: "#00cfff", textShadow: "0 0 20px rgba(0,207,255,0.5)" }}
            >
              INS
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7 mx-8">
          {[
            { label: "Opportunity", href: "#opportunity" },
            { label: "The Model", href: "#precedent" },
            { label: "Artists", href: "#artists" },
            { label: "Deal", href: "#deal" },
            { label: "Value", href: "#value" },
            { label: "Numbers", href: "#numbers" },
            { label: "Risks", href: "#risks" },
            { label: "Roadmap", href: "#roadmap" },
            { label: "About", href: "#about" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[9px] tracking-[0.3em] text-white/25 hover:text-white/60 uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <span className="font-mono text-[9px] tracking-[0.35em] text-white/20 uppercase hidden lg:block shrink-0">
          Private Proposal · 2026
        </span>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-8 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent shadow-[0_0_15px_rgba(0,207,255,0.1)]" />

        <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: headline */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-10 opacity-80">
              Strategic Partnership Proposal
            </p>
            <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-light leading-[1.0] mb-8 tracking-tight">
              {editMode
                ? <EditArea value={proposalData.hero.title} path={["hero","title"]} onUpdate={updateField} editMode={editMode} className="text-white" />
                : <>{proposalData.hero.title.split(" in ")[0]} in<br /><em className="italic gold-shimmer">{proposalData.hero.title.split(" in ")[1]}</em></>
              }
            </h1>
            <p className="font-body text-sm text-white/45 leading-relaxed mb-12 max-w-xl">
              <EditArea value={proposalData.hero.subtitle} path={["hero","subtitle"]} onUpdate={updateField} editMode={editMode} />
            </p>
            <a
              href="#opportunity"
              className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] text-gold border border-gold/30 px-7 py-4 hover:bg-gold/[0.08] hover:shadow-[0_0_20px_rgba(0,207,255,0.15)] transition-all duration-300 uppercase"
            >
              Explore the Proposal
              <span className="text-base leading-none">↓</span>
            </a>
          </div>

          {/* Right: Why / What / When / How */}
          <div className="hidden lg:flex flex-col gap-0 border-l border-white/[0.06] pl-14 min-w-[280px]">
            {[
              { q: "Why",  a: proposalData.hero.whyA,  pA: ["hero","whyA"],  b: proposalData.hero.whyB,  pB: ["hero","whyB"] },
              { q: "What", a: proposalData.hero.whatA, pA: ["hero","whatA"], b: proposalData.hero.whatB, pB: ["hero","whatB"] },
              { q: "When", a: proposalData.hero.whenA, pA: ["hero","whenA"], b: proposalData.hero.whenB, pB: ["hero","whenB"] },
              { q: "How",  a: proposalData.hero.howA,  pA: ["hero","howA"],  b: proposalData.hero.howB,  pB: ["hero","howB"] },
            ].map((s, i) => (
              <div key={i} className={`py-7 ${i < 3 ? "border-b border-white/[0.06]" : ""}`}>
                <p className="font-display text-2xl font-light text-gold mb-2" style={{ textShadow: "0 0 15px rgba(0,207,255,0.3)" }}>{s.q}</p>
                <p className="font-body text-sm text-white/55 leading-relaxed"><EditTxt value={s.a} path={s.pA} onUpdate={updateField} editMode={editMode} /></p>
                <p className="font-body text-xs text-white/25 leading-relaxed mt-0.5"><EditTxt value={s.b} path={s.pB} onUpdate={updateField} editMode={editMode} /></p>
              </div>
            ))}
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
              <EditTxt value={proposalData.market.size} path={["market","size"]} onUpdate={updateField} editMode={editMode} />
            </p>
            <p className="font-body text-sm font-medium text-white/80 mb-3"><EditTxt value={proposalData.market.sizeLabel} path={["market","sizeLabel"]} onUpdate={updateField} editMode={editMode} /></p>
            <p className="font-body text-xs text-white/35 leading-relaxed"><EditArea value={proposalData.market.sizeSub} path={["market","sizeSub"]} onUpdate={updateField} editMode={editMode} /></p>
          </div>

          {/* Market Growth Chart */}
          <MarketGrowthChart />
        </div>
      </section>

      {/* ── FIVE HOLDINGS PRECEDENT ── */}
      <section id="precedent" className="py-32 px-8 md:px-16 lg:px-24 bg-[#040810]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              Proven Model
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              {proposalData.precedent.title}
            </h2>
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/30 mt-3">{proposalData.precedent.subtitle}</p>
          </div>

          <div className="reveal border border-white/[0.06] bg-[#060c14] p-10 mb-6 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-3xl">
              {proposalData.precedent.body}
            </p>
            <p className="font-body text-sm text-gold/70 leading-relaxed max-w-3xl italic">
              {proposalData.precedent.lesson}
            </p>
          </div>

          {/* FIVE vs INS comparison */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05]">
            <div className="bg-[#060c14] p-10 border border-red-500/[0.08]">
              <p className="font-mono text-[9px] tracking-[0.4em] text-red-400/50 uppercase mb-5">
                {proposalData.precedent.comparison.five.label}
              </p>
              <p className="font-display text-5xl font-light text-red-400/60 mb-4 leading-none">
                {proposalData.precedent.comparison.five.investment}
              </p>
              <p className="font-body text-sm text-white/35 leading-relaxed">
                {proposalData.precedent.comparison.five.problem}
              </p>
            </div>
            <div className="bg-[#060c14] p-10 border border-gold/[0.12]" style={{ boxShadow: "0 0 30px rgba(0,207,255,0.05)" }}>
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/60 uppercase mb-5">
                {proposalData.precedent.comparison.ins.label}
              </p>
              <p className="font-display text-5xl font-light leading-none mb-4" style={{ color: "#00cfff", textShadow: "0 0 25px rgba(0,207,255,0.4)" }}>
                {proposalData.precedent.comparison.ins.investment}
              </p>
              <p className="font-body text-sm text-white/50 leading-relaxed">
                {proposalData.precedent.comparison.ins.advantage}
              </p>
            </div>
          </div>
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

          {/* Tab bar */}
          <div className="flex items-end gap-0 mb-0 border-b border-white/[0.06]">
            {proposalData.artists.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActiveArtist(i)}
                className={`relative px-8 py-4 font-mono text-[10px] tracking-[0.4em] uppercase transition-all duration-300 ${
                  activeArtist === i
                    ? "text-gold border-t border-l border-r border-gold/25 bg-[#060c14] -mb-px"
                    : "text-white/25 hover:text-white/50 border-t border-l border-r border-transparent"
                }`}
              >
                {activeArtist === i && (
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                )}
                {a.name}
              </button>
            ))}
            <button className="relative px-6 py-4 font-mono text-[9px] tracking-[0.3em] text-white/12 hover:text-white/25 transition-colors border-t border-l border-r border-transparent italic">
              TBA · next phase
            </button>
          </div>

          {/* Active artist panel */}
          {proposalData.artists.map((a, i) => (
            <div
              key={a.id}
              className={`border border-gold/[0.08] border-t-0 bg-[#060c14] p-10 md:p-14 transition-all duration-300 ${
                activeArtist === i ? "block" : "hidden"
              }`}
              style={{ boxShadow: "0 0 40px rgba(0,207,255,0.03)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10 items-start">
                {/* Left: artist info */}
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-mono text-[9px] tracking-[0.45em] text-gold/60 uppercase">{a.genre}</p>
                    {a.ig && (
                      <a
                        href={a.ig}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[9px] text-white/20 hover:text-gold/60 transition-colors tracking-wider"
                      >
                        {a.igHandle}
                      </a>
                    )}
                  </div>
                  <h3 className="font-display text-[3.5rem] md:text-[4.5rem] font-light leading-none mb-2">
                    {a.name}
                  </h3>
                  <p className="font-body text-xs text-white/25 mb-6">{a.origin}</p>
                  <p className="font-body text-sm text-white/40 italic mb-10 max-w-lg leading-relaxed"><EditArea value={a.tagline} path={["artists",i,"tagline"]} onUpdate={updateField} editMode={editMode} /></p>

                  {a.collabs.length > 0 && (
                    <div className="mb-10">
                      <p className="font-mono text-[9px] tracking-[0.35em] text-white/20 uppercase mb-4">
                        {a.id === "aire" ? "Collaborating With" : "Co-produced With"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {a.collabs.map((n, ci) => (
                          <span key={ci} className="font-mono text-[9px] border border-gold/20 px-3 py-1.5 text-gold/60 bg-gold/[0.04]">
                            <EditTxt value={n} path={["artists",i,"collabs",ci]} onUpdate={updateField} editMode={editMode} />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {a.highlights.map((h, hi) => (
                      <p key={hi} className="font-body text-sm text-white/40 flex items-start gap-3 leading-relaxed">
                        <span className="text-gold/40 shrink-0 mt-0.5">·</span>
                        <EditArea value={h} path={["artists",i,"highlights",hi]} onUpdate={updateField} editMode={editMode} />
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right: artist image + tab nav */}
                <div className="hidden md:flex flex-col gap-4">
                  {a.image && (
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.85) contrast(1.05)" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060c14] via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                  <div className="flex flex-row items-center justify-end gap-4">
                    {proposalData.artists.map((b, j) => (
                      <button
                        key={b.id}
                        onClick={() => setActiveArtist(j)}
                        className={`font-mono text-[9px] tracking-[0.35em] uppercase transition-colors ${
                          j === i ? "text-gold/70" : "text-white/15 hover:text-white/35"
                        }`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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

            {proposalData.phases.map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} p-10 border border-transparent hover:border-gold/10 transition-colors group`}
              >
                <div className="relative mb-10">
                  <div className="w-14 h-14 border border-gold/20 flex items-center justify-center relative z-10 bg-[#050a10] group-hover:border-gold/40 transition-colors">
                    <span className="font-mono text-xs text-gold/60">{p.num}</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-5"><EditTxt value={p.title} path={["phases",i,"title"]} onUpdate={updateField} editMode={editMode} /></h3>
                <p className="font-body text-sm text-white/40 leading-relaxed"><EditArea value={p.body} path={["phases",i,"body"]} onUpdate={updateField} editMode={editMode} /></p>
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
              {proposalData.revenueSources.map((r, ri) => (
                <div key={ri} className="flex items-start gap-3">
                  <span className="text-gold/40 shrink-0 mt-0.5">·</span>
                  <div>
                    <p className="font-body text-sm font-medium text-white/70 mb-1"><EditTxt value={r.source} path={["revenueSources",ri,"source"]} onUpdate={updateField} editMode={editMode} /></p>
                    <p className="font-body text-xs text-white/30 leading-relaxed"><EditArea value={r.desc} path={["revenueSources",ri,"desc"]} onUpdate={updateField} editMode={editMode} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE BEYOND REVENUE ── */}
      <section id="value" className="py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              What INS Gets
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Value Beyond<br />Revenue
            </h2>
            <p className="font-body text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
              The cash return is only one dimension. Six layers of value INS builds from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {proposalData.valueDimensions.map((dim, i) => {
              const categoryColors: Record<string, string> = {
                Economic: "#f59e0b",
                Strategic: "#00cfff",
                Operational: "#34d399",
                Marketing: "#a78bfa",
                Scalable: "#22d3ee",
              };
              const badgeColor = categoryColors[dim.category] ?? "#f59e0b";
              return (
                <div
                  key={i}
                  className="reveal bg-[#060c14] p-8 border border-white/[0.06] hover:border-gold/15 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-mono text-[9px] tracking-[0.45em] text-white/15">{dim.num}</span>
                    <span
                      className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
                      style={{ color: badgeColor, background: `${badgeColor}18`, border: `1px solid ${badgeColor}30` }}
                    >
                      {dim.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-light mb-4 group-hover:text-gold transition-colors duration-300">
                    {dim.title}
                  </h3>
                  <p className="font-body text-xs text-white/35 leading-relaxed">{dim.desc}</p>
                </div>
              );
            })}
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
              Shows are structured as value trades (show fee = production cost), so production investment is zero.
            </p>
          </div>

          {/* Combined Investment vs Return */}
          <InvestmentReturnChart combined={computed} editMode={editMode} onUpdate={updateField} />

          {/* Revenue + Investment breakdowns */}
          <RevenueInvestmentBreakdown combined={computed} revenueDetail={proposalData.revenueDetail} investmentDetail={proposalData.investmentDetail} editMode={editMode} onUpdate={updateField} />

          {/* Break-even + Upside */}
          <BreakEvenCard combined={computed} editMode={editMode} onUpdate={updateField} />

          {/* Break-even summary table */}
          <div className="reveal mt-6 border border-gold/[0.08] bg-[#060c14] overflow-hidden shadow-[0_0_20px_rgba(0,207,255,0.04)]">
            <div className="px-8 py-5 border-b border-white/[0.05]">
              <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">Investment Recovery Summary</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="text-left px-8 py-4 font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Metric</th>
                    {["Year 1", "Year 2", "Year 3"].map(yr => (
                      <th key={yr} className="text-right px-8 py-4 font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">{yr}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proposalData.breakEven.map((row, ri) => (
                    <tr
                      key={ri}
                      className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${row.highlight ? "bg-gold/[0.04]" : ""}`}
                    >
                      <td className={`px-8 py-4 font-body text-sm ${row.highlight ? "text-gold font-medium" : "text-white/45"}`}>{row.metric}</td>
                      <td className={`px-8 py-4 text-right font-mono text-sm ${row.highlight ? "text-gold" : "text-white/35"}`}>{row.y1}</td>
                      <td className={`px-8 py-4 text-right font-mono text-sm ${row.highlight ? "text-gold" : "text-white/35"}`}>{row.y2}</td>
                      <td className={`px-8 py-4 text-right font-mono text-sm ${row.highlight ? "text-gold" : "text-white/35"}`}>{row.y3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── RISK MITIGATION ── */}
      <section id="risks" className="py-32 px-8 md:px-16 lg:px-24 bg-[#050a10]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              Risk &amp; Mitigation
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Every Risk<br />Has a Structure
            </h2>
            <p className="font-body text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
              We&apos;ve identified the five most likely failure modes. Each one has a contractual or structural response built in.
            </p>
          </div>

          <div className="reveal border border-white/[0.06] bg-[#060c14] overflow-hidden shadow-[0_0_20px_rgba(0,207,255,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    <th className="text-left px-8 py-5 font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase w-1/3">Risk</th>
                    <th className="text-left px-8 py-5 font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Mitigation</th>
                    <th className="text-left px-8 py-5 font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase w-28">Likelihood</th>
                  </tr>
                </thead>
                <tbody>
                  {proposalData.risks.map((r, ri) => {
                    const likelihoodColor = r.likelihood === "Low" ? "#34d399" : r.likelihood === "Medium" || r.likelihood === "Low–Medium" ? "#f59e0b" : "#94a3b8";
                    return (
                      <tr key={ri} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 font-body text-sm text-white/60 align-top leading-relaxed">{r.risk}</td>
                        <td className="px-8 py-6 font-body text-xs text-white/35 align-top leading-relaxed">{r.mitigation}</td>
                        <td className="px-8 py-6 align-top">
                          <span
                            className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1 rounded-sm whitespace-nowrap"
                            style={{ color: likelihoodColor, background: `${likelihoodColor}18`, border: `1px solid ${likelihoodColor}30` }}
                          >
                            {r.likelihood}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-32 px-8 md:px-16 lg:px-24 bg-[#050a10]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              Timeline
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">3-Year Roadmap</h2>
          </div>

          <div className="space-y-0">
            {proposalData.roadmap.map((phase, phaseIdx) => (
              <div key={phase.year} className="reveal border border-gold/[0.08] bg-[#060c14] mb-px">
                {/* Phase header */}
                <div className="p-8 border-b border-white/[0.04] flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.4em] text-gold/60 uppercase mb-2">{phase.year}</p>
                    <h3 className="font-display text-3xl font-light"><EditTxt value={phase.title} path={["roadmap",phaseIdx,"title"]} onUpdate={updateField} editMode={editMode} /></h3>
                  </div>
                  <p className="font-body text-sm text-white/30 max-w-md leading-relaxed"><EditTxt value={phase.subtitle} path={["roadmap",phaseIdx,"subtitle"]} onUpdate={updateField} editMode={editMode} /></p>
                </div>

                {/* Artist tracks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {phase.tracks.map((track, ti) => (
                    <div
                      key={track.artist}
                      className={`p-6 ${ti < phase.tracks.length - 1 ? "lg:border-r border-white/[0.04]" : ""} ${ti < 2 ? "md:border-r border-white/[0.04]" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: track.color, boxShadow: `0 0 6px ${track.color}` }} />
                        <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: track.color }}>{track.artist}</span>
                      </div>
                      <ul className="space-y-2.5">
                        {track.items.map((item, ii) => (
                          <li key={ii} className="font-body text-xs text-white/35 flex items-start gap-2 leading-relaxed">
                            <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-white/15" />
                            <EditArea value={item} path={["roadmap",phaseIdx,"tracks",ti,"items",ii]} onUpdate={updateField} editMode={editMode} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL OPPORTUNITIES ── */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-[#040810]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <p className="font-mono text-[9px] tracking-[0.45em] text-gold uppercase mb-4 opacity-70">
              Beyond the Core Deal
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Additional<br />Opportunities
            </h2>
            <p className="font-body text-sm text-white/40 mt-6 max-w-xl leading-relaxed">
              Five expansion vectors that sit outside the core deal but become accessible the moment the partnership is in place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
            {proposalData.additionalOpps.map((opp, i) => (
              <div
                key={i}
                className={`reveal bg-[#060c14] p-8 border border-white/[0.06] hover:border-gold/15 transition-colors group ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[9px] tracking-[0.45em] text-white/15">{opp.num}</span>
                  <div className="h-px flex-1 bg-white/[0.05]" />
                </div>
                <h3 className="font-display text-xl font-light mb-1 group-hover:text-gold transition-colors duration-300">
                  {opp.title}
                </h3>
                <p className="font-mono text-[9px] tracking-[0.3em] text-gold/40 uppercase mb-4">{opp.subtitle}</p>
                <p className="font-body text-xs text-white/35 leading-relaxed">{opp.desc}</p>
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
                <EditArea value={proposalData.about.description} path={["about","description"]} onUpdate={updateField} editMode={editMode} />
              </p>
              <div className="grid grid-cols-2 gap-px bg-gold/[0.08]">
                {proposalData.about.stats.map((s, si) => (
                  <div key={si} className="bg-[#050a10] p-7 hover:bg-[#0a1018] transition-colors">
                    <p className="font-display text-4xl font-light text-gold mb-2"><EditTxt value={s.n} path={["about","stats",si,"n"]} onUpdate={updateField} editMode={editMode} /></p>
                    <p className="font-body text-xs text-white/35"><EditTxt value={s.l} path={["about","stats",si,"l"]} onUpdate={updateField} editMode={editMode} /></p>
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
                  {proposalData.about.roster.map((r, ri) => (
                    <div
                      key={ri}
                      className="border-b border-white/[0.05] py-5 flex items-start justify-between gap-6 hover:border-gold/15 transition-colors"
                    >
                      <p className="font-display text-xl font-light"><EditTxt value={r.artist} path={["about","roster",ri,"artist"]} onUpdate={updateField} editMode={editMode} /></p>
                      <p className="font-body text-xs text-white/30 text-right leading-relaxed max-w-44">
                        <EditTxt value={r.note} path={["about","roster",ri,"note"]} onUpdate={updateField} editMode={editMode} />
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
                  <EditArea value={proposalData.about.labelTrackRecord} path={["about","labelTrackRecord"]} onUpdate={updateField} editMode={editMode} />
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
            <EditTxt value={proposalData.cta.eyebrow} path={["cta","eyebrow"]} onUpdate={updateField} editMode={editMode} />
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-none mb-10">
            <EditTxt value={proposalData.cta.title} path={["cta","title"]} onUpdate={updateField} editMode={editMode} /><br />
            <em className="italic gold-shimmer"><EditTxt value={proposalData.cta.titleAccent} path={["cta","titleAccent"]} onUpdate={updateField} editMode={editMode} /></em>
          </h2>
          <p className="font-body text-sm text-white/40 mb-14 max-w-sm mx-auto leading-relaxed">
            <EditArea value={proposalData.cta.description} path={["cta","description"]} onUpdate={updateField} editMode={editMode} />
          </p>
          <a
            href={`mailto:${proposalData.cta.email}`}
            className="inline-flex items-center gap-4 font-mono text-xs tracking-[0.35em] text-gold border border-gold/35 px-8 py-5 hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(0,207,255,0.3)] transition-all duration-300 uppercase group"
          >
            <EditTxt value={proposalData.cta.email} path={["cta","email"]} onUpdate={updateField} editMode={editMode} />
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

      {/* ── EDIT MODE TOGGLE (only visible with ?edit=1) ── */}
      {canEdit && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
          {editMode && (
            <button
              onClick={() => { if (confirm("Reset all content to defaults?")) { resetData(); setProposalData(DEFAULT_DATA); setEditMode(false); } }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2.5 border transition-all duration-300 backdrop-blur-sm"
              style={{ borderColor: "rgba(255,80,80,0.35)", color: "rgba(255,80,80,0.6)", background: "rgba(5,10,16,0.85)" }}
            >
              ↺ Reset
            </button>
          )}
          <button
            onClick={() => setEditMode((e) => !e)}
            className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2.5 border transition-all duration-300 backdrop-blur-sm"
            style={
              editMode
                ? { borderColor: "rgba(0,207,255,0.45)", color: "#00cfff", background: "rgba(0,207,255,0.08)", boxShadow: "0 0 20px rgba(0,207,255,0.12)" }
                : { borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)", background: "rgba(5,10,16,0.85)" }
            }
          >
            {editMode ? "✓ Done" : "✎ Edit"}
          </button>
        </div>
      )}
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
function InvestmentReturnChart({ combined }: { combined: ComputedTotals; editMode: boolean; onUpdate: UpdateFn }) {
  const { ref, visible } = useChartVisible(0.2);
  const maxVal = Math.max(...combined.revenue, ...combined.investment);
  const BAR_H = 200;

  return (
    <div ref={ref} className="border border-gold/[0.08] bg-[#060c14] mb-6 shadow-[0_0_20px_rgba(0,207,255,0.04)]">
      {/* Header KPIs */}
      <div className="grid grid-cols-3 gap-0 border-b border-white/[0.06]">
        {FINANCIAL_YEARS.map((yr, i) => (
          <div
            key={yr}
            className={`p-8 ${i < 2 ? "border-r border-white/[0.06]" : ""} transition-opacity duration-700`}
            style={{ opacity: visible ? 1 : 0, transitionDelay: `${i * 0.15}s` }}
          >
            <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase mb-4">{yr}</p>
            {/* Revenue — dominant */}
            <p
              className="font-display text-4xl md:text-5xl font-light leading-none mb-1"
              style={{ color: "#00cfff", textShadow: "0 0 25px rgba(0,207,255,0.45)" }}
            >
              €{combined.revenue[i]}K
            </p>
            <p className="font-mono text-[8px] tracking-[0.3em] text-white/20 uppercase mb-5">China Revenue</p>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-sm text-white/40">€{combined.investment[i]}K</p>
                <p className="font-mono text-[8px] text-white/18 tracking-wider uppercase">Invested</p>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div>
                <p className="font-mono text-sm text-emerald-400/70">€{combined.insReturn[i]}K</p>
                <p className="font-mono text-[8px] text-white/18 tracking-wider uppercase">INS Return</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="px-10 pt-8 pb-4">
        <div className="flex items-end gap-4 md:gap-8" style={{ height: `${BAR_H + 20}px` }}>
          {FINANCIAL_YEARS.map((yr, i) => {
            const invH = (combined.investment[i] / maxVal) * BAR_H;
            const revH = (combined.revenue[i] / maxVal) * BAR_H;
            const retH = (combined.insReturn[i] / maxVal) * BAR_H;
            return (
              <div key={yr} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center gap-1.5" style={{ height: `${BAR_H}px` }}>
                  <div className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                    style={{ height: visible ? `${invH}px` : "0px", transitionDelay: `${i * 0.1}s`, background: "linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0.05))" }} />
                  <div className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                    style={{ height: visible ? `${revH}px` : "0px", transitionDelay: `${0.05 + i * 0.1}s`, background: "linear-gradient(to top, #00cfff, rgba(0,207,255,0.4))", boxShadow: visible ? "0 0 12px rgba(0,207,255,0.3)" : "none" }} />
                  <div className="w-1/4 rounded-sm transition-all duration-700 ease-out"
                    style={{ height: visible ? `${retH}px` : "0px", transitionDelay: `${0.1 + i * 0.1}s`, background: "linear-gradient(to top, rgba(52,211,153,0.7), rgba(52,211,153,0.25))" }} />
                </div>
                <p className="font-mono text-[9px] text-white/20 tracking-wider mt-1">{yr}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-8 mt-6 border-t border-white/[0.05] pt-5">
          <div className="flex items-center gap-2"><div className="w-3 h-2 rounded-sm bg-white/10" /><span className="font-mono text-[9px] text-white/30">Investment</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-2 rounded-sm" style={{ background: "#00cfff" }} /><span className="font-mono text-[9px] text-white/30">China Revenue</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-2 rounded-sm bg-emerald-400/50" /><span className="font-mono text-[9px] text-white/30">INS Return</span></div>
        </div>
      </div>

    </div>
  );
}

// ── Chart 5: Revenue + Investment Breakdowns ────────────────────────────────
function RevenueInvestmentBreakdown({
  combined, revenueDetail, investmentDetail, editMode, onUpdate,
}: {
  combined: ComputedTotals;
  revenueDetail: typeof DEFAULT_DATA.revenueDetail;
  investmentDetail: typeof DEFAULT_DATA.investmentDetail;
  editMode: boolean; onUpdate: UpdateFn;
}) {
  const { ref, visible } = useChartVisible(0.2);
  const [activeYear, setActiveYear] = useState(0);

  return (
    <div ref={ref} className="mb-6">
      {/* Year selector */}
      <div className="flex items-center gap-0 mb-0">
        {FINANCIAL_YEARS.map((yr, i) => (
          <button
            key={yr}
            onClick={() => setActiveYear(i)}
            className={`px-6 py-3 font-mono text-[10px] tracking-[0.35em] uppercase transition-all duration-300 border-t border-l border-r ${
              activeYear === i
                ? "text-gold border-gold/25 bg-[#060c14] -mb-px relative z-10"
                : "text-white/20 border-transparent hover:text-white/40"
            }`}
          >
            {yr}
            {activeYear === i && <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gold/[0.08]">
        {/* Revenue */}
        <div className="bg-[#060c14] p-8" style={{ opacity: visible ? 1 : 0, transition: "all 0.5s ease" }}>
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">Revenue — Where It Comes From</p>
            <p className="font-display text-2xl font-light text-gold" style={{ textShadow: "0 0 15px rgba(0,207,255,0.3)" }}>€{combined.revenue[activeYear]}K</p>
          </div>

          <div className="space-y-6">
            {revenueDetail.map((r, ri) => {
              const color = PILLAR_COLORS[ri];
              const yr = r.years[activeYear];
              const yrTotal = yr.lines.reduce((s, l) => s + l.v, 0);
              const insAmt = Math.round(yrTotal * r.insShare[activeYear] / 100);
              return (
                <div key={r.pillar}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">{r.pillar}</span>
                    </div>
                    <span className="font-mono text-base font-medium" style={{ color }}>€{yrTotal}K</span>
                  </div>

                  {/* Line items */}
                  <div className="ml-4 space-y-1 mb-3">
                    {yr.lines.map((line, li) => (
                      <div key={li} className="flex items-center justify-between">
                        <span className="font-mono text-[9px] text-white/25"><EditTxt value={line.l} path={["revenueDetail",ri,"years",activeYear,"lines",li,"l"]} onUpdate={onUpdate} editMode={editMode} /></span>
                        <span className="font-mono text-[9px] text-white/35">€<EditNum value={line.v} path={["revenueDetail",ri,"years",activeYear,"lines",li,"v"]} onUpdate={onUpdate} editMode={editMode} />K</span>
                      </div>
                    ))}
                  </div>

                  {/* INS share */}
                  <div className="ml-4 flex items-center justify-between border-t border-white/[0.04] pt-1.5">
                    <span className="font-mono text-[9px] text-emerald-400/50">INS share (<EditNum value={r.insShare[activeYear]} path={["revenueDetail",ri,"insShare",activeYear]} onUpdate={onUpdate} editMode={editMode} />%)</span>
                    <span className="font-mono text-[9px] text-emerald-400/70 font-medium">€{insAmt}K</span>
                  </div>

                  {ri < revenueDetail.length - 1 && <div className="border-b border-white/[0.04] mt-4" />}
                </div>
              );
            })}

            {/* Total INS return */}
            <div className="border-t border-gold/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-emerald-400/60 uppercase tracking-wider">Total INS return</span>
                <span className="font-mono text-base text-emerald-400 font-medium">€{combined.insReturn[activeYear]}K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Investment */}
        <div className="bg-[#060c14] p-8" style={{ opacity: visible ? 1 : 0, transition: "all 0.5s ease 0.1s" }}>
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-[9px] tracking-[0.4em] text-gold/50 uppercase">Investment — Where It Goes</p>
            <p className="font-display text-2xl font-light text-white/50">€{combined.investment[activeYear]}K</p>
          </div>

          <div className="space-y-6">
            {investmentDetail.map((p, pi) => {
              const color = PILLAR_COLORS[pi];
              const yr = p.years[activeYear];
              const yrTotal = yr.lines.reduce((s, l) => s + l.v, 0);
              return (
                <div key={p.pillar}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">{p.pillar}</span>
                    </div>
                    <span className="font-mono text-base text-white/40 font-medium">€{yrTotal}K</span>
                  </div>

                  {/* Line items */}
                  <div className="ml-4 space-y-1">
                    {yr.lines.map((line, li) => {
                      const pct = yrTotal ? (line.v / yrTotal) * 100 : 0;
                      return (
                        <div key={li}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-mono text-[9px] text-white/25"><EditTxt value={line.l} path={["investmentDetail",pi,"years",activeYear,"lines",li,"l"]} onUpdate={onUpdate} editMode={editMode} /></span>
                            <span className="font-mono text-[9px] text-white/35">€<EditNum value={line.v} path={["investmentDetail",pi,"years",activeYear,"lines",li,"v"]} onUpdate={onUpdate} editMode={editMode} />K</span>
                          </div>
                          <div className="h-[2px] bg-white/[0.03] rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color, opacity: 0.4 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {pi < investmentDetail.length - 1 && <div className="border-b border-white/[0.04] mt-4" />}
                </div>
              );
            })}

            {/* Total */}
            <div className="border-t border-gold/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Total invested</span>
                <span className="font-mono text-base text-white/50 font-medium">€{combined.investment[activeYear]}K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Break-even + Upside Card ────────────────────────────────────────────────
function BreakEvenCard({ combined }: { combined: ComputedTotals; editMode: boolean; onUpdate: UpdateFn }) {
  const { ref, visible } = useChartVisible(0.2);

  // Cumulative data for the progress line
  const cumInvest = combined.cumInvest;
  const cumReturn = combined.cumReturn;

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


