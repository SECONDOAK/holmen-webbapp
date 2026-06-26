import { Info } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { formatSEK } from '../../data/contractsV2Data';

type MomsMode = 'utbetalt' | 'simple';

interface MoneyStatCardProps {
  label: string;
  /** Sub-label slussas in i titel-raden med en bindestreck-separator,
   *  t.ex. "Totalt utbetalt - Avverkningsrätter". */
  subLabel?: string;
  /** Tre belopp att visa. */
  belopp: { netto: number; moms: number; inkl: number };
  /** Tooltip-text för info-ikonen. */
  tooltipText?: string;
  /**
   * Hur beloppet ska presenteras:
   *   - `'utbetalt'`: huvudvärde = inkl moms (det belopp som landat på
   *     kontot). Under: caption "inklusive moms (totalt belopp)", divider,
   *     sen Exklusive moms + Moms (25%).
   *   - `'simple'`: huvudvärde = exkl moms (netto). Under: caption
   *     "exklusive moms", divider, sen Moms (25%) + Totalt inkl moms.
   *     Används för saldon (innestående medel, disponibelt belopp) där
   *     netto är det primära men momsen ändå ska framgå.
   */
  momsMode?: MomsMode;
}

/**
 * Stat-kort för penningvärden. Layouten matchar referensen:
 * uppercase-titel med valfri subLabel kopplad via " - "-separator,
 * stort belopp under, en caption som anger om huvudvärdet är inkl eller
 * exkl moms, en divider och sen moms-breakdown. Vilket värde som är
 * huvudvärde och vad breakdownen visar styrs av `momsMode`.
 */
export default function MoneyStatCard({
  label,
  subLabel,
  belopp,
  tooltipText,
  momsMode = 'simple',
}: MoneyStatCardProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const fullLabel = subLabel ? `${label} - ${subLabel}` : label;

  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
      <div
        aria-hidden="true"
        className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
      />
      <div className="size-full">
        <div className="box-border flex flex-col gap-[12px] md:gap-[12px] items-start px-[16px] py-[12px] md:p-[24px] relative w-full h-full">
          {/* Titel-rad: info-ikon direkt till hoger om titeln (inte
              pressad till boxens hogerkant). */}
          <div className="flex gap-[8px] items-start w-full">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.3] text-[11px] md:text-[12px] text-[#021c20] uppercase tracking-[0.4px] md:tracking-[0.5px] opacity-80 break-words min-w-0"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {fullLabel}
            </p>
            {tooltipText && (
              <Tooltip
                open={isTooltipOpen}
                onOpenChange={setIsTooltipOpen}
                delayDuration={100}
              >
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center shrink-0 mt-[1px]"
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

          {/* Huvudvärde */}
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[1.1] text-[22px] md:text-[26px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {formatSEK(momsMode === 'utbetalt' ? belopp.inkl : belopp.netto)}
          </p>

          {/* Caption — skiljer pa om beloppet inkluderar moms eller ej */}
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] md:text-[13px] text-[#021c20] opacity-70 leading-[1.4]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {momsMode === 'utbetalt'
              ? 'inklusive moms (totalt belopp)'
              : 'exklusive moms'}
          </p>

          {/* Moms-breakdown — i utbetalt-lage visas exkl + moms (huvud-
              vardet ar inkl); i simple-lage visas moms + inkl (huvud-
              vardet ar exkl). Pa det viset framgar alltid alla tre
              belopp oavsett lage. mt-auto pinnar divider + breakdown mot
              kortets botten sa de linjerar mellan korten aven nar
              titlarna ar olika hoga (1 vs 2 rader). */}
          <div className="w-full border-t border-[#e4e4e4] mt-auto" />
          <div className="flex flex-col gap-[8px] w-full">
            {momsMode === 'utbetalt' ? (
              <>
                <BreakdownRow label="Moms (25%)" value={belopp.moms} />
                <BreakdownRow label="Totalt exklusive moms" value={belopp.netto} />
              </>
            ) : (
              <>
                <BreakdownRow label="Moms (25%)" value={belopp.moms} />
                <BreakdownRow label="Totalt inkl moms" value={belopp.inkl} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-[12px] w-full">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] opacity-80"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </p>
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] tabular-nums"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {formatSEK(value)}
      </p>
    </div>
  );
}
