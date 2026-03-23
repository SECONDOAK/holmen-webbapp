import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";

interface NoPlanTooltipProps {
  children: React.ReactNode;
}

export function NoPlanTooltip({ children }: NoPlanTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  // Close on outside click (mobile)
  useEffect(() => {
    if (!isVisible) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Determine if tooltip should render above or below cursor
  const tooltipAbove = mousePos.y > 120;

  return (
    <div
      ref={containerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        // Toggle on tap for mobile
        if (!isVisible) {
          setMousePos({ x: e.clientX, y: e.clientY });
          showTooltip();
        } else {
          setIsVisible(false);
        }
      }}
      className="w-full"
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[10000] pointer-events-none"
            style={{
              top: tooltipAbove ? `${mousePos.y - 16}px` : `${mousePos.y + 20}px`,
              left: `${mousePos.x}px`,
              transform: tooltipAbove ? "translate(-50%, -100%)" : "translate(-50%, 0)",
            }}
          >
            <div className="bg-white border border-[#e4e4e4] rounded-lg shadow-2xl px-4 py-3 w-[260px] animate-in fade-in duration-150">
              <div className="flex items-start gap-2.5">
                <Info size={16} strokeWidth={2} className="text-[#1e3856] shrink-0 mt-0.5" />
                <p className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#333] leading-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Med en skogsbruksplan får du detaljerad information om din skogs tillstånd och åtgärdsförslag.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
