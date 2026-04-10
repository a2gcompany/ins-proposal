// ─────────────────────────────────────────────────────────────────────────────
// PROPOSAL DATA — single source of truth
// Edit here OR via /admin (saves to localStorage)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_DATA = {
  // ── HERO ────────────────────────────────────────────────────────────────────
  hero: {
    title: "Own the show.",
    subtitle: "A first-of-its-kind partnership: Western production meets Chinese infrastructure. Co-development. Co-ownership. Long-term value.",
    whyA: "$8.5B market growing 10.6%/yr.",
    whyB: "No Western artist pipeline into China exists yet.",
    whatA: "Co-development, co-ownership.",
    whatB: "3 artists + INS infrastructure = shared equity from day one.",
    whenA: "Shanghai — Q2–Q3 2026.",
    whenB: "First shows live. Revenue generation from Q3.",
    howA: "INS co-funds. A2G activates.",
    howB: "Structured revenue split for up to 10 years.",
  },

  // ── MARKET ──────────────────────────────────────────────────────────────────
  market: {
    size: "$8.5B",
    sizeLabel: "China Electronic Music Market",
    sizeSub: "2025 market size — projected to reach $19.1B by 2033 (10.6% CAGR)",
  },

  // ── ARTISTS ──────────────────────────────────────────────────────────────────
  artists: [
    {
      id: "prophecy",
      name: "PROPHECY",
      genre: "Melodic Techno",
      origin: "Spain",
      image: "/images/artists/prophecy.png",
      ig: "https://www.instagram.com/prophecylive/",
      igHandle: "@prophecylive",
      tagline: "Co-produced with the global A-list — ready to conquer China.",
      collabs: ["Anyma", "MORTEN", "David Guetta", "Tiësto", "ARTBAT"],
      highlights: [
        "Co-produced tracks with Anyma, MORTEN, David Guetta and Tiësto — charted across Beatport, Spotify & SiriusXM",
        "HOLLOW feat. Prophecy (ARTBAT × MORTEN) — Insomniac Records — active global campaign, Tier-1 label exposure",
        "Label ecosystem: Insomniac · Spinnin'/Warner · Future Rave — 3 major label families, one artist",
        "500K+ Spotify monthly listeners · 500K+ YouTube views · Active Beatport catalog",
      ],
    },
    {
      id: "aire",
      name: "AIRE",
      genre: "DJ × VJ Live Act",
      origin: "Spain",
      image: "/images/artists/aire.png",
      ig: "https://www.instagram.com/aire_ofc/",
      igHandle: "@aire_ofc",
      tagline: "The immersive show format the Asian market is missing.",
      collabs: ["Thundercode", "Kuaigon"],
      highlights: [
        "Collaborating with Thundercode (@thundercode) — visual directors behind Alesso, Swedish House Mafia, Alan Walker",
        "Working with Kuaigon — mix & master engineers for Adriatique, Vintage Culture, Fideles, Rufus du Sol",
        "Unique DJ × VJ format: synchronized live music + real-time visual performance — purpose-built for Asian rave culture",
        "Every show produces sellable A/V content: streaming rights, sync licensing, brand placement — INS venues are the perfect stage",
      ],
    },
    {
      id: "bjorn",
      name: "BJÖRN",
      genre: "Electronic",
      origin: "INS Local Artist",
      image: "/images/artists/bjorn.png",
      ig: "https://www.instagram.com/beyondyoung.wav/",
      igHandle: "@beyondyoung.wav",
      tagline: "INS's own talent — built for an international arc.",
      collabs: [] as string[],
      highlights: [
        "INS's homegrown artist — the proof of concept for the co-development model. From local act to internationally positioned name, using A2G's production network and label connections",
        "Guaranteed release path through PERSONA Records + promotion via EDMisLove (7M+ followers). No dependency on external label timelines.",
        "Prophecy and AIRE activate the stages — BJÖRN builds his audience on the same nights, in the same rooms",
        "Target label placement: Insomniac, Future Rave, Spinnin' — channels opened by Prophecy's existing relationships",
        "The partnership's clearest proof of concept — a Chinese artist reaching Western audiences through A2G infrastructure",
      ],
    },
  ],

  // ── DEAL PHASES ───────────────────────────────────────────────────────────────
  phases: [
    { num: "01", title: "Initial Investment", body: "INS co-funds marketing, live logistics, creative direction and content for the Chinese market. Capital flows in, risk is shared from day one." },
    { num: "02", title: "Artist Development", body: "Exclusive Asia territory activation: shows, masterclasses, social media, brand-building, and strategic label collaborations." },
    { num: "03", title: "Long-term Revenue", body: "Structured 3-phase revenue share on China territory: 60% \u2192 30% \u2192 10% INS share (by phase), plus control over where and when artists play in your territory \u2014 from day one." },
  ],

  // ── REVENUE SOURCES ───────────────────────────────────────────────────────────
  revenueSources: [
    { source: "Live Shows", desc: "External bookings (non-INS venues): INS takes % of net artist fee. As artist profile grows, so does the fee — and INS's share." },
    { source: "Streaming", desc: "China-territory distribution (QQ Music, NetEase, Douyin). INS builds the infrastructure, then earns % on every stream." },
    { source: "Gaming & Sync", desc: "INS's gaming division is a direct channel: in-game music, brand collabs, advertising placements — all split at the agreed rate." },
    { source: "Ghost Production", desc: "Prophecy produces tracks for INS artists (4 tracks Year 1, scaling to 8 by Year 3). Market value: \u20AC3,500/track. INS pays Prophecy show fees at INS venues; Prophecy delivers ghost production in return. The value trade generates \u20AC63K in production value over 3 years \u2014 not counted in the cash return." },
    { source: "Merchandise", desc: "Artist merch through INS retail and online channels. Aspirational — scales with audience." },
    { source: "Content Licensing", desc: "AIRE A/V sets, masterclass content, DJ sets — sellable media assets produced on every activation." },
  ],

  // ── ROADMAP ───────────────────────────────────────────────────────────────────
  roadmap: [
    {
      year: "Year 1", title: "Establishment", subtitle: "Build the foundation. First shows, first tracks, first audience.",
      tracks: [
        { artist: "Prophecy", color: "#00cfff", items: ["4–5 shows at INS venues — establish live presence in China", "Ghost-produce for Björn — build his catalog with Western-grade production", "Prophecy × Björn collab release — cross-pollinate audiences", "China-territory streaming setup (QQ Music, NetEase, Douyin)"] },
        { artist: "AIRE", color: "#7dd3fc", items: ["5 immersive DJ × VJ shows at INS venues — debut the format", "AIRE × Björn visual collab — content from every show", "First A/V content package: sellable assets from each activation", "Build social presence on Chinese platforms (Douyin, RED)"] },
        { artist: "Björn", color: "#38bdf8", items: ["Receive ghost-produced tracks from Prophecy — accelerate catalog", "Feature in AIRE shows as support/visual collab act", "First solo releases on INS-connected labels", "INS handles creative direction & marketing locally"] },
        { artist: "INS", color: "#f59e0b", items: ["Creative direction & marketing for all 3 artists in China", "Set up China-territory distribution infrastructure", "Local brand activation: Park Coffee Club, campus events", "Scouting pipeline: identify next local talent for Year 2"] },
      ],
    },
    {
      year: "Year 2", title: "Consolidation", subtitle: "Scale what works. More releases, bigger shows, wider reach.",
      tracks: [
        { artist: "Prophecy", color: "#00cfff", items: ["12 shows — INS venues + external bookings across Asia", "Multiple releases on Western labels with China-territory push", "Growing streaming revenue — catalog effect kicks in", "Sync & gaming placements via INS gaming division"] },
        { artist: "AIRE", color: "#7dd3fc", items: ["8 shows — premium immersive format at larger venues", "Content licensing revenue from Year 1 assets", "Brand partnership activations (visual + music)", "Expand to SEA circuit: Singapore, Bangkok, Seoul"] },
        { artist: "Björn", color: "#38bdf8", items: ["First solo shows outside China — A2G connects international agents", "Joint releases with Prophecy targeting Western labels", "Growing local fanbase from Year 1 show support slots", "A2G helps position Björn for international agent representation"] },
        { artist: "INS", color: "#f59e0b", items: ["Scale marketing campaigns — proven ROI from Year 1", "Expand venue network for all 3 artists", "Publishing & licensing admin for accumulated catalog", "Second wave scouting: local artist #2 in pipeline"] },
      ],
    },
    {
      year: "Year 3", title: "Profit", subtitle: "Harvest the investment. Revenue flows from multiple streams.",
      tracks: [
        { artist: "Prophecy", color: "#00cfff", items: ["20+ shows — headline fees at €10K+ per show", "Streaming royalties from 2+ years of catalog", "Publishing income from China-territory compositions", "Premium sync deals: gaming, advertising, brand campaigns"] },
        { artist: "AIRE", color: "#7dd3fc", items: ["15 shows — premium immersive format commands 2-3x standard fees", "Content library licensing generates recurring revenue", "Brand residencies at marquee venues", "Format replicable: train local VJs to scale without AIRE present"] },
        { artist: "Björn", color: "#38bdf8", items: ["International touring with A2G-connected agents", "Established streaming presence across Chinese + Western platforms", "The partnership's proof of concept: local → international", "Revenue split reflects matured artist value"] },
        { artist: "INS", color: "#f59e0b", items: ["Revenue phase shift: 30% share on 3 established revenue streams", "Publishing royalties from full catalog across all artists", "Licensing income from gaming, sync, and brand deals", "Pipeline proven — model ready to replicate with next cohort"] },
      ],
    },
  ],

  // ── REVENUE DETAIL ── totals auto-calculated from line items ─────────────────
  // Year 1: €27K total | Year 2: €117.5K total | Year 3: €264K total
  revenueDetail: [
    {
      pillar: "Prophecy",
      insShare: [60, 60, 60],
      years: [
        { lines: [{ l: "2 external shows \u00d7 \u20AC4.5K", v: 9 }, { l: "Streaming (QQ Music, NetEase, Douyin)", v: 5 }, { l: "Sync & gaming", v: 5 }] },
        { lines: [{ l: "8 external shows \u00d7 \u20AC5.5K", v: 44 }, { l: "Streaming (growing catalog)", v: 15 }, { l: "Sync & gaming", v: 12 }] },
        { lines: [{ l: "13 external shows \u00d7 \u20AC7K", v: 91 }, { l: "Streaming (established presence)", v: 40 }, { l: "Sync & gaming", v: 25 }] },
      ],
    },
    {
      pillar: "AIRE",
      insShare: [60, 60, 60],
      years: [
        { lines: [{ l: "1 external show \u00d7 \u20AC3.5K", v: 3.5 }, { l: "Content licensing (A/V assets)", v: 3 }] },
        { lines: [{ l: "4 external shows \u00d7 \u20AC4.5K", v: 18 }, { l: "Content licensing", v: 8 }] },
        { lines: [{ l: "6 external shows \u00d7 \u20AC6K", v: 36 }, { l: "Content licensing & brand placements", v: 15 }] },
      ],
    },
    {
      pillar: "Bj\u00f6rn + Other",
      insShare: [60, 60, 60],
      years: [
        { lines: [{ l: "1 external show \u00d7 \u20AC1.5K", v: 1.5 }, { l: "Merchandise", v: 0 }] },
        { lines: [{ l: "7 external shows \u00d7 \u20AC2.5K", v: 17.5 }, { l: "Merchandise", v: 3 }] },
        { lines: [{ l: "13 external shows \u00d7 \u20AC4K", v: 52 }, { l: "Merchandise", v: 5 }] },
      ],
    },
  ],

  // ── INVESTMENT DETAIL ── totals auto-calculated from line items ───────────────
  // Year 1: €42.5K total | Year 2: €61.5K total | Year 3: €83K total
  investmentDetail: [
    {
      pillar: "Show Fees",
      years: [
        { lines: [{ l: "Prophecy INS venue shows (2 \u00d7 \u20AC4K)", v: 8 }, { l: "AIRE INS venue shows (2 \u00d7 \u20AC3.5K)", v: 7 }, { l: "INS venue costs (7 shows \u00d7 \u20AC500)", v: 3.5 }] },
        { lines: [{ l: "Prophecy INS venue shows (2 \u00d7 \u20AC4.5K)", v: 9 }, { l: "AIRE INS venue shows (2 \u00d7 \u20AC4K)", v: 8 }, { l: "INS venue costs (7 shows \u00d7 \u20AC500)", v: 3.5 }] },
        { lines: [{ l: "Prophecy INS venue shows (2 \u00d7 \u20AC5K)", v: 10 }, { l: "AIRE INS venue shows (2 \u00d7 \u20AC5K)", v: 10 }, { l: "INS venue costs (6 shows \u00d7 \u20AC500)", v: 3 }] },
      ],
    },
    {
      pillar: "Marketing & Content",
      years: [
        { lines: [{ l: "Marketing campaigns", v: 13 }, { l: "AIRE content production", v: 6 }] },
        { lines: [{ l: "Marketing campaigns", v: 25 }, { l: "AIRE content production", v: 8 }] },
        { lines: [{ l: "Marketing campaigns", v: 40 }, { l: "AIRE content production", v: 10 }] },
      ],
    },
    {
      pillar: "Artist Development",
      years: [
        { lines: [{ l: "Scouting & artist dev", v: 5 }] },
        { lines: [{ l: "Scouting & artist dev", v: 8 }] },
        { lines: [{ l: "Scouting & artist dev", v: 10 }] },
      ],
    },
  ],

  // ── PRECEDENT ─────────────────────────────────────────────────────────────────
  precedent: {
    title: "The Model Has Already Been Proven",
    subtitle: "FIVE Holdings × Pacha Group",
    body: "In October 2023, FIVE Holdings acquired Pacha Group for €302.5M — buying a brand, an IP library, a label, a content engine, and a global entertainment platform. FIVE reported $589M revenue in 2024 (up 28% YoY) with $208M EBITDA. In February 2026 they acquired Brooklyn Mirage/Avant Gardner, rebranding it as Pacha NYC.",
    lesson: "FIVE proved infrastructure scales. But without artist ownership, every show is a rental \u2014 never an asset. Every artist that plays is someone else\u2019s. The booking fee leaves the building every night. The A2G \u00d7 INS partnership solves exactly this \u2014 co-owning the artists that fill the stages.",
    comparison: {
      five: { label: "FIVE Holdings", investment: "\u20AC302.5M", problem: "\u20AC302.5M in venues. $589M in revenue. Zero owned artists. Every show still depends on an external booking agent." },
      ins: { label: "INS + A2G", investment: "", advantage: "Co-own artists from day one \u2014 audiences come for the brand, not just the booking." },
    },
  },

  // ── ECOSYSTEMS (schema-aligned) ───────────────────────────────────────────────
  ecosystems: {
    ins: {
      label: "INS ecosystem",
      entities: [
        { id: "hero-com", name: "HERO.COM", role: "Venues + infrastructure" },
        { id: "ins", name: "INS", role: "Brand + operations + local marketing" },
        { id: "hero-esports", name: "Hero E-Sports", role: "Gaming + sync pipeline" },
        { id: "ins-shows", name: "INS Shows", role: "Live events in China" },
        { id: "insane", name: "INSane", role: "Record label" },
      ],
      delivers: [
        "Licensing (gaming, brand, sync)",
        "China Marketing (Douyin, RED, local promo)",
        "Shows (China + INS venues)",
      ],
    },
    a2g: {
      label: "A2G company",
      entities: [
        { id: "prophecy", name: "Prophecy", role: "Production + live engine" },
        { id: "persona", name: "PERSONA", role: "Label + guaranteed releases" },
        { id: "aire", name: "AIRE", role: "Content + immersive DJ×VJ shows" },
      ],
      delivers: [
        "Release strategy + guaranteed distribution (PERSONA Records)",
        "International promotion \u2014 EDMisLove (7M+), global network",
        "Production \u2014 ghost-production, original tracks, content formats",
        "Music for INSane release",
        "WW Marketing",
        "Content (A/V from every show)",
        "Exclusive immersive shows",
      ],
    },
  },

  // ── REVENUE PER ARTIST TYPE (schema: 3 blocks) ─────────────────────────────
  revenueByArtistType: [
    {
      block: "REVENUE + MARKETING HERO",
      color: "#3b82f6",
      artists: ["Björn", "INS artist 2", "Artist 3..."],
      desc: "INS local artists — developed with A2G production, revenue stays in INS ecosystem",
      streams: [
        { id: "shows", name: "Shows", territory: "Global" },
        { id: "royalties", name: "Royalties and publishing", territory: "Global" },
        { id: "licensing", name: "Licensing", territory: "Global" },
        { id: "exclusivity", name: "Exclusivity and control", territory: "Global" },
        { id: "ww-marketing", name: "WW Marketing", territory: "Worldwide" },
      ],
    },
    {
      block: "REVENUE + MARKETING HERO + A2G",
      color: "#8b5cf6",
      artists: ["AIRE"],
      desc: "A2G artist with shared China revenue — immersive format produces sellable content",
      streams: [
        { id: "shows-china", name: "Shows (China)", territory: "China" },
        { id: "licensing-china", name: "Licensing (China)", territory: "China" },
        { id: "exclusivity-china", name: "Exclusivity and control (China)", territory: "China" },
        { id: "royalties-china", name: "Royalties and publishing (China)", territory: "China" },
      ],
    },
    {
      block: "REVENUE + MARKETING A2G",
      color: "#ef4444",
      artists: ["Prophecy"],
      desc: "A2G flagship artist — INS provides venues and marketing, A2G manages globally",
      streams: [
        { id: "china-marketing", name: "China Marketing", territory: "China" },
        { id: "shows-ins", name: "Shows (INS)", territory: "China" },
      ],
    },
  ],

  // ── VALUE DIMENSIONS ──────────────────────────────────────────────────────────
  valueDimensions: [
    { num: "01", title: "Revenue Share", category: "Economic", desc: "60% \u2192 30% \u2192 10% INS share (by phase). Applied across all China-territory revenue: live, streaming, sync, merch, licensing, content." },
    { num: "02", title: "Artist IP as Infrastructure", category: "Strategic", desc: "Every track produced, every visual asset, every show recorded — permanent content assets INS co-owns. This IP library grows monthly and can be monetized across venues, gaming platforms, brand deals, and streaming indefinitely." },
    { num: "03", title: "Exclusivity and Control", category: "Strategic", desc: "INS co-invests in artist development \u2014 and with that investment comes decision power. Control where and when artists play in your territory, at what price, and under what terms. No competing partnership can replicate these artists in the same territory." },
    { num: "04", title: "Western Label Network Access", category: "Strategic", desc: "Through A2G, INS gains a direct channel to Insomniac Records, Spinnin'/Warner, and Future Rave. INS local artists can be placed on international labels — credibility and reverse-flow revenue that didn't exist before." },
    { num: "05", title: "Ghost Production Pipeline", category: "Operational", desc: "PROPHECY ghost-produces at Guetta/ARTBAT quality levels. A track costing €5K–15K on the open market gets delivered as part of the partnership. Over 3 years, this represents €50K–150K in production value." },
    { num: "06", title: "Content Engine", category: "Marketing", desc: "AIRE's DJ×VJ format produces sellable A/V content from every show: short-form for Douyin/RED, long-form for streaming, visual packages for brand licensing. INS venues become both the stage and the studio." },
    { num: "07", title: "A Repeatable Model", category: "Scalable", desc: "If this works with 3 artists, INS has a proven playbook to replicate. The infrastructure built in Year 1 \u2014 distribution channels, marketing processes, label relationships \u2014 becomes the operating system for every artist INS develops." },
    { num: "08", title: "Programming Independence", category: "Strategic", desc: "Stop depending on external agents to fill your stages. With an owned artist pipeline, INS controls its own programming \u2014 reducing booking costs, increasing margin, and building audience loyalty around artists the brand co-owns." },
    { num: "09", title: "Audience Data", category: "Intelligence", desc: "Real data on how artists perform across Chinese platforms \u2014 streaming numbers, engagement rates, demographic insights. This intelligence informs not just artist development, but venue programming, marketing spend, and brand partnerships." },
  ],

  // ── RISKS ────────────────────────────────────────────────────────────────────
  risks: [
    { risk: "Artist leaves or becomes unavailable", mitigation: "Revenue share applies to China-territory catalog already created. Tracks and assets keep generating income. A2G commits to replacing any artist within the partnership framework.", likelihood: "Medium" },
    { risk: "Revenue grows slower than projected", mitigation: "Phase 1 (60/40) has no time limit — it runs until INS recoups investment. No scenario where INS moves to a lower share before recovering capital.", likelihood: "Low–Medium" },
    { risk: "Chinese market regulations change", mitigation: "Distribution through established Chinese platforms (QQ Music, NetEase) with existing regulatory compliance. No gray-area structures.", likelihood: "Low" },
    { risk: "Artist growth doesn't match expectations", mitigation: "Value-trade model (shows for production) limits cash exposure. Ghost production and content creation continue generating non-cash value even if live revenue underperforms.", likelihood: "Medium" },
    { risk: "One party wants to exit early", mitigation: "Exit clause after Year 2 with 6-month notice. Existing catalog revenue continues per agreed split. IP ownership proportional to investment made.", likelihood: "Structural" },
  ],

  // ── ADDITIONAL OPPORTUNITIES ──────────────────────────────────────────────────
  additionalOpps: [
    { num: "01", title: "Label Collaboration", subtitle: "Persona Records × INS Label", desc: "A2G operates Persona Records with EDM is Love (5M+ followers). A co-release pipeline gives INS artists access to A2G's Western distribution, while giving A2G artists access to Chinese distribution." },
    { num: "02", title: "Marketing Services Exchange", subtitle: "Mutual Referral Program", desc: "A2G is building a marketing agency for DJs. INS has deep Chinese platform expertise. A mutual referral or service exchange allows both parties to offer clients marketing in territories they couldn't cover alone." },
    { num: "03", title: "Masterclass & Education", subtitle: "Content Revenue Stream", desc: "PROPHECY and AIRE can deliver masterclass content that INS packages for campus events, Park Coffee Club activations, or online courses — positioning INS as an education hub for electronic music in China." },
    { num: "04", title: "Roger Sanchez", subtitle: "When Timing Aligns", desc: "A2G manages Roger Sanchez — Grammy-winning house legend with 25+ years of touring history. INS would have a preferred pathway to book Roger for special events. Not part of the core deal, but the relationship creates the access." },
    { num: "05", title: "Southeast Asia Expansion", subtitle: "Year 2+", desc: "As artists developed in China grow, the natural next step is SEA touring (Singapore, Bangkok, Seoul, Bali). INS can co-invest in this expansion and extend their revenue share to the broader Asian territory." },
  ],

  // ── BREAK-EVEN TABLE ──────────────────────────────────────────────────────────
  breakEven: [
    { metric: "Cumulative Invested", y1: "\u20AC42.5K", y2: "\u20AC104K", y3: "\u20AC187K" },
    { metric: "INS Revenue (60% share)", y1: "\u20AC16.2K", y2: "\u20AC86.7K", y3: "\u20AC245.1K" },
    { metric: "Recovery %", y1: "38.1%", y2: "83.4%", y3: "131.1%", highlight: true },
    { metric: "Production Value Received", y1: "\u20AC14K", y2: "\u20AC35K", y3: "\u20AC63K" },
  ],

  about: {
    description: "A2G Company FZCO is a Dubai-based music and technology holding. We develop artists, platforms, and intellectual property — not as a traditional booking agency, but as a co-building partner that takes long-term equity positions in talent.",
    stats: [
      { n: "6", l: "Artists Managed" },
      { n: "8", l: "Active Businesses" },
      { n: "Dubai", l: "HQ, UAE (FZCO)" },
      { n: "5", l: "Major Label Families" },
    ],
    roster: [
      { artist: "Roger Sanchez", note: "House legend · Grammy-winning · 25+ years touring" },
      { artist: "PROPHECY", note: "Insomniac · Spinnin\u2019/Warner · Future Rave · 500K+ monthly listeners" },
      { artist: "AIRE", note: "DJ\u00d7VJ Live Act · Thundercode · Kuaigon" },
      { artist: "BABEL Music", note: "Melodic electronic · Tomorrowland-aligned" },
      { artist: "Meguru", note: "Hard techno · Female artist · INS ecosystem" },
      { artist: "Bj\u00f6rn", note: "568K Spotify listeners · #1 Beatport · Hard techno" },
    ],
    labelTrackRecord: "Insomniac Records · Spinnin' / Warner Music · Future Rave · HILOMATIK (HI-LO) · CR2 Records · Persona Records",
    territories: "UAE · Spain · China · Southeast Asia",
  },

  cta: {
    eyebrow: "Ready to Build?",
    title: "You built the stages.",
    titleAccent: "Let\u2019s build what fills them.",
    description: "We propose a long-term partnership, not a one-night booking. If the vision aligns, let\u2019s move fast.",
    email: "a.arevalo@a2g.company",
  },
};

export type ProposalData = typeof DEFAULT_DATA;

// ── localStorage helpers ────────────────────────────────────────────────────
const STORAGE_KEY = "ins-proposal-data";

export function loadData(): ProposalData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: ProposalData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
