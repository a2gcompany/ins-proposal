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

      {/* Print button - screen only */}
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

        {/* Stats row */}
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

      {/* ═══ PAGE 2: THE PARTNERSHIP ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The partnership</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[12mm]">
            Two ecosystems,<br />one <span className="gold-shimmer italic">machine</span>.
          </h2>

          <div className="flex gap-[6mm] mb-[8mm]">
            {/* INS */}
            <div className="flex-1 border border-[#0F6E5640] rounded-[4mm] p-[6mm] bg-[#0F6E5608]">
              <p className="font-display text-[11pt] text-[#00cfff] mb-[4mm]">INS ecosystem</p>
              {["INS — Venues + infrastructure","Hero E-Sports — Gaming + sync pipeline","INS Shows — Live events in China","INSane — Record label","China Marketing — Douyin, RED, local promo"].map((item, i) => (
                <p key={i} className="font-body text-[7pt] text-white/50 mb-[2mm] flex gap-[2mm]">
                  <span className="text-[#5DCAA5] shrink-0">·</span> {item}
                </p>
              ))}
              <div className="mt-[4mm] pt-[3mm] border-t border-[#0F6E5630]">
                <p className="font-mono text-[5pt] tracking-[0.15em] text-[#EF9F27] uppercase mb-[2mm]">Local artists</p>
                <p className="font-body text-[7pt] text-[#EF9F27]/60">Björn (first prototype) · INS artist 2 · Artist 3...</p>
              </div>
            </div>
            {/* A2G */}
            <div className="flex-1 border border-[#534AB740] rounded-[4mm] p-[6mm] bg-[#534AB708]">
              <p className="font-display text-[11pt] text-[#AFA9EC] mb-[4mm]">A2G company</p>
              {["Prophecy — Production + live engine","AIRE — Content + immersive DJ×VJ shows","PERSONA — Label + EDMisLove 7M promo","Int'l network — Available, not promised"].map((item, i) => (
                <p key={i} className="font-body text-[7pt] text-white/50 mb-[2mm] flex gap-[2mm]">
                  <span className="text-[#AFA9EC] shrink-0">·</span> {item}
                </p>
              ))}
            </div>
          </div>

          {/* Revenue + Delivers */}
          <div className="flex gap-[6mm]">
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#5DCAA5] uppercase mb-[3mm]">INS earns from artists</p>
              {["China shows revenue (60/30/10% share)","Music royalties + publishing (China territory)","Licensing in China (gaming, brand, sync)","Content + merch revenue"].map((r, i) => (
                <p key={i} className="font-body text-[6.5pt] text-[#5DCAA5]/70 mb-[1.5mm]">· {r}</p>
              ))}
            </div>
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">A2G delivers into the deal</p>
              {["Ghost production for INS artists","Releases on INSane label","Label releases + worldwide exposure","A/V content + exclusive immersive shows"].map((r, i) => (
                <p key={i} className="font-body text-[6.5pt] text-[#C9A84C]/70 mb-[1.5mm]">· {r}</p>
              ))}
            </div>
          </div>
        </div>
        <PageNum n={2} />
      </Page>

      {/* ═══ PAGE 3: OPPORTUNITY + FIVE ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The opportunity</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[4mm]">
            The biggest market<br />nobody has <span className="gold-shimmer italic">unlocked</span>.
          </h2>
          <p className="font-body text-[8pt] text-white/35 mb-[10mm] max-w-[140mm]">
            China's electronic music market reached $8.5B in 2025, growing at 10.6% CAGR. No replicable co-development model with long-term territorial revenue sharing exists yet.
          </p>

          {/* FIVE Holdings */}
          <div className="border border-white/[0.06] rounded-[3mm] p-[8mm] mb-[8mm] bg-white/[0.015]">
            <p className="font-mono text-[5pt] tracking-[0.3em] text-white/20 uppercase mb-[3mm]">Proven model</p>
            <p className="font-display text-[16pt] font-light text-white mb-[4mm]">FIVE Holdings × Pacha Group</p>
            <div className="font-body text-[7.5pt] text-white/40 leading-relaxed space-y-[1mm]">
              <p>Acquired Pacha for €302.5M in October 2023. Reported $589M revenue in 2024 (28% YoY) with $208M EBITDA.</p>
              <p>Acquired Brooklyn Mirage / Avant Gardner in February 2026, rebranding as Pacha NYC.</p>
              <p>Plans $500M expansion across US and Asia. $460M credit facility secured.</p>
            </div>
            <p className="font-body text-[8pt] text-[#C9A84C] italic mt-[4mm] leading-relaxed">
              But FIVE proved its biggest vulnerability: without their own artists, they're always paying someone else's fee to fill their own venues.
            </p>
          </div>

          {/* Comparison */}
          <div className="flex gap-[6mm] items-center">
            <div className="flex-1 border border-white/[0.06] rounded-[3mm] p-[6mm] text-center bg-white/[0.015]">
              <p className="font-mono text-[6pt] tracking-[0.15em] text-white/25 uppercase mb-[2mm]">FIVE Holdings</p>
              <p className="font-display text-[28pt] font-light text-white/15">€302.5M</p>
              <p className="font-body text-[6pt] text-white/25">Still rents talent — no owned artist pipeline</p>
            </div>
            <span className="font-display text-[16pt] text-[#C9A84C]">→</span>
            <div className="flex-1 border border-[#C9A84C30] rounded-[3mm] p-[6mm] text-center bg-[#C9A84C08]">
              <p className="font-mono text-[6pt] tracking-[0.15em] text-[#C9A84C] uppercase mb-[2mm]">INS + A2G</p>
              <p className="font-display text-[28pt] font-light text-[#C9A84C]">€54K</p>
              <p className="font-body text-[6pt] text-white/50">Co-owns artists from day one — audiences come for the brand</p>
            </div>
          </div>
        </div>
        <PageNum n={3} />
      </Page>

      {/* ═══ PAGE 4: ARTISTS ═══ */}
      <Page className="bg-[#040810]">
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The artists</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[10mm]">
            Western talent,<br />built for <span className="italic text-[#00cfff]">Asia</span>.
          </h2>

          {d.artists.map((a, i) => (
            <div key={a.id} className="flex gap-[5mm] mb-[6mm] items-start">
              <div className="w-[40mm] h-[40mm] shrink-0 rounded-[2mm] overflow-hidden bg-[#0a1020]">
                {a.image ? (
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.85) contrast(1.05)" }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10 font-mono text-[6pt]">Photo</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-[3mm] mb-[1mm]">
                  <p className="font-display text-[18pt] font-light">{a.name}</p>
                  <span className="font-mono text-[5pt] tracking-[0.15em] text-[#00cfff]/50 uppercase border border-[#00cfff20] px-[2mm] py-[0.5mm]">{a.genre}</span>
                </div>
                <p className="font-body text-[7pt] text-white/30 italic mb-[2mm]">{a.tagline}</p>
                {a.highlights.map((h, hi) => (
                  <p key={hi} className="font-body text-[6.5pt] text-white/40 mb-[1mm] flex gap-[2mm]">
                    <span className="text-[#00cfff]/30 shrink-0">·</span> {h}
                  </p>
                ))}
                {a.collabs.length > 0 && (
                  <div className="flex flex-wrap gap-[1.5mm] mt-[2mm]">
                    {a.collabs.map((co, ci) => (
                      <span key={ci} className="font-mono text-[5pt] border border-[#00cfff15] px-[2mm] py-[0.5mm] text-[#00cfff]/40 bg-[#00cfff05]">{co}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <PageNum n={4} />
      </Page>

      {/* ═══ PAGE 5: THE MODEL + NUMBERS ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The model</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[8mm]">
            Co-development,<br /><span className="gold-shimmer italic">co-ownership</span>.
          </h2>

          {/* How it works */}
          <div className="flex gap-[4mm] mb-[8mm]">
            {d.phases.map((s) => (
              <div key={s.num} className="flex-1 border border-white/[0.04] rounded-[2mm] p-[4mm] bg-white/[0.015]">
                <p className="font-display text-[14pt] text-white/10 mb-[1mm]">{s.num}</p>
                <p className="font-display text-[11pt] text-[#C9A84C] mb-[2mm]">{s.title}</p>
                <p className="font-body text-[6.5pt] text-white/35 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Revenue phases */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[3mm]">Revenue share phases</p>
          {[
            { n: "01", t: "Recovery", s: "60% INS · 40% Artist", d: "Until INS recoups full investment", c: "#00cfff" },
            { n: "02", t: "Profit (3yr)", s: "30% INS · 70% Artist", d: "Artist takes majority, INS retains 30%", c: "#C9A84C" },
            { n: "03", t: "Long-term", s: "10% INS · 90% Artist", d: "INS retains royalty up to Year 10", c: "#4ade80" },
          ].map((p) => (
            <div key={p.n} className="flex items-center gap-[4mm] py-[2.5mm] border-b border-white/[0.03]">
              <span className="font-mono text-[7pt] font-medium w-[8mm]" style={{ color: p.c }}>{p.n}</span>
              <span className="font-body text-[8pt] text-white w-[28mm]">{p.t}</span>
              <span className="font-display text-[10pt] font-light" style={{ color: p.c }}>{p.s}</span>
              <span className="font-body text-[6.5pt] text-white/25 ml-auto">{p.d}</span>
            </div>
          ))}

          {/* Financial projection */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-white/20 uppercase mb-[3mm] mt-[8mm]">3-Year financial projection — conservative model</p>
          <div className="flex gap-[4mm]">
            {[
              { y: "Year 1", r: "€44K", inv: "€54K invested", ret: "€24K return" },
              { y: "Year 2", r: "€179K", inv: "€77K invested", ret: "€53K return" },
              { y: "Year 3", r: "€495K", inv: "€122K invested", ret: "€145K return" },
            ].map((f) => (
              <div key={f.y} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <p className="font-mono text-[6pt] text-white/25 mb-[2mm]">{f.y}</p>
                <p className="font-display text-[22pt] font-light text-[#00cfff] mb-[2mm]" style={{ textShadow: "0 0 15px rgba(0,207,255,0.2)" }}>{f.r}</p>
                <p className="font-mono text-[5pt] text-white/20">{f.inv}</p>
                <p className="font-mono text-[5pt] text-[#C9A84C]">{f.ret}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={5} />
      </Page>

      {/* ═══ PAGE 6: VALUE BEYOND REVENUE ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>What INS gets</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[10mm]">
            Value beyond<br /><span className="gold-shimmer italic">revenue</span>.
          </h2>

          <div className="grid grid-cols-2 gap-[4mm]">
            {d.valueDimensions.map((v) => (
              <div key={v.num} className="border border-white/[0.04] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <p className="font-mono text-[5pt] tracking-[0.15em] text-[#C9A84C] uppercase mb-[2mm]">{v.category}</p>
                <p className="font-display text-[11pt] text-white mb-[2mm]">{v.title}</p>
                <p className="font-body text-[6.5pt] text-white/35 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={6} />
      </Page>

      {/* ═══ PAGE 7: PROPHECY YEAR 1 DEAL ═══ */}
      <Page>
        <Header />
        <div className="flex h-full">
          {/* Left: image */}
          <div className="w-[38%] relative bg-[#060c14]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/images/artists/prophecy.png" alt="Prophecy" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) contrast(1.1)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050a10]" />
            </div>
          </div>
          {/* Right: deal */}
          <div className="w-[62%] pt-[22mm] px-[8mm]">
            <SectionLabel color="#00cfff">Year 1 · Prophecy × INS</SectionLabel>
            <h2 className="font-display text-[24pt] font-light leading-[1.1] mb-[8mm]">
              The first <span className="italic text-[#00cfff]">move</span>.
            </h2>

            <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[3mm]">What we want from INS</p>
            {["3 shows at INS venues (30% discount asia rate)","€10K marketing co-funding (distributed as preferred)","China Marketing Director (part-time, local execution)","Distribution: Apple Music, NetEase, Douyin","Sync/gaming pipeline through Hero Esports","INS partner brand activations","3-5 non-INS China shows (€4-5K rate)"].map((item, i) => (
              <p key={i} className="font-body text-[6.5pt] text-white/45 mb-[1.5mm] pl-[3mm]">
                <span className="text-white/15 mr-[2mm]">·</span>{item}
              </p>
            ))}

            <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm] mt-[5mm]">What INS gets in return</p>
            {["40% China-territory revenue until recouped","Ghost-production: 4 tracks for Björn at €3,500/track (30% off market)","Up to 3 Prophecy releases on INS label in Year 1","Label scouting for Björn — fallback: PERSONA Records with promo","Connections with the biggest industry players","Support with Björn development","30% share for 3yr post-recovery, then 10% to Year 10"].map((item, i) => (
              <p key={i} className="font-body text-[6.5pt] text-white/45 mb-[1.5mm] pl-[3mm]">
                <span className="text-[#C9A84C]/30 mr-[2mm]">·</span>{item}
              </p>
            ))}

            <div className="mt-[5mm] border-l-[1mm] border-[#C9A84C30] pl-[4mm] py-[2mm] bg-[#C9A84C06]">
              <p className="font-body text-[7pt] text-[#C9A84C]">INS invests ~€24K Year 1</p>
              <p className="font-body text-[6pt] text-white/30">€10K marketing + €14K ghost production package (4 tracks)</p>
            </div>
          </div>
        </div>
        <PageNum n={7} />
      </Page>

      {/* ═══ PAGE 8: ARTIST INCUBATOR ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm]">
          <SectionLabel>The output</SectionLabel>
          <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[4mm]">
            The artist<br /><span className="gold-shimmer italic">incubator</span>.
          </h2>
          <p className="font-display text-[11pt] italic text-[#C9A84C] mb-[4mm]">"We don't book artists. We build them."</p>
          <p className="font-body text-[8pt] text-white/35 leading-relaxed mb-[8mm] max-w-[140mm]">
            Prophecy is the key that starts the machine. Björn is the first prototype. If it works, the infrastructure serves every artist after — same system, lower cost, faster results.
          </p>

          {/* Factory visual */}
          <div className="border border-[#C9A84C30] rounded-[3mm] p-[6mm] bg-[#C9A84C06] mb-[6mm]">
            <div className="flex items-center justify-center gap-[8mm]">
              {[
                { n: "Björn", s: "Year 1 prototype", active: true },
                { n: "INS artist 2", s: "Year 2 expansion", active: true },
                { n: "Artist 3...", s: "And beyond", active: false },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-[6mm]">
                  <div className="text-center">
                    <p className={`font-display text-[12pt] ${a.active ? "text-[#EF9F27]" : "text-white/20"}`}>{a.n}</p>
                    <p className="font-body text-[6pt] text-white/25">{a.s}</p>
                  </div>
                  {i < 2 && <span className="font-display text-[14pt] text-[#C9A84C30]">→</span>}
                </div>
              ))}
            </div>
            <p className="text-center font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/40 mt-[3mm] uppercase">
              Same infrastructure · Lower cost · Faster · Repeat
            </p>
          </div>

          {/* Revenue per artist */}
          <p className="font-mono text-[5pt] tracking-[0.2em] text-[#5DCAA5] uppercase mb-[3mm]">Each artist generates revenue for INS</p>
          <div className="grid grid-cols-4 gap-[3mm]">
            {[
              { t: "Shows in China", s: "60/30/10% revenue share" },
              { t: "Royalties + publishing", s: "China territory streams" },
              { t: "Licensing in China", s: "Gaming, brand, sync" },
              { t: "Content + merch", s: "A/V assets, brand deals" },
            ].map((r, i) => (
              <div key={i} className="border border-[#0F6E5640] rounded-[2mm] p-[3mm] bg-[#0F6E5608]">
                <p className="font-body text-[6.5pt] text-[#5DCAA5] mb-[1mm]">{r.t}</p>
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
          <h2 className="font-display text-[34pt] font-light mt-[4mm] mb-[2mm]">Let's Build</h2>
          <h2 className="font-display text-[34pt] font-light italic text-[#C9A84C] mb-[6mm]">Together</h2>

          <p className="font-body text-[9pt] text-white/35 mb-[12mm] max-w-[100mm] leading-relaxed">
            We propose a long-term partnership, not a one-night booking. If the vision aligns, let's move fast.
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
