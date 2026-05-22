import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { formatAmount } from '../../data/contractsV2Data';
import type { UtbetalningV2, Flöde } from '../../data/contractsV2Data';

interface UtbetalningarTableProps {
  utbetalningar: UtbetalningV2[];
  kontraktsnummer: string;
  flöde?: Flöde;
}

/**
 * Two-column grid layout (datum · belopp) matching `BetalplanList`.
 * Belopp is the user's share — total contract value lives on the contract
 * header, not per-row, since co-owners have individual payment plans.
 */
export default function UtbetalningarTable({
  utbetalningar,
  kontraktsnummer,
  flöde = 'intäkt',
}: UtbetalningarTableProps) {
  const isKostnad = flöde === 'kostnad';
  const emptyState = isKostnad
    ? 'Inga betalningar har gjorts ännu på det här kontraktet.'
    : 'Inga utbetalningar har gjorts ännu på det här kontraktet.';
  const downloadLabel = isKostnad
    ? 'Sammanställning genomförda betalningar'
    : 'Sammanställning utbetalda medel';

  const totalt = utbetalningar.reduce((s, u) => s + u.belopp, 0);

  if (utbetalningar.length === 0) {
    return (
      <p
        className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {emptyState}
      </p>
    );
  }

  const handleDownload = () => {
    toast.info(`Sammanställning genereras — utbetalningar för kontrakt ${kontraktsnummer}`);
  };

  const gridCls = 'grid grid-cols-[1fr_auto] gap-x-[16px] px-[16px]';

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
      {utbetalningar.map((u, i) => (
        <div key={i} className={`${gridCls} items-center py-[10px] border-b border-[#e4e4e4]`}>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {u.datum}
          </p>
          <p
            className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {formatAmount(u.belopp, flöde)}
          </p>
        </div>
      ))}

      {/* Summa row */}
      <div className={`${gridCls} items-center py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4]`}>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Summa
        </p>
        <p
          className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {formatAmount(totalt, flöde)}
        </p>
      </div>

      {/* Download row — same look as DokumentListItem, but without subtitle */}
      <div className="content-stretch flex items-center justify-between gap-[12px] px-[16px] py-[12px] mt-auto">
        <div className="flex items-center gap-[12px] min-w-0">
          <FileText className="size-[18px] text-[#1e3856] shrink-0" strokeWidth={2} />
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {downloadLabel}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
          aria-label={`Skapa och ladda ner sammanställning av utbetalningar för kontrakt ${kontraktsnummer}`}
        >
          <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
