import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { DokumentV2 } from '../../data/contractsV2Data';

interface DokumentListItemProps {
  dokument: DokumentV2;
}

export default function DokumentListItem({ dokument }: DokumentListItemProps) {
  const handleDownload = () => {
    toast.info(`Nedladdning startar — ${dokument.namn}`);
  };

  return (
    <div className="content-stretch flex items-center justify-between gap-[12px] px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4] last:border-b-0">
      <div className="flex items-center gap-[12px] min-w-0">
        <FileText className="size-[18px] text-[#1e3856] shrink-0" strokeWidth={2} />
        <div className="flex flex-col gap-[2px] min-w-0">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {dokument.namn}
          </p>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {dokument.storlek}
            {dokument.uppladdat ? ` · ${dokument.uppladdat}` : ''}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
        aria-label={`Ladda ner ${dokument.namn}`}
      >
        <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
      </button>
    </div>
  );
}
