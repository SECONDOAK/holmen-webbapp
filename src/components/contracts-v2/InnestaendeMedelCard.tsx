import type { InnestaendeMedelV2 } from '../../data/contractsV2Data';
import { formatSEK } from '../../data/contractsV2Data';

interface InnestaendeMedelCardProps {
  innestaende: InnestaendeMedelV2;
  /**
   * Totalt utbetalt (din andel). Visas som en extra del så att HELA
   * kontraktssumman alltid syns — den försvinner inte bara för att
   * medel har betalats ut. Utelämnas/0 = ingen utbetalt-del visas.
   */
  utbetalt?: number;
}

/**
 * Visualises a contract's funds as a stacked horizontal bar:
 *  - Avsatt för skogsvård
 *  - I betalplan (reserverat enligt en planerad utbetalning)
 *  - Disponibelt belopp (varken avsatt eller i betalplan)
 *  - Utbetalt (redan utbetalda medel) — så totalsumman kvarstår i vyn
 *
 * Tillsammans utgör delarna kontraktets totala summa (din andel), så
 * användaren alltid ser helheten även när allt är utbetalt.
 */
export default function InnestaendeMedelCard({
  innestaende,
  utbetalt = 0,
}: InnestaendeMedelCardProps) {
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
      description: 'Ej reserverat eller i betalplan – tillgängligt att använda.',
      value: innestaende.fria,
      color: 'var(--h-green-4)',
    },
    // Utbetalt visas bara när det faktiskt finns utbetalda medel.
    ...(utbetalt > 0
      ? [
          {
            label: 'Utbetalt',
            description: 'Redan utbetalda medel.',
            value: utbetalt,
            color: '#9ca3af',
          },
        ]
      : []),
  ];

  const total = buckets.reduce((sum, b) => sum + b.value, 0);

  // Legend-kolumner följer KORTETS bredd (@container): 1 på smalt, 2 på
  // mellan, och fullt antal (3 eller 4 beroende på om Utbetalt finns)
  // när kortet är brett nog. Så man får 4 i bredd där det får plats.
  const legendCols =
    buckets.length >= 4 ? '@[720px]:grid-cols-4' : '@[520px]:grid-cols-3';

  return (
    <div className="@container content-stretch flex flex-col gap-[16px] w-full">
      {/* Stacked bar — segmenten staplas i samma ordning som hinkarna,
          med löpande offset så de ligger kant i kant. */}
      <div className="relative w-full h-[14px] bg-[#f3f3f5] overflow-hidden">
        {total > 0 ? (
          (() => {
            let offsetPct = 0;
            return buckets.map((b) => {
              const widthPct = (b.value / total) * 100;
              const leftPct = offsetPct;
              offsetPct += widthPct;
              if (widthPct <= 0) return null;
              return (
                <div
                  key={b.label}
                  className="absolute top-0 h-full"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    backgroundColor: b.color,
                  }}
                  aria-label={b.label}
                />
              );
            });
          })()
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-50"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Inga medel att redovisa
            </p>
          </div>
        )}
      </div>

      {/* Legend + values — 2 kolumner på desktop (2x2 vid utbetalt-del),
          staplade på mobil. */}
      <div className={`grid grid-cols-1 @[380px]:grid-cols-2 ${legendCols} gap-[12px] @[720px]:gap-[16px] w-full`}>
        {buckets.map((b) => (
          <div key={b.label} className="flex items-start gap-[8px] min-w-0">
            <div
              className="size-[10px] mt-[8px] shrink-0"
              style={{ backgroundColor: b.color }}
              aria-hidden
            />
            <div className="flex flex-col gap-[4px] min-w-0">
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
