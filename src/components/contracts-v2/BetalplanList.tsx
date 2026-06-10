import { formatAmount } from '../../data/contractsV2Data';
import type { BetalplanPostV2, Flöde } from '../../data/contractsV2Data';

interface BetalplanListProps {
  betalplan: BetalplanPostV2[];
  flöde?: Flöde;
}

/**
 * Two-column grid layout (datum · belopp).
 * Belopp is the user's share — co-owners can have individual payment plans
 * so we never show a "total contract" amount at row level.
 */
export default function BetalplanList({ betalplan, flöde = 'intäkt' }: BetalplanListProps) {
  const isKostnad = flöde === 'kostnad';
  const summaryLabel = isKostnad ? 'Att betala' : 'Återstående';
  if (betalplan.length === 0) {
    return (
      <p
        className="px-[16px] md:px-[24px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Ingen betalplan kopplad till kontraktet.
      </p>
    );
  }

  const totalt = betalplan.reduce((s, p) => s + p.belopp, 0);

  const gridCls = 'grid grid-cols-[1fr_auto] gap-x-[16px] px-[16px] md:px-[24px]';

  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Header */}
      <div className={`${gridCls} py-[8px] border-b border-[#e4e4e4]`}>
        <p
          className="text-left font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Datum
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Belopp
        </p>
      </div>

      {/* Rows */}
      {betalplan.map((post, i) => (
        <div key={i} className={`${gridCls} items-center py-[10px] border-b border-[#e4e4e4]`}>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {post.datum}
          </p>
          <p
            className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {formatAmount(post.belopp, flöde)}
          </p>
        </div>
      ))}

      {/* Återstående / Att betala — pinned at the bottom */}
      <div className={`${gridCls} items-center py-[10px] bg-[#f7f7f7] border-t border-[#e4e4e4] mt-auto`}>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {summaryLabel}
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatAmount(totalt, flöde)}
        </p>
      </div>
    </div>
  );
}
