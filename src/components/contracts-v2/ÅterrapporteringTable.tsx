import { Info } from 'lucide-react';
import { formatAmount, formatSEK } from '../../data/contractsV2Data';
import type { ÅterrapporteringPostV2 } from '../../data/contractsV2Data';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ÅterrapporteringTableProps {
  poster: ÅterrapporteringPostV2[];
}

/**
 * Tabell för återrapporterade inmätningar från avverkning / leveransvirke.
 * Kolumnstruktur: Sortiment | Volym m³f | Volym m³to | Datum | Belopp.
 *
 * Tre summeringsrader längst ner:
 *   Intäkter (positiva belopp), Avdrag (negativa belopp absolut),
 *   Utfall (nettot).
 */
export default function ÅterrapporteringTable({ poster }: ÅterrapporteringTableProps) {
  if (poster.length === 0) {
    return (
      <p
        className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga inmätningar återrapporterade ännu.
      </p>
    );
  }

  const inmätningar = poster.filter((p) => p.belopp >= 0);
  const kostnader = poster.filter((p) => p.belopp < 0);
  const intäkter = inmätningar.reduce((s, p) => s + p.belopp, 0);
  const avdrag = kostnader.reduce((s, p) => s + p.belopp, 0); // negative
  const utfall = intäkter + avdrag;

  // Sortiment (wide) · Datum · m³f · m³to (close pair) · Belopp.
  // Smal kolumngap mellan m³f/m³to gör att volymerna läser sig som ett par.
  const gridCls =
    'grid grid-cols-[1.6fr_0.9fr_0.4fr_0.4fr_1fr] gap-x-[16px] px-[16px]';

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Header */}
      <div className={`${gridCls} py-[8px] border-b border-[#e4e4e4]`}>
        <p
          className="text-left font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Sortiment
        </p>
        <p
          className="text-left font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Datum
        </p>
        <div className="flex items-center justify-end gap-[4px]">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            m³f
          </p>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center shrink-0"
                aria-label="Info om m³f"
              >
                <Info className="size-[14px] text-gray-500 hover:text-gray-700 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-[260px] z-[9999] text-center">
              Inmätt volym i kubikmeter fast under bark — den faktiska vedmassan utan bark.
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-end gap-[4px]">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            m³to
          </p>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center shrink-0"
                aria-label="Info om m³to"
              >
                <Info className="size-[14px] text-gray-500 hover:text-gray-700 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-[260px] z-[9999] text-center">
              Inmätt volym toppmätt — beräknad utifrån stockens topp­diameter och längd.
            </TooltipContent>
          </Tooltip>
        </div>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Belopp
        </p>
      </div>

      {/* Inmätningar — alla rader med positivt belopp. Egen grupp så
          kostnaderna nedan inte blandas in mellan inmätta sortiment om
          datum råkar överlappa. Ingen subrubrik här eftersom "Avräkning"
          implicit börjar med inmätningar — Kostnader-rubriken nedan
          räcker som markör för bytet. */}
      {inmätningar.length > 0 && (
        <>
          {inmätningar.map((p, i) => (
            <div
              key={`in-${i}`}
              className={`${gridCls} items-center py-[10px] border-b border-[#e4e4e4]`}
            >
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.sortiment}
              </p>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.datum}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.volymM3f ?? '—'}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.volymMto ?? '—'}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {formatAmount(p.belopp, 'intäkt')}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Kostnader — egen grupp så avdrag inte blandas med inmätningar. */}
      {kostnader.length > 0 && (
        <>
          <div className={`${gridCls} py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4]`}>
            <p
              className="col-span-5 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Kostnader
            </p>
          </div>
          {kostnader.map((p, i) => (
            <div
              key={`ko-${i}`}
              className={`${gridCls} items-center py-[10px] border-b border-[#e4e4e4]`}
            >
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.sortiment}
              </p>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.datum}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.volymM3f ?? '—'}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.volymMto ?? '—'}
              </p>
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {`−${formatSEK(Math.abs(p.belopp))}`}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Summeringsblock — alla tre rader på gemensam grå bakgrund så de
          läser sig som EN summerings-enhet. Intäkter och Kostnader är
          subtilt presenterade (normal vikt, lätt dämpad), Netto sticker
          ut som slutsumman (semibold, full opacity). */}
      <div className={`${gridCls} items-center pt-[12px] pb-[6px] bg-[#f7f7f7]`}>
        <p
          className="col-span-4 font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Intäkter
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatSEK(intäkter)}
        </p>
      </div>
      <div className={`${gridCls} items-center py-[6px] bg-[#f7f7f7]`}>
        <p
          className="col-span-4 font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Kostnader
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {avdrag === 0 ? formatSEK(0) : `−${formatSEK(Math.abs(avdrag))}`}
        </p>
      </div>
      <div className={`${gridCls} items-center pt-[6px] pb-[12px] bg-[#f7f7f7]`}>
        <p
          className="col-span-4 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Netto
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatSEK(utfall)}
        </p>
      </div>
    </div>
  );
}
