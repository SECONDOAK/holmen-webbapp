import { useState, useMemo } from 'react';
import {
  Download,
  FileText,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import SortHeader, { type SortDirection } from '../components/SortHeader';
import { toast } from 'sonner@2.0.3';
import EconomyTabBar from '../components/EconomyTabBar';
import ForestButton from '../components/ForestButton';
import { HolmenModal, HolmenModalFooter } from '../components/HolmenModal';
import { Footer } from '../components/Footer';
import FilterDropdown from '../components/FilterDropdown';
import {
  getAllDokument,
  parseStorlekBytes,
  type DokumentEnriched,
} from '../data/dokumentData';

type SortKey = 'namn' | 'kategori' | 'typ' | 'datum' | 'storlek';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const ALL_DOKUMENT = getAllDokument();

export default function DocumentsPage() {
  const [query, setQuery] = useState('');
  const [selectedKategorier, setSelectedKategorier] = useState<Set<string>>(new Set());
  const [selectedTyper, setSelectedTyper] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'datum',
    direction: 'desc',
  });

  const uniqueKategorier = useMemo(
    () => Array.from(new Set(ALL_DOKUMENT.map((d) => d.kategori))).sort(),
    [],
  );
  const uniqueTyper = useMemo(
    () => Array.from(new Set(ALL_DOKUMENT.map((d) => d.filtyp))).sort(),
    [],
  );
  const uniqueYears = useMemo(
    () =>
      Array.from(
        new Set(
          ALL_DOKUMENT.map((d) => d.datum.slice(0, 4)).filter((y) => y.length === 4),
        ),
      ).sort((a, b) => Number(b) - Number(a)),
    [],
  );

  // En filterdimension räknas som "aktiv" om minst ett värde är valt.
  const activeFilterCount =
    (selectedKategorier.size > 0 ? 1 : 0) +
    (selectedTyper.size > 0 ? 1 : 0) +
    (selectedYears.size > 0 ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;
  const hasActiveQuery = query.trim().length > 0;

  const resetAll = () => {
    setQuery('');
    setSelectedKategorier(new Set());
    setSelectedTyper(new Set());
    setSelectedYears(new Set());
  };

  // 1. Sök på namn + källa (case-insensitive).
  // 2. Multi-filter: Kategori, Typ, År (OR-logik inom en dimension, AND mellan).
  // 3. Sortera enligt sortConfig.
  const sortedFilteredDokument = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALL_DOKUMENT.filter((d) => {
      if (q) {
        const hay = `${d.namn} ${d.källa}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (selectedKategorier.size > 0 && !selectedKategorier.has(d.kategori)) return false;
      if (selectedTyper.size > 0 && !selectedTyper.has(d.filtyp)) return false;
      if (selectedYears.size > 0 && !selectedYears.has(d.datum.slice(0, 4))) return false;
      return true;
    });

    // Sortera
    list = [...list].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      switch (sortConfig.key) {
        case 'namn':
          av = a.namn.toLowerCase();
          bv = b.namn.toLowerCase();
          break;
        case 'kategori':
          av = a.kategori.toLowerCase();
          bv = b.kategori.toLowerCase();
          break;
        case 'typ':
          av = a.filtyp;
          bv = b.filtyp;
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

    return list;
  }, [query, selectedKategorier, selectedTyper, selectedYears, sortConfig]);

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  };

  const handleDownload = (d: DokumentEnriched) => {
    toast.info(`Nedladdning startar — ${d.namn}`);
  };

  // Desktop grid — använder inline style för gridTemplateColumns eftersom
  // Tailwinds arbitrary `grid-cols-[...]` inte parsar flera värden korrekt.
  // 6 kolumner: Namn, Kategori, Typ, Datum, Storlek, Download.
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2.4fr) minmax(0, 1.2fr) minmax(0, 0.7fr) minmax(0, 1fr) minmax(0, 0.8fr) 40px',
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

          <EconomyTabBar activePath="documents" />

          {/* Dokumentsektion */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border-t border-b md:border border-[#e4e4e4] overflow-hidden">
            <div className="content-stretch flex flex-col w-full">
              {/* Heading + sök + filter */}
              {/* Heading-sektion med sökfält + knapp — min-h-[80px]
                  matchar Årsbesked/Fakturor/Kontrakt så alla ekonomi-
                  tabbars toppsektion har exakt samma höjd. */}
              <div className="content-stretch flex flex-col md:flex-row md:items-center md:justify-between gap-[12px] w-full px-[16px] md:px-[24px] py-[16px] min-h-[80px]">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Dokument
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] w-full md:w-auto">
                  {/* Sökfält — matchar HolmenInput-stilen (48px hög, 2px border,
                      16px text, focus-färg #1e3856). Search-ikonen sitter
                      cirka 16px från ramens insida för att ge ordentlig luft. */}
                  <div className="relative w-full sm:w-[360px] md:w-[420px]">
                    <Search
                      className="absolute left-[18px] top-1/2 -translate-y-1/2 size-[18px] text-[#999] pointer-events-none"
                      strokeWidth={2}
                    />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Sök"
                      className="w-full h-[48px] bg-white border-2 border-[#ededed] rounded-none font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] placeholder:text-[#999] outline-none transition-colors focus:border-[#1e3856]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        paddingLeft: '52px',
                        paddingRight: '16px',
                      }}
                    />
                  </div>
                  <ForestButton
                    variant="white"
                    onClick={() => setShowFilterModal(true)}
                    aria-label="Öppna filter"
                    className={hasActiveFilters ? 'border-[#1e3856]' : ''}
                  >
                    <SlidersHorizontal className="size-[16px]" strokeWidth={2} />
                    <span>FILTRERA</span>
                    {activeFilterCount > 0 && (
                      <span
                        className="inline-flex items-center justify-center size-[20px] bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold text-[12px] ml-[4px]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {activeFilterCount}
                      </span>
                    )}
                  </ForestButton>
                </div>
              </div>

              {sortedFilteredDokument.length === 0 ? (
                <div className="content-stretch flex flex-col items-center gap-[12px] py-[48px] w-full">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Inga dokument matchar din sökning.
                  </p>
                  <ForestButton variant="primary" onClick={resetAll}>
                    RENSA
                  </ForestButton>
                </div>
              ) : (
                <>
                  {/* Desktop — sortable table */}
                  <div className="hidden md:block w-full">
                    {/* Header — ljusgrå bakgrund i linje med övriga tabeller i
                        appen (ContractRowHeader, Fakturor, Årsbesked). */}
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
                        label="Kategori"
                        active={sortConfig.key === 'kategori'}
                        direction={sortConfig.direction}
                        onClick={() => requestSort('kategori')}
                      />
                      <SortHeader
                        label="Typ"
                        active={sortConfig.key === 'typ'}
                        direction={sortConfig.direction}
                        onClick={() => requestSort('typ')}
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

                    {/* Rader */}
                    {sortedFilteredDokument.map((d) => (
                      <div
                        key={d.id}
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
                            {d.namn}
                          </p>
                        </div>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {d.kategori}
                        </p>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {d.filtyp.toUpperCase()}
                        </p>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {d.datum}
                        </p>
                        <p
                          className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {d.storlek ?? '—'}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDownload(d)}
                          className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0 justify-self-end"
                          aria-label={`Ladda ner ${d.namn}`}
                        >
                          <Download
                            className="size-[18px] text-[#021c20]"
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Mobil — card-stack */}
                  <div className="md:hidden flex flex-col">
                    {sortedFilteredDokument.map((d) => (
                      <div
                        key={d.id}
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
                              {d.namn}
                            </p>
                            <p
                              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70 truncate"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {d.kategori} · {d.källa}
                            </p>
                            <p
                              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {d.filtyp.toUpperCase()} · {d.datum}
                              {d.storlek ? ` · ${d.storlek}` : ''}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDownload(d)}
                          className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
                          aria-label={`Ladda ner ${d.namn}`}
                        >
                          <Download
                            className="size-[18px] text-[#021c20]"
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Filter-modal — multi-select via pill-grupper. */}
      <HolmenModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filtrera dokument"
        description="Välj en eller flera kategorier, typer eller år."
      >
        <div className="flex flex-col gap-[12px]">
          <FilterDropdown
            label="Kategori"
            options={uniqueKategorier}
            selected={selectedKategorier}
            onChange={setSelectedKategorier}
          />
          <FilterDropdown
            label="Typ"
            options={uniqueTyper}
            selected={selectedTyper}
            onChange={setSelectedTyper}
            formatOption={(v) => v.toUpperCase()}
          />
          <FilterDropdown
            label="År"
            options={uniqueYears}
            selected={selectedYears}
            onChange={setSelectedYears}
          />
        </div>

        <HolmenModalFooter>
          <ForestButton
            variant="white"
            disabled={!hasActiveFilters && !hasActiveQuery}
            className={
              !hasActiveFilters && !hasActiveQuery ? 'opacity-40 cursor-not-allowed' : ''
            }
            onClick={resetAll}
          >
            RENSA
          </ForestButton>
          <ForestButton variant="primary" onClick={() => setShowFilterModal(false)}>
            VISA {sortedFilteredDokument.length} DOKUMENT
          </ForestButton>
        </HolmenModalFooter>
      </HolmenModal>
    </div>
  );
}

