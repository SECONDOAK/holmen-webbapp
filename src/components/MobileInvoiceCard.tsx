import { useState } from 'react';
import StatusBadge from './StatusBadge';

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  property: string;
  description: string;
  amount: string;
  status: string;
  dueDate: string;
  year?: string;
  documentLink?: string;
}

interface MobileInvoiceCardProps {
  invoice: InvoiceData;
  defaultExpanded?: boolean;
}

export default function MobileInvoiceCard({ invoice, defaultExpanded = false }: MobileInvoiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white relative w-full">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        {/* Header - Always visible */}
        <div className="box-border content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
          <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {invoice.description}
              </p>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-medium gap-[2px] items-start leading-[normal] relative shrink-0 text-[#021c20] text-[12px] w-full">
              <p className="opacity-80 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                Faktura {invoice.invoiceNumber}
              </p>
              <p className="opacity-70 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
                {invoice.property}
              </p>
            </div>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
            <div className="relative shrink-0 size-[24px]">
              {isExpanded ? (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g id="fi:minus">
                    <path d="M5 12H19" stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </g>
                </svg>
              ) : (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g id="fi:plus">
                    <path d="M12 5V19" stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M5 12H19" stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </g>
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] pt-0 relative w-full">
            {/* Amount and Due Date Section */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Belopp
                </p>
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 1">
                      <path d="M0 0.5H194" stroke="#E4E4E4" strokeDasharray="1 1" />
                    </svg>
                  </div>
                </div>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {invoice.amount}
                </p>
              </div>
              <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Status
                </p>
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159 1">
                      <path d="M0 0.5H159" stroke="#E4E4E4" strokeDasharray="1 1" />
                    </svg>
                  </div>
                </div>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {invoice.status}
                </p>
              </div>
            </div>

            {/* Document Link */}
            {invoice.documentLink && (
              <div className="content-stretch flex h-[22px] items-start justify-between relative shrink-0 w-full">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#0f6bb6] text-[16px] cursor-pointer hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {invoice.documentLink}
                  </p>
                </div>
              </div>
            )}

            {/* Additional Details Section */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {invoice.year && (
                <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    År
                  </p>
                  <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                    <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 319 1">
                        <path d="M0 0.5H319" stroke="#E4E4E4" strokeDasharray="1 1" />
                      </svg>
                    </div>
                  </div>
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {invoice.year}
                  </p>
                </div>
              )}
              <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Belopp
                </p>
                <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                  <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 1">
                      <path d="M0 0.5H194" stroke="#E4E4E4" strokeDasharray="1 1" />
                    </svg>
                  </div>
                </div>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {invoice.amount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}