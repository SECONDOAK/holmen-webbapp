import ForestButton from "./ForestButton";
import { useState, useEffect, useRef } from "react";
import { PropertyHeader } from "./PropertyHeader";
import { SubNavigationHeader } from "./SubNavigationHeader";
import { NoteCard } from "./NoteCard";
import { Plus, SlidersHorizontal, Check } from "lucide-react";
import svgPaths from "../imports/svg-ikz2d2yxru";

interface NotesViewProps {
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  onClose: () => void;
  onBack: () => void;
  hideHeader?: boolean;
  notes?: Note[];
  onNoteClick?: (note: Note) => void;
  onNoteHover?: (noteId: string | null) => void;
  onAddNote?: () => void;
  onEditNote?: (note: Note) => void;
  onShareNote?: (note: Note) => void;
  onToggleResolved?: (note: Note) => void;
  showResolvedNotes?: boolean;
  onShowResolvedNotesChange?: (show: boolean) => void;
  onStartMeasure?: () => void;
}

export interface Note {
  id: string;
  title: string;
  department: string;
  date: string;
  color: string;
  category: string;
  type?: "Generell" | "Vindfälle" | "Viltskada" | "Åtgärd";
  comment?: string;
  coordinates?: { lat: number; lng: number };
  polygon?: Array<{ lat: number; lng: number }>; // For area-based notes
  resolved?: boolean;
}

// Mock data removed - passed via props
const defaultNotes: Note[] = [];

function MapMarkerIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p101e26f0} fill={color} />
        </g>
      </svg>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <div className="h-[18px] relative w-[12px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g>
          <path d={svgPaths.peec4300} fill="#021C20" />
        </g>
      </svg>
    </div>
  );
}

export function NotesView({ 
  propertyName, 
  propertyLocation, 
  propertyImage,
  onClose,
  onBack,
  hideHeader,
  notes = defaultNotes,
  onNoteClick,
  onNoteHover,
  onAddNote,
  onEditNote,
  onShareNote,
  onToggleResolved,
  showResolvedNotes,
  onShowResolvedNotesChange,
  onStartMeasure
}: NotesViewProps) {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const showResolved = showResolvedNotes ?? true;
  const setShowResolved = (v: boolean) => onShowResolvedNotesChange?.(v);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredNotes = notes
    .filter(note => note != null)
    .filter(note => {
      const normalizedType = note.type === "Vindfäll" ? "Vindfälle" : note.type;
      const matchesType = selectedTypes.size === 0 || !note.type || selectedTypes.has(normalizedType!);
      const matchesResolved = showResolved || !note.resolved;
      return matchesType && matchesResolved;
    });

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full">
      {/* Sticky Property Header */}
      {!hideHeader && (
        <PropertyHeader
          propertyName={propertyName}
          propertyLocation={propertyLocation}
          propertyImage={propertyImage}
          onClose={onClose}
        />
      )}

      {/* Sub Navigation Header */}
      {!hideHeader && (
        <SubNavigationHeader
          title="Anteckningar"
          onBack={onBack}
        />
      )}

      {/* Content */}
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full overflow-hidden">
        <div className="basis-0 bg-[#f7f7f7] box-border content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative shrink-0 w-full">
          {/* Toolbar: New note + filter button */}
          <div className="relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="box-border flex items-center gap-[8px] p-[16px] relative w-full">
              <ForestButton onClick={onAddNote} variant="primary" className="flex-1">
                Ny anteckning
              </ForestButton>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="h-[51.5px] w-[51.5px] flex items-center justify-center border border-[#ededed] bg-white text-[#1e3856] hover:bg-[#f7f7f7] transition-colors shrink-0 box-border"
                  title="Filtrera"
                >
                  <SlidersHorizontal size={18} strokeWidth={2} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20 min-w-[200px]">
                    {([
                      { type: "Generell", color: "#1E3856" },
                      { type: "Vindfälle", color: "#5F283F" },
                      { type: "Viltskada", color: "#D9381E" },
                      { type: "Åtgärd", color: "#2E7D32" },
                    ] as const).map(({ type, color }) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className="flex items-center gap-[10px] w-full px-[12px] py-[10px] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                      >
                        <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 ${
                          selectedTypes.has(type) ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#ccc] bg-white'
                        }`}>
                          {selectedTypes.has(type) && <Check size={12} strokeWidth={2.5} className="text-white" />}
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <div className="size-[10px] rounded-full" style={{ backgroundColor: color }} />
                          <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{type}</span>
                        </div>
                      </button>
                    ))}
                    <div className="border-t border-[#ededed]">
                      <button
                        onClick={() => setShowResolved(!showResolved)}
                        className="flex items-center gap-[10px] w-full px-[12px] py-[10px] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                      >
                        <div className={`w-[18px] h-[18px] border-2 flex items-center justify-center shrink-0 ${
                          showResolved ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#ccc] bg-white'
                        }`}>
                          {showResolved && <Check size={12} strokeWidth={2.5} className="text-white" />}
                        </div>
                        <span className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>Visa klarmarkerade</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes list */}
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                department={note.department}
                date={note.date}
                color={note.color}
                type={note.type}
                resolved={note.resolved}
                onClick={() => onNoteClick?.(note)}
                onEdit={() => onEditNote?.(note)}
                onShare={() => onShareNote?.(note)}
                onToggleResolved={() => onToggleResolved?.(note)}
                onHover={() => onNoteHover?.(note.id)}
                onHoverEnd={() => onNoteHover?.(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}