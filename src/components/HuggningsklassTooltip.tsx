/**
 * Shared definitions and tooltip component for huggningsklasser (cutting classes).
 * Uses a portal with fixed positioning so the tooltip is never clipped by
 * overflow containers. Opens on hover (desktop) and click/tap (mobile).
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

// Huggningsklass descriptions matching the official Swedish forestry standard
export const HUGGNINGSKLASSER: Record<string, string> = {
  K1: "Obehandlad kalmark (Ej tillgänglig för manuell inmatning)",
  K2: "Behandlad kalmark",
  R1: "Plantskog (under 1,3 m höjd)",
  R2: "Ungskog (över 1,3 m höjd)",
  G1: "Normal gallringsskog",
  G2: "Äldre gallringsskog",
  S1: "Skog som kan föryngringsavverkas",
  S2: "Skog mogen att föryngringsavverkas",
  S3: "Skog som inte bör slutavverkas",
  E1: "Restskog",
  E2: "Gles skog",
  E3: "Skog av hagmarkskaraktär",
};

export const HUGGNINGSKLASSER_ORDER = [
  "K1", "K2", "R1", "R2", "G1", "G2", "S1", "S2", "S3", "E1", "E2", "E3",
] as const;

export type HuggningsklassKey = (typeof HUGGNINGSKLASSER_ORDER)[number];

export const HUGGNINGSKLASSER_COLORS: Record<string, string> = {
  K1: "#F4A3A3",
  K2: "#D95C5C",
  R1: "#A7C7E7",
  R2: "#3F88C5",
  G1: "#7BC47F",
  G2: "#2E7D32",
  S1: "#CFCFCF",
  S2: "#9E9E9E",
  S3: "#616161",
  E1: "#D7B899",
  E2: "#B08968",
  E3: "#7F5539",
};

interface HuggningsklassInfoIconProps {
  tooltipPosition?: "top" | "bottom";
}

export function HuggningsklassInfoIcon({ tooltipPosition = "top" }: HuggningsklassInfoIconProps = {}) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const tooltipWidth = 288;
    const tooltipHeight = 340;
    const margin = 6;

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));

    let top: number;
    if (tooltipPosition === "bottom") {
      top = rect.bottom + margin;
      if (top + tooltipHeight > window.innerHeight - 8) {
        top = rect.top - tooltipHeight - margin;
      }
    } else {
      top = rect.top - tooltipHeight - margin;
      if (top < 8) {
        top = rect.bottom + margin;
      }
    }

    setPos({ top, left });
  }, [tooltipPosition]);

  const show = useCallback(() => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpen(true);
  }, []);

  const hideDelayed = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setOpen(false), 150);
  }, []);

  // Close on outside click (for mobile tap-to-toggle)
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        iconRef.current?.contains(e.target as Node) ||
        tooltipRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Recompute position on scroll / resize while open
  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <>
      <button
        ref={iconRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onMouseEnter={show}
        onMouseLeave={hideDelayed}
        className="inline-flex items-center justify-center shrink-0"
        aria-label="Visa info om huggningsklasser"
      >
        <svg
          className="size-4 text-gray-500 cursor-help"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
        </svg>
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            ref={tooltipRef}
            onMouseEnter={show}
            onMouseLeave={hideDelayed}
            className="fixed w-72 bg-white border border-[#e4e4e4] rounded-lg shadow-lg p-3 z-[9999]"
            style={{ top: pos.top, left: pos.left }}
          >
            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] mb-2">
              Huggningsklasser
            </p>
            <div className="space-y-1 text-[11px] text-gray-700">
              {HUGGNINGSKLASSER_ORDER.map((key) => (
                <p key={key}>
                  <span className="font-semibold">{key}:</span>{" "}
                  {HUGGNINGSKLASSER[key]}
                </p>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}