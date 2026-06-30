import { useState } from 'react';
import { Info } from 'lucide-react';
import { formatAmount, formatSEK } from '../../data/contractsV2Data';
import type { ÅterrapporteringPostV2 } from '../../data/contractsV2Data';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import CollapsibleGroupHeader from './CollapsibleGroupHeader';

interface ÅterrapporteringTableProps {
  poster: ÅterrapporteringPostV2[];
}

/**
 * Mobil rad — staplat kort istället för den breda grid-tabellen, så
 * mobilen slipper sidoscroll. Sortiment + ev. meta-rad (datum/volym) till
 * vänster, belopp till höger.
 */
function MobileRow({
  title,
  details,
  amount,
}: {
  title: string;
  /** Etiketterade detaljrader, t.ex. {label:'Inmätningsdatum', value:'2025-01-08'}. */
  details?: Array<{ label: string; value: string }>;
  amount: string;
}) {
  return (
    <div className="flex flex-col gap-[4px] px-[16px] py-[12px] border-b border-[#e4e4e4]">
      {/* Titel (vänster) + belopp (höger) */}
      <div className="flex items-baseline justify-between gap-[12px]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] min-w-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] tabular-nums shrink-0 text-right"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {amount}
        </p>
      </div>
      {/* Detaljrader: etikett till vänster, värde till höger (som beloppet) */}
      {details?.map((d, i) => (
        <div key={i} className="flex items-baseline justify-between gap-[12px]">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70 min-w-0"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {d.label}
          </p>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70 tabular-nums shrink-0 text-right"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {d.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Tabell för återrapporterade inmätningar från avverkning / leveransvirke.
 * Kolumnstruktur: Sortiment | Inmätningsdatum | Volym m³fub | Volym m³to | Belopp.
 *
 * På desktop visas en grid-tabell; på mobil staplade kort (MobileRow) så
 * man slipper sidoscrolla.
 */
export default function ÅterrapporteringTable({ poster }: ÅterrapporteringTableProps) {
  if (poster.length === 0) {
    return (
      <p
        className="px-[16px] md:px-[24px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
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
    ? 'grid grid-cols-[1.6fr_0.9fr_0.4fr_0.4fr_1fr] gap-x-[16px] px-[16px] md:px-[24px]'
    : 'grid grid-cols-[1.6fr_0.9fr_1fr] gap-x-[16px] px-[16px] md:px-[24px]';
  // (`summaryLabelColSpan` borttagen — summeringen är nu flex-layout
  // istället för grid med colspan.)
  // Grid-tabellen visas bara på desktop (md+); på mobil staplas raderna
  // som kort (MobileRow) så ingen sidoscroll behövs.

  // Bara visa SORTIMENT/DATUM/BELOPP-kolumn­headern när det finns sortiment.
  const showColumnHeader = showVolymColumns;

  // Delsummor per hopfällbar grupp.
  const inmätningarSum = inmätningar.reduce((s, p) => s + p.belopp, 0);
  const övrigaSum = övrigaIntäkter.reduce((s, p) => s + p.belopp, 0);

  // Hopfällbara grupper: Intäkter (inmätningar), Övriga intäkter och
  // Kostnader — var och en med egen summering. Default utfällda.
  const [intäkterOpen, setIntäkterOpen] = useState(true);
  const [övrigaOpen, setÖvrigaOpen] = useState(true);
  const [kostnaderOpen, setKostnaderOpen] = useState(true);
  const [summeringOpen, setSummeringOpen] = useState(true);

  // Avräknings-info som tidigare låg på sektionskortets titel — nu på
  // den FÖRSTA grupp-rubriken (Intäkter i normalfallet) så den alltid
  // syns även om en grupp saknas.
  const avräkningInfo =
    'Sammanställning från avräkningsnotan. Radbeloppen visas exklusive moms och totalsumman inkluderar moms 25 %.';
  const firstGroup =
    inmätningar.length > 0
      ? 'intäkter'
      : övrigaIntäkter.length > 0
        ? 'övriga'
        : 'kostnader';

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Intäkter-grupp — hopfällbar. Summa (alla intäktsposter, exkl
          moms) till höger; chevron fäller ut/ihop raderna under. */}
      {inmätningar.length > 0 && (
        <>
          <CollapsibleGroupHeader
            label="Virkesintäkter"
            total={formatSEK(inmätningarSum)}
            open={intäkterOpen}
            onToggle={() => setIntäkterOpen((v) => !v)}
            info={firstGroup === 'intäkter' ? avräkningInfo : undefined}
          />
          {intäkterOpen && (
            <>
              {/* Desktop: grid-tabell med kolumner */}
              <div className="hidden md:block">
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
              className={`${gridCls} items-center py-[12px] border-b border-[#e4e4e4]`}
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
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {formatAmount(p.belopp, 'intäkt')}
              </p>
            </div>
          ))}
        </>
      )}
              </div>
              {/* Mobil: staplade kort utan sidoscroll */}
              <div className="md:hidden">
                {inmätningar.map((p, i) => {
                  const volym = [
                    p.volymM3f != null ? `${p.volymM3f} m³fub` : null,
                    p.volymMto != null ? `${p.volymMto} m³to` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <MobileRow
                      key={`in-m-${i}`}
                      title={p.sortiment}
                      details={[
                        { label: 'Inmätningsdatum', value: p.datum },
                        ...(volym ? [{ label: 'Inmätt volym', value: volym }] : []),
                      ]}
                      amount={formatAmount(p.belopp, 'intäkt')}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* Övriga intäkter — egen hopfällbar grupp med egen summering. */}
      {övrigaIntäkter.length > 0 && (
        <>
          <CollapsibleGroupHeader
            label="Övriga intäkter"
            total={formatSEK(övrigaSum)}
            open={övrigaOpen}
            onToggle={() => setÖvrigaOpen((v) => !v)}
            info={firstGroup === 'övriga' ? avräkningInfo : undefined}
          />
          {övrigaOpen && (
            <>
              {/* Desktop: grid-tabell */}
              <div className="hidden md:block">
          {övrigaIntäkter.map((p, i) => (
            <div
              key={`oi-${i}`}
              className={`${gridCls} items-center py-[12px] border-b border-[#e4e4e4]`}
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
                  {/* Tomma volym-celler — ovriga intakter har ingen volym. */}
                  <span />
                  <span />
                </>
              )}
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {formatAmount(p.belopp, 'intäkt')}
              </p>
            </div>
          ))}
              </div>
              {/* Mobil: staplade kort utan sidoscroll */}
              <div className="md:hidden">
                {övrigaIntäkter.map((p, i) => (
                  <MobileRow
                    key={`oi-m-${i}`}
                    title={p.sortiment}
                    amount={formatAmount(p.belopp, 'intäkt')}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Kostnader-grupp — hopfällbar. Summa (negativ) till höger. */}
      {kostnader.length > 0 && (
        <>
          <CollapsibleGroupHeader
            label="Kostnader"
            total={avdrag === 0 ? formatSEK(0) : `−${formatSEK(Math.abs(avdrag))}`}
            open={kostnaderOpen}
            onToggle={() => setKostnaderOpen((v) => !v)}
            info={firstGroup === 'kostnader' ? avräkningInfo : undefined}
          />
          {kostnaderOpen && (
            <>
              {/* Desktop: grid-tabell */}
              <div className="hidden md:block">
          {kostnader.map((p, i) => (
            <div
              key={`ko-${i}`}
              className={`${gridCls} items-center py-[12px] border-b border-[#e4e4e4]`}
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
                  {/* Tomma volym-celler — kostnader har ingen volym. */}
                  {p.volymM3f !== undefined ? (
                    <p
                      className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {p.volymM3f}
                    </p>
                  ) : (
                    <span />
                  )}
                  {p.volymMto !== undefined ? (
                    <p
                      className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {p.volymMto}
                    </p>
                  ) : (
                    <span />
                  )}
                </>
              )}
              <p
                className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {`−${formatSEK(Math.abs(p.belopp))}`}
              </p>
            </div>
          ))}
              </div>
              {/* Mobil: staplade kort utan sidoscroll */}
              <div className="md:hidden">
                {kostnader.map((p, i) => (
                  <MobileRow
                    key={`ko-m-${i}`}
                    title={p.sortiment}
                    amount={`−${formatSEK(Math.abs(p.belopp))}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Summeringsblock — ligger UTANFÖR scroll-wrappern så
          summeringen alltid syns på sin plats även om datatabellen
          scrollas horisontellt på mobil. En grå "Summering"-rubrik,
          vita rader för Intäkter/Kostnader/Moms och en grå Netto-rad
          i botten — speglar datatabellens grupp-struktur (subheader +
          rader) istället för ett block av enbart grå rader. */}
      {/* Netto ex moms — huvudsiffran (ditt resultat exkl moms). Momsen är
          genomgående för en momsregistrerad skogsägare, så ex moms är den
          faktiska intäkten. Breakdownen visar Moms + Netto ink moms (det
          som faktiskt betalas ut). */}
      <CollapsibleGroupHeader
        label="Netto ex moms"
        total={
          utfallExklMoms < 0
            ? `−${formatSEK(Math.abs(utfallExklMoms))}`
            : formatSEK(utfallExklMoms)
        }
        open={summeringOpen}
        onToggle={() => setSummeringOpen((v) => !v)}
      />
      {summeringOpen && (
        <>
          <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4]">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Moms 25 %
            </p>
            <p
              className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {moms < 0 ? `−${formatSEK(Math.abs(moms))}` : formatSEK(moms)}
            </p>
          </div>
          <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[12px]">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Netto ink moms
            </p>
            <p
              className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(utfall)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
