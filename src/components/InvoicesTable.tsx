import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from './StatusBadge';
import svgPaths from '../imports/svg-desqjdz1to';

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  assignmentType: string;
  amount: string;
  status: string;
  property: string;
}

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

const invoicesData: InvoiceRow[] = [
  {
    id: '1',
    invoiceNumber: '1241241',
    invoiceDate: '2025-06-13',
    assignmentType: 'Skogsvård',
    amount: '5 432 kr',
    status: 'Inväntar betalning',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '2',
    invoiceNumber: '1234567',
    invoiceDate: '2025-06-12',
    assignmentType: 'Leveransvirke',
    amount: '3 789 kr',
    status: 'Inväntar betalning',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '3',
    invoiceNumber: '8901234',
    invoiceDate: '2025-05-23',
    assignmentType: 'Leveransvirke',
    amount: '5 432 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '4',
    invoiceNumber: '5678901',
    invoiceDate: '2025-02-05',
    assignmentType: 'Skogsvård',
    amount: '12 198 kr',
    status: 'Förfallen',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '5',
    invoiceNumber: '2345678',
    invoiceDate: '2025-01-30',
    assignmentType: 'Avverkningsrätt',
    amount: '21 234 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '6',
    invoiceNumber: '3456789',
    invoiceDate: '2024-11-18',
    assignmentType: 'Avverkningsrätt',
    amount: '6 543 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '7',
    invoiceNumber: '6789012',
    invoiceDate: '2024-08-22',
    assignmentType: 'Avverkningsrätt',
    amount: '4 321 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '8',
    invoiceNumber: '4567890',
    invoiceDate: '2024-03-09',
    assignmentType: 'Avverkningsrätt',
    amount: '76 890 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '9',
    invoiceNumber: '7890123',
    invoiceDate: '2024-02-11',
    assignmentType: 'Skogsvård',
    amount: '91 876 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '10',
    invoiceNumber: '8901234',
    invoiceDate: '2023-12-15',
    assignmentType: 'Avverkningsrätt',
    amount: '18 765 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '11',
    invoiceNumber: '0123456',
    invoiceDate: '2023-11-04',
    assignmentType: 'Skogsvård',
    amount: '5 678 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  },
  {
    id: '12',
    invoiceNumber: '9012345',
    invoiceDate: '2023-10-27',
    assignmentType: 'Avverkningsrätt',
    amount: '21 345 kr',
    status: 'Betald',
    property: 'LEMESJÖ 1:52'
  }
];

export const invoicesDataForMobile: InvoiceData[] = invoicesData.map((invoice) => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber,
  property: invoice.property,
  description: invoice.assignmentType,
  amount: invoice.amount,
  status: invoice.status,
  dueDate: invoice.invoiceDate,
  year: invoice.invoiceDate.includes('2025') ? '2025' : invoice.invoiceDate.includes('2024') ? '2024' : '2023',
  documentLink: `Faktura-${invoice.invoiceNumber}.pdf`
}));

function PdfIcon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g>
          <path d={svgPaths.p220a8f20} fill="black" />
          <path d={svgPaths.p21228300} fill="black" />
          <path d={svgPaths.p2a679470} fill="black" />
        </g>
      </svg>
    </div>
  );
}

export default function InvoicesTable() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof InvoiceRow, direction: 'ascending' | 'descending' } | null>(null);

  const sortedInvoicesData = useMemo(() => {
    let sortableInvoicesData = [...invoicesData];
    if (sortConfig !== null) {
      sortableInvoicesData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableInvoicesData;
  }, [sortConfig]);

  const requestSort = (key: keyof InvoiceRow) => {
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
            className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[200px] cursor-pointer hover:bg-[#f7f7f7] transition-colors"
            onClick={() => requestSort('invoiceNumber')}
          >
            <div className="flex items-center gap-[4px]">
              <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Fakturanummer</p>
              {sortConfig?.key === 'invoiceNumber' && (
                sortConfig.direction === 'ascending' ? 
                  <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                  <ChevronDown className="w-4 h-4 text-[#021c20]" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 top-0 w-px">
              <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('property')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Fastighet</p>
                  {sortConfig?.key === 'property' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('invoiceDate')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Datum</p>
                  {sortConfig?.key === 'invoiceDate' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('assignmentType')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Uppdragstyp</p>
                  {sortConfig?.key === 'assignmentType' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('amount')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Belopp</p>
                  {sortConfig?.key === 'amount' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Status</p>
                  {sortConfig?.key === 'status' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[220px]">
            <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Faktura</p>
          </div>
        </div>

        {/* Table Rows */}
        {sortedInvoicesData.map((row, index) => (
          <div key={row.id} className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
            <div className={`${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[200px]`}>
              <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.invoiceNumber}</p>
              <div className="absolute bottom-0 right-0 top-0 w-px">
                <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.property}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.invoiceDate}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.assignmentType}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.amount}</p>
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`basis-0 ${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
              <div className="size-full">
                <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                  <StatusBadge status={row.status} />
                  <div className="absolute bottom-0 right-[-0.33px] top-0 w-px">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${index % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]`}>
              <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre cursor-pointer hover:underline">
                Kundfaktura {row.invoiceNumber}
              </p>
              <PdfIcon />
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}