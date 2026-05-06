import svgPaths from "../imports/svg-zuqodhownz";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Footer } from "../components/Footer";

interface AnnualStatementRow {
  id: string;
  year: string;
  documentName: string;
  property: string;
}

const annualStatementsData: AnnualStatementRow[] = [
  {
    id: '1',
    year: '2024',
    documentName: 'Årsbesked 2024',
    property: 'Region mitt'
  },
  {
    id: '2',
    year: '2023',
    documentName: 'Årsbesked 2023',
    property: 'Region mitt'
  },
  {
    id: '3',
    year: '2022',
    documentName: 'Årsbesked 2022',
    property: 'Region mitt'
  },
  {
    id: '4',
    year: '2021',
    documentName: 'Årsbesked 2021',
    property: 'Region mitt'
  },
];

function PdfIcon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g>
          <path d="M16.625 19.375H2.375C1.685 19.375 1.125 18.815 1.125 18.125V1.875C1.125 1.185 1.685 0.625 2.375 0.625H11.875L17.875 6.625V18.125C17.875 18.815 17.315 19.375 16.625 19.375Z" fill="black" fillOpacity="0.1"/>
          <path d="M11.875 0.625V6.625H17.875L11.875 0.625Z" fill="black" fillOpacity="0.2"/>
          <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="black" fontSize="6" fontWeight="bold">PDF</text>
        </g>
      </svg>
    </div>
  );
}

function AnnualStatementsTable() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof AnnualStatementRow, direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableData = [...annualStatementsData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  const requestSort = (key: keyof AnnualStatementRow) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        {/* Table Header */}
        <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
          <div 
            className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0 cursor-pointer hover:bg-[#f7f7f7] transition-colors"
            onClick={() => requestSort('property')}
          >
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Region</p>
                  {sortConfig?.key === 'property' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div 
            className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0 cursor-pointer hover:bg-[#f7f7f7] transition-colors"
            onClick={() => requestSort('year')}
          >
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">År</p>
                  {sortConfig?.key === 'year' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]">
            <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Dokument</p>
          </div>
        </div>

        {/* Table Rows */}
        {sortedData.map((row, index) => (
          <div key={row.id} className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.property}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.year}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[var(--border-gray)] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[300px]`}>
              <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre cursor-pointer hover:underline">
                {row.documentName}
              </p>
              <PdfIcon />
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function AnnualStatementPage() {
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
                  tab.path === 'annual-statement' ? '' : 'opacity-60 hover:opacity-80'
                }`}
              >
                {tab.path === 'annual-statement' && (
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

          {/* Content Section */}
          <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] -mx-[16px] md:mx-0 relative w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[var(--border-gray)] border-solid inset-0 pointer-events-none" />
            
            <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
              <div className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] text-[rgba(2,28,32,0.9)]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Årsbesked
              </div>
            </div>

            {/* Annual Statements Table */}
            <AnnualStatementsTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}