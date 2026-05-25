import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import type { KontraktV2 } from '../../data/contractsV2Data';

interface AffärGroupProps {
  title: string;
  contracts: KontraktV2[];
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Collapsible group of contracts belonging to the same skogsaffär (or the
 * "Övriga kontrakt" bucket). Header shows title and contract count.
 */
export default function AffärGroup({ title, contracts, defaultOpen = true, children }: AffärGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <div
        className="content-stretch flex items-center justify-between gap-[12px] py-[10px] px-[16px] md:px-[24px] bg-[#f7f7f7] hover:bg-[#efefef] border-b border-[#e4e4e4] cursor-pointer transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-[10px] min-w-0">
          <ChevronDown
            className={`size-[16px] text-[#021c20] transition-transform duration-200 shrink-0 ${
              isOpen ? '' : '-rotate-90'
            }`}
            strokeWidth={2}
          />
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] truncate"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {title}
          </p>
          <div className="bg-white border border-[#e4e4e4] px-[6px] py-[1px] shrink-0">
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70 uppercase tracking-[0.5px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contracts.length} kontrakt
            </p>
          </div>
        </div>
      </div>
      {isOpen && <div className="w-full">{children}</div>}
    </div>
  );
}
