import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from './StatusBadge';
import svgPaths from '../imports/svg-eak34fr3h1';

export interface ContractRow {
  id: string;
  property: string;
  contractNumber: string;
  assignmentType: string;
  year: string;
  status: string;
  paidAmount: string;
  remainingAmount: string;
  details?: {
    contractNumber: string;
    property: string;
    assignmentType: string;
    status: string;
    paidAmount: string;
    remainingAmount: string;
    document: string;
    sortiments: Array<{
      name: string;
      m3f: string;
      mto: string;
      date: string;
      revenue: string;
    }>;
  };
}

const contractsData: ContractRow[] = [
  {
    id: '1',
    property: 'LEMESJÖ 1:17',
    contractNumber: '200433789',
    assignmentType: 'Avverkningsrätt',
    year: '2025',
    status: 'Pågående',
    paidAmount: '969 027 kr',
    remainingAmount: '123 111 kr',
    details: {
      contractNumber: '200433789',
      property: 'Lemesjö 1:17',
      assignmentType: 'Avverkningsrätt',
      status: 'Pågående',
      paidAmount: '969 027 kr',
      remainingAmount: '123 111 kr',
      document: 'Leverantörsavräkning 2025-01-08.pdf',
      sortiments: [
        { name: '0110 SÅGT TALL OB', m3f: '5', mto: '4', date: '2025-01-12', revenue: '4 462' },
        { name: '0110 SÅGT TALL OB', m3f: '12', mto: '10', date: '2025-01-12', revenue: '11 826' },
        { name: '0110 SÅGT TALL OB', m3f: '3', mto: '4', date: '2025-01-12', revenue: '9 122' },
        { name: '0110 SÅGT TALL OB', m3f: '1', mto: '3', date: '2025-01-12', revenue: '3 124' },
        { name: '0110 SÅGT TALL OB', m3f: '4', mto: '5', date: '2025-01-12', revenue: '1 122' },
      ]
    }
  },
  {
    id: '2',
    property: 'LEMESJÖ 1:17',
    contractNumber: '468612106',
    assignmentType: 'Gallring',
    year: '2025',
    status: 'Genomförd',
    paidAmount: '0 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '468612106',
      property: 'Lemesjö 1:17',
      assignmentType: 'Gallring',
      status: 'Genomförd',
      paidAmount: '0 SEK',
      remainingAmount: '0 SEK',
      document: 'Gallringsrapport 2025-01-15.pdf',
      sortiments: [
        { name: '0210 MASSAVED TALL', m3f: '8', mto: '7', date: '2025-01-15', revenue: '5 600' },
        { name: '0310 ENERGIVED', m3f: '3', mto: '2', date: '2025-01-15', revenue: '1 200' },
      ]
    }
  },
  {
    id: '3',
    property: 'LEMESJÖ 1:17',
    contractNumber: '123678945',
    assignmentType: 'Leveransvirke',
    year: '2025',
    status: 'Genomförd',
    paidAmount: '69 027 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '123678945',
      property: 'Lemesjö 1:17',
      assignmentType: 'Leveransvirke',
      status: 'Genomförd',
      paidAmount: '69 027 SEK',
      remainingAmount: '0 SEK',
      document: 'Leveransrapport 2025-02-01.pdf',
      sortiments: [
        { name: '0110 SÅGT TALL OB', m3f: '15', mto: '13', date: '2025-02-01', revenue: '18 900' },
        { name: '0120 SÅGT GRAN OB', m3f: '22', mto: '19', date: '2025-02-01', revenue: '27 550' },
        { name: '0210 MASSAVED TALL', m3f: '10', mto: '8', date: '2025-02-01', revenue: '7 000' },
        { name: '0220 MASSAVED GRAN', m3f: '12', mto: '10', date: '2025-02-01', revenue: '8 400' },
        { name: '0310 ENERGIVED', m3f: '5', mto: '4', date: '2025-02-01', revenue: '2 000' },
      ]
    }
  },
  {
    id: '4',
    property: 'LEMESJÖ 1:17',
    contractNumber: '468690006',
    assignmentType: 'Gallring',
    year: '2025',
    status: 'Genomförd',
    paidAmount: '0 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '468690006',
      property: 'Lemesjö 1:17',
      assignmentType: 'Gallring',
      status: 'Genomförd',
      paidAmount: '0 SEK',
      remainingAmount: '0 SEK',
      document: 'Gallringsplan 2025-03-10.pdf',
      sortiments: [
        { name: '0210 MASSAVED TALL', m3f: '6', mto: '5', date: '2025-03-10', revenue: '4 200' },
        { name: '0220 MASSAVED GRAN', m3f: '4', mto: '3', date: '2025-03-10', revenue: '2 800' },
      ]
    }
  },
  {
    id: '5',
    property: 'LEMESJÖ 1:17',
    contractNumber: '124236475',
    assignmentType: 'Röjning',
    year: '2024',
    status: 'Genomförd',
    paidAmount: '0 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '124236475',
      property: 'Lemesjö 1:17',
      assignmentType: 'Röjning',
      status: 'Genomförd',
      paidAmount: '0 SEK',
      remainingAmount: '0 SEK',
      document: 'Röjningsrapport 2024-11-20.pdf',
      sortiments: [
        { name: 'RÖJNING UNGSKOG', m3f: '0', mto: '0', date: '2024-11-20', revenue: '0' },
      ]
    }
  },
  {
    id: '6',
    property: 'STIG 1:19',
    contractNumber: '121245633',
    assignmentType: 'Avverkningsrätt',
    year: '2023',
    status: 'Genomförd',
    paidAmount: '469 112 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '121245633',
      property: 'Stig 1:19',
      assignmentType: 'Avverkningsrätt',
      status: 'Genomförd',
      paidAmount: '469 112 SEK',
      remainingAmount: '0 SEK',
      document: 'Slutavräkning 2023-12-15.pdf',
      sortiments: [
        { name: '0110 SÅGT TALL OB', m3f: '45', mto: '39', date: '2023-12-15', revenue: '56 550' },
        { name: '0120 SÅGT GRAN OB', m3f: '78', mto: '68', date: '2023-12-15', revenue: '98 600' },
        { name: '0130 SÅGT BJÖRK', m3f: '12', mto: '10', date: '2023-12-15', revenue: '14 500' },
        { name: '0210 MASSAVED TALL', m3f: '34', mto: '29', date: '2023-12-15', revenue: '23 800' },
        { name: '0220 MASSAVED GRAN', m3f: '56', mto: '48', date: '2023-12-15', revenue: '39 200' },
        { name: '0230 MASSAVED BJÖRK', m3f: '22', mto: '19', date: '2023-12-15', revenue: '15 400' },
        { name: '0310 ENERGIVED', m3f: '18', mto: '15', date: '2023-12-15', revenue: '7 200' },
      ]
    }
  },
  {
    id: '7',
    property: 'LEMESJÖ 1:17',
    contractNumber: '123 678 945',
    assignmentType: 'Leveransvirke',
    year: '2025',
    status: 'Genomförd',
    paidAmount: '69 027 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '123 678 945',
      property: 'Lemesjö 1:17',
      assignmentType: 'Leveransvirke',
      status: 'Genomförd',
      paidAmount: '69 027 SEK',
      remainingAmount: '0 SEK',
      document: 'Leveransrapport 2025-04-12.pdf',
      sortiments: [
        { name: '0110 SÅGT TALL OB', m3f: '18', mto: '15', date: '2025-04-12', revenue: '21 750' },
        { name: '0120 SÅGT GRAN OB', m3f: '24', mto: '21', date: '2025-04-12', revenue: '30 450' },
        { name: '0210 MASSAVED TALL', m3f: '8', mto: '7', date: '2025-04-12', revenue: '5 600' },
      ]
    }
  },
  {
    id: '8',
    property: 'LEMESJÖ 1:17',
    contractNumber: '468 690 006',
    assignmentType: 'Gallring',
    year: '2025',
    status: 'Genomförd',
    paidAmount: '0 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '468 690 006',
      property: 'Lemesjö 1:17',
      assignmentType: 'Gallring',
      status: 'Genomförd',
      paidAmount: '0 SEK',
      remainingAmount: '0 SEK',
      document: 'Gallringsrapport 2025-05-08.pdf',
      sortiments: [
        { name: '0210 MASSAVED TALL', m3f: '9', mto: '8', date: '2025-05-08', revenue: '6 400' },
        { name: '0220 MASSAVED GRAN', m3f: '11', mto: '9', date: '2025-05-08', revenue: '7 700' },
        { name: '0310 ENERGIVED', m3f: '4', mto: '3', date: '2025-05-08', revenue: '1 600' },
      ]
    }
  },
  {
    id: '9',
    property: 'LEMESJÖ 1:17',
    contractNumber: '124 236 475',
    assignmentType: 'Röjning',
    year: '2024',
    status: 'Genomförd',
    paidAmount: '0 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '124 236 475',
      property: 'Lemesjö 1:17',
      assignmentType: 'Röjning',
      status: 'Genomförd',
      paidAmount: '0 SEK',
      remainingAmount: '0 SEK',
      document: 'Röjningsrapport 2024-09-25.pdf',
      sortiments: [
        { name: 'RÖJNING UNGSKOG', m3f: '0', mto: '0', date: '2024-09-25', revenue: '0' },
      ]
    }
  },
  {
    id: '10',
    property: 'STIG 1:19',
    contractNumber: '121 245 633',
    assignmentType: 'Avverkningsrätt',
    year: '2023',
    status: 'Genomförd',
    paidAmount: '469 112 kr',
    remainingAmount: '0 kr',
    details: {
      contractNumber: '121 245 633',
      property: 'Stig 1:19',
      assignmentType: 'Avverkningsrätt',
      status: 'Genomförd',
      paidAmount: '469 112 SEK',
      remainingAmount: '0 SEK',
      document: 'Slutavräkning 2023-10-30.pdf',
      sortiments: [
        { name: '0110 SÅGT TALL OB', m3f: '52', mto: '45', date: '2023-10-30', revenue: '65 250' },
        { name: '0120 SÅGT GRAN OB', m3f: '85', mto: '74', date: '2023-10-30', revenue: '107 300' },
        { name: '0130 SÅGT BJÖRK', m3f: '14', mto: '12', date: '2023-10-30', revenue: '17 400' },
        { name: '0210 MASSAVED TALL', m3f: '38', mto: '33', date: '2023-10-30', revenue: '26 600' },
        { name: '0220 MASSAVED GRAN', m3f: '61', mto: '53', date: '2023-10-30', revenue: '42 700' },
        { name: '0310 ENERGIVED', m3f: '20', mto: '17', date: '2023-10-30', revenue: '8 000' },
      ]
    }
  }
];

