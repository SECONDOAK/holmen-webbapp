import { ChevronDown } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import SortHeader, { type SortDirection } from '../SortHeader';
import ContractDetailsPanel from './ContractDetailsPanel';
import type { KontraktV2, ContractStatusV2 } from '../../data/contractsV2Data';
import { statusLabel } from '../../data/contractsV2Data';

export type ContractSortKey =
  | 'kontraktsnummer'
  | 'uppdragstyp'
  | 'arbetsform'
  | 'fastighet'
  | 'andel'
  | 'år'
  | 'status';

interface ContractRowProps {
  contract: KontraktV2;
  expanded: boolean;
  onToggle: () => void;
  /**
   * Markerar raden som del av en affärsgrupp med blå vänsterkant.
   * Bara den synliga raden får kanten — det expanderade detalj­panelet
   * nedanför behåller sin egen layout.
   */
  inGroup?: boolean;
}

interface ContractRowHeaderProps {
  sortKey: ContractSortKey;
  sortDirection: SortDirection;
  onSort: (key: ContractSortKey) => void;
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
        label="År"
        active={sortKey === 'år'}
        direction={sortDirection}
        onClick={() => onSort('år')}
      />
      <SortHeader
        label="Status"
        active={sortKey === 'status'}
        direction={sortDirection}
        onClick={() => onSort('status')}
      />
      <span />
    </div>
  );
}

export default function ContractRow({ contract, expanded, onToggle, inGroup = false }: ContractRowProps) {
  return (
    <>
      <div
        className={`hidden md:grid ${GRID_COLS} gap-[12px] items-center px-[16px] md:px-[24px] py-[14px] border-b border-[#e4e4e4] cursor-pointer hover:bg-[#f7f7f7] transition-colors ${
          inGroup ? 'border-l-[3px] border-l-[#1e3856]/40' : ''
        }`}
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
