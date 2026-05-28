import { ChevronDown } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import ContractDetailsPanel from './ContractDetailsPanel';
import type { KontraktV2, ContractStatusV2 } from '../../data/contractsV2Data';
import { statusLabel } from '../../data/contractsV2Data';

interface MobileContractCardV2Props {
  contract: KontraktV2;
  expanded: boolean;
  onToggle: () => void;
}

const statusVariant: Record<ContractStatusV2, 'info' | 'warning'> = {
  signerad: 'info',
  'för-signering': 'warning',
};

export default function MobileContractCardV2({ contract, expanded, onToggle }: MobileContractCardV2Props) {
  const openAsPage = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openContract', { detail: contract.id }));
  };
  return (
    <div className="bg-white border border-[#e4e4e4] w-full">
      <div
        className="content-stretch flex flex-col gap-[12px] p-[16px] cursor-pointer"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="content-stretch flex items-start justify-between gap-[12px]">
          <div className="flex flex-col gap-[2px] min-w-0">
            <button
              type="button"
              onClick={openAsPage}
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#1e3856] underline decoration-transparent active:decoration-[#1e3856] underline-offset-[3px] text-left transition-colors"
              style={{ fontVariationSettings: "'wdth' 100" }}
              aria-label={`Öppna kontrakt ${contract.kontraktsnummer} på egen sida`}
            >
              {contract.kontraktsnummer}
            </button>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-80"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.fastighet}
            </p>
          </div>
          <div className="flex items-center gap-[8px] shrink-0">
            <StatusBadge label={statusLabel[contract.status]} variant={statusVariant[contract.status]} />
            <ChevronDown
              className={`size-[18px] text-[#021c20] transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`}
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[8px]">
          <div>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60 uppercase tracking-[0.5px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Uppdragstyp
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.uppdragstyp}
            </p>
          </div>
          <div>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60 uppercase tracking-[0.5px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Arbetsform
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.arbetsform}
            </p>
          </div>
          <div>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60 uppercase tracking-[0.5px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Datum
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.kontraktsdatum}
            </p>
          </div>
          <div>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60 uppercase tracking-[0.5px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Min andel
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.andel}
            </p>
          </div>
        </div>
      </div>

      {expanded && <ContractDetailsPanel contract={contract} />}
    </div>
  );
}
