import type { InnestaendeMedelV2 } from '../../data/contractsV2Data';
import { formatSEK } from '../../data/contractsV2Data';

interface InnestaendeMedelCardProps {
  innestaende: InnestaendeMedelV2;
}

/**
 * Visualises the three buckets of innestående medel:
 *  - Avsatt för skogsvård
 *  - I betalplan (reserverat enligt en planerad utbetalning)
 *  - Disponibelt belopp (varken avsatt eller i betalplan)
 *
 * Uses a stacked horizontal bar so the user immediately sees how the
 * innestående medel fördelar sig.
 */
export default function InnestaendeMedelCard({ innestaende }: InnestaendeMedelCardProps) {
  const total =
    innestaende.avsattSkogsvård + innestaende.iBetalplan + innestaende.fria;
  const reservedPct = total > 0 ? (innestaende.avsattSkogsvård / total) * 100 : 0;
  const planPct = total > 0 ? (innestaende.iBetalplan / total) * 100 : 0;
  const friaPct = total > 0 ? (innestaende.fria / total) * 100 : 0;

  const buckets = [
    {
      label: 'Avsatt för skogsvård',
      description: 'Reserverat för skogsvård.',
      value: innestaende.avsattSkogsvård,
      color: 'var(--h-blue-1)',
    },
    {
      label: 'I betalplan',
      description: 'Reserverat för utbetalning.',
      value: innestaende.iBetalplan,
      color: 'var(--h-blue-4)',
    },
    {
      label: 'Disponibelt belopp',
      description: 'Ej avsatt eller i betalplan – tillgängligt att använda.',
      value: innestaende.fria,
      color: 'var(--h-green-4)',
    },
  ];

  return (
    <div className="content-stretch flex flex-col gap-[16px] w-full">
      {/* Stacked bar */}
      <div className="relative w-full h-[14px] bg-[#f3f3f5] overflow-hidden">
        {total > 0 ? (
          <>
            <div
              className="absolute top-0 left-0 h-full"
              style={{ width: `${reservedPct}%`, backgroundColor: 'var(--h-blue-1)' }}
              aria-label="Avsatt för skogsvård"
            />
            <div
              className="absolute top-0 h-full"
              style={{
                left: `${reservedPct}%`,
                width: `${planPct}%`,
                backgroundColor: 'var(--h-blue-4)',
              }}
              aria-label="I betalplan"
            />
            <div
              className="absolute top-0 h-full"
              style={{
                left: `${reservedPct + planPct}%`,
                width: `${friaPct}%`,
                backgroundColor: 'var(--h-green-4)',
              }}
              aria-label="Disponibelt belopp"
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-50"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Inga innestående medel
            </p>
          </div>
        )}
      </div>

      {/* Legend + values — three columns on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] md:gap-[16px] w-full">
        {buckets.map((b) => (
          <div key={b.label} className="flex items-start gap-[8px] min-w-0">
            <div
              className="size-[10px] mt-[6px] shrink-0"
              style={{ backgroundColor: b.color }}
              aria-hidden
            />
            <div className="flex flex-col gap-[2px] min-w-0">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] font-medium"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {b.label}
              </p>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {b.description}
              </p>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] mt-[4px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {formatSEK(b.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
