import { ChevronDown } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import ContractDetailsPanel from './ContractDetailsPanel';
import type { KontraktV2, ContractStatusV2 } from '../../data/contractsV2Data';
import { statusLabel } from '../../data/contractsV2Data';

interface ContractRowProps {
  contract: KontraktV2;
  expanded: boolean;
  onToggle: () => void;
}

const statusVariant: Record<ContractStatusV2, 'success' | 'info' | 'warning'> = {
  'avslutad': 'success',
  'signerad': 'info',
  'för-signering': 'warning',
};

/**
 * Grid columns:
 * Kontrakt# · Uppdragstyp · Arbetsform · Fastighet · Andel · År · Status · chevron
 */
const GRID_COLS =
  'grid-cols-[1.2fr_1.2fr_1.2fr_1.4fr_0.7fr_0.6fr_1.4fr_40px]';

export function ContractRowHeader() {
  return (
    <div
      className={`hidden md:grid ${GRID_COLS} gap-[12px] items-center px-[16px] md:px-[24px] py-[12px] bg-white border-t border-b border-[#e4e4e4]`}
    >
      {['Kontrakt', 'Uppdragstyp', 'Arbetsform', 'Fastighet', 'Andel', 'År', 'Status', ''].map((h, i) => (
        <p
          key={i}
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {h}
        </p>
      ))}
    </div>
  );
}

export default function ContractRow({ contract, expanded, onToggle }: ContractRowProps) {
  return (
    <>
      <div
        className={`hidden md:grid ${GRID_COLS} gap-[12px] items-center px-[16px] md:px-[24px] py-[14px] border-b border-[#e4e4e4] cursor-pointer hover:bg-[#f7f7f7] transition-colors`}
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
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.kontraktsnummer}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.uppdragstyp}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.arbetsform}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.fastighet}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.andel}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.år}
        </p>
        <div>
          <StatusBadge label={statusLabel[contract.status]} variant={statusVariant[contract.status]} />
        </div>
        <ChevronDown
          className={`size-[18px] text-[#021c20] transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`}
          strokeWidth={2}
        />
      </div>
      {expanded && (
        <div className="hidden md:block">
          <ContractDetailsPanel contract={contract} />
        </div>
      )}
    </>
  );
}
