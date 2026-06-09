import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  getPaymentsOverTime,
  getPaymentsDataDateRange,
  formatSEK,
  type Arbetsform,
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
const COLOR_PLANERAD = '#B2E8E8'; // pale teal — visuellt separat från utbetalda

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

/** "2026-06" → "Jun 2026". */
function formatMonthLabel(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  const m = months[parseInt(monthStr, 10) - 1] ?? monthStr;
  return `${m} ${yearStr}`;
}

/**
 * Kombi-chart för Krav 3 + Krav 5: utbetalda + planerade utbetalningar
 * sida vid sida per månad (likt aktieportföljers utdelnings-historik +
 * förväntade utdelningar).
 *
 * Datumväljare ovanför reglerar intervallet. FilterDropdown styr vilka
 * kategorier som inkluderas (3 avverkningsrätt-arbetsformer +
 * Leveransvirke + Planerade).
 */
export default function PaymentsChart() {
  // Hämta datasetets verkliga datumspann och lägg på en månads buffer
  // i båda riktningarna så X-axeln har lite andrum.
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

  const data = useMemo(() => {
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

  // Är respektive serie värd att visa? (har data inom intervallet och är vald)
  const showAvverkning = useMemo(() => data.some((d) => d.utbetaltAvverkning > 0), [data]);
  const showLeveransvirke = useMemo(
    () => selected.has('Leveransvirke') && data.some((d) => d.utbetaltLeveransvirke > 0),
    [selected, data]
  );
  const showPlanerad = useMemo(
    () => selected.has('Planerade') && data.some((d) => d.planerad > 0),
    [selected, data]
  );

  return (
    <SectionCard
      title="Utbetalningar och betalplan över tid"
      fullWidth
      titleInfoText="Utbetalda och planerade betalningar per månad (inkl moms). Solid färg = redan utbetalt, ljusare = planerat i betalplan."
    >
      <div className="flex flex-col gap-[16px] p-[16px]">
        {/* Kontroller-rad: datum-range + kategori-filter */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-[16px] lg:gap-[24px]">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartChange={setStartDate}
            onEndChange={setEndDate}
            defaultRange={defaultRange}
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

        {/* Diagram */}
        <div className="h-[300px] md:h-[360px] w-full">
          {data.length === 0 ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <CartesianGrid strokeDasharray="2 4" stroke="#e4e4e4" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#021c20"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e4e4e4' }}
                  tickFormatter={formatMonthLabel}
                  minTickGap={20}
                />
                <YAxis
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatTick}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: '#f0f4f0' }}
                  contentStyle={{
                    border: '1px solid #e4e4e4',
                    borderRadius: 0,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 13,
                  }}
                  formatter={(value: number) => formatSEK(value)}
                  labelFormatter={(label: string) => formatMonthLabel(label)}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    fontSize: 13,
                  }}
                  iconType="square"
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
        Inga betalningar matchar valt filter eller datumintervall.
      </p>
    </div>
  );
}
