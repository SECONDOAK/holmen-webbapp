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
import { Loader2, MapPin, MapPinned } from "lucide-react";
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
      case "Vindfälle":
      case "Vindfäll":
        color = "#5F283F"; // Purple
        category = "Skador";
        break;
      case "Viltskada":
        color = "#D9381E"; // Red
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
      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-6">
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
            htmlFor="type"
            className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
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
              <SelectItem value="Generell">Generell</SelectItem>
              <SelectItem value="Vindfälle">Vindfälle</SelectItem>
              <SelectItem value="Viltskada">Viltskada</SelectItem>
              <SelectItem value="Åtgärd">Åtgärd</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {onNoteTypeChange && (
          <div className="flex flex-col gap-[8px]">
            <label
              className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Anteckningsläge
            </label>
            <div className="flex gap-0">
              <ForestButton
                type="button"
                variant={noteType === 'point' ? 'primary' : 'white'}
                onClick={() => onNoteTypeChange('point')}
                className="flex-1"
              >
                <MapPin className="h-4 w-4" />
                Punkt
              </ForestButton>
              <ForestButton
                type="button"
                variant={noteType === 'area' ? 'primary' : 'white'}
                onClick={() => onNoteTypeChange('area')}
                className="flex-1"
              >
                <MapPinned className="h-4 w-4" />
                Yta
              </ForestButton>
            </div>
            <p className="text-xs text-gray-500">
              {noteType === 'point'
                ? 'Klicka på kartan för att placera en punkt'
                : 'Klicka på kartan för att rita en yta'}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-[8px]">
          <HolmenInput
            id="department"
            label="Avdelning"
            value={formData.department || "Ej placerad"}
            readOnly
            disabled
          />
          <p className="text-xs text-gray-500">
            Avdelningen upptäcks automatiskt när du placerar markören.
          </p>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label
            className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Position
          </label>
          <div className="flex items-center gap-2 h-[48px] px-[16px] bg-white border-2 border-[#ededed] rounded-none text-[16px] text-[var(--text-primary)]">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{coordinatesStr}</span>
          </div>
          {isNew && !formData.coordinates && (
            <p className="text-xs text-blue-600 animate-pulse">
              Klicka på kartan för att placera markören.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor="comment"
            className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[var(--text-primary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Kommentar
          </label>
          <textarea
            id="comment"
            value={formData.comment || ""}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Skriv en kommentar..."
            className="w-full min-h-[100px] px-[16px] py-[12px] bg-white border-2 border-[#ededed] rounded-none font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)] placeholder:text-[#999] outline-none transition-colors focus:border-[#1e3856] resize-none"
            style={{ fontVariationSettings: "'wdth' 100" }}
          />
        </div>

        <div className="pt-4 flex gap-3">
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
          {!isNew && onDelete && formData.id && (
            <AlertDialog>
              <AlertDialogTrigger
                disabled={isDeleting}
                className="box-border flex items-center justify-center gap-2 cursor-pointer transition-colors border font-['IBM_Plex_Sans',sans-serif] font-bold text-center uppercase px-[32px] py-[12px] text-[15px] leading-[25.5px] bg-white text-[#1e3856] border-2 border-[#ededed] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Ta bort
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Är du säker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Detta kommer att permanent ta bort anteckningen. Denna åtgärd kan inte ångras.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Avbryt</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(formData.id!)} 
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Tar bort...
                      </span>
                    ) : (
                      "Ta bort"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </div>
  );
}