import { useState, useEffect, useRef } from "react";
import { generateDepartmentSnapshot } from "../utils/mapSnapshots";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import StatusBadge from "./StatusBadge";
import { SiteIndexTooltip } from "./SiteIndexTooltip";
import { ChevronDown, ChevronRight, Check } from "lucide-react";
import { YEAR_INTERVALS, yearMatchesIntervals } from "./PropertyDetailsView";

interface ForestAction {
  id: string;
  type: "Röjning" | "Gallring" | "Slutavverkning" | "Inventering";
  year: number;
  departmentId: number;
  status: "Föreslagen" | "Planerad" | "Genomförd";
  comment?: string;
}

interface DepartmentData {
  id: string;
  propertyId: string;
  departmentId: number;
  skifte?: number;
  skifteDepartmentId?: number;
  area: number;
  age: number;
  cuttingClass: string; // K1, K2, R1, R2, G1, G2, S1, S2, S3, E1, E2, E3
  volume: number;
  mainSpecies: "Gran" | "Tall" | "Björk" | "Contorta" | "Ek" | "Löv";
  site: "Frisk" | "Fuktig" | "Torr" | "Blöt";
  terrain: "Plant" | "Kuperat" | "Brant";
  siteIndex: string;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentsListViewProps {
  propertyId: string;
  propertyName: string;
  propertyCoordinates: { lat: number; lng: number }[][];
  onDepartmentClick: (departmentId: number, displayLabel?: string) => void;
  onDepartmentHover?: (departmentId: number | null) => void;
  actions?: ForestAction[];
  hideHeader?: boolean;
  onHighlightDepartments?: (departmentIds: number[]) => void;
}

export function DepartmentsListView({ 
  propertyId,
  propertyName, 
  propertyCoordinates,
  onDepartmentClick,
  onDepartmentHover,
  actions = [],
  hideHeader = false,
  onHighlightDepartments
}: DepartmentsListViewProps) {
  const [hoveredDepartment, setHoveredDepartment] = useState<number | null>(null);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReseeding, setIsReseeding] = useState(false);
  const [selectedActionTypes, setSelectedActionTypes] = useState<Set<string>>(new Set());
  const [selectedYearIntervals, setSelectedYearIntervals] = useState<Set<string>>(new Set());
  const [openDropdown, setOpenDropdown] = useState<"type" | "year" | null>(null);
  const [collapsedSkiften, setCollapsedSkiften] = useState<Set<number>>(new Set());
  const [hoveredSkifte, setHoveredSkifte] = useState<number | null>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const toggleSkifte = (skifteNum: number) => {
    setCollapsedSkiften(prev => {
      const next = new Set(prev);
      if (next.has(skifteNum)) next.delete(skifteNum);
      else next.add(skifteNum);
      return next;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdown === "type" && typeDropdownRef.current && !typeDropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === "year" && yearDropdownRef.current && !yearDropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const toggleActionType = (type: string) => {
    setSelectedActionTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const toggleYearInterval = (key: string) => {
    setSelectedYearIntervals(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedActionTypes(new Set());
    setSelectedYearIntervals(new Set());
  };

  const hasActiveFilters = selectedActionTypes.size > 0 || selectedYearIntervals.size > 0;

  // Compute filtered department IDs for map highlighting
  const getFilteredDepartmentIds = (): number[] => {
    return propertyCoordinates
      .map((_, index) => {
        const departmentId = index + 1;
        const data = departments.find(d => d.departmentId === departmentId);
        if (!data) return null;

        const departmentActions = actions.filter(action => action.departmentId === departmentId);
        const nextAction = departmentActions.sort((a, b) => a.year - b.year)[0];

        // Apply action type filter
        if (selectedActionTypes.size > 0 && (!nextAction || !selectedActionTypes.has(nextAction.type))) {
          return null;
        }
        // Apply year interval filter
        if (selectedYearIntervals.size > 0) {
          if (!nextAction) return null;
          if (!yearMatchesIntervals(nextAction.year, selectedYearIntervals)) {
            return null;
          }
        }
        return departmentId;
      })
      .filter((id): id is number => id !== null);
  };

  // Notify parent about highlighted departments when filters change
  useEffect(() => {
    if (hasActiveFilters) {
      onHighlightDepartments?.(getFilteredDepartmentIds());
    } else {
      onHighlightDepartments?.([]);
    }
  }, [selectedActionTypes, selectedYearIntervals, departments]);

  // Clear highlights when unmounting
  useEffect(() => {
    return () => {
      onHighlightDepartments?.([]);
    };
  }, []);

  // Get site index tooltip content
  const getSiteIndexTooltip = (siteIndex: string) => {
    const tooltips: Record<string, { title: string; height: string }> = {
      'T22': {
        title: 'T22 - Tall, ståndortsindex 22',
        height: 'Medelhöjd: 22 meter vid 100 års ålder'
      },
      'T14': {
        title: 'T14 - Tall, ståndortsindex 14',
        height: 'Medelhöjd: 14 meter vid 100 års ålder'
      },
      'T18': {
        title: 'T18 - Tall, ståndortsindex 18',
        height: 'Medelhöjd: 18 meter vid 100 års ålder'
      },
      'G38': {
        title: 'G38 - Gran, ståndortsindex 38',
        height: 'Medelhöjd: 38 meter vid 100 års ålder'
      },
      'G32': {
        title: 'G32 - Gran, ståndortsindex 32',
        height: 'Medelhöjd: 32 meter vid 100 års ålder'
      },
      'B20': {
        title: 'B20 - Björk, ståndortsindex 20',
        height: 'Medelhöjd: 20 meter vid referensåldern'
      }
    };

    return tooltips[siteIndex] || {
      title: `${siteIndex} - Ståndortsindex`,
      height: 'Information saknas'
    };
  };

  useEffect(() => {
    fetchDepartments();
  }, [propertyId]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      console.log("Fetching departments for propertyId:", propertyId);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/${propertyId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched departments data:", data);
      console.log("First department:", data.departments?.[0]);
      setDepartments(data.departments || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReseedData = async () => {
    try {
      setIsReseeding(true);
      console.log("Clearing and re-seeding department data...");
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/debug/clear-all`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to reseed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Reseed result:", result);
      
      // Refresh departments list
      await fetchDepartments();
    } catch (error) {
      console.error("Error reseeding departments:", error);
    } finally {
      setIsReseeding(false);
    }
  };

  const handleMouseEnter = (departmentId: number) => {
    setHoveredDepartment(departmentId);
    onDepartmentHover?.(departmentId);
  };

  const handleMouseLeave = () => {
    setHoveredDepartment(null);
    onDepartmentHover?.(null);
  };

  // Get unique action types and years from actions
  const uniqueActionTypes = Array.from(new Set(actions.map(a => a.type))).sort();

  if (loading) {
    return (
      <div className="bg-[#f7f7f7] size-full flex items-center justify-center">
        <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]">
          Laddar avdelningar...
        </p>
      </div>
    );
  }

  // Show reseed button if no departments found
  if (departments.length === 0) {
    return (
      <div className="bg-[#f7f7f7] size-full flex flex-col items-center justify-center gap-4 p-8">
        <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666] text-center">
          Inga avdelningar hittades för denna fastighet
        </p>
        <button
          onClick={handleReseedData}
          disabled={isReseeding}
          className="px-4 py-2 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] disabled:opacity-50"
        >
          {isReseeding ? 'Laddar om data...' : 'Ladda om avdelningsdata'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] size-full flex flex-col">
      {/* Filter Section */}
      {uniqueActionTypes.length > 0 && (
        <div className="bg-[#f7f7f7] border-b border-[#e4e4e4]">
          <div className="px-[16px] pt-[8px] pb-[8px] flex gap-[8px]">
            {/* Action Type Dropdown */}
            <div className="relative flex-1" ref={typeDropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
                className={`flex items-center justify-between w-full h-[40px] px-[12px] bg-white border-2 font-['IBM_Plex_Sans',sans-serif] text-[14px] transition-colors cursor-pointer ${
                  selectedActionTypes.size > 0 ? 'border-[#1e3856]' : 'border-[#ededed]'
                }`}
              >
                <span className="truncate text-left" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {selectedActionTypes.size === 0
                    ? "Åtgärder (ALLA)"
                    : selectedActionTypes.size === 1
                      ? Array.from(selectedActionTypes)[0]
                      : `${selectedActionTypes.size} åtgärdstyper`}
                </span>
                <ChevronDown size={16} strokeWidth={2} className={`shrink-0 ml-2 transition-transform ${openDropdown === "type" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "type" && (
                <div className="absolute left-0 right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20">
                  {uniqueActionTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleActionType(type)}
                      className="flex items-center gap-[10px] w-full px-[12px] py-[10px] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                    >
                      <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 ${
                        selectedActionTypes.has(type) ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#ccc] bg-white'
                      }`}>
                        {selectedActionTypes.has(type) && <Check size={12} strokeWidth={2.5} className="text-white" />}
                      </div>
                      <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year Interval Dropdown */}
            <div className="relative flex-1" ref={yearDropdownRef}>
              <button
                onClick={() => setOpenDropdown(openDropdown === "year" ? null : "year")}
                className={`flex items-center justify-between w-full h-[40px] px-[12px] bg-white border-2 font-['IBM_Plex_Sans',sans-serif] text-[14px] transition-colors cursor-pointer ${
                  selectedYearIntervals.size > 0 ? 'border-[#1e3856]' : 'border-[#ededed]'
                }`}
              >
                <span className="truncate text-left" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {selectedYearIntervals.size === 0
                    ? "År (ALLA)"
                    : selectedYearIntervals.size === 1
                      ? YEAR_INTERVALS.find(i => i.key === Array.from(selectedYearIntervals)[0])?.label
                      : `${selectedYearIntervals.size} intervaller`}
                </span>
                <ChevronDown size={16} strokeWidth={2} className={`shrink-0 ml-2 transition-transform ${openDropdown === "year" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "year" && (
                <div className="absolute left-0 right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20">
                  {YEAR_INTERVALS.map(interval => (
                    <button
                      key={interval.key}
                      onClick={() => toggleYearInterval(interval.key)}
                      className="flex items-center gap-[10px] w-full px-[12px] py-[10px] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                    >
                      <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 ${
                        selectedYearIntervals.has(interval.key) ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#ccc] bg-white'
                      }`}>
                        {selectedYearIntervals.has(interval.key) && <Check size={12} strokeWidth={2.5} className="text-white" />}
                      </div>
                      <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {interval.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active filter summary & clear */}
          {hasActiveFilters && (
            <div className="px-[16px] pb-[8px] flex items-center justify-between">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Filtrerad lista
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
      )}

      {/* Departments list */}
      <div className="w-full flex-1 overflow-y-auto">
        {(() => {
          // Build filtered list of department items
          const filteredItems = propertyCoordinates
            .map((coords, index) => {
              const departmentId = index + 1;
              const data = departments.find(d => d.departmentId === departmentId);
              if (!data) return null;
              const departmentActions = actions.filter(action => action.departmentId === departmentId);
              const nextAction = departmentActions.sort((a, b) => a.year - b.year)[0];
              return { coords, departmentId, data, nextAction };
            })
            .filter(item => item !== null)
            .filter(({ nextAction }) => {
              if (selectedActionTypes.size > 0 && (!nextAction || !selectedActionTypes.has(nextAction.type))) return false;
              if (selectedYearIntervals.size > 0) {
                if (!nextAction) return false;
                if (!yearMatchesIntervals(nextAction.year, selectedYearIntervals)) return false;
              }
              return true;
            })
            .sort((a, b) => a.departmentId - b.departmentId);

          // Check if any departments have skifte data
          const hasSkiften = filteredItems.some(item => item.data.skifte != null);

          // Helper: render a single department row
          const renderDepartmentRow = (item: typeof filteredItems[0], displayName: string) => (
            <div
              key={item.departmentId}
              onClick={() => onDepartmentClick(item.departmentId, displayName)}
              onMouseEnter={() => handleMouseEnter(item.departmentId)}
              onMouseLeave={handleMouseLeave}
              className={`bg-white relative w-full cursor-pointer hover:bg-gray-50 transition-colors ${
                hoveredDepartment === item.departmentId ? 'bg-gray-50' : ''
              }`}
            >
              <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
              <div className="w-full">
                <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
                    <div className="content-stretch flex items-start justify-between relative w-full">
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {displayName}
                        </p>
                      </div>
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {item.data.area} ha
                      </p>
                    </div>
                    <div className="content-start flex flex-wrap gap-[8px] items-center justify-between relative w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <SiteIndexTooltip
                            siteIndex={item.data.siteIndex || 'N/A'}
                            tooltipData={getSiteIndexTooltip(item.data.siteIndex || '')}
                          />
                        </div>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify" style={{ fontVariationSettings: "'wdth' 100" }}>
                          , {item.data.age} år
                        </p>
                      </div>
                      {item.nextAction && (
                        <StatusBadge
                          label={`${item.nextAction.type} ${item.nextAction.year}`}
                          variant="green"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          if (!hasSkiften) {
            // No skiften – flat list as before
            return filteredItems.map(item =>
              renderDepartmentRow(item, `Avdelning ${item.departmentId}`)
            );
          }

          // Group by skifte
          const skifteGroups = new Map<number, typeof filteredItems>();
          for (const item of filteredItems) {
            const skifteNum = item.data.skifte ?? 0;
            if (!skifteGroups.has(skifteNum)) skifteGroups.set(skifteNum, []);
            skifteGroups.get(skifteNum)!.push(item);
          }

          // Sort skifte groups by number, compute totals
          const sortedSkifteNums = Array.from(skifteGroups.keys()).sort((a, b) => a - b);

          return sortedSkifteNums.map(skifteNum => {
            const items = skifteGroups.get(skifteNum)!;
            const isCollapsed = collapsedSkiften.has(skifteNum);
            const totalArea = items.reduce((sum, i) => sum + i.data.area, 0);

            return (
              <div key={`skifte-${skifteNum}`}>
                {/* Skifte header */}
                <button
                  onClick={() => toggleSkifte(skifteNum)}
                  onMouseEnter={() => {
                    setHoveredSkifte(skifteNum);
                    const skifteDeptIds = items.map(i => i.departmentId);
                    onHighlightDepartments?.(skifteDeptIds);
                  }}
                  onMouseLeave={() => {
                    setHoveredSkifte(null);
                    // Restore filter-based highlighting or clear
                    if (hasActiveFilters) {
                      onHighlightDepartments?.(getFilteredDepartmentIds());
                    } else {
                      onHighlightDepartments?.([]);
                    }
                  }}
                  className={`w-full bg-[#f7f7f7] border-b border-[#e4e4e4] px-[16px] py-[10px] flex items-center justify-between cursor-pointer transition-colors ${
                    hoveredSkifte === skifteNum ? 'bg-[#e8edf2]' : 'hover:bg-[#efefef]'
                  }`}
                >
                  <div className="flex items-center gap-[8px]">
                    {isCollapsed ? (
                      <ChevronRight size={16} strokeWidth={2} className="text-[#1e3856] shrink-0" />
                    ) : (
                      <ChevronDown size={16} strokeWidth={2} className="text-[#1e3856] shrink-0" />
                    )}
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Skifte {skifteNum}
                    </p>
                    <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#666] ml-1" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {items.length} avdelningar
                    </span>
                  </div>
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {totalArea.toFixed(1)} ha
                  </p>
                </button>
                {/* Department rows within skifte */}
                {!isCollapsed && items
                  .sort((a, b) => (a.data.skifteDepartmentId ?? a.departmentId) - (b.data.skifteDepartmentId ?? b.departmentId))
                  .map(item =>
                    renderDepartmentRow(
                      item,
                      `Avdelning ${item.data.skifteDepartmentId ?? item.departmentId}`
                    )
                  )
                }
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}