import { ChevronRight } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import SortHeader, { type SortDirection } from '../SortHeader';
import type { KontraktV2, ContractStatusV2 } from '../../data/contractsV2Data';
import { statusLabel, formatSEK, innestaendeTotalt } from '../../data/contractsV2Data';

export type ContractSortKey =
  | 'kontraktsnummer'
  | 'uppdragstyp'
  | 'arbetsform'
  | 'fastighet'
  | 'andel'
  | 'kontraktsdatum'
  | 'innestaende'
  | 'status';

interface ContractRowProps {
  contract: KontraktV2;
}

interface ContractRowHeaderProps {
  sortKey: ContractSortKey;
  sortDirection: SortDirection;
  onSort: (key: ContractSortKey) => void;
}

const statusVariant: Record<ContractStatusV2, 'info' | 'warning'> = {
  signerad: 'info',
  'för-signering': 'warning',
};

/**
 * Grid columns:
 * Kontrakt# · Uppdragstyp · Arbetsform · Fastighet · Andel · Datum · Innestående · Status · arrow
 */
const GRID_COLS =
  'grid-cols-[1.1fr_1.1fr_1.1fr_1.3fr_0.6fr_0.9fr_1.1fr_1.2fr_40px]';

export function ContractRowHeader({ sortKey, sortDirection, onSort }: ContractRowHeaderProps) {
  return (
    <div
      className={`hidden md:grid ${GRID_COLS} gap-[12px] items-center px-[16px] md:px-[24px] py-[12px] bg-[#f7f7f7] border-t border-b border-[#e4e4e4]`}
    >
      <SortHeader
        label="Kontrakt"
        active={sortKey === 'kontraktsnummer'}
        direction={sortDirection}
        onClick={() => onSort('kontraktsnummer')}
      />
      <SortHeader
        label="Uppdragstyp"
        active={sortKey === 'uppdragstyp'}
        direction={sortDirection}
        onClick={() => onSort('uppdragstyp')}
      />
      <SortHeader
        label="Arbetsform"
        active={sortKey === 'arbetsform'}
        direction={sortDirection}
        onClick={() => onSort('arbetsform')}
      />
      <SortHeader
        label="Fastighet"
        active={sortKey === 'fastighet'}
        direction={sortDirection}
        onClick={() => onSort('fastighet')}
      />
      <SortHeader
        label="Andel"
        active={sortKey === 'andel'}
        direction={sortDirection}
        onClick={() => onSort('andel')}
      />
      <SortHeader
        label="Datum"
        active={sortKey === 'kontraktsdatum'}
        direction={sortDirection}
        onClick={() => onSort('kontraktsdatum')}
      />
      <SortHeader
        label="Innestående"
        align="right"
        active={sortKey === 'innestaende'}
        direction={sortDirection}
        onClick={() => onSort('innestaende')}
      />
      <SortHeader
        label="Status"
        align="right"
        active={sortKey === 'status'}
        direction={sortDirection}
        onClick={() => onSort('status')}
      />
      <span />
    </div>
  );
}

export default function ContractRow({ contract }: ContractRowProps) {
  const openContract = () => {
    window.dispatchEvent(new CustomEvent('openContract', { detail: contract.id }));
  };

  return (
    <div
      className={`hidden md:grid ${GRID_COLS} gap-[12px] items-center px-[16px] md:px-[24px] py-[14px] border-b border-[#e4e4e4] cursor-pointer hover:bg-[#f7f7f7] transition-colors`}
      onClick={openContract}
      role="button"
      tabIndex={0}
      aria-label={`Öppna kontrakt ${contract.kontraktsnummer}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openContract();
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
        {contract.kontraktsdatum}
      </p>
      <p
        className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {formatSEK(innestaendeTotalt(contract))}
      </p>
      <div className="flex justify-end">
        <StatusBadge label={statusLabel[contract.status]} variant={statusVariant[contract.status]} />
      </div>
      <ChevronRight className="size-[18px] text-[#021c20]" strokeWidth={2} />
    </div>
  );
}
