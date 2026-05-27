import { useState, useMemo } from 'react';
import { Download, Receipt, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import EconomyTabBar from '../components/EconomyTabBar';
import ActionCard from '../components/ActionCard';
import StatusBadge from '../components/StatusBadge';
import SortHeader, { type SortDirection } from '../components/SortHeader';
import ForestButton from '../components/ForestButton';
import { HolmenModal, HolmenModalFooter } from '../components/HolmenModal';
import FilterDropdown from '../components/FilterDropdown';
import { Footer } from '../components/Footer';
import { fakturorData, formatBelopp, type Faktura } from '../data/invoicesData';

type SortKey = 'fakturanr' | 'fastighet' | 'uppdragstyp' | 'datum' | 'belopp' | 'status';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

function statusVariantFor(status: Faktura['status']): 'success' | 'warning' | 'danger' {
  if (status === 'Betald') return 'success';
  if (status === 'Förfallen') return 'danger';
  return 'warning';
}

export default function InvoicesPage() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'datum',
    direction: 'desc',
  });
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [selectedFastigheter, setSelectedFastigheter] = useState<Set<string>>(new Set());
  const [selectedUppdragstyper, setSelectedUppdragstyper] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);

  const uniqueStatuses = useMemo(
    () => Array.from(new Set(fakturorData.map((f) => f.status))).sort(),
    [],
  );
  const uniqueFastigheter = useMemo(
    () => Array.from(new Set(fakturorData.map((f) => f.fastighet))).sort(),
    [],
  );
  const uniqueUppdragstyper = useMemo(
    () => Array.from(new Set(fakturorData.map((f) => f.uppdragstyp))).sort(),
    [],
  );
  const uniqueYears = useMemo(
    () =>
      Array.from(new Set(fakturorData.map((f) => f.datum.slice(0, 4)))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [],
  );

  // En filterdimension räknas som "aktiv" om minst ett värde är valt.
  const activeFilterCount =
    (selectedStatuses.size > 0 ? 1 : 0) +
    (selectedFastigheter.size > 0 ? 1 : 0) +
    (selectedUppdragstyper.size > 0 ? 1 : 0) +
    (selectedYears.size > 0 ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  const resetFilters = () => {
    setSelectedStatuses(new Set());
    setSelectedFastigheter(new Set());
    setSelectedUppdragstyper(new Set());
    setSelectedYears(new Set());
  };

  // Multi-filter: OR-logik inom en dimension, AND mellan dimensioner.
  const filteredFakturor = useMemo(() => {
    return fakturorData.filter((f) => {
      if (selectedStatuses.size > 0 && !selectedStatuses.has(f.status)) return false;
      if (selectedFastigheter.size > 0 && !selectedFastigheter.has(f.fastighet)) return false;
      if (selectedUppdragstyper.size > 0 && !selectedUppdragstyper.has(f.uppdragstyp)) return false;
      if (selectedYears.size > 0 && !selectedYears.has(f.datum.slice(0, 4))) return false;
      return true;
    });
  }, [selectedStatuses, selectedFastigheter, selectedUppdragstyper, selectedYears]);

  const sortedFakturor = useMemo(() => {
    const list = [...filteredFakturor].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      switch (sortConfig.key) {
        case 'fakturanr':
          av = a.fakturanr;
          bv = b.fakturanr;
          break;
        case 'fastighet':
          av = a.fastighet.toLowerCase();
          bv = b.fastighet.toLowerCase();
          break;
        case 'uppdragstyp':
          av = a.uppdragstyp.toLowerCase();
          bv = b.uppdragstyp.toLowerCase();
          break;
        case 'datum':
          av = a.datum;
          bv = b.datum;
          break;
        case 'belopp':
          av = a.belopp;
          bv = b.belopp;
          break;
        case 'status':
          av = a.status;
          bv = b.status;
          break;
      }
      if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
      if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredFakturor, sortConfig]);

  const requestSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  };

  const handleDownload = (f: Faktura) => {
    toast.info(`Nedladdning startar — Faktura ${f.fakturanr}.pdf`);
  };

  // Desktop grid — 7 kolumner: Fakturanr · Fastighet · Uppdragstyp ·
  // Datum · Belopp · Status · Download.
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns:
      'minmax(0, 1fr) minmax(0, 1.3fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.1fr) 40px',
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

          <EconomyTabBar activePath="invoices" />

          {/* Action Card — Invoice Alert. Samma bredd som signerings-
              ActionCard på Kontrakt-fliken så alla ekonomi-tabbar har
              samma kort-bredd när man växlar mellan dem. */}
          <div className="w-full md:w-[calc(50%-12px)]">
            <ActionCard
              icon={<Receipt className="size-6" stroke="#1E3856" strokeWidth={2} />}
              iconBackgroundColor="#e4f5f5"
              title="Inkommen faktura väntar på betalning"
              tooltipText="Du har en obetald faktura som behöver betalas. Klicka för att se fakturan och genomföra betalningen."
              description={
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                        <p
                          className="leading-[normal] relative shrink-0 text-[16px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          <span>Du har en obetald faktura på </span>
                          <span
                            className="font-['IBM_Plex_Sans',sans-serif] font-bold"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          >
                            12 198 kr
                          </span>
                        </p>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          <span style={{ fontVariationSettings: "'wdth' 100" }}>Faktura 5678901</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              buttons={[{ label: 'Visa faktura', variant: 'primary' }]}
            />
          </div>

          {/* Fakturasektion */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border-t border-b md:border border-[#e4e4e4] overflow-hidden">
            <div className="content-stretch flex flex-col w-full">
              {/* Heading + Filtrera — vänster: rubrik och subtitle,
                  höger: Filtrera-knapp med activeFilterCount-badge. */}
              <div className="content-stretch flex flex-col md:flex-row md:items-center md:justify-between gap-[12px] w-full px-[16px] md:px-[24px] py-[16px] min-h-[80px]">
                <div className="flex flex-col gap-[8px]">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[#021c20]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Fakturor
                  </p>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Här ser du dina fakturor från 2023 och framåt.
                  </p>
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

              {sortedFakturor.length === 0 ? (
                <div className="content-stretch flex flex-col items-center gap-[12px] py-[48px] w-full">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Inga fakturor matchar dina filter.
                  </p>
                  <ForestButton variant="primary" onClick={resetFilters}>
                    RENSA FILTER
                  </ForestButton>
                </div>
              ) : (
                <div className="contents">
              {/* Desktop — sortable table */}
              <div className="hidden md:block w-full">
                <div
                  style={gridStyle}
                  className={`${gridCls} py-[10px] bg-[#f7f7f7] border-t border-b border-[#e4e4e4]`}
                >
                  <SortHeader
                    label="Fakturanr"
                    active={sortConfig.key === 'fakturanr'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('fakturanr')}
                  />
                  <SortHeader
                    label="Fastighet"
                    active={sortConfig.key === 'fastighet'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('fastighet')}
                  />
                  <SortHeader
                    label="Uppdragstyp"
                    active={sortConfig.key === 'uppdragstyp'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('uppdragstyp')}
                  />
                  <SortHeader
                    label="Datum"
                    active={sortConfig.key === 'datum'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('datum')}
                  />
                  <SortHeader
                    label="Belopp"
                    align="right"
                    active={sortConfig.key === 'belopp'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('belopp')}
                  />
                  <SortHeader
                    label="Status"
                    active={sortConfig.key === 'status'}
                    direction={sortConfig.direction}
                    onClick={() => requestSort('status')}
                  />
                  <span />
                </div>

                {sortedFakturor.map((f) => (
                  <div
                    key={f.id}
                    style={gridStyle}
                    className={`${gridCls} py-[10px] border-b border-[#e4e4e4] last:border-b-0`}
                  >
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {f.fakturanr}
                    </p>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {f.fastighet}
                    </p>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] truncate"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {f.uppdragstyp}
                    </p>
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {f.datum}
                    </p>
                    <p
                      className="text-right font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {formatBelopp(f.belopp)}
                    </p>
                    <div className="flex">
                      <StatusBadge label={f.status} variant={statusVariantFor(f.status)} />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(f)}
                      className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0 justify-self-end"
                      aria-label={`Ladda ner faktura ${f.fakturanr}`}
                    >
                      <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Mobil — card-stack */}
              <div className="md:hidden flex flex-col">
                {sortedFakturor.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-start justify-between gap-[12px] px-[16px] py-[12px] border-t border-[#e4e4e4]"
                  >
                    <div className="flex flex-col gap-[4px] min-w-0">
                      <div className="flex items-center gap-[8px]">
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {f.fakturanr}
                        </p>
                        <StatusBadge label={f.status} variant={statusVariantFor(f.status)} />
                      </div>
                      <p
                        className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-70 truncate"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {f.uppdragstyp} · {f.fastighet}
                      </p>
                      <p
                        className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {f.datum} · {formatBelopp(f.belopp)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownload(f)}
                      className="size-[32px] flex items-center justify-center rounded-[8px] hover:bg-[#f3f3f5] transition-colors shrink-0"
                      aria-label={`Ladda ner faktura ${f.fakturanr}`}
                    >
                      <Download className="size-[18px] text-[#021c20]" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Filter-modal — samma pattern som ContractsPageV2 och DocumentsPage. */}
      <HolmenModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filtrera fakturor"
        description="Välj ett eller flera värden inom varje filter."
      >
        <div className="flex flex-col gap-[12px]">
          <FilterDropdown
            label="Status"
            options={uniqueStatuses}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
          />
          <FilterDropdown
            label="Fastighet"
            options={uniqueFastigheter}
            selected={selectedFastigheter}
            onChange={setSelectedFastigheter}
          />
          <FilterDropdown
            label="Uppdragstyp"
            options={uniqueUppdragstyper}
            selected={selectedUppdragstyper}
            onChange={setSelectedUppdragstyper}
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
            disabled={!hasActiveFilters}
            className={!hasActiveFilters ? 'opacity-40 cursor-not-allowed' : ''}
            onClick={resetFilters}
          >
            RENSA
          </ForestButton>
          <ForestButton variant="primary" onClick={() => setShowFilterModal(false)}>
            VISA {sortedFakturor.length} FAKTUROR
          </ForestButton>
        </HolmenModalFooter>
      </HolmenModal>
    </div>
  );
}
