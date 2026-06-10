import StatusBadge from '../StatusBadge';
import type { ÅtgardV2 } from '../../data/contractsV2Data';

interface AtgardListItemProps {
  åtgärd: ÅtgardV2;
}

const variantByStatus: Record<ÅtgardV2['status'], 'neutral' | 'info' | 'success'> = {
  planerad: 'neutral',
  pågående: 'info',
  avslutad: 'success',
};

const labelByStatus: Record<ÅtgardV2['status'], string> = {
  planerad: 'Planerad',
  pågående: 'Pågående',
  avslutad: 'Avslutad',
};

export default function AtgardListItem({ åtgärd }: AtgardListItemProps) {
  return (
    <div className="content-stretch flex items-center justify-between gap-[12px] px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4] last:border-b-0">
      <div className="flex flex-col gap-[2px] min-w-0">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {åtgärd.namn}
        </p>
        {åtgärd.datum && (
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {åtgärd.datum}
          </p>
        )}
      </div>
      <StatusBadge label={labelByStatus[åtgärd.status]} variant={variantByStatus[åtgärd.status]} />
    </div>
  );
}
