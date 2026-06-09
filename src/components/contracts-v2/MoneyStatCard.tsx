import { Info } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { formatSEK } from '../../data/contractsV2Data';

interface MoneyStatCardProps {
  label: string;
  /** Sub-label (extra rad under huvud-label) — t.ex. "Avverkningsrätter". */
  subLabel?: string;
  /** Tre belopp att visa. inkl är huvudvärdet (stort). */
  belopp: { netto: number; moms: number; inkl: number };
  /** Tooltip-text för info-ikonen. */
  tooltipText?: string;
}

/**
 * Stat-kort för penningvärden med moms-uppdelning. Visar inkl moms som
 * stort huvudvärde och exkl moms + moms i två rader under.
 *
 * Matchar visuellt `StatCard` (samma shadow, border, padding) men har
 * en utbyggd content-area för moms-split. Används på EconomyOverviewPage
 * för kraven 1, 2, 4, 6.
 */
export default function MoneyStatCard({
  label,
  subLabel,
  belopp,
  tooltipText,
}: MoneyStatCardProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
      <div
        aria-hidden="true"
        className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
      />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] md:gap-[12px] items-start px-[14px] py-[12px] md:p-[24px] relative w-full">
          {/* Label-rad med info-ikon */}
          <div className="content-stretch flex gap-[4px] items-start relative w-full">
            <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.25] md:leading-[normal] text-[11px] md:text-[12px] text-[#021c20] uppercase tracking-[0.4px] md:tracking-[0.5px] opacity-70 break-words"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {label}
              </p>
              {subLabel && (
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.25] md:leading-[normal] text-[11px] md:text-[12px] text-[#021c20] uppercase tracking-[0.4px] md:tracking-[0.5px] opacity-90 break-words"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {subLabel}
                </p>
              )}
            </div>
            {tooltipText && (
              <Tooltip
                open={isTooltipOpen}
                onOpenChange={setIsTooltipOpen}
                delayDuration={100}
              >
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center shrink-0"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsTooltipOpen(!isTooltipOpen);
                    }}
                    onMouseEnter={() => setIsTooltipOpen(true)}
                    onMouseLeave={() => setIsTooltipOpen(false)}
                    aria-label={`Info om ${label}`}
                  >
                    <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="max-w-[280px] z-[9999] text-center"
                  onPointerDownOutside={() => setIsTooltipOpen(false)}
                >
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Huvudvärde: inkl moms (stort) */}
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.1] text-[20px] md:text-[24px] text-[#32412a]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {formatSEK(belopp.inkl)}
          </p>

          {/* Moms-split under: exkl + moms */}
          <div className="flex flex-col gap-[2px] w-full">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] md:text-[13px] text-[#021c20] opacity-70 leading-[1.4]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Exkl moms {formatSEK(belopp.netto)}
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] md:text-[13px] text-[#021c20] opacity-70 leading-[1.4]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Moms {formatSEK(belopp.moms)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
