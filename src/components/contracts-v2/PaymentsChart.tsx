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
  getUtbetalningarPerYear,
  getUtbetalningarDetailByYear,
  formatSEK,
  type Arbetsform,
  type PaymentDetailRow,
} from '../../data/contractsV2Data';
import FilterDropdown from '../FilterDropdown';
import { formatRangeLabel } from './DateRangePicker';
import SectionCard from './SectionCard';

const FILTER_OPTIONS = [
  'Slutavverkning',
  'Gallring',
  'Övrig avverkning',
  'Leveransvirke',
] as const;

const COLOR_AVVERKNING = '#1E3856'; // navy (--h-blue-1)
const COLOR_LEVERANSVIRKE = '#7DB5B3'; // muted teal (--h-blue-4)

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

interface PaymentsChartProps {
  /** Periodens start (ISO YYYY-MM-DD) — styrs av sidans globala periodväljare. */
  startDate: string;
  /** Periodens slut (ISO YYYY-MM-DD). */
  endDate: string;
}

/**
 * Genomförda utbetalningar per år som stapeldiagram (avverkningsrätter
 * + leveransvirke stackade per år). Planerade utbetalningar har egen
 * graf (BetalplanChart). Detaljerad lista grupperad per år, ihopfälld
 * som standard.
 */
