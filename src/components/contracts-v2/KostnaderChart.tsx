import { useMemo, useState } from 'react';
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
  getPaymentsDataDateRange,
  formatSEK,
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

  const data = useMemo(
    () => getKostnaderOverTid({ startDate, endDate }),
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
    </SectionCard>
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
