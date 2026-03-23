import { X, Pentagon, FileText, LandPlot, BookOpenCheck } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { PropertyDetailsView, mockForestActions } from "./PropertyDetailsView";
import { DepartmentDetailsView } from "./DepartmentDetailsView";
import { DepartmentsListView } from "./DepartmentsListView";
import { NotesView, Note } from "./NotesView";
import { NoteForm } from "./NoteForm";
import svgPaths from "../imports/svg-yzncxbvcbd";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PropertyHeader } from "./PropertyHeader";
import { generateDepartmentSnapshot } from "../utils/mapSnapshots";
import ContactCard from "./ContactCard";
import { ActionCard } from "./ActionCard";
import { PropertySwitcher } from "./PropertySwitcher";
import { HuggningsklassInfoIcon, HUGGNINGSKLASSER_COLORS } from "./HuggningsklassTooltip";
import { NoPlanTooltip } from "./NoPlanTooltip";
import { CollapsibleSection } from "./CollapsibleSection";
import image_9e613302068097aa58a90d360320b38f2a46f3c7 from 'figma:asset/9e613302068097aa58a90d360320b38f2a46f3c7.png';

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

interface MobileBottomDrawerProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  selectedPropertyId?: string;
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
  onSaveNote?: (note: Partial<Note>) => void;
  onCancelNote?: () => void;
  onDeleteNote?: (id: string) => void;
  editingNote?: Note | null;
  isAddingNote?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  onDrawerHeightChange?: (height: number) => void;
  onDrawerOpenChange?: (isOpen: boolean) => void;
  noteType?: 'point' | 'area';
  onNoteTypeChange?: (type: 'point' | 'area') => void;
  onHighlightDepartments?: (departmentIds: number[]) => void;
  departmentLabelMap?: Map<number, string>;
}

type MenuView = "properties" | "propertyInfo" | "propertyDetails" | "departmentDetails" | "notes" | "noteForm" | "departmentsList";

const DRAWER_STATES = {
  CLOSED: 0,
  PEEK: 70, // Show only header (in pixels)
  HALF: 0.4,
  FULL: 0.85,
};

