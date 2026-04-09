"use client";

import { useEffect, useState } from "react";

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
  return <span className="absolute bottom-[6mm] right-[12mm] font-mono text-[5pt] text-white/15">{String(n).padStart(2, "0")}</span>;
}

function SectionLabel({ children, color = "#C9A84C" }: { children: string; color?: string }) {
  return <p className="font-mono text-[6pt] tracking-[0.45em] uppercase mb-[3mm] opacity-70" style={{ color }}>{children}</p>;
}

function GoldLine() {
  return <div className="w-[30mm] h-[0.3mm] bg-[#C9A84C] mb-[5mm]" />;
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
      <div className="no-print fixed top-4 right-4 z-50">
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
          <span className="font-mono text-[5pt] tracking-[0.3em] text-white/15 uppercase">Private &amp; Confidential · 2026</span>
        </div>

        <div className="absolute left-[16mm] top-[45mm] right-[16mm]">
          <GoldLine />
          <h1 className="font-display text-[38pt] font-light leading-[1.08] tracking-tight mb-[6mm]">
            From booking shows<br />to building artist<br />businesses in <em className="italic text-[#00cfff]">China</em>
          </h1>
          <p className="font-body text-[9pt] text-white/35 leading-relaxed max-w-[130mm]">
            A co-development model that transforms Western artist booking into long-term shared ownership in the Chinese market.
          </p>
        </div>

        {/* 3-block visual */}
        <div className="absolute bottom-[35mm] left-[16mm] right-[16mm] flex items-center gap-[4mm]">
          <div className="flex-1 border border-[#00cfff20] rounded-[2mm] p-[5mm] bg-[#00cfff04]">
            <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff]/60 uppercase mb-[1.5mm]">INS</p>
            <p className="font-display text-[10pt] font-light text-white/60">Infrastructure</p>
          </div>
          <span className="font-display text-[12pt] text-white/15">+</span>
          <div className="flex-1 border border-[#C9A84C20] rounded-[2mm] p-[5mm] bg-[#C9A84C04]">
            <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/60 uppercase mb-[1.5mm]">A2G</p>
            <p className="font-display text-[10pt] font-light text-white/60">Artist engine</p>
          </div>
          <span className="font-display text-[12pt] text-white/15">→</span>
          <div className="flex-1 border border-white/[0.08] rounded-[2mm] p-[5mm] bg-white/[0.02]">
            <p className="font-mono text-[5pt] tracking-[0.2em] text-white/30 uppercase mb-[1.5mm]">Output</p>
            <p className="font-display text-[10pt] font-light text-white/60">Artists built for China</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[0.3mm] bg-gradient-to-r from-transparent via-[#00cfff20] to-transparent" />
        <PageNum n={1} />
      </Page>

      {/* ═══ PAGE 2: THE MODEL ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col h-full">
          <SectionLabel>The model</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[8mm]">
            One platform. One engine.<br />One <span className="gold-shimmer italic">outcome</span>.
          </h2>

          {/* 3 columns */}
          <div className="flex gap-[4mm] mb-[8mm]">
            <div className="flex-1 border-t-[0.6mm] border-[#00cfff] pt-[4mm]">
              <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[3mm]">INS provides</p>
              {["Venues and live infrastructure", "China marketing and platform access", "Brand, licensing and business relationships", "Local execution capacity"].map((b, i) => (
                <p key={i} className="font-body text-[7pt] text-white/45 mb-[2mm] flex gap-[2mm]">
                  <span className="text-[#00cfff]/30 shrink-0">·</span>{b}
                </p>
              ))}
            </div>
            <div className="flex-1 border-t-[0.6mm] border-[#C9A84C] pt-[4mm]">
              <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">A2G provides</p>
              {["Artist development and production", "Release strategy and label access", "Show concepts and content formats", "International creative network"].map((b, i) => (
                <p key={i} className="font-body text-[7pt] text-white/45 mb-[2mm] flex gap-[2mm]">
                  <span className="text-[#C9A84C]/30 shrink-0">·</span>{b}
                </p>
              ))}
            </div>
            <div className="flex-1 border-t-[0.6mm] border-white/30 pt-[4mm]">
              <p className="font-mono text-[5.5pt] tracking-[0.2em] text-white/50 uppercase mb-[3mm]">Together they build</p>
              {["China-ready artist campaigns", "Shows, releases and content moments", "Revenue across live, royalties, licensing, content", "A repeatable system for future artists"].map((b, i) => (
                <p key={i} className="font-body text-[7pt] text-white/45 mb-[2mm] flex gap-[2mm]">
                  <span className="text-white/20 shrink-0">·</span>{b}
                </p>
              ))}
            </div>
          </div>

          {/* Ecosystem diagram — pure HTML/CSS */}
          <div className="flex-1 flex flex-col justify-center">
            {/* INS row */}
            <div className="flex items-center justify-center gap-[3mm] mb-[3mm]">
              <p className="font-mono text-[4.5pt] tracking-[0.15em] text-[#00cfff]/40 uppercase w-[18mm] text-right">INS</p>
              <div className="flex gap-[2mm]">
                {["Hero E-Sports", "INS Shows", "INSane label", "China Mktg"].map((n) => (
                  <div key={n} className="border border-[#00cfff15] rounded-[1mm] px-[2.5mm] py-[1.5mm] bg-[#00cfff04]">
                    <span className="font-mono text-[4.5pt] text-[#00cfff]/50">{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connecting lines down */}
            <div className="flex justify-center mb-[2mm]">
              <div className="flex flex-col items-center">
                <div className="w-[0.3mm] h-[6mm] bg-white/[0.06]" />
                <div className="w-[2mm] h-[2mm] border-b border-r border-white/[0.08] rotate-45 -mt-[1mm]" />
              </div>
            </div>

            {/* THE DEAL center */}
            <div className="flex justify-center mb-[2mm]">
              <div className="border border-[#C9A84C30] rounded-[2mm] px-[8mm] py-[3mm] bg-[#C9A84C06]">
                <p className="font-display text-[11pt] text-[#C9A84C] text-center">THE DEAL</p>
                <p className="font-mono text-[4pt] tracking-[0.15em] text-white/20 text-center mt-[1mm]">Co-development · Co-ownership · Revenue share</p>
              </div>
            </div>

            {/* Connecting lines down */}
            <div className="flex justify-center mb-[2mm]">
              <div className="flex flex-col items-center">
                <div className="w-[0.3mm] h-[6mm] bg-white/[0.06]" />
                <div className="w-[2mm] h-[2mm] border-b border-r border-white/[0.08] rotate-45 -mt-[1mm]" />
              </div>
            </div>

            {/* A2G row */}
            <div className="flex items-center justify-center gap-[3mm] mb-[3mm]">
              <p className="font-mono text-[4.5pt] tracking-[0.15em] text-[#f87171]/40 uppercase w-[18mm] text-right">A2G</p>
              <div className="flex gap-[2mm]">
                {["Prophecy", "AIRE", "PERSONA"].map((n) => (
                  <div key={n} className="border border-[#f8717115] rounded-[1mm] px-[2.5mm] py-[1.5mm] bg-[#f8717104]">
                    <span className="font-mono text-[4.5pt] text-[#f87171]/50">{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connecting lines down */}
            <div className="flex justify-center mb-[2mm]">
              <div className="flex flex-col items-center">
                <div className="w-[0.3mm] h-[6mm] bg-white/[0.06]" />
                <div className="w-[2mm] h-[2mm] border-b border-r border-white/[0.08] rotate-45 -mt-[1mm]" />
              </div>
            </div>

            {/* Artist Factory output */}
            <div className="flex justify-center mb-[3mm]">
              <div className="border border-dashed border-[#C9A84C20] rounded-[2mm] px-[8mm] py-[2.5mm] bg-[#C9A84C03]">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/40 text-center uppercase">Artist Factory</p>
                <p className="font-body text-[4pt] text-white/20 text-center mt-[0.5mm]">Björn → Artist 2 → Artist 3... → ∞</p>
              </div>
            </div>

            {/* Loop arrow text */}
            <p className="text-center font-mono text-[4pt] tracking-[0.15em] text-[#C9A84C]/25 uppercase">↩ Loop: each artist proves the model, infrastructure serves the next</p>
          </div>
        </div>
        <PageNum n={2} />
      </Page>

      {/* ═══ PAGE 3: WHY THIS WINS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>Why this wins</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[10mm]">
            A better model<br />for <span className="gold-shimmer italic">everyone</span>.
          </h2>

          {/* Comparison table */}
          <div className="flex gap-[4mm] mb-[10mm]">
            <div className="flex-1 border border-white/[0.06] rounded-[2mm] p-[6mm] bg-white/[0.015]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-white/25 uppercase mb-[3mm]">Traditional booking</p>
              <div className="space-y-[3mm]">
                <p className="font-body text-[7.5pt] text-white/35">Pay fee</p>
                <p className="font-body text-[5pt] text-white/15">↓</p>
                <p className="font-body text-[7.5pt] text-white/35">Run event</p>
                <p className="font-body text-[5pt] text-white/15">↓</p>
                <p className="font-body text-[7.5pt] text-white/20 italic">Value ends when the night ends</p>
              </div>
            </div>
            <div className="flex-1 border border-[#C9A84C30] rounded-[2mm] p-[6mm] bg-[#C9A84C06]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">Co-development model</p>
              <div className="space-y-[3mm]">
                <p className="font-body text-[7.5pt] text-white/50">Invest in activation</p>
                <p className="font-body text-[5pt] text-[#C9A84C]/30">↓</p>
                <p className="font-body text-[7.5pt] text-white/50">Build shows, music, content</p>
                <p className="font-body text-[5pt] text-[#C9A84C]/30">↓</p>
                <p className="font-body text-[7.5pt] text-[#C9A84C] italic">Retain participation in China value</p>
              </div>
            </div>
          </div>

          {/* FIVE Holdings */}
          <div className="border border-white/[0.06] rounded-[2mm] p-[8mm] mb-[8mm] bg-white/[0.015]">
            <p className="font-mono text-[5pt] tracking-[0.3em] text-white/20 uppercase mb-[4mm]">FIVE Holdings × Pacha Group</p>
            <div className="flex gap-[6mm] items-baseline mb-[3mm]">
              <p className="font-display text-[24pt] font-light text-white/25">€302.5M</p>
              <p className="font-body text-[7pt] text-white/20">acquisition</p>
              <p className="font-display text-[18pt] font-light text-white/15 ml-auto">$589M</p>
              <p className="font-body text-[7pt] text-white/15">revenue</p>
            </div>
            <p className="font-body text-[7.5pt] text-white/25">No artist pipeline.</p>
          </div>

          {/* Comparison visual */}
          <div className="flex gap-[6mm] items-center mt-auto mb-[16mm]">
            <div className="flex-1 border border-white/[0.06] rounded-[2mm] p-[6mm] text-center bg-white/[0.015]">
              <p className="font-display text-[30pt] font-light text-white/10 mb-[1mm]">€302.5M</p>
              <p className="font-body text-[7pt] text-white/20">Still rents talent</p>
            </div>
            <span className="font-display text-[16pt] text-[#C9A84C]/30">→</span>
            <div className="flex-1 border border-[#C9A84C30] rounded-[2mm] p-[6mm] text-center bg-[#C9A84C06]">
              <p className="font-display text-[30pt] font-light text-[#C9A84C] mb-[1mm]">€54K</p>
              <p className="font-body text-[7pt] text-white/40">Co-owns artists from day one</p>
            </div>
          </div>

          <p className="font-mono text-[4.5pt] text-white/15 tracking-[0.1em] mb-[8mm]">China: world&apos;s #5 recorded music market. Source: IFPI 2026</p>
        </div>
        <PageNum n={3} />
      </Page>

      {/* ═══ PAGE 4: THE ARTISTS ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col h-full">
          <SectionLabel>The artists</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[8mm]">
            Three roles.<br />One <span className="italic text-[#00cfff]">system</span>.
          </h2>

          {/* 3 artist cards */}
          <div className="flex gap-[3mm] flex-1 mb-[4mm]">
            {[
              { name: "PROPHECY", genre: "Melodic Techno", image: "/images/artists/prophecy.png", role: "Opens doors", sub: "Production credibility, international label relationships, release pipeline." },
              { name: "AIRE", genre: "DJ × VJ Live Act", image: "/images/artists/aire.png", role: "Creates content", sub: "Immersive DJ×VJ format. Premium visual assets from every activation." },
              { name: "BJÖRN", genre: "Electronic", image: "/images/artists/bjorn.png", role: "Proves the local case", sub: "INS artist developed through the system. From local to exportable." },
            ].map((a) => (
              <div key={a.name} className="flex-1 flex flex-col">
                <div className="flex-1 rounded-[2mm] overflow-hidden bg-[#0a1020] mb-[3mm]">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.8) contrast(1.05)" }} />
                </div>
                <p className="font-display text-[14pt] font-light tracking-wide mb-[1mm]">{a.name}</p>
                <p className="font-display text-[8.5pt] text-[#C9A84C] italic mb-[1.5mm]">{a.role}</p>
                <p className="font-body text-[6.5pt] text-white/30 leading-relaxed">{a.sub}</p>
              </div>
            ))}
          </div>

          <p className="font-display text-[8.5pt] italic text-[#C9A84C]/60 mb-[10mm] text-center">
            If the pilot works, the same infrastructure serves every artist after.
          </p>
        </div>
        <PageNum n={4} />
      </Page>

      {/* ═══ PAGE 5: THE ECONOMICS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>The economics</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[10mm]">
            Where the money<br /><span className="gold-shimmer italic">comes from</span>.
          </h2>

          {/* Split layout */}
          <div className="flex gap-[6mm] mb-[10mm]">
            {/* LEFT: 4 revenue scope boxes */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-[3mm]">
                {[
                  { t: "Shows in China", s: "60/30/10% share on every show fee", c: "#00cfff" },
                  { t: "Royalties + Publishing", s: "China territory streaming + downloads", c: "#C9A84C" },
                  { t: "Licensing", s: "Gaming (Hero E-Sports), brand deals, sync", c: "#4ade80" },
                  { t: "Content + Merch", s: "A/V assets from every AIRE show", c: "#a78bfa" },
                ].map((r) => (
                  <div key={r.t} className="border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                    <span className="text-[5pt] block mb-[2mm]" style={{ color: r.c }}>◆</span>
                    <p className="font-display text-[10pt] font-light text-white/80 mb-[1.5mm]">{r.t}</p>
                    <p className="font-body text-[6pt] text-white/30 leading-relaxed">{r.s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Revenue phases */}
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[4mm]">Revenue share phases</p>
              {[
                { n: "01", t: "Recovery", s: "60% INS · 40% Artist", d: "Until INS recoups full investment", c: "#00cfff" },
                { n: "02", t: "Profit (3yr)", s: "30% INS · 70% Artist", d: "Artist takes majority, INS retains 30%", c: "#C9A84C" },
                { n: "03", t: "Long-term", s: "10% INS · 90% Artist", d: "INS retains royalty up to Year 10", c: "#4ade80" },
              ].map((p) => (
                <div key={p.n} className="flex items-center gap-[3mm] py-[3mm] border-b border-white/[0.03]">
                  <span className="font-mono text-[7pt] font-medium w-[6mm]" style={{ color: p.c }}>{p.n}</span>
                  <span className="font-body text-[8pt] text-white w-[22mm]">{p.t}</span>
                  <div className="flex-1">
                    <span className="font-display text-[9pt] font-light block" style={{ color: p.c }}>{p.s}</span>
                    <span className="font-body text-[5.5pt] text-white/20">{p.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-year financial summary */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[3mm]">3-Year financial projection — conservative model</p>
          <div className="flex gap-[4mm] mb-[3mm]">
            {[
              { y: "Year 1", rev: "€44K", ret: "€24K" },
              { y: "Year 2", rev: "€179K", ret: "€53K" },
              { y: "Year 3", rev: "€495K", ret: "€145K" },
            ].map((f) => (
              <div key={f.y} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <p className="font-mono text-[5pt] text-white/25 mb-[2mm]">{f.y}</p>
                <p className="font-display text-[20pt] font-light text-[#00cfff] mb-[1mm]" style={{ textShadow: "0 0 15px rgba(0,207,255,0.15)" }}>{f.rev}</p>
                <p className="font-mono text-[5pt] text-white/20 mb-[1mm]">total revenue</p>
                <p className="font-display text-[12pt] font-light text-[#C9A84C]">{f.ret}</p>
                <p className="font-mono text-[4.5pt] text-[#C9A84C]/40">INS return</p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[4.5pt] text-white/15 tracking-[0.1em] mt-auto mb-[8mm]">Non-China touring and global catalogue remain outside scope.</p>
        </div>
        <PageNum n={5} />
      </Page>

      {/* ═══ PAGE 6: YEAR 1 PLAN ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel color="#00cfff">Year 1 · Prophecy × INS</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[10mm]">
            Focused. Measurable.<br /><span className="italic text-[#00cfff]">Concrete</span>.
          </h2>

          {/* Two columns */}
          <div className="flex gap-[8mm] mb-[8mm]">
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
                <p key={i} className="font-body text-[7pt] text-white/40 mb-[2.5mm] flex gap-[2mm]">
                  <span className="text-[#00cfff]/25 shrink-0">·</span>{item}
                </p>
              ))}
            </div>
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
                <p key={i} className="font-body text-[7pt] text-white/40 mb-[2.5mm] flex gap-[2mm]">
                  <span className="text-[#C9A84C]/25 shrink-0">·</span>{item}
                </p>
              ))}
            </div>
          </div>

          {/* Gold bar */}
          <div className="border-l-[1mm] border-[#C9A84C40] pl-[5mm] py-[3mm] bg-[#C9A84C06] mb-[8mm]">
            <p className="font-body text-[7.5pt] text-[#C9A84C]">INS invests ~€24K Year 1</p>
          </div>

          {/* Success criteria */}
          <div className="border border-white/[0.06] rounded-[2mm] p-[6mm] bg-white/[0.015] mt-auto mb-[12mm]">
            <p className="font-mono text-[5pt] tracking-[0.2em] text-white/25 uppercase mb-[4mm]">Year 1 is successful if:</p>
            <div className="grid grid-cols-2 gap-[2mm]">
              {[
                "Real shows launched in China",
                "Content engine creates reusable assets",
                "Björn enters structured development path",
                "INS has a playbook reusable for artist 2",
              ].map((c, i) => (
                <p key={i} className="font-body text-[7pt] text-white/40 flex gap-[2mm] items-start">
                  <span className="text-[#C9A84C]/40 shrink-0 text-[6pt] mt-[0.3mm]">☐</span>{c}
                </p>
              ))}
            </div>
          </div>
        </div>
        <PageNum n={6} />
      </Page>

      {/* ═══ PAGE 7: THE ARTIST FACTORY ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full">
          <SectionLabel>The output</SectionLabel>
          <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[3mm]">
            The artist<br /><span className="gold-shimmer italic">incubator</span>.
          </h2>
          <p className="font-display text-[10pt] italic text-[#C9A84C] mb-[10mm]">&ldquo;We don&apos;t book artists. We build them.&rdquo;</p>

          {/* Factory loop */}
          <div className="border border-[#C9A84C20] rounded-[3mm] p-[8mm] bg-[#C9A84C04] mb-[8mm]">
            <div className="flex items-center justify-center gap-[10mm] mb-[4mm]">
              {[
                { n: "Björn", s: "Year 1: prove it", active: true },
                { n: "INS artist 2", s: "Year 2: scale it", active: true },
                { n: "Artist 3...", s: "Year 3: it runs itself", active: false },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-[8mm]">
                  <div className="text-center">
                    <p className={`font-display text-[13pt] ${a.active ? "text-[#EF9F27]" : "text-white/15"}`}>{a.n}</p>
                    <p className="font-body text-[6pt] text-white/25 mt-[1mm]">{a.s}</p>
                  </div>
                  {i < 2 && <span className="font-display text-[14pt] text-[#C9A84C]/20">→</span>}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-[3mm]">
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-[#C9A84C15] to-transparent" />
              <span className="font-mono text-[4.5pt] tracking-[0.15em] text-[#C9A84C]/30 uppercase">Same infrastructure · Lower cost · Faster · Repeat</span>
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-[#C9A84C15] to-transparent" />
            </div>
          </div>

          {/* Progression */}
          <p className="font-body text-[8pt] text-white/35 mb-[8mm] text-center">
            Year 1: prove the model. Year 2: scale it. Year 3: it runs itself.
          </p>

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
                <p className="font-body text-[5pt] text-white/25">{r.s}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={7} />
      </Page>

      {/* ═══ PAGE 8: CTA ═══ */}
      <Page>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00cfff03] via-transparent to-[#C9A84C05]" />
        <Header />
        <div className="h-full flex flex-col pt-[22mm] px-[16mm]">

          {/* What happens next */}
          <SectionLabel>Next steps</SectionLabel>
          <h2 className="font-display text-[24pt] font-light leading-[1.1] mb-[10mm]">
            What happens <span className="gold-shimmer italic">next</span>.
          </h2>

          <div className="flex gap-[4mm] mb-[16mm]">
            {[
              { n: "1", t: "Confirm pilot scope", d: "Agree Year 1 focus and success criteria" },
              { n: "2", t: "Confirm economics", d: "Finalize budget, deliverables, recoup mechanics" },
              { n: "3", t: "Launch first cycle", d: "Set timeline, activate marketing, begin building" },
            ].map((s) => (
              <div key={s.n} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <p className="font-display text-[18pt] font-light text-[#C9A84C]/30 mb-[2mm]">{s.n}</p>
                <p className="font-display text-[10pt] text-white/70 mb-[1.5mm]">{s.t}</p>
                <p className="font-body text-[6.5pt] text-white/30 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <GoldLine />
            <h2 className="font-display text-[32pt] font-light mt-[3mm] mb-[2mm]">Let&apos;s Build</h2>
            <h2 className="font-display text-[32pt] font-light italic text-[#C9A84C] mb-[6mm]">Together</h2>

            <p className="font-body text-[11pt] text-white mb-[1mm]">Aitzol Arevalo Gómez</p>
            <p className="font-body text-[7pt] text-white/30 mb-[3mm]">A2G Company FZCO · Dubai, UAE</p>
            <p className="font-body text-[8pt] text-[#00cfff] mb-[8mm]">a.arevalo@a2g.company</p>

            <QRCode />
            <p className="font-mono text-[5pt] text-white/20 mt-[2mm] mb-[8mm]">ins-proposal.vercel.app</p>

            <p className="font-display text-[9pt] italic text-[#C9A84C]/50 max-w-[130mm] leading-relaxed">
              If the pilot works, INS doesn&apos;t just host talent in China. It starts building artist value in China.
            </p>

            <div className="mt-[10mm] flex items-center gap-[3mm]">
              <span className="font-mono text-[7pt] tracking-[0.2em] text-white/20">A2G</span>
              <span className="text-white/10">|</span>
              <span className="font-mono text-[7pt] tracking-[0.2em] text-[#00cfff]/20">INS</span>
            </div>
          </div>
        </div>
        <PageNum n={8} />
      </Page>
    </div>
  );
}
