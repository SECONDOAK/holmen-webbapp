import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-yzncxbvcbd";
import { ActionBlock } from "./ActionBlock";
import { PropertyHeader } from "./PropertyHeader";
import { SubNavigationHeader } from "./SubNavigationHeader";
import FilterDropdown from "./FilterDropdown";

interface ForestAction {
  id: string;
  type: "Röjning" | "Gallring" | "Slutavverkning" | "Inventering";
  year: number;
  departmentId: number;
  status: "Föreslagen" | "Planerad" | "Genomförd";
  comment?: string;
}

interface Department {
  id: string;
  name: string;
  area: number;
}

interface PropertyDetailsViewProps {
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  onClose: () => void;
  onBack: () => void;
  onDepartmentClick?: (departmentId: number, displayLabel?: string) => void;
  onDepartmentHover?: (departmentId: number | null) => void;
  onHighlightDepartments?: (departmentIds: number[]) => void;
  hideHeader?: boolean;
  departmentLabelMap?: Map<number, string>;
}

// Mock data för skogsbruksåtgärder - uppdaterad med departmentId
const mockForestActions: ForestAction[] = [
  { id: "1", type: "Röjning", year: 2031, departmentId: 13, status: "Föreslagen" },
  { id: "2", type: "Gallring", year: 2031, departmentId: 11, status: "Föreslagen" },
  { id: "3", type: "Slutavverkning", year: 2031, departmentId: 14, status: "Föreslagen" },
  { id: "4", type: "Slutavverkning", year: 2031, departmentId: 8, status: "Föreslagen" },
  { id: "5", type: "Röjning", year: 2028, departmentId: 3, status: "Föreslagen" },
  { id: "6", type: "Röjning", year: 2024, departmentId: 11, status: "Föreslagen" },
  { id: "7", type: "Gallring", year: 2024, departmentId: 6, status: "Föreslagen" },
  { id: "8", type: "Inventering", year: 2024, departmentId: 11, status: "Föreslagen" },
];

// Export actions for use in other components
export { mockForestActions };

function TreeIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close menu" opacity="0.5">
          <path d={svgPaths.p2f400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BookIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:book-open">
          <path d={svgPaths.p22c05980} fill="var(--fill-0, #32412A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

// Year interval definitions
const YEAR_INTERVALS = [
  { key: "immediate", label: "Omgående" },
  { key: "2-5", label: "2-5 år" },
  { key: "5-10", label: "5-10 år" },
  { key: "10-20", label: "10-20 år" },
] as const;

function getYearRange(rangeKey: string): { min: number; max: number } | null {
  const currentYear = new Date().getFullYear();
  switch (rangeKey) {
    case 'immediate':
      return { min: 0, max: currentYear + 1 };
    case '2-5':
      return { min: currentYear + 2, max: currentYear + 5 };
    case '5-10':
      return { min: currentYear + 6, max: currentYear + 10 };
    case '10-20':
      return { min: currentYear + 11, max: currentYear + 20 };
    default:
      return null;
  }
}

function yearMatchesIntervals(year: number, selectedIntervals: Set<string>): boolean {
  if (selectedIntervals.size === 0) return true;
  for (const key of selectedIntervals) {
    const range = getYearRange(key);
    if (range && year >= range.min && year <= range.max) return true;
  }
  return false;
}

export { YEAR_INTERVALS, getYearRange, yearMatchesIntervals };

export function PropertyDetailsView({
  propertyName,
  propertyLocation,
  propertyImage,
  onClose,
  onBack,
  onDepartmentClick,
  onDepartmentHover,
  onHighlightDepartments,
  hideHeader = false,
  departmentLabelMap,
}: PropertyDetailsViewProps) {
  const [selectedActionTypes, setSelectedActionTypes] = useState<Set<string>>(new Set());
  const [selectedYearIntervals, setSelectedYearIntervals] = useState<Set<string>>(new Set());

  // Get unique action types
  const uniqueActionTypes = Array.from(new Set(mockForestActions.map(a => a.type))).sort();
  const yearIntervalKeys = YEAR_INTERVALS.map(i => i.key);
  const yearIntervalLabel = (key: string) =>
    YEAR_INTERVALS.find(i => i.key === key)?.label ?? key;

  // Filter actions based on selected filters
  const filteredActions = mockForestActions.filter(action => {
    const matchesType = selectedActionTypes.size === 0 || selectedActionTypes.has(action.type);
    const matchesYear = yearMatchesIntervals(action.year, selectedYearIntervals);
    return matchesType && matchesYear;
  });

  // Get filtered department IDs for map highlighting
  const filteredDepartmentIds = Array.from(new Set(filteredActions.map(a => a.departmentId)));

  // Notify parent about highlighted departments when filters change
  useEffect(() => {
    const hasActiveFilters = selectedActionTypes.size > 0 || selectedYearIntervals.size > 0;
    if (hasActiveFilters) {
      onHighlightDepartments?.(filteredDepartmentIds);
    } else {
      onHighlightDepartments?.([]);
    }
  }, [selectedActionTypes, selectedYearIntervals]);

  // Clear highlights when leaving the tab or unmounting
  useEffect(() => {
    return () => {
      onHighlightDepartments?.([]);
    };
  }, []);

  const clearFilters = () => {
    setSelectedActionTypes(new Set());
    setSelectedYearIntervals(new Set());
  };

  const hasActiveFilters = selectedActionTypes.size > 0 || selectedYearIntervals.size > 0;

  // Gruppera filtrerade åtgärder per år
  const actionsByYear = filteredActions.reduce((acc, action) => {
    if (!acc[action.year]) {
      acc[action.year] = [];
    }
    acc[action.year].push(action);
    return acc;
  }, {} as Record<number, ForestAction[]>);

  // Sortera åren i stigande ordning - närmaste åtgärder först
  const years = Object.keys(actionsByYear).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="bg-white w-full h-full flex flex-col overflow-hidden">
      {!hideHeader && (
        <PropertyHeader
          title="Åtgärder"
          subtitle={propertyLocation}
          onBack={onBack}
          onClose={onClose}
        />
      )}

      {/* Content - No tabs, direct to actions list */}
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden">
        {/* Scrollable content */}
        <div className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col items-stretch overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative w-full h-full">
            {/* Filter Section — använder samma FilterDropdown som
                ContractsPageV2 och DocumentsPage så filtren ser likadana ut
                överallt i appen. */}
            <div className="bg-[#f7f7f7] border-b border-[#e4e4e4]">
              <div className="px-[16px] pt-[8px] pb-[8px] flex gap-[8px]">
                <div className="flex-1">
                  <FilterDropdown
                    label="Åtgärder"
                    options={uniqueActionTypes}
                    selected={selectedActionTypes}
                    onChange={setSelectedActionTypes}
                  />
                </div>
                <div className="flex-1">
                  <FilterDropdown
                    label="År"
                    options={yearIntervalKeys}
                    selected={selectedYearIntervals}
                    onChange={setSelectedYearIntervals}
                    formatOption={yearIntervalLabel}
                  />
                </div>
              </div>

              {/* Active filter summary & clear */}
              {hasActiveFilters && (
                <div className="px-[16px] pb-[8px] flex items-center justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {filteredActions.length} åtgärd{filteredActions.length !== 1 ? 'er' : ''} i {filteredDepartmentIds.length} avd.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#1e3856] hover:underline cursor-pointer"
                  >
                    Rensa filter
                  </button>
                </div>
              )}
            </div>

            {years.length === 0 && hasActiveFilters ? (
              <div className="flex items-center justify-center py-12">
                <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]">
                  Inga åtgärder matchar filtret
                </p>
              </div>
            ) : (
              years.map((year) => (
                <div key={year} className="w-full">
                  {/* Actions for this year */}
                  {actionsByYear[Number(year)].map((action) => (
                    <ActionBlock
                      key={action.id}
                      type={action.type}
                      year={action.year}
                      department={`Avdelning ${departmentLabelMap?.get(action.departmentId) ?? action.departmentId}`}
                      status={action.status}
                      comment={action.comment}
                      onClick={() => {
                        const displayNum = departmentLabelMap?.get(action.departmentId) ?? String(action.departmentId);
                        onDepartmentClick?.(action.departmentId, `Avdelning ${displayNum}`);
                      }}
                      onMouseEnter={() => onDepartmentHover?.(action.departmentId)}
                      onMouseLeave={() => onDepartmentHover?.(null)}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}