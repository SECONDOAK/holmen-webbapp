import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import StatCard from '../components/StatCard';
import EconomyTabBar from '../components/EconomyTabBar';
import ForestButton from '../components/ForestButton';
import { HolmenModal, HolmenModalFooter } from '../components/HolmenModal';
import { Footer } from '../components/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import AffärGroup from '../components/contracts-v2/AffärGroup';
import ContractRow, { ContractRowHeader } from '../components/contracts-v2/ContractRow';
import MobileContractCardV2 from '../components/contracts-v2/MobileContractCardV2';
import {
  contractsV2Data,
  affärerV2Data,
  aggregateContractsV2,
  formatSEK,
  statusLabel,
  type ContractStatusV2,
  type KontraktV2,
} from '../data/contractsV2Data';

export default function ContractsPageV2() {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedArbetsform, setSelectedArbetsform] = useState<string>('all');
  const [selectedUppdragstyp, setSelectedUppdragstyp] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
  const uniqueUppdragstyper = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.uppdragstyp))).sort(),
    []
  );
  const uniqueYears = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.år))).sort((a, b) => Number(b) - Number(a)),
    []
  );
  const uniqueStatuses: ContractStatusV2[] = useMemo(
    () => Array.from(new Set(contractsV2Data.map((c) => c.status))) as ContractStatusV2[],
    []
  );

  const activeFilterCount = [
    selectedProperty,
    selectedArbetsform,
    selectedUppdragstyp,
    selectedYear,
    selectedStatus,
  ].filter((v) => v !== 'all').length;
  const hasActiveFilters = activeFilterCount > 0;

  const resetFilters = () => {
    setSelectedProperty('all');
    setSelectedArbetsform('all');
    setSelectedUppdragstyp('all');
    setSelectedYear('all');
    setSelectedStatus('all');
  };

  // Filter contracts
  const filteredContracts = useMemo(() => {
    return contractsV2Data.filter((c) => {
      if (selectedProperty !== 'all' && c.fastighet !== selectedProperty) return false;
      if (selectedArbetsform !== 'all' && c.arbetsform !== selectedArbetsform) return false;
      if (selectedUppdragstyp !== 'all' && c.uppdragstyp !== selectedUppdragstyp) return false;
      if (selectedYear !== 'all' && c.år !== selectedYear) return false;
      if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedProperty, selectedArbetsform, selectedUppdragstyp, selectedYear, selectedStatus]);

  // Aggregated stats over filtered list
  const agg = useMemo(() => aggregateContractsV2(filteredContracts), [filteredContracts]);

  // Group contracts by affär, plus an "övriga" bucket
  const groups = useMemo(() => {
    const affärGroups: { affär: typeof affärerV2Data[number]; contracts: KontraktV2[] }[] = [];
    affärerV2Data.forEach((affär) => {
      const contracts = filteredContracts.filter((c) => c.affärId === affär.id);
      if (contracts.length > 0) affärGroups.push({ affär, contracts });
    });
    const övriga = filteredContracts.filter((c) => !c.affärId);
    return { affärGroups, övriga };
  }, [filteredContracts]);

  const toggleExpanded = (id: string) => {
    setExpandedId((curr) => (curr === id ? null : id));
  };

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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[24px] w-full">
            <StatCard
              label="Totalt utbetalt"
              value={formatSEK(agg.totalUtbetalt)}
              tooltipText="Summa utbetalda medel (din andel) över filtrerade kontrakt."
            />
            <StatCard
              label="Innestående medel"
              value={formatSEK(agg.totalInnestaende)}
              tooltipText="Avsatt för skogsvård + i betalplan + fria medel."
            />
            <StatCard
              label="Fria medel"
              value={formatSEK(agg.totalInnestaendeFria)}
              tooltipText="Innestående medel som varken är avsatta eller i en betalplan."
            />
            <StatCard
              label="Antal kontrakt"
              value={String(agg.totalKontrakt)}
              tooltipText="Antal kontrakt som matchar dina filter."
            />
          </div>

          {/* Contracts section */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border-t border-b md:border border-[#e4e4e4] overflow-hidden">
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col items-start relative w-full">
                <div className="content-stretch flex flex-col gap-[24px] w-full px-[16px] md:px-[24px] pt-[16px] md:pt-[24px] pb-[24px]">
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
                    size="small"
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
                      <ContractRowHeader />
                    </div>

                    {/* Affär groups */}
                    {groups.affärGroups.map(({ affär, contracts }) => (
                      <AffärGroup key={affär.id} title={affär.namn} contracts={contracts} defaultOpen>
                        {/* Desktop rows */}
                        <div className="hidden md:block w-full">
                          {contracts.map((c) => (
                            <ContractRow
                              key={c.id}
                              contract={c}
                              expanded={expandedId === c.id}
                              onToggle={() => toggleExpanded(c.id)}
                            />
                          ))}
                        </div>
                        {/* Mobile cards */}
                        <div className="md:hidden flex flex-col gap-[12px] p-[12px]">
                          {contracts.map((c) => (
                            <MobileContractCardV2
                              key={c.id}
                              contract={c}
                              expanded={expandedId === c.id}
                              onToggle={() => toggleExpanded(c.id)}
                            />
                          ))}
                        </div>
                      </AffärGroup>
                    ))}

                    {/* Övriga kontrakt */}
                    {groups.övriga.length > 0 && (
                      <AffärGroup
                        title="Övriga kontrakt"
                        contracts={groups.övriga}
                        defaultOpen
                      >
                        <div className="hidden md:block w-full">
                          {groups.övriga.map((c) => (
                            <ContractRow
                              key={c.id}
                              contract={c}
                              expanded={expandedId === c.id}
                              onToggle={() => toggleExpanded(c.id)}
                            />
                          ))}
                        </div>
                        <div className="md:hidden flex flex-col gap-[12px] p-[12px]">
                          {groups.övriga.map((c) => (
                            <MobileContractCardV2
                              key={c.id}
                              contract={c}
                              expanded={expandedId === c.id}
                              onToggle={() => toggleExpanded(c.id)}
                            />
                          ))}
                        </div>
                      </AffärGroup>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Filter modal — used on both desktop and mobile */}
      <HolmenModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filtrera kontrakt"
        description="Välj ett eller flera filter för att begränsa listan."
      >
        <div className="flex flex-col gap-[12px]">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger
              className="w-full h-[40px] border border-[#ededed] bg-white px-[12px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] rounded-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <SelectValue placeholder="Fastighet (alla)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Fastighet (alla)</SelectItem>
              {uniqueProperties.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedArbetsform} onValueChange={setSelectedArbetsform}>
            <SelectTrigger
              className="w-full h-[40px] border border-[#ededed] bg-white px-[12px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] rounded-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <SelectValue placeholder="Arbetsform (alla)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Arbetsform (alla)</SelectItem>
              {uniqueArbetsformer.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedUppdragstyp} onValueChange={setSelectedUppdragstyp}>
            <SelectTrigger
              className="w-full h-[40px] border border-[#ededed] bg-white px-[12px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] rounded-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <SelectValue placeholder="Uppdragstyp (alla)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Uppdragstyp (alla)</SelectItem>
              {uniqueUppdragstyper.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger
              className="w-full h-[40px] border border-[#ededed] bg-white px-[12px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] rounded-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <SelectValue placeholder="År (alla)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">År (alla)</SelectItem>
              {uniqueYears.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger
              className="w-full h-[40px] border border-[#ededed] bg-white px-[12px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] rounded-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <SelectValue placeholder="Status (alla)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status (alla)</SelectItem>
              {uniqueStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
