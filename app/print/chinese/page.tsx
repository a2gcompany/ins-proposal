"use client";

import { useEffect, useRef, useState } from "react";

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
    <div className={`page relative overflow-hidden ${className}`} style={{ width: "210mm", height: "297mm", background: "#050a10", color: "#fff", fontFamily: "var(--font-cjk), var(--font-body), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif" }}>
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
      <span className="font-mono text-[5pt] tracking-[0.3em] text-white/15 uppercase">机密文件 · 2026</span>
    </div>
  );
}

function PageNum({ n }: { n: number }) {
  return <span className="absolute bottom-[6mm] right-[12mm] font-mono text-[5pt] text-white/15">{String(n).padStart(2, "0")}</span>;
}

function SectionLabel({ children, color = "#C9A84C" }: { children: string; color?: string }) {
  return <p className="font-mono text-[6pt] tracking-[0.45em] uppercase mb-[3mm]" style={{ color }}>{children}</p>;
}

function GoldLine() {
  return <div className="w-[30mm] h-[0.3mm] bg-[#C9A84C] mb-[5mm]" />;
}

export default function PrintChinesePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="print-container">
      <style jsx global>{`
        @page { size: 210mm 297mm; margin: 0; }
        @media print {
          html { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0; padding: 0; background: #050a10; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .print-container { padding: 0; }
          .page { page-break-after: always; page-break-inside: avoid; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .page:last-child { page-break-after: auto; }
          .page * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .page p, .page span, .page h1, .page h2 { word-spacing: 0.02em; letter-spacing: 0.01em; }
          .page img { image-rendering: -webkit-optimize-contrast; image-rendering: high-quality; }
          .no-print { display: none !important; }
          .gold-shimmer { color: #C9A84C !important; background: none !important; -webkit-background-clip: unset !important; -webkit-text-fill-color: #C9A84C !important; background-clip: unset !important; }
        }
        @media screen {
          .print-container { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px; background: #1a1a1a; min-height: auto; }
          .page { box-shadow: 0 8px 40px rgba(0,0,0,0.5); }
        }
        * { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .gold-shimmer { color: #C9A84C; background: none; -webkit-background-clip: unset; -webkit-text-fill-color: #C9A84C; background-clip: unset; animation: none; }
        /* CJK font overrides for Chinese PDF rendering */
        .print-container .page,
        .print-container .page * {
          font-family: var(--font-cjk), var(--font-body), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif !important;
        }
        .print-container .page .font-display {
          font-family: var(--font-cjk), var(--font-display), 'Noto Sans SC', 'PingFang SC', serif !important;
        }
        .print-container .page .font-mono {
          font-family: var(--font-mono), var(--font-cjk), 'Noto Sans SC', monospace !important;
        }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50">
        <button onClick={() => window.print()} className="bg-[#C9A84C] text-black font-mono text-xs px-4 py-2 rounded hover:bg-[#d4b55f] transition">
          打印 / 保存PDF
        </button>
      </div>

      {/* ═══ 第1页：封面 ═══ */}
      <Page>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00cfff05] via-transparent to-transparent" />
        <div className="absolute top-[8mm] left-[12mm] right-[12mm] flex justify-between items-center">
          <div className="flex items-center gap-[3mm]">
            <span className="font-display text-[11pt] font-light tracking-[0.15em] text-white">A<span className="text-[9pt] mx-[0.5mm]">2</span>G</span>
            <span className="text-white/15">|</span>
            <span className="font-display text-[11pt] font-light tracking-[0.15em] text-[#00cfff]">I N S</span>
          </div>
          <span className="font-mono text-[5pt] tracking-[0.3em] text-white/15 uppercase">机密文件 · 2026</span>
        </div>

        <div className="h-full flex flex-col justify-center px-[16mm] pt-[20mm] pb-[16mm]">
          <GoldLine />
          <h1 className="font-display text-[38pt] font-light leading-[1.08] mb-[6mm]">
            掌控舞台。
          </h1>
          <p className="font-body text-[10pt] text-[#c0c0c0] leading-relaxed max-w-[140mm] mb-[12mm]">
            开创性合作：西方制作与中国基础设施的结合。共同开发。共同拥有。长期价值。
          </p>

          <div className="flex items-center gap-[4mm] mb-[8mm]">
            <div className="flex-1 border border-[#00cfff20] rounded-[2mm] p-[5mm] bg-[#00cfff04]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff]/70 uppercase mb-[1.5mm]">INS</p>
              <p className="font-display text-[9pt] font-light text-[#d4d4d4]">场馆 · 市场推广 · 发行渠道 · 中国覆盖</p>
            </div>
            <span className="font-display text-[12pt] text-white/20">+</span>
            <div className="flex-1 border border-[#C9A84C20] rounded-[2mm] p-[5mm] bg-[#C9A84C04]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/70 uppercase mb-[1.5mm]">A2G</p>
              <p className="font-display text-[9pt] font-light text-[#d4d4d4]">制作 · 厂牌 · 内容 · 全球网络</p>
            </div>
            <span className="font-display text-[12pt] text-white/20">=</span>
            <div className="flex-1 border border-white/[0.1] rounded-[2mm] p-[5mm] bg-white/[0.03]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-white/40 uppercase mb-[1.5mm]">合作成果</p>
              <p className="font-display text-[9pt] font-light text-[#d4d4d4]">联合孵化的艺人，在演出、流媒体、授权和内容中产生共享收益</p>
            </div>
          </div>

          <div className="flex gap-[6mm] items-center">
            {[
              { v: "$85亿", l: "市场" },
              { v: "10.6%", l: "年复合增长率" },
              { v: "3", l: "位艺人" },
              { v: "2026年Q2-Q3", l: "启动" },
            ].map((k) => (
              <div key={k.l} className="flex items-baseline gap-[2mm]">
                <span className="font-display text-[12pt] font-light text-[#C9A84C]">{k.v}</span>
                <span className="font-mono text-[5pt] tracking-[0.15em] text-white/30 uppercase">{k.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[0.3mm] bg-gradient-to-r from-transparent via-[#00cfff20] to-transparent" />
        <PageNum n={1} />
      </Page>

      {/* ═══ 第2页：商业模式 ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col justify-between h-full pb-[14mm]">
          <div>
            <SectionLabel>商业模式</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[6mm]">
              一个平台。一个引擎。<br />一个<span className="gold-shimmer italic">目标</span>。
            </h2>

            <div className="flex gap-[4mm] mb-[6mm]">
              <div className="flex-1 border-t-[0.6mm] border-[#00cfff] pt-[4mm]">
                <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[3mm]">INS 提供</p>
                {["场馆及演出基础设施", "中国市场推广及平台资源", "品牌、授权及商业关系", "本地执行能力"].map((b, i) => (
                  <p key={i} className="font-body text-[8pt] text-[#b0b0b0] mb-[2mm] flex gap-[2mm]">
                    <span className="text-[#00cfff]/30 shrink-0">·</span>{b}
                  </p>
                ))}
              </div>
              <div className="flex-1 border-t-[0.6mm] border-[#C9A84C] pt-[4mm]">
                <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">A2G 交付</p>
                {["发行策略 + 已打通的发行渠道（PERSONA Records）", "国际推广 — EDMisLove（700万+粉丝）、全球网络", "制作 — 代制作、原创曲目、内容开发", "通过INSane厂牌发行音乐", "全球市场推广", "内容（每场演出的视听素材）", "独家沉浸式演出"].map((b, i) => (
                  <p key={i} className="font-body text-[8pt] text-[#b0b0b0] mb-[2mm] flex gap-[2mm]">
                    <span className="text-[#C9A84C]/30 shrink-0">·</span>{b}
                  </p>
                ))}
              </div>
              <div className="flex-1 border-t-[0.6mm] border-white/30 pt-[4mm]">
                <p className="font-mono text-[5.5pt] tracking-[0.2em] text-white/50 uppercase mb-[3mm]">共同打造</p>
                {["面向中国的艺人推广方案", "演出、发行及内容事件", "覆盖演出、版税、授权、内容的收入", "可复制的未来艺人孵化体系"].map((b, i) => (
                  <p key={i} className="font-body text-[8pt] text-[#b0b0b0] mb-[2mm] flex gap-[2mm]">
                    <span className="text-white/20 shrink-0">·</span>{b}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex gap-[4mm] mb-[4mm]">
              <div className="flex-1 border border-[#00cfff15] rounded-[2mm] p-[4mm] bg-[#00cfff03]">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff]/50 uppercase mb-[3mm] text-center">INS 生态系统</p>
                <div className="grid grid-cols-2 gap-[2mm]">
                  {[
                    { n: "HERO.COM", s: "平台" },
                    { n: "INS Shows", s: "现场演出" },
                    { n: "Hero E-Sports", s: "电竞 + 同步" },
                    { n: "INSane", s: "唱片厂牌" },
                  ].map((e) => (
                    <div key={e.n} className="border border-[#00cfff10] rounded-[1mm] px-[2mm] py-[1.5mm] bg-[#00cfff04] text-center">
                      <p className="font-mono text-[5pt] text-[#00cfff]/60 leading-tight">{e.n}</p>
                      <p className="font-mono text-[5pt] text-[#b0b0b0]">{e.s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 border border-[#C9A84C15] rounded-[2mm] p-[4mm] bg-[#C9A84C03]">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C]/50 uppercase mb-[3mm] text-center">A2G 引擎</p>
                <div className="grid grid-cols-2 gap-[2mm]">
                  {[
                    { n: "Prophecy", s: "核心艺人" },
                    { n: "AIRE", s: "DJ × VJ" },
                    { n: "PERSONA", s: "厂牌" },
                    { n: "Network", s: "国际资源" },
                  ].map((e) => (
                    <div key={e.n} className="border border-[#C9A84C10] rounded-[1mm] px-[2mm] py-[1.5mm] bg-[#C9A84C04] text-center">
                      <p className="font-mono text-[5pt] text-[#C9A84C]/60 leading-tight">{e.n}</p>
                      <p className="font-mono text-[5pt] text-[#b0b0b0]">{e.s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-[2mm]">
              <div className="flex items-end gap-[20mm]">
                <div className="w-[0.3mm] h-[5mm] bg-[#00cfff15]" />
                <div className="w-[0.3mm] h-[5mm] bg-[#C9A84C15]" />
              </div>
            </div>

            <div className="flex items-center gap-[3mm] mb-[2mm]">
              <div className="flex-1 text-right">
                <p className="font-mono text-[4pt] text-[#8a8a8a] tracking-[0.1em]">全球第5大录制音乐市场</p>
                <p className="font-mono text-[4pt] text-[#8a8a8a] tracking-[0.1em]">来源: IFPI 2026</p>
              </div>
              <div className="border-2 border-[#C9A84C50] rounded-[2mm] px-[10mm] py-[4mm] bg-[#C9A84C08] shrink-0">
                <p className="font-display text-[12pt] text-[#C9A84C] text-center">合作协议</p>
                <p className="font-mono text-[4pt] tracking-[0.15em] text-[#b0b0b0] text-center mt-[1mm]">共同开发 · 共同拥有 · 收入分成</p>
              </div>
              <div className="flex-1">
                <p className="font-mono text-[4pt] text-[#8a8a8a] tracking-[0.1em]">FIVE × Pacha: €3.025亿</p>
                <p className="font-mono text-[4pt] text-[#8a8a8a] tracking-[0.1em]">缺乏自有艺人孵化体系</p>
              </div>
            </div>

            <div className="flex justify-center mb-[2mm]">
              <div className="w-[0.3mm] h-[5mm] bg-white/[0.06]" />
            </div>

            <div className="flex justify-center mb-[4mm]">
              <div className="border border-dashed border-[#C9A84C25] rounded-[2mm] px-[12mm] py-[3mm] bg-[#C9A84C04]">
                <p className="font-display text-[9pt] text-[#C9A84C]/60 text-center tracking-wide">艺人孵化器</p>
                <p className="font-body text-[4.5pt] text-[#b0b0b0] text-center mt-[1mm]">Bj&ouml;rn → 艺人2 → 艺人3 → ∞</p>
              </div>
            </div>

            <div className="flex justify-center mb-[3mm]">
              <div className="w-[0.3mm] h-[4mm] bg-white/[0.06]" />
            </div>

            <div className="flex gap-[3mm]">
              <div className="flex-1 border border-[#00cfff10] rounded-[1.5mm] p-[3mm] bg-[#00cfff03] text-center">
                <p className="font-mono text-[5pt] text-[#00cfff]/50 mb-[1mm]">◆ 演出</p>
                <p className="font-mono text-[4pt] text-[#b0b0b0]">60% → 30% → 10%</p>
              </div>
              <div className="flex-1 border border-[#C9A84C10] rounded-[1.5mm] p-[3mm] bg-[#C9A84C03] text-center">
                <p className="font-mono text-[5pt] text-[#C9A84C]/50 mb-[1mm]">◆ 版税</p>
                <p className="font-mono text-[4pt] text-[#b0b0b0]">中国市场</p>
              </div>
              <div className="flex-1 border border-[#4ade8010] rounded-[1.5mm] p-[3mm] bg-[#4ade8003] text-center">
                <p className="font-mono text-[5pt] text-[#4ade80]/50 mb-[1mm]">◆ 授权</p>
                <p className="font-mono text-[4pt] text-[#b0b0b0]">电竞、同步、品牌</p>
              </div>
            </div>

            <p className="text-center font-mono text-[4pt] tracking-[0.15em] text-[#C9A84C]/50 uppercase mt-[3mm]">↩ 每位艺人验证模式 · 基础设施服务下一位</p>
          </div>
        </div>
        <PageNum n={2} />
      </Page>

      {/* ═══ 第3页：为何必胜 ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col justify-between h-full pb-[14mm]">
          <div>
            <SectionLabel>为何必胜</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[6mm]">
              更优模式<br />惠及<span className="gold-shimmer italic">所有人</span>。
            </h2>
          </div>

          <div className="flex gap-[4mm] mb-[6mm]">
            <div className="flex-1 border border-white/[0.06] rounded-[2mm] p-[8mm] bg-white/[0.015]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#8a8a8a] uppercase mb-[4mm]">传统演出预订模式</p>
              <div className="space-y-[4mm]">
                <p className="font-body text-[8pt] text-[#b0b0b0]">每次预订支付€1.5万-5万</p>
                <p className="font-body text-[5pt] text-white/15">↓</p>
                <p className="font-body text-[8pt] text-[#b0b0b0]">一场演出，一个夜晚</p>
                <p className="font-body text-[5pt] text-white/15">↓</p>
                <p className="font-body text-[8pt] text-white/30 italic">夜晚结束，价值归零</p>
              </div>
            </div>
            <div className="flex-1 border border-[#C9A84C30] rounded-[2mm] p-[8mm] bg-[#C9A84C06]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[4mm]">共同开发模式</p>
              <div className="space-y-[4mm]">
                <p className="font-body text-[8pt] text-[#d4d4d4]">共同投资艺人发展</p>
                <p className="font-body text-[5pt] text-[#C9A84C]/30">↓</p>
                <p className="font-body text-[8pt] text-[#d4d4d4]">打造演出、音乐、内容和知识产权</p>
                <p className="font-body text-[5pt] text-[#C9A84C]/30">↓</p>
                <p className="font-body text-[8pt] text-[#C9A84C] italic">从第一天起，拥有每条收入流的份额</p>
              </div>
            </div>
          </div>

          <div className="border border-white/[0.06] rounded-[2mm] p-[8mm] mb-[6mm] bg-white/[0.015]">
            <p className="font-mono text-[5pt] tracking-[0.3em] text-[#8a8a8a] uppercase mb-[4mm]">FIVE Holdings × Pacha 集团</p>
            <div className="flex gap-[6mm] items-baseline mb-[3mm]">
              <p className="font-display text-[24pt] font-light text-white/25">€3.025亿</p>
              <p className="font-body text-[7pt] text-[#b0b0b0]">收购价格</p>
              <p className="font-display text-[18pt] font-light text-white/15 ml-auto">$5.89亿</p>
              <p className="font-body text-[7pt] text-[#b0b0b0]">营收</p>
            </div>
            <p className="font-body text-[8pt] text-[#b0b0b0]">FIVE证明了基础设施可以规模化。但没有艺人所有权，每场演出都是租赁——而非资产。每位表演的艺人都属于别人。支付出去的演出费用无法沉淀为资产。A2G × INS的合作正是解决这一问题——共同拥有填满舞台的艺人。</p>
          </div>

          <div className="border border-[#C9A84C25] rounded-[2mm] overflow-hidden">
            <div className="flex">
              <div className="flex-1 p-[6mm] border-r border-white/[0.06]">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-white/30 uppercase mb-[3mm]">FIVE 拥有的</p>
                {["场馆", "品牌知识产权", "预订基础设施", "内容库"].map((item, i) => (
                  <p key={i} className="font-body text-[7.5pt] text-[#d4d4d4] mb-[1.5mm] flex gap-[2mm]">
                    <span className="text-white/20 shrink-0">✓</span>{item}
                  </p>
                ))}
              </div>
              <div className="flex-1 p-[6mm]">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#f87171]/60 uppercase mb-[3mm]">FIVE 缺失的</p>
                {["艺人", "音乐版权目录", "制作体系", "对自有艺人的受众忠诚度"].map((item, i) => (
                  <p key={i} className="font-body text-[7.5pt] text-[#f87171]/70 mb-[1.5mm] flex gap-[2mm]">
                    <span className="text-[#f87171]/30 shrink-0">✗</span>{item}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-[#C9A84C25] p-[5mm] bg-[#C9A84C06] flex items-center gap-[4mm]">
              <span className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase shrink-0">INS + A2G</span>
              <p className="font-body text-[7.5pt] text-[#d4d4d4]">补上缺失的一环——自有艺人、自有版权目录、自有受众。INS现有的基础设施成为推动引擎。</p>
            </div>
          </div>

          <p className="font-mono text-[4.5pt] text-[#8a8a8a] tracking-[0.1em] mt-auto">中国：全球第5大录制音乐市场。来源: IFPI 2026</p>
        </div>
        <PageNum n={3} />
      </Page>

      {/* ═══ 第4页：为何是现在 ═══ */}
      <Page>
        <Header />
        <div className="pt-[22mm] px-[16mm] flex flex-col h-full pb-[14mm]">
          <div>
            <SectionLabel color="#00cfff">时机</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1] mb-[6mm]">
              为何是<span className="italic text-[#00cfff]">现在</span>。
            </h2>
          </div>

          <div className="border border-[#00cfff15] rounded-[2mm] p-[6mm] bg-[#00cfff03] mb-[5mm]">
            <div className="flex items-baseline gap-[4mm] mb-[2mm]">
              <p className="font-display text-[24pt] font-light text-[#00cfff]">$85亿</p>
              <p className="font-body text-[8pt] text-[#b0b0b0]">2025年市场规模</p>
              <span className="text-[14pt] text-white/15 mx-[2mm]" style={{ fontFamily: "system-ui, sans-serif" }}>→</span>
              <p className="font-display text-[24pt] font-light text-[#C9A84C]">$191亿</p>
              <p className="font-body text-[8pt] text-[#b0b0b0]">2033年预测</p>
            </div>
            <p className="font-body text-[8pt] text-[#b0b0b0]">中国电子音乐市场正处于拐点。8年内年复合增长率10.6%。</p>
          </div>

          <div className="flex-1">
            {[
              { n: "01", t: "平台正在加速引入国际内容", d: "抖音、网易云音乐和QQ音乐正在积极引入国际内容。将国际艺人内容导入中国市场的基础设施已就绪——缺的是可持续的艺人供给体系。", c: "#00cfff" },
              { n: "02", t: "FIVE的空白", d: "FIVE Holdings以€3.025亿的收购证明了场馆可以规模化，但留下了巨大缺口：缺乏自有艺人孵化体系。只有场馆、没有艺人，带来的是持续成本，而不是可积累的资产。", c: "#C9A84C" },
              { n: "03", t: "先发优势", d: "率先建立共同开发艺人孵化体系的团队，将获得难以复制的竞争壁垒。", c: "#4ade80" },
              { n: "04", t: "窗口期", d: "A2G带来的合作关系、厂牌资源和制作网络现在可用——但不会永远等待。", c: "#f87171" },
              { n: "05", t: "低成本切入", d: "第1年仅需€4.25万即可测试一个可在同一基础设施上无限扩展的模式。", c: "#a78bfa" },
            ].map((r) => (
              <div key={r.n} className="flex gap-[4mm] mb-[3.5mm]">
                <span className="font-mono text-[8pt] font-medium shrink-0 w-[6mm]" style={{ color: r.c }}>{r.n}</span>
                <div>
                  <p className="font-display text-[10pt] font-light text-[#d4d4d4] mb-[1mm]">{r.t}</p>
                  <p className="font-body text-[8.5pt] text-[#c0c0c0] leading-[1.5]">{r.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 市场增长图表 */}
          <div className="border border-[#00cfff10] rounded-[2mm] p-[5mm] bg-[#00cfff02]">
            <p className="font-mono text-[5pt] tracking-[0.3em] text-[#00cfff]/40 uppercase mb-[3mm]">中国电子音乐市场 — 十亿美元</p>
            <div className="flex items-end gap-[3mm]" style={{ height: "28mm" }}>
              {[
                { year: "2021", value: 5.2, projected: false },
                { year: "2022", value: 5.7, projected: false },
                { year: "2023", value: 6.3, projected: false },
                { year: "2024", value: 7.0, projected: false },
                { year: "2025", value: 8.5, projected: false },
                { year: "2026", value: 9.4, projected: true },
                { year: "2027", value: 10.4, projected: true },
              ].map((d) => {
                const h = (d.value / 10.4) * 100;
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center gap-[1mm]">
                    <p className="font-mono text-[5pt] text-[#00cfff]/50">${d.value}B</p>
                    <div className="w-full flex items-end" style={{ height: "20mm" }}>
                      <div
                        className="w-full rounded-[0.5mm]"
                        style={{
                          height: `${h}%`,
                          background: d.projected
                            ? "linear-gradient(to top, rgba(0,207,255,0.15), rgba(0,207,255,0.05))"
                            : "linear-gradient(to top, #00cfff, rgba(0,207,255,0.5))",
                          border: d.projected ? "0.5px dashed rgba(0,207,255,0.25)" : "none",
                        }}
                      />
                    </div>
                    <p className="font-mono text-[4.5pt] text-white/25">{d.year}{d.projected ? "*" : ""}</p>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[4pt] text-white/15 mt-[2mm]">* 预测值 · 来源：Statista，IFPI全球音乐报告 2025</p>
          </div>

          <div className="border-l-[1mm] border-[#C9A84C40] pl-[5mm] py-[3mm] bg-[#C9A84C06] mt-[4mm]">
            <p className="font-display text-[9pt] italic text-[#C9A84C]/70">
              问题不是这个模式能否成功，而是谁先建立起来。
            </p>
          </div>
        </div>
        <PageNum n={4} />
      </Page>

      {/* ═══ 第5页：艺人 ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col h-full pb-[14mm]">
          <div className="mb-[5mm]">
            <SectionLabel>艺人阵容</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1]">
              三个角色。<br />一个<span className="italic text-[#00cfff]">体系</span>。
            </h2>
          </div>

          <div className="flex flex-col gap-[4mm] flex-1">
            {/* PROPHECY */}
            <div className="flex gap-[5mm] flex-1">
              <div className="rounded-[2mm] overflow-hidden bg-[#0a1020] shrink-0" style={{ width: "72mm", height: "70%" }}>
                <img src="/images/artists/prophecy.png" alt="Prophecy" className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.8) contrast(1.05)" }} />
              </div>
              <div className="flex flex-col justify-start flex-1">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[1.5mm]">核心艺人</p>
                <p className="font-display text-[16pt] font-light tracking-wide mb-[1mm]">PROPHECY</p>
                <p className="font-display text-[8.5pt] text-[#C9A84C] italic mb-[2.5mm]">打通关键渠道</p>
                <p className="font-body text-[7.5pt] text-[#b0b0b0] leading-relaxed mb-[2mm]">制作实力、国际厂牌关系、发行管线。帮助INS触达其单独难以进入的资源圈层。</p>
                <p className="font-body text-[6pt] text-[#8a8a8a] leading-relaxed">与ARTBAT、MORTEN、David Guetta、Ti&euml;sto合作制作 · 50万+月听众 · Insomniac、Spinnin&apos;/Warner、Future Rave</p>
              </div>
            </div>
            {/* AIRE */}
            <div className="flex gap-[5mm] flex-1">
              <div className="rounded-[2mm] overflow-hidden bg-[#0a1020] shrink-0" style={{ width: "72mm", height: "70%" }}>
                <img src="/images/artists/aire.png" alt="AIRE" className="w-full h-full object-cover" style={{ filter: "brightness(0.8) contrast(1.05)", transform: "scale(1.5)", transformOrigin: "center center" }} />
              </div>
              <div className="flex flex-col justify-start flex-1">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#a78bfa] uppercase mb-[1.5mm]">内容引擎</p>
                <p className="font-display text-[16pt] font-light tracking-wide mb-[1mm]">AIRE</p>
                <p className="font-display text-[8.5pt] text-[#a78bfa] italic mb-[2.5mm]">创造内容</p>
                <p className="font-body text-[7.5pt] text-[#b0b0b0] leading-relaxed mb-[2mm]">沉浸式DJ×VJ格式。每次演出产出优质视觉素材。每场演出都产生可复用的视听内容。</p>
                <p className="font-body text-[6pt] text-[#8a8a8a] leading-relaxed">Thundercode视觉（Alesso、SHM、Alan Walker）· Kuaigon混音母带（Adriatique、Vintage Culture、Fideles）</p>
              </div>
            </div>
            {/* BJÖRN */}
            <div className="flex gap-[5mm] flex-1">
              <div className="rounded-[2mm] overflow-hidden bg-[#0a1020] shrink-0" style={{ width: "72mm", height: "70%" }}>
                <img src="/images/artists/bjorn.png" alt="Björn" className="w-full h-full object-cover" style={{ filter: "brightness(0.8) contrast(1.05)", objectPosition: "20% center" }} />
              </div>
              <div className="flex flex-col justify-start flex-1">
                <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[1.5mm]">本土验证</p>
                <p className="font-display text-[16pt] font-light tracking-wide mb-[1mm]">BJ&Ouml;RN</p>
                <p className="font-display text-[8.5pt] text-[#00cfff] italic mb-[2.5mm]">验证商业模式</p>
                <p className="font-body text-[7.5pt] text-[#b0b0b0] leading-relaxed mb-[2mm]">INS的本土艺人——从本地新人到国际化定位。体系有效的证明。</p>
                <p className="font-body text-[6pt] text-[#8a8a8a] leading-relaxed">通过PERSONA Records发行 + EDMisLove推广（700万+粉丝）</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C9A84C20] pt-[3mm] mt-[4mm]">
            <p className="font-display text-[8pt] italic text-[#C9A84C]/70 text-center">
              试点成功后，同一基础设施服务于每一位后续艺人。
            </p>
          </div>
        </div>
        <PageNum n={5} />
      </Page>

      {/* ═══ 第6页：经济模型 ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col justify-between h-full pb-[12mm]">
          <div>
            <SectionLabel>经济模型</SectionLabel>
            <h2 className="font-display text-[28pt] font-light leading-[1.1] mb-[5mm]">
              收入<br /><span className="gold-shimmer italic">从何而来</span>。
            </h2>
          </div>

          <div className="flex gap-[5mm]">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-[3mm]">
                {[
                  { t: "中国演出", s: "60% → 30% → 10% INS分成每场演出费", c: "#00cfff" },
                  { t: "版税 + 出版", s: "中国市场流媒体 + 下载", c: "#C9A84C" },
                  { t: "授权", s: "电竞（Hero E-Sports）、品牌合作、同步", c: "#4ade80" },
                  { t: "内容 + 周边", s: "每场AIRE演出的视听素材", c: "#a78bfa" },
                ].map((r) => (
                  <div key={r.t} className="border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                    <span className="text-[6pt] block mb-[2mm]" style={{ color: r.c }}>◆</span>
                    <p className="font-display text-[11pt] font-light text-[#d4d4d4] mb-[2mm]">{r.t}</p>
                    <p className="font-body text-[7pt] text-[#b0b0b0] leading-relaxed">{r.s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#8a8a8a] uppercase mb-[4mm]">收入分成阶段</p>
              {[
                { n: "01", t: "回收期", s: "INS分成60%", d: "直至INS收回全部投资", c: "#00cfff" },
                { n: "02", t: "盈利期（3年）", s: "INS分成30%", d: "艺人获取多数份额，INS保留30%", c: "#C9A84C" },
                { n: "03", t: "长期", s: "INS分成10%", d: "INS保留版税至第10年", c: "#4ade80" },
              ].map((p) => (
                <div key={p.n} className="flex items-center gap-[3mm] py-[5mm] border-b border-white/[0.03]">
                  <span className="font-mono text-[9pt] font-medium w-[7mm]" style={{ color: p.c }}>{p.n}</span>
                  <span className="font-body text-[10pt] text-white w-[24mm]">{p.t}</span>
                  <div className="flex-1">
                    <span className="font-display text-[11pt] font-light block" style={{ color: p.c }}>{p.s}</span>
                    <span className="font-body text-[7pt] text-[#b0b0b0]">{p.d}</span>
                  </div>
                </div>
              ))}
              <div className="mt-auto border-l-[1mm] border-[#00cfff20] pl-[5mm] py-[4mm] bg-[#00cfff03]">
                <p className="font-body text-[8pt] text-[#b0b0b0] leading-relaxed">通过先回收后分成的结构，INS的投资风险得到有效控制。投资在艺人获取多数份额之前优先回收。</p>
              </div>
            </div>
          </div>

          {/* 财务摘要卡片 */}
          <div>
            <p className="font-mono text-[5.5pt] tracking-[0.2em] text-[#8a8a8a] uppercase mb-[4mm]">3年财务预测 — 保守模型</p>
            <div className="flex gap-[4mm] mb-[4mm]">
              {[
                { y: "第1年", rev: "\u20AC2.7万", inv: "\u20AC4.25万", ret: "\u20AC1.6万" },
                { y: "第2年", rev: "\u20AC11.75万", inv: "\u20AC6.15万", ret: "\u20AC7.1万" },
                { y: "第3年", rev: "\u20AC26.4万", inv: "\u20AC8.3万", ret: "\u20AC15.9万" },
              ].map((f) => (
                <div key={f.y} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                  <p className="font-mono text-[6pt] tracking-[0.15em] text-[#8a8a8a] uppercase mb-[3mm]">{f.y}</p>
                  <p className="font-display text-[22pt] font-light text-[#00cfff] mb-[1mm]">{f.rev}</p>
                  <p className="font-mono text-[5pt] tracking-[0.15em] text-[#00cfff]/50 uppercase mb-[4mm]">中国收入</p>
                  <div className="flex gap-[3mm]">
                    <div className="flex-1 border-l border-white/[0.08] pl-[3mm]">
                      <p className="font-display text-[11pt] font-light text-[#d4d4d4]">{f.inv}</p>
                      <p className="font-mono text-[4.5pt] tracking-[0.15em] text-[#8a8a8a] uppercase">投入金额</p>
                    </div>
                    <div className="flex-1 border-l border-[#4ade8030] pl-[3mm]">
                      <p className="font-display text-[11pt] font-light text-[#4ade80]">{f.ret}</p>
                      <p className="font-mono text-[4.5pt] tracking-[0.15em] text-[#4ade80]/50 uppercase">INS收益</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 柱状图 */}
            <div className="border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
              <div className="flex gap-[4mm] items-end" style={{ height: "38mm" }}>
                {[
                  { y: "第1年", inv: 42.5, rev: 27, ret: 16 },
                  { y: "第2年", inv: 61.5, rev: 117.5, ret: 71 },
                  { y: "第3年", inv: 83, rev: 264, ret: 159 },
                ].map((d) => (
                  <div key={d.y} className="flex-1 flex flex-col items-center">
                    <div className="flex gap-[2mm] items-end w-full justify-center" style={{ height: "32mm" }}>
                      <div className="rounded-t-[0.5mm]" style={{ width: "18%", height: `${(d.inv / 264) * 100}%`, background: "linear-gradient(180deg, #6b7280 0%, #4b5563 100%)" }} />
                      <div className="rounded-t-[0.5mm]" style={{ width: "18%", height: `${(d.rev / 264) * 100}%`, background: "linear-gradient(180deg, #22d3ee 0%, #0891b2 100%)" }} />
                      <div className="rounded-t-[0.5mm]" style={{ width: "18%", height: `${(d.ret / 264) * 100}%`, background: "linear-gradient(180deg, #4ade80 0%, #16a34a 100%)" }} />
                    </div>
                    <p className="font-mono text-[5pt] text-[#8a8a8a] mt-[2mm]">{d.y}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-[6mm] justify-center mt-[3mm] border-t border-white/[0.04] pt-[3mm]">
                {[
                  { label: "投资", color: "#6b7280" },
                  { label: "中国收入", color: "#22d3ee" },
                  { label: "INS收益", color: "#4ade80" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-[2mm]">
                    <div className="rounded-[0.5mm]" style={{ width: "3mm", height: "3mm", backgroundColor: l.color }} />
                    <p className="font-mono text-[5pt] text-[#8a8a8a]">{l.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PageNum n={6} />
      </Page>

      {/* ═══ 第7页：第1年计划 + 拓展机会 ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col justify-between h-full pb-[12mm]">
          <div className="mb-[4mm]">
            <SectionLabel color="#00cfff">第1年 · Prophecy × INS</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1]">
              第一阶段<span className="italic text-[#00cfff]">启动</span>。
            </h2>
          </div>

          <div className="flex gap-[6mm] mb-[4mm]">
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#00cfff] uppercase mb-[3mm]">我们对INS的需求</p>
              {[
                "2场Prophecy + 2场AIRE在INS场馆演出",
                "\u20AC1.3万市场推广联合投入",
                "中国市场推广负责人",
                "分发渠道：QQ音乐、网易云音乐、抖音",
                "同步/电竞渠道（Hero E-Sports）",
                "外部预订：2场Prophecy + 1场AIRE + 1场Bj\u00F6rn",
              ].map((item, i) => (
                <p key={i} className="font-body text-[8pt] text-[#d4d4d4] mb-[2.5mm] flex gap-[2mm]">
                  <span className="text-[#00cfff]/30 shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>·</span>{item}
                </p>
              ))}
            </div>
            <div className="flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">INS获得的回报</p>
              {[
                "60% INS分成直至回收",
                "4首为Bj\u00F6rn代制作的曲目（价值\u20AC1.4万等价交换）",
                "最多3首Prophecy发行于INS厂牌",
                "PERSONA Records + EDMisLove（700万+粉丝）",
                "高价值行业资源连接",
                "回收后3年30%分成，此后至第10年10%",
              ].map((item, i) => (
                <p key={i} className="font-body text-[8pt] text-[#d4d4d4] mb-[2.5mm] flex gap-[2mm]">
                  <span className="text-[#C9A84C]/30 shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>·</span>{item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-[4mm] mb-[5mm]">
            <div className="border-l-[1mm] border-[#C9A84C40] pl-[5mm] py-[3mm] bg-[#C9A84C06] shrink-0 flex flex-col justify-center">
              <p className="font-body text-[8pt] text-[#C9A84C]">INS第1年投资€4.25万</p>
              <p className="font-body text-[6pt] text-[#b0b0b0] mt-[1mm]">演出费 + 市场推广 + 内容 + 人才发掘</p>
            </div>
            <div className="border border-[#C9A84C30] rounded-[2mm] p-[4mm] bg-[#C9A84C04] flex-1">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[3mm]">第1年成功指标</p>
              <div className="grid grid-cols-3 gap-x-[4mm] gap-y-[2mm]">
                {[
                  "2场INS场馆演出 + 2场外部预订",
                  "4首代制作曲目交付",
                  "5+件可复用AIRE视听作品",
                  "\u20AC2.7万总收入（\u20AC1.6万INS份额）",
                  "QQ、网易云、抖音分发上线",
                  "为第2位艺人验证可行方案",
                ].map((c, i) => (
                  <p key={i} className="font-body text-[6.5pt] text-[#d4d4d4] flex gap-[2mm] items-start">
                    <span className="text-[#C9A84C]/50 shrink-0 text-[6pt]" style={{ fontFamily: "system-ui, sans-serif" }}>☐</span>{c}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[3mm] mb-[4mm]">
            <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <span className="font-mono text-[5pt] tracking-[0.15em] text-[#8a8a8a] uppercase shrink-0">核心合作之外</span>
            <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-[3mm] mb-[3mm]">
            {[
              { n: "01", t: "厂牌合作", tag: "PERSONA × INS厂牌", d: "联合发行体系：INS艺人通过PERSONA Records获得西方分发，A2G艺人通过EDMisLove（700万+粉丝）获得中国分发。", c: "#C9A84C" },
              { n: "02", t: "市场推广互换", tag: "互荐合作", d: "A2G的DJ营销机构 + INS的中国平台专长。双方为客户提供对方无法覆盖区域的市场推广。", c: "#00cfff" },
              { n: "03", t: "大师课与教育", tag: "内容收入", d: "PROPHECY和AIRE为校园活动、Park Coffee Club或在线课程提供大师课内容——INS作为教育中心。", c: "#a78bfa" },
            ].map((c) => (
              <div key={c.n} className="border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <div className="flex items-center gap-[2mm] mb-[3mm]">
                  <span className="font-mono text-[5.5pt] text-[#8a8a8a]">{c.n}</span>
                  <div className="h-[0.3mm] flex-1 bg-white/[0.06]" />
                </div>
                <p className="font-display text-[10pt] font-light text-[#d4d4d4] mb-[1.5mm]">{c.t}</p>
                <p className="font-mono text-[4.5pt] tracking-[0.15em] uppercase mb-[2.5mm]" style={{ color: c.c }}>{c.tag}</p>
                <p className="font-body text-[6.5pt] text-[#b0b0b0] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-[3mm]">
            {[
              { n: "04", t: "360艺人孵化器", tag: "时机成熟时", d: "所有要素就位，打造更多本地超级明星。同一基础设施、同一体系，服务于每一位后续艺人。", c: "#f97316" },
              { n: "05", t: "东南亚拓展", tag: "第2年+", d: "随着中国市场启动的艺人成长，下一步是东南亚巡演（新加坡、曼谷、首尔、巴厘岛）。INS共同投资并将收入分成扩展至东南亚及更广泛亚洲市场。", c: "#4ade80" },
            ].map((c) => (
              <div key={c.n} className="border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                <div className="flex items-center gap-[2mm] mb-[3mm]">
                  <span className="font-mono text-[5.5pt] text-[#8a8a8a]">{c.n}</span>
                  <div className="h-[0.3mm] flex-1 bg-white/[0.06]" />
                </div>
                <p className="font-display text-[10pt] font-light text-[#d4d4d4] mb-[1.5mm]">{c.t}</p>
                <p className="font-mono text-[4.5pt] tracking-[0.15em] uppercase mb-[2.5mm]" style={{ color: c.c }}>{c.tag}</p>
                <p className="font-body text-[6.5pt] text-[#b0b0b0] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
        <PageNum n={7} />
      </Page>

      {/* ═══ 第8页：合作结构 ═══ */}
      <Page>
        <Header />
        <div className="pt-[20mm] px-[14mm] flex flex-col justify-between h-full pb-[12mm]">
          <div className="mb-[5mm]">
            <SectionLabel color="#00cfff">运作方式</SectionLabel>
            <h2 className="font-display text-[26pt] font-light leading-[1.1]">
              合作<span className="italic text-[#00cfff]">结构</span>
            </h2>
          </div>

          <div className="flex gap-[4mm] mb-[6mm]">
            {[
              { n: "01", t: "初始投资", d: "INS共同投入市场推广、演出后勤、创意指导和中国市场内容。资金注入，风险从第一天起共担。", c: "#00cfff" },
              { n: "02", t: "艺人发展", d: "亚洲区域独家运营：演出、大师课、社交媒体、品牌建设及战略厂牌合作。", c: "#C9A84C" },
              { n: "03", t: "长期收入", d: "结构化3阶段中国市场收入分成：60%→30%→10% INS分成（按阶段），并拥有对艺人在贵方区域内演出安排的优先主导权。", c: "#4ade80" },
            ].map((c) => (
              <div key={c.n} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[6mm] bg-white/[0.015]">
                <div className="border border-white/[0.08] rounded-[1mm] w-[8mm] h-[8mm] flex items-center justify-center mb-[4mm]">
                  <span className="font-mono text-[6pt]" style={{ color: c.c }}>{c.n}</span>
                </div>
                <p className="font-display text-[12pt] font-light text-[#d4d4d4] mb-[3mm]">{c.t}</p>
                <p className="font-body text-[7.5pt] text-[#b0b0b0] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-[4mm] mb-[6mm]">
            <div className="flex-1 border border-[#C9A84C20] rounded-[2mm] p-[6mm] bg-[#C9A84C04]">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#C9A84C] uppercase mb-[4mm]">艺人孵化器</p>
              <div className="flex items-center justify-between mb-[4mm]">
                <div className="text-center">
                  <p className="font-display text-[11pt] text-[#C9A84C]">Bj&ouml;rn</p>
                  <p className="font-body text-[6pt] text-[#b0b0b0] mt-[1.5mm]">第1年：验证</p>
                </div>
                <span className="text-[12pt] text-[#C9A84C]/20" style={{ fontFamily: "system-ui, sans-serif" }}>→</span>
                <div className="text-center">
                  <p className="font-display text-[11pt] text-[#C9A84C]">艺人2</p>
                  <p className="font-body text-[6pt] text-[#b0b0b0] mt-[1.5mm]">第2年：扩展</p>
                </div>
                <span className="text-[12pt] text-[#C9A84C]/20" style={{ fontFamily: "system-ui, sans-serif" }}>→</span>
                <div className="text-center">
                  <p className="font-display text-[11pt] text-white/15">艺人3+</p>
                  <p className="font-body text-[6pt] text-[#b0b0b0] mt-[1.5mm]">第3年：加速</p>
                </div>
              </div>
              <div className="flex items-center gap-[3mm]">
                <div className="h-[0.3mm] flex-1 bg-[#C9A84C15]" />
                <span className="text-[4.5pt] text-[#C9A84C]/40 uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>同一基础设施 · 更低成本 · 循环复制</span>
                <div className="h-[0.3mm] flex-1 bg-[#C9A84C15]" />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <p className="font-mono text-[5pt] tracking-[0.2em] text-[#8a8a8a] uppercase mb-[4mm]">各阶段收入分配</p>
              <div className="flex gap-[3mm] flex-1 items-center">
                {[
                  { pct: 40, title: "回收期", ins: 60 },
                  { pct: 70, title: "盈利期（3年）", ins: 30 },
                  { pct: 90, title: "长期", ins: 10 },
                ].map((p) => (
                  <div key={p.title} className="flex-1 flex flex-col items-center text-center">
                    <div className="relative mb-[3mm]" style={{ width: "22mm", height: "22mm" }}>
                      <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(#22d3ee ${p.pct * 3.6}deg, #1e3a5f ${p.pct * 3.6}deg)` }} />
                      <div className="absolute rounded-full bg-[#0a1628] flex flex-col items-center justify-center" style={{ inset: "3.5mm" }}>
                        <span className="font-display text-[11pt] font-light text-[#22d3ee]">{p.pct}%</span>
                        <span className="font-mono text-[3.5pt] text-[#8a8a8a]">艺人</span>
                      </div>
                    </div>
                    <p className="font-display text-[7pt] text-[#d4d4d4] mb-[1mm]">{p.title}</p>
                    <p className="font-mono text-[4.5pt] text-[#8a8a8a]">INS {p.ins}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[5pt] tracking-[0.2em] text-[#8a8a8a] uppercase mb-[4mm]">按艺人类型划分的收入流</p>
            <div className="flex gap-[4mm]">
              {[
                {
                  header: "核心艺人：收入与推广",
                  tags: ["Bj\u00F6rn", "INS艺人2", "艺人3..."],
                  tagColor: "#00cfff",
                  desc: "INS本地艺人——由A2G制作开发，收入留在INS生态系统中",
                  items: [{ t: "演出", s: "全球" }, { t: "版税与出版", s: "全球" }, { t: "授权", s: "全球" }, { t: "独家权与控制权", s: "全球" }, { t: "全球推广", s: "全球" }],
                },
                {
                  header: "核心+A2G：收入与推广",
                  tags: ["AIRE"],
                  tagColor: "#a78bfa",
                  desc: "A2G艺人，中国收入共享——沉浸式形式产出可售内容",
                  items: [{ t: "演出（中国）", s: "中国" }, { t: "授权（中国）", s: "中国" }, { t: "独家权与控制权（中国）", s: "中国" }, { t: "版税与出版（中国）", s: "中国" }],
                },
                {
                  header: "A2G艺人：收入与推广",
                  tags: ["Prophecy"],
                  tagColor: "#C9A84C",
                  desc: "A2G核心艺人——INS提供场馆和市场推广，A2G负责全球管理。中国市场演出和市场推广共投的收入。",
                  items: [{ t: "中国市场推广", s: "中国" }, { t: "演出（INS场馆）", s: "中国" }, { t: "外部预订（经纪）", s: "中国" }, { t: "品牌激活", s: "中国" }],
                },
              ].map((col) => (
                <div key={col.header} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[5mm] bg-white/[0.015]">
                  <p className="font-mono text-[5pt] tracking-[0.15em] uppercase mb-[2.5mm]" style={{ color: col.tagColor }}>{col.header}</p>
                  <div className="flex gap-[2mm] mb-[2.5mm] flex-wrap">
                    {col.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[5pt] px-[2.5mm] py-[1mm] rounded-[0.5mm] border" style={{ color: col.tagColor, borderColor: `${col.tagColor}40`, background: `${col.tagColor}10` }}>{tag}</span>
                    ))}
                  </div>
                  <p className="font-body text-[6pt] text-[#8a8a8a] leading-relaxed mb-[3mm]">{col.desc}</p>
                  {col.items.map((item) => (
                    <div key={item.t} className="flex justify-between items-center py-[1.5mm] border-t border-white/[0.03]">
                      <span className="font-body text-[6pt] text-[#d4d4d4] flex items-center gap-[2mm]"><span style={{ color: col.tagColor, fontFamily: "system-ui, sans-serif" }}>•</span> {item.t}</span>
                      <span className="font-mono text-[4.5pt] text-[#8a8a8a]">{item.s}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <PageNum n={8} />
      </Page>

      {/* ═══ 第9页：行动号召 ═══ */}
      <Page>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00cfff03] via-transparent to-[#C9A84C05]" />
        <Header />
        <div className="h-full flex flex-col justify-between pt-[22mm] px-[16mm] pb-[14mm]">

          <div>
            <SectionLabel>下一步</SectionLabel>
            <h2 className="font-display text-[24pt] font-light leading-[1.1] mb-[8mm]">
              接下来<span className="gold-shimmer italic">如何推进</span>。
            </h2>

            <div className="flex gap-[4mm] mb-[8mm]">
              {[
                { n: "1", t: "确认试点范围", d: "商定第1年重点：Prophecy为核心艺人，Björn为本地案例，AIRE为内容引擎" },
                { n: "2", t: "确认经济条款", d: "敲定预算、交付成果、回收机制、收入分成结构" },
                { n: "3", t: "启动第一个周期", d: "设定时间线，激活中国市场推广，启动艺人在中国市场的影响力建设" },
              ].map((s) => (
                <div key={s.n} className="flex-1 border border-white/[0.06] rounded-[2mm] p-[6mm] bg-white/[0.015]">
                  <p className="font-display text-[20pt] font-light text-[#C9A84C]/30 mb-[3mm]">{s.n}</p>
                  <p className="font-display text-[11pt] text-[#d4d4d4] mb-[2mm]">{s.t}</p>
                  <p className="font-body text-[7pt] text-[#b0b0b0] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-[3mm] mb-[6mm]">
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-[#00cfff20] via-[#C9A84C20] to-[#4ade8020]" />
              <span className="font-mono text-[4.5pt] tracking-[0.15em] text-[#8a8a8a] uppercase shrink-0">目标：首场演出 2026年Q2-Q3</span>
              <div className="h-[0.3mm] flex-1 bg-gradient-to-r from-[#4ade8020] via-[#C9A84C20] to-[#00cfff20]" />
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <GoldLine />
            <h2 className="font-display text-[34pt] font-light mt-[3mm] mb-[2mm]">您建造了舞台。</h2>
            <h2 className="font-display text-[34pt] font-light italic text-[#C9A84C] mb-[8mm]">让我们一起填满它。</h2>

            <p className="font-body text-[11pt] text-white mb-[1mm]">Aitzol Arevalo G&oacute;mez</p>
            <p className="font-body text-[7pt] text-[#b0b0b0] mb-[3mm]">A2G Company FZCO · 阿联酋迪拜</p>
            <p className="font-body text-[9pt] text-[#00cfff] mb-[8mm]">a.arevalo@a2g.company</p>

            <QRCode />
            <p className="font-mono text-[5pt] text-[#b0b0b0] mt-[2mm]">查看完整交互式提案</p>
            <p className="font-mono text-[4.5pt] text-[#8a8a8a] mt-[0.5mm]">ins-proposal.vercel.app</p>
          </div>

          <div className="text-center">
            <p className="font-display text-[9pt] italic text-[#C9A84C]/50 max-w-[140mm] leading-relaxed mx-auto mb-[6mm]">
              试点成功后，INS不仅仅是在承接艺人演出，而是开始创造艺人价值。
            </p>

            <div className="flex items-center justify-center gap-[3mm]">
              <span className="font-mono text-[7pt] tracking-[0.2em] text-white/20">A2G</span>
              <span className="text-white/10">|</span>
              <span className="font-mono text-[7pt] tracking-[0.2em] text-[#00cfff]/20">INS</span>
            </div>
          </div>
        </div>
        <PageNum n={9} />
      </Page>
    </div>
  );
}
