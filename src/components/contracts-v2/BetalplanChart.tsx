import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  getBetalplanPerYear,
  getBetalplanDetailByYear,
  formatSEK,
  type PaymentDetailRow,
} from '../../data/contractsV2Data';
import SectionCard from './SectionCard';

// Muted teal (--h-blue-4) — samma farg som "I betalplan"-delen i
// Innestaende medel-blocket, sa betalplan-pengar har en och samma
// farg over hela sidan.
const COLOR_PLANERAD = '#7DB5B3';

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

/**
 * Betalplan — kommande (planerade) utbetalningar per år som stapel-
 * diagram, med summering under och en detaljerad lista grupperad per
 * år (ihopfälld som standard). Detaljraderna visar utbetalningsdatum,
 * vilket kontrakt utbetalningen kommer ifrån och summan — samlat från
 * alla kontrakts betalplaner.
 *
 * OBS: Betalplanen är frikopplad från sidans globala periodväljare —
 * planerade utbetalningar ligger per definition framåt i tiden, så ett
 * historiskt intervall hade alltid gett en tom graf. Blocket visar
 * därför alltid ALLA kommande utbetalningar.
 */
export default function BetalplanChart() {
  /** Detalj-listan ihopfalld som standard. */
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Inga datum-gränser: helpers filtrerar redan bort allt före
  // MOCK_TODAY, så resultatet är samtliga kommande poster.
  const chartData = useMemo(() => getBetalplanPerYear(), []);
  const detailYears = useMemo(() => getBetalplanDetailByYear(), []);

  const total = useMemo(
    () => chartData.reduce((s, d) => s + d.planerad, 0),
    [chartData]
  );

  return (
    <SectionCard
      title="Betalplan"
      fullWidth
      titleInfoText="Kommande planerade utbetalningar per år (inkl moms), samlade från alla dina kontrakts betalplaner. Visar alltid alla kommande utbetalningar, oberoende av vald period."
    >
      <div className="flex flex-col gap-[20px] p-[16px] md:p-[24px] flex-1 lg:min-h-[408px]">
        {/* Topp-rad — markerar att blocket inte foljer periodvaljaren. */}
        <div className="flex flex-col gap-[2px]">
          <span
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Period
          </span>
          <span
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] md:text-[15px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Alla kommande utbetalningar
          </span>
        </div>

        {/* Diagram — staplar per ar. Samma hojd som PaymentsChart sa
            graferna ar visuellt jamforbara sida vid sida. mt-auto pinnar
            chart + legend mot kortets botten. */}
        <div className="h-[138px] md:h-[162px] w-full mt-auto">
          {chartData.length === 0 || total === 0 ? (
            <EmptyState text="Inga planerade utbetalningar." />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <CartesianGrid strokeDasharray="2 4" stroke="#d4d4d4" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#9ca3af' }}
                  tick={{ fill: '#021c20' }}
                  interval={0}
                />
                <YAxis
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatTick}
                  tick={{ fill: '#021c20' }}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: '#f7f7f7' }}
                  content={<CustomTooltip />}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="planerad"
                  name="Planerad utbetalning"
                  fill={COLOR_PLANERAD}
                  radius={[2, 2, 0, 0]}
                  maxBarSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Summering centrerad under grafen */}
        <div className="flex justify-center">
          <div className="flex items-center gap-[8px]">
            <span
              className="size-[10px] rounded-full shrink-0"
              style={{ backgroundColor: COLOR_PLANERAD }}
            />
            <span
              className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Kommande utbetalningar
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#021c20] tabular-nums"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Detaljerad lista — ihopfalld som standard. Per ar; varje rad
          visar datum + kontrakt + summa och ar klickbar till kontraktet. */}
      {detailYears.length > 0 && (
        <div className="bg-[#fafafa] border-t border-[#e4e4e4] mt-auto">
          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full flex items-center justify-between gap-[8px] px-[16px] md:px-[24px] py-[14px] hover:bg-[#f3f3f3] transition-colors text-left"
            aria-expanded={detailsOpen}
          >
            <p
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] md:text-[13px] uppercase tracking-[0.5px] text-[#021c20] opacity-80"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Detaljerad lista
            </p>
            <ChevronDown
              className={`size-[16px] text-[#021c20] opacity-60 shrink-0 transition-transform ${
                detailsOpen ? '' : '-rotate-90'
              }`}
              strokeWidth={2}
            />
          </button>
          {detailsOpen && (
            <div className="flex flex-col bg-white border-t border-[#e4e4e4]">
              {detailYears.map((y) => (
                <YearRow key={y.year} year={y.year} total={y.total} rader={y.rader} />
              ))}
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

/* ============================================================
 * Underkomponenter
 * ============================================================ */

function YearRow({
  year,
  total,
  rader,
}: {
  year: string;
  total: number;
  rader: PaymentDetailRow[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e4e4e4] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-[12px] py-[12px] px-[16px] md:px-[24px] hover:bg-[#f7f7f7] transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-[10px] min-w-0">
          <ChevronDown
            className={`size-[14px] text-[#021c20] opacity-60 shrink-0 transition-transform ${
              open ? '' : '-rotate-90'
            }`}
            strokeWidth={2}
          />
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] md:text-[15px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {year}
          </p>
        </div>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] md:text-[15px] text-[#021c20] tabular-nums shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatSEK(total)}
        </p>
      </button>

      {open && (
        <div className="bg-[#fafafa] border-t border-[#e4e4e4]">
          {rader.map((r, i) => (
            <DetailRow key={i} row={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailRow({ row }: { row: PaymentDetailRow }) {
  const openContract = () => {
    window.dispatchEvent(
      new CustomEvent('openContract', { detail: row.kontraktsId })
    );
  };

  return (
    <button
      type="button"
      onClick={openContract}
      className="grid grid-cols-[auto_1fr_auto] gap-x-[12px] md:gap-x-[16px] items-center px-[16px] md:px-[24px] py-[10px] border-b border-[#e4e4e4] last:border-b-0 w-full text-left hover:bg-[#f0f0f0] transition-colors cursor-pointer"
      aria-label={`Öppna kontrakt ${row.kontraktsnummer} — ${row.fastighet}`}
    >
      {/* Utbetalningsdatum — det centrala for en betalplan-rad. */}
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 tabular-nums shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {row.datum}
      </p>
      <div className="flex items-center gap-[10px] md:gap-[12px] min-w-0">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#021c20] shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {row.fastighet}
        </p>
        <span
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {row.arbetsform} · {row.kontraktsnummer}
        </span>
      </div>
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] shrink-0 tabular-nums"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {formatSEK(row.belopp)}
      </p>
    </button>
  );
}

interface TooltipPayloadEntry {
  name?: string;
  value?: number;
  color?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  if (!entry || typeof entry.value !== 'number' || entry.value <= 0) return null;

  return (
    <div
      className="bg-white border border-[#021c20] px-[12px] py-[10px] font-['IBM_Plex_Sans',sans-serif] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] animate-tooltip-enter"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p className="text-[13px] font-semibold text-[#021c20] mb-[4px]">{label}</p>
      <div className="flex items-center gap-[8px] text-[13px] text-[#021c20]">
        <span
          className="size-[10px] shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        <span>
          Planerad utbetalning:{' '}
          <span className="font-semibold">{formatSEK(entry.value)}</span>
        </span>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {text}
      </p>
    </div>
  );
}
