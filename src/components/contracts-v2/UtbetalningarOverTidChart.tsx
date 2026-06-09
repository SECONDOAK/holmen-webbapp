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
  getUtbetalningarOverTid,
  formatSEK,
  type Arbetsform,
} from '../../data/contractsV2Data';
import FilterDropdown from '../FilterDropdown';
import SectionCard from './SectionCard';

/** Filter-alternativ — 3 avverkningsrätt-arbetsformer + Leveransvirke. */
const FILTER_OPTIONS = [
  'Slutavverkning',
  'Gallring',
  'Övrig avverkning',
  'Leveransvirke',
] as const;
type FilterOpt = (typeof FILTER_OPTIONS)[number];

const COLOR_AVVERKNING = '#1E3856'; // --h-blue-1
const COLOR_LEVERANSVIRKE = '#7DB5B3'; // --h-blue-4

/** Y-axel-formatter — komprimerar stora belopp till "1.2 Mkr" eller "250 kkr". */
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
 * Krav 3: Vertikalt stapeldiagram över utbetalningar per år.
 * Stapel 1 = Avverkningsrätter (summa av valda arbetsformer)
 * Stapel 2 = Leveransvirke (visas bara om bockad och data finns)
 *
 * Filterar via FilterDropdown ovanför chart:en. Default: alla 4 alternativ
 * bockade.
 */
export default function UtbetalningarOverTidChart() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(FILTER_OPTIONS)
  );

  const data = useMemo(() => {
    // Översätt selected (Set<string>) till filter-typen helpern förväntar sig
    const arbetsformer = new Set<Arbetsform>();
    for (const opt of selected) {
      if (opt === 'Slutavverkning' || opt === 'Gallring' || opt === 'Övrig avverkning') {
        arbetsformer.add(opt as Arbetsform);
      }
    }
    const inkluderaLeveransvirke = selected.has('Leveransvirke');
    return getUtbetalningarOverTid({ arbetsformer, inkluderaLeveransvirke });
  }, [selected]);

  // Bestäm om Leveransvirke-stapeln ska visas (har data + är bockad)
  const showLeveransvirke = useMemo(
    () => selected.has('Leveransvirke') && data.some((d) => d.leveransvirke > 0),
    [selected, data]
  );
  const showAvverkning = useMemo(
    () => data.some((d) => d.avverkning > 0),
    [data]
  );

  return (
    <SectionCard
      title="Utbetalningar över tid"
      fullWidth
      titleInfoText="Genomförda utbetalningar per år (inkl moms). Filtrera per kategori — Leveransvirke visas som separat stapel om bockad och data finns."
    >
      <div className="flex flex-col gap-[16px] p-[16px]">
        <div className="md:max-w-[320px]">
          <FilterDropdown
            label="Kategori"
            options={[...FILTER_OPTIONS]}
            selected={selected}
            onChange={(next) => setSelected(next as Set<FilterOpt>)}
          />
        </div>

        <div className="h-[280px] md:h-[340px] w-full">
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
                  dataKey="year"
                  stroke="#021c20"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e4e4e4' }}
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
                    dataKey="avverkning"
                    name="Avverkningsrätter"
                    fill={COLOR_AVVERKNING}
                    radius={[2, 2, 0, 0]}
                  />
                )}
                {showLeveransvirke && (
                  <Bar
                    dataKey="leveransvirke"
                    name="Leveransvirke"
                    fill={COLOR_LEVERANSVIRKE}
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
        Inga utbetalningar matchar valt filter.
      </p>
    </div>
  );
}
