import image_9e613302068097aa58a90d360320b38f2a46f3c7 from 'figma:asset/9e613302068097aa58a90d360320b38f2a46f3c7.png';
import { useState, useEffect } from "react";
import { PropertyDetailsView, mockForestActions } from "./PropertyDetailsView";
import { DepartmentDetailsView } from "./DepartmentDetailsView";
import { DepartmentsListView } from "./DepartmentsListView";
import { NotesView, Note } from "./NotesView";
import { NoteForm } from "./NoteForm";
import svgPaths from "../imports/svg-yzncxbvcbd";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { generateDepartmentSnapshot } from "../utils/mapSnapshots";
import { PropertyHeader } from "./PropertyHeader";
import { X, Pentagon, FileText, MapPinned, BookOpenCheck } from "lucide-react";
import ContactCard from "./ContactCard";
import { ActionCard } from "./ActionCard";
import { PropertySwitcher } from "./PropertySwitcher";
import { HuggningsklassInfoIcon, HUGGNINGSKLASSER_COLORS } from "./HuggningsklassTooltip";
import { NoPlanTooltip } from "./NoPlanTooltip";
import { CollapsibleSection } from "./CollapsibleSection";

interface Property {
  id: string;
  name: string;
  area: number;
  type: string;
  location: string;
  imageUrl: string;
  coordinates: { lat: number; lng: number }[][];
  center: { lat: number; lng: number };
}

interface MapDrawerProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedPropertyId?: string;
  container?: HTMLElement | null;
  onPropertyDeselect?: () => void;
  onDepartmentSelect?: (propertyId: string, departmentId: number) => void;
  selectedDepartmentIdProp?: number | null;
  onDepartmentDeselect?: () => void;
  onDepartmentHover?: (departmentId: number | null) => void;
  notes?: Note[];
  onNoteClick?: (note: Note) => void;
  onNoteHover?: (noteId: string | null) => void;
  onStartAddNote?: () => void;
  onEditNoteStart?: (note: Note) => void;
  onShareNote?: (note: Note) => void;
  onToggleResolved?: (note: Note) => void;
  showResolvedNotes?: boolean;
  onShowResolvedNotesChange?: (show: boolean) => void;
  onSaveNote?: (note: Partial<Note>) => void;
  onCancelNote?: () => void;
  onDeleteNote?: (id: string) => void;
  editingNote?: Note | null;
  isAddingNote?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  noteType?: 'point' | 'area';
  onNoteTypeChange?: (type: 'point' | 'area') => void;
  onEditingNoteColorChange?: (color: string) => void;
  showFilterMenu?: boolean;
  mapType?: 'roadmap' | 'satellite' | 'terrain';
  showNoteMarkers?: boolean;
  showDepartmentLabels?: boolean;
  showPropertyBorders?: boolean;
  showDepartmentBoundaries?: boolean;
  autoZoomToDepartment?: boolean;
  onMapTypeChange?: (type: 'roadmap' | 'satellite' | 'terrain') => void;
  onShowNoteMarkersChange?: (show: boolean) => void;
  onShowDepartmentLabelsChange?: (show: boolean) => void;
  onShowPropertyBordersChange?: (show: boolean) => void;
  onShowDepartmentBoundariesChange?: (show: boolean) => void;
  onAutoZoomToDepartmentChange?: (zoom: boolean) => void;
  onCloseFilterMenu?: () => void;
  onDrawerOpenChange?: (isOpen: boolean) => void;
  onHighlightDepartments?: (departmentIds: number[]) => void;
  departmentLabelMap?: Map<number, string>;
}

type MenuView = "properties" | "propertyInfo" | "propertyDetails" | "departmentsList" | "departmentDetails" | "notes" | "noteForm" | "filters";

