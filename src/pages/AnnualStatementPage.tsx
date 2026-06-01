import { useState, useMemo } from 'react';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import EconomyTabBar from '../components/EconomyTabBar';
import SortHeader, { type SortDirection } from '../components/SortHeader';
import { Footer } from '../components/Footer';
import { parseStorlekBytes } from '../data/dokumentData';

interface Arsbesked {
  id: string;
  namn: string;
  år: string;
  storlek: string;
  datum: string; // ISO YYYY-MM-DD (uppladdat)
}

const arsbeskedData: Arsbesked[] = [
  { id: '1', namn: 'Årsbesked 2024.pdf', år: '2024', storlek: '124 kB', datum: '2025-02-10' },
  { id: '2', namn: 'Årsbesked 2023.pdf', år: '2023', storlek: '118 kB', datum: '2024-02-08' },
  { id: '3', namn: 'Årsbesked 2022.pdf', år: '2022', storlek: '112 kB', datum: '2023-02-09' },
  { id: '4', namn: 'Årsbesked 2021.pdf', år: '2021', storlek: '108 kB', datum: '2022-02-11' },
];

type SortKey = 'namn' | 'år' | 'datum' | 'storlek';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export default function AnnualStatementPage() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'år',
    direction: 'desc',
  });

  const sortedData = useMemo(() => {
    return [...arsbeskedData].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      switch (sortConfig.key) {
        case 'namn':
          av = a.namn.toLowerCase();
          bv = b.namn.toLowerCase();
          break;
        case 'år':
          av = Number(a.år);
          bv = Number(b.år);
          break;
        case 'datum':
          av = a.datum;
          bv = b.datum;
          break;
        case 'storlek':
          av = parseStorlekBytes(a.storlek);
          bv = parseStorlekBytes(b.storlek);
          break;
      }
      if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
      if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  };

  const handleDownload = (a: Arsbesked) => {
    toast.info(`Nedladdning startar — ${a.namn}`);
  };

  // Desktop grid — 5 kolumner: Namn · År · Datum · Storlek · Download.
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0, 2.4fr) minmax(0, 0.6fr) minmax(0, 1fr) minmax(0, 0.8fr) 40px',
    columnGap: '16px',
    alignItems: 'center',
  };
  const gridCls = 'px-[16px] md:px-[24px]';

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[#021c20] text-nowrap whitespace-pre"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Min ekonomi
          </p>

          <EconomyTabBar activePath="annual-statement" />

          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border-t border-b md:border border-[#e4e4e4] overflow-hidden">
            <div className="content-stretch flex flex-col w-full">
              {/* Heading-sektion utan kontroller — min-h matchar exakt
                  de heading-sektioner som har 48px-knappar/sökfält så att
                  alla tabbar har samma toppsektions-höjd. */}
              <div className="content-stretch flex flex-col justify-center w-full px-[16px] md:px-[24px] py-[16px] min-h-[80px]">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Årsbesked
                </p>
              </div>

              {/* Desktop — sortable table */}
              <div className="hidden md:block w-full">
                <div
                  style={gridStyle}
                  className={`${gridCls} py-[10px] bg-[#f7f7f7] border-t border-b border-[#e4e4e4]`}
                >
                  <SortHeader
                    label="Namn"
                    active={sortConfig.key === 'namn'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('namn')}
                  />
                  <SortHeader
                    label="År"
                    active={sortConfig.key === 'år'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('år')}
                  />
                  <SortHeader
                    label="Datum"
                    active={sortConfig.key === 'datum'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('datum')}
                  />
                  <SortHeader
                    label="Storlek"
                    align="right"
                    active={sortConfig.key === 'storlek'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('storlek')}
                  />
                  <span />
                </div>

                {sortedData.map((a) => (
                  <div
                    key={a.id}
                    style={gridStyle}
                    className={`${gridCls} py-[10px] border-b border-[#e4e4e4] last:border-b-0`}
                  >
                    <div className="flex items-center gap-[12px] min-w-0">
                      <FileText
                        className="size-[18px] text-[#1e3856] shrink-0"
                        strokeWidth={2}
                      />
                      <p
                        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {a.namn}
                      </p>
                    </div>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {a.år}
                    </p>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {a.datum}
                    </p>
                    <p
                      className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {a.storlek}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDownload(a)}
                      className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0 justify-self-end"
                      aria-label={`Ladda ner ${a.namn}`}
                    >
                      <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobil — card-stack */}
              <div className="md:hidden flex flex-col">
                {sortedData.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start justify-between gap-[12px] px-[16px] py-[12px] border-t border-[#e4e4e4]"
                  >
                    <div className="flex items-start gap-[12px] min-w-0">
                      <FileText
                        className="size-[18px] text-[#1e3856] shrink-0 mt-[2px]"
                        strokeWidth={2}
                      />
                      <div className="flex flex-col gap-[2px] min-w-0">
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {a.namn}
                        </p>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {a.datum} · {a.storlek}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(a)}
                      className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
                      aria-label={`Ladda ner ${a.namn}`}
                    >
                      <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
