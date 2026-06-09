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
  getPaymentsOverTime,
  getPaymentsDetailByMonth,
  getPaymentsDataDateRange,
  formatSEK,
  type Arbetsform,
  type PaymentDetailRow,
} from '../../data/contractsV2Data';
import FilterDropdown from '../FilterDropdown';
import DateRangePicker from './DateRangePicker';
import SectionCard from './SectionCard';

const FILTER_OPTIONS = [
  'Slutavverkning',
  'Gallring',
  'Övrig avverkning',
  'Leveransvirke',
  'Planerade',
] as const;

const COLOR_AVVERKNING = '#1E3856'; // navy
const COLOR_LEVERANSVIRKE = '#7DB5B3'; // muted teal
const COLOR_PLANERAD = '#B2E8E8'; // pale teal

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

const MONTH_LABELS = [
  'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
  'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun',
  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec',
];

/**
 * Komprimerad tick-formatter: visar bara månadsnamn, fortom på januari
 * dar vi ankrar tidslinjen med aret ("Jan 2025"). Pa det viset far
 * X-axeln plats med fler ticks utan att tappa kontext for ar-byte.
 */
function formatMonthShort(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const m = MONTH_SHORT[parseInt(monthStr, 10) - 1] ?? monthStr;
  return monthStr === '01' ? `${m} ${yearStr}` : m;
}

function formatMonthLong(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const m = MONTH_LABELS[parseInt(monthStr, 10) - 1] ?? monthStr;
  return `${m} ${yearStr}`;
}