export function MapDrawer({ properties, onPropertySelect, selectedPropertyId, container, onPropertyDeselect, onDepartmentSelect, selectedDepartmentIdProp, onDepartmentDeselect, onDepartmentHover, notes, onNoteClick, onNoteHover, onStartAddNote, onEditNoteStart, onShareNote, onToggleResolved, showResolvedNotes, onShowResolvedNotesChange, onSaveNote, onEditingNoteColorChange, onCancelNote, onDeleteNote, editingNote, isAddingNote, isSaving, isDeleting, showFilterMenu, mapType, showNoteMarkers, showDepartmentLabels, showPropertyBorders, showDepartmentBoundaries, autoZoomToDepartment, onMapTypeChange, onShowNoteMarkersChange, onShowDepartmentLabelsChange, onShowPropertyBordersChange, onShowDepartmentBoundariesChange, onAutoZoomToDepartmentChange, onCloseFilterMenu, onDrawerOpenChange, noteType, onNoteTypeChange, onHighlightDepartments, departmentLabelMap }: MapDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentView, setCurrentView] = useState<MenuView>("properties");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [selectedDepartmentLabel, setSelectedDepartmentLabel] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<MenuView | null>(null); // Track where we came from
  const [huggningsklasserUnit, setHuggningsklasserUnit] = useState<'ha' | 'm3sk'>('ha');
  const [tradslagUnit, setTradslagUnit] = useState<'percent' | 'ha' | 'm3sk'>('percent');
  // Mock data for åldersfördelning (percentage)
  const aldersData: Record<string, number> = {
    '1-10': 6,
    '11-20': 4,
    '21-30': 7,
    '31-40': 8,
    '41-50': 10,
    '51-60': 14,
    '61-70': 17,
    '71-80': 13,
    '81-90': 9,
    '91-100': 7,
    '100+': 5,
  };

  const aldersIntervals = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100', '100+'];
  const maxAldersPct = Math.max(...Object.values(aldersData));

  // Helper: switch to a different property
  const handleSwitchProperty = (property: Property) => {
    setSelectedProperty(property);
    setSelectedDepartmentId(null);
    setCurrentView("propertyInfo");
    onPropertySelect(property);
  };

  // Mock data for huggningsklasser
  const huggningsklasserData = {
    K1: { ha: 2.7, m3sk: 45 },
    K2: { ha: 4.5, m3sk: 78 },
    R1: { ha: 7.1, m3sk: 142 },
    R2: { ha: 5.4, m3sk: 98 },
    G1: { ha: 10.7, m3sk: 267 },
    G2: { ha: 13.4, m3sk: 356 },
    S1: { ha: 16.1, m3sk: 425 },
    S2: { ha: 12.5, m3sk: 312 },
    S3: { ha: 8.9, m3sk: 198 },
    E1: { ha: 6.3, m3sk: 134 },
    E2: { ha: 5.4, m3sk: 89 },
    E3: { ha: 5.4, m3sk: 76 },
  };

  // Mock data for trädslagsfördelning
  const tradslagData = {
    Tall: { ha: 45.2, m3sk: 1125 },
    Gran: { ha: 35.8, m3sk: 892 },
    Löv: { ha: 8.3, m3sk: 203 },
  };

  const totalHa = Object.values(huggningsklasserData).reduce((sum, val) => sum + val.ha, 0);
  const totalM3sk = Object.values(huggningsklasserData).reduce((sum, val) => sum + val.m3sk, 0);

  const totalTradslagHa = Object.values(tradslagData).reduce((sum, val) => sum + val.ha, 0);
  const totalTradslagM3sk = Object.values(tradslagData).reduce((sum, val) => sum + val.m3sk, 0);

  // Find max values for bar chart scaling
  const maxHa = Math.max(...Object.values(huggningsklasserData).map(v => v.ha));
  const maxM3sk = Math.max(...Object.values(huggningsklasserData).map(v => v.m3sk));

  // Find max values for trädslag bar chart scaling (relative to largest)
  const maxTradslagPct = Math.max(...Object.keys(tradslagData).map(k => Math.round((tradslagData[k as keyof typeof tradslagData].ha / totalTradslagHa) * 100)));
  const maxTradslagHa = Math.max(...Object.values(tradslagData).map(v => v.ha));
  const maxTradslagM3sk = Math.max(...Object.values(tradslagData).map(v => v.m3sk));

  // Calculate bar width based on max value (for proper bar chart visualization)
  const calculateBarWidth = (classKey: keyof typeof huggningsklasserData) => {
    if (huggningsklasserUnit === 'ha') {
      return Math.round((huggningsklasserData[classKey].ha / maxHa) * 100);
    } else {
      return Math.round((huggningsklasserData[classKey].m3sk / maxM3sk) * 100);
    }
  };

  const calculatePercentage = (classKey: keyof typeof huggningsklasserData) => {
    if (huggningsklasserUnit === 'ha') {
      return Math.round((huggningsklasserData[classKey].ha / totalHa) * 100);
    } else {
      return Math.round((huggningsklasserData[classKey].m3sk / totalM3sk) * 100);
    }
  };

  const calculateTradslagPercentage = (tradslagKey: keyof typeof tradslagData) => {
    if (huggningsklasserUnit === 'ha') {
      return Math.round((tradslagData[tradslagKey].ha / totalTradslagHa) * 100);
    } else {
      return Math.round((tradslagData[tradslagKey].m3sk / totalTradslagM3sk) * 100);
    }
  };

  // Calculate trädslag bar width relative to the largest value (largest = 100%)
  const calculateTradslagBarWidth = (tradslagKey: keyof typeof tradslagData) => {
    if (tradslagUnit === 'percent') {
      const pct = Math.round((tradslagData[tradslagKey].ha / totalTradslagHa) * 100);
      return Math.round((pct / maxTradslagPct) * 100);
    } else if (tradslagUnit === 'ha') {
      return Math.round((tradslagData[tradslagKey].ha / maxTradslagHa) * 100);
    } else {
      return Math.round((tradslagData[tradslagKey].m3sk / maxTradslagM3sk) * 100);
    }
  };

  const formatValue = (classKey: keyof typeof huggningsklasserData) => {
    if (huggningsklasserUnit === 'ha') {
      return `${huggningsklasserData[classKey].ha.toFixed(1)} ha`;
    } else {
      return `${huggningsklasserData[classKey].m3sk} m³sk`;
    }
  };

  const formatTradslagValue = (tradslagKey: keyof typeof tradslagData) => {
    if (tradslagUnit === 'percent') {
      return `${calculateTradslagPercentage(tradslagKey)}%`;
    } else if (tradslagUnit === 'ha') {
      return `${tradslagData[tradslagKey].ha.toFixed(1)} ha`;
    } else {
      return `${tradslagData[tradslagKey].m3sk} m³sk`;
    }
  };

  const getNextTradslagUnit = () => {
    if (tradslagUnit === 'percent') return 'ha';
    if (tradslagUnit === 'ha') return 'm3sk';
    return 'percent';
  };

  const getTradslagUnitLabel = () => {
    if (tradslagUnit === 'percent') return '%';
    if (tradslagUnit === 'ha') return 'ha';
    return 'm³sk';
  };

  // Count notes for selected property
  const getPropertyNotesCount = () => {
    if (!selectedProperty || !notes) return 0;
    // All notes in the notes array already belong to the selected property
    // (loaded via notesApi.getNotes(selectedProperty.id))
    return notes.filter(note => note != null && note.id).length;
  };

  const formatNotesCount = (count: number) => {
    if (count === 0) return 'Inga anteckningar';
    return `${count} anteckningar`;
  };

  useEffect(() => {
    if (isAddingNote || editingNote) {
      setCurrentView("noteForm");
      setIsOpen(true);
    } else if (currentView === "noteForm") {
      setCurrentView("notes");
    }
  }, [isAddingNote, editingNote]);

  // Open drawer and show filters when filter button is clicked
  useEffect(() => {
    if (showFilterMenu) {
      setCurrentView("filters");
      setIsOpen(true);
    } else if (currentView === "filters") {
      setCurrentView("properties");
    }
  }, [showFilterMenu]);

  // Notify parent when drawer state changes
  useEffect(() => {
    onDrawerOpenChange?.(isOpen);
  }, [isOpen, onDrawerOpenChange]);

  // Open drawer and set view when a property is selected from the map
  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find(p => p.id === selectedPropertyId);
      if (property) {
        setSelectedProperty(property);
        // Only change view if not in filters - keep filter menu open
        if (currentView !== "filters") {
          setCurrentView("propertyInfo");
        }
        setIsOpen(true);
      }
    } else {
      // Reset when deselected (e.g. map "Tillbaka" button clears selectedPropertyId via parent)
      setSelectedProperty(null);
      setSelectedDepartmentId(null);
      // Go back to properties list if we're in a property-specific view
      setCurrentView(prev => prev === "filters" ? prev : "properties");
    }
  }, [selectedPropertyId, properties]);

  const handleDepartmentClick = (departmentId: number, displayLabel?: string) => {
    if (selectedProperty) {
      setSelectedDepartmentId(departmentId);
      setSelectedDepartmentLabel(displayLabel || null);
      setPreviousView(currentView); // Save where we came from
      setCurrentView("departmentDetails");
      onDepartmentSelect?.(selectedProperty.id, departmentId);
      onHighlightDepartments?.([departmentId]);
    }
  };

  const handlePropertyClose = () => {
    // X-knappen stänger hela fastigheten och går tillbaka till properties-listan
    setCurrentView("properties");
    setSelectedProperty(null);
    setSelectedDepartmentId(null);
    onPropertyDeselect?.();
    onHighlightDepartments?.([]);
  };

  // Effect to handle department selection from map click
  useEffect(() => {
    // When a department is selected from the map (via prop), open drawer and navigate to department details
    if (selectedDepartmentIdProp !== null && selectedDepartmentIdProp !== undefined) {
      setSelectedDepartmentId(selectedDepartmentIdProp);
      // Only change view if not in filters - keep filter menu open
      if (currentView !== "filters") {
        setCurrentView("departmentDetails");
      }
      setIsOpen(true); // Ensure drawer is open
      onHighlightDepartments?.([selectedDepartmentIdProp]);
    }
  }, [selectedDepartmentIdProp]);

  // Header Content Logic
  let headerTitle = "";
  let headerSubtitle = "";

  if (currentView === "departmentDetails" && selectedDepartmentId) {
    headerTitle = selectedDepartmentLabel || `Avdelning ${selectedDepartmentId}`;
    headerSubtitle = selectedProperty?.name || "";
  } else if (currentView === "departmentsList") {
    headerTitle = "Avdelningar";
    headerSubtitle = selectedProperty?.name || "";
  } else if (currentView === "propertyDetails") {
    headerTitle = "Åtgärder";
    headerSubtitle = selectedProperty?.name || "";
  } else if (currentView === "notes") {
    headerTitle = "Anteckningar";
    headerSubtitle = selectedProperty?.name || "";
  } else if (currentView === "noteForm") {
    headerTitle = isAddingNote ? "Ny anteckning" : "Redigera anteckning";
    headerSubtitle = selectedProperty?.name || "";
  } else if (currentView === "filters") {
    headerTitle = "Filtrera karta";
  } else if (selectedProperty) {
    headerTitle = selectedProperty.name;
    headerSubtitle = selectedProperty.location;
  } else if (currentView === "properties") {
    headerTitle = "Fastigheter";
  }

  // Whether to show property switcher (only on propertyInfo view)
  const showPropertySwitcher = currentView === "propertyInfo" && selectedProperty;

  return (
    <>
      {/* Menu Button - Follows the drawer */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`hidden md:flex absolute top-6 z-[91] bg-white rounded-[8px] shadow-lg size-[40px] items-center justify-center hover:bg-gray-50 transition-all duration-300 pointer-events-auto ${
          isOpen ? 'right-[368px]' : 'right-6'
        }`}
        style={{ border: "1px solid #e4e4e4" }}
      >
        <div className="relative shrink-0 size-[24px]">
          {isOpen ? (
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          ) : (
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <rect x="4" y="6" width="16" height="2" rx="1" fill="black" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="black" />
                <rect x="4" y="16" width="16" height="2" rx="1" fill="black" />
              </g>
            </svg>
          )}
        </div>
      </button>

      {/* Drawer */}
      <Sheet open={isOpen} onOpenChange={(open) => {
        // Only allow manual closing via buttons, not by clicking outside
        if (!open) {
          return; // Prevent closing via overlay click
        }
        setIsOpen(open);
        onDrawerOpenChange?.(open);
      }} modal={false}>
        <SheetContent side="right" className="hidden md:flex flex-col gap-0 w-[360px] p-0 rounded-none border-l border-[#e4e4e4] overflow-x-hidden" container={container}>
          <SheetTitle className="sr-only">{headerTitle}</SheetTitle>
          <SheetDescription className="sr-only">
            {headerSubtitle || "Navigera i skogsbruksplanen"}
          </SheetDescription>

          {/* Header Area */}
          <div className="relative shrink-0 bg-white">
            {/* Title and Close Button Row */}
            <div className="flex items-start justify-between px-5 py-4">
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                {showPropertySwitcher ? (
                  <PropertySwitcher
                    properties={properties}
                    selectedProperty={selectedProperty}
                    onSwitch={handleSwitchProperty}
                  />
                ) : (
                  <h2 className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {headerTitle}
                  </h2>
                )}
                {headerSubtitle && (
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {headerSubtitle}
                  </p>
                )}
              </div>
              {!showPropertySwitcher && currentView !== "properties" && (
                <button
                  onClick={() => {
                    if (currentView === "departmentDetails") {
                      // Go back to where we came from
                      const targetView = previousView === "propertyDetails" || previousView === "departmentsList" 
                        ? previousView 
                        : "departmentsList"; // Default to departmentsList if previousView is not set
                      setCurrentView(targetView);
                      setSelectedDepartmentId(null);
                      setPreviousView(null); // Clear previousView
                      onDepartmentDeselect?.();
                      onHighlightDepartments?.([]);
                    } else if (currentView === "noteForm") {
                      onCancelNote?.();
                    } else if (currentView === "propertyDetails" || currentView === "notes" || currentView === "departmentsList") {
                      setCurrentView("propertyInfo");
                    } else if (currentView === "propertyInfo") {
                      handlePropertyClose();
                    } else if (currentView === "properties") {
                      // Close drawer when backing out from properties list
                      setIsOpen(false);
                    } else if (currentView === "filters") {
                      // When closing filters, go back to propertyInfo if property is selected, otherwise properties list
                      setCurrentView(selectedProperty ? "propertyInfo" : "properties");
                      onCloseFilterMenu?.();
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className="p-2 -mr-2 -mt-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="size-6 text-gray-500" />
                </button>
              )}
            </div>
            
            {/* Separator */}
            <div className="h-px bg-[#e4e4e4] w-full" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
          {currentView === "noteForm" ? (
            <NoteForm
              note={editingNote || undefined}
              departments={selectedProperty?.coordinates.map((_, i) => `Avd ${i + 1}.`) || []}
              onSave={(n) => onSaveNote?.(n)}
              onCancel={() => onCancelNote?.()}
              onDelete={onDeleteNote}
              isNew={isAddingNote}
              isSaving={isSaving}
              isDeleting={isDeleting}
              noteType={noteType}
              onNoteTypeChange={onNoteTypeChange}
              onColorChange={onEditingNoteColorChange}
            />
          ) : currentView === "notes" && selectedProperty ? (
            <NotesView
              propertyName={selectedProperty.name}
              propertyLocation={selectedProperty.location}
              propertyImage={selectedProperty.imageUrl}
              onClose={handlePropertyClose}
              onBack={() => setCurrentView("propertyInfo")}
              hideHeader={true}
              notes={notes}
              onNoteClick={onNoteClick}
              onNoteHover={onNoteHover}
              onAddNote={onStartAddNote}
              onEditNote={onEditNoteStart}
              onShareNote={onShareNote}
              onDeleteNote={(note) => onDeleteNote?.(note.id)}
              onToggleResolved={onToggleResolved}
              showResolvedNotes={showResolvedNotes}
              onShowResolvedNotesChange={onShowResolvedNotesChange}
              onStartMeasure={() => {
                // Open measure mode selector
                // We'll implement this next
                console.log("Start measure mode");
              }}
            />
          ) : currentView === "departmentDetails" && selectedProperty && selectedDepartmentId ? (
            <DepartmentDetailsView
              propertyId={selectedProperty.id}
              propertyName={selectedProperty.name}
              propertyLocation={selectedProperty.location}
              departmentId={selectedDepartmentId}
              propertyImage={
                selectedProperty.coordinates[selectedDepartmentId - 1] 
                  ? generateDepartmentSnapshot(selectedProperty.coordinates[selectedDepartmentId - 1], 160, 160, 15, true)
                  : selectedProperty.imageUrl
              }
              onClose={handlePropertyClose}
              onBack={() => {
                setSelectedDepartmentId(null);
                setCurrentView("departmentsList");
              }}
              actions={mockForestActions}
              departmentCoords={selectedProperty.coordinates[selectedDepartmentId - 1]}
              hideHeader={true}
            />
          ) : currentView === "departmentsList" && selectedProperty ? (
            <DepartmentsListView
              propertyId={selectedProperty.id}
              propertyName={selectedProperty.name}
              propertyCoordinates={selectedProperty.coordinates}
              onDepartmentClick={handleDepartmentClick}
              onDepartmentHover={onDepartmentHover}
              actions={mockForestActions}
              onHighlightDepartments={onHighlightDepartments}
              hideHeader={true}
            />
          ) : currentView === "propertyDetails" && selectedProperty ? (
            <PropertyDetailsView
              propertyName={selectedProperty.name}
              propertyLocation={selectedProperty.location}
              propertyImage={selectedProperty.imageUrl}
              onClose={handlePropertyClose}
              onBack={() => setCurrentView("propertyInfo")}
              onDepartmentClick={handleDepartmentClick}
              onDepartmentHover={onDepartmentHover}
              onHighlightDepartments={onHighlightDepartments}
              hideHeader={true}
              departmentLabelMap={departmentLabelMap}
            />
          ) : currentView === "propertyInfo" && selectedProperty ? (
            // Property Info View - Shows property details with navigation to Skogsbruksplan/Anteckningar
            <div className="bg-white content-stretch flex flex-col items-start relative size-full">
              {/* Removed PropertyHeader, content starts directly */}

              {/* Navigation buttons */}
              <div className="w-full">
                {/* Only show Skogsbruksplan button for LEMESJÖ */}
                {selectedProperty.id === "1" ? (
                  <button
                    onClick={() => setCurrentView("propertyDetails")}
                    className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                          <BookOpenCheck className="size-5" stroke="#32412A" strokeWidth={2} fill="none" />
                        </div>
                        <div className="text-left">
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-black">
                            Åtgärder
                          </p>
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">
                            Enligt skogsbruksplan
                          </p>
                        </div>
                      </div>
                      <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24">
                        <path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <div className="w-full border-b border-[#e4e4e4] bg-gray-50">
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#e4e4e4] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                          <BookOpenCheck className="size-5" stroke="#999999" strokeWidth={2} fill="none" />
                        </div>
                        <div className="text-left">
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-black opacity-60">
                            Åtgärder
                          </p>
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-50">
                            Skogsbruksplan saknas
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Avdelningar button */}
                <button
                  onClick={() => setCurrentView("departmentsList")}
                  className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                        <Pentagon className="size-5" stroke="#1E3856" strokeWidth={2} fill="none" />
                      </div>
                      <div className="text-left">
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-black">
                          Avdelningar
                        </p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">
                          {selectedProperty.coordinates.length} avdelningar
                        </p>
                      </div>
                    </div>
                    <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24">
                      <path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentView("notes")}
                  className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                        <FileText className="size-5" stroke="#1E3856" strokeWidth={2} fill="none" />
                      </div>
                      <div className="text-left">
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-black">
                          Anteckningar
                        </p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">
                          {formatNotesCount(getPropertyNotesCount())}
                        </p>
                      </div>
                    </div>
                    <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24">
                      <path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Din lokala virkesköpare */}
              <CollapsibleSection title="Din lokala virkesköpare">
                <div className="w-full border-b border-[#e4e4e4]">
                  <ContactCard
                    name="Daniel Larsson"
                    role="Virkesköpare Hudiksvall / Ljusdal"
                    phone="123 456 78 90"
                    email="daniel.larsson@holmen.com"
                    image={image_9e613302068097aa58a90d360320b38f2a46f3c7}
                    variant="menu"
                  />
                </div>
              </CollapsibleSection>

              {/* Skogsbruksplan saknas - ActionCard for properties without plan */}
              {selectedProperty.id !== "1" && (
                <div className="w-full border-b border-[#e4e4e4]">
                  <ActionCard
                    icon={
                      <BookOpenCheck className="size-5" stroke="#663336" strokeWidth={2} />
                    }
                    iconBackgroundColor="#fad2af"
                    title="Skogsbruksplan saknas"
                    titleSize="text-[16px]"
                    borderless
                    tooltipText="En skogsbruksplan ger dig en strukturerad översikt över din skog och hjälper dig att fatta välgrundade beslut om framtida åtgärder."
                    description={
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <span>{`Din fastighet `}</span>
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {selectedProperty.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')}
                        </span>
                        <span>{` saknar en skogsbruksplan. En skogsbruksplan ger dig full överblick över din skog och visar hur du kan omsätta dina mål i lönsamma och välplanerade åtgärder.`}</span>
                      </p>
                    }
                    buttons={[
                      {
                        label: 'Beställ skogsbruksplan',
                        variant: 'primary',
                        onClick: () => {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: 'services' }));
                          setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('openService', { detail: 'skogsbruksplan' }));
                          }, 100);
                        }
                      }
                    ]}
                  />
                </div>
              )}

              {/* Grunddata section */}
              {(() => {
                const hasPlan = selectedProperty.id === "1";
                return (
                  <CollapsibleSection title="Grunddata">
                    <div className="w-full bg-white">
                      {hasPlan && (
                        <div className="mx-5 mt-3 mb-3 flex items-start gap-2 rounded-[6px] bg-[#e4f5f5] px-3 py-2.5">
                          <svg className="shrink-0 mt-[1px]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e3856" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          <div>
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#1e3856] leading-snug">
                              Data hämtad från skogsbruksplanen
                            </p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[11px] text-[#1e3856] opacity-70 mt-0.5">
                              Senast uppdaterad: 12 mars 2023
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between p-4 border-t border-b border-[#e4e4e4]">
                        <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Totalareal</p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-black">{selectedProperty.area.toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ha</p>
                      </div>
                      {hasPlan ? (
                        <>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Totalt virkesförråd</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-black">1 423 m³sk</p>
                          </div>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Virkesförråd per HA</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-black">{Math.round(1423 / selectedProperty.area)} m³sk/ha</p>
                          </div>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Genomsnittlig tillväxt</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-black">875 m³sk/år</p>
                          </div>
                        </>
                      ) : (
                        <NoPlanTooltip>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Totalt virkesförråd</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                          </div>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Virkesförråd per HA</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                          </div>
                          <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Genomsnittlig tillväxt</p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                          </div>
                        </NoPlanTooltip>
                      )}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Ägoslag section */}
              {(() => {
                const hasPlan = selectedProperty.id === "1";
                const agoslagRows = [
                  { label: 'Skogsmark produktiv', value: '80%' },
                  { label: 'Skogsmark improduktiv', value: '15%' },
                  { label: 'Inäga/Åker', value: '2%' },
                  { label: 'Vatten', value: '2%' },
                  { label: 'Berg', value: '1%' },
                ];
                const content = (
                  <CollapsibleSection title="Ägoslag" dimmed={!hasPlan}>
                    <div className="w-full bg-white">
                      {agoslagRows.map((row) => (
                        <div key={row.label} className="flex justify-between p-4 border-b border-[#e4e4e4]">
                          <p className={`font-['IBM_Plex_Sans',sans-serif] text-[14px] ${hasPlan ? 'text-black' : 'text-[#b0b0b0]'}`}>{row.label}</p>
                          <p className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] ${hasPlan ? 'text-black' : 'text-[#b0b0b0]'}`}>{hasPlan ? row.value : '–'}</p>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                );
                return hasPlan ? content : <NoPlanTooltip>{content}</NoPlanTooltip>;
              })()}

              {/* Huggningsklasser section */}
              {(() => {
                const hasPlan = selectedProperty.id === "1";
                const huggningsklasserBarData = [
                  { key: 'K1' as const, color: HUGGNINGSKLASSER_COLORS['K1'] },
                  { key: 'K2' as const, color: HUGGNINGSKLASSER_COLORS['K2'] },
                  { key: 'R1' as const, color: HUGGNINGSKLASSER_COLORS['R1'] },
                  { key: 'R2' as const, color: HUGGNINGSKLASSER_COLORS['R2'] },
                  { key: 'G1' as const, color: HUGGNINGSKLASSER_COLORS['G1'] },
                  { key: 'G2' as const, color: HUGGNINGSKLASSER_COLORS['G2'] },
                  { key: 'S1' as const, color: HUGGNINGSKLASSER_COLORS['S1'] },
                  { key: 'S2' as const, color: HUGGNINGSKLASSER_COLORS['S2'] },
                  { key: 'S3' as const, color: HUGGNINGSKLASSER_COLORS['S3'] },
                  { key: 'E1' as const, color: HUGGNINGSKLASSER_COLORS['E1'] },
                  { key: 'E2' as const, color: HUGGNINGSKLASSER_COLORS['E2'] },
                  { key: 'E3' as const, color: HUGGNINGSKLASSER_COLORS['E3'] },
                ];
                // Placeholder widths for no-plan state (visual indication of "structure")
                const placeholderWidths = [12, 20, 30, 24, 45, 58, 70, 55, 38, 28, 24, 24];
                const content = (
                  <CollapsibleSection
                    title="Huggningsklasser"
                    dimmed={!hasPlan}
                    titleExtra={hasPlan ? <HuggningsklassInfoIcon /> : undefined}
                  >
                    <div className="w-full bg-white pb-4">
                      {hasPlan && (
                        <div className="flex justify-end px-5 pt-3 pb-1">
                          <button
                            onClick={() => setHuggningsklasserUnit(huggningsklasserUnit === 'ha' ? 'm3sk' : 'ha')}
                            className="flex items-center gap-1 bg-white border border-[#e4e4e4] rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[11px] text-gray-700">
                              {huggningsklasserUnit === 'ha' ? 'ha' : 'm³sk'}
                            </span>
                            <svg className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="px-5 pt-2 space-y-2">
                        {huggningsklasserBarData.map((bar, i) => (
                          <div key={bar.key} className="flex items-center gap-1">
                            <span className={`font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] w-8 shrink-0 ${hasPlan ? 'text-black' : 'text-[#b0b0b0]'}`}>{bar.key}</span>
                            <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                              <div
                                className="h-full rounded-r transition-all duration-300"
                                style={{
                                  width: hasPlan ? `${calculateBarWidth(bar.key)}%` : `${placeholderWidths[i]}%`,
                                  backgroundColor: hasPlan ? bar.color : '#e0e0e0',
                                }}
                              ></div>
                            </div>
                            <span className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] w-[60px] text-right shrink-0 ${hasPlan ? 'text-black' : 'text-[#b0b0b0]'}`}>
                              {hasPlan ? formatValue(bar.key) : '–'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleSection>
                );
                return hasPlan ? content : <NoPlanTooltip>{content}</NoPlanTooltip>;
              })()}

              {/* Trädslagsfördelning section - only show for LEMESJÖ (id === "1") */}
              {selectedProperty.id === "1" && (
                <CollapsibleSection title="Trädslagsfördelning" borderTop>
                  <div className="w-full bg-white pb-4">
                    <div className="flex justify-end px-5 pt-3 pb-1">
                      <button
                        onClick={() => setTradslagUnit(getNextTradslagUnit())}
                        className="flex items-center gap-1 bg-white border border-[#e4e4e4] rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[11px] text-gray-700">
                          {getTradslagUnitLabel()}
                        </span>
                        <svg className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </button>
                    </div>
                    <div className="px-5 pt-2 space-y-2">
                      {/* Tall */}
                      <div className="flex items-center gap-1">
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Tall</span>
                        <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                          <div className="bg-[#cc8c52] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Tall')}%` }}></div>
                        </div>
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Tall')}</span>
                      </div>
                      {/* Gran */}
                      <div className="flex items-center gap-1">
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Gran</span>
                        <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                          <div className="bg-[#32412a] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Gran')}%` }}></div>
                        </div>
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Gran')}</span>
                      </div>
                      {/* Löv */}
                      <div className="flex items-center gap-1">
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Löv</span>
                        <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                          <div className="bg-[#c4d987] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Löv')}%` }}></div>
                        </div>
                        <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Löv')}</span>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              )}

              {/* Åldersfördelning section - only show for LEMESJÖ (id === "1") */}
              {selectedProperty.id === "1" && (
                <CollapsibleSection title="Åldersfördelning" borderTop>
                  <div className="w-full bg-white pb-4">
                    <div className="px-5 pt-4 space-y-2">
                      {aldersIntervals.map((interval) => (
                        <div key={interval} className="flex items-center gap-1">
                          <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-[42px] shrink-0">{interval}</span>
                          <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                            <div className="bg-[#1e3856] h-full rounded-r transition-all duration-300" style={{ width: `${Math.round((aldersData[interval] / maxAldersPct) * 100)}%` }}></div>
                          </div>
                          <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-black w-[40px] text-right shrink-0">{aldersData[interval]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>
              )}
            </div>
          ) : currentView === "filters" ? (
            <div className="p-4 space-y-6">
              {/* Kartlager section */}
              <div>
                <h3 className="flex items-center gap-2 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-black mb-3">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Kartlager
                </h3>
                <div className="space-y-3">
                  {/* Fastighetsgränser toggle */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors">
                      Fastighetsgränser
                    </span>
                    <div 
                      onClick={() => onShowPropertyBordersChange?.(!showPropertyBorders)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${showPropertyBorders ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showPropertyBorders ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                  
                  {/* Avdelningar toggle */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors">
                      Avdelningar
                    </span>
                    <div 
                      onClick={() => onShowDepartmentBoundariesChange?.(!showDepartmentBoundaries)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${showDepartmentBoundaries ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showDepartmentBoundaries ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>

                  {/* Avdelningsnummer toggle */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors">
                      Avdelningsnummer
                    </span>
                    <div 
                      onClick={() => onShowDepartmentLabelsChange?.(!showDepartmentLabels)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${showDepartmentLabels ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showDepartmentLabels ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>

                  {/* Anteckningar toggle */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors">
                      Anteckningar
                    </span>
                    <div 
                      onClick={() => onShowNoteMarkersChange?.(!showNoteMarkers)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${showNoteMarkers ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${showNoteMarkers ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Karttyp section */}
              <div>
                <h3 className="flex items-center gap-2 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-black mb-3">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Karttyp
                </h3>
                <div className="space-y-2">
                  <label 
                    onClick={() => onMapTypeChange?.('satellite')}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mapType === 'satellite' ? 'border-[#1e3856]' : 'border-gray-300'}`}>
                      {mapType === 'satellite' && <div className="w-3 h-3 rounded-full bg-[#1e3856]"></div>}
                    </div>
                    <span className="text-[14px] text-gray-700">Satellit</span>
                  </label>
                  <label 
                    onClick={() => onMapTypeChange?.('roadmap')}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mapType === 'roadmap' ? 'border-[#1e3856]' : 'border-gray-300'}`}>
                      {mapType === 'roadmap' && <div className="w-3 h-3 rounded-full bg-[#1e3856]"></div>}
                    </div>
                    <span className="text-[14px] text-gray-700">Vägkarta</span>
                  </label>
                  <label 
                    onClick={() => onMapTypeChange?.('terrain')}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mapType === 'terrain' ? 'border-[#1e3856]' : 'border-gray-300'}`}>
                      {mapType === 'terrain' && <div className="w-3 h-3 rounded-full bg-[#1e3856]"></div>}
                    </div>
                    <span className="text-[14px] text-gray-700">Terräng</span>
                  </label>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Kartkontroller section */}
              <div>
                <h3 className="flex items-center gap-2 font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-black mb-3">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Kartkontroller
                </h3>
                <div className="space-y-3">
                  {/* Auto-zoom till avdelning toggle */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex flex-col">
                      <span className="text-[14px] text-gray-700 group-hover:text-black transition-colors">
                        Flytta till avdelning
                      </span>
                      <span className="text-[12px] text-gray-500">
                        Zoomar kartan när du väljer avdelning
                      </span>
                    </div>
                    <div 
                      onClick={() => onAutoZoomToDepartmentChange?.(!autoZoomToDepartment)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${autoZoomToDepartment ? 'bg-[#1e3856]' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoZoomToDepartment ? 'translate-x-6' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ) : currentView === "properties" && (
            <>
              {/* Properties Submenu */}
              <div className="bg-[#f7f7f7] size-full flex flex-col">
                {/* Properties List */}
                <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-[#e4e4e4] border-b border-[#e4e4e4]">
                  {properties.map((property, index) => (
                    <button
                      key={property.id}
                      onClick={() => {
                        onPropertySelect(property);
                        setSelectedProperty(property);
                        setCurrentView("propertyInfo");
                      }}
                      className="relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
                          {/* Text */}
                          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre text-left">
                              {property.name.toUpperCase()}
                            </p>
                            <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
                              <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre">
                                {property.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}