export default function PaymentsChart({ startDate, endDate }: PaymentsChartProps) {
  // Default: inget valt — tom selection tolkas som "alla" via
  // effectiveSelected nedan, sa chart:en visar all data men
  // filter-triggern ar neutral (ingen count-badge).
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  /** Detalj-listan ihopfalld som standard. */
  const [detailsOpen, setDetailsOpen] = useState(false);

  const effectiveSelected = useMemo(
    () => (selected.size === 0 ? new Set<string>(FILTER_OPTIONS) : selected),
    [selected]
  );

  const filterArgs = useMemo(() => {
    const arbetsformer = new Set<Arbetsform>();
    for (const opt of effectiveSelected) {
      if (opt === 'Slutavverkning' || opt === 'Gallring' || opt === 'Övrig avverkning') {
        arbetsformer.add(opt as Arbetsform);
      }
    }
    return {
      startDate,
      endDate,
      arbetsformer,
      inkluderaLeveransvirke: effectiveSelected.has('Leveransvirke'),
    };
  }, [effectiveSelected, startDate, endDate]);

  const chartData = useMemo(() => getUtbetalningarPerYear(filterArgs), [filterArgs]);
  const detailYears = useMemo(
    () => getUtbetalningarDetailByYear(filterArgs),
    [filterArgs]
  );

  const totals = useMemo(
    () => ({
      avverkning: chartData.reduce((s, d) => s + d.utbetaltAvverkning, 0),
      leveransvirke: chartData.reduce((s, d) => s + d.utbetaltLeveransvirke, 0),
    }),
    [chartData]
  );

  const showAvverkning = totals.avverkning > 0;
  const showLeveransvirke =
    effectiveSelected.has('Leveransvirke') && totals.leveransvirke > 0;
  const totalUtbetalt = totals.avverkning + totals.leveransvirke;

  return (
    <SectionCard
      title="Utbetalningar över tid"
      fullWidth
      titleInfoText="Genomförda utbetalningar per år (inkl moms)."
    >
      <div className="flex flex-col gap-[20px] p-[16px] md:p-[24px] flex-1 lg:min-h-[384px]">
        {/* Topp-rad: period vanster, totalsumma hoger — samma monster
            som Avrakningar-grafen. */}
        <div className="flex items-start justify-between gap-[16px] w-full">
          <div className="flex flex-col gap-[4px]">
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
              {formatRangeLabel(startDate, endDate)}
            </span>
          </div>
          <div className="flex flex-col gap-[4px] items-end text-right">
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Totala utbetalningar
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#021c20] tabular-nums"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(totalUtbetalt)}
            </span>
          </div>
        </div>

        {/* Kategori-filter pa egen rad — smal aven pa smala skarmar. */}
        <div className="w-full max-w-[240px]">
          <FilterDropdown
            label="Kategori"
            options={[...FILTER_OPTIONS]}
            selected={selected}
            onChange={setSelected}
          />
        </div>

        {/* Diagram — staplar per ar. mt-auto pinnar chart + legend mot
            kortets botten sa de linjerar med Avrakningar-grafen aven om
            den har en extra kategori-rad upptill. */}
        <div className="h-[138px] md:h-[162px] w-full mt-auto">
          {chartData.length === 0 ? (
            <EmptyState text="Inga utbetalningar matchar valt filter eller datumintervall." />
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
                {showAvverkning && (
                  <Bar
                    dataKey="utbetaltAvverkning"
                    name="Avverkningsrätter"
                    stackId="all"
                    fill={COLOR_AVVERKNING}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={64}
                  />
                )}
                {showLeveransvirke && (
                  <Bar
                    dataKey="utbetaltLeveransvirke"
                    name="Leveransvirke"
                    stackId="all"
                    fill={COLOR_LEVERANSVIRKE}
                    radius={[2, 2, 0, 0]}
                    maxBarSize={64}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Summering centrerad under grafen — legend med belopp */}
        <div className="flex flex-wrap justify-center gap-x-[24px] gap-y-[8px]">
          <SummaryItem
            color={COLOR_AVVERKNING}
            label="Avverkningsrätter"
            value={totals.avverkning}
          />
          <SummaryItem
            color={COLOR_LEVERANSVIRKE}
            label="Leveransvirke"
            value={totals.leveransvirke}
          />
        </div>
      </div>

      {/* Detaljerad lista — eget block med gra bg, ihopfalld som standard.
          Grupperad per ar; varje ar ar individuellt utfallbart. */}
      {detailYears.length > 0 && (
        <div className="bg-[#fafafa] border-t border-[#e4e4e4] mt-auto">
          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full flex items-center justify-between gap-[8px] px-[16px] md:px-[24px] py-[16px] hover:bg-[#f3f3f3] transition-colors text-left"
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

function SummaryItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="size-[10px] rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#021c20] opacity-70"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>
      <span
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] text-[#021c20] tabular-nums"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {formatSEK(value)}
      </span>
    </div>
  );
}

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
        <div className="flex items-center gap-[12px] min-w-0">
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
  const categoryBadge =
    row.arbetsform === 'Leveransvirke'
      ? { label: 'Leveransvirke', bg: '#dceaea', text: '#1E3856' }
      : { label: 'Avverkningsrätter', bg: '#e8edf2', text: '#1E3856' };

  const openContract = () => {
    window.dispatchEvent(
      new CustomEvent('openContract', { detail: row.kontraktsId })
    );
  };

  return (
    <button
      type="button"
      onClick={openContract}
      className="grid grid-cols-[auto_1fr_auto] gap-x-[12px] md:gap-x-[16px] items-center px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4] last:border-b-0 w-full text-left hover:bg-[#f0f0f0] transition-colors cursor-pointer"
      aria-label={`Öppna kontrakt ${row.kontraktsnummer} — ${row.fastighet}`}
    >
      {/* Datum behovs har eftersom ar-headern bara anger aret. */}
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 tabular-nums shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {row.datum}
      </p>
      <div className="flex items-center gap-[12px] md:gap-[12px] min-w-0">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#021c20] shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {row.fastighet}
        </p>
        <span
          className="font-['IBM_Plex_Sans',sans-serif] text-[10px] md:text-[11px] uppercase tracking-[0.5px] font-semibold px-[8px] py-[4px] shrink-0"
          style={{
            fontVariationSettings: "'wdth' 100",
            backgroundColor: categoryBadge.bg,
            color: categoryBadge.text,
          }}
        >
          {categoryBadge.label}
        </span>
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
  dataKey?: string;
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
  const visible = payload.filter(
    (p) => typeof p.value === 'number' && p.value > 0
  );
  if (visible.length === 0) return null;

  return (
    <div
      className="bg-white border border-[#021c20] px-[12px] py-[12px] font-['IBM_Plex_Sans',sans-serif] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] animate-tooltip-enter"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p className="text-[13px] font-semibold text-[#021c20] mb-[8px]">{label}</p>
      <div className="flex flex-col gap-[4px]">
        {visible.map((p) => (
          <div
            key={p.dataKey ?? p.name}
            className="flex items-center gap-[8px] text-[13px] text-[#021c20]"
          >
            <span
              className="size-[10px] shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <span>
              {p.name}: <span className="font-semibold">{formatSEK(p.value ?? 0)}</span>
            </span>
          </div>
        ))}
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
