import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatSEK, type KostnadRad } from '../../data/contractsV2Data';

interface KostnaderTableProps {
  data: {
    year: string;
    totalKostnad: number;
    rader: KostnadRad[];
  }[];
}

/**
 * Krav 8: Accordion-tabell över kostnader per år. Det nyaste året
 * (eller innevarande år om data finns för det) är öppet som default;
 * äldre år är kollapsade och kan expanderas vid klick.
 */
export default function KostnaderTable({ data }: KostnaderTableProps) {
  // Default: öppet på första året (vilket är nyaste eftersom helpern sorterar desc)
  const initialOpen = data.length > 0 ? new Set([data[0].year]) : new Set<string>();
  const [openYears, setOpenYears] = useState<Set<string>>(initialOpen);

  if (data.length === 0) {
    return (
      <p
        className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga kostnader har registrerats ännu.
      </p>
    );
  }

  const toggle = (year: string) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  return (
    <div className="flex flex-col flex-1 w-full">
      {data.map((yearData) => {
        const isOpen = openYears.has(yearData.year);
        return (
          <div key={yearData.year} className="border-b border-[#e4e4e4] last:border-b-0">
            {/* Year summary row — klickbar */}
            <button
              type="button"
              onClick={() => toggle(yearData.year)}
              className="w-full flex items-center justify-between gap-[12px] px-[16px] py-[16px] hover:bg-[#f7f7f7] transition-colors text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-[12px] min-w-0">
                <ChevronDown
                  className={`size-[16px] text-[#021c20] opacity-60 shrink-0 transition-transform ${
                    isOpen ? '' : '-rotate-90'
                  }`}
                  strokeWidth={2}
                />
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[15px] md:text-[16px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {yearData.year}
                </p>
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#021c20] opacity-60"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {yearData.rader.length} rader
                </p>
              </div>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] md:text-[15px] text-[#021c20] shrink-0"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {formatSEK(yearData.totalKostnad)}
              </p>
            </button>

            {/* Detalj-tabell när expanderad */}
            {isOpen && (
              <div className="bg-[#fafafa] overflow-x-auto border-t border-[#e4e4e4]">
                <div className="min-w-[640px] md:min-w-0">
                  <DetailHeader />
                  {yearData.rader.map((r, i) => (
                    <DetailRow key={i} rad={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const DETAIL_GRID =
  'grid grid-cols-[auto_auto_1fr_1fr_auto] gap-x-[12px] md:gap-x-[16px] px-[16px]';

function DetailHeader() {
  return (
    <div className={`${DETAIL_GRID} py-[8px] border-b border-[#e4e4e4]`}>
      <Th>Datum</Th>
      <Th>Kontrakt</Th>
      <Th>Fastighet</Th>
      <Th>Sortiment</Th>
      <Th align="right">Belopp</Th>
    </div>
  );
}

function DetailRow({ rad }: { rad: KostnadRad }) {
  return (
    <div className={`${DETAIL_GRID} items-center py-[8px] border-b border-[#e4e4e4] last:border-b-0`}>
      <Td>{rad.datum}</Td>
      <Td>{rad.kontraktsnummer}</Td>
      <Td truncate>{rad.fastighet}</Td>
      <Td truncate>{rad.sortiment}</Td>
      <Td align="right" bold>
        {formatSEK(rad.belopp)}
      </Td>
    </div>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <p
      className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </p>
  );
}

function Td({
  children,
  align = 'left',
  bold = false,
  truncate = false,
}: {
  children?: React.ReactNode;
  align?: 'left' | 'right';
  bold?: boolean;
  truncate?: boolean;
}) {
  return (
    <p
      className={`font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${bold ? 'font-semibold' : ''} ${truncate ? 'truncate' : ''}`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </p>
  );
}
