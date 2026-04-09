"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import PrintPage from "../page";

// ─── Types ───────────────────────────────────────────────────────────────────
interface StickyNote {
  id: string;
  pageIdx: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

const EDITS_KEY = "ins-proposal-edits";
const NOTES_KEY = "ins-proposal-notes";
const COLORS = ["#fef08a", "#fca5a5", "#86efac", "#93c5fd", "#c4b5fd"];

// ─── Draggable Sticky Note ──────────────────────────────────────────────────
function StickyNoteEl({
  note,
  onUpdate,
  onDelete,
}: {
  note: StickyNote;
  onUpdate: (id: string, patch: Partial<StickyNote>) => void;
  onDelete: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: note.x, oy: note.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !ref.current) return;
    const page = ref.current.closest(".page");
    if (!page) return;
    const r = page.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.sx) / r.width) * 100;
    const dy = ((e.clientY - drag.current.sy) / r.height) * 100;
    onUpdate(note.id, {
      x: Math.max(0, Math.min(82, drag.current.ox + dx)),
      y: Math.max(0, Math.min(88, drag.current.oy + dy)),
    });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const rotation = ((parseInt(note.id.slice(-2), 16) || 0) % 7) - 3;

  return (
    <div
      ref={ref}
      className="absolute z-[60] group"
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        pointerEvents: "auto",
        width: "34mm",
        transform: `rotate(${rotation}deg)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        className="rounded-sm cursor-grab active:cursor-grabbing"
        style={{ backgroundColor: note.color, boxShadow: "2px 3px 10px rgba(0,0,0,0.25)" }}
      >
        <div className="flex justify-between items-center px-2 pt-1.5">
          <span className="text-[7px] text-black/20 font-mono select-none">note</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="w-4 h-4 flex items-center justify-center text-black/20 hover:text-black/60 text-[10px] rounded-full hover:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &times;
          </button>
        </div>
        <textarea
          value={note.text}
          onChange={(e) => onUpdate(note.id, { text: e.target.value })}
          placeholder="Escribe aqui..."
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-full bg-transparent text-black/70 text-[8pt] leading-snug resize-none border-none outline-none placeholder:text-black/25 px-2 pb-2 min-h-[18mm] font-sans"
        />
      </div>
    </div>
  );
}

// ─── Main Edit Page ─────────────────────────────────────────────────────────
export default function EditPrintPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [pageEls, setPageEls] = useState<Element[]>([]);
  const [adding, setAdding] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [edits, setEdits] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Load notes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTES_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } catch {}
    setMounted(true);
  }, []);

  // Persist notes (debounced)
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => localStorage.setItem(NOTES_KEY, JSON.stringify(notes)), 200);
    return () => clearTimeout(t);
  }, [notes, mounted]);

  // Setup editability after PrintPage mounts
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    // Hide the print page toolbar
    c.querySelectorAll(".no-print").forEach((el) => ((el as HTMLElement).style.display = "none"));

    // Find pages
    const pages = Array.from(c.querySelectorAll(".page"));
    pages.forEach((p, i) => {
      (p as HTMLElement).style.overflow = "visible";
      p.setAttribute("data-pidx", String(i));
    });
    setPageEls(pages);

    // Make h1, h2, p elements editable
    pages.forEach((page, pi) => {
      page.querySelectorAll("h1, h2, p").forEach((el, ei) => {
        const h = el as HTMLElement;
        if (!h.textContent?.trim()) return;
        h.contentEditable = "true";
        h.spellcheck = false;
        h.setAttribute("data-ek", `${pi}-${ei}`);
      });
    });

    // Restore saved text edits
    try {
      const saved = JSON.parse(localStorage.getItem(EDITS_KEY) || "{}");
      let n = 0;
      for (const [k, v] of Object.entries(saved)) {
        if (!v) continue;
        const el = c.querySelector(`[data-ek="${k}"]`);
        if (el) {
          el.textContent = v as string;
          n++;
        }
      }
      setEdits(n);
    } catch {}

    // Auto-save on input
    const onInput = (e: Event) => {
      const t = e.target as HTMLElement;
      const k = t.getAttribute("data-ek");
      if (!k) return;
      const saved = JSON.parse(localStorage.getItem(EDITS_KEY) || "{}");
      saved[k] = t.textContent;
      localStorage.setItem(EDITS_KEY, JSON.stringify(saved));
      setEdits(Object.values(saved).filter(Boolean).length);
    };
    c.addEventListener("input", onInput);
    return () => c.removeEventListener("input", onInput);
  }, []);

  // Escape to cancel note adding
  useEffect(() => {
    if (!adding) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAdding(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adding]);

  // Click-to-add-note
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!adding) return;
      const page = (e.target as HTMLElement).closest(".page");
      if (!page) return;
      e.preventDefault();
      e.stopPropagation();

      const idx = parseInt(page.getAttribute("data-pidx") || "0");
      const r = page.getBoundingClientRect();
      const x = Math.min(((e.clientX - r.left) / r.width) * 100, 78);
      const y = Math.min(((e.clientY - r.top) / r.height) * 100, 84);

      setNotes((prev) => [...prev, { id: Date.now().toString(), pageIdx: idx, x, y, text: "", color }]);
      setAdding(false);
    },
    [adding, color]
  );

  const updateNote = useCallback((id: string, patch: Partial<StickyNote>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <>
      <style jsx global>{`
        .edit-wrap [contenteditable="true"] {
          outline: 1px dashed transparent;
          outline-offset: 2px;
          transition: outline-color 0.15s;
        }
        .edit-wrap [contenteditable="true"]:hover {
          outline-color: rgba(201, 168, 76, 0.25);
        }
        .edit-wrap [contenteditable="true"]:focus {
          outline-color: rgba(201, 168, 76, 0.5);
          outline-style: solid;
        }
        .edit-wrap.note-mode { cursor: crosshair; }
        .edit-wrap.note-mode .page * { pointer-events: none; }
        .edit-wrap.note-mode .page { pointer-events: auto; cursor: crosshair; }
        @media print {
          .edit-toolbar { display: none !important; }
          .edit-wrap { padding-top: 0 !important; }
          .edit-wrap [contenteditable="true"] { outline: none !important; }
          .edit-wrap .page { overflow: visible !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="edit-toolbar fixed top-0 left-0 right-0 z-[200] bg-[#080c14]/95 backdrop-blur-lg border-b border-white/[0.06]">
        <div className="max-w-[230mm] mx-auto flex items-center gap-3 px-4 py-2.5">
          <a href="/print" className="text-white/25 hover:text-white/50 text-xs font-mono">
            &larr; Print
          </a>
          <div className="w-px h-4 bg-white/[0.08]" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#C9A84C]/80 uppercase">Edit mode</span>

          <div className="flex-1" />

          {/* Note controls */}
          <button
            onClick={() => setAdding(!adding)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              adding
                ? "bg-[#C9A84C] text-black font-medium"
                : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60 border border-white/[0.06]"
            }`}
          >
            {adding ? "Click en una pagina..." : "+ Nota"}
          </button>
          <div className="flex gap-1 ml-1">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-3.5 h-3.5 rounded-full transition-all ${
                  color === c ? "ring-2 ring-white/60 ring-offset-1 ring-offset-[#080c14] scale-110" : "opacity-50 hover:opacity-80"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-px h-4 bg-white/[0.08] ml-2" />

          {/* Status */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
            {edits > 0 && <span>{edits} edits</span>}
            {notes.length > 0 && (
              <span>
                {notes.length} nota{notes.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded text-xs font-mono bg-[#C9A84C]/90 text-black hover:bg-[#C9A84C] transition-all"
          >
            Print / PDF
          </button>

          <button
            onClick={() => {
              if (!confirm("Resetear todo? (texto + notas)")) return;
              localStorage.removeItem(EDITS_KEY);
              localStorage.removeItem(NOTES_KEY);
              window.location.reload();
            }}
            className="text-[10px] font-mono text-white/15 hover:text-red-400/60 px-2 py-1 rounded hover:bg-red-400/[0.04]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Print pages with edit overlay */}
      <div
        ref={containerRef}
        className={`edit-wrap pt-[52px] ${adding ? "note-mode" : ""}`}
        onClick={adding ? handleClick : undefined}
      >
        <PrintPage />
      </div>

      {/* Sticky notes portaled into pages */}
      {pageEls.map((pageEl, idx) => {
        const pn = notes.filter((n) => n.pageIdx === idx);
        if (!pn.length) return null;
        return createPortal(
          <div key={idx} className="pointer-events-none" style={{ position: "absolute", inset: 0, zIndex: 50 }}>
            {pn.map((n) => (
              <StickyNoteEl key={n.id} note={n} onUpdate={updateNote} onDelete={deleteNote} />
            ))}
          </div>,
          pageEl
        );
      })}
    </>
  );
}