export default function PaymentsChart() {
  const dataRange = useMemo(() => getPaymentsDataDateRange(), []);
  const defaultRange = useMemo(
    () => ({ start: dataRange.min, end: dataRange.max }),
    [dataRange]
  );

  const [startDate, setStartDate] = useState(defaultRange.start);
  const [endDate, setEndDate] = useState(defaultRange.end);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(FILTER_OPTIONS)
  );
  /** Vag av om detalj-listan ska visas. Default expanderad. */
  const [detailsOpen, setDetailsOpen] = useState(true);

  // Datat som ligger till grund för chart:en + summeringar
  const chartData = useMemo(() => {
    const arbetsformer = new Set<Arbetsform>();
    for (const opt of selected) {
      if (opt === 'Slutavverkning' || opt === 'Gallring' || opt === 'Övrig avverkning') {
        arbetsformer.add(opt as Arbetsform);
      }
    }
    return getPaymentsOverTime({
      startDate,
      endDate,
      arbetsformer,
      inkluderaLeveransvirke: selected.has('Leveransvirke'),
      inkluderaPlanerade: selected.has('Planerade'),
    });
  }, [selected, startDate, endDate]);

  // Detalj-rader för listan under chart:en
  const detailMonths = useMemo(() => {
    const arbetsformer = new Set<Arbetsform>();
    for (const opt of selected) {
      if (opt === 'Slutavverkning' || opt === 'Gallring' || opt === 'Övrig avverkning') {
        arbetsformer.add(opt as Arbetsform);
      }
    }
    return getPaymentsDetailByMonth({
      startDate,
      endDate,
      arbetsformer,
      inkluderaLeveransvirke: selected.has('Leveransvirke'),
      inkluderaPlanerade: selected.has('Planerade'),
    });
  }, [selected, startDate, endDate]);

  // Topp-summeringar
  const totals = useMemo(
    () => ({
      avverkning: chartData.reduce((s, d) => s + d.utbetaltAvverkning, 0),
      leveransvirke: chartData.reduce((s, d) => s + d.utbetaltLeveransvirke, 0),
      planerad: chartData.reduce((s, d) => s + d.planerad, 0),
    }),
    [chartData]
  );

  const showAvverkning = totals.avverkning > 0;
  const showLeveransvirke = selected.has('Leveransvirke') && totals.leveransvirke > 0;
  const showPlanerad = selected.has('Planerade') && totals.planerad > 0;

  return (
    <SectionCard
      title="Utbetalningar och betalplan över tid"
      fullWidth
      titleInfoText="Utbetalda och planerade betalningar per månad (inkl moms). Solid färg = redan utbetalt, ljusare = planerat i betalplan."
    >
      <div className="flex flex-col gap-[20px] p-[16px]">
        {/* OBS: detalj-listan ligger UTANFOR denna padded container sa
            den kan ha gra bg som spanner hela kortets bredd. Se nedan. */}
        {/* Kontroller-rad */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-[16px] lg:gap-[24px]">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
            bounds={dataRange}
          />
          <div className="lg:max-w-[260px] w-full">
            <FilterDropdown
              label="Kategori"
              options={[...FILTER_OPTIONS]}
              selected={selected}
              onChange={setSelected}
            />
          </div>
        </div>

        {/* Topp-summering: tre färgkodade dotts med summor */}
        <div className="flex flex-wrap gap-[24px] md:gap-[40px] pt-[4px]">
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
          <SummaryItem
            color={COLOR_PLANERAD}
            label="Kommande"
            value={totals.planerad}
          />
        </div>

        {/* Diagram */}
        <div className="h-[300px] md:h-[360px] w-full">
          {chartData.length === 0 ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <CartesianGrid strokeDasharray="2 4" stroke="#d4d4d4" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#9ca3af' }}
                  tickFormatter={formatMonthShort}
                  tick={{ fill: '#021c20' }}
                  minTickGap={12}
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
                  cursor={{ fill: '#f0f0f0' }}
                  content={<CustomTooltip />}
                  isAnimationActive={false}
                />
                {showAvverkning && (
                  <Bar
                    dataKey="utbetaltAvverkning"
                    name="Utbetalt — Avverkningsrätter"
                    stackId="utbetalt"
                    fill={COLOR_AVVERKNING}
                    radius={[2, 2, 0, 0]}
                  />
                )}
                {showLeveransvirke && (
                  <Bar
                    dataKey="utbetaltLeveransvirke"
                    name="Utbetalt — Leveransvirke"
                    stackId="utbetalt"
                    fill={COLOR_LEVERANSVIRKE}
                    radius={[2, 2, 0, 0]}
                  />
                )}
                {showPlanerad && (
                  <Bar
                    dataKey="planerad"
                    name="Planerad utbetalning"
                    fill={COLOR_PLANERAD}
                    radius={[2, 2, 0, 0]}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* Detaljerad lista — eget block med gra bg, spanner hela kortets
          bredd (utanfor chart-containerns p-[16px]-padding). Header-knappen
          togglar hela blocket. Varje manad ar individuellt utfallbar inom
          blocket. */}
      {detailMonths.length > 0 && (
        <div className="bg-[#fafafa] border-t border-[#e4e4e4]">
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
              {detailMonths.map((m) => (
                <MonthRow
                  key={m.month}
                  month={m.month}
                  total={m.total}
                  rader={m.rader}
                />
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
    <div className="flex items-start gap-[10px]">
      <span
        className="size-[12px] rounded-full shrink-0 mt-[8px]"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-[#021c20] leading-[1.2]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatSEK(value)}
        </p>
      </div>
    </div>
  );
}

function MonthRow({
  month,
  total,
  rader,
}: {
  month: string;
  total: number;
  rader: PaymentDetailRow[];
}) {
  const [open, setOpen] = useState(false);
  const hasOnlyPlanerade = rader.every((r) => r.typ === 'planerad');

  return (
    <div className="border-b border-[#e4e4e4] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-[12px] py-[12px] px-[16px] md:px-[24px] hover:bg-[#f7f7f7] transition-colors text-left"
        aria-expanded={open}
      >
        {/* Vanster: chevron + manads-namn */}
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
            {formatMonthLong(month)}
          </p>
        </div>
        {/* Hoger: planerad-badge (om relevant) + totalsumma */}
        <div className="flex items-center gap-[12px] shrink-0">
          {hasOnlyPlanerade && (
            <span
              className="font-['IBM_Plex_Sans',sans-serif] text-[10px] md:text-[11px] uppercase tracking-[0.5px] bg-[#e4f5f5] text-[#1E3856] px-[6px] py-[2px] font-semibold"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Planerad
            </span>
          )}
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] md:text-[15px] text-[#021c20] tabular-nums"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {formatSEK(total)}
          </p>
        </div>
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
  const typeBadge =
    row.typ === 'planerad'
      ? { label: 'Planerad', bg: '#e4f5f5', text: '#1E3856' }
      : row.typ === 'utbetalt-leveransvirke'
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
      className="grid grid-cols-[auto_1fr_auto] gap-x-[12px] md:gap-x-[16px] items-center px-[16px] md:px-[24px] py-[10px] border-b border-[#e4e4e4] last:border-b-0 w-full text-left hover:bg-[#f0f0f0] transition-colors cursor-pointer"
      aria-label={`Öppna kontrakt ${row.kontraktsnummer} — ${row.fastighet}`}
    >
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 tabular-nums shrink-0"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {row.datum}
      </p>
      {/* Allt p en horisontell rad: fastighet (fet) + typ-badge +
          arbetsform/kontrakt-meta. Min-w-0 + truncate pa meta-texten
          sa raden inte wrappar pa smala viewports. */}
      <div className="flex items-center gap-[10px] md:gap-[12px] min-w-0">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#021c20] shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {row.fastighet}
        </p>
        <span
          className="font-['IBM_Plex_Sans',sans-serif] text-[10px] md:text-[11px] uppercase tracking-[0.5px] font-semibold px-[6px] py-[2px] shrink-0"
          style={{
            fontVariationSettings: "'wdth' 100",
            backgroundColor: typeBadge.bg,
            color: typeBadge.text,
          }}
        >
          {typeBadge.label}
        </span>
        <span
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {row.arbetsform} · {row.kontraktsnummer}
        </span>
      </div>
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#021c20] shrink-0 tabular-nums"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {formatSEK(row.belopp)}
      </p>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga betalningar matchar valt filter eller datumintervall.
      </p>
    </div>
  );
}

/**
 * Tooltip-shape ar lost typad fran recharts payload — vi anvander
 * bara name, value, color och dataKey sa en strukturerad interface
 * funkar utmarkt utan att importera recharts typ-tree.
 */
interface TooltipPayloadEntry {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

/**
 * Custom tooltip som bara visar serier med belopp > 0. Annars blir
 * tooltipsen "Utbetalt — Leveransvirke: 0 kr / Planerad: 0 kr"-spam
 * for manader som bara har en av kategorierna.
 */
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const visible = payload.filter(
    (p) => typeof p.value === 'number' && p.value > 0
  );
  if (visible.length === 0) return null;

  return (
    <div
      className="bg-white border border-[#021c20] px-[12px] py-[10px] font-['IBM_Plex_Sans',sans-serif] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] animate-tooltip-enter"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p className="text-[13px] font-semibold text-[#021c20] mb-[6px]">
        {label ? formatMonthLong(label) : ''}
      </p>
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
