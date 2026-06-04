import { Info } from 'lucide-react';
import { formatAmount, formatSEK } from '../../data/contractsV2Data';
import type { ÅterrapporteringPostV2 } from '../../data/contractsV2Data';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ÅterrapporteringTableProps {
  poster: ÅterrapporteringPostV2[];
}

/**
 * Tabell för återrapporterade inmätningar från avverkning / leveransvirke.
 * Kolumnstruktur: Sortiment | Inmätningsdatum | Volym m³fub | Volym m³to | Belopp.
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

  // Splittra raderna i tre kategorier:
  //   - inmätningar = positivt belopp MED volym (sortiment från avverkning)
  //   - övrigaIntäkter = positivt belopp UTAN volym (vägbidrag, ersättningar osv.)
  //   - kostnader = negativt belopp (mätningsavgift, vägunderhåll, skogsvårdskostnad osv.)
  const hasVolym = (p: ÅterrapporteringPostV2) =>
    p.volymM3f !== undefined || p.volymMto !== undefined;
  const inmätningar = poster.filter((p) => p.belopp >= 0 && hasVolym(p));
  const övrigaIntäkter = poster.filter((p) => p.belopp >= 0 && !hasVolym(p));
  const kostnader = poster.filter((p) => p.belopp < 0);
  const intäkter =
    inmätningar.reduce((s, p) => s + p.belopp, 0) +
    övrigaIntäkter.reduce((s, p) => s + p.belopp, 0);
  const avdrag = kostnader.reduce((s, p) => s + p.belopp, 0); // negative
  const utfallExklMoms = intäkter + avdrag;
  // Moms 25% beräknas på det netto-belopp som faktiskt betalas ut till
  // skogsägaren (eller debiteras vid kostnadskontrakt). Negativt netto
  // ger negativ moms.
  const MOMS_RATE = 0.25;
  const moms = Math.round(utfallExklMoms * MOMS_RATE);
  const utfall = utfallExklMoms + moms;
  // Volym-kolumnerna är bara meningsfulla om det finns inmätta sortiment.
  // För rena kostnads-/övrig intäkts-avräkningar dropparas både kolumn­headerna
  // och cellerna helt så tabellen blir kompakt.
  const showVolymColumns = inmätningar.length > 0;

  // Två grid-varianter beroende på om volym-kolumnerna visas.
  const gridCls = showVolymColumns
    ? 'grid grid-cols-[1.6fr_0.9fr_0.4fr_0.4fr_1fr] gap-x-[16px] px-[16px]'
    : 'grid grid-cols-[1.6fr_0.9fr_1fr] gap-x-[16px] px-[16px]';
  const subheaderColSpan = showVolymColumns ? 'col-span-5' : 'col-span-3';
  // (`summaryLabelColSpan` borttagen — summeringen är nu flex-layout
  // istället för grid med colspan.)
  // På mobil packar 5-kolumn-tabellen för tätt — sätter ett minimum
  // så tabellinnehållet får andas, och låter ytan scrolla horisontellt.
  // Summeringen ligger utanför scroll-wrapper:n så Intäkter/Kostnader/
  // Netto alltid syns oavsett scroll-position.
  const scrollMinWidth = showVolymColumns ? 'min-w-[560px]' : 'min-w-0';

  // Subheaders behövs bara när tabellen har flera olika sektioner att
  // skilja mellan. Om det BARA finns kostnader (cost-only kontrakt) är
  // KOSTNADER-subheadern överflödig — SectionCard-titeln säger redan
  // "Kostnader" och raden under är uppenbart en kostnad.
  const hasMultipleSections =
    [inmätningar.length, övrigaIntäkter.length, kostnader.length].filter((n) => n > 0).length > 1;
  const showKostnaderSubheader = kostnader.length > 0 && hasMultipleSections;
  // Bara visa SORTIMENT/DATUM/BELOPP-kolumn­headern när det finns sortiment.
  const showColumnHeader = showVolymColumns;

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Scroll-wrapper för datalinjerna — på mobil där tabellen
          har många kolumner får användaren scrolla horisontellt
          för att se sortiment/datum/volym/belopp. Summeringen
          ligger utanför så den alltid syns på samma plats. */}
      <div className="overflow-x-auto md:overflow-x-visible">
        <div className={scrollMinWidth}>
      {/* Kolumn-header — visas bara när det finns sortiment att kolumnera. */}
      {showColumnHeader && (
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
          Inmätningsdatum
        </p>
        {showVolymColumns && (
          <>
            <div className="flex items-center justify-end gap-[4px]">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                m³fub
              </p>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center shrink-0"
                    aria-label="Info om m³fub"
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
          </>
        )}
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Belopp
        </p>
      </div>
      )}

      {/* Inmätningar — sortimentsrader med volym. Ingen subheader behövs
          eftersom de sortiment­raderna är "default" i tabellen; ÖVRIGA
          INTÄKTER och KOSTNADER har egna subheaders som markerar bytet. */}
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

      {/* Övriga intäkter — positiva belopp utan sortiment-volym
          (vägbidrag, ersättningar, restprodukter osv.). */}
      {övrigaIntäkter.length > 0 && (
        <>
          <div className={`${gridCls} py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4]`}>
            <p
              className={`${subheaderColSpan} font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Övriga intäkter
            </p>
          </div>
          {övrigaIntäkter.map((p, i) => (
            <div
              key={`oi-${i}`}
              className={`${gridCls} items-center py-[10px] border-b border-[#e4e4e4]`}
            >
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {p.sortiment}
              </p>
              {/* Datum-cellen tom — datumet är bara meningsfullt för inmätningar. */}
              <span />

              {showVolymColumns && (
                <>
                  <p
                    className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    —
                  </p>
                  <p
                    className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    —
                  </p>
                </>
              )}
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

      {/* Kostnader — egen grupp så avdrag inte blandas med inmätningar.
          Subheader visas bara om det också finns andra sektioner. För
          cost-only kontrakt sköter SectionCard-titeln ("Kostnader") det. */}
      {kostnader.length > 0 && (
        <>
          {showKostnaderSubheader && (
            <div className={`${gridCls} py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4]`}>
              <p
                className={`${subheaderColSpan} font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80`}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Kostnader
              </p>
            </div>
          )}
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
              {/* Datum-cellen tom — datumet är bara meningsfullt för inmätningar. */}
              <span />

              {showVolymColumns && (
                <>
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
                </>
              )}
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

        </div>
      </div>

      {/* Summeringsblock — ligger UTANFÖR scroll-wrappern så
          Intäkter/Kostnader/Netto alltid syns på sin plats även
          om datatabellen scrollas horisontellt på mobil. Flex-
          layout istället för grid eftersom det bara är label +
          värde — ingen koppling till tabellens kolumnstruktur. */}
      <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[6px] bg-[#f7f7f7]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
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
      <div className="flex items-center justify-between px-[16px] py-[6px] bg-[#f7f7f7]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
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
      {/* Moms 25% — beräknas på netto exkl. moms och visas som egen
          rad så användaren ser hur totalsumman bildas. */}
      <div className="flex items-center justify-between px-[16px] py-[6px] bg-[#f7f7f7]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Moms 25 %
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {moms < 0 ? `−${formatSEK(Math.abs(moms))}` : formatSEK(moms)}
        </p>
      </div>
      <div className="flex items-center justify-between px-[16px] pt-[6px] pb-[12px] bg-[#f7f7f7]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Netto inkl. moms
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
