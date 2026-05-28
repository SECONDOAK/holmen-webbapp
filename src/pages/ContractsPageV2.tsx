import { useState, useMemo } from 'react';
import { FileSignature, SlidersHorizontal } from 'lucide-react';
import StatCard from '../components/StatCard';
import EconomyTabBar from '../components/EconomyTabBar';
import ForestButton from '../components/ForestButton';
import { HolmenModal, HolmenModalFooter } from '../components/HolmenModal';
import { Footer } from '../components/Footer';
import FilterDropdown from '../components/FilterDropdown';
import { ActionCard } from '../components/ActionCard';
import ContractRow, { ContractRowHeader, type ContractSortKey } from '../components/contracts-v2/ContractRow';
import { type SortDirection } from '../components/SortHeader';
import MobileContractCardV2 from '../components/contracts-v2/MobileContractCardV2';
import {
  contractsV2Data,
  aggregateContractsV2,
  formatSEK,
  innestaendeTotalt,
  statusLabel,
  type ContractStatusV2,
  type KontraktV2,
} from '../data/contractsV2Data';

export default function ContractsPageV2() {
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(new Set());
  const [selectedArbetsformer, setSelectedArbetsformer] = useState<Set<string>>(new Set());
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set());
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Unique filter option values from full mock dataset
  const uniqueProperties = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.fastighet))).sort(),
    []
  );
  const uniqueArbetsformer = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.arbetsform))).sort(),
    []
  );
  // År-filtret hämtas från första 4 tecknen i kontraktsdatum
  // — datat lagras som ISO YYYY-MM-DD men det är fortfarande
  // året som är meningsfullt att filtrera på i listan.
  const uniqueYears = useMemo(
    () =>
      Array.from(new Set(contractsV2Data.map((c) => c.kontraktsdatum.slice(0, 4)))).sort(
        (a, b) => Number(b) - Number(a),
      ),
    [],
  );
  const uniqueStatuses: ContractStatusV2[] = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.status))) as ContractStatusV2[],
    []
  );

  // En filterdimension räknas som "aktiv" om minst ett värde är valt.
  const activeFilterCount =
    (selectedProperties.size > 0 ? 1 : 0) +
    (selectedArbetsformer.size > 0 ? 1 : 0) +
    (selectedYears.size > 0 ? 1 : 0) +
    (selectedStatuses.size > 0 ? 1 : 0);
  const hasActiveFilters = activeFilterCount > 0;

  const resetFilters = () => {
    setSelectedProperties(new Set());
    setSelectedArbetsformer(new Set());
    setSelectedYears(new Set());
    setSelectedStatuses(new Set());
  };

  // Multi-filter: OR-logik inom en dimension, AND mellan dimensioner.
  const filteredContracts = useMemo(() => {
    return contractsV2Data.filter((c) => {
      if (selectedProperties.size > 0 && !selectedProperties.has(c.fastighet)) return false;
      if (selectedArbetsformer.size > 0 && !selectedArbetsformer.has(c.arbetsform)) return false;
      if (selectedYears.size > 0 && !selectedYears.has(c.kontraktsdatum.slice(0, 4))) return false;
      if (selectedStatuses.size > 0 && !selectedStatuses.has(c.status)) return false;
      return true;
    });
  }, [
    selectedProperties,
    selectedArbetsformer,
    selectedYears,
    selectedStatuses,
  ]);

  // Aggregated stats over filtered list
  const agg = useMemo(() => aggregateContractsV2(filteredContracts), [filteredContracts]);

  // Sorteringskonfiguration. Default: nyaste kontraktsdatum överst.
  const [sortKey, setSortKey] = useState<ContractSortKey>('kontraktsdatum');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const requestSort = (key: ContractSortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Numerisk vikt på status för meningsfull sortering ("För signering"
  // = nyast/oklart kommer först, "Signerad" = signerad sist).
  const statusOrder: Record<KontraktV2['status'], number> = {
    'för-signering': 0,
    'signerad': 1,
  };

  const sortContracts = (list: KontraktV2[]) => {
    const dirMul = sortDirection === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      switch (sortKey) {
        case 'kontraktsnummer':
          av = a.kontraktsnummer;
          bv = b.kontraktsnummer;
          break;
        case 'uppdragstyp':
          av = a.uppdragstyp.toLowerCase();
          bv = b.uppdragstyp.toLowerCase();
          break;
        case 'arbetsform':
          av = a.arbetsform.toLowerCase();
          bv = b.arbetsform.toLowerCase();
          break;
        case 'fastighet':
          av = a.fastighet.toLowerCase();
          bv = b.fastighet.toLowerCase();
          break;
        case 'andel':
          av = parseFloat(a.andel);
          bv = parseFloat(b.andel);
          break;
        case 'kontraktsdatum':
          av = a.kontraktsdatum;
          bv = b.kontraktsdatum;
          break;
        case 'innestaende':
          av = innestaendeTotalt(a);
          bv = innestaendeTotalt(b);
          break;
        case 'status':
          av = statusOrder[a.status];
          bv = statusOrder[b.status];
          break;
      }
      if (av < bv) return -1 * dirMul;
      if (av > bv) return 1 * dirMul;
      // Sekundär sortering på kontraktsdatum desc så lika värden
      // faller i kronologisk ordning (nyast först).
      return b.kontraktsdatum.localeCompare(a.kontraktsdatum);
    });
  };

  // Platt sorterad lista — ingen klustring längre. Länkningen mellan
  // avverkningsrätt och skogsvårdsuppföljnings­kontrakt framgår istället
  // i detaljpanelen när man expanderar ett kontrakt.
  const sortedContracts = useMemo(
    () => sortContracts(filteredContracts),
    [filteredContracts, sortKey, sortDirection],
  );

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

          <EconomyTabBar activePath="contracts" />

          {/* Stats — Totalt innestaende medel som huvudtal, brutet
              ner i de tre underkategorierna avsatt for skogsvard,
              i betalplan och fria medel. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[24px] w-full">
            <StatCard
              label="Totalt innestående medel"
              value={formatSEK(agg.totalInnestaende)}
              tooltipText="Summan av dina innestående medel — avsatt för skogsvård + i betalplan + fria medel."
            />
            <StatCard
              label="Avsatt för skogsvård"
              value={formatSEK(agg.totalInnestaendeAvsatt)}
              tooltipText="Innestående medel som är avsatta för framtida skogsvård och ingår inte i kommande betalplaner."
            />
            <StatCard
              label="I betalplan"
              value={formatSEK(agg.totalInnestaendeIBetalplan)}
              tooltipText="Innestående medel som är reserverade enligt en planerad utbetalning."
            />
            <StatCard
              label="Fria medel"
              value={formatSEK(agg.totalInnestaendeFria)}
              tooltipText="Innestående medel som varken är avsatta eller i en betalplan — tillgängliga att planera eller använda."
            />
          </div>

          {/* Contract Signing Alert — samma ActionCard som visas på
              Start-sidan, så användaren kan komma åt signeringsflödet
              direkt från kontraktsvyn. Bredden räknas så kortet matchar
              exakt två stat-cards i raden ovanför (4 stat-cards i grid
              med 24px gap → 50% av container minus 12px gap-justering). */}
          <div className="w-full md:w-[calc(50%-12px)]">
            <ActionCard
              icon={<FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />}
              iconBackgroundColor="#e4f5f5"
              title="Nytt kontrakt väntar på signering"
              tooltipText="Du har fått ett kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltigt."
              description={
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                        <p
                          className="leading-[normal] relative shrink-0 text-[16px] text-[#021c20]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          <span
                            className="font-['IBM_Plex_Sans',sans-serif] font-bold"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          >
                            Daniel Larsson
                          </span>
                          <span>{` har bjudit in dig att signera ett kontrakt med BankID`}</span>
                        </p>
                        <p
                          className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              buttons={[{ label: 'Signera kontrakt', variant: 'primary' }]}
            />
          </div>

          {/* Contracts section */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border-t border-b md:border border-[#e4e4e4] overflow-hidden">
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col items-start relative w-full">
                {/* Heading-sektion med knapp — min-h-[80px] matchar alla
                    andra heading-sektioner i ekonomi-tabbarna så toppen
                    har samma höjd oavsett om det finns kontroller eller
                    bara en rubrik. */}
                <div className="content-stretch flex flex-col justify-center gap-[24px] w-full px-[16px] md:px-[24px] py-[16px] min-h-[80px]">
                {/* Heading + filter trigger */}
                <div className="content-stretch flex items-center justify-between gap-[12px] w-full">
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[20px] text-[#021c20]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Kontrakt
                  </p>
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

                {/* List — full container width, no inner padding */}
                {filteredContracts.length === 0 ? (
                  <div className="content-stretch flex flex-col items-center gap-[12px] py-[48px] w-full">
                    <p
                      className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Inga kontrakt matchar dina filter.
                    </p>
                    <ForestButton variant="primary" onClick={resetFilters}>
                      RENSA FILTER
                    </ForestButton>
                  </div>
                ) : (
                  <div className="content-stretch flex flex-col w-full">
                    {/* Desktop header row (only when at least one group exists) */}
                    <div className="hidden md:block w-full">
                      <ContractRowHeader
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        onSort={requestSort}
                      />
                    </div>

                    {/* Platt sorterad lista — klick på rad/kort navigerar
                        till kontraktets detaljvy. Länkning mellan
                        avverkningsrätt och uppföljnings­kontrakt visas
                        i detaljvyn. */}
                    <div className="hidden md:block w-full">
                      {sortedContracts.map((c) => (
                        <ContractRow key={c.id} contract={c} />
                      ))}
                    </div>
                    <div className="md:hidden flex flex-col gap-[12px] p-[12px]">
                      {sortedContracts.map((c) => (
                        <MobileContractCardV2 key={c.id} contract={c} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Filter modal — multi-select via pill-grupper. */}
      <HolmenModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filtrera kontrakt"
        description="Välj ett eller flera värden inom varje filter."
      >
        <div className="flex flex-col gap-[12px]">
          <FilterDropdown
            label="Fastighet"
            options={uniqueProperties}
            selected={selectedProperties}
            onChange={setSelectedProperties}
          />
          <FilterDropdown
            label="Arbetsform"
            options={uniqueArbetsformer}
            selected={selectedArbetsformer}
            onChange={setSelectedArbetsformer}
          />
          <FilterDropdown
            label="År"
            options={uniqueYears}
            selected={selectedYears}
            onChange={setSelectedYears}
          />
          <FilterDropdown
            label="Status"
            options={uniqueStatuses}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
            formatOption={(v) => statusLabel[v as ContractStatusV2]}
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
            VISA {filteredContracts.length} KONTRAKT
          </ForestButton>
        </HolmenModalFooter>
      </HolmenModal>
    </div>
  );
}
