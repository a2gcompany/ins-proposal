"use client";

import { useState, useEffect } from "react";
import { DEFAULT_DATA, loadData, saveData, resetData, type ProposalData } from "../lib/data";

const PILLAR_COLORS = ["#00cfff", "#7dd3fc", "#38bdf8"];
const YEAR_LABELS = ["Year 1", "Year 2", "Year 3"];

export default function AdminPage() {
  const [data, setData] = useState<ProposalData>(DEFAULT_DATA);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"financials" | "hero" | "revenue" | "investment">("financials");

  useEffect(() => {
    setData(loadData());
  }, []);

  function handleSave() {
    saveData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (confirm("Reset all data to defaults?")) {
      resetData();
      setData(DEFAULT_DATA);
    }
  }

  function setNum(path: string[], value: number) {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
      obj[path[path.length - 1]] = value;
      return next;
    });
  }

  function setText(path: string[], value: string) {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
      obj[path[path.length - 1]] = value;
      return next;
    });
  }

  const inputCls = "bg-[#0a1018] border border-white/10 text-white font-mono text-sm px-3 py-2 rounded-sm w-full focus:outline-none focus:border-gold/40 transition-colors";
  const labelCls = "font-mono text-[9px] tracking-[0.35em] text-white/30 uppercase mb-1 block";

  return (
    <main className="bg-[#050a10] text-white min-h-screen px-8 py-10">
      <style>{`
        body { background: #050a10; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.3; }
        .gold { color: #00cfff; }
      `}</style>

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase mb-2">A2G × INS — Internal</p>
            <h1 className="font-serif text-3xl font-light text-white">Proposal Editor</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 hover:text-white/50 border border-white/10 px-4 py-2.5 transition-colors"
            >
              Reset defaults
            </button>
            <button
              onClick={handleSave}
              className="font-mono text-[9px] tracking-[0.35em] uppercase px-6 py-2.5 transition-all border"
              style={{
                background: saved ? "rgba(52,211,153,0.1)" : "rgba(0,207,255,0.08)",
                borderColor: saved ? "rgba(52,211,153,0.4)" : "rgba(0,207,255,0.3)",
                color: saved ? "#34d399" : "#00cfff",
                textShadow: saved ? "none" : "0 0 10px rgba(0,207,255,0.4)",
              }}
            >
              {saved ? "✓ Saved" : "Save changes"}
            </button>
          </div>
        </div>
        <p className="font-mono text-[9px] text-white/20 mt-3">
          Changes save to this browser. Open{" "}
          <a href="/" target="_blank" className="text-white/40 hover:text-white/70 underline">ins.a2g.company</a>
          {" "}to preview.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-0 mb-0 border-b border-white/[0.06]">
          {(["financials", "revenue", "investment", "hero"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-mono text-[9px] tracking-[0.35em] uppercase transition-all border-t border-l border-r ${
                activeTab === tab
                  ? "text-white/80 border-white/15 bg-[#060c14] -mb-px"
                  : "text-white/20 border-transparent hover:text-white/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-[#060c14] border border-gold/[0.06] border-t-0 p-8">

          {/* ── FINANCIALS TAB ── */}
          {activeTab === "financials" && (
            <div className="space-y-10">
              <div>
                <p className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase mb-1">Market stat</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className={labelCls}>Market size value</label>
                    <input
                      className={inputCls}
                      value={data.market.size}
                      onChange={(e) => setText(["market", "size"], e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Subtitle</label>
                    <input
                      className={inputCls}
                      value={data.market.sizeSub}
                      onChange={(e) => setText(["market", "sizeSub"], e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.05] pt-8">
                <p className="font-mono text-[8px] text-white/15">Combined totals (revenue, investment, INS return, cumulative) are auto-calculated from line items on the main page.</p>
              </div>
            </div>
          )}

          {/* ── REVENUE TAB ── */}
          {activeTab === "revenue" && (
            <div className="space-y-10">
              {data.revenueDetail.map((pillar, pi) => (
                <div key={pillar.pillar}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-2 rounded-full" style={{ background: PILLAR_COLORS[pi] }} />
                    <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: PILLAR_COLORS[pi] }}>{pillar.pillar}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {pillar.years.map((yr, yi) => {
                      const yrTotal = yr.lines.reduce((s, l) => s + l.v, 0);
                      return (
                      <div key={yi} className="bg-[#0a1018] p-5 border border-white/[0.04]">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-mono text-[9px] text-white/25 uppercase tracking-wider">{YEAR_LABELS[yi]}</p>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-[8px] text-white/20">Total €</span>
                            <span className="font-mono text-sm text-white/70 w-16 text-right">{yrTotal}</span>
                            <span className="font-mono text-[8px] text-white/20">K</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {yr.lines.map((line, li) => (
                            <div key={li} className="flex items-center gap-2">
                              <input
                                className="bg-[#060c14] border border-white/[0.06] text-white/50 font-mono text-[10px] px-2 py-1.5 flex-1 focus:outline-none focus:border-white/20 min-w-0"
                                value={line.l}
                                onChange={(e) => setText(["revenueDetail", String(pi), "years", String(yi), "lines", String(li), "l"], e.target.value)}
                              />
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="font-mono text-[8px] text-white/20">€</span>
                                <input
                                  type="number"
                                  className="bg-[#060c14] border border-white/[0.06] text-white/70 font-mono text-[10px] px-2 py-1.5 w-14 text-right focus:outline-none focus:border-white/20"
                                  value={line.v}
                                  onChange={(e) => setNum(["revenueDetail", String(pi), "years", String(yi), "lines", String(li), "v"], parseFloat(e.target.value))}
                                />
                                <span className="font-mono text-[8px] text-white/20">K</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="font-mono text-[8px] text-white/20">INS %</span>
                          <input
                            type="number"
                            className="bg-[#060c14] border border-white/[0.06] text-emerald-400/60 font-mono text-[10px] px-2 py-1 w-14 focus:outline-none"
                            value={pillar.insShare[yi]}
                            onChange={(e) => setNum(["revenueDetail", String(pi), "insShare", String(yi)], parseFloat(e.target.value))}
                          />
                        </div>
                      </div>
                    );})}
                  </div>
                  {pi < data.revenueDetail.length - 1 && <div className="border-b border-white/[0.04] mt-8" />}
                </div>
              ))}
            </div>
          )}

          {/* ── INVESTMENT TAB ── */}
          {activeTab === "investment" && (
            <div className="space-y-10">
              {data.investmentDetail.map((pillar, pi) => (
                <div key={pillar.pillar}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-2 rounded-full" style={{ background: PILLAR_COLORS[pi] }} />
                    <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: PILLAR_COLORS[pi] }}>{pillar.pillar}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {pillar.years.map((yr, yi) => {
                      const yrTotal = yr.lines.reduce((s, l) => s + l.v, 0);
                      return (
                      <div key={yi} className="bg-[#0a1018] p-5 border border-white/[0.04]">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-mono text-[9px] text-white/25 uppercase tracking-wider">{YEAR_LABELS[yi]}</p>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-[8px] text-white/20">Total €</span>
                            <span className="font-mono text-sm text-white/70 w-16 text-right">{yrTotal}</span>
                            <span className="font-mono text-[8px] text-white/20">K</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {yr.lines.map((line, li) => (
                            <div key={li} className="flex items-center gap-2">
                              <input
                                className="bg-[#060c14] border border-white/[0.06] text-white/50 font-mono text-[10px] px-2 py-1.5 flex-1 focus:outline-none focus:border-white/20 min-w-0"
                                value={line.l}
                                onChange={(e) => setText(["investmentDetail", String(pi), "years", String(yi), "lines", String(li), "l"], e.target.value)}
                              />
                              <div className="flex items-center gap-1 shrink-0">
                                <span className="font-mono text-[8px] text-white/20">€</span>
                                <input
                                  type="number"
                                  className="bg-[#060c14] border border-white/[0.06] text-white/70 font-mono text-[10px] px-2 py-1.5 w-14 text-right focus:outline-none focus:border-white/20"
                                  value={line.v}
                                  onChange={(e) => setNum(["investmentDetail", String(pi), "years", String(yi), "lines", String(li), "v"], parseFloat(e.target.value))}
                                />
                                <span className="font-mono text-[8px] text-white/20">K</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );})}
                  </div>
                  {pi < data.investmentDetail.length - 1 && <div className="border-b border-white/[0.04] mt-8" />}
                </div>
              ))}
            </div>
          )}

          {/* ── HERO TAB ── */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div>
                <label className={labelCls}>Hero subtitle</label>
                <textarea
                  className={inputCls + " h-20 resize-none"}
                  value={data.hero.subtitle}
                  onChange={(e) => setText(["hero", "subtitle"], e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {(["why", "what", "when", "how"] as const).map((key) => (
                  <div key={key} className="bg-[#0a1018] p-5 border border-white/[0.04]">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">{key}</p>
                    <div className="space-y-2">
                      <div>
                        <label className={labelCls}>Primary line</label>
                        <input
                          className={inputCls}
                          value={data.hero[`${key}A` as keyof typeof data.hero]}
                          onChange={(e) => setText(["hero", `${key}A`], e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Secondary line</label>
                        <input
                          className={inputCls}
                          value={data.hero[`${key}B` as keyof typeof data.hero]}
                          onChange={(e) => setText(["hero", `${key}B`], e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer save */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <p className="font-mono text-[9px] text-white/15">Changes only apply in this browser via localStorage</p>
          <button
            onClick={handleSave}
            className="font-mono text-[9px] tracking-[0.35em] uppercase px-6 py-3 border transition-all"
            style={{
              background: saved ? "rgba(52,211,153,0.1)" : "rgba(0,207,255,0.08)",
              borderColor: saved ? "rgba(52,211,153,0.4)" : "rgba(0,207,255,0.3)",
              color: saved ? "#34d399" : "#00cfff",
            }}
          >
            {saved ? "✓ Saved" : "Save changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
