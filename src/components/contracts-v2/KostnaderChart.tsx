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
  getAvrakningarPerYear,
  getAvrakningarDetailByYear,
  formatSEK,
  type KostnadDetailRow,
} from '../../data/contractsV2Data';
import { formatRangeLabel } from './DateRangePicker';
import SectionCard from './SectionCard';

const COLOR_AVRAKNING = '#8F3857'; // --h-red-1 (Holmens dämpade röd-ton)

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

interface KostnaderChartProps {
  /** Periodens start (ISO YYYY-MM-DD) — styrs av sidans globala periodväljare. */
  startDate: string;
  /** Periodens slut (ISO YYYY-MM-DD). */
  endDate: string;
}

/**
 * Avräkningar över tid — kostnader som räknats av från kontraktens
 * intäkter, per år som stapeldiagram. Detaljerad lista grupperad per
 * år (ihopfälld som standard) med klickbara kontrakt-rader.
 *
 * Belopp är negativa (avdrag). Staplarna visas som positiva för
 * läsbarhet; minustecknet behålls i text-format (Y-axel + tooltip).
 */
export default function KostnaderChart({ startDate, endDate }: KostnaderChartProps) {
  /** Detalj-listan ihopfalld som standard. */
  const [detailsOpen, setDetailsOpen] = useState(false);

  const data = useMemo(
    () => getAvrakningarPerYear({ startDate, endDate }),
    [startDate, endDate]
  );
  const detailYears = useMemo(
    () => getAvrakningarDetailByYear({ startDate, endDate }),
    [startDate, endDate]
  );

  // Visualiseras som positiva staplar; behall negativt tecken i text.
  const chartData = useMemo(
    () => data.map((d) => ({ year: d.year, belopp: Math.abs(d.belopp) })),
    [data]
  );

  const total = useMemo(() => data.reduce((s, d) => s + d.belopp, 0), [data]);

  return (
    <SectionCard
      title="Avräkningar över tid"
      fullWidth
      titleInfoText="Kostnader som räknats av från intäkterna i dina kontrakt, per år."
    >
      <div className="flex flex-col gap-[20px] p-[16px] md:p-[24px] flex-1 lg:min-h-[408px]">
        {/* Topp-rad: period vanster, totalsumma hoger */}
        <div className="flex items-start justify-between gap-[16px] w-full">
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
              {formatRangeLabel(startDate, endDate)}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-end text-right">
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Totala avräkningar
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#021c20] tabular-nums"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(total)}
            </span>
          </div>
        </div>

        {/* Diagram — staplar per ar. Samma hojd som PaymentsChart sa
            graferna ar visuellt jamforbara sida vid sida. mt-auto pinnar
            chart + legend mot kortets botten. */}
        <div className="h-[138px] md:h-[162px] w-full mt-auto">
          {chartData.length === 0 || total === 0 ? (
            <EmptyState />
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
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="belopp"
                  name="Avräkningar"
                  fill={COLOR_AVRAKNING}
                  radius={[2, 2, 0, 0]}
                  maxBarSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Legend centrerad under grafen — samma monster som
            Utbetalningar-grafen. */}
        <div className="flex justify-center">
          <div className="flex items-center gap-[8px]">
            <span
              className="size-[10px] rounded-full shrink-0"
              style={{ backgroundColor: COLOR_AVRAKNING }}
            />
            <span
              className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Avräkningar
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

      {/* Detaljerad lista — ihopfalld som standard. Per ar; raderna ar
          klickbara till respektive kontrakt. */}
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
      {/* Datum behovs har eftersom ar-headern bara anger aret. */}
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
        Inga avräkningar inom valt datumintervall.
      </p>
    </div>
  );
}
