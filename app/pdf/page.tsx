"use client";

import { useRef } from "react";

export default function PdfPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #1a1a1a;
          font-family: 'Inter', sans-serif;
        }

        .print-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: flex-end;
        }

        .print-btn {
          background: #00cfff;
          color: #000;
          border: none;
          padding: 10px 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
        }

        .edit-note {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
          text-align: right;
          max-width: 200px;
          line-height: 1.5;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          padding: 18mm 20mm;
          background: #050a10;
          color: #fff;
          margin: 20px auto;
          position: relative;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        [contenteditable="true"]:hover {
          outline: 1px dashed rgba(0,207,255,0.3);
          cursor: text;
        }
        [contenteditable="true"]:focus {
          outline: 1px solid rgba(0,207,255,0.6);
        }

        /* Typography */
        .mono { font-family: 'JetBrains Mono', monospace; }
        .serif { font-family: 'Cormorant Garamond', serif; }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #f59e0b;
          opacity: 0.7;
          margin-bottom: 10px;
        }

        .cyan { color: #00cfff; }
        .gold { color: #f59e0b; }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .logo {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.6);
        }

        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        /* Cover section */
        h1 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 38px;
          line-height: 1.1;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 20px;
        }

        /* Stats row */
        .stats-row {
          display: flex;
          gap: 40px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stat-big {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 36px;
          line-height: 1;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-top: 4px;
        }

        /* Deal structure */
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 22px;
          margin-bottom: 12px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card {
          border: 1px solid rgba(245,158,11,0.08);
          background: rgba(6,12,20,0.8);
          padding: 14px;
        }

        .card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 3px;
          margin-bottom: 6px;
        }

        .card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 400;
          margin-bottom: 5px;
        }

        .card p {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          line-height: 1.5;
        }

        /* Financials */
        .fin-card {
          border: 1px solid rgba(0,207,255,0.1);
          background: rgba(0,207,255,0.03);
          padding: 14px;
          text-align: center;
        }

        .fin-year {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.25);
          margin-bottom: 6px;
        }

        .fin-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 32px;
          color: #00cfff;
          line-height: 1;
        }

        .fin-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.2);
          margin-top: 4px;
        }

        .fin-sub {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .fin-sub span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
        }

        /* Artists */
        .artist-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .artist-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          min-width: 140px;
        }

        .badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 3px 8px;
          border: 1px solid;
          margin-right: 4px;
        }

        .badge-cyan { color: #00cfff; border-color: rgba(0,207,255,0.3); background: rgba(0,207,255,0.06); }
        .badge-gold { color: #f59e0b; border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.06); }

        .artist-meta {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          line-height: 1.5;
        }

        /* Revenue phases */
        .phase-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .phase-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8px;
          color: rgba(255,255,255,0.15);
          min-width: 20px;
        }

        .phase-title {
          font-size: 12px;
          font-weight: 500;
          min-width: 180px;
        }

        .phase-split {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #f59e0b;
          min-width: 80px;
        }

        .phase-desc {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          line-height: 1.4;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 20px 0;
          border-top: 1px solid rgba(245,158,11,0.15);
          margin-top: 16px;
        }

        .cta-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 30px;
          margin-bottom: 6px;
        }

        .cta-email {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
        }

        /* Footer */
        .page-footer {
          position: absolute;
          bottom: 14mm;
          left: 20mm;
          right: 20mm;
          display: flex;
          justify-content: space-between;
        }

        .page-footer span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 6px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.12);
          text-transform: uppercase;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(245,158,11,0.2), transparent);
          margin: 14px 0;
        }

        /* Print */
        @media print {
          body { background: #050a10; }
          .print-controls { display: none !important; }
          .page { margin: 0; page-break-after: always; }
          [contenteditable="true"]:hover,
          [contenteditable="true"]:focus {
            outline: none !important;
          }
        }
      `}</style>

      {/* Controls */}
      <div className="print-controls">
        <button className="print-btn" onClick={() => window.print()}>
          ⬇ Save as PDF
        </button>
        <p className="edit-note">
          Click any text to edit it.<br />
          Then save as PDF.
        </p>
      </div>

      <div ref={contentRef}>

        {/* ── PAGE 1 ── */}
        <div className="page">
          <div className="header">
            <div className="logo">A <sub style={{fontSize:'9px'}}>2</sub>G &nbsp;<span style={{color:'rgba(255,255,255,0.15)'}}>|</span>&nbsp; <span style={{color:'#00cfff'}}>I N S</span></div>
            <div className="tag">Private Proposal · 2026</div>
          </div>

          {/* Cover */}
          <p className="eyebrow">Strategic Partnership Proposal</p>
          <h1>
            Co-Building the Future of<br />
            Music in <span className="cyan">China</span>
          </h1>
          <p className="subtitle" contentEditable suppressContentEditableWarning>
            A first-of-its-kind co-development model — transforming Western artist booking into long-term shared ownership in the Chinese market.
          </p>

          <div className="stats-row">
            <div>
              <p className="stat-big cyan" contentEditable suppressContentEditableWarning>$8.5B</p>
              <p className="stat-label">China Electronic Music Market</p>
            </div>
            <div>
              <p className="stat-big" style={{color:'rgba(255,255,255,0.5)'}} contentEditable suppressContentEditableWarning>10.6%</p>
              <p className="stat-label">Annual Growth (CAGR)</p>
            </div>
            <div>
              <p className="stat-big gold" contentEditable suppressContentEditableWarning>3</p>
              <p className="stat-label">Artists · Year 1</p>
            </div>
            <div>
              <p className="stat-big" style={{color:'rgba(255,255,255,0.5)'}} contentEditable suppressContentEditableWarning>April 2026</p>
              <p className="stat-label">First Shows</p>
            </div>
          </div>

          {/* Deal structure */}
          <p className="eyebrow">How It Works</p>
          <p className="section-title" style={{marginBottom:'12px'}}>The Structure</p>

          <div className="grid-3">
            <div className="card">
              <div className="card-num">01</div>
              <h3>Initial Investment</h3>
              <p contentEditable suppressContentEditableWarning>INS co-funds marketing, live logistics, creative direction and content. Capital flows in, risk is shared from day one.</p>
            </div>
            <div className="card">
              <div className="card-num">02</div>
              <h3>Artist Development</h3>
              <p contentEditable suppressContentEditableWarning>Exclusive Asia territory: shows, masterclasses, social media, brand-building, and strategic label collaborations.</p>
            </div>
            <div className="card">
              <div className="card-num">03</div>
              <h3>Long-term Revenue</h3>
              <p contentEditable suppressContentEditableWarning>3-phase revenue share on China territory: 60/40 until recovery, 30/70 for 3 years, then 10% INS royalty up to year 10.</p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Revenue phases */}
          <p className="eyebrow">Revenue Share Phases</p>
          <div className="phase-row">
            <span className="phase-num">01</span>
            <span className="phase-title">Recovery Phase</span>
            <span className="phase-split" contentEditable suppressContentEditableWarning>60% INS · 40% Artist</span>
            <span className="phase-desc" contentEditable suppressContentEditableWarning>Until INS recoups full investment from China territory revenues</span>
          </div>
          <div className="phase-row">
            <span className="phase-num">02</span>
            <span className="phase-title">Profit Phase (3 yr)</span>
            <span className="phase-split" contentEditable suppressContentEditableWarning>30% INS · 70% Artist</span>
            <span className="phase-desc" contentEditable suppressContentEditableWarning>3 years post-recovery — artist takes majority, INS retains 30%</span>
          </div>
          <div className="phase-row">
            <span className="phase-num">03</span>
            <span className="phase-title">Long-term (up to 10 yr)</span>
            <span className="phase-split" contentEditable suppressContentEditableWarning>10% INS · 90% Artist</span>
            <span className="phase-desc" contentEditable suppressContentEditableWarning>INS retains 10% royalty on all China territory revenues up to year 10</span>
          </div>

          <div className="divider"></div>

          {/* Financials */}
          <p className="eyebrow">3-Year Financial Projection — Conservative Model</p>
          <div className="grid-3" style={{marginTop:'10px'}}>
            <div className="fin-card">
              <p className="fin-year">Year 1</p>
              <p className="fin-num" contentEditable suppressContentEditableWarning>€44K</p>
              <p className="fin-label">China Revenue</p>
              <div className="fin-sub">
                <span style={{color:'rgba(255,255,255,0.35)'}} contentEditable suppressContentEditableWarning>€54K invested</span>
                <span style={{color:'#34d399'}} contentEditable suppressContentEditableWarning>€24K return</span>
              </div>
            </div>
            <div className="fin-card">
              <p className="fin-year">Year 2</p>
              <p className="fin-num" contentEditable suppressContentEditableWarning>€179K</p>
              <p className="fin-label">China Revenue</p>
              <div className="fin-sub">
                <span style={{color:'rgba(255,255,255,0.35)'}} contentEditable suppressContentEditableWarning>€77K invested</span>
                <span style={{color:'#34d399'}} contentEditable suppressContentEditableWarning>€53K return</span>
              </div>
            </div>
            <div className="fin-card">
              <p className="fin-year">Year 3</p>
              <p className="fin-num" contentEditable suppressContentEditableWarning>€525K</p>
              <p className="fin-label">China Revenue</p>
              <div className="fin-sub">
                <span style={{color:'rgba(255,255,255,0.35)'}} contentEditable suppressContentEditableWarning>€122K invested</span>
                <span style={{color:'#34d399'}} contentEditable suppressContentEditableWarning>€158K return</span>
              </div>
            </div>
          </div>

          <div className="page-footer">
            <span>A2G × INS · Partnership Proposal · Confidential</span>
            <span>01</span>
          </div>
        </div>

        {/* ── PAGE 2 ── */}
        <div className="page">
          <div className="header">
            <div className="logo">A <sub style={{fontSize:'9px'}}>2</sub>G &nbsp;<span style={{color:'rgba(255,255,255,0.15)'}}>|</span>&nbsp; <span style={{color:'#00cfff'}}>I N S</span></div>
            <div className="tag">The Artists · A2G Company</div>
          </div>

          {/* Artists */}
          <p className="eyebrow">The Artists</p>
          <p className="section-title">Western Talent, Built for Asia</p>

          <div className="artist-row">
            <div className="artist-name">PROPHECY</div>
            <div style={{flex:1}}>
              <div style={{marginBottom:'4px'}}>
                <span className="badge badge-cyan">Melodic Techno</span>
                <span className="badge badge-gold">Spain</span>
              </div>
              <p className="artist-meta" contentEditable suppressContentEditableWarning>
                Co-produced with Anyma, MORTEN, David Guetta & Tiësto. HOLLOW feat. Prophecy on Insomniac Records. Label ecosystem: Insomniac · Spinnin&apos;/Warner · Future Rave. 300K+ Spotify monthly listeners.
              </p>
            </div>
          </div>

          <div className="artist-row">
            <div className="artist-name">AIRE</div>
            <div style={{flex:1}}>
              <div style={{marginBottom:'4px'}}>
                <span className="badge badge-cyan">DJ × VJ Live Act</span>
                <span className="badge badge-gold">Spain</span>
              </div>
              <p className="artist-meta" contentEditable suppressContentEditableWarning>
                Immersive dual format: synchronized live music + real-time visual performance by Thundercode. Every show produces sellable A/V content. Purpose-built for Asian rave culture and brand activations.
              </p>
            </div>
          </div>

          <div className="artist-row" style={{borderBottom:'none'}}>
            <div className="artist-name">BJÖRN</div>
            <div style={{flex:1}}>
              <div style={{marginBottom:'4px'}}>
                <span className="badge badge-cyan">Electronic</span>
                <span className="badge badge-gold">INS Local</span>
              </div>
              <p className="artist-meta" contentEditable suppressContentEditableWarning>
                INS&apos;s homegrown artist — the internal success story. A2G brings Western production network, co-production credits, and label pitches. The partnership&apos;s clearest proof of concept.
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {/* About A2G */}
          <p className="eyebrow">About A2G Company</p>
          <p className="section-title">Who We Are</p>
          <p className="subtitle" style={{marginBottom:'16px'}} contentEditable suppressContentEditableWarning>
            Dubai-based music and technology holding. We develop artists, platforms, and IP — as a co-building partner that takes long-term equity positions in talent.
          </p>

          <div style={{display:'flex', gap:'32px', marginBottom:'16px'}}>
            {[
              {n:'4', l:'Artists Managed'},
              {n:'8', l:'Active Businesses'},
              {n:'Dubai', l:'HQ, UAE (FZCO)'},
              {n:'5', l:'Major Label Families'},
            ].map(s => (
              <div key={s.l} style={{textAlign:'center'}}>
                <p className="stat-big" style={{fontSize:'28px', color:'rgba(255,255,255,0.6)'}} contentEditable suppressContentEditableWarning>{s.n}</p>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </div>

          <p className="eyebrow">Artist Roster</p>
          <div className="grid-2" style={{gap:'8px', marginBottom:'16px'}}>
            {[
              {a:'Roger Sanchez', n:'House legend · Grammy · 25+ years'},
              {a:'PROPHECY', n:"Insomniac · Spinnin'/Warner · 300K+ listeners"},
              {a:'AIRE', n:'DJ×VJ Live Act · Thundercode'},
              {a:'BABEL Music', n:'Melodic electronic · Tomorrowland'},
            ].map(r => (
              <div key={r.a} style={{display:'flex', alignItems:'baseline', gap:'12px', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:'18px', fontWeight:300, minWidth:'140px'}}>{r.a}</span>
                <span style={{fontSize:'10px', color:'rgba(255,255,255,0.3)'}} contentEditable suppressContentEditableWarning>{r.n}</span>
              </div>
            ))}
          </div>

          <p style={{fontFamily:'JetBrains Mono, monospace', fontSize:'8px', color:'rgba(255,255,255,0.2)', letterSpacing:'1px', marginBottom:'4px'}}>
            LABEL TRACK RECORD
          </p>
          <p style={{fontSize:'10px', color:'rgba(255,255,255,0.3)'}} contentEditable suppressContentEditableWarning>
            Insomniac Records · Spinnin&apos; / Warner Music · Future Rave · HILOMATIK (HI-LO) · CR2 Records · Persona Records
          </p>

          {/* CTA */}
          <div className="cta-section">
            <p className="eyebrow" style={{marginBottom:'8px'}}>Ready to Build?</p>
            <h2>Let&apos;s Build <span className="gold">Together</span></h2>
            <p className="cta-email" style={{marginTop:'8px'}} contentEditable suppressContentEditableWarning>aitzolarev@gmail.com</p>
            <p style={{fontFamily:'JetBrains Mono, monospace', fontSize:'8px', color:'rgba(255,255,255,0.15)', letterSpacing:'2px', marginTop:'12px'}}>ins.a2g.company</p>
          </div>

          <div className="page-footer">
            <span>A2G Company FZCO · Dubai</span>
            <span>02</span>
          </div>
        </div>

      </div>
    </>
  );
}