export function MobileBottomDrawer({ 
  properties, 
  onPropertySelect, 
  selectedPropertyId, 
  onPropertyDeselect, 
  onDepartmentSelect, 
  selectedDepartmentIdProp, 
  onDepartmentDeselect,
  onDepartmentHover,
  notes,
  onNoteClick,
  onNoteHover,
  onStartAddNote,
  onEditNoteStart,
  onShareNote,
  onSaveNote,
  onCancelNote,
  onDeleteNote,
  editingNote,
  isAddingNote,
  isSaving,
  isDeleting,
  onDrawerHeightChange,
  onDrawerOpenChange,
  noteType,
  onNoteTypeChange,
  onHighlightDepartments,
  departmentLabelMap
}: MobileBottomDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<MenuView>("properties");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [selectedDepartmentLabel, setSelectedDepartmentLabel] = useState<string | null>(null);
  const [drawerHeight, setDrawerHeight] = useState(DRAWER_STATES.HALF);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const [huggningsklasserUnit, setHuggningsklasserUnit] = useState<'ha' | 'm3sk'>('ha');
  const [tradslagUnit, setTradslagUnit] = useState<'percent' | 'ha' | 'm3sk'>('percent');
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

  const totalHa = Object.values(huggningsklasserData).reduce((sum, val) => sum + val.ha, 0);
  const totalM3sk = Object.values(huggningsklasserData).reduce((sum, val) => sum + val.m3sk, 0);

  const totalTradslagHa = Object.values(tradslagData).reduce((sum, val) => sum + val.ha, 0);
  const totalTradslagM3sk = Object.values(tradslagData).reduce((sum, val) => sum + val.m3sk, 0);

  const maxHa = Math.max(...Object.values(huggningsklasserData).map(v => v.ha));
  const maxM3sk = Math.max(...Object.values(huggningsklasserData).map(v => v.m3sk));

  const maxTradslagPct = Math.max(...Object.keys(tradslagData).map(k => Math.round((tradslagData[k as keyof typeof tradslagData].ha / totalTradslagHa) * 100)));
  const maxTradslagHa = Math.max(...Object.values(tradslagData).map(v => v.ha));
  const maxTradslagM3sk = Math.max(...Object.values(tradslagData).map(v => v.m3sk));

  const calculateBarWidth = (classKey: keyof typeof huggningsklasserData) => {
    if (huggningsklasserUnit === 'ha') {
      return Math.round((huggningsklasserData[classKey].ha / maxHa) * 100);
    } else {
      return Math.round((huggningsklasserData[classKey].m3sk / maxM3sk) * 100);
    }
  };

  const formatValue = (classKey: keyof typeof huggningsklasserData) => {
    if (huggningsklasserUnit === 'ha') {
      return `${huggningsklasserData[classKey].ha.toFixed(1)} ha`;
    } else {
      return `${huggningsklasserData[classKey].m3sk} m³sk`;
    }
  };

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

  const calculateTradslagPercentage = (tradslagKey: keyof typeof tradslagData) => {
    return Math.round((tradslagData[tradslagKey].ha / totalTradslagHa) * 100);
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
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Effect to handle note editing/adding view switch
  useEffect(() => {
    if (isAddingNote || editingNote) {
      setCurrentView("noteForm");
      setIsOpen(true);
      if (drawerHeight < DRAWER_STATES.HALF) {
        setDrawerHeight(DRAWER_STATES.HALF);
      }
    } else if (currentView === "noteForm") {
      setCurrentView("notes");
    }
  }, [isAddingNote, editingNote]);

  // Open drawer and set view when a property is selected from the map
  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find(p => p.id === selectedPropertyId);
      if (property) {
        setSelectedProperty(property);
        setCurrentView("propertyInfo");
        setIsOpen(true);
        setDrawerHeight(DRAWER_STATES.HALF);
      }
    } else {
      // Reset when deselected (e.g. map "Tillbaka" button clears selectedPropertyId via parent)
      setSelectedProperty(null);
      setSelectedDepartmentId(null);
      // Go back to properties list if we're in a property-specific view
      setCurrentView(prev => prev === "filters" ? prev : "properties");
    }
  }, [selectedPropertyId, properties]);

  // Listen for map clicks to reopen drawer if closed
  useEffect(() => {
    const handleOpenDrawer = () => {
      if (!isOpen) {
        setIsOpen(true);
        setDrawerHeight(DRAWER_STATES.HALF);
        onDrawerOpenChange?.(true);
      }
    };

    const handleToggleDrawer = () => {
      if (isOpen) {
        setIsOpen(false);
        setDrawerHeight(DRAWER_STATES.CLOSED);
        onDrawerOpenChange?.(false);
      } else {
        setIsOpen(true);
        setDrawerHeight(DRAWER_STATES.HALF);
        onDrawerOpenChange?.(true);
        // Show correct view based on selection state
        if (selectedProperty) {
          setCurrentView("propertyInfo");
        } else {
          setCurrentView("properties");
        }
      }
    };

    const handleOpenWithFilters = () => {
      setIsOpen(true);
      setDrawerHeight(DRAWER_STATES.FULL);
      setCurrentView("properties");
      onDrawerOpenChange?.(true);
    };

    window.addEventListener('openMobileDrawer', handleOpenDrawer);
    window.addEventListener('toggleMobileDrawer', handleToggleDrawer);
    window.addEventListener('openMobileDrawerWithFilters', handleOpenWithFilters);
    return () => {
      window.removeEventListener('openMobileDrawer', handleOpenDrawer);
      window.removeEventListener('toggleMobileDrawer', handleToggleDrawer);
      window.removeEventListener('openMobileDrawerWithFilters', handleOpenWithFilters);
    };
  }, [isOpen, selectedProperty, onDrawerOpenChange]);

  const handleDepartmentClick = (departmentId: number, displayLabel?: string) => {
    if (selectedProperty) {
      setSelectedDepartmentId(departmentId);
      setSelectedDepartmentLabel(displayLabel || null);
      setCurrentView("departmentDetails");
      onDepartmentSelect?.(selectedProperty.id, departmentId);
      onHighlightDepartments?.([departmentId]);
    }
  };

  const handlePropertyClose = () => {
    setCurrentView("properties");
    setSelectedProperty(null);
    setSelectedDepartmentId(null);
    onPropertyDeselect?.();
  };

  // Helper: switch to a different property
  const handleSwitchProperty = (property: Property) => {
    setSelectedProperty(property);
    setSelectedDepartmentId(null);
    setCurrentView("propertyInfo");
    onPropertySelect(property);
  };

  useEffect(() => {
    if (selectedDepartmentIdProp !== null && selectedDepartmentIdProp !== undefined) {
      setSelectedDepartmentId(selectedDepartmentIdProp);
      setCurrentView("departmentDetails");
      setIsOpen(true);
      onHighlightDepartments?.([selectedDepartmentIdProp]);
    }
  }, [selectedDepartmentIdProp]);

  // Dragging logic
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartY(touch.clientY);
    setStartHeight(drawerHeight);
  }, [drawerHeight]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaY = startY - touch.clientY;
    const windowHeight = window.innerHeight;
    
    // Handle PEEK state differently - it's in pixels
    if (typeof startHeight === 'number' && startHeight === DRAWER_STATES.PEEK) {
      const newHeightPx = DRAWER_STATES.PEEK + deltaY;
      if (newHeightPx < 100) {
        // Convert to percentage when dragging up from PEEK
        setDrawerHeight(newHeightPx / windowHeight);
      } else {
        setDrawerHeight(newHeightPx / windowHeight);
      }
    } else {
      const newHeight = startHeight + (deltaY / windowHeight);
      const constrainedHeight = Math.max(0.05, Math.min(0.85, newHeight));
      setDrawerHeight(constrainedHeight);
    }
  }, [isDragging, startY, startHeight]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const windowHeight = window.innerHeight;
    const currentHeightVh = typeof drawerHeight === 'number' && drawerHeight < 1 ? drawerHeight : drawerHeight / windowHeight;
    
    // Snap to nearest state
    if (currentHeightVh < 0.15) {
      setDrawerHeight(DRAWER_STATES.PEEK);
    } else if (currentHeightVh < 0.5) {
      setDrawerHeight(DRAWER_STATES.HALF);
    } else {
      setDrawerHeight(DRAWER_STATES.FULL);
    }
  }, [isDragging, drawerHeight]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(drawerHeight);
  }, [drawerHeight]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = startY - e.clientY;
    const windowHeight = window.innerHeight;
    
    // Handle PEEK state differently - it's in pixels
    if (typeof startHeight === 'number' && startHeight === DRAWER_STATES.PEEK) {
      const newHeightPx = DRAWER_STATES.PEEK + deltaY;
      if (newHeightPx < 100) {
        setDrawerHeight(newHeightPx / windowHeight);
      } else {
        setDrawerHeight(newHeightPx / windowHeight);
      }
    } else {
      const newHeight = startHeight + (deltaY / windowHeight);
      const constrainedHeight = Math.max(0.05, Math.min(0.85, newHeight));
      setDrawerHeight(constrainedHeight);
    }
  }, [isDragging, startY, startHeight]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const windowHeight = window.innerHeight;
    const currentHeightVh = typeof drawerHeight === 'number' && drawerHeight < 1 ? drawerHeight : drawerHeight / windowHeight;
    
    // Snap to nearest state
    if (currentHeightVh < 0.15) {
      setDrawerHeight(DRAWER_STATES.PEEK);
    } else if (currentHeightVh < 0.5) {
      setDrawerHeight(DRAWER_STATES.HALF);
    } else {
      setDrawerHeight(DRAWER_STATES.FULL);
    }
  }, [isDragging, drawerHeight]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Notify parent about drawer height changes
  useEffect(() => {
    if (isOpen && onDrawerHeightChange) {
      const windowHeight = window.innerHeight;
      const heightInPx = drawerHeight === DRAWER_STATES.PEEK 
        ? DRAWER_STATES.PEEK 
        : drawerHeight * windowHeight;
      onDrawerHeightChange(heightInPx);
    } else if (!isOpen && onDrawerHeightChange) {
      onDrawerHeightChange(0);
    }
  }, [isOpen, drawerHeight, onDrawerHeightChange]);

  const actualHeight = isOpen ? drawerHeight : 0;
  
  // Calculate actual height string based on drawer height type
  const getHeightStyle = () => {
    if (!isOpen) return '0px';
    if (drawerHeight === DRAWER_STATES.PEEK) return `${DRAWER_STATES.PEEK}px`;
    return `${drawerHeight * 100}vh`;
  };

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
  } else if (currentView === "properties") {
    headerTitle = "Fastigheter";
    headerSubtitle = "";
  } else if (selectedProperty) {
    headerTitle = selectedProperty.name;
    headerSubtitle = selectedProperty.location;
  }

  return (
    <>
      {/* Bottom Drawer */}
      <div
        ref={drawerRef}
        className="fixed left-0 right-0 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.15)] transition-transform md:hidden z-[75] rounded-tl-[16px] rounded-tr-[16px] flex flex-col"
        style={{
          bottom: '83px',
          height: getHeightStyle(),
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, height 0.3s ease-out',
        }}
      >
        {/* Header Area */}
        <div 
          className="relative shrink-0 bg-white rounded-tl-[16px] rounded-tr-[16px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <div className="w-full pt-2 pb-2 flex items-center justify-center cursor-grab active:cursor-grabbing">
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                {currentView === "propertyInfo" && selectedProperty ? (
                  <PropertySwitcher
                    properties={properties}
                    selectedProperty={selectedProperty}
                    onSwitch={handleSwitchProperty}
                  />
                ) : (
                  <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {headerTitle}
                  </h2>
                )}
                {headerSubtitle && (
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {headerSubtitle}
                  </p>
                )}
              </div>
            </div>
            {!(currentView === "propertyInfo" && selectedProperty) && (
              <button
                onClick={() => {
                  if (currentView === "departmentDetails") {
                    setCurrentView("propertyDetails");
                    setSelectedDepartmentId(null);
                    onDepartmentDeselect?.();
                  } else if (currentView === "noteForm") {
                    onCancelNote?.();
                  } else if (currentView === "propertyDetails" || currentView === "notes") {
                    setCurrentView("propertyInfo");
                  } else if (currentView === "departmentsList") {
                    setCurrentView("propertyInfo");
                  } else if (currentView === "propertyInfo") {
                    setCurrentView("properties");
                    setSelectedProperty(null);
                    setSelectedDepartmentId(null);
                    onPropertyDeselect?.();
                  } else {
                    setIsOpen(false);
                    onDrawerOpenChange?.(false);
                  }
                }}
                className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="size-6 text-gray-500" />
              </button>
            )}
          </div>
          <div className="h-px bg-[#e4e4e4] w-full" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-white">
          {currentView === "noteForm" ? (
            <div className="h-full">
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
              />
            </div>
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
              onAddNote={onStartAddNote}
              onEditNote={onEditNoteStart}
              onShareNote={onShareNote}
              onNoteHover={onNoteHover}
            />
          ) : currentView === "departmentDetails" && selectedProperty && selectedDepartmentId ? (
            <DepartmentDetailsView
              propertyId={selectedProperty.id}
              propertyName={selectedProperty.name}
              propertyLocation={selectedProperty.location}
              departmentId={selectedDepartmentId}
              propertyImage={
                selectedProperty.coordinates[selectedDepartmentId - 1]
                  ? generateDepartmentSnapshot(selectedProperty.coordinates[selectedDepartmentId - 1], 400, 200, 15, true)
                  : selectedProperty.imageUrl
              }
              onClose={handlePropertyClose}
              onBack={() => {
                setCurrentView("propertyDetails");
                setSelectedDepartmentId(null);
                onDepartmentDeselect?.();
              }}
              actions={mockForestActions}
              departmentCoords={selectedProperty.coordinates[selectedDepartmentId - 1]}
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
          ) : currentView === "propertyInfo" && selectedProperty ? (
            <div className="bg-white content-stretch flex flex-col items-start relative size-full">
              <div className="w-full">
                {selectedProperty.id === "1" ? (
                  <button
                    onClick={() => setCurrentView("propertyDetails")}
                    className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                          <svg className="block size-[24px]" fill="none" viewBox="0 0 24 24">
                            <path d={svgPaths.p22c05980} fill="#32412A" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-black">Åtgärder</p>
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">Enligt skogsbruksplan</p>
                        </div>
                      </div>
                      <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24">
                        <path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <div className="w-full border-b border-[#e4e4e4] bg-gray-50">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#e4e4e4] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                          <BookOpenCheck className="size-5" stroke="#999999" strokeWidth={2} fill="none" />
                        </div>
                        <div className="text-left">
                          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-black opacity-60">Åtgärder</p>
                          <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-50">Skogsbruksplan saknas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => setCurrentView("departmentsList")} className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                        <Pentagon className="size-5" stroke="#1E3856" strokeWidth={2} fill="none" />
                      </div>
                      <div className="text-left">
                        <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-black">Avdelningar</p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">{selectedProperty.coordinates.length} avdelningar</p>
                      </div>
                    </div>
                    <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                </button>

                <button onClick={() => setCurrentView("notes")} className="w-full border-b border-[#e4e4e4] hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#e4f5f5] flex items-center justify-center rounded-[8px] shrink-0 size-[40px]">
                        <FileText className="size-5" stroke="#1E3856" strokeWidth={2} fill="none" />
                      </div>
                      <div className="text-left">
                        <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-black">Anteckningar</p>
                        <p className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-[#021c20] opacity-70">{formatNotesCount(getPropertyNotesCount())}</p>
                      </div>
                    </div>
                    <svg className="size-6 opacity-50" fill="none" viewBox="0 0 24 24"><path d="M9 18L15 12L9 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </div>
                </button>
              </div>

              <CollapsibleSection title="Din lokala virkesköpare">
                <div className="w-full border-b border-[#e4e4e4]">
                  <ContactCard name="Daniel Larsson" role="Virkesköpare Hudiksvall / Ljusdal" phone="123 456 78 90" email="daniel.larsson@holmen.com" image={image_9e613302068097aa58a90d360320b38f2a46f3c7} variant="menu" />
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

              {(() => {
                const hasPlan = selectedProperty.id === "1";
                const agoslagRows = [
                  { label: 'Skogsmark produktiv', value: '80%' },
                  { label: 'Skogsmark improduktiv', value: '15%' },
                  { label: 'Inäga/Åker', value: '2%' },
                  { label: 'Vatten', value: '2%' },
                  { label: 'Berg', value: '1%' },
                ];
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
                const placeholderWidths = [12, 20, 30, 24, 45, 58, 70, 55, 38, 28, 24, 24];
                return (
                  <>
                    <CollapsibleSection title="Grunddata">
                      <div className="w-full bg-white">
                        {hasPlan && (
                          <div className="mx-4 mt-3 mb-3 flex items-start gap-2 rounded-[6px] bg-[#e4f5f5] px-3 py-2.5">
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
                          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">{selectedProperty.area.toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ha</p>
                        </div>
                        {hasPlan ? (
                          <>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Totalt virkesförråd</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">1 423 m³sk</p>
                            </div>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Virkesförråd per HA</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">{Math.round(1423 / selectedProperty.area)} m³sk/ha</p>
                            </div>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">Genomsnittlig tillväxt</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">875 m³sk/år</p>
                            </div>
                          </>
                        ) : (
                          <NoPlanTooltip>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Totalt virkesförråd</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                            </div>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Virkesförråd per HA</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                            </div>
                            <div className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">Genomsnittlig tillväxt</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                            </div>
                          </NoPlanTooltip>
                        )}
                      </div>
                    </CollapsibleSection>

                    {hasPlan ? (
                      <CollapsibleSection title="Ägoslag">
                        <div className="w-full bg-white">
                          {agoslagRows.map((row) => (
                            <div key={row.label} className="flex justify-between p-4 border-b border-[#e4e4e4]">
                              <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-black">{row.label}</p>
                              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">{row.value}</p>
                            </div>
                          ))}
                        </div>
                      </CollapsibleSection>
                    ) : (
                      <NoPlanTooltip>
                        <CollapsibleSection title="Ägoslag" dimmed>
                          <div className="w-full bg-white">
                            {agoslagRows.map((row) => (
                              <div key={row.label} className="flex justify-between p-4 border-b border-[#e4e4e4]">
                                <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#b0b0b0]">{row.label}</p>
                                <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[#b0b0b0]">–</p>
                              </div>
                            ))}
                          </div>
                        </CollapsibleSection>
                      </NoPlanTooltip>
                    )}

                    {hasPlan ? (
                      <CollapsibleSection title="Huggningsklasser" titleExtra={<HuggningsklassInfoIcon />}>
                        <div className="w-full bg-white pb-4">
                          <div className="flex justify-end px-4 pt-3 pb-1">
                            <button onClick={() => setHuggningsklasserUnit(huggningsklasserUnit === 'ha' ? 'm3sk' : 'ha')} className="flex items-center gap-1 bg-white border border-[#e4e4e4] rounded px-2 py-1 hover:bg-gray-50 transition-colors">
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[11px] text-gray-700">{huggningsklasserUnit === 'ha' ? 'ha' : 'm³sk'}</span>
                              <svg className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                            </button>
                          </div>
                          <div className="px-4 pt-2 space-y-2">
                            {huggningsklasserBarData.map((bar, i) => (
                              <div key={bar.key} className="flex items-center gap-1">
                                <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] w-8 shrink-0 text-black">{bar.key}</span>
                                <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                                  <div className="h-full rounded-r transition-all duration-300" style={{ width: `${calculateBarWidth(bar.key)}%`, backgroundColor: bar.color }}></div>
                                </div>
                                <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] w-[60px] text-right shrink-0 text-black">{formatValue(bar.key)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleSection>
                    ) : (
                      <NoPlanTooltip>
                        <CollapsibleSection title="Huggningsklasser" dimmed>
                          <div className="w-full bg-white pb-4">
                            <div className="px-4 pt-4 space-y-2">
                              {huggningsklasserBarData.map((bar, i) => (
                                <div key={bar.key} className="flex items-center gap-1">
                                  <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] w-8 shrink-0 text-[#b0b0b0]">{bar.key}</span>
                                  <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                                    <div className="h-full rounded-r transition-all duration-300" style={{ width: `${placeholderWidths[i]}%`, backgroundColor: '#e0e0e0' }}></div>
                                  </div>
                                  <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] w-[60px] text-right shrink-0 text-[#b0b0b0]">–</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleSection>
                      </NoPlanTooltip>
                    )}

                    {hasPlan && (
                      <CollapsibleSection title="Trädslagsfördelning" borderTop>
                        <div className="w-full bg-white pb-4">
                          <div className="flex justify-end px-4 pt-3 pb-1">
                            <button onClick={() => setTradslagUnit(getNextTradslagUnit() as 'percent' | 'ha' | 'm3sk')} className="flex items-center gap-1 bg-white border border-[#e4e4e4] rounded px-2 py-1 hover:bg-gray-50 transition-colors">
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[11px] text-gray-700">{getTradslagUnitLabel()}</span>
                              <svg className="size-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                            </button>
                          </div>
                          <div className="px-4 pt-2 space-y-2">
                            <div className="flex items-center gap-1">
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Tall</span>
                              <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0"><div className="bg-[#cc8c52] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Tall')}%` }}></div></div>
                              <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Tall')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Gran</span>
                              <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0"><div className="bg-[#32412a] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Gran')}%` }}></div></div>
                              <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Gran')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] text-black w-8 shrink-0">Löv</span>
                              <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0"><div className="bg-[#c4d987] h-full rounded-r transition-all duration-300" style={{ width: `${calculateTradslagBarWidth('Löv')}%` }}></div></div>
                              <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] text-black w-[60px] text-right shrink-0">{formatTradslagValue('Löv')}</span>
                            </div>
                          </div>
                        </div>
                      </CollapsibleSection>
                    )}

                    {hasPlan && (
                      <CollapsibleSection title="Åldersfördelning" borderTop>
                        <div className="w-full bg-white pb-4">
                          <div className="px-4 pt-4 space-y-2">
                            {aldersIntervals.map(key => (
                              <div key={key} className="flex items-center gap-1">
                                <span className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[12px] w-[42px] shrink-0 text-black">{key}</span>
                                <div className="flex-1 bg-gray-100 h-5 rounded overflow-hidden min-w-0">
                                  <div className="bg-[#1e3856] h-full rounded-r transition-all duration-300" style={{ width: `${Math.round((aldersData[key] / maxAldersPct) * 100)}%` }}></div>
                                </div>
                                <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[12px] w-[40px] text-right shrink-0 text-black">{aldersData[key]}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleSection>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="bg-[#f7f7f7] size-full flex flex-col">
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
                        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
                          <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre text-left">
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
          )}
        </div>
      </div>
    </>
  );
}