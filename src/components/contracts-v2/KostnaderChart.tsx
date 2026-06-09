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
  getKostnaderOverTid,
  getKostnaderDetailByMonth,
  getPaymentsDataDateRange,
  formatSEK,
  type KostnadDetailRow,
} from '../../data/contractsV2Data';
import DateRangePicker from './DateRangePicker';
import SectionCard from './SectionCard';

const COLOR_KOSTNAD = '#8F3857'; // --h-red-1 (Holmens dämpade röd-ton)

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

function formatMonthLabel(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  const m = months[parseInt(monthStr, 10) - 1] ?? monthStr;
  // Bara januari ankras med tva-siffrigt ar sa tick-raden blir kort.
  return monthStr === '01' ? `${m} ${yearStr.slice(2)}` : m;
}

/** Lang variant for tooltips dar plats inte ar bristvara. */
function formatMonthLong(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
  const m = months[parseInt(monthStr, 10) - 1] ?? monthStr;
  return `${m} ${yearStr}`;
}

/**
 * Krav 8 (omformulerat): Kostnader över tid — månadsbucketed bar chart
 * istället för år-baserad accordion-tabell. Datumväljare reglerar
 * intervallet.
 *
 * Belopp är negativa (kostnader = pengar ut). Vi visar dem som positiva
 * staplar i chart:en för läsbarhet och formatterar med minustecken i
 * tooltip + Y-axel.
 */
export default function KostnaderChart() {
  const dataRange = useMemo(() => getPaymentsDataDateRange(), []);
  const defaultRange = useMemo(
    () => ({ start: dataRange.min, end: dataRange.max }),
    [dataRange]
  );

  const [startDate, setStartDate] = useState(defaultRange.start);
  const [endDate, setEndDate] = useState(defaultRange.end);
  /** Vag av om detalj-listan ska visas. Default expanderad. */
  const [detailsOpen, setDetailsOpen] = useState(true);

  const data = useMemo(
    () => getKostnaderOverTid({ startDate, endDate }),
    [startDate, endDate]
  );

  const detailMonths = useMemo(
    () => getKostnaderDetailByMonth({ startDate, endDate }),
    [startDate, endDate]
  );

  // Visualiseras som positiva staplar; behåll negativt tecken i text-format.
  const chartData = useMemo(
    () => data.map((d) => ({ month: d.month, kostnad: Math.abs(d.kostnad) })),
    [data]
  );

  const totalKostnad = useMemo(
    () => data.reduce((s, d) => s + d.kostnad, 0),
    [data]
  );

  return (
    <SectionCard
      title="Kostnader över tid"
      fullWidth
      titleInfoText="Genomförda kostnader per månad ur återrapporterade mätbesked. Filtrera intervallet via datumväljaren."
    >
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="flex flex-wrap items-end justify-between gap-[16px]">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
            bounds={dataRange}
          />
          <div className="flex flex-col gap-[2px] items-end text-right">
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Total kostnad inom intervallet
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#021c20] tabular-nums"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(totalKostnad)}
            </span>
          </div>
        </div>

        <div className="h-[280px] md:h-[340px] w-full">
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
                  tickFormatter={formatMonthLabel}
                  tick={{ fill: '#021c20' }}
                  angle={-35}
                  textAnchor="end"
                  height={56}
                  interval={0}
                />
                <YAxis
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => formatTick(-v)}
                  tick={{ fill: '#021c20' }}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: '#f7f7f7' }}
                  contentStyle={{
                    border: '1px solid #021c20',
                    borderRadius: 0,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 13,
                    color: '#021c20',
                  }}
                  wrapperClassName="animate-tooltip-enter"
                  itemStyle={{ color: '#021c20' }}
                  labelStyle={{ color: '#021c20', fontWeight: 600 }}
                  formatter={(value: number) => formatSEK(-value)}
                  labelFormatter={(label: string) => formatMonthLong(label)}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="kostnad"
                  name="Kostnad"
                  fill={COLOR_KOSTNAD}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Detaljerad lista — eget block med gra bg, spanner hela kortets
          bredd. Header-knappen togglar hela blocket. Varje manad ar
          individuellt utfallbar. Klick pa en detalj-rad navigerar till
          kontraktet via openContract-event. */}
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
                <KostnadMonthRow
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
 * Underkomponenter for detalj-listan
 * ============================================================ */

function KostnadMonthRow({
  month,
  total,
  rader,
}: {
  month: string;
  total: number;
  rader: KostnadDetailRow[];
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
        {/* Hoger: totalsumma (negativ) */}
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] md:text-[15px] text-[#021c20] shrink-0 tabular-nums"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatSEK(total)}
        </p>
      </button>
      {open && (
        <div className="bg-[#fafafa] border-t border-[#e4e4e4]">
          {rader.map((r, i) => (
            <KostnadDetailItem key={i} row={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function KostnadDetailItem({ row }: { row: KostnadDetailRow }) {
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
          {row.sortiment} · {row.kontraktsnummer}
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

function EmptyState() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga kostnader inom valt datumintervall.
      </p>
    </div>
  );
}
