import ForestButton from "./ForestButton";
import { useState } from "react";
import { PropertyHeader } from "./PropertyHeader";
import { SubNavigationHeader } from "./SubNavigationHeader";
import { NoteCard } from "./NoteCard";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
  onStartMeasure
}: NotesViewProps) {
  const [filterType, setFilterType] = useState<string>("all");

  // Filter notes based on selected type only
  const filteredNotes = notes
    .filter(note => note != null) // Remove null/undefined values
    .filter(note => {
      const matchesType = filterType === "all" || note.type === filterType;
      return matchesType;
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
          {/* Filter dropdown - Typ */}
          <div className="relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col items-start p-[16px] pt-[8px] relative w-full">
                <label className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#666666] mb-[6px] uppercase tracking-wide">
                  Typ
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-white h-[48px] w-full border-2 border-[#ededed] rounded-none font-['IBM_Plex_Sans',sans-serif]">
                    <SelectValue placeholder="Alla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla</SelectItem>
                    <SelectItem value="Generell">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: '#1E3856' }} />
                        <span>Generell</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Vindfälle">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: '#5F283F' }} />
                        <span>Vindfälle</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Viltskada">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: '#D9381E' }} />
                        <span>Viltskada</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Åtgärd">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: '#2E7D32' }} />
                        <span>Åtgärd</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* New note button */}
          <div className="bg-white relative shrink-0 w-full">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center size-full">
              <div className="box-border content-stretch flex items-center justify-between p-[16px] relative w-full">
                <ForestButton onClick={onAddNote} variant="primary" className="w-full">
                  Ny anteckning
                </ForestButton>
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
                onClick={() => onNoteClick?.(note)}
                onEdit={() => onEditNote?.(note)}
                onShare={() => onShareNote?.(note)}
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