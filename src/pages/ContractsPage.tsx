import { useState, useMemo } from 'react';
import svgPaths from "../imports/svg-vm1sobzh2f";
import ContractsTable, { contractsData } from "../components/ContractsTable";
import MobileContractCard from "../components/MobileContractCard";
import StatCard from "../components/StatCard";
import ForestButton from "../components/ForestButton";
import ActionCard from "../components/ActionCard";
import { Footer } from "../components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FileSignature } from "lucide-react";

export default function ContractsPage() {
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedAssignmentType, setSelectedAssignmentType] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return selectedProperty !== "all" || 
           selectedAssignmentType !== "all" || 
           selectedYear !== "all" || 
           selectedStatus !== "all";
  }, [selectedProperty, selectedAssignmentType, selectedYear, selectedStatus]);

  // Extract unique values from contracts data
  const uniqueProperties = useMemo(() => {
    const properties = Array.from(new Set(contractsData.map(c => c.property)));
    return properties.sort();
  }, []);

  const uniqueAssignmentTypes = useMemo(() => {
    const types = Array.from(new Set(contractsData.map(c => c.assignmentType)));
    return types.sort();
  }, []);

  const uniqueYears = useMemo(() => {
    const years = Array.from(new Set(contractsData.map(c => c.year)));
    return years.sort((a, b) => Number(b) - Number(a));
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = Array.from(new Set(contractsData.map(c => c.status)));
    return statuses.sort();
  }, []);

  // Filter contracts based on selections
  const filteredContracts = useMemo(() => {
    return contractsData.filter(contract => {
      const matchesProperty = selectedProperty === "all" || contract.property === selectedProperty;
      const matchesType = selectedAssignmentType === "all" || contract.assignmentType === selectedAssignmentType;
      const matchesYear = selectedYear === "all" || contract.year === selectedYear;
      const matchesStatus = selectedStatus === "all" || contract.status === selectedStatus;
      
      return matchesProperty && matchesType && matchesYear && matchesStatus;
    });
  }, [selectedProperty, selectedAssignmentType, selectedYear, selectedStatus]);

  // Calculate total remaining amount from filtered contracts
  const totalRemainingAmount = useMemo(() => {
    const total = filteredContracts.reduce((sum, contract) => {
      // Extract numeric value from string like "123 111 kr"
      const numericValue = parseInt(contract.remainingAmount.replace(/\s/g, '').replace('kr', '')) || 0;
      return sum + numericValue;
    }, 0);
    
    // Format back to string with spaces (e.g., "123 111 kr")
    return total.toLocaleString('sv-SE').replace(/,/g, ' ') + ' kr';
  }, [filteredContracts]);

  // Calculate total paid amount from filtered contracts
  const totalPaidAmount = useMemo(() => {
    const total = filteredContracts.reduce((sum, contract) => {
      // Extract numeric value from string like "969 027 kr"
      const numericValue = parseInt(contract.paidAmount.replace(/\s/g, '').replace('kr', '')) || 0;
      return sum + numericValue;
    }, 0);
    
    // Format back to string with spaces
    return total.toLocaleString('sv-SE').replace(/,/g, ' ') + ' kr';
  }, [filteredContracts]);

  // Calculate total number of contracts
  const totalContracts = useMemo(() => {
    return filteredContracts.length.toString();
  }, [filteredContracts]);

  // Calculate ongoing tracts (contracts with status "Pågående")
  const ongoingTracts = useMemo(() => {
    const ongoing = filteredContracts.filter(contract => contract.status === 'Pågående').length;
    return ongoing.toString();
  }, [filteredContracts]);

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
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>

          {/* Tab Navigation */}
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 overflow-x-auto w-full">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => handleTabClick(tab.path)}
                className={`cursor-pointer relative shrink-0 ${
                  tab.path === 'contracts' ? '' : 'opacity-60 hover:opacity-80'
                }`}
              >
                {tab.path === 'contracts' && (
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

          {/* Stats Cards and Action Card Grid - 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[24px] items-start relative shrink-0 w-full">
            <StatCard
              label="Totalt utbetalt belopp"
              value={totalPaidAmount}
              tooltipText="Det totala beloppet som har betalats ut till dig för alla avslutade virkesförsäljningar"
            />

            <StatCard
              label="Återstående belopp"
              value={totalRemainingAmount}
              tooltipText="Det belopp som återstår att betala ut från dina pågående kontrakt"
            />

            <StatCard
              label="Antal kontrakt"
              value={totalContracts}
              tooltipText="Totalt antal aktiva och avslutade kontrakt som du har med Holmen"
            />

            <StatCard
              label="Pågående trakter"
              value={ongoingTracts}
              tooltipText="Antal avverkningstrakter som pågår just nu på din fastighet"
            />

            {/* Alert Card - spans 2 columns on both mobile and desktop */}
            <div className="col-span-2">
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
          </div>

          {/* Contracts Section with Filters */}
          <div className="bg-white relative -mx-[16px] md:mx-0 w-[calc(100%+32px)] md:w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
            <div aria-hidden="true" className="absolute border-t border-b md:border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] md:p-[24px] relative w-full">
                {/* Header */}
                <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Kontrakt
                  </p>
                </div>

                {/* Filters - Desktop */}
                <div className="hidden md:flex content-stretch gap-[16px] items-center relative shrink-0 w-full">
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger className="basis-0 grow min-w-px h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="Alla fastigheter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla fastigheter</SelectItem>
                      {uniqueProperties.map(property => (
                        <SelectItem key={property} value={property}>{property}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedAssignmentType} onValueChange={setSelectedAssignmentType}>
                    <SelectTrigger className="basis-0 grow min-w-px h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="Alla uppdragstyper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla uppdragstyper</SelectItem>
                      {uniqueAssignmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="basis-0 grow min-w-px h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="År (alla)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">År (alla)</SelectItem>
                      {uniqueYears.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="basis-0 grow min-w-px h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="Status (alla)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Status (alla)</SelectItem>
                      {uniqueStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <ForestButton 
                    variant="primary"
                    disabled={!hasActiveFilters}
                    className={!hasActiveFilters ? 'opacity-40 cursor-not-allowed' : ''}
                    onClick={() => {
                      setSelectedProperty("all");
                      setSelectedAssignmentType("all");
                      setSelectedYear("all");
                      setSelectedStatus("all");
                    }}
                  >
                    RENSA
                  </ForestButton>
                </div>

                {/* Filters - Mobile (stacked) */}
                <div className="flex md:hidden content-stretch flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger className="w-full h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="Alla fastigheter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla fastigheter</SelectItem>
                      {uniqueProperties.map(property => (
                        <SelectItem key={property} value={property}>{property}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedAssignmentType} onValueChange={setSelectedAssignmentType}>
                    <SelectTrigger className="w-full h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <SelectValue placeholder="Alla uppdragstyper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla uppdragstyper</SelectItem>
                      {uniqueAssignmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex gap-[12px] w-full">
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="flex-1 h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <SelectValue placeholder="År (alla)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">År (alla)</SelectItem>
                        {uniqueYears.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="flex-1 h-[49px] border-2 border-[#ededed] bg-white px-[16px] font-['IBM_Plex_Sans',sans-serif] font-normal text-[15px] leading-[25.5px] text-[#021c20] rounded-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <SelectValue placeholder="Status (alla)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Status (alla)</SelectItem>
                        {uniqueStatuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <ForestButton 
                    variant="primary"
                    disabled={!hasActiveFilters}
                    className={`w-full ${!hasActiveFilters ? 'opacity-40 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      setSelectedProperty("all");
                      setSelectedAssignmentType("all");
                      setSelectedYear("all");
                      setSelectedStatus("all");
                    }}
                  >
                    RENSA FILTER
                  </ForestButton>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block w-full">
                  <ContractsTable filteredData={filteredContracts} />
                </div>

                {/* Mobile Card List */}
                <div className="flex md:hidden flex-col gap-[16px] w-full">
                  {filteredContracts.map((contract, index) => (
                    <MobileContractCard 
                      key={contract.id} 
                      contract={{
                        id: contract.id,
                        contractNumber: contract.contractNumber,
                        property: contract.property,
                        assignmentType: contract.assignmentType,
                        year: contract.year,
                        status: contract.status,
                        amount: contract.paidAmount,
                        paidAmount: contract.details?.paidAmount || contract.paidAmount + ' SEK',
                        remainingAmount: contract.details?.remainingAmount || contract.remainingAmount + ' SEK',
                        documentLink: contract.details?.document,
                        sortiments: contract.details?.sortiments
                      }}
                      defaultExpanded={index === 0}
                    />
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