import { useState, useEffect } from "react";
import { Note } from "./NotesView";
import ForestButton from "./ForestButton";
import { HolmenInput } from "./HolmenInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2, MapPin, MapPinned, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface NoteFormProps {
  note?: Partial<Note>;
  departments?: string[];
  onSave: (note: Partial<Note>) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  isNew?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  noteType?: 'point' | 'area';
  onNoteTypeChange?: (type: 'point' | 'area') => void;
  onColorChange?: (color: string) => void;
}

export function NoteForm({
  note,
  departments = [],
  onSave,
  onCancel,
  onDelete,
  isNew = false,
  isSaving = false,
  isDeleting = false,
  noteType = 'point',
  onNoteTypeChange,
  onColorChange,
}: NoteFormProps) {
  const [formData, setFormData] = useState<Partial<Note>>({
    title: "",
    department: "",
    type: "Generell",
    comment: "",
    color: "#1E3856", // Default color
    category: "Övrigt",
    ...note,
  });

  useEffect(() => {
    // Update ONLY coordinates and department when they change from map clicks
    // Don't overwrite user input fields (title, comment, type)
    if (note?.coordinates) {
      setFormData((prev) => ({
        ...prev,
        coordinates: note.coordinates,
        department: note.department || prev.department,
      }));
    }
  }, [note?.coordinates, note?.department]);

  const handleTypeChange = (value: string) => {
    let color = "#1E3856";
    let category = "Övrigt";

    switch (value) {
      case "Skogsskada":
      case "Vindfälle":
      case "Vindfäll":
      case "Viltskada":
        color = "#FF6E2E"; // Orange
        category = "Skador";
        break;
      case "Åtgärd":
        color = "#2E7D32"; // Green
        category = "Åtgärder";
        break;
      case "Generell":
        color = "#1E3856"; // Blue
        category = "Åtgärder";
        break;
    }

    setFormData((prev) => ({
      ...prev,
      type: value as any,
      color,
      category,
    }));
    onColorChange?.(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const coordinatesStr = formData.coordinates
    ? `${formData.coordinates.lat.toFixed(5)}, ${formData.coordinates.lng.toFixed(5)}`
    : "Klicka på kartan för att placera";

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-5">
        {/* Markering: punkt eller yta */}
        {onNoteTypeChange && (
          <div className="flex gap-0">
            <button
              type="button"
              onClick={() => onNoteTypeChange('point')}
              className={`flex-1 flex items-center justify-center gap-[6px] py-[10px] border-2 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] transition-colors ${
                noteType === 'point'
                  ? 'bg-[#1e3856] border-[#1e3856] text-white'
                  : 'bg-white border-[#ededed] text-[#1e3856] hover:bg-[#f7f7f7]'
              }`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <MapPin className="h-4 w-4" />
              PUNKT
            </button>
            <button
              type="button"
              onClick={() => onNoteTypeChange('area')}
              className={`flex-1 flex items-center justify-center gap-[6px] py-[10px] border-2 border-l-0 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] transition-colors ${
                noteType === 'area'
                  ? 'bg-[#1e3856] border-[#1e3856] text-white'
                  : 'bg-white border-[#ededed] text-[#1e3856] hover:bg-[#f7f7f7]'
              }`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <MapPinned className="h-4 w-4" />
              YTA
            </button>
          </div>
        )}

        {/* Avdelning + Position — info box */}
        <div className="bg-[#f7f7f7] border border-[#e4e4e4] px-[14px] py-[10px] flex flex-col gap-[6px] font-['IBM_Plex_Sans',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {formData.department && (
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] text-[#021c20] font-semibold">Avdelning</span>
              <span className="text-[14px] text-[var(--text-secondary)]">{formData.department.replace(/^Avd\s*/, '')}</span>
            </div>
          )}
          {coordinatesStr && (
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] text-[#021c20] font-semibold">Position</span>
              <span className="text-[14px] text-[var(--text-secondary)] flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                {coordinatesStr}
              </span>
            </div>
          )}
        </div>

        {/* Typ */}
        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="type"
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Typ
          </label>
          <Select
            value={formData.type || "Generell"}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="h-[48px] rounded-none border-2 border-[#ededed] bg-white focus:border-[#1e3856] font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[var(--text-primary)]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <SelectValue placeholder="Välj typ" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="Generell">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: '#1E3856' }} />
                  <span>Generell</span>
                </div>
              </SelectItem>
              <SelectItem value="Skogsskada">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: '#FF6E2E' }} />
                  <span>Skogsskada</span>
                </div>
              </SelectItem>
              <SelectItem value="Åtgärd">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: '#2E7D32' }} />
                  <span>Åtgärd</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rubrik + Kommentar */}
        <HolmenInput
          id="title"
          label="Rubrik"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Ange rubrik..."
          required
        />

        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="comment"
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Anteckning
          </label>
          <textarea
            id="comment"
            value={formData.comment || ""}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Skriv en anteckning..."
            className="w-full min-h-[80px] px-[16px] py-[12px] bg-white border-2 border-[#ededed] rounded-none font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] placeholder:text-[#999] outline-none transition-colors focus:border-[#1e3856] resize-none"
            style={{ fontVariationSettings: "'wdth' 100" }}
          />
        </div>


        <div className="pt-4 flex gap-3">
          <ForestButton
            type="button"
            variant="white"
            className="flex-1"
            onClick={onCancel}
          >
            Avbryt
          </ForestButton>
          <ForestButton
            type="submit"
            disabled={isSaving}
            variant="primary"
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sparar...
              </>
            ) : (
              "Spara"
            )}
          </ForestButton>
        </div>
      </form>
    </div>
  );
}