export { contractsData };

interface ContractsTableProps {
  filteredData?: ContractRow[];
}

export default function ContractsTable({ filteredData }: ContractsTableProps) {
  const dataToShow = filteredData || contractsData;
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ContractRow, direction: 'ascending' | 'descending' } | null>(null);

  const sortedData = useMemo(() => {
    let sortableData = [...dataToShow];
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
  }, [dataToShow, sortConfig]);

  const requestSort = (key: keyof ContractRow) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        {/* Table Header */}
        <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
          <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]">
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
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('contractNumber')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Kontraktsnummer</p>
                  {sortConfig?.key === 'contractNumber' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
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
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('year')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">År</p>
                  {sortConfig?.key === 'year' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
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
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('paidAmount')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Utbetalt</p>
                  {sortConfig?.key === 'paidAmount' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
                <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0">
            <div className="size-full">
              <div 
                className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                onClick={() => requestSort('remainingAmount')}
              >
                <div className="flex items-center gap-[4px]">
                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Återstående</p>
                  {sortConfig?.key === 'remainingAmount' && (
                    sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="w-4 h-4 text-[#021c20]" /> : 
                      <ChevronDown className="w-4 h-4 text-[#021c20]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        {sortedData.map((row, index) => (
          <div key={row.id} className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full">
            {/* Collapsed Row */}
            <div 
              className={`content-stretch flex h-[48px] items-start relative shrink-0 w-full cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-[#f7f7f7]'}`}
              onClick={() => toggleRow(row.id)}
            >
              <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]`}>
                <div className="absolute bottom-0 right-0 top-0 w-px">
                  <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g>
                      {expandedRow === row.id ? (
                        <path d="M5 12H19" stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      ) : (
                        <>
                          <path d="M12 5V19" stroke="#021C20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M5 12H19" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </>
                      )}
                    </g>
                  </svg>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.property}</p>
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.contractNumber}</p>
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.assignmentType}</p>
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.year}</p>
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <StatusBadge status={row.status} />
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.paidAmount}</p>
                    <div className="absolute bottom-0 right-[-0.29px] top-0 w-px">
                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`basis-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7f7f7]'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{row.remainingAmount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedRow === row.id && row.details && (
              <div className="relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[64px] py-[40px] relative w-full">
                    {/* Om kontraktet */}
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Om kontraktet
                      </p>
                      <div className="content-stretch flex gap-[24px] h-[111px] items-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Kontraktsnummer</p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 484 1">
                                  <path d="M0 0.5H484" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.contractNumber}</p>
                          </div>
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Fastighet: </p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
                                  <path d="M0 0.5H530" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.property}</p>
                          </div>
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Uppdragstyp</p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 488 1">
                                  <path d="M0 0.5H488" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.assignmentType}</p>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Status</p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 581 1">
                                  <path d="M0 0.5H581" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.status}</p>
                          </div>
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Utbetalt belopp</p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 493 1">
                                  <path d="M0 0.5H493" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.paidAmount}</p>
                          </div>
                          <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>Återstående belopp</p>
                            <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
                              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 464 1">
                                  <path d="M0 0.5H464" stroke="#E4E4E4" strokeDasharray="1 1" />
                                </svg>
                              </div>
                            </div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{row.details.remainingAmount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex h-[22px] items-start justify-between relative shrink-0 w-full">
                        <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
                          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre cursor-pointer hover:underline" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {row.details.document}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detaljer Table */}
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Detaljer
                      </p>
                      <div className="relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                          {/* Details table header */}
                          <div className="content-stretch flex items-end relative shrink-0 w-full">
                            <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
                              <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
                                <div className="flex flex-col justify-end size-full">
                                  <div className="box-border content-stretch flex flex-col items-start justify-end px-[16px] py-[12px] relative size-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Sortiment</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                              <div className="relative shrink-0 w-full">
                                <div className="flex flex-col items-center size-full">
                                  <div className="box-border content-stretch flex flex-col items-center px-[16px] py-[4px] relative w-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Inmätt volym</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="content-stretch flex items-center relative shrink-0 w-full">
                                <div className="bg-white box-border content-stretch flex flex-col items-end pb-[12px] pt-0 px-[16px] relative shrink-0 w-[80px]">
                                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">m3f</p>
                                  <div className="absolute bottom-0 right-0 top-0 w-px">
                                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                  </div>
                                </div>
                                <div className="bg-white box-border content-stretch flex flex-col items-end pb-[12px] pt-0 px-[16px] relative shrink-0 w-[80px]">
                                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">mto</p>
                                  <div className="absolute bottom-0 right-0 top-0 w-px">
                                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
                              <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
                                <div className="flex flex-col justify-end size-full">
                                  <div className="box-border content-stretch flex flex-col items-start justify-end px-[16px] py-[12px] relative size-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Datum</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
                              <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
                                <div className="flex flex-col items-end justify-end size-full">
                                  <div className="box-border content-stretch flex flex-col items-end justify-end px-[16px] py-[12px] relative size-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Intäkt</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Details table rows */}
                          {row.details.sortiments.map((sortiment, sortIndex) => (
                            <div key={sortIndex} className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
                              <div className={`basis-0 ${sortIndex % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                                <div className="size-full">
                                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{sortiment.name}</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="content-stretch flex items-center relative shrink-0">
                                <div className={`${sortIndex % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} box-border content-stretch flex flex-col items-end px-[16px] py-[12px] relative shrink-0 w-[80px]`}>
                                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{sortiment.m3f}</p>
                                  <div className="absolute bottom-0 right-0 top-0 w-px">
                                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                  </div>
                                </div>
                                <div className={`${sortIndex % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} box-border content-stretch flex flex-col items-end px-[16px] py-[12px] relative shrink-0 w-[80px]`}>
                                  <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{sortiment.mto}</p>
                                  <div className="absolute bottom-0 right-0 top-0 w-px">
                                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                  </div>
                                </div>
                              </div>
                              <div className={`basis-0 ${sortIndex % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                                <div className="size-full">
                                  <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{sortiment.date}</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={`basis-0 ${sortIndex % 2 === 0 ? 'bg-[#f7f7f7]' : 'bg-white'} grow h-[48px] min-h-px min-w-px relative shrink-0`}>
                                <div className="flex flex-col items-end size-full">
                                  <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
                                    <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">{sortiment.revenue}</p>
                                    <div className="absolute bottom-0 right-0 top-0 w-px">
                                      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}