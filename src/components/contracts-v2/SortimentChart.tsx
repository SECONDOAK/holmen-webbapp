import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import {
  formatSEK,
  getIntakterPerSortiment,
} from '../../data/contractsV2Data';
import { formatRangeLabel } from './DateRangePicker';
import SectionCard from './SectionCard';

/**
 * Holmen-tonad palett som cyklar genom navy, sage, teal, lime, dark
 * forest och sa vidare. Andas skogsbruk men har tillrackligt distinkta
 * varden for att 6-8 segment ska kunna sarskiljas vid hover.
 */
const PALETTE = [
  '#1E3856', // navy (--h-blue-1)
  '#597340', // sage (--h-green-1)
  '#7DB5B3', // muted teal (--h-blue-4)
  '#C4D987', // lime (--h-green-4)
  '#32412A', // dark forest (--h-green-3)
  '#CC8C52', // tan (--h-brown-4)
  '#B2E8E8', // pale teal (--h-blue-5)
  '#8F3857', // muted red (--h-red-1)
];

/**
 * Krav 10: Intäkter per sortiment som mätts in. Cirkeldiagram med
 * legend-tabell bredvid sa anvandaren ser bade andelar visuellt
 * (pien) och exakta belopp (tabellen).
 */
interface SortimentChartProps {
  /** Periodens start (ISO YYYY-MM-DD) — styrs av sidans globala periodväljare. */
  startDate: string;
  /** Periodens slut (ISO YYYY-MM-DD). */
  endDate: string;
}

export default function SortimentChart({ startDate, endDate }: SortimentChartProps) {
  /** Index pa den rad anvandaren hover:ar i legend-tabellen — anvands
   *  for att lysa upp motsvarande pie-slice och dimma ovriga. */
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const rows = useMemo(
    () => getIntakterPerSortiment({ startDate, endDate }),
    [startDate, endDate]
  );

  const total = useMemo(
    () => rows.reduce((s, r) => s + r.belopp, 0),
    [rows]
  );

  return (
    <SectionCard
      title="Intäkter per sortiment"
      fullWidth
      titleInfoText="Fördelningen av dina intäkter per sortiment baserat på inmätta volymer i återrapporterade mätbesked inom vald period."
    >
      <div className="flex flex-col gap-[20px] p-[16px] md:p-[24px]">
        {/* Perioden styrs av sidans globala periodväljare. Vald period
            visas i text till vanster sa man ser vilken period som
            galler aven nar man scrollat forbi periodvaljaren;
            totalsumman till hoger. */}
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
              Total intäkt
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#021c20] tabular-nums"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {formatSEK(total)}
            </span>
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-[24px] md:gap-[40px] items-center">
            {/* Pien — vanster pa desktop, overst pa mobil. Relative
                wrapper sa vi kan overlay:a tooltip-popovern i centrum
                nar nagon legend-rad hover:as. */}
            <div className="relative h-[280px] md:h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={rows}
                    dataKey="belopp"
                    nameKey="sortiment"
                    cx="50%"
                    cy="50%"
                    outerRadius="92%"
                    isAnimationActive={false}
                    label={renderSliceLabel}
                    labelLine={false}
                  >
                    {rows.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PALETTE[i % PALETTE.length]}
                        stroke="#ffffff"
                        strokeWidth={1}
                        /* Nar nagon rad i legend-tabellen ar hover:ad
                           dimmas alla utom motsvarande slice. */
                        fillOpacity={
                          hoveredIdx === null || hoveredIdx === i ? 1 : 0.3
                        }
                        style={{ transition: 'fill-opacity 150ms ease-out' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    cursor={{ fill: '#f7f7f7' }}
                    content={<PieTooltip total={total} />}
                    isAnimationActive={false}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Overlay-tooltip nar legend-rad hover:as. Visar samma
                  innehall som recharts-tooltipen men positionerad i
                  pie:ns centrum istallet for vid muspekaren. */}
              {hoveredIdx !== null && rows[hoveredIdx] && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <TooltipBox
                    sortiment={rows[hoveredIdx].sortiment}
                    belopp={rows[hoveredIdx].belopp}
                    andel={rows[hoveredIdx].andel}
                    total={total}
                  />
                </div>
              )}
            </div>

            {/* Legend-tabell — hoger pa desktop, under pa mobil */}
            <div className="flex flex-col gap-[2px] w-full">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-[12px] md:gap-x-[16px] py-[8px] border-b border-[#e4e4e4]">
                <span
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Sortiment
                </span>
                <span
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] uppercase tracking-[0.5px] text-[#021c20] opacity-70 text-right"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Belopp
                </span>
                <span
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] uppercase tracking-[0.5px] text-[#021c20] opacity-70 text-right min-w-[40px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Andel
                </span>
              </div>
              {rows.map((row, i) => (
                <div
                  key={row.sortiment}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="grid grid-cols-[1fr_auto_auto] gap-x-[12px] md:gap-x-[16px] items-center py-[8px] px-[8px] -mx-[8px] border-b border-[#e4e4e4] last:border-b-0 hover:bg-[#f7f7f7] transition-colors cursor-default"
                >
                  <div className="flex items-center gap-[10px] min-w-0">
                    <span
                      className="size-[12px] shrink-0"
                      style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                    />
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] truncate"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {row.sortiment}
                    </span>
                  </div>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] tabular-nums text-right"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {formatSEK(row.belopp)}
                  </span>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] tabular-nums text-right min-w-[40px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {(row.andel * 100).toFixed(1).replace('.', ',')} %
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

interface PieTooltipPayload {
  name?: string;
  value?: number;
  payload?: { sortiment: string; belopp: number; andel: number };
}

function PieTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: PieTooltipPayload[];
  total: number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  if (!entry?.payload) return null;
  const { sortiment, belopp, andel } = entry.payload;
  return <TooltipBox sortiment={sortiment} belopp={belopp} andel={andel} total={total} />;
}

/**
 * Visuell tooltip-ruta — anvands bade som recharts-tooltip nar man
 * hovrar en slice, och som centrerad overlay nar man hovrar en
 * legend-rad. Identisk visuell layout sa det blir konsekvent.
 */
function TooltipBox({
  sortiment,
  belopp,
  andel,
  total,
}: {
  sortiment: string;
  belopp: number;
  andel: number;
  total: number;
}) {
  return (
    <div
      className="bg-white border border-[#021c20] px-[12px] py-[10px] font-['IBM_Plex_Sans',sans-serif] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] animate-tooltip-enter"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p className="text-[13px] font-semibold text-[#021c20] mb-[4px]">{sortiment}</p>
      <p className="text-[13px] text-[#021c20]">
        <span className="font-semibold">{formatSEK(belopp)}</span>
        <span className="opacity-70">
          {' '}
          · {(andel * 100).toFixed(1).replace('.', ',')} % av {formatSEK(total)}
        </span>
      </p>
    </div>
  );
}

/**
 * Renderar procent-text mitt i en slice. Skippar slices < 5 % sa
 * smala segment inte far overlappande labels.
 */
interface SliceLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

function renderSliceLabel(props: SliceLabelProps): React.ReactNode {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined ||
    percent < 0.05
  ) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const angle = -midAngle * (Math.PI / 180);
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
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
    <div className="h-[200px] w-full flex items-center justify-center">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga inmätta intäkter inom valt datumintervall.
      </p>
    </div>
  );
}
