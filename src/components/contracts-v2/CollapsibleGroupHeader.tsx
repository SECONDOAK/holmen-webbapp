import { Info, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

/**
 * Hopfällbar grupp-rubrik: chevron i början (nedåt hopfälld / uppåt utfälld),
 * etikett + valfri info-ikon till vänster, totalsumma till höger. Vit när
 * hopfälld, grå när utfälld. Delas av avräkningsnotans grupper och andra
 * block (t.ex. "Din andel") så de ser identiska ut.
 */
export default function CollapsibleGroupHeader({
  label,
  total,
  open,
  onToggle,
  info,
}: {
  label: string;
  total: string;
  open: boolean;
  onToggle: () => void;
  /** Valfri tooltip-text — visas via en info-ikon bredvid etiketten. */
  info?: string;
}) {
  // Wrapper är en div (inte button) så att en info-ikon-knapp kan ligga
  // inuti utan ogiltig knapp-i-knapp-nästling. Hela raden togglar; info-
  // ikonen stoppar propagation så den inte också fäller ihop gruppen.
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={open}
      className={`w-full flex items-center justify-between gap-[12px] px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4] transition-colors text-left cursor-pointer ${
        open ? 'bg-[#f7f7f7] hover:bg-[#f0f0f0]' : 'bg-white hover:bg-[#f7f7f7]'
      }`}
    >
      <span className="flex items-center gap-[8px] min-w-0">
        {/* Chevron i början — nedåt när hopfälld, uppåt när utfälld
            (pekar aldrig åt sidan). */}
        <ChevronDown
          className={`size-[16px] text-[#021c20] opacity-60 shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
        <span
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </span>
        {info && (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Information"
              >
                <Info className="size-[14px] text-[#021c20]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-[280px] z-[9999] text-center">
              {info}
            </TooltipContent>
          </Tooltip>
        )}
      </span>
      <span
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] tabular-nums shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {total}
      </span>
    </div>
  );
}
