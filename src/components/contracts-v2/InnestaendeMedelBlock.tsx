import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { aggregateContractsV2, formatSEK } from '../../data/contractsV2Data';
import SectionCard from './SectionCard';

/**
 * Kompakt belopps-format for trang plats (donut-center): tn/mn kr med
 * en decimal, avrundat. T.ex. 691 000 -> "691 tn kr", 1 250 000 ->
 * "1,3 mn kr". Under tusen visas hela kronor.
 */
function formatSEKCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '−' : '';
  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1).replace('.', ',')} mn kr`;
  }
  if (abs >= 1_000) {
    return `${sign}${Math.round(abs / 1_000)} tn kr`;
  }
  return formatSEK(value);
}

/**
 * Samma färger som InnestaendeMedelCard på kontraktssidan så
 * fördelningen känns igen mellan vyerna:
 *   Avsatt för skogsvård = navy (--h-blue-1)
 *   I betalplan          = muted teal (--h-blue-4)
 *   Disponibelt belopp   = lime (--h-green-4)
 */
const BUCKETS = [
  {
    key: 'avsatt',
    label: 'Avsatt för skogsvård',
    description: 'Reserverat för skogsvård.',
    color: '#1E3856',
  },
  {
    key: 'iBetalplan',
    label: 'I betalplan',
    description: 'Reserverat för utbetalning.',
    color: '#7DB5B3',
  },
  {
    key: 'fria',
    label: 'Disponibelt belopp',
    description: 'Ej reserverat eller i betalplan – tillgängligt att använda.',
    color: '#C4D987',
  },
] as const;

interface BucketRow {
  key: string;
  label: string;
  description: string;
  color: string;
  belopp: number;
  andel: number;
}

/**
 * Innestående medel — aktuellt saldo (påverkas inte av vald period)
 * nedbrutet i de tre delarna Avsatt för skogsvård / I betalplan /
 * Disponibelt belopp, med ett cirkeldiagram som visar fördelningen.
 */
export default function InnestaendeMedelBlock() {
  /** Index pa den rad anvandaren hover:ar — lyser upp motsvarande slice. */
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const agg = useMemo(() => aggregateContractsV2(), []);
  const total = agg.totalInnestaende;

  const rows: BucketRow[] = useMemo(() => {
    const values: Record<string, number> = {
      avsatt: agg.totalInnestaendeAvsatt,
      iBetalplan: agg.totalInnestaendeIBetalplan,
      fria: agg.totalInnestaendeFria,
    };
    return BUCKETS.map((b) => ({
      ...b,
      belopp: values[b.key],
      andel: total > 0 ? values[b.key] / total : 0,
    }));
  }, [agg, total]);

  return (
    <SectionCard
      title="Innestående medel"
      fullWidth
      titleInfoText="Aktuellt saldo, påverkas inte av vald period. Belopp visas exklusive moms; moms tillkommer vid utbetalning."
    >
      <div className="flex flex-col gap-[20px] p-[16px] md:p-[24px]">
        {total === 0 ? (
          <EmptyState />
        ) : (
          // @container sa layouten foljer KORTETS bredd (det ligger i en
          // halvbredds-kolumn) snarare an viewporten: donut + lista sida
          // vid sida nar kortet ar bredare an 520px, annars staplade.
          <div className="@container">
            <div className="flex flex-col @[520px]:flex-row @[520px]:items-center gap-[20px] @[520px]:gap-[40px]">
              {/* Donut med totalsumman i mitten */}
              <div className="relative h-[220px] md:h-[260px] w-full max-w-[320px] mx-auto @[520px]:flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rows}
                    dataKey="belopp"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="78%"
                    paddingAngle={1}
                    isAnimationActive={false}
                    labelLine={false}
                    label={renderPctLabel}
                    onMouseEnter={(_, index) => setHoveredIdx(index)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {rows.map((row, i) => (
                      <Cell
                        key={row.key}
                        fill={row.color}
                        stroke="#ffffff"
                        strokeWidth={1}
                        fillOpacity={
                          hoveredIdx === null || hoveredIdx === i ? 1 : 0.3
                        }
                        style={{ transition: 'fill-opacity 150ms ease-out' }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Mitten av donuten. Default: totalsumma (kompakt). Vid
                  hover pa en slice ELLER en legend-rad byts den mot den
                  hovrade delens namn + belopp + andel — i centret, sa
                  inget flyter over texten. Hala dolda donut-hhalet ar
                  smalt sa vi haller texten kompakt. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[78%] flex flex-col items-center text-center">
                {hoveredIdx !== null && rows[hoveredIdx] ? (
                  <>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] uppercase tracking-[0.4px] text-[#021c20] opacity-70 leading-[1.2]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {rows[hoveredIdx].label}
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-[#021c20] tabular-nums leading-[1.25] mt-[2px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {formatSEKCompact(rows[hoveredIdx].belopp)}
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {(rows[hoveredIdx].andel * 100).toFixed(1).replace('.', ',')} %
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[10px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Totalt innestående
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#021c20] tabular-nums leading-[1.2]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {formatSEKCompact(total)}
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] text-[11px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      exklusive moms
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Fordelnings-lista — under donuten (stackat) eller till
                hoger om den (brett kort) via @container-flex ovanfor. */}
            <div className="flex flex-col gap-[2px] w-full @[520px]:flex-1">
              {rows.map((row, i) => (
                <div
                  key={row.key}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="grid grid-cols-[1fr_auto_auto] gap-x-[12px] md:gap-x-[16px] items-center py-[12px] px-[8px] -mx-[8px] border-b border-[#e4e4e4] last:border-b-0 hover:bg-[#f7f7f7] transition-colors cursor-default"
                >
                  <div className="flex items-start gap-[10px] min-w-0">
                    <span
                      className="size-[12px] shrink-0 mt-[4px]"
                      style={{ backgroundColor: row.color }}
                    />
                    <div className="flex flex-col gap-[2px] min-w-0">
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[13px] md:text-[14px] text-[#021c20]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {row.description}
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[13px] md:text-[14px] text-[#021c20] tabular-nums text-right"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {formatSEK(row.belopp)}
                  </span>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] tabular-nums text-right min-w-[48px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {(row.andel * 100).toFixed(1).replace('.', ',')} %
                  </span>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

/* ============================================================
 * Procent-label utanfor varje slice
 * ============================================================ */

interface SliceLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  percent?: number;
}

/**
 * Renderar procent-text strax UTANFOR varje slice (radie = outerRadius
 * + offset). Text-ankaret vaxlar sida sa labelen inte krockar med
 * ringen. Skippar slices < 3% sa smala segment inte far overlappande
 * labels.
 */
function renderPctLabel(props: SliceLabelProps): React.ReactNode {
  const { cx, cy, midAngle, outerRadius, percent } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined ||
    percent === undefined ||
    percent < 0.03
  ) {
    return null;
  }
  const RAD = Math.PI / 180;
  const r = outerRadius + 16;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
      fill="#021c20"
      textAnchor={x >= cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
      style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
    >
      {(percent * 100).toFixed(0)} %
    </text>
  );
}

function EmptyState() {
  return (
    <div className="h-[120px] w-full flex items-center justify-center">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga innestående medel.
      </p>
    </div>
  );
}
