import { useState, useEffect } from "react";
import svgPaths from "../imports/svg-yzncxbvcbd";
import { ActionBlock } from "./ActionBlock";
import { PropertyHeader } from "./PropertyHeader";
import { generateDepartmentThumbnail } from "../utils/mapSnapshots";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Skeleton } from "./ui/skeleton";
import { SiteIndexTooltip } from "./SiteIndexTooltip";
import { HuggningsklassInfoIcon } from "./HuggningsklassTooltip";

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
  siteIndex?: string;
  volumePerHa?: number;
  speciesDistribution?: Record<string, number>;
  meanHeight?: number;
  basalArea?: number;
  extractionVolume?: number;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentDetailsViewProps {
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  departmentId: number;
  propertyImage: string;
  onClose: () => void;
  onBack: () => void;
  actions: ForestAction[];
  departmentCoords?: { lat: number; lng: number }[];
  hideHeader?: boolean;
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

export function DepartmentDetailsView({ 
  propertyId,
  propertyName,
  propertyLocation, 
  departmentId,
  propertyImage,
  onClose,
  onBack,
  actions,
  departmentCoords,
  hideHeader
}: DepartmentDetailsViewProps) {
  // Filtrera åtgärder för denna avdelning
  const departmentActions = actions.filter(action => action.departmentId === departmentId);

  // Fetch department details from API
  const [departmentDetails, setDepartmentDetails] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tradslagUnit, setTradslagUnit] = useState<'percent' | 'ha' | 'm3sk'>('percent');

  // Get site index tooltip content – same data as DepartmentsListView
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
    const fetchDepartmentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching department details for:", propertyId, departmentId);
        
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/${propertyId}/${departmentId}`;
        console.log("Fetch URL:", url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        console.log("Response status:", response.status, response.statusText);

        if (!response.ok) {
          if (response.status === 404) {
            // Department not found - this is OK, we'll show a message
            console.log("Department not found in database");
            setError("notFound");
            return;
          }
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`Failed to fetch department details: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched department details:", data);
        
        if (data.department) {
          setDepartmentDetails(data.department);
        } else {
          console.error("No department in response:", data);
          setError("noData");
        }
      } catch (error) {
        console.error("Error fetching department details:", error);
        setError("fetchError");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepartmentDetails();
  }, [propertyId, departmentId]);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full">
      {/* Sticky Department Header */}
      {!hideHeader && (
        <PropertyHeader
          propertyImage={propertyImage}
          propertyName={departmentDetails?.skifte
            ? `Skifte ${departmentDetails.skifte} – Avd ${departmentDetails.skifteDepartmentId}`
            : `Avdelning ${departmentId}`}
          propertyLocation={propertyName}
          onClose={onBack}
        />
      )}

      {/* Content - single scrollable view */}
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden">
        <div className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col items-stretch overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative w-full h-full">
            {/* Beskrivning */}
            <div className="w-full bg-[#f7f7f7] py-2 px-4 border-b border-[#e4e4e4]">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20]">
                Beskrivning
              </p>
            </div>
            {loading ? (
              <div className="bg-white p-[16px] border-b border-[#e4e4e4]">
                <Skeleton className="h-[14px] w-[260px] rounded-none" />
              </div>
            ) : (
              <div className="bg-white p-[16px] border-b border-[#e4e4e4]">
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] opacity-60" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Ingen beskrivning för denna avdelning
                </p>
              </div>
            )}

            {/* Detaljer */}
            <div className="w-full bg-[#f7f7f7] py-2 px-4 border-b border-[#e4e4e4]">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20]">
                Detaljer
              </p>
            </div>
            <div className="w-full bg-white">
              {loading ? (
                <>
                  {/* Skeleton for Detaljer rows – exakt samma layout som riktiga rader */}
                  {[
                    { labelW: 'w-[36px]', valueW: 'w-[48px]' },   // Areal
                    { labelW: 'w-[36px]', valueW: 'w-[42px]' },   // Ålder
                    { labelW: 'w-[100px]', valueW: 'w-[14px]' },  // Huggningsklass
                    { labelW: 'w-[84px]', valueW: 'w-[64px]' },   // Virkesförråd
                    { labelW: 'w-[116px]', valueW: 'w-[88px]' },  // Virkesförråd per ha
                    { labelW: 'w-[92px]', valueW: 'w-[44px]' },   // Ståndortsindex
                    { labelW: 'w-[60px]', valueW: 'w-[36px]' },   // Medelhöjd
                    { labelW: 'w-[56px]', valueW: 'w-[56px]' },   // Grundyta
                    { labelW: 'w-[88px]', valueW: 'w-[56px]' },   // Uttagsvolym
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border-b border-[#e4e4e4]">
                      <Skeleton className={`h-[21px] ${row.labelW} rounded-none`} />
                      <Skeleton className={`h-[21px] ${row.valueW} rounded-none`} />
                    </div>
                  ))}
                </>
              ) : !departmentDetails ? (
                <div className="p-4 text-center">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60">
                    Kunde inte ladda avdelningsdata
                  </p>
                </div>
              ) : (
                <>
                  {departmentDetails.skifte != null && (
                    <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                      <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Skifte</p>
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">Skifte {departmentDetails.skifte}</p>
                    </div>
                  )}
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Areal</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.area} ha</p>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Ålder</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.age} år</p>
                  </div>
                  <div className="flex justify-between items-center p-4 border-b border-[#e4e4e4]">
                    <div className="flex items-center gap-1.5">
                      <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Huggningsklass</p>
                      <HuggningsklassInfoIcon tooltipPosition="bottom" />
                    </div>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.cuttingClass}</p>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Virkesförråd</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.volume} m³sk</p>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Virkesförråd per ha</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.volumePerHa ?? Math.round(departmentDetails.volume / departmentDetails.area)} m³sk/ha</p>
                  </div>
                  <div className="flex justify-between items-center p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Ståndortsindex</p>
                    <div className="flex items-center gap-1.5">
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.siteIndex ?? "–"}</p>
                      {departmentDetails.siteIndex && (
                        <SiteIndexTooltip
                          siteIndex={departmentDetails.siteIndex}
                          tooltipData={getSiteIndexTooltip(departmentDetails.siteIndex)}
                          hideText
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Medelhöjd</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.meanHeight ?? "–"} m</p>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Grundyta</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.basalArea ?? "–"} m²/ha</p>
                  </div>
                  <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]">Uttagsvolym</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20]">{departmentDetails.extractionVolume ?? "–"} m³sk</p>
                  </div>
                </>
              )}
            </div>

            {/* Trädslagsfördelning - bar chart section */}
            {loading ? (
              <>
                {/* Skeleton for Trädslagsfördelning – matchar exakt bar-layouten */}
                <div className="w-full bg-[#f7f7f7] py-2 px-4 border-b border-[#e4e4e4]">
                  <div className="flex items-center justify-between">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20]">
                      Trädslagsfördelning
                    </p>
                    <Skeleton className="h-[26px] w-[48px] rounded" />
                  </div>
                </div>
                <div className="w-full bg-white pb-4 border-b border-[#e4e4e4]">
                  <div className="px-4 pt-4 space-y-2">
                    {[85, 55, 35, 20].map((width, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Skeleton className="h-[12px] w-14 rounded-none shrink-0" />
                        <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                          <Skeleton className="h-full rounded-r bg-gray-200" style={{ width: `${width}%` }} />
                        </div>
                        <Skeleton className="h-[12px] w-[60px] rounded-none shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : departmentDetails?.speciesDistribution && (() => {
              const dist = departmentDetails.speciesDistribution!;
              const entries = Object.entries(dist).sort(([, a], [, b]) => b - a);
              const speciesColors: Record<string, string> = {
                'Tall': '#cc8c52',
                'Gran': '#32412a',
                'Löv': '#c4d987',
                'Björk': '#d4a76a',
                'Contorta': '#5a7a3a',
                'Ek': '#8b6914',
                'Övrigt': '#999999',
              };

              // Compute ha and m³sk per species from percentages
              const speciesData = entries.map(([species, pct]) => ({
                species,
                pct,
                ha: Math.round((pct / 100) * departmentDetails.area * 10) / 10,
                m3sk: Math.round((pct / 100) * departmentDetails.volume),
              }));

              const maxPct = Math.max(...speciesData.map(s => s.pct));
              const maxHa = Math.max(...speciesData.map(s => s.ha));
              const maxM3sk = Math.max(...speciesData.map(s => s.m3sk));

              const getBarWidth = (s: typeof speciesData[0]) => {
                if (tradslagUnit === 'percent') return (s.pct / maxPct) * 100;
                if (tradslagUnit === 'ha') return (s.ha / maxHa) * 100;
                return (s.m3sk / maxM3sk) * 100;
              };

              const formatValue = (s: typeof speciesData[0]) => {
                if (tradslagUnit === 'percent') return `${s.pct}%`;
                if (tradslagUnit === 'ha') return `${s.ha.toFixed(1)} ha`;
                return `${s.m3sk} m³sk`;
              };

              const getNextUnit = () => {
                if (tradslagUnit === 'percent') return 'ha' as const;
                if (tradslagUnit === 'ha') return 'm3sk' as const;
                return 'percent' as const;
              };

              const getUnitLabel = () => {
                if (tradslagUnit === 'percent') return '%';
                if (tradslagUnit === 'ha') return 'ha';
                return 'm³sk';
              };

              return (
                <>
                  <div className="w-full bg-[#f7f7f7] py-2 px-4 border-b border-[#e4e4e4]">
                    <div className="flex items-center justify-between">
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20]">
                        Trädslagsfördelning
                      </p>
                      <button
                        onClick={() => setTradslagUnit(getNextUnit())}
                        className="flex items-center gap-1 bg-white border border-[#e4e4e4] rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[11px] text-gray-700">
                          {getUnitLabel()}
                        </span>
                        <svg className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-white pb-4 border-b border-[#e4e4e4]">
                    <div className="px-4 pt-4 space-y-2">
                      {speciesData.map((s) => {
                        const color = speciesColors[s.species] || '#999999';
                        return (
                          <div key={s.species} className="flex items-center gap-1">
                            <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] w-14 shrink-0">{s.species}</span>
                            <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                              <div className="h-full rounded-r transition-all duration-300" style={{ width: `${getBarWidth(s)}%`, backgroundColor: color }}></div>
                            </div>
                            <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] w-[60px] text-right shrink-0">{formatValue(s)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Planerade åtgärder - section header */}
            <div className="w-full bg-[#f7f7f7] py-2 px-4 border-b border-[#e4e4e4]">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20]">
                Planerade åtgärder
              </p>
            </div>

            {/* Planerade åtgärder */}
            {loading ? (
              <>
                {/* Skeleton for Planerade åtgärder – matchar ActionBlock-layouten */}
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="bg-white relative w-full">
                    <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                    <div className="w-full">
                      <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
                          <div className="content-stretch flex items-start justify-between relative w-full">
                            <Skeleton className="h-[16px] rounded-none" style={{ width: i === 0 ? '72px' : '60px' }} />
                            <Skeleton className="h-[14px] w-[36px] rounded-none" />
                          </div>
                          <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative w-full">
                            <Skeleton className="h-[22px] w-[76px] rounded-[4px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : departmentActions.length === 0 ? (
              <div className="bg-white p-[16px] border-b border-[#e4e4e4]">
                <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20] opacity-60" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Inga planerade åtgärder för denna avdelning
                </p>
              </div>
            ) : (
              departmentActions.map((action) => (
                <ActionBlock
                  key={action.id}
                  type={action.type}
                  year={action.year}
                  status={action.status}
                  comment={action.comment}
                />
              ))
            )}
          </div>
          <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}