"use client";

import { DEFAULT_DATA } from "../lib/data";
import { useEffect, useState } from "react";

const d = DEFAULT_DATA;

function QRCode() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const url = "https://ins-proposal.vercel.app/";
    setSrc(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=0a0e14&color=e2e8f0&format=svg`);
  }, []);
  return src ? <img src={src} alt="QR" className="w-[22mm] h-[22mm] opacity-80" /> : null;
}

function Page({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`page relative overflow-hidden ${className}`} style={{ width: "210mm", height: "297mm", background: "#050a10", color: "#fff", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}

function Header() {
  return (
    <div className="absolute top-[8mm] left-[12mm] right-[12mm] flex justify-between items-center z-10">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[6pt] font-medium tracking-[0.25em] text-[#C9A84C]">A2G</span>
        <span className="text-white/10 text-[6pt]">|</span>
        <span className="font-mono text-[6pt] font-medium tracking-[0.25em] text-[#00cfff]">INS</span>
      </div>
      <span className="font-mono text-[5pt] tracking-[0.3em] text-white/15 uppercase">Private Proposal · 2026</span>
    </div>
  );
}

function PageNum({ n }: { n: number }) {
  return <span className="absolute bottom-[6mm] right-[12mm] font-mono text-[5pt] text-white/15">{String(n).padStart(2,"0")}</span>;
}

function SectionLabel({ children, color = "#C9A84C" }: { children: string; color?: string }) {
  return <p className="font-mono text-[6pt] tracking-[0.45em] uppercase mb-[3mm] opacity-70" style={{ color }}>{children}</p>;
}

function GoldLine() {
  return <div className="w-[30mm] h-[0.3mm] bg-[#C9A84C] mb-[5mm]" />;
}

/* ── Schema Node ── */
function Node({ label, sub, x, y, color = "#fff", w = 28 }: { label: string; sub?: string; x: number; y: number; color?: string; w?: number }) {
  return (
    <foreignObject x={x - w / 2} y={y - 8} width={w} height={sub ? 18 : 14}>
      <div className="flex flex-col items-center justify-center h-full">
        <span className="font-mono text-[4.5pt] tracking-[0.1em] text-center leading-none" style={{ color }}>{label}</span>
        {sub && <span className="font-body text-[3.5pt] text-white/25 text-center leading-none mt-[0.5mm]">{sub}</span>}
      </div>
    </foreignObject>
  );
}

function Line({ x1, y1, x2, y2, color = "rgba(255,255,255,0.08)" }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.4" />;
}

export default function PrintPage() {
  return (
    <div className="print-container">
      <style jsx global>{`
        @page { size: 210mm 297mm; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; background: #050a10; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-container { padding: 0; }
          .page { page-break-after: always; page-break-inside: avoid; }
          .page:last-child { page-break-after: auto; }
          .no-print { display: none !important; }
        }
        @media screen {
          .print-container { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px; background: #1a1a1a; min-height: 100vh; }
          .page { box-shadow: 0 8px 40px rgba(0,0,0,0.5); }
        }
        .gold-shimmer { background: linear-gradient(135deg, #C9A84C 0%, #e8d48a 50%, #C9A84C 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button onClick={() => window.print()} className="bg-[#C9A84C] text-black font-mono text-xs px-4 py-2 rounded hover:bg-[#d4b55f] transition">
          Print / Save PDF
        </button>
      </div>

      {/* ═══ PAGE 1: COVER ═══ */}
      <Page>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00cfff05] via-transparent to-transparent" />
        <div className="absolute top-[8mm] left-[12mm] right-[12mm] flex justify-between items-center">
          <div className="flex items-center gap-[3mm]">
            <span className="font-display text-[11pt] font-light tracking-[0.15em] text-white">A<span className="text-[9pt] mx-[0.5mm]">2</span>G</span>
            <span className="text-white/15">|</span>
            <span className="font-display text-[11pt] font-light tracking-[0.15em] text-[#00cfff]">I N S</span>
          </div>
          <span className="font-mono text-[5pt] tracking-[0.3em] text-white/15 uppercase">Private Proposal · 2026</span>
        </div>

        <div className="absolute left-[16mm] top-[45mm]">
          <GoldLine />
          <h1 className="font-display text-[42pt] font-light leading-[1.05] tracking-tight mb-[5mm]">
            Co-Building<br />the Future of<br />Music in <em className="italic text-[#00cfff]">China</em>
          </h1>
          <p className="font-body text-[9pt] text-white/40 leading-relaxed max-w-[120mm]">
            A first-of-its-kind co-development model — transforming Western artist booking into long-term shared ownership in the Chinese market.
          </p>
        </div>

        <div className="absolute bottom-[25mm] left-[16mm] right-[16mm] flex gap-[15mm]">
          {[
            { v: "$8.5B", l: "China electronic\nmusic market" },
            { v: "10.6%", l: "Annual growth\n(CAGR)" },
            { v: "3", l: "Artists · Year\n1" },
            { v: "April 2026", l: "First shows" },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display text-[22pt] font-light text-[#C9A84C] mb-[1mm]" style={{ textShadow: "0 0 20px rgba(0,207,255,0.2)" }}>{s.v}</p>
              <p className="font-mono text-[5pt] tracking-[0.15em] text-white/25 uppercase whitespace-pre-line">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[0.3mm] bg-gradient-to-r from-transparent via-[#00cfff20] to-transparent" />
        <PageNum n={1} />
      </Page>

      {/* ═══ PAGE 2: THE BIG PICTURE — Node diagram ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[12mm] flex flex-col h-full">
          <SectionLabel>The big picture</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[6mm]">
            Two ecosystems. One <span className="gold-shimmer italic">machine</span>.
          </h2>

          {/* Node diagram */}
          <div className="flex-1 flex items-center justify-center">
            <svg viewBox="0 0 180 220" width="180mm" height="220mm" className="overflow-visible">
              {/* ── INS zone (top, blue tint) ── */}
              <rect x="2" y="2" width="80" height="58" rx="2" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" />
              <text x="42" y="9" textAnchor="middle" className="font-mono" style={{ fontSize: "4pt", fill: "rgba(96,165,250,0.5)", letterSpacing: "0.15em" }}>INS ECOSYSTEM</text>

              {/* INS main nodes */}
              <Node label="HERO.COM" sub="Venues" x={18} y={20} color="#60a5fa" />
              <Node label="INS" sub="Brand + ops" x={42} y={20} color="#60a5fa" />
              <Node label="Hero E-Sports" sub="Gaming + sync" x={70} y={20} color="#60a5fa" />

              {/* INS sub-nodes */}
              <Node label="INS Shows" sub="Live events" x={18} y={38} color="#60a5fa" w={24} />
              <Node label="INSane" sub="Record label" x={42} y={38} color="#60a5fa" w={24} />
              <Node label="China Mktg" sub="Douyin · RED" x={70} y={38} color="#60a5fa" w={24} />

              {/* INS outputs */}
              <Node label="Licensing" x={12} y={52} color="rgba(96,165,250,0.5)" w={20} />
              <Node label="Shows" x={42} y={52} color="rgba(96,165,250,0.5)" w={20} />
              <Node label="Marketing" x={72} y={52} color="rgba(96,165,250,0.5)" w={20} />

              {/* INS internal lines */}
              <Line x1={42} y1={26} x2={18} y2={32} color="rgba(96,165,250,0.15)" />
              <Line x1={42} y1={26} x2={42} y2={32} color="rgba(96,165,250,0.15)" />
              <Line x1={42} y1={26} x2={70} y2={32} color="rgba(96,165,250,0.15)" />
              <Line x1={18} y1={44} x2={12} y2={48} color="rgba(96,165,250,0.1)" />
              <Line x1={42} y1={44} x2={42} y2={48} color="rgba(96,165,250,0.1)" />
              <Line x1={70} y1={44} x2={72} y2={48} color="rgba(96,165,250,0.1)" />

              {/* ── A2G zone (top right, red tint) ── */}
              <rect x="98" y="2" width="80" height="58" rx="2" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.15)" strokeWidth="0.3" />
              <text x="138" y="9" textAnchor="middle" className="font-mono" style={{ fontSize: "4pt", fill: "rgba(248,113,113,0.5)", letterSpacing: "0.15em" }}>A2G COMPANY</text>

              {/* A2G main nodes */}
              <Node label="Prophecy" sub="Production engine" x={112} y={22} color="#f87171" />
              <Node label="PERSONA" sub="Label + EDMisLove" x={140} y={22} color="#f87171" w={30} />
              <Node label="AIRE" sub="DJ×VJ shows" x={166} y={22} color="#f87171" />

              {/* A2G outputs */}
              <Node label="Ghost prod" sub="for INS artists" x={106} y={40} color="rgba(248,113,113,0.5)" w={22} />
              <Node label="Releases" sub="for INSane" x={128} y={40} color="rgba(248,113,113,0.5)" w={22} />
              <Node label="WW Mktg" x={148} y={40} color="rgba(248,113,113,0.5)" w={20} />
              <Node label="Content" sub="A/V assets" x={166} y={40} color="rgba(248,113,113,0.5)" w={20} />

              {/* A2G internal lines */}
              <Line x1={112} y1={28} x2={106} y2={34} color="rgba(248,113,113,0.15)" />
              <Line x1={112} y1={28} x2={128} y2={34} color="rgba(248,113,113,0.15)" />
              <Line x1={140} y1={28} x2={128} y2={34} color="rgba(248,113,113,0.15)" />
              <Line x1={140} y1={28} x2={148} y2={34} color="rgba(248,113,113,0.15)" />
              <Line x1={166} y1={28} x2={166} y2={34} color="rgba(248,113,113,0.15)" />

              {/* ═══ THE DEAL (center) ═══ */}
              <rect x="60" y="70" width="60" height="24" rx="2" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
              <text x="90" y="79" textAnchor="middle" className="font-display" style={{ fontSize: "7pt", fill: "#C9A84C" }}>THE DEAL</text>
              <text x="90" y="87" textAnchor="middle" className="font-body" style={{ fontSize: "3.5pt", fill: "rgba(255,255,255,0.3)" }}>Co-development · Co-ownership · Revenue share</text>

              {/* Lines from ecosystems to deal */}
              <Line x1={42} y1={56} x2={75} y2={70} color="rgba(96,165,250,0.2)" />
              <Line x1={12} y1={56} x2={70} y2={70} color="rgba(96,165,250,0.12)" />
              <Line x1={72} y1={56} x2={85} y2={70} color="rgba(96,165,250,0.12)" />
              <Line x1={112} y1={46} x2={105} y2={70} color="rgba(248,113,113,0.2)" />
              <Line x1={148} y1={46} x2={110} y2={70} color="rgba(248,113,113,0.12)" />
              <Line x1={166} y1={46} x2={115} y2={70} color="rgba(248,113,113,0.12)" />

              {/* Context nodes around deal */}
              <Node label="THE MARKET" sub="$8.5B · 10.6% CAGR" x={30} y={82} color="rgba(255,255,255,0.3)" w={32} />
              <Node label="PRECEDENT" sub="FIVE Holdings" x={150} y={82} color="rgba(255,255,255,0.3)" w={28} />
              <Line x1={46} y1={82} x2={60} y2={82} color="rgba(255,255,255,0.06)" />
              <Line x1={136} y1={82} x2={120} y2={82} color="rgba(255,255,255,0.06)" />

              {/* ═══ ARTIST OUTPUT (bottom 3 blocks) ═══ */}

              {/* Lines from deal to artist blocks */}
              <Line x1={75} y1={94} x2={32} y2={108} color="rgba(96,165,250,0.2)" />
              <Line x1={90} y1={94} x2={90} y2={108} color="rgba(139,92,246,0.2)" />
              <Line x1={105} y1={94} x2={148} y2={108} color="rgba(248,113,113,0.2)" />

              {/* Block 1: Local Artists (blue) */}
              <rect x="2" y="108" width="56" height="52" rx="2" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3" />
              <text x="30" y="116" textAnchor="middle" className="font-mono" style={{ fontSize: "3.5pt", fill: "rgba(96,165,250,0.6)", letterSpacing: "0.15em" }}>REVENUE · LOCAL ARTISTS</text>
              <Node label="Björn" x={18} y={124} color="#60a5fa" w={20} />
              <Node label="INS artist 2" x={44} y={124} color="#60a5fa" w={22} />
              {["Shows", "Royalties + publishing", "Licensing", "Exclusivity + control", "WW Marketing"].map((s, i) => (
                <text key={s} x="8" y={136 + i * 5} className="font-body" style={{ fontSize: "3.5pt", fill: "rgba(255,255,255,0.35)" }}>· {s}</text>
              ))}

              {/* Block 2: AIRE (purple) */}
              <rect x="62" y="108" width="56" height="52" rx="2" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.15)" strokeWidth="0.3" />
              <text x="90" y="116" textAnchor="middle" className="font-mono" style={{ fontSize: "3.5pt", fill: "rgba(167,139,250,0.6)", letterSpacing: "0.15em" }}>REVENUE · AIRE (SHARED)</text>
              <Node label="AIRE" x={90} y={124} color="#a78bfa" w={20} />
              {["Shows (China)", "Licensing (China)", "Exclusivity + control (China)", "Royalties + publishing (China)"].map((s, i) => (
                <text key={s} x="68" y={136 + i * 5} className="font-body" style={{ fontSize: "3.5pt", fill: "rgba(255,255,255,0.35)" }}>· {s}</text>
              ))}

              {/* Block 3: Prophecy (red) */}
              <rect x="122" y="108" width="56" height="52" rx="2" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.15)" strokeWidth="0.3" />
              <text x="150" y="116" textAnchor="middle" className="font-mono" style={{ fontSize: "3.5pt", fill: "rgba(248,113,113,0.6)", letterSpacing: "0.15em" }}>REVENUE · PROPHECY (A2G)</text>
              <Node label="Prophecy" x={150} y={124} color="#f87171" w={24} />
              {["China Marketing", "Shows (INS venues)"].map((s, i) => (
                <text key={s} x="128" y={136 + i * 5} className="font-body" style={{ fontSize: "3.5pt", fill: "rgba(255,255,255,0.35)" }}>· {s}</text>
              ))}

              {/* ═══ LOOP ARROW: Artist Factory ═══ */}
              <text x="90" y="170" textAnchor="middle" className="font-mono" style={{ fontSize: "4pt", fill: "rgba(201,168,76,0.5)", letterSpacing: "0.2em" }}>THE ARTIST FACTORY</text>
              <text x="90" y="176" textAnchor="middle" className="font-body" style={{ fontSize: "3.5pt", fill: "rgba(255,255,255,0.2)" }}>Each artist proves the model → infrastructure serves the next one</text>

              {/* Loop arrow path */}
              <path d="M 30,162 C 30,185 150,185 150,162" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.4" strokeDasharray="1.5 1" />
              <path d="M 88,186 L 90,190 L 92,186" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
              <Line x1={90} y1={190} x2={90} y2={200} color="rgba(201,168,76,0.15)" />
              <text x="90" y="206" textAnchor="middle" className="font-display" style={{ fontSize: "5pt", fill: "rgba(201,168,76,0.4)", fontStyle: "italic" }}>∞ Infinite artists</text>
            </svg>
          </div>

          <p className="text-center font-display text-[10pt] text-white/20 italic pb-[12mm]">
            Two ecosystems. One machine. Infinite artists.
          </p>
        </div>
        <PageNum n={2} />
      </Page>

      {/* ═══ PAGE 3: WHY THIS WORKS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>The precedent</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[12mm]">
            Someone already<br />validated this <span className="gold-shimmer italic">model</span>.
          </h2>

          {/* FIVE Holdings box */}
          <div className="border border-white/[0.06] rounded-[3mm] p-[10mm] mb-[10mm] bg-white/[0.015]">
            <p className="font-mono text-[5pt] tracking-[0.3em] text-white/20 uppercase mb-[4mm]">FIVE Holdings × Pacha Group</p>
            <div className="flex gap-[8mm] items-baseline mb-[6mm]">
              <p className="font-display text-[28pt] font-light text-white/30">€302.5M</p>
              <p className="font-body text-[8pt] text-white/25">acquisition</p>
              <p className="font-display text-[20pt] font-light text-white/20 ml-auto">$589M</p>
              <p className="font-body text-[8pt] text-white/20">revenue</p>
            </div>
            <p className="font-body text-[8pt] text-white/30">No artist pipeline.</p>
          </div>

          <p className="font-display text-[11pt] italic text-[#C9A84C] leading-relaxed mb-[16mm] max-w-[140mm]">
            &ldquo;FIVE proved the vulnerability: without owned artists, you always pay someone else.&rdquo;
          </p>

          {/* Comparison */}
          <div className="flex gap-[8mm] items-center mt-auto mb-[30mm]">
            <div className="flex-1 border border-white/[0.06] rounded-[3mm] p-[8mm] text-center bg-white/[0.015]">
              <p className="font-display text-[36pt] font-light text-white/12 mb-[2mm]">€302.5M</p>
              <p className="font-body text-[7pt] text-white/20">Still rents talent</p>
            </div>
            <span className="font-display text-[20pt] text-[#C9A84C]/40">→</span>
            <div className="flex-1 border border-[#C9A84C30] rounded-[3mm] p-[8mm] text-center bg-[#C9A84C06]">
              <p className="font-display text-[36pt] font-light text-[#C9A84C] mb-[2mm]">€54K</p>
              <p className="font-body text-[7pt] text-white/40">Co-owns artists from day one</p>
            </div>
          </div>
        </div>
        <PageNum n={3} />
      </Page>

      {/* ═══ PAGE 4: THE ARTISTS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>The artists</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[10mm]">
            Western talent,<br />built for <span className="italic text-[#00cfff]">Asia</span>.
          </h2>

          <div className="flex gap-[4mm] flex-1 mb-[16mm]">
            {[
              { name: "PROPHECY", genre: "Melodic Techno", image: "/images/artists/prophecy.png", line: "The production engine. Anyma, Guetta, ARTBAT co-prods. 300K+ Spotify." },
              { name: "AIRE", genre: "DJ × VJ Live Act", image: "/images/artists/aire.png", line: "The content engine. DJ×VJ immersive format. Sellable A/V from every show." },
              { name: "BJÖRN", genre: "Electronic", image: "/images/artists/bjorn.png", line: "The proof of concept. Ghost-produced by Prophecy. First artist through the factory." },
            ].map((a) => (
              <div key={a.name} className="flex-1 flex flex-col">
                <div className="flex-1 rounded-[2mm] overflow-hidden bg-[#0a1020] mb-[4mm]" style={{ aspectRatio: "1" }}>
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.8) contrast(1.05)" }} />
                </div>
                <div className="flex items-center gap-[2mm] mb-[2mm]">
                  <p className="font-display text-[14pt] font-light tracking-wide">{a.name}</p>
                  <span className="font-mono text-[4.5pt] tracking-[0.15em] text-[#00cfff]/40 uppercase border border-[#00cfff15] px-[2mm] py-[0.5mm]">{a.genre}</span>
                </div>
                <p className="font-body text-[7pt] text-white/35 leading-relaxed">{a.line}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={4} />
      </Page>

      {/* ═══ PAGE 5: HOW IT WORKS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The model</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[10mm]">
            Co-development,<br /><span className="gold-shimmer italic">co-ownership</span>.
          </h2>

          {/* 3 phases */}
          <div className="flex gap-[4mm] mb-[12mm]">
            {d.phases.map((s) => (
              <div key={s.num} className="flex-1 border border-white/[0.04] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <p className="font-display text-[16pt] text-white/10 mb-[1mm]">{s.num}</p>
                <p className="font-display text-[12pt] text-[#C9A84C] mb-[2mm]">{s.title}</p>
                <p className="font-body text-[7pt] text-white/35 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Revenue phases */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[4mm]">Revenue share phases</p>
          {[
            { n: "01", t: "Recovery", s: "60% INS · 40% Artist", d: "Until INS recoups full investment", c: "#00cfff" },
            { n: "02", t: "Profit (3yr)", s: "30% INS · 70% Artist", d: "Artist takes majority, INS retains 30%", c: "#C9A84C" },
            { n: "03", t: "Long-term", s: "10% INS · 90% Artist", d: "INS retains royalty up to Year 10", c: "#4ade80" },
          ].map((p) => (
            <div key={p.n} className="flex items-center gap-[4mm] py-[3mm] border-b border-white/[0.03]">
              <span className="font-mono text-[8pt] font-medium w-[8mm]" style={{ color: p.c }}>{p.n}</span>
              <span className="font-body text-[9pt] text-white w-[28mm]">{p.t}</span>
              <span className="font-display text-[11pt] font-light" style={{ color: p.c }}>{p.s}</span>
              <span className="font-body text-[7pt] text-white/25 ml-auto">{p.d}</span>
            </div>
          ))}
        </div>
        <PageNum n={5} />
      </Page>

      {/* ═══ PAGE 6: WHAT INS EARNS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>What INS earns</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[12mm]">
            Where the money<br /><span className="gold-shimmer italic">comes from</span>.
          </h2>

          {/* 4 revenue cards */}
          <div className="grid grid-cols-2 gap-[4mm] mb-[12mm]">
            {[
              { icon: "◆", title: "Shows in China", desc: "60/30/10% share on every show fee", color: "#00cfff" },
              { icon: "◆", title: "Royalties + Publishing", desc: "China territory streaming + downloads", color: "#C9A84C" },
              { icon: "◆", title: "Licensing", desc: "Gaming (Hero E-Sports), brand deals, sync", color: "#4ade80" },
              { icon: "◆", title: "Content + Merch", desc: "A/V assets from every AIRE show", color: "#a78bfa" },
            ].map((c) => (
              <div key={c.title} className="border border-white/[0.06] rounded-[3mm] p-[8mm] bg-white/[0.015]">
                <span className="text-[6pt] mb-[3mm] block" style={{ color: c.color }}>◆</span>
                <p className="font-display text-[14pt] font-light text-white mb-[2mm]">{c.title}</p>
                <p className="font-body text-[8pt] text-white/35 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 3-year summary row */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[4mm]">3-Year financial projection — conservative model</p>
          <div className="flex gap-[4mm] mt-auto mb-[20mm]">
            {[
              { y: "Year 1", rev: "€44K", ret: "€24K", retLabel: "INS return" },
              { y: "Year 2", rev: "€179K", ret: "€53K", retLabel: "INS return" },
              { y: "Year 3", rev: "€495K", ret: "€145K", retLabel: "INS return" },
            ].map((f) => (
              <div key={f.y} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[6mm] bg-white/[0.015]">
                <p className="font-mono text-[6pt] text-white/25 mb-[3mm]">{f.y}</p>
                <p className="font-display text-[24pt] font-light text-[#00cfff] mb-[1mm]" style={{ textShadow: "0 0 15px rgba(0,207,255,0.2)" }}>{f.rev}</p>
                <p className="font-mono text-[6pt] text-white/20 mb-[0.5mm]">total revenue</p>
                <p className="font-display text-[14pt] font-light text-[#C9A84C] mt-[2mm]">{f.ret}</p>
                <p className="font-mono text-[5pt] text-[#C9A84C]/50">{f.retLabel}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={6} />
      </Page>

      {/* ═══ PAGE 7: PROPHECY YEAR 1 ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel color="#00cfff">Year 1 · Prophecy × INS</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[10mm]">
            The first <span className="italic text-[#00cfff]">move</span>.
          </h2>

          {/* Two columns */}
          <div className="flex gap-[8mm] flex-1">
            {/* Left: What we want from INS */}
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[4mm]">What we want from INS</p>
              {[
                "3 shows at INS venues (30% discount asia rate)",
                "€10K marketing co-funding (distributed as preferred)",
                "China Marketing Director (part-time, local execution)",
                "Distribution: Apple Music, NetEase, Douyin",
                "Sync/gaming pipeline through Hero E-Sports",
                "INS partner brand activations",
                "3–5 non-INS China shows (€4–5K rate)",
              ].map((item, i) => (
                <p key={i} className="font-body text-[7.5pt] text-white/45 mb-[2.5mm] pl-[3mm] flex gap-[2mm]">
                  <span className="text-[#00cfff]/30 shrink-0">·</span>{item}
                </p>
              ))}
            </div>

            {/* Right: What INS gets */}
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[4mm]">What INS gets in return</p>
              {[
                "40% China-territory revenue until recouped",
                "Ghost-production: 4 tracks for Björn at €3,500/track (30% off market)",
                "Up to 3 Prophecy releases on INS label in Year 1",
                "Label scouting for Björn — fallback: PERSONA Records with promo",
                "Connections with the biggest industry players",
                "Support with Björn development",
                "30% share for 3yr post-recovery, then 10% to Year 10",
              ].map((item, i) => (
                <p key={i} className="font-body text-[7.5pt] text-white/45 mb-[2.5mm] pl-[3mm] flex gap-[2mm]">
                  <span className="text-[#C9A84C]/30 shrink-0">·</span>{item}
                </p>
              ))}
            </div>
          </div>

          {/* Gold bottom bar */}
          <div className="border-l-[1mm] border-[#C9A84C40] pl-[5mm] py-[3mm] bg-[#C9A84C06] mb-[16mm]">
            <p className="font-body text-[8pt] text-[#C9A84C] leading-relaxed">
              INS invests ~€24K → Gets: revenue share + 4 tracks + 3 releases + label scouting + industry access
            </p>
          </div>
        </div>
        <PageNum n={7} />
      </Page>

      {/* ═══ PAGE 8: THE ARTIST FACTORY ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>The output</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[3mm]">
            The artist<br /><span className="gold-shimmer italic">incubator</span>.
          </h2>
          <p className="font-display text-[11pt] italic text-[#C9A84C] mb-[10mm]">&ldquo;We don&apos;t book artists. We build them.&rdquo;</p>

          {/* Factory visual with loop */}
          <div className="border border-[#C9A84C20] rounded-[3mm] p-[8mm] bg-[#C9A84C04] mb-[6mm]">
            <div className="flex items-center justify-center gap-[10mm] mb-[4mm]">
              {[
                { n: "Björn", s: "Year 1: prove the model", active: true },
                { n: "INS artist 2", s: "Year 2: scale it", active: true },
                { n: "Artist 3...", s: "Year 3: it runs itself", active: false },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-[8mm]">
                  <div className="text-center">
                    <p className={`font-display text-[14pt] ${a.active ? "text-[#EF9F27]" : "text-white/15"}`}>{a.n}</p>
                    <p className="font-body text-[6pt] text-white/25 mt-[1mm]">{a.s}</p>
                  </div>
                  {i < 2 && <span className="font-display text-[16pt] text-[#C9A84C]/25">→</span>}
                </div>
              ))}
            </div>

            {/* Loop arrow */}
            <div className="flex items-center justify-center gap-[3mm] mt-[2mm]">
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-[#C9A84C20] to-transparent" />
              <span className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/35 uppercase">Same infrastructure · Lower cost · Faster · Repeat</span>
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-[#C9A84C20] to-transparent" />
            </div>
          </div>

          {/* Progression */}
          <div className="flex gap-[4mm] mb-[8mm]">
            {[
              { y: "Year 1", t: "Prove the model", d: "3 artists, first shows, first revenue", c: "#00cfff" },
              { y: "Year 2", t: "Scale it", d: "More artists, bigger venues, growing catalog", c: "#C9A84C" },
              { y: "Year 3", t: "It runs itself", d: "Infrastructure proven, pipeline repeatable", c: "#4ade80" },
            ].map((p) => (
              <div key={p.y} className="flex-1 border border-white/[0.04] rounded-[2mm] p-[4mm] bg-white/[0.015]">
                <p className="font-mono text-[5pt] tracking-[0.15em] uppercase mb-[1mm]" style={{ color: p.c }}>{p.y}</p>
                <p className="font-display text-[10pt] text-white mb-[1mm]">{p.t}</p>
                <p className="font-body text-[6pt] text-white/30">{p.d}</p>
              </div>
            ))}
          </div>

          {/* Revenue per artist */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/25 uppercase mb-[3mm]">Each artist generates revenue for INS</p>
          <div className="grid grid-cols-4 gap-[3mm]">
            {[
              { t: "Shows in China", s: "60/30/10% revenue share", c: "#00cfff" },
              { t: "Royalties + publishing", s: "China territory streams", c: "#C9A84C" },
              { t: "Licensing in China", s: "Gaming, brand, sync", c: "#4ade80" },
              { t: "Content + merch", s: "A/V assets, brand deals", c: "#a78bfa" },
            ].map((r) => (
              <div key={r.t} className="border border-white/[0.04] rounded-[2mm] p-[3mm] bg-white/[0.015]">
                <span className="text-[5pt] block mb-[1mm]" style={{ color: r.c }}>◆</span>
                <p className="font-body text-[6.5pt] text-white/60 mb-[1mm]">{r.t}</p>
                <p className="font-body text-[5.5pt] text-white/25">{r.s}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={8} />
      </Page>

      {/* ═══ PAGE 9: CTA ═══ */}
      <Page>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00cfff03] via-transparent to-[#C9A84C05]" />
        <div className="h-full flex flex-col items-center justify-center text-center px-[30mm]">
          <GoldLine />
          <h2 className="font-display text-[34pt] font-light mt-[4mm] mb-[2mm]">Let&apos;s Build</h2>
          <h2 className="font-display text-[34pt] font-light italic text-[#C9A84C] mb-[6mm]">Together</h2>

          <p className="font-body text-[9pt] text-white/35 mb-[12mm] max-w-[100mm] leading-relaxed">
            We propose a long-term partnership, not a one-night booking. If the vision aligns, let&apos;s move fast.
          </p>

          <p className="font-body text-[11pt] text-white mb-[1mm]">Aitzol Arevalo Gómez</p>
          <p className="font-body text-[7pt] text-white/30 mb-[4mm]">A2G Company FZCO · Dubai, UAE</p>
          <p className="font-body text-[8pt] text-[#00cfff] mb-[10mm]">a.arevalo@a2g.company</p>

          <QRCode />
          <p className="font-mono text-[5pt] text-white/20 mt-[2mm]">ins-proposal.vercel.app</p>

          <div className="mt-[16mm] flex items-center gap-[3mm]">
            <span className="font-mono text-[7pt] tracking-[0.2em] text-white/20">A2G</span>
            <span className="text-white/10">|</span>
            <span className="font-mono text-[7pt] tracking-[0.2em] text-[#00cfff]/20">INS</span>
          </div>
        </div>
        <PageNum n={9} />
      </Page>
    </div>
  );
}
