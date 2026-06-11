import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { aggregateContractsV2, formatSEK } from '../../data/contractsV2Data';
import SectionCard from './SectionCard';

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
                    innerRadius="68%"
                    outerRadius="92%"
                    paddingAngle={1}
                    isAnimationActive={false}
                    labelLine={false}
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
                  <Tooltip
                    content={<PieTooltip total={total} />}
                    isAnimationActive={false}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Mitten av donuten: totalsumman. Vid legend-hover byts
                  den mot tooltip-rutan for den hovrade delen. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {hoveredIdx !== null && rows[hoveredIdx] ? (
                  <TooltipBox
                    label={rows[hoveredIdx].label}
                    belopp={rows[hoveredIdx].belopp}
                    andel={rows[hoveredIdx].andel}
                    total={total}
                  />
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[10px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Totalt innestående
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[18px] md:text-[22px] text-[#021c20] tabular-nums leading-[1.2]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {formatSEK(total)}
                    </span>
                    <span
                      className="font-['IBM_Plex_Sans',sans-serif] text-[11px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      exklusive moms
                    </span>
                  </div>
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
 * Tooltip
 * ============================================================ */

interface PieTooltipPayload {
  payload?: BucketRow;
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
  const entry = payload[0]?.payload;
  if (!entry) return null;
  return (
    <TooltipBox
      label={entry.label}
      belopp={entry.belopp}
      andel={entry.andel}
      total={total}
    />
  );
}

function TooltipBox({
  label,
  belopp,
  andel,
  total,
}: {
  label: string;
  belopp: number;
  andel: number;
  total: number;
}) {
  return (
    <div
      className="bg-white border border-[#021c20] px-[12px] py-[10px] font-['IBM_Plex_Sans',sans-serif] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] animate-tooltip-enter"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      <p className="text-[13px] font-semibold text-[#021c20] mb-[4px]">{label}</p>
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
