import svgPaths from "../imports/svg-desqjdz1to";
import InvoicesTable, { invoicesDataForMobile } from "../components/InvoicesTable";
import MobileInvoiceCard from "../components/MobileInvoiceCard";
import StatCard from "../components/StatCard";
import ActionCard from "../components/ActionCard";
import { Footer } from "../components/Footer";
import { Receipt } from "lucide-react";

export default function InvoicesPage() {
  const handleTabClick = (path: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  const tabs = [
    { name: 'Kontrakt', path: 'contracts' },
    { name: 'Fakturor', path: 'invoices' },
    { name: 'Årsbesked', path: 'annual-statement' },
  ];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[#021c20] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>

          {/* Tab Navigation */}
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 overflow-x-auto w-full">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                className={`cursor-pointer relative shrink-0 ${
                  tab.path === 'invoices' ? '' : 'opacity-60 hover:opacity-80'
                }`}
              >
                {tab.path === 'invoices' && (
                  <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
                )}
                <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {tab.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Card - Invoice Alert */}
          <div className="w-full md:w-1/2">
            <ActionCard
              icon={
                <Receipt className="size-6" stroke="#1E3856" strokeWidth={2} />
              }
              iconBackgroundColor="#e4f5f5"
              title="Inkommen faktura väntar på betalning"
              tooltipText="Du har en obetald faktura som behöver betalas. Klicka för att se fakturan och genomföra betalningen."
              description={
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                        <p className="leading-[normal] relative shrink-0 text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <span>Du har en obetald faktura på </span>
                          <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                            12 198 kr
                          </span>
                        </p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          <span style={{ fontVariationSettings: "'wdth' 100" }}>Faktura 5678901</span>
                          <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              buttons={[
                { label: 'Visa faktura', variant: 'primary' }
              ]}
            />
          </div>

          {/* Info Text */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] relative w-full">
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Fakturor
                  </p>
                </div>
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Här ser du dina fakturor från 2023 och framåt.
                </p>
                
                {/* Desktop Table */}
                <div className="hidden md:block w-full">
                  <InvoicesTable />
                </div>

                {/* Mobile Card List */}
                <div className="flex md:hidden flex-col gap-[16px] w-full">
                  {invoicesDataForMobile.map((invoice, index) => (
                    <MobileInvoiceCard 
                      key={invoice.id} 
                      invoice={invoice}
                      defaultExpanded={index === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}