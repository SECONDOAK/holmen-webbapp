import svgPaths from "../imports/svg-sis7nuk31q";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ActionCard from "../components/ActionCard";
import ForestButton from "../components/ForestButton";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { FileSignature } from "lucide-react";

export default function EconomyPage() {
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
          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>

          {/* Tab Navigation */}
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 overflow-x-auto w-full">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                className="cursor-pointer relative shrink-0 opacity-60 hover:opacity-80"
              >
                <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
                  <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {tab.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Alert Cards - Horizontal scroll on mobile */}
          <div className="relative shrink-0 w-full">
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden flex gap-[24px] overflow-x-auto pb-4 -mx-[16px] px-[16px] snap-x snap-mandatory overscroll-behavior-x-contain">
              {/* Contract Card */}
              <div className="min-w-[calc(100vw-64px)] snap-start">
                <ActionCard
                  icon={
                    <FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />
                  }
                  iconBackgroundColor="#e4f5f5"
                  title="Nytt kontrakt väntar på signering"
                  tooltipText="Du har fått ett kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltigt."
                  description={
                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                          <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                            <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                                Daniel Larsson
                              </span>
                              <span>{` har bjudit in dig att signera ett kontrakt med BankID`}</span>
                            </p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  buttons={[
                    { label: 'Signera kontrakt', variant: 'primary' }
                  ]}
                />
              </div>

              {/* Invoice Card */}
              <div className="min-w-[calc(100vw-64px)] snap-start">
                <ActionCard
                  icon={
                    <div className="relative shrink-0 size-[24px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="u:invoice">
                          <path d={svgPaths.p0c89e2c0} fill="var(--fill-0, #B43437)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  }
                  iconBackgroundColor="#fad2af"
                  title="Inkommen faktura väntar på betalning"
                  tooltipText="Du har en obetald faktura som behöver betalas. Klicka för att se fakturan och genomföra betalningen."
                  description={
                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                          <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                            <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
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
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-[24px] relative shrink-0 w-full">
              {/* Contract Card */}
              <ActionCard
                className=""
                icon={
                  <FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />
                }
                iconBackgroundColor="#e4f5f5"
                title="Nytt kontrakt väntar på signering"
                tooltipText="Du har fått ett kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltigt."
                description={
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                          <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                              Daniel Larsson
                            </span>
                            <span>{` har bjudit in dig att signera ett kontrakt med BankID`}</span>
                          </p>
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                            <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
                            <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                buttons={[
                  { label: 'Signera kontrakt', variant: 'primary' }
                ]}
              />

              {/* Invoice Card */}
              <ActionCard
                className=""
                icon={
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g id="u:invoice">
                        <path d={svgPaths.p0c89e2c0} fill="var(--fill-0, #1E3856)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                }
                iconBackgroundColor="#e4f5f5"
                title="Inkommen faktura väntar på betalning"
                tooltipText="Du har en obetald faktura som behöver betalas. Klicka för att se fakturan och genomföra betalningen."
                description={
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                          <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
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
          </div>

          {/* Chart Section */}
          <div className="bg-white border border-[var(--border-gray)] box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full max-w-none md:max-w-[1604px]">
            {/* Title and Dropdown at top */}
            <div className="content-stretch flex flex-col md:flex-row gap-[12px] md:gap-0 md:items-center md:justify-between relative shrink-0 w-full">
              <div className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[16px] md:text-[18px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Intäkter och kostnader per år
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[200px] border border-[var(--border-gray)] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <SelectValue placeholder="Alla fastigheter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla fastigheter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chart */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full overflow-x-auto">
              {/* Grid Lines */}
              <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full min-w-[600px]">
                {['600 000', '400 000', '200 000', '0'].map((value, index) => (
                  <div key={index} className="content-stretch flex gap-[12px] md:gap-[24px] items-start relative shrink-0 w-full">
                    <div className="basis-0 content-stretch flex gap-[10px] grow items-center min-h-px min-w-px relative shrink-0">
                      <div className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] md:text-[14px] text-right text-zinc-600 w-[50px] md:w-[60px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {value}
                      </div>
                      <div className="basis-0 bg-[#e4e4e4] grow h-px min-h-px min-w-px relative shrink-0" />
                    </div>
                  </div>
                ))}

                {/* Chart Bars */}
                <div className="absolute h-[170px] items-end leading-[0] left-[65px] md:left-[85px] right-[30px] md:right-[50px] px-0 py-0 bottom-[10px] flex justify-between">
                  {[
                    { income: 110, expense: 28 },
                    { income: 52, expense: 16 },
                    { income: 35, expense: 8 },
                    { income: 35, expense: 95 },
                    { income: 140, expense: 52 },
                    { income: 110, expense: 28 },
                    { income: 28, expense: 8 },
                  ].map((bar, index) => (
                    <div key={index} className="flex gap-[2px] md:gap-[4px] items-end relative">
                      <motion.div 
                        className="bg-[#1e3856] w-[28px] md:w-[42px]" 
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.income}px` }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      />
                      <motion.div 
                        className="bg-[#cc8c52] w-[28px] md:w-[42px]" 
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.expense}px` }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1 + 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Years at bottom */}
              <div className="relative shrink-0 w-full min-w-[600px]">
                <div className="size-full">
                  <div className="box-border content-stretch flex items-start justify-between pl-[75px] md:pl-[100px] pr-[45px] md:pr-[65px] py-0 relative w-full">
                    {['2024', '2023', '2022', '2021', '2020', '2019', '2018'].map((year) => (
                      <div key={year} className="flex items-center justify-center relative shrink-0">
                        <div className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] md:text-[14px] text-zinc-600" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend at bottom */}
            <div className="content-stretch flex gap-[10px] items-center justify-center md:justify-end relative shrink-0 w-full">
              <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                <div className="bg-[#1e3856] size-[16px]" />
                <div className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] md:text-[14px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Intäkter
                </div>
              </div>
              <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
                <div className="bg-[#cc8c52] size-[16px]" />
                <div className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] md:text-[14px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Kostnader
                </div>
              </div>
            </div>
          </div>

          {/* Latest Invoices */}
          <div className="bg-white relative shrink-0 -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full max-w-none md:max-w-[1604px]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] relative w-full">
                <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] md:text-[18px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Senaste fakturor
                    </p>
                  </div>
                  <div className="box-border content-stretch flex items-center pb-[4px] pt-0 px-0 relative shrink-0 cursor-pointer hover:opacity-70">
                    <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] md:text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Visa alla
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  {[
                    { id: '1234556', status: 'BETALA NU', highlight: true },
                    { id: '1232566', status: 'Betald', highlight: false },
                    { id: '1234567', status: 'Betald', highlight: false },
                  ].map((invoice) => (
                    <div key={invoice.id} className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] md:text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <span>{`Faktura: `}</span>
                        <span style={{ fontVariationSettings: "'wdth' 100" }}>{invoice.id}</span>
                      </p>
                      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1332 1">
                            <path d="M0 0.5H1332" stroke="#E4E4E4" strokeDasharray="1 1" />
                          </svg>
                        </div>
                      </div>
                      <p className={`font-['IBM_Plex_Sans:${invoice.highlight ? 'Bold' : 'Regular'}',sans-serif] ${invoice.highlight ? 'font-bold' : 'font-normal'} leading-[normal] relative shrink-0 text-[14px] md:text-[16px] ${invoice.highlight ? 'text-[#0f6bb6]' : 'text-black'} text-nowrap whitespace-pre`} style={{ fontVariationSettings: "'wdth' 100" }}>
                        {invoice.status}
                      </p>
                    </div>
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