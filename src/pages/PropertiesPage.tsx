import { useEffect, useRef, useState } from "react";
import svgPaths from "../imports/svg-iagn2p0kku";
import { toast } from "sonner@2.0.3";
import { MapDrawer } from "../components/MapDrawer";
import { MobileBottomDrawer } from "../components/MobileBottomDrawer";
import MobilePropertyPanel from "../components/MobilePropertyPanel";
import { generatePropertyThumbnail } from "../utils/mapSnapshots";
import { Note } from "../components/NotesView";
import { notesApi } from "../utils/notesApi";
import { propertiesApi, Property as ApiProperty } from "../utils/propertiesApi";
import { useProfile } from "../contexts/ProfileContext";
import { HolmenModal, HolmenModalFooter } from "../components/HolmenModal";
import ForestButton from "../components/ForestButton";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Ruler, MapPinPlus, SlidersHorizontal, X, MapPin, MapPinned } from "lucide-react";
import { ShareNoteModal, ShareNoteData } from "../components/ShareNoteModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

// Declare google as a global variable
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Property {
  id: string;
  userId?: string;
  name: string;
  area: number;
  type: string;
  location: string;
  imageUrl: string;
  coordinates: { lat: number; lng: number }[][];
  center: { lat: number; lng: number };
}

// Fallback mock data - will be replaced by API data
const fallbackMockProperties: Property[] = [
  {
    id: "1",
    userId: "1",
    name: "LEMESJÖ 1:52",
    area: 45.2,
    type: "Skogsfastighet",
    location: "Sundsvall",
    imageUrl: "", // Will be generated dynamically
    center: { lat: 57.72, lng: 15.38 },
    // 20 avdelningar inom fastigheten
    // 20 avdelningar inom fastigheten
    coordinates: [
      // Rad 1 (5 avdelningar längst upp)
      [
        { lat: 57.725, lng: 15.375 },
        { lat: 57.725, lng: 15.377 },
        { lat: 57.723, lng: 15.377 },
        { lat: 57.723, lng: 15.375 },
      ],
      [
        { lat: 57.725, lng: 15.377 },
        { lat: 57.725, lng: 15.379 },
        { lat: 57.723, lng: 15.379 },
        { lat: 57.723, lng: 15.377 },
      ],
      [
        { lat: 57.725, lng: 15.379 },
        { lat: 57.725, lng: 15.381 },
        { lat: 57.723, lng: 15.381 },
        { lat: 57.723, lng: 15.379 },
      ],
      [
        { lat: 57.725, lng: 15.381 },
        { lat: 57.725, lng: 15.383 },
        { lat: 57.723, lng: 15.383 },
        { lat: 57.723, lng: 15.381 },
      ],
      [
        { lat: 57.725, lng: 15.383 },
        { lat: 57.725, lng: 15.385 },
        { lat: 57.723, lng: 15.385 },
        { lat: 57.723, lng: 15.383 },
      ],
      // Rad 2
      [
        { lat: 57.723, lng: 15.375 },
        { lat: 57.723, lng: 15.377 },
        { lat: 57.721, lng: 15.377 },
        { lat: 57.721, lng: 15.375 },
      ],
      [
        { lat: 57.723, lng: 15.377 },
        { lat: 57.723, lng: 15.379 },
        { lat: 57.721, lng: 15.379 },
        { lat: 57.721, lng: 15.377 },
      ],
      [
        { lat: 57.723, lng: 15.379 },
        { lat: 57.723, lng: 15.381 },
        { lat: 57.721, lng: 15.381 },
        { lat: 57.721, lng: 15.379 },
      ],
      [
        { lat: 57.723, lng: 15.381 },
        { lat: 57.723, lng: 15.383 },
        { lat: 57.721, lng: 15.383 },
        { lat: 57.721, lng: 15.381 },
      ],
      [
        { lat: 57.723, lng: 15.383 },
        { lat: 57.723, lng: 15.385 },
        { lat: 57.721, lng: 15.385 },
        { lat: 57.721, lng: 15.383 },
      ],
      // Rad 3
      [
        { lat: 57.721, lng: 15.375 },
        { lat: 57.721, lng: 15.377 },
        { lat: 57.719, lng: 15.377 },
        { lat: 57.719, lng: 15.375 },
      ],
      [
        { lat: 57.721, lng: 15.377 },
        { lat: 57.721, lng: 15.379 },
        { lat: 57.719, lng: 15.379 },
        { lat: 57.719, lng: 15.377 },
      ],
      [
        { lat: 57.721, lng: 15.379 },
        { lat: 57.721, lng: 15.381 },
        { lat: 57.719, lng: 15.381 },
        { lat: 57.719, lng: 15.379 },
      ],
      [
        { lat: 57.721, lng: 15.381 },
        { lat: 57.721, lng: 15.383 },
        { lat: 57.719, lng: 15.383 },
        { lat: 57.719, lng: 15.381 },
      ],
      [
        { lat: 57.721, lng: 15.383 },
        { lat: 57.721, lng: 15.385 },
        { lat: 57.719, lng: 15.385 },
        { lat: 57.719, lng: 15.383 },
      ],
      // Rad 4
      [
        { lat: 57.719, lng: 15.375 },
        { lat: 57.719, lng: 15.377 },
        { lat: 57.717, lng: 15.377 },
        { lat: 57.717, lng: 15.375 },
      ],
      [
        { lat: 57.719, lng: 15.377 },
        { lat: 57.719, lng: 15.379 },
        { lat: 57.717, lng: 15.379 },
        { lat: 57.717, lng: 15.377 },
      ],
      [
        { lat: 57.719, lng: 15.379 },
        { lat: 57.719, lng: 15.381 },
        { lat: 57.717, lng: 15.381 },
        { lat: 57.717, lng: 15.379 },
      ],
      [
        { lat: 57.719, lng: 15.381 },
        { lat: 57.719, lng: 15.383 },
        { lat: 57.717, lng: 15.383 },
        { lat: 57.717, lng: 15.381 },
      ],
      [
        { lat: 57.719, lng: 15.383 },
        { lat: 57.719, lng: 15.385 },
        { lat: 57.717, lng: 15.385 },
        { lat: 57.717, lng: 15.383 },
      ],
    ]
  },
  {
    id: "2",
    name: "TOSÄTTER 7:18",
    area: 78.5,
    type: "Skogsfastighet",
    location: "Sundsvall",
    imageUrl: "", // Will be generated dynamically
    center: { lat: 57.68, lng: 15.42 },
    coordinates: [
      [
        { lat: 57.69, lng: 15.41 },
        { lat: 57.69, lng: 15.43 },
        { lat: 57.67, lng: 15.43 },
        { lat: 57.67, lng: 15.41 },
      ]
    ]
  },
  {
    id: "3",
    name: "BORKA S:6",
    area: 32.8,
    type: "Samfällighet",
    location: "Sundsvall",
    imageUrl: "", // Will be generated dynamically
    center: { lat: 57.75, lng: 15.45 },
    coordinates: [
      [
        { lat: 57.755, lng: 15.445 },
        { lat: 57.755, lng: 15.455 },
        { lat: 57.745, lng: 15.455 },
        { lat: 57.745, lng: 15.445 },
      ]
    ]
  },
  {
    id: "5",
    userId: "1",
    name: "RUSKELSBY 1:4",
    area: 62.8,
    type: "Skogsfastighet",
    location: "Sundsvall",
    imageUrl: "",
    center: { lat: 57.738, lng: 15.398 },
    // 15 avdelningar — alla delar exakta kantpunkter, inga glapp
    // Noder (shared vertices):
    // A=57.7425,15.3925  B=57.7428,15.3955  C=57.7425,15.3985  D=57.7422,15.4015  E=57.7418,15.4045
    // F=57.7410,15.3918  G=57.7412,15.3948  H=57.7408,15.3978  I=57.7405,15.4008  J=57.7402,15.4038
    // K=57.7395,15.3922  L=57.7397,15.3952  M=57.7393,15.3982  N=57.7390,15.4012  O=57.7388,15.4035
    // P=57.7380,15.3928  Q=57.7382,15.3958  R=57.7378,15.3988  S=57.7375,15.4018  T=57.7373,15.4032
    // U=57.7368,15.3935  V=57.7370,15.3962  W=57.7365,15.3990  X=57.7362,15.4015
    // Y=57.7358,15.3945  Z=57.7355,15.3972  AA=57.7352,15.4000
    coordinates: [
      // Avd 1: A-B-G-F
      [
        { lat: 57.7425, lng: 15.3925 },
        { lat: 57.7428, lng: 15.3955 },
        { lat: 57.7412, lng: 15.3948 },
        { lat: 57.7410, lng: 15.3918 },
      ],
      // Avd 2: B-C-H-G
      [
        { lat: 57.7428, lng: 15.3955 },
        { lat: 57.7425, lng: 15.3985 },
        { lat: 57.7408, lng: 15.3978 },
        { lat: 57.7412, lng: 15.3948 },
      ],
      // Avd 3: C-D-I-H
      [
        { lat: 57.7425, lng: 15.3985 },
        { lat: 57.7422, lng: 15.4015 },
        { lat: 57.7405, lng: 15.4008 },
        { lat: 57.7408, lng: 15.3978 },
      ],
      // Avd 4: D-E-J-I
      [
        { lat: 57.7422, lng: 15.4015 },
        { lat: 57.7418, lng: 15.4045 },
        { lat: 57.7402, lng: 15.4038 },
        { lat: 57.7405, lng: 15.4008 },
      ],
      // Avd 5: F-G-L-K
      [
        { lat: 57.7410, lng: 15.3918 },
        { lat: 57.7412, lng: 15.3948 },
        { lat: 57.7397, lng: 15.3952 },
        { lat: 57.7395, lng: 15.3922 },
      ],
      // Avd 6: G-H-M-L
      [
        { lat: 57.7412, lng: 15.3948 },
        { lat: 57.7408, lng: 15.3978 },
        { lat: 57.7393, lng: 15.3982 },
        { lat: 57.7397, lng: 15.3952 },
      ],
      // Avd 7: H-I-N-M
      [
        { lat: 57.7408, lng: 15.3978 },
        { lat: 57.7405, lng: 15.4008 },
        { lat: 57.7390, lng: 15.4012 },
        { lat: 57.7393, lng: 15.3982 },
      ],
      // Avd 8: I-J-O-N
      [
        { lat: 57.7405, lng: 15.4008 },
        { lat: 57.7402, lng: 15.4038 },
        { lat: 57.7388, lng: 15.4035 },
        { lat: 57.7390, lng: 15.4012 },
      ],
      // Avd 9: K-L-Q-P
      [
        { lat: 57.7395, lng: 15.3922 },
        { lat: 57.7397, lng: 15.3952 },
        { lat: 57.7382, lng: 15.3958 },
        { lat: 57.7380, lng: 15.3928 },
      ],
      // Avd 10: L-M-R-Q
      [
        { lat: 57.7397, lng: 15.3952 },
        { lat: 57.7393, lng: 15.3982 },
        { lat: 57.7378, lng: 15.3988 },
        { lat: 57.7382, lng: 15.3958 },
      ],
      // Avd 11: M-N-S-R
      [
        { lat: 57.7393, lng: 15.3982 },
        { lat: 57.7390, lng: 15.4012 },
        { lat: 57.7375, lng: 15.4018 },
        { lat: 57.7378, lng: 15.3988 },
      ],
      // Avd 12: N-O-T-S
      [
        { lat: 57.7390, lng: 15.4012 },
        { lat: 57.7388, lng: 15.4035 },
        { lat: 57.7373, lng: 15.4032 },
        { lat: 57.7375, lng: 15.4018 },
      ],
      // Avd 13: P-Q-V-U
      [
        { lat: 57.7380, lng: 15.3928 },
        { lat: 57.7382, lng: 15.3958 },
        { lat: 57.7370, lng: 15.3962 },
        { lat: 57.7368, lng: 15.3935 },
      ],
      // Avd 14: Q-R-W-V  +  U-V-Y (sammanslaget: U-V-W-Z-Y + Q-R-W-V)
      // Avd 14: Q-R-S-X-W-V
      [
        { lat: 57.7382, lng: 15.3958 },
        { lat: 57.7378, lng: 15.3988 },
        { lat: 57.7375, lng: 15.4018 },
        { lat: 57.7362, lng: 15.4015 },
        { lat: 57.7365, lng: 15.3990 },
        { lat: 57.7370, lng: 15.3962 },
      ],
      // Avd 15: U-V-W-Z-Y  +  S-T-X sammanslaget: V-W-X-AA-Z-Y-U  nej
      // Avd 15: U-V-W-AA-Z-Y
      [
        { lat: 57.7368, lng: 15.3935 },
        { lat: 57.7370, lng: 15.3962 },
        { lat: 57.7365, lng: 15.3990 },
        { lat: 57.7352, lng: 15.4000 },
        { lat: 57.7355, lng: 15.3972 },
        { lat: 57.7358, lng: 15.3945 },
      ],
    ]
  },
];

// Outer boundary for LEMESJÖ (encompasses all 20 subdivisions)
const lemesjoOuterBoundary = [
  { lat: 57.725, lng: 15.375 },
  { lat: 57.725, lng: 15.385 },
  { lat: 57.717, lng: 15.385 },
  { lat: 57.717, lng: 15.375 },
];

// Outer boundary for BJÖRKLUND (encompasses all 12 subdivisions)
const bjorklundOuterBoundary = [
  { lat: 57.805, lng: 15.495 },
  { lat: 57.805, lng: 15.507 },
  { lat: 57.799, lng: 15.507 },
  { lat: 57.799, lng: 15.495 },
];

// Outer boundary for RUSKELSBY — computed from department outer edges
// Top: A(57.7425,15.3925) → B → C → D → E(57.7418,15.4045)
// Right: E → J(57.7402,15.4038) → O(57.7388,15.4035) → T(57.7373,15.4032) → X(57.7362,15.4015) → AA(57.7352,15.4000)
// Bottom: AA → Z(57.7355,15.3972) → Y(57.7358,15.3945)
// Left: Y → U(57.7368,15.3935) → P(57.7380,15.3928) → K(57.7395,15.3922) → F(57.7410,15.3918) → A
const ruskelsByOuterBoundary = (() => {
  // Collect all points from all departments, find the convex hull-ish outer path
  // Since departments tessellate perfectly, outer boundary = the perimeter points
  // Going clockwise from top-left:
  return [
    { lat: 57.7425, lng: 15.3925 }, // A
    { lat: 57.7428, lng: 15.3955 }, // B
    { lat: 57.7425, lng: 15.3985 }, // C
    { lat: 57.7422, lng: 15.4015 }, // D
    { lat: 57.7418, lng: 15.4045 }, // E
    { lat: 57.7402, lng: 15.4038 }, // J
    { lat: 57.7388, lng: 15.4035 }, // O
    { lat: 57.7375, lng: 15.4018 }, // S (avd 11/12 corner)
    { lat: 57.7362, lng: 15.4015 }, // X (avd 14 corner)
    { lat: 57.7352, lng: 15.4000 }, // AA (avd 15 corner)
    { lat: 57.7355, lng: 15.3972 }, // Z
    { lat: 57.7358, lng: 15.3945 }, // Y
    { lat: 57.7368, lng: 15.3935 }, // U
    { lat: 57.7380, lng: 15.3928 }, // P
    { lat: 57.7395, lng: 15.3922 }, // K
    { lat: 57.7410, lng: 15.3918 }, // F
  ];
})();

// Helper function to get outer boundary for a property
const getPropertyOuterBoundary = (property: Property) => {
  if (property.id === "1") return lemesjoOuterBoundary;
  if (property.id === "4") return bjorklundOuterBoundary;
  if (property.id === "5") return ruskelsByOuterBoundary;
  return property.coordinates[0];
};

// Helper function to check if property has multiple departments
const hasMultipleDepartments = (property: Property) => {
  return property.id === "1" || property.id === "4";
};

// Generate map snapshot URLs for each property
fallbackMockProperties.forEach((property) => {
  const boundary = getPropertyOuterBoundary(property);
  property.imageUrl = generatePropertyThumbnail(property.center, boundary);
});

interface PropertiesPageProps {
  initialPropertyId?: string | null;
}

// ─── Shared map marker SVG builder (lucide-compatible paths) ────────────────
// All icons: colored filled shape + white lucide icon inside + white pointer.
// Paths sourced from lucide-react 24×24 viewBox, scaled via SVG <g transform>.
function buildNoteIconSVG(type: string | undefined, color: string): string {
  // Normalize legacy Vindfälle purple and old red to Skogsskada orange
  const normalizedColor = color === '#5F283F' || color === '#D9381E' ? '#FF6E2E' : color;
  color = normalizedColor;
  const pointerIsCircle = type === "Generell" || !type;
  const pointerY = pointerIsCircle ? 19 : 20;
  const pointer = `<path d="M12 24 L8 ${pointerY} L16 ${pointerY} Z" fill="white"/>`;

  let iconBody: string;
  switch (type) {
    case "Generell":
      // Lucide Info — scale 0.62 for clear margin, sw=2.0 thin lines
      iconBody = `<circle cx="12" cy="10" r="9" fill="${color}" stroke="white" stroke-width="2"/><g transform="translate(12,10) scale(0.62) translate(-12,-12)" stroke="white" stroke-width="2.0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16v-4"/><path d="M12 8h.01"/></g>`;
      break;

    case "Skogsskada":
    case "Vindfälle":
    case "Vindfäll":
    case "Viltskada":
      // Red triangle with ! — TriangleAlert
      iconBody = `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="${color}" stroke="white" stroke-width="1.5"/><line x1="12" y1="10" x2="12" y2="14" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="17" r="0.9" fill="white"/>`;
      break;

    case "Åtgärd":
      // Lucide List — scale 0.48 for comfortable padding in rect, sw=2.0
      iconBody = `<rect x="4" y="4" width="16" height="16" rx="2" fill="${color}" stroke="white" stroke-width="2"/><g transform="translate(12,12) scale(0.48) translate(-12,-12)" stroke="white" stroke-width="2.0" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></g>`;
      break;

    default:
      // Lucide CircleHelp — scale 0.62, sw=2.0 thin lines
      iconBody = `<circle cx="12" cy="10" r="9" fill="${color}" stroke="white" stroke-width="2"/><g transform="translate(12,10) scale(0.62) translate(-12,-12)" stroke="white" stroke-width="2.0" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 24 30" width="40" height="46">${iconBody}${pointer}</svg>`;
}
// ────────────────────────────────────────────────────────────────────────────

export default function PropertiesPage({ initialPropertyId }: PropertiesPageProps = {}) {
  console.log('[PROPERTIES PAGE] Component rendering');
  const { currentProfile } = useProfile();
  console.log('[PROPERTIES PAGE] Current profile:', currentProfile);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const polygonsRef = useRef<any[]>([]);
  const labelsRef = useRef<any[]>([]);
  const noteMarkersRef = useRef<any[]>([]);
  const noteMarkersMapRef = useRef<Map<string, any>>(new Map()); // Map note ID to marker
  const previouslyHoveredNoteIdRef = useRef<string | null>(null); // Track previous hover to restore
  const notePolygonsRef = useRef<any[]>([]); // For area-based notes
  const activeNotePolygonRef = useRef<any>(null); // Active polygon when note is clicked
  const hoveredNotePolygonRef = useRef<any>(null); // Hovered polygon when hovering over note in list
  const infoWindowRef = useRef<any>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [hoveredDepartmentId, setHoveredDepartmentId] = useState<number | null>(null);
  const [highlightedDepartmentIds, setHighlightedDepartmentIds] = useState<number[]>([]);
  const [departmentLabelMap, setDepartmentLabelMap] = useState<Map<number, string>>(new Map());
  const [notes, setNotes] = useState<Note[]>([]);
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shareNoteData, setShareNoteData] = useState<ShareNoteData | null>(null);
  const [deleteConfirmNoteId, setDeleteConfirmNoteId] = useState<string | null>(null);
  
  // Map filter states
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'terrain'>('satellite');
  const [showNoteMarkers, setShowNoteMarkers] = useState(true);
  const [showResolvedNotes, setShowResolvedNotes] = useState(true);
  const [showDepartmentLabels, setShowDepartmentLabels] = useState(true);
  const [showPropertyBorders, setShowPropertyBorders] = useState(true);
  const [showDepartmentBoundaries, setShowDepartmentBoundaries] = useState(true);
  const [autoZoomToDepartment, setAutoZoomToDepartment] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileDrawerHeight, setMobileDrawerHeight] = useState(0); // Height in pixels of mobile drawer
  
  // Measurement states
  const [showMeasureDialog, setShowMeasureDialog] = useState(false);
  const [measureMode, setMeasureMode] = useState<'distance' | 'area' | null>(null);
  const measureModeRef = useRef<'distance' | 'area' | null>(null);
  const [measurePoints, setMeasurePoints] = useState<Array<{ lat: number; lng: number }>>([]);
  const measureLineRef = useRef<google.maps.Polyline | null>(null);
  const measurePolygonRef = useRef<google.maps.Polygon | null>(null);
  const measureMarkersRef = useRef<any[]>([]);
  const measureListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const measureMouseMoveListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const measureTrailLineRef = useRef<google.maps.Polyline | null>(null);
  const measureTrailPolygonRef = useRef<google.maps.Polygon | null>(null);
  const measureLabelOverlayRef = useRef<google.maps.OverlayView | null>(null);
  const measureFixedLabelOverlayRef = useRef<google.maps.OverlayView | null>(null);
  const measureInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const measurePointsRef = useRef<Array<{ lat: number; lng: number }>>([]);
  
  // Note creation states
  const [showNoteTypeDialog, setShowNoteTypeDialog] = useState(false);
  const [noteCreationMode, setNoteCreationMode] = useState<'point' | 'area' | null>(null);
  const noteCreationModeRef = useRef<'point' | 'area' | null>(null);
  const [noteAreaPoints, setNoteAreaPoints] = useState<Array<{ lat: number; lng: number }>>([]);
  const noteAreaPointsRef = useRef<Array<{ lat: number; lng: number }>>([]);
  const noteAreaPolygonRef = useRef<google.maps.Polygon | null>(null);
  const noteAreaMarkersRef = useRef<any[]>([]);
  const noteAreaListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const noteAreaMouseMoveListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const noteAreaTrailLineRef = useRef<google.maps.Polyline | null>(null);
  const noteAreaTrailPolygonRef = useRef<google.maps.Polygon | null>(null);
  const isNoteClickingRef = useRef(false); // Track if we're clicking a note marker
  
  // Array to hold all fixed measurements that should be cleared on "Avsluta"
  const fixedMeasurementsRef = useRef<Array<{
    lines: google.maps.Polyline[];
    polygons: google.maps.Polygon[];
    markers: any[];
    labels: google.maps.OverlayView[];
  }>>([]);
  
  // Refs for accessing state inside map listeners
  const editingNoteRef = useRef<Note | null>(null);
  const isAddingNoteRef = useRef(false);
  const selectedDepartmentIdRef = useRef<number | null>(null);
  const autoZoomToDepartmentRef = useRef(true);
  const departmentPolygonsMapRef = useRef<Map<number, google.maps.Polygon>>(new Map());

  // Helper to remove a marker (AdvancedMarkerElement or legacy) from the map
  const removeMarkerFromMap = (marker: any) => {
    if (!marker) return;
    try {
      if (typeof marker.setMap === 'function') {
        marker.setMap(null);
      } else if ('map' in marker) {
        marker.map = null;
      }
    } catch (e) {
      // Ignore cleanup errors
    }
  };

  // Load properties for current user
  useEffect(() => {
    async function loadProperties() {
      try {
        // Reset all relevant state when user changes
        setSelectedProperty(null);
        setSelectedDepartmentId(null);
        setNotes([]);
        setEditingNote(null);
        setIsAddingNote(false);
        
        // Clear the map so it can be reinitialized with new data
        console.log('[PROPERTIES] Clearing map for user switch');
        if (mapInstanceRef.current) {
          // Clear all overlays
          polygonsRef.current.forEach((polygon) => {
            try {
              window.google.maps.event.clearInstanceListeners(polygon);
              polygon.setMap(null);
            } catch (e) {
              console.error('Error clearing polygon:', e);
            }
          });
          polygonsRef.current = [];
          
          labelsRef.current.forEach((label) => {
            try {
              removeMarkerFromMap(label);
            } catch (e) {
              console.error('Error clearing label:', e);
            }
          });
          labelsRef.current = [];
          
          noteMarkersRef.current.forEach((marker) => {
            try {
              removeMarkerFromMap(marker);
            } catch (e) {
              console.error('Error clearing note marker:', e);
            }
          });
          noteMarkersRef.current = [];
          
          departmentPolygonsMapRef.current.forEach((polygon) => {
            try {
              window.google.maps.event.clearInstanceListeners(polygon);
              polygon.setMap(null);
            } catch (e) {
              console.error('Error clearing department polygon:', e);
            }
          });
          departmentPolygonsMapRef.current.clear();
          
          if (userMarkerRef.current) {
            try {
              removeMarkerFromMap(userMarkerRef.current);
              userMarkerRef.current = null;
            } catch (e) {
              console.error('Error clearing user marker:', e);
            }
          }
          
          // Set map to null and reset state
          setIsMapLoaded(false);
          mapInstanceRef.current = null;
        }
        
        setIsLoadingProperties(true);
        console.log('[PROPERTIES] Loading properties for profile:', currentProfile.id, currentProfile.name);
        const userProperties = await propertiesApi.getPropertiesForUser(currentProfile.id);
        console.log('[PROPERTIES] Loaded properties:', userProperties);
        console.log('[PROPERTIES] Properties type:', typeof userProperties, 'Array?', Array.isArray(userProperties));
        
        // Validate that we got an array
        if (!Array.isArray(userProperties)) {
          console.error('[PROPERTIES] Invalid response format - not an array:', userProperties);
          throw new Error('Invalid response format');
        }
        
        if (userProperties.length === 0) {
          console.warn('[PROPERTIES] No properties found for profile:', currentProfile.id);
          // Use fallback mock data if no properties
          setProperties(fallbackMockProperties);
        } else {
          // Generate thumbnails
          userProperties.forEach((property) => {
            const boundary = getPropertyOuterBoundary(property);
            property.imageUrl = generatePropertyThumbnail(property.center, boundary);
          });
          
          // Inject RUSKELSBY demo property if not already present
          const ruskelsby = fallbackMockProperties.find(p => p.id === "5");
          if (ruskelsby && !userProperties.find(p => p.id === "5")) {
            const boundary = getPropertyOuterBoundary(ruskelsby);
            ruskelsby.imageUrl = generatePropertyThumbnail(ruskelsby.center, boundary);
            userProperties.push(ruskelsby);
          }
          setProperties(userProperties);
        }
      } catch (error) {
        console.error('[PROPERTIES] Error loading properties:', error);
        toast.error('Kunde inte ladda fastigheter - använder testdata');
        // Fallback to mock data
        setProperties(fallbackMockProperties);
      } finally {
        setIsLoadingProperties(false);
      }
    }
    
    loadProperties();
  }, [currentProfile.id]);

  useEffect(() => {
    editingNoteRef.current = editingNote;
    isAddingNoteRef.current = isAddingNote;
    selectedDepartmentIdRef.current = selectedDepartmentId;
    autoZoomToDepartmentRef.current = autoZoomToDepartment;
  }, [editingNote, isAddingNote, selectedDepartmentId, autoZoomToDepartment]);

  // Handle initial property selection from navigation
  useEffect(() => {
    console.log('[INITIAL PROPERTY] useEffect triggered:', { 
      initialPropertyId, 
      propertiesLength: properties.length, 
      isMapLoaded, 
      hasMapInstance: !!mapInstanceRef.current,
      hasGoogle: !!window.google,
      isLoadingProperties
    });
    
    if (initialPropertyId && properties.length > 0 && isMapLoaded && !isLoadingProperties && mapInstanceRef.current && window.google) {
      const property = properties.find(p => p.id === initialPropertyId);
      console.log('[INITIAL PROPERTY] Found property:', property);
      if (property) {
        console.log('[INITIAL PROPERTY] Selecting property:', property.name);
        setSelectedProperty(property);
        setSelectedDepartmentId(null);
        setIsDrawerOpen(true); // Open the drawer
        
        // Use setTimeout to ensure map and polygons are fully rendered before zooming
        setTimeout(() => {
          if (mapInstanceRef.current && window.google) {
            console.log('[INITIAL PROPERTY] Executing fitBounds after delay');
            // Fit map to property bounds (same as handlePropertyClick)
            const boundary = getPropertyOuterBoundary(property);
            console.log('[INITIAL PROPERTY] Boundary:', boundary);
            const bounds = new window.google.maps.LatLngBounds();
            boundary.forEach((coord) => bounds.extend(coord));
            console.log('[INITIAL PROPERTY] Bounds:', bounds);
            console.log('[INITIAL PROPERTY] Calling fitBounds with 50px padding');
            mapInstanceRef.current.fitBounds(bounds, 50); // 50px padding
            console.log('[INITIAL PROPERTY] fitBounds called successfully');
          } else {
            console.warn('[INITIAL PROPERTY] Map not ready for fitBounds');
          }
        }, 300);
        
        toast.success(`Fastighet vald: ${property.name}`);
      } else {
        console.warn('[INITIAL PROPERTY] Property not found with ID:', initialPropertyId);
      }
    }
  }, [initialPropertyId, properties, isMapLoaded, isLoadingProperties]);

  // Fetch department data for the selected property to build label map (skifte-aware)
  useEffect(() => {
    if (!selectedProperty) {
      setDepartmentLabelMap(new Map());
      return;
    }
    const fetchDeptLabels = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/${selectedProperty.id}`,
          { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
        );
        if (!response.ok) return;
        const data = await response.json();
        const labelMap = new Map<number, string>();
        if (data.departments) {
          for (const dept of data.departments) {
            if (dept.skifte != null && dept.skifteDepartmentId != null) {
              labelMap.set(dept.departmentId, String(dept.skifteDepartmentId));
            }
          }
        }
        setDepartmentLabelMap(labelMap);
      } catch (err) {
        console.error("Error fetching department labels:", err);
      }
    };
    fetchDeptLabels();
  }, [selectedProperty?.id]);

  // Update polygon styles when selected department changes
  useEffect(() => {
    console.log('[POLYGON DEBUG] selectedDepartmentId useEffect triggered:', { 
      selectedDepartmentId, 
      propertyId: selectedProperty?.id,
      mapSize: departmentPolygonsMapRef.current.size 
    });
    
    if (!selectedProperty || departmentPolygonsMapRef.current.size === 0) return;

    departmentPolygonsMapRef.current.forEach((polygon, departmentNumber) => {
      try {
        const isSelected = selectedDepartmentId === departmentNumber;
        console.log('[POLYGON DEBUG] Updating polygon', departmentNumber, 'isSelected:', isSelected);
        
        // Update only the selected state, hover is handled by event listeners
        if (hasMultipleDepartments(selectedProperty)) {
          // LEMESJÖ & BJÖRKLUND styling (multi-department properties)
          polygon.setOptions({
            strokeWeight: isSelected ? 3 : 3,
            fillColor: isSelected ? "#FFD700" : "transparent",
            fillOpacity: isSelected ? 0.3 : 0,
          });
        } else {
          // Other properties styling
          polygon.setOptions({
            strokeWeight: isSelected ? 3 : 3,
            fillColor: isSelected ? "#FFD700" : "#FFFFFF",
            fillOpacity: isSelected ? 0.5 : 0,
          });
        }
      } catch (e) {
        // Ignore errors from invalid polygon references
        console.error('[POLYGON DEBUG] Failed to update polygon style:', e);
      }
    });
  }, [selectedDepartmentId, selectedProperty]);

  // Load notes when property is selected
  useEffect(() => {
    if (!selectedProperty) {
      setNotes([]);
      return;
    }

    // Load notes for the selected property
    const loadNotes = async () => {
      try {
        const loadedNotes = await notesApi.getNotes(selectedProperty.id);
        setNotes(loadedNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
        toast.error('Kunde inte ladda anteckningar');
      }
    };

    loadNotes();
  }, [selectedProperty?.id]);

  // Expose edit handler to global scope for InfoWindow button
  useEffect(() => {
    (window as any).handleEditNoteFromMap = (noteId: string) => {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        handleEditNoteStart(note);
        if (infoWindowRef.current) infoWindowRef.current.close();
      }
    };
    
    // Add function to close info window and clear polygon
    (window as any).handleCloseInfoWindow = () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      if (activeNotePolygonRef.current) {
        activeNotePolygonRef.current.setMap(null);
        activeNotePolygonRef.current = null;
      }
    };

    // Toggle resolved from InfoWindow
    (window as any).handleToggleResolvedFromMap = (noteId: string) => {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        handleToggleResolved(note);
        // Update the check icon in the InfoWindow DOM immediately
        const newResolved = !note.resolved;
        const checkDiv = document.querySelector('.niw button:first-child div') as HTMLElement;
        if (checkDiv) {
          checkDiv.style.borderColor = '#1e3856';
          checkDiv.style.background = newResolved ? '#1e3856' : 'white';
          const svg = checkDiv.querySelector('svg polyline');
          if (svg) svg.setAttribute('stroke', newResolved ? 'white' : '#1e3856');
        }
      }
    };

    // Share note from InfoWindow
    (window as any).handleShareNoteFromMap = (noteId: string) => {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        const normalizedType = (note.type === "Vindfäll" || note.type === "Vindfälle" || note.type === "Viltskada") ? "Skogsskada" : note.type;
        const normalizedColor = note.color === '#5F283F' || note.color === '#D9381E' ? '#FF6E2E' : note.color;
        setShareNoteData({
          id: note.id,
          title: note.title,
          type: normalizedType,
          department: note.department,
          color: normalizedColor,
          date: note.date,
          comment: note.comment,
        });
      }
    };
    
    // Delete note from InfoWindow — open confirm modal
    (window as any).handleDeleteNoteFromMap = (noteId: string) => {
      setDeleteConfirmNoteId(noteId);
    };

    return () => {
      delete (window as any).handleEditNoteFromMap;
      delete (window as any).handleCloseInfoWindow;
      delete (window as any).handleToggleResolvedFromMap;
      delete (window as any).handleShareNoteFromMap;
      delete (window as any).handleDeleteNoteFromMap;
    };
  }, [notes]);

  // Apply map type filter
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(mapType);
    }
  }, [mapType]);

  // Toggle note markers visibility (including resolved filter)
  useEffect(() => {
    noteMarkersRef.current.forEach(marker => {
      if (marker.element) {
        const note = notes.find(n => n.id === marker.noteId);
        const hiddenByResolved = note?.resolved && !showResolvedNotes;
        marker.element.style.display = (showNoteMarkers && !hiddenByResolved) ? '' : 'none';
      }
    });
  }, [showNoteMarkers, showResolvedNotes, notes]);

  // Toggle department labels visibility
  useEffect(() => {
    labelsRef.current.forEach(label => {
      // Handle PropertyLabel (custom overlay) - uses setMap
      if (typeof label.setMap === 'function') {
        label.setMap(showDepartmentLabels ? mapInstanceRef.current : null);
      } else if (label.element) {
        // AdvancedMarkerElement
        label.element.style.display = showDepartmentLabels ? '' : 'none';
      }
    });
  }, [showDepartmentLabels]);

  const findDepartmentForLocation = (lat: number, lng: number) => {
    if (!window.google || !selectedProperty) return "";
    
    const point = new window.google.maps.LatLng(lat, lng);
    
    // Check if property has departments (multiple polygons for properties with departments)
    if (hasMultipleDepartments(selectedProperty) && selectedProperty.coordinates.length > 1) {
      // Check all departments
      for (let i = 0; i < selectedProperty.coordinates.length; i++) {
        const coords = selectedProperty.coordinates[i];
        const polygon = new window.google.maps.Polygon({ paths: coords });
        if (window.google.maps.geometry && window.google.maps.geometry.poly.containsLocation(point, polygon)) {
          const deptNum = i + 1;
          const displayNum = departmentLabelMap.get(deptNum) || String(deptNum);
          return `Avd ${displayNum}.`;
        }
      }
      // Point is within property but outside departments
      return "Utanför indeln.";
    }
    
    // For properties without departments, check if point is within property boundary
    if (selectedProperty.coordinates.length > 0) {
      const propertyBoundary = selectedProperty.coordinates[0];
      const polygon = new window.google.maps.Polygon({ paths: propertyBoundary });
      if (window.google.maps.geometry && window.google.maps.geometry.poly.containsLocation(point, polygon)) {
        return selectedProperty.name; // Return property name for property-level notes
      }
    }
    
    return selectedProperty.name; // Default to property name
  };

  const handleNotePlacement = (latLng: any) => {
    if (!isAddingNoteRef.current && !editingNoteRef.current) return;

    const lat = latLng.lat();
    const lng = latLng.lng();
    const dept = findDepartmentForLocation(lat, lng);
    
    console.log('[NOTE PLACEMENT] Placing note at:', lat, lng, 'Department:', dept);
    
    setEditingNote(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        coordinates: { lat, lng },
        department: dept
      };
    });
  };

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setOptions({
        draggableCursor: isAddingNote || editingNote ? 'crosshair' : null
      });
    }
  }, [isAddingNote, editingNote]);

  // Draw properties function - separate from useEffect so it can be reused
  const drawProperties = () => {
      if (!mapInstanceRef.current || !window.google) return;

      console.log('drawProperties called', { 
        showPropertyBorders, 
        showDepartmentBoundaries, 
        selectedProperty: selectedProperty?.name 
      });

      // Clear existing polygons and labels
      console.log('[POLYGON DEBUG] Clearing polygons, count:', polygonsRef.current.length);
      console.log('[POLYGON DEBUG] Clearing department polygons map, size:', departmentPolygonsMapRef.current.size);
      
      polygonsRef.current.forEach((polygon) => {
        window.google.maps.event.clearInstanceListeners(polygon);
        polygon.setMap(null);
      });
      polygonsRef.current = [];
      
      // Clear department polygons map
      departmentPolygonsMapRef.current.forEach((polygon) => {
        window.google.maps.event.clearInstanceListeners(polygon);
      });
      departmentPolygonsMapRef.current.clear();
      
      console.log('[POLYGON DEBUG] Cleared all polygons and listeners');
      
      labelsRef.current.forEach((label) => removeMarkerFromMap(label));
      labelsRef.current = [];

      // If no property is selected, show only outer boundaries
      if (!selectedProperty) {
        // Only draw property borders if enabled
        if (!showPropertyBorders) {
          console.log('Skipping property borders - disabled');
          return;
        }
        
        properties.forEach((property) => {
          // For multi-department properties, show outer boundary; for others, show their single polygon
          const boundary = getPropertyOuterBoundary(property);
          
          const polygon = new window.google.maps.Polygon({
            paths: boundary,
            strokeColor: "#FFFFFF",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "transparent",
            fillOpacity: 0,
            map: mapInstanceRef.current,
          });

          // Add hover effect
          polygon.addListener("mouseover", () => {
            polygon.setOptions({
              strokeWeight: 3,
            });
          });

          polygon.addListener("mouseout", () => {
            polygon.setOptions({
              strokeWeight: 2,
            });
          });

          // Add click event
          polygon.addListener("click", (e: any) => {
            if (measureModeRef.current) {
              // Let measure handler deal with it
              return;
            }
            if (isAddingNoteRef.current || editingNoteRef.current) {
              handleNotePlacement(e.latLng);
              return;
            }
            handlePropertyClick(property, e.latLng);
          });

          polygonsRef.current.push(polygon);

          // Add property name label above each property
          const bounds = new window.google.maps.LatLngBounds();
          boundary.forEach((coord) => bounds.extend(coord));
          const center = bounds.getCenter();
          
          // Skip label if center is not available
          if (!center) return;
          
          // Get the highest latitude point (northernmost)
          const maxLat = Math.max(...boundary.map((coord) => coord.lat));
          
          // Position label just above the northernmost point - very close to the border
          const labelPosition = {
            lat: maxLat + 0.0005,
            lng: center.lng()
          };

          // Create custom marker with styled label and arrow pointer
          const labelDiv = document.createElement('div');
          labelDiv.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            pointer-events: auto;
            z-index: 1000;
          `;
          
          // Create the label box
          const labelBox = document.createElement('div');
          labelBox.style.cssText = `
            background: white;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 11px;
            font-weight: 600;
            color: #021c20;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          `;
          labelBox.textContent = property.name;
          
          // Create the arrow pointer (triangle)
          const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          arrowSvg.setAttribute('width', '12');
          arrowSvg.setAttribute('height', '8');
          arrowSvg.setAttribute('viewBox', '0 0 12 8');
          arrowSvg.style.cssText = `
            display: block;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
          `;
          
          const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          arrowPath.setAttribute('d', 'M6 8L0 0H12L6 8Z');
          arrowPath.setAttribute('fill', 'white');
          
          arrowSvg.appendChild(arrowPath);
          labelDiv.appendChild(labelBox);
          labelDiv.appendChild(arrowSvg);

          // Add click handler to label
          labelDiv.addEventListener('click', () => {
            handlePropertyClick(property);
          });

          // Create overlay for custom HTML
          class PropertyLabel extends window.google.maps.OverlayView {
            position: any;
            div: HTMLElement;

            constructor(position: any, div: HTMLElement) {
              super();
              this.position = position;
              this.div = div;
            }

            onAdd() {
              const panes = this.getPanes();
              panes?.floatPane.appendChild(this.div);
            }

            draw() {
              const projection = this.getProjection();
              if (!projection) return; // Skip if projection is not ready yet
              
              const point = projection.fromLatLngToDivPixel(this.position);
              
              if (point) {
                this.div.style.position = 'absolute';
                this.div.style.left = (point.x - this.div.offsetWidth / 2) + 'px';
                this.div.style.top = (point.y - this.div.offsetHeight) + 'px';
              }
            }

            onRemove() {
              if (this.div.parentNode) {
                this.div.parentNode.removeChild(this.div);
              }
            }
          }

          const propertyLabel = new PropertyLabel(labelPosition, labelDiv);
          propertyLabel.setMap(showDepartmentLabels ? mapInstanceRef.current : null);
          labelsRef.current.push(propertyLabel);
        });
      } else {
        // A property is selected
        
        // First, draw the outer boundary of the selected property (if showPropertyBorders is enabled)
        if (showPropertyBorders) {
          const boundary = getPropertyOuterBoundary(selectedProperty);
          
          const outerPolygon = new window.google.maps.Polygon({
            paths: boundary,
            strokeColor: "#FFFFFF",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "transparent",
            fillOpacity: 0,
            map: mapInstanceRef.current,
          });
          
          polygonsRef.current.push(outerPolygon);
        }
        
        // Then, draw department boundaries if enabled
        if (showDepartmentBoundaries) {
          // Clear the department polygons map
          departmentPolygonsMapRef.current.clear();
          
          selectedProperty.coordinates.forEach((coordinateSet, index) => {
          const departmentNumber = index + 1;
          const isSelected = selectedDepartmentId === departmentNumber;
          
          const polygon = new window.google.maps.Polygon({
            paths: coordinateSet,
            strokeColor: "#FFFFFF",
            strokeOpacity: 1,
            strokeWeight: isSelected ? 3 : 3,
            fillColor: isSelected ? "#FFD700" : "transparent",
            fillOpacity: isSelected ? 0.3 : 0,
            map: mapInstanceRef.current,
          });

          // Save polygon reference in map for hover updates
          departmentPolygonsMapRef.current.set(departmentNumber, polygon);
          console.log('[POLYGON DEBUG] Created LEMESJÖ polygon for department:', departmentNumber);

          // Add hover effect - update polygon directly
          polygon.addListener("mouseover", () => {
            console.log('[POLYGON DEBUG] Mouseover on LEMESJÖ dept:', departmentNumber);
            const isSelected = selectedDepartmentIdRef.current === departmentNumber;
            if (!isSelected) {
              polygon.setOptions({
                strokeWeight: 4,
                fillColor: "#FFD700",
                fillOpacity: 0.15,
              });
            }
            // Update state for drawer hover sync
            setHoveredDepartmentId(departmentNumber);
          });

          polygon.addListener("mouseout", () => {
            console.log('[POLYGON DEBUG] Mouseout on LEMESJÖ dept:', departmentNumber);
            const isSelected = selectedDepartmentIdRef.current === departmentNumber;
            if (!isSelected) {
              polygon.setOptions({
                strokeWeight: 3,
                fillColor: "transparent",
                fillOpacity: 0,
              });
            }
            // Clear hover state for drawer sync
            setHoveredDepartmentId(null);
          });

          // Add click event to zoom to department (for all multi-department properties)
          if (hasMultipleDepartments(selectedProperty)) {
            polygon.addListener("click", (e: any) => {
              console.log('[POLYGON DEBUG] Click on dept:', departmentNumber, 'property:', selectedProperty.name, 'isAdding:', isAddingNoteRef.current, 'isEditing:', editingNoteRef.current);
              if (measureModeRef.current) {
                // Let measure handler deal with it
                return;
              }
              if (isAddingNoteRef.current || editingNoteRef.current) {
                handleNotePlacement(e.latLng);
                return;
              }
              handleDepartmentSelect(selectedProperty.id, departmentNumber);
            });
          }
          
          console.log('[POLYGON DEBUG] Added event listeners for dept:', departmentNumber, 'property:', selectedProperty.name);

          polygonsRef.current.push(polygon);

          // Add numbered labels for all multi-department properties
          if (hasMultipleDepartments(selectedProperty) && coordinateSet.length > 0) {
            // Calculate center of polygon
            const bounds = new window.google.maps.LatLngBounds();
            coordinateSet.forEach((coord) => bounds.extend(coord));
            const center = bounds.getCenter();

            // Create marker with number using AdvancedMarkerElement
            // Use skifte-local department number if available
            const displayLabel = departmentLabelMap.get(departmentNumber) || String(departmentNumber);
            const labelDiv = document.createElement('div');
            labelDiv.textContent = displayLabel;
            labelDiv.style.cssText = 'color: #FFFFFF; font-size: 12px; font-weight: bold; cursor: pointer; text-shadow: 0 1px 3px rgba(0,0,0,0.6);';
            const label = new window.google.maps.marker.AdvancedMarkerElement({
              position: center,
              map: mapInstanceRef.current,
              content: labelDiv,
              gmpClickable: true,
              zIndex: 1000,
            });

            // Make labels clickable too
            label.addEventListener("gmp-click", () => {
              if (measureModeRef.current) {
                return;
              }
              if (isAddingNoteRef.current || editingNoteRef.current) {
                const pos = label.position;
                if (pos) handleNotePlacement(new window.google.maps.LatLng(pos.lat, pos.lng));
                return;
              }
              handleDepartmentSelect(selectedProperty.id, departmentNumber);
            });

            labelsRef.current.push(label);
          }
        });
        }
      }
      
      console.log('[POLYGON DEBUG] drawProperties completed:', {
        polygonsCount: polygonsRef.current.length,
        departmentPolygonsMapSize: departmentPolygonsMapRef.current.size,
        labelsCount: labelsRef.current.length
      });
      
      // Automatically fit bounds to show all properties
      if (!selectedProperty && properties.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        let hasValidBounds = false;
        
        properties.forEach((property) => {
          const boundary = getPropertyOuterBoundary(property);
          boundary.forEach((coord) => {
            bounds.extend(coord);
            hasValidBounds = true;
          });
        });
        
        if (hasValidBounds && mapInstanceRef.current) {
          console.log('[MAP] Fitting bounds to show all properties');
          // Add padding so properties aren't right at the edge
          mapInstanceRef.current.fitBounds(bounds, {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
          });
        }
      }
  };

  useEffect(() => {
    const initMap = () => {
      console.log("Initializing map...", { 
        hasMapRef: !!mapRef.current, 
        hasGoogleMaps: !!window.google?.maps?.Map, 
        hasMapInstance: !!mapInstanceRef.current,
        isLoadingProperties,
        propertiesLength: properties.length 
      });
      
      // Only initialize if we have loaded properties and don't have a map instance yet
      if (mapRef.current && window.google?.maps?.Map && !mapInstanceRef.current && !isLoadingProperties && properties.length > 0) {
        try {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 57.71, lng: 15.4 },
            zoom: 12,
            mapTypeId: mapType,
            mapId: 'holmen_forest_map',
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          });
          
          console.log("Map initialized successfully!");
          setIsMapLoaded(true);
          
          // Initialize info window with offset to position above marker
          // On mobile, position it higher to avoid clipping
          const isMobile = window.innerWidth < 768;
          infoWindowRef.current = new window.google.maps.InfoWindow({
            pixelOffset: new window.google.maps.Size(0, isMobile ? 20 : -40)
          });
          
          // Add listener to clear active polygon when info window closes
          infoWindowRef.current.addListener('closeclick', () => {
            if (activeNotePolygonRef.current) {
              activeNotePolygonRef.current.setMap(null);
              activeNotePolygonRef.current = null;
            }
          });
          
          // Draw all properties on the map
          drawProperties();
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      }
    };

    // Wait for Google Maps to be fully loaded
    const waitForGoogleMaps = () => {
      if (window.google?.maps?.Map && window.google?.maps?.marker?.AdvancedMarkerElement) {
        initMap();
      } else {
        setTimeout(waitForGoogleMaps, 100);
      }
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    
    if (window.google?.maps?.Map) {
      // Google Maps is already loaded
      initMap();
    } else if (!existingScript) {
      // Load Google Maps script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoS_o7b6YFixPfFNOZAU7qNcsyaHPNfHs&libraries=geometry,marker&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps script loaded");
        waitForGoogleMaps();
      };
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
      };
      document.head.appendChild(script);
    } else {
      // Script is loading, wait for it
      const handleLoad = () => {
        console.log("Google Maps script load event fired");
        waitForGoogleMaps();
      };
      existingScript.addEventListener("load", handleLoad);
    }

    return () => {
      // Cleanup markers
      if (userMarkerRef.current) {
        removeMarkerFromMap(userMarkerRef.current);
        userMarkerRef.current = null;
      }
      // Cleanup polygons
      polygonsRef.current.forEach((polygon) => {
        try {
          polygon.setMap(null);
        } catch (e) {
          // Ignore cleanup errors
        }
      });
      polygonsRef.current = [];
      // Cleanup labels
      labelsRef.current.forEach((label) => removeMarkerFromMap(label));
      labelsRef.current = [];
      // Cleanup user marker
      if (userMarkerRef.current) {
        removeMarkerFromMap(userMarkerRef.current);
        userMarkerRef.current = null;
      }
      // Reset state and references
      setIsMapLoaded(false);
      mapInstanceRef.current = null;
    };
  }, [isLoadingProperties, properties]);

  // Redraw properties when filter settings change
  useEffect(() => {
    if (isMapLoaded) {
      console.log('[POLYGON DEBUG] Filter settings changed, redrawing properties');
      drawProperties();
    }
  }, [showPropertyBorders, showDepartmentBoundaries, isMapLoaded, selectedProperty, properties, departmentLabelMap]);

  // Handle Map Clicks for Note Placement
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    const listener = mapInstanceRef.current.addListener("click", (e: any) => {
      // Don't handle clicks if we're in measure mode or note area creation mode
      if (measureModeRef.current || noteCreationModeRef.current) {
        return;
      }
      
      // Don't open drawer if we just clicked a note marker
      if (isNoteClickingRef.current) {
        isNoteClickingRef.current = false;
        return;
      }
      
      if (editingNoteRef.current || isAddingNoteRef.current) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const dept = findDepartmentForLocation(lat, lng);
        
        setEditingNote(prev => {
          if (!prev) return null;
          return { 
            ...prev, 
            coordinates: { lat, lng },
            department: dept
          };
        });
      } else {
        // Default behavior: Open drawer
        window.dispatchEvent(new CustomEvent('openMobileDrawer'));
      }
    });

    return () => {
      window.google.maps.event.removeListener(listener);
    };
  }, [isMapLoaded, selectedProperty, measureMode, noteCreationMode]); // Added measureMode and noteCreationMode dependencies

  // Disable polygon clicks when placing notes or measuring
  useEffect(() => {
    const isPlacingNote = isAddingNote || editingNote !== null;
    const shouldDisablePolygons = isPlacingNote || measureMode !== null || noteCreationMode !== null;
    console.log('[POLYGON CLICKABLE DEBUG] Setting polygon clickable:', !shouldDisablePolygons, 'measureMode:', measureMode, 'polygons:', polygonsRef.current.length, 'deptPolygons:', departmentPolygonsMapRef.current.size);
    polygonsRef.current.forEach((polygon) => {
      if (polygon && typeof polygon.setOptions === 'function') {
        polygon.setOptions({ clickable: !shouldDisablePolygons });
      }
    });
    // Also disable department polygons
    departmentPolygonsMapRef.current.forEach((polygon) => {
      if (polygon && typeof polygon.setOptions === 'function') {
        polygon.setOptions({ clickable: !shouldDisablePolygons });
      }
    });
  }, [isAddingNote, editingNote, measureMode, noteCreationMode]);

  // Disable note marker clicks when placing notes
  useEffect(() => {
    const isPlacingNote = isAddingNote || editingNote !== null;
    noteMarkersRef.current.forEach((marker) => {
      if (marker?.element) {
        marker.element.style.pointerEvents = isPlacingNote ? 'none' : 'auto';
      }
    });
  }, [isAddingNote, editingNote]);

  // Cleanup measurement on unmount
  useEffect(() => {
    return () => {
      console.log('[MEASURE] Component unmounting, cleaning up measurement');
      cleanupMeasurement();
    };
  }, []);

  // Redraw properties when selection changes - DISABLED (using drawProperties function instead)
  useEffect(() => {
    // This useEffect is disabled because drawProperties() handles all property/department rendering
    return;
    
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing polygons and labels
    polygonsRef.current.forEach((polygon) => polygon.setMap(null));
    polygonsRef.current = [];
    labelsRef.current.forEach((label) => removeMarkerFromMap(label));
    labelsRef.current = [];

    // If no property is selected, show only outer boundaries
    if (!selectedProperty) {
      properties.forEach((property) => {
        // For multi-department properties, show outer boundary; for others, show their single polygon
        const boundary = getPropertyOuterBoundary(property);
        
        const polygon = new window.google.maps.Polygon({
          paths: boundary,
          strokeColor: "#FFFFFF",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#FFFFFF",
          fillOpacity: 0.15,
          map: mapInstanceRef.current,
        });

        // Add hover effect
        polygon.addListener("mouseover", () => {
          polygon.setOptions({
            fillOpacity: 0.3,
            strokeWeight: 3,
          });
        });

        polygon.addListener("mouseout", () => {
          polygon.setOptions({
            fillOpacity: 0.15,
            strokeWeight: 2,
          });
        });

        // Add click event
        polygon.addListener("click", (e: any) => {
          if (measureModeRef.current) {
            // Let measure handler deal with it
            return;
          }
          if (isAddingNoteRef.current || editingNoteRef.current) {
            handleNotePlacement(e.latLng);
            return;
          }
          handlePropertyClick(property, e.latLng);
        });

        polygonsRef.current.push(polygon);

        // Add property name label above each property
        const bounds = new window.google.maps.LatLngBounds();
        boundary.forEach((coord) => bounds.extend(coord));
        const center = bounds.getCenter();
        
        // Skip label if center is not available
        if (!center) return;
        
        // Get the highest latitude point (northernmost)
        const maxLat = Math.max(...boundary.map((coord) => coord.lat));
        
        // Position label just above the northernmost point - very close to the border
        const labelPosition = {
          lat: maxLat + 0.0005,
          lng: center.lng()
        };

        // Create custom marker with styled label and arrow pointer
        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          pointer-events: auto;
          z-index: 1000;
        `;
        
        // Create the label box
        const labelBox = document.createElement('div');
        labelBox.style.cssText = `
          background: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #021c20;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        `;
        labelBox.textContent = property.name;
        
        // Create the arrow pointer (triangle)
        const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrowSvg.setAttribute('width', '12');
        arrowSvg.setAttribute('height', '8');
        arrowSvg.setAttribute('viewBox', '0 0 12 8');
        arrowSvg.style.cssText = `
          display: block;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        `;
        
        const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowPath.setAttribute('d', 'M6 8L0 0H12L6 8Z');
        arrowPath.setAttribute('fill', 'white');
        
        arrowSvg.appendChild(arrowPath);
        labelDiv.appendChild(labelBox);
        labelDiv.appendChild(arrowSvg);

        // Add click handler to label
        labelDiv.addEventListener('click', () => {
          handlePropertyClick(property);
        });

        // Create overlay for custom HTML
        class PropertyLabel extends window.google.maps.OverlayView {
          position: any;
          div: HTMLElement;

          constructor(position: any, div: HTMLElement) {
            super();
            this.position = position;
            this.div = div;
          }

          onAdd() {
            const panes = this.getPanes();
            panes?.floatPane.appendChild(this.div);
          }

          draw() {
            const projection = this.getProjection();
            if (!projection) return; // Skip if projection is not ready yet
            
            const point = projection.fromLatLngToDivPixel(this.position);
            
            if (point) {
              this.div.style.position = 'absolute';
              this.div.style.left = (point.x - this.div.offsetWidth / 2) + 'px';
              this.div.style.top = (point.y - this.div.offsetHeight) + 'px';
            }
          }

          onRemove() {
            if (this.div.parentNode) {
              this.div.parentNode.removeChild(this.div);
            }
          }
        }

        const propertyLabel = new PropertyLabel(labelPosition, labelDiv);
        propertyLabel.setMap(showDepartmentLabels ? mapInstanceRef.current : null);
        labelsRef.current.push(propertyLabel);
      });
    } else {
      // A property is selected - show subdivisions if available
      // Clear the department polygons map
      departmentPolygonsMapRef.current.clear();
      
      selectedProperty.coordinates.forEach((coordinateSet, index) => {
        const departmentNumber = index + 1;
        const isSelected = selectedDepartmentId === departmentNumber;
        
        const polygon = new window.google.maps.Polygon({
          paths: coordinateSet,
          strokeColor: "#FFFFFF",
          strokeOpacity: 1,
          strokeWeight: isSelected ? 3 : 3,
          fillColor: isSelected ? "#FFD700" : "#FFFFFF",
          fillOpacity: isSelected ? 0.5 : 0,
          map: mapInstanceRef.current,
        });

        // Save polygon reference in map for hover updates
        departmentPolygonsMapRef.current.set(departmentNumber, polygon);
        console.log('[POLYGON DEBUG] Created Ljustadalen polygon for department:', departmentNumber);

        // Add hover effect - update polygon directly
        polygon.addListener("mouseover", () => {
          console.log('[POLYGON DEBUG] Mouseover on Ljustadalen dept:', departmentNumber);
          const isSelected = selectedDepartmentIdRef.current === departmentNumber;
          if (!isSelected) {
            polygon.setOptions({
              strokeWeight: 4,
              fillColor: "#FFD700",
              fillOpacity: 0.2,
            });
          }
          // Update state for drawer hover sync
          setHoveredDepartmentId(departmentNumber);
        });

        polygon.addListener("mouseout", () => {
          console.log('[POLYGON DEBUG] Mouseout on Ljustadalen dept:', departmentNumber);
          const isSelected = selectedDepartmentIdRef.current === departmentNumber;
          if (!isSelected) {
            polygon.setOptions({
              strokeWeight: 3,
              fillColor: "#FFFFFF",
              fillOpacity: 0,
            });
          }
          // Clear hover state for drawer sync
          setHoveredDepartmentId(null);
        });

        // Add click event to zoom to department
        if (selectedProperty.id === "1") {
          polygon.addListener("click", (e: any) => {
            console.log('[POLYGON DEBUG] Click on Ljustadalen dept:', departmentNumber, 'isAdding:', isAddingNoteRef.current, 'isEditing:', editingNoteRef.current);
            if (measureModeRef.current) {
              // Let measure handler deal with it
              return;
            }
            if (isAddingNoteRef.current || editingNoteRef.current) {
              handleNotePlacement(e.latLng);
              return;
            }
            handleDepartmentSelect(selectedProperty.id, departmentNumber);
          });
        }
        
        console.log('[POLYGON DEBUG] Added event listeners for Ljustadalen dept:', departmentNumber);

        polygonsRef.current.push(polygon);

        // Add numbered labels for LEMESJÖ avdelningar
        if (selectedProperty.id === "1" && coordinateSet.length > 0) {
          // Calculate center of polygon
          const bounds = new window.google.maps.LatLngBounds();
          coordinateSet.forEach((coord) => bounds.extend(coord));
          const center = bounds.getCenter();

          // Create marker with number using AdvancedMarkerElement
          // Use skifte-local department number if available
          const displayLabel = departmentLabelMap.get(departmentNumber) || String(departmentNumber);
          const labelDiv = document.createElement('div');
          labelDiv.textContent = displayLabel;
          labelDiv.style.cssText = 'color: #FFFFFF; font-size: 12px; font-weight: bold; cursor: pointer; text-shadow: 0 1px 3px rgba(0,0,0,0.6);';
          const label = new window.google.maps.marker.AdvancedMarkerElement({
            position: center,
            map: mapInstanceRef.current,
            content: labelDiv,
            gmpClickable: true,
            zIndex: 1000,
          });
          if (!showDepartmentLabels && label.element) {
            label.element.style.display = 'none';
          }

          // Make labels clickable too
          label.addEventListener("gmp-click", () => {
            if (measureModeRef.current) {
              return;
            }
            if (isAddingNoteRef.current || editingNoteRef.current) {
              const pos = label.position;
              if (pos) handleNotePlacement(new window.google.maps.LatLng(pos.lat, pos.lng));
              return;
            }
            handleDepartmentSelect(selectedProperty.id, departmentNumber);
          });

          labelsRef.current.push(label);
        }
      });
    }
  }, [selectedProperty, selectedDepartmentId, showDepartmentLabels, showPropertyBorders, showDepartmentBoundaries, departmentLabelMap]);

  // Handle note click (from list or map marker)
  const handleNoteClick = (note: Note, fromMap = false) => {
    if (!mapInstanceRef.current || !note.coordinates) return;

    // Clear any existing active polygon
    if (activeNotePolygonRef.current) {
      activeNotePolygonRef.current.setMap(null);
      activeNotePolygonRef.current = null;
    }

    // If note has a polygon, show it
    if (note.polygon && note.polygon.length >= 3) {
      const polygon = new window.google.maps.Polygon({
        paths: note.polygon,
        strokeColor: '#FFD700', // Always yellow for visibility
        strokeWeight: 3,
        strokeOpacity: 0.9,
        fillColor: '#FFD700', // Always yellow for visibility
        fillOpacity: 0.25,
        map: mapInstanceRef.current,
        clickable: false,
      });
      activeNotePolygonRef.current = polygon;
    }

    const coordinatesStr = note.coordinates 
      ? `${note.coordinates.lat.toFixed(5)}, ${note.coordinates.lng.toFixed(5)}`
      : "";

    // Detect if mobile viewport
    const isMobile = window.innerWidth < 768;
    
    // Open info window immediately
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(`
        <style>
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap');
          .gm-ui-hover-effect { display: none !important; }
          .gm-style-iw-chr { display: none !important; height: 0 !important; }
          .gm-style-iw-d { overflow: auto !important; padding: 0 !important; margin: 0 !important; max-height: ${isMobile ? '60vh' : 'none'} !important; }
          .gm-style-iw { padding: 0 !important; margin: 0 !important; }
          .gm-style-iw-c { padding: 0 !important; margin: 0 !important; max-width: ${isMobile ? '85vw' : '400px'} !important; border-radius: 0 !important; box-shadow: 0 8px 32px rgba(0,0,0,0.18) !important; }
          .gm-style-iw-t { padding: 0 !important; margin: 0 !important; z-index: 1000 !important; }
          .gm-style-iw-tc { display: none !important; }
          .niw * { font-family: 'IBM Plex Sans', sans-serif !important; box-sizing: border-box; }
          .niw-close:hover { background-color: #f3f4f6 !important; }
          .niw-menu { position: relative; }
          .niw-menu-dropdown { display: none; position: absolute; right: 0; top: 100%; margin-top: 2px; background: white; border: 1px solid #e4e4e4; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 20; }
          .niw-menu-dropdown.open { display: block; }
          .niw-menu-item { display: flex; align-items: center; width: 100%; padding: 8px 16px; border: none; background: none; cursor: pointer; font-size: 14px; transition: background 0.1s; white-space: nowrap; }
          .niw-menu-item:hover { background: #f7f7f7; }
        </style>
        <div class="niw" style="width: ${isMobile ? 'calc(85vw)' : '360px'}; background: white; overflow: hidden;">

          <!-- Top row: badge + department + actions -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 10px 16px; border-bottom: 1px solid #e4e4e4;">
            <div style="display: flex; align-items: center; gap: 8px;">
              ${note.type ? `<span style="font-size: 10px; background: ${note.color === '#5F283F' || note.color === '#D9381E' ? '#FF6E2E' : note.color}; padding: 3px 8px; color: white; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">${(note.type === "Vindfäll" || note.type === "Vindfälle" || note.type === "Viltskada") ? "Skogsskada" : note.type}</span>` : ''}
              <span style="font-size: 13px; color: #555;">${note.department}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 1px; flex-shrink: 0;">
              <button onclick="window.handleToggleResolvedFromMap('${note.id}')" title="${note.resolved ? 'Avmarkera som klar' : 'Markera som klar'}" style="background: none; border: none; cursor: pointer; padding: 6px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                <div style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid #1e3856; background: ${note.resolved ? '#1e3856' : 'white'}; display: flex; align-items: center; justify-content: center;">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="${note.resolved ? 'white' : '#1e3856'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </button>
              <button onclick="window.handleShareNoteFromMap('${note.id}')" title="Dela" style="background: none; border: none; cursor: pointer; padding: 6px; display: flex; align-items: center; justify-content: center; color: #1e3856; border-radius: 50%; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
              </button>
              <div class="niw-menu">
                <button onclick="var d=this.parentElement.querySelector('.niw-menu-dropdown');d.classList.toggle('open')" style="background: none; border: none; cursor: pointer; padding: 6px; display: flex; align-items: center; justify-content: center; color: #1e3856; border-radius: 50%; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
                <div class="niw-menu-dropdown">
                  <button class="niw-menu-item" onclick="window.handleEditNoteFromMap('${note.id}')">Redigera</button>
                  <button class="niw-menu-item" onclick="window.handleDeleteNoteFromMap('${note.id}')">Ta bort</button>
                </div>
              </div>
              <button class="niw-close" onclick="window.handleCloseInfoWindow()" style="background: none; border: none; cursor: pointer; padding: 6px; color: #aaa; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6L18 18"/></svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div style="padding: 12px 16px 16px 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              ${coordinatesStr ? `<div style="display: flex; align-items: center; gap: 5px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span style="font-size: 13px; color: #888;">${coordinatesStr}</span></div>` : '<div></div>'}
              <span style="font-size: 13px; color: #888; flex-shrink: 0;">${note.date}</span>
            </div>
            <h3 style="font-size: 17px; font-weight: 700; color: #0f233b; margin: 0 0 ${note.comment ? '8px' : '0'} 0; line-height: 1.3;">${note.title}</h3>
            ${note.comment ? `<p style="margin: 0; font-size: 14px; color: #444; line-height: 1.5;">${note.comment}</p>` : ''}
          </div>

        </div>
      `);
      infoWindowRef.current.setPosition(note.coordinates);
      infoWindowRef.current.open(mapInstanceRef.current);
    }

    // Smooth pan transition (no zoom change)
    mapInstanceRef.current.panTo(note.coordinates);
  };

  // Draw notes on the map
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !isMapLoaded) return;

    // Clear existing note markers
    noteMarkersRef.current.forEach((marker) => removeMarkerFromMap(marker));
    noteMarkersRef.current = [];
    noteMarkersMapRef.current.clear();

    // Only show notes if a property is selected
    if (!selectedProperty) return;

    notes.forEach((note) => {
      if (!note.coordinates) return;
      // Hide note if it's being edited (we show a draggable marker instead)
      if (editingNote && note.id === editingNote.id) return;
      
      // Notes are already filtered by property via getNotes(propertyId)
      // No need for additional filtering here - all notes belong to selectedProperty 

      // Build SVG marker icon using shared lucide-based builder
      const svgIcon = buildNoteIconSVG(note.type, note.color);

      // Create DOM content for AdvancedMarkerElement
      const markerContent = document.createElement('div');
      markerContent.innerHTML = svgIcon;
      markerContent.style.cssText = 'width: 32px; height: 37px; cursor: pointer;';
      const markerImg = markerContent.querySelector('svg');
      if (markerImg) {
        markerImg.setAttribute('width', '32');
        markerImg.setAttribute('height', '37');
      }

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: note.coordinates,
        map: mapInstanceRef.current,
        title: note.title,
        content: markerContent,
        gmpClickable: true,
        zIndex: 2000,
      });
      const hiddenByResolved = note.resolved && !showResolvedNotes;
      if ((!showNoteMarkers || hiddenByResolved) && marker.element) {
        marker.element.style.display = 'none';
      }

      marker.addEventListener("gmp-click", (e: any) => {
        // Don't handle note clicks when in measure mode
        if (measureModeRef.current) return;
        
        // Set flag to prevent map click from opening drawer
        isNoteClickingRef.current = true;
        
        handleNoteClick(note, true);
      });

      // Add hover listeners on the marker content for map-based hover effect
      markerContent.addEventListener('mouseenter', () => {
        if (measureModeRef.current) return;
        setHoveredNoteId(note.id);
      });
      markerContent.addEventListener('mouseleave', () => {
        setHoveredNoteId(null);
      });

      marker.noteId = note.id;
      noteMarkersRef.current.push(marker);
      // Store marker with original SVG for restoration
      noteMarkersMapRef.current.set(note.id, { 
        marker, 
        note,
        originalSvg: svgIcon,
        originalSize: { width: 32, height: 37 },
      });
    });
  }, [isMapLoaded, notes, selectedProperty, editingNote, showNoteMarkers, showResolvedNotes]);

  // Handle note hover effect
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !isMapLoaded) return;

    // Restore previously hovered marker to original state
    if (previouslyHoveredNoteIdRef.current) {
      const previousNoteData = noteMarkersMapRef.current.get(previouslyHoveredNoteIdRef.current);
      if (previousNoteData && previousNoteData.marker.content) {
        const content = previousNoteData.marker.content as HTMLElement;
        content.innerHTML = previousNoteData.originalSvg;
        content.style.cssText = `width: ${previousNoteData.originalSize.width}px; height: ${previousNoteData.originalSize.height}px; cursor: pointer;`;
        const svg = content.querySelector('svg');
        if (svg) { svg.setAttribute('width', String(previousNoteData.originalSize.width)); svg.setAttribute('height', String(previousNoteData.originalSize.height)); }
        previousNoteData.marker.zIndex = 2000;
      }
    }

    // Clear any existing hover polygon
    if (hoveredNotePolygonRef.current) {
      hoveredNotePolygonRef.current.setMap(null);
      hoveredNotePolygonRef.current = null;
    }

    if (!hoveredNoteId) {
      previouslyHoveredNoteIdRef.current = null;
      return;
    }

    const noteData = noteMarkersMapRef.current.get(hoveredNoteId);
    if (!noteData) return;

    const { marker, note } = noteData;
    previouslyHoveredNoteIdRef.current = hoveredNoteId;

    // Build hover SVG using shared lucide-based builder (same icon, size applied separately)
    const svgIcon = buildNoteIconSVG(note.type, note.color);

    // Update marker content for hover (larger)
    if (marker.content) {
      const content = marker.content as HTMLElement;
      content.innerHTML = svgIcon;
      content.style.cssText = 'width: 40px; height: 46px; cursor: pointer;';
      const svg = content.querySelector('svg');
      if (svg) { svg.setAttribute('width', '40'); svg.setAttribute('height', '46'); }
    }
    marker.zIndex = 3000; // Bring to front

    // If note has polygon, show it with highlight (always yellow for visibility)
    if (note.polygon && note.polygon.length >= 3) {
      const polygon = new window.google.maps.Polygon({
        paths: note.polygon,
        strokeColor: '#FFD700', // Always yellow for visibility
        strokeWeight: 4,
        strokeOpacity: 1,
        fillColor: '#FFD700', // Always yellow for visibility
        fillOpacity: 0.35,
        map: mapInstanceRef.current,
        clickable: false,
      });
      hoveredNotePolygonRef.current = polygon;
    }
  }, [hoveredNoteId, isMapLoaded]);

  // Draw draggable marker for the note being edited/created
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !editingNote?.coordinates) return;

    // Create SVG icon string (Pointy marker for placement)
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${editingNote.color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `.replace(/\n/g, '').trim();

    // Create DOM content for draggable AdvancedMarkerElement
    const markerContent = document.createElement('div');
    markerContent.innerHTML = svgIcon;
    markerContent.style.cssText = 'width: 32px; height: 37px; cursor: grab;';
    const markerSvg = markerContent.querySelector('svg');
    if (markerSvg) {
      markerSvg.setAttribute('width', '32');
      markerSvg.setAttribute('height', '37');
    }

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: editingNote.coordinates,
      map: mapInstanceRef.current,
      gmpDraggable: true,
      title: "Dra för att flytta",
      content: markerContent,
      zIndex: 3000,
    });

    marker.addEventListener("gmp-dragend", () => {
      const pos = marker.position as any;
      const lat = typeof pos.lat === 'function' ? pos.lat() : pos.lat;
      const lng = typeof pos.lng === 'function' ? pos.lng() : pos.lng;
      const dept = findDepartmentForLocation(lat, lng);
      setEditingNote(prev => prev ? ({ ...prev, coordinates: { lat, lng }, department: dept }) : null);
    });

    return () => {
      marker.map = null;
    };
  }, [isMapLoaded, editingNote?.coordinates?.lat, editingNote?.coordinates?.lng, editingNote?.color, selectedProperty]); // Added selectedProperty dependency

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 11;
      mapInstanceRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 11;
      mapInstanceRef.current.setZoom(currentZoom - 1);
    }
  };

  const handleCenterOnUser = () => {
    if (!mapInstanceRef.current) {
      toast.error("Kartan är inte laddad än");
      return;
    }

    // Get current center of the map
    const currentCenter = mapInstanceRef.current.getCenter();
    const pos = {
      lat: currentCenter.lat(),
      lng: currentCenter.lng(),
    };

    // Remove old marker if exists
    if (userMarkerRef.current) {
      removeMarkerFromMap(userMarkerRef.current);
    }

    // Add marker at center of the map using AdvancedMarkerElement
    const dotDiv = document.createElement('div');
    dotDiv.style.cssText = 'width: 20px; height: 20px; border-radius: 50%; background: #4285F4; border: 3px solid #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.3);';
    userMarkerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
      position: pos,
      map: mapInstanceRef.current,
      title: "Illustration av position",
      content: dotDiv,
    });

    toast.success("Positionsmarkör placerad!", {
      description: "Markören visar kartans centrum"
    });
  };

  const handleResetNorth = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setHeading(0);
    }
  };

  const handlePropertyClick = (property: Property, latLng?: any) => {
    // If the same property is already selected, do nothing
    if (selectedProperty?.id === property.id) {
      return;
    }
    
    setSelectedProperty(property);
    setSelectedDepartmentId(null);

    // Fit map to property bounds
    if (mapInstanceRef.current) {
      const boundary = property.id === "1" ? lemesjoOuterBoundary : property.coordinates[0];
      const bounds = new window.google.maps.LatLngBounds();
      boundary.forEach((coord) => bounds.extend(coord));
      mapInstanceRef.current.fitBounds(bounds, 50); // 50px padding
    }

    toast.success(`Fastighet vald: ${property.name}`);
  };

  const handleDepartmentSelect = (propertyId: string, departmentId: number) => {
    console.log('[POLYGON DEBUG] handleDepartmentSelect called:', { propertyId, departmentId, autoZoom: autoZoomToDepartmentRef.current });
    console.log('[POLYGON DEBUG] departmentPolygonsMapRef size:', departmentPolygonsMapRef.current.size);
    
    // Clear any active polygon from clicked notes
    if (activeNotePolygonRef.current) {
      activeNotePolygonRef.current.setMap(null);
      activeNotePolygonRef.current = null;
    }
    
    const property = properties.find(p => p.id === propertyId);
    if (!property || !hasMultipleDepartments(property)) return; // Only multi-department properties
    
    setSelectedDepartmentId(departmentId);
    
    // Only zoom if autoZoomToDepartment is enabled
    if (autoZoomToDepartmentRef.current) {
      // Get the specific department coordinates (0-indexed)
      const departmentCoords = property.coordinates[departmentId - 1];
      if (departmentCoords && mapInstanceRef.current) {
        // Fit map to department bounds
        const bounds = new window.google.maps.LatLngBounds();
        departmentCoords.forEach((coord: any) => bounds.extend(coord));
        mapInstanceRef.current.fitBounds(bounds, 30); // 30px padding
      }
    }
    
    const deptDisplayNum = departmentLabelMap.get(departmentId) || String(departmentId);
    toast.success(`Avdelning ${deptDisplayNum} vald`);
  };

  const handlePropertySelect = (property: Property) => {
    handlePropertyClick(property);
  };

  const handleExitProperty = () => {
    setSelectedProperty(null);
    setSelectedDepartmentId(null);
    
    // Reset map to overview
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: 57.71, lng: 15.4 });
      mapInstanceRef.current.setZoom(12);
    }
    
    toast.success("Tillbaka till översikt");
  };

  const handleDepartmentDeselect = () => {
    // Zoom out from department to property view
    if (selectedProperty && mapInstanceRef.current) {
      setSelectedDepartmentId(null);
      const boundary = selectedProperty.id === "1" ? lemesjoOuterBoundary : selectedProperty.coordinates[0];
      const bounds = new window.google.maps.LatLngBounds();
      boundary.forEach((coord) => bounds.extend(coord));
      mapInstanceRef.current.fitBounds(bounds, 50); // 50px padding
      toast.success("Tillbaka till fastigheten");
    }
  };

  const handleDepartmentHover = (departmentId: number | null) => {
    console.log('[POLYGON DEBUG] handleDepartmentHover called:', { departmentId, propertyId: selectedProperty?.id });
    
    // Update state for drawer sync
    setHoveredDepartmentId(departmentId);
    
    // Update polygon directly
    if (!selectedProperty) return;
    
    console.log('[POLYGON DEBUG] Updating hover styles, map size:', departmentPolygonsMapRef.current.size);
    
    departmentPolygonsMapRef.current.forEach((polygon, departmentNumber) => {
      try {
        const isSelected = selectedDepartmentIdRef.current === departmentNumber;
        const isHovered = departmentId === departmentNumber;
        
        if (isSelected) return; // Don't change selected polygon
        
        if (selectedProperty.id === "1") {
          // LEMESJÖ styling
          polygon.setOptions({
            strokeWeight: isHovered ? 4 : 3,
            fillColor: isHovered ? "#FFD700" : "transparent",
            fillOpacity: isHovered ? 0.15 : 0,
          });
        } else {
          // Ljustadalen styling
          polygon.setOptions({
            strokeWeight: isHovered ? 4 : 3,
            fillColor: isHovered ? "#FFD700" : "#FFFFFF",
            fillOpacity: isHovered ? 0.2 : 0,
          });
        }
      } catch (e) {
        console.error('[POLYGON DEBUG] Failed to update polygon on hover:', e);
      }
    });
  };

  const handleHighlightDepartments = (departmentIds: number[]) => {
    console.log('[POLYGON DEBUG] handleHighlightDepartments called:', departmentIds);
    setHighlightedDepartmentIds(departmentIds);
    
    if (!selectedProperty) return;
    
    departmentPolygonsMapRef.current.forEach((polygon, departmentNumber) => {
      try {
        const isSelected = selectedDepartmentIdRef.current === departmentNumber;
        const isHighlighted = departmentIds.includes(departmentNumber);
        
        if (isSelected) return; // Don't change selected polygon
        
        if (departmentIds.length > 0) {
          // When filters are active: highlight matching, dim others
          if (selectedProperty.id === "1") {
            polygon.setOptions({
              strokeWeight: isHighlighted ? 4 : 2,
              fillColor: isHighlighted ? "#FFD700" : "transparent",
              fillOpacity: isHighlighted ? 0.25 : 0,
              strokeOpacity: isHighlighted ? 1 : 0.3,
            });
          } else {
            polygon.setOptions({
              strokeWeight: isHighlighted ? 4 : 2,
              fillColor: isHighlighted ? "#FFD700" : "#FFFFFF",
              fillOpacity: isHighlighted ? 0.25 : 0,
              strokeOpacity: isHighlighted ? 1 : 0.3,
            });
          }
        } else {
          // No filters active: reset all to default
          if (selectedProperty.id === "1") {
            polygon.setOptions({
              strokeWeight: 3,
              fillColor: "transparent",
              fillOpacity: 0,
              strokeOpacity: 1,
            });
          } else {
            polygon.setOptions({
              strokeWeight: 3,
              fillColor: "#FFFFFF",
              fillOpacity: 0,
              strokeOpacity: 1,
            });
          }
        }
      } catch (e) {
        console.error('[POLYGON DEBUG] Failed to update polygon highlight:', e);
      }
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleStartAddNote = () => {
    setShowNoteTypeDialog(true);
  };

  const handleNoteTypeChange = (type: 'point' | 'area') => {
    console.log('=== SWITCHING NOTE TYPE ===', type, 'isAddingNote:', isAddingNote, 'editingNote:', editingNote?.id);
    
    // Clean up existing state first
    if (noteCreationModeRef.current === 'area') {
      // Cleanup area mode
      if (noteAreaListenerRef.current) {
        window.google.maps.event.removeListener(noteAreaListenerRef.current);
        noteAreaListenerRef.current = null;
      }
      if (noteAreaMouseMoveListenerRef.current) {
        window.google.maps.event.removeListener(noteAreaMouseMoveListenerRef.current);
        noteAreaMouseMoveListenerRef.current = null;
      }
      noteAreaMarkersRef.current.forEach(marker => removeMarkerFromMap(marker));
      noteAreaMarkersRef.current = [];
      if (noteAreaPolygonRef.current) {
        noteAreaPolygonRef.current.setMap(null);
        noteAreaPolygonRef.current = null;
      }
      setNoteAreaPoints([]);
      noteAreaPointsRef.current = [];
    }
    
    // Clear any active polygon from clicked notes
    if (activeNotePolygonRef.current) {
      activeNotePolygonRef.current.setMap(null);
      activeNotePolygonRef.current = null;
    }
    
    // Switch to new type
    if (type === 'point') {
      setNoteCreationMode(null);
      noteCreationModeRef.current = null;
      
      // If editing a note, keep existing data — don't clear polygon
      if (editingNote) {
        if (!editingNote.coordinates) {
          toast.info("Klicka på kartan för att placera anteckningen");
        }
      }
    } else {
      setNoteCreationMode('area');
      noteCreationModeRef.current = 'area';
      setNoteAreaPoints([]);
      noteAreaPointsRef.current = [];
      
      // Keep existing data — don't clear coordinates
      
      toast.info("Klicka på kartan för att markera en yta. Tryck ESC för att spara.");
      
      // Add click listener to map
      if (mapInstanceRef.current) {
        noteAreaListenerRef.current = mapInstanceRef.current.addListener('click', (e: any) => {
          handleNoteAreaClick(e.latLng);
        });
        
        // Add mousemove listener
        noteAreaMouseMoveListenerRef.current = mapInstanceRef.current.addListener('mousemove', (e: any) => {
          handleNoteAreaMouseMove(e.latLng);
        });
      }
    }
  };

  const handleSelectNoteType = (type: 'point' | 'area') => {
    console.log('=== STARTING NOTE CREATION ===', type);
    
    setShowNoteTypeDialog(false);
    
    // Clear any active polygon from clicked notes
    if (activeNotePolygonRef.current) {
      activeNotePolygonRef.current.setMap(null);
      activeNotePolygonRef.current = null;
    }
    
    if (type === 'point') {
      // Traditional point-based note creation
      setIsAddingNote(true);
      setEditingNote({
        id: Date.now().toString(),
        title: "",
        department: "",
        type: "Generell",
        color: "#1E3856",
        category: "Övrigt",
        comment: "",
        date: new Date().toLocaleDateString("sv-SE", { day: 'numeric', month: 'short', year: 'numeric' }),
      } as Note);
      toast.info("Klicka på kartan för att placera anteckningen");
    } else {
      // Area-based note creation - similar to measure area
      setNoteCreationMode('area');
      noteCreationModeRef.current = 'area';
      setNoteAreaPoints([]);
      noteAreaPointsRef.current = [];
      
      toast.info("Klicka på kartan för att markera en yta. Tryck ESC för att spara.");
      
      // Close any open InfoWindow
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      
      // Add click listener to map
      if (mapInstanceRef.current) {
        console.log('=== Adding note area click listener ===');
        noteAreaListenerRef.current = mapInstanceRef.current.addListener('click', (e: any) => {
          handleNoteAreaClick(e.latLng);
        });
        
        // Add mousemove listener
        noteAreaMouseMoveListenerRef.current = mapInstanceRef.current.addListener('mousemove', (e: any) => {
          handleNoteAreaMouseMove(e.latLng);
        });
      }
    }
  };

  const handleEditNoteStart = (note: Note) => {
    // Clear any active polygon from clicked notes
    if (activeNotePolygonRef.current) {
      activeNotePolygonRef.current.setMap(null);
      activeNotePolygonRef.current = null;
    }
    
    setIsAddingNote(false);
    setEditingNote(note);
    
    // If the note has a polygon, set up area editing mode (but don't activate drawing)
    if (note.polygon && note.polygon.length > 0) {
      // Don't set noteCreationMode to 'area' yet - only when user clicks the "Område" button
      // Just make sure the polygon data is available for rendering
      console.log('[EDIT NOTE] Note has polygon with', note.polygon.length, 'points');
    }
  };

  const handleShareNote = (note: Note) => {
    const normalizedType = (note.type === "Vindfäll" || note.type === "Vindfälle" || note.type === "Viltskada") ? "Skogsskada" : note.type;
    const normalizedColor = note.color === '#5F283F' || note.color === '#D9381E' ? '#FF6E2E' : note.color;
    setShareNoteData({
      id: note.id,
      title: note.title,
      type: normalizedType,
      department: note.department,
      color: normalizedColor,
      date: note.date,
      comment: note.comment,
    });
  };

  const handleSaveNote = async (noteData: Partial<Note>) => {
    if (!editingNote || !selectedProperty) return;
    
    const updatedNote = { ...editingNote, ...noteData, propertyId: selectedProperty.id } as Note;
    
    // Check if note has either coordinates (point) or polygon (area)
    if (!updatedNote.coordinates && !updatedNote.polygon) {
      toast.error("Du måste placera anteckningen på kartan");
      return;
    }

    setIsSaving(true);
    try {
      if (isAddingNote) {
        const savedNote = await notesApi.createNote(updatedNote);
        setNotes(prev => [...prev, savedNote]);
        toast.success("Anteckning skapad");
      } else {
        const savedNote = await notesApi.updateNote(updatedNote);
        setNotes(prev => prev.map(n => n.id === savedNote.id ? savedNote : n));
        toast.success("Anteckning uppdaterad");
      }
      
      // Clean up any temporary area marking visuals
      noteAreaMarkersRef.current.forEach(marker => removeMarkerFromMap(marker));
      noteAreaMarkersRef.current = [];
      
      if (noteAreaPolygonRef.current) {
        noteAreaPolygonRef.current.setMap(null);
        noteAreaPolygonRef.current = null;
      }
      
      setNoteAreaPoints([]);
      noteAreaPointsRef.current = [];
      
      setEditingNote(null);
      setIsAddingNote(false);
    } catch (error) {
      console.error('Failed to save note:', error);
      toast.error("Kunde inte spara anteckning");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelNote = () => {
    // Clean up any area marking visuals if they exist
    noteAreaMarkersRef.current.forEach(marker => removeMarkerFromMap(marker));
    noteAreaMarkersRef.current = [];
    
    if (noteAreaPolygonRef.current) {
      noteAreaPolygonRef.current.setMap(null);
      noteAreaPolygonRef.current = null;
    }
    
    setNoteAreaPoints([]);
    noteAreaPointsRef.current = [];
    
    setEditingNote(null);
    setIsAddingNote(false);
  };

  const handleToggleResolved = async (note: Note) => {
    const updated = { ...note, resolved: !note.resolved };
    try {
      const savedNote = await notesApi.updateNote(updated);
      setNotes(prev => prev.map(n => n.id === savedNote.id ? savedNote : n));
      toast.success(savedNote.resolved ? "Anteckning klarmarkerad" : "Klarmarkering borttagen");
    } catch {
      toast.error("Kunde inte uppdatera anteckning");
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!selectedProperty) return;

    setIsDeleting(true);
    try {
      await notesApi.deleteNote(selectedProperty.id, id);
      setNotes(prev => prev.filter(n => n.id !== id));
      setEditingNote(null);
      setIsAddingNote(false);
      toast.success("Anteckning borttagen");
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error("Kunde inte ta bort anteckning");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNoteAreaMouseMove = (latLng: google.maps.LatLng) => {
    if (!latLng) return;
    if (!noteCreationModeRef.current) return;
    
    const currentPoint = { lat: latLng.lat(), lng: latLng.lng() };
    const points = noteAreaPointsRef.current;
    
    // Only show trail when we have at least one point
    if (points.length > 0) {
      const trailPath = [...points, currentPoint];
      
      if (points.length >= 2) {
        // Show polygon trail when we have enough points
        if (noteAreaTrailPolygonRef.current) {
          noteAreaTrailPolygonRef.current.setPaths(trailPath);
        } else {
          noteAreaTrailPolygonRef.current = new window.google.maps.Polygon({
            paths: trailPath,
            strokeColor: '#FFD700',
            strokeWeight: 2,
            strokeOpacity: 0.7,
            fillColor: '#FFD700',
            fillOpacity: 0.15,
            map: mapInstanceRef.current,
            zIndex: 50,
            clickable: false,
          });
        }
      } else if (points.length === 1) {
        // Show line trail between first point and cursor
        if (noteAreaTrailLineRef.current) {
          noteAreaTrailLineRef.current.setPath(trailPath);
        } else {
          noteAreaTrailLineRef.current = new window.google.maps.Polyline({
            path: trailPath,
            strokeColor: '#FFD700',
            strokeWeight: 2,
            strokeOpacity: 0.7,
            icons: [{
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 2
              },
              offset: '0',
              repeat: '10px'
            }],
            map: mapInstanceRef.current,
            zIndex: 50,
            clickable: false,
          });
        }
      }
    }
  };

  const handleNoteAreaClick = (latLng: google.maps.LatLng) => {
    const point = { lat: latLng.lat(), lng: latLng.lng() };
    const newPoints = [...noteAreaPointsRef.current, point];
    setNoteAreaPoints(newPoints);
    noteAreaPointsRef.current = newPoints;
    
    // Add marker using AdvancedMarkerElement
    const dotDiv = document.createElement('div');
    dotDiv.style.cssText = 'width: 12px; height: 12px; border-radius: 50%; background: #1e3856; border: 2px solid white; pointer-events: none;';
    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: point,
      map: mapInstanceRef.current,
      content: dotDiv,
    });
    noteAreaMarkersRef.current.push(marker);
    
    // Update polygon
    if (newPoints.length >= 2) {
      if (noteAreaPolygonRef.current) {
        noteAreaPolygonRef.current.setMap(null);
      }
      
      // Remove trail line (used for first point) now that we have a polygon
      if (noteAreaTrailLineRef.current) {
        noteAreaTrailLineRef.current.setMap(null);
        noteAreaTrailLineRef.current = null;
      }
      
      noteAreaPolygonRef.current = new window.google.maps.Polygon({
        paths: newPoints,
        strokeColor: '#FFD700',
        strokeWeight: 3,
        strokeOpacity: 0.9,
        fillColor: '#FFD700',
        fillOpacity: 0.25,
        map: mapInstanceRef.current,
        clickable: false,
      });
    }
  };

  const cleanupNoteAreaCreation = () => {
    // Remove listeners
    if (noteAreaListenerRef.current) {
      window.google.maps.event.removeListener(noteAreaListenerRef.current);
      noteAreaListenerRef.current = null;
    }
    if (noteAreaMouseMoveListenerRef.current) {
      window.google.maps.event.removeListener(noteAreaMouseMoveListenerRef.current);
      noteAreaMouseMoveListenerRef.current = null;
    }
    
    // Remove markers
    noteAreaMarkersRef.current.forEach(marker => removeMarkerFromMap(marker));
    noteAreaMarkersRef.current = [];
    
    // Remove polygons and lines
    if (noteAreaPolygonRef.current) {
      noteAreaPolygonRef.current.setMap(null);
      noteAreaPolygonRef.current = null;
    }
    if (noteAreaTrailLineRef.current) {
      noteAreaTrailLineRef.current.setMap(null);
      noteAreaTrailLineRef.current = null;
    }
    if (noteAreaTrailPolygonRef.current) {
      noteAreaTrailPolygonRef.current.setMap(null);
      noteAreaTrailPolygonRef.current = null;
    }
    
    // Reset state
    setNoteCreationMode(null);
    noteCreationModeRef.current = null;
    setNoteAreaPoints([]);
    noteAreaPointsRef.current = [];
  };

  const handleFinishNoteArea = () => {
    if (noteAreaPointsRef.current.length < 3) {
      toast.error("Du måste markera minst 3 punkter för att skapa en yta");
      return;
    }
    
    const polygon = noteAreaPointsRef.current;
    const dept = findDepartmentForLocation(polygon[0].lat, polygon[0].lng);
    
    // Remove listeners but KEEP the polygon and markers visible
    if (noteAreaListenerRef.current) {
      window.google.maps.event.removeListener(noteAreaListenerRef.current);
      noteAreaListenerRef.current = null;
    }
    if (noteAreaMouseMoveListenerRef.current) {
      window.google.maps.event.removeListener(noteAreaMouseMoveListenerRef.current);
      noteAreaMouseMoveListenerRef.current = null;
    }
    
    // Remove only the trail elements (not the main polygon and markers)
    if (noteAreaTrailLineRef.current) {
      noteAreaTrailLineRef.current.setMap(null);
      noteAreaTrailLineRef.current = null;
    }
    if (noteAreaTrailPolygonRef.current) {
      noteAreaTrailPolygonRef.current.setMap(null);
      noteAreaTrailPolygonRef.current = null;
    }
    
    // End note creation mode but keep visual elements
    setNoteCreationMode(null);
    noteCreationModeRef.current = null;
    
    // Update existing note with polygon OR create new note
    if (editingNote) {
      // Update existing note (switching from point to area, or editing an existing area note)
      setEditingNote({
        ...editingNote,
        department: dept,
        polygon: polygon,
        coordinates: polygon[0], // Use first point as reference coordinate
      });
      toast.success("Yta markerad! Fyll i anteckningsdetaljer.");
    } else {
      // Create new note with polygon
      setIsAddingNote(true);
      setEditingNote({
        id: Date.now().toString(),
        title: "",
        department: dept,
        type: "Generell",
        color: "#1E3856",
        category: "Övrigt",
        comment: "",
        date: new Date().toLocaleDateString("sv-SE", { day: 'numeric', month: 'short', year: 'numeric' }),
        polygon: polygon,
        coordinates: polygon[0], // Use first point as reference coordinate
      } as Note);
      toast.success("Yta markerad! Fyll i anteckningsdetaljer.");
    }
  };

  const handleMapClick = () => {
    // Don't open drawer if we just clicked a note marker
    if (isNoteClickingRef.current) {
      isNoteClickingRef.current = false;
      return;
    }
    
    // Dispatch event to open mobile drawer if it's closed
    window.dispatchEvent(new CustomEvent('openMobileDrawer'));
  };

  // Cleanup measurement on unmount
  useEffect(() => {
    return () => {
      if (measureListenerRef.current) {
        window.google.maps.event.removeListener(measureListenerRef.current);
      }
      if (measureMouseMoveListenerRef.current) {
        window.google.maps.event.removeListener(measureMouseMoveListenerRef.current);
      }
      if (measureLineRef.current) {
        measureLineRef.current.setMap(null);
      }
      if (measureTrailLineRef.current) {
        measureTrailLineRef.current.setMap(null);
      }
      if (measureTrailPolygonRef.current) {
        measureTrailPolygonRef.current.setMap(null);
      }
      if (measurePolygonRef.current) {
        measurePolygonRef.current.setMap(null);
      }
      measureMarkersRef.current.forEach(marker => removeMarkerFromMap(marker));
      if (measureLabelOverlayRef.current) {
        measureLabelOverlayRef.current.setMap(null);
      }
      if (measureFixedLabelOverlayRef.current) {
        measureFixedLabelOverlayRef.current.setMap(null);
      }
    };
  }, []);

  const handleStartMeasure = () => {
    setShowMeasureDialog(true);
  };

  const handleSelectMeasureMode = (mode: 'distance' | 'area') => {
    console.log('=== STARTING NEW MEASUREMENT ===', mode);
    
    // Clean up EVERYTHING first to avoid conflicts
    cleanupMeasurement();
    
    // Now set the new mode
    setMeasureMode(mode);
    measureModeRef.current = mode;
    setShowMeasureDialog(false);
    setMeasurePoints([]);
    measurePointsRef.current = [];
    
    toast.info(mode === 'distance' ? 'Klicka på kartan för att mäta avstånd. Tryck ESC för att behålla mätningen och starta en ny.' : 'Klicka på kartan för att mäta yta. Tryck ESC f��r att behålla mätningen och starta en ny.');
    
    // Close any open InfoWindow
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
    
    // Add click listener to map
    if (mapInstanceRef.current) {
      console.log('=== Adding NEW measure click listener for mode:', mode, '===');
      measureListenerRef.current = mapInstanceRef.current.addListener('click', (e: any) => {
        console.log('🔵 [MEASURE CLICK] Event received at listener!', {
          lat: e.latLng?.lat(),
          lng: e.latLng?.lng(),
          mode: measureModeRef.current
        });
        handleMeasureClick(e.latLng);
      });
      
      // Add mousemove listener for distance and area modes
      if (mode === 'distance' || mode === 'area') {
        console.log('Adding NEW mousemove listener');
        measureMouseMoveListenerRef.current = mapInstanceRef.current.addListener('mousemove', (e: any) => {
          handleMeasureMouseMove(e.latLng, e.domEvent);
        });
        console.log('Mousemove listener added');
      }
    }
  };

  const handleMeasureMouseMove = (latLng: google.maps.LatLng, domEvent: MouseEvent) => {
    if (!latLng) return;
    if (!measureModeRef.current) return; // Don't do anything if not in measure mode
    
    const currentPoint = { lat: latLng.lat(), lng: latLng.lng() };
    const points = measurePointsRef.current;
    
    // Only show trail line/polygon when we have at least one point
    if (points.length > 0) {
      const trailPath = [...points, currentPoint];
      
      if (measureModeRef.current === 'distance') {
        // For distance mode: show yellow dashed trail line
        if (measureTrailLineRef.current) {
          measureTrailLineRef.current.setPath(trailPath);
        } else {
          measureTrailLineRef.current = new window.google.maps.Polyline({
            path: trailPath,
            strokeColor: '#FFD700',
            strokeWeight: 2,
            strokeOpacity: 0.7,
            icons: [{
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 2
              },
              offset: '0',
              repeat: '10px'
            }],
            map: mapInstanceRef.current,
            zIndex: 50,
            clickable: false,
          });
          console.log('[MEASURE] Created trail line (yellow dashed)');
        }
      } else if (measureModeRef.current === 'area') {
        // For area mode: show yellow trail line/polygon
        if (points.length >= 2) {
          // Show polygon trail when we have enough points
          if (measureTrailPolygonRef.current) {
            measureTrailPolygonRef.current.setPaths(trailPath);
          } else {
            measureTrailPolygonRef.current = new window.google.maps.Polygon({
              paths: trailPath,
              strokeColor: '#FFD700',
              strokeWeight: 2,
              strokeOpacity: 0.7,
              fillColor: '#FFD700',
              fillOpacity: 0.15,
              map: mapInstanceRef.current,
              zIndex: 50,
              clickable: false,
            });
            console.log('[MEASURE] Created trail polygon (yellow)');
          }
        } else if (points.length === 1) {
          // Show line trail between first point and cursor
          if (measureTrailLineRef.current) {
            measureTrailLineRef.current.setPath(trailPath);
          } else {
            measureTrailLineRef.current = new window.google.maps.Polyline({
              path: trailPath,
              strokeColor: '#FFD700',
              strokeWeight: 2,
              strokeOpacity: 0.7,
              icons: [{
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 2
                },
                offset: '0',
                repeat: '10px'
              }],
              map: mapInstanceRef.current,
              zIndex: 50,
              clickable: false,
            });
            console.log('[MEASURE] Created trail line for area mode (yellow dashed)');
          }
        }
      }
      
      // Calculate distances
      let totalDistance = 0;
      for (let i = 0; i < points.length - 1; i++) {
        const from = new window.google.maps.LatLng(points[i].lat, points[i].lng);
        const to = new window.google.maps.LatLng(points[i + 1].lat, points[i + 1].lng);
        totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
      }
      
      // Distance from last point to cursor
      const lastPoint = points[points.length - 1];
      const from = new window.google.maps.LatLng(lastPoint.lat, lastPoint.lng);
      const to = new window.google.maps.LatLng(currentPoint.lat, currentPoint.lng);
      const segmentDistance = window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
      
      totalDistance += segmentDistance;
      
      // Format distances
      const formatDistance = (dist: number) => {
        if (dist < 1000) {
          return `${Math.round(dist)} m`;
        } else {
          return `${(dist / 1000).toFixed(2)} km`;
        }
      };
      
      // Format content for overlay label based on mode
      let content = '';
      if (measureModeRef.current === 'distance') {
        content = points.length === 1 
          ? `${formatDistance(segmentDistance)}`
          : `${formatDistance(totalDistance)}<div style="font-size: 11px; color: #666; margin-top: 2px;">Delsträcka: ${formatDistance(segmentDistance)}</div>`;
      } else if (measureModeRef.current === 'area') {
        // Calculate area if we have at least 2 points (+ cursor = 3 points for polygon)
        if (points.length >= 2) {
          const polygonPath = [...points, currentPoint];
          const area = calculateArea(polygonPath);
          const hectares = (area / 10000).toFixed(2);
          const squareMeters = Math.round(area);
          content = `${hectares} ha<div style="font-size: 11px; color: #666; margin-top: 2px;">${squareMeters} m²</div>${points.length === 2 ? '<div style=\"font-size: 10px; color: #999; margin-top: 4px; font-style: italic;\">Klicka för att markera</div>' : ''}`;
        } else {
          // Show help text when less than 2 points
          content = '<div style="font-size: 11px; color: #999; font-style: italic;">Klicka för att placera punkt</div>';
        }
      }
      
      // Create or update custom overlay label (no InfoWindow to avoid blocking clicks)
      if (!measureLabelOverlayRef.current) {
        // Create label element
        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = `
          position: absolute;
          background: white;
          padding: 6px 10px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f233b;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1000;
        `;
        
        // Create custom overlay class
        class MeasureLabelOverlay extends window.google.maps.OverlayView {
          position: any;
          div: HTMLElement;

          constructor(position: any, div: HTMLElement) {
            super();
            this.position = position;
            this.div = div;
          }

          onAdd() {
            const panes = this.getPanes();
            panes?.floatPane.appendChild(this.div);
          }

          draw() {
            const projection = this.getProjection();
            if (!projection) return;
            
            const point = projection.fromLatLngToDivPixel(this.position);
            
            if (point) {
              this.div.style.left = point.x + 'px';
              this.div.style.top = (point.y - 40) + 'px'; // Offset above the cursor
            }
          }
          
          updatePosition(position: any) {
            this.position = position;
            this.draw();
          }
          
          updateContent(content: string) {
            this.div.innerHTML = content;
          }

          onRemove() {
            if (this.div.parentNode) {
              this.div.parentNode.removeChild(this.div);
            }
          }
        }
        
        measureLabelOverlayRef.current = new MeasureLabelOverlay(currentPoint, labelDiv);
        measureLabelOverlayRef.current.setMap(mapInstanceRef.current);
      }
      
      // Update overlay content and position
      (measureLabelOverlayRef.current as any).updateContent(content);
      (measureLabelOverlayRef.current as any).updatePosition(currentPoint);
      
      console.log('Updated distance:', formatDistance(segmentDistance));
    }
  };

  const handleMeasureClick = (latLng: google.maps.LatLng) => {
    console.log('🟢 === MEASURE CLICK HANDLER EXECUTING ===', {
      lat: latLng.lat(),
      lng: latLng.lng(),
      currentPoints: measurePointsRef.current.length,
      mode: measureModeRef.current
    });
    const point = { lat: latLng.lat(), lng: latLng.lng() };
    const newPoints = [...measurePointsRef.current, point]; // Use ref instead of state to avoid stale closure
    console.log('🟢 New points array length:', newPoints.length);
    setMeasurePoints(newPoints);
    measurePointsRef.current = newPoints;
    
    // Add marker
    // Add marker using AdvancedMarkerElement
    const dotDiv = document.createElement('div');
    dotDiv.style.cssText = 'width: 12px; height: 12px; border-radius: 50%; background: #1e3856; border: 2px solid white; pointer-events: none;';
    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: point,
      map: mapInstanceRef.current,
      content: dotDiv,
    });
    measureMarkersRef.current.push(marker);
    
    // Update line or polygon - use ref to avoid stale closure
    if (measureModeRef.current === 'distance') {
      console.log('[MEASURE] Creating permanent line with', newPoints.length, 'points');
      
      // Remove old permanent line (blue)
      if (measureLineRef.current) {
        console.log('[MEASURE] Removing old permanent line');
        measureLineRef.current.setMap(null);
      }
      
      // Remove trail line (red) - it's now part of the permanent line
      if (measureTrailLineRef.current) {
        console.log('[MEASURE] Removing trail line');
        measureTrailLineRef.current.setMap(null);
        measureTrailLineRef.current = null;
      }
      
      // Create new permanent line with all fixed points (yellow)
      measureLineRef.current = new window.google.maps.Polyline({
        path: newPoints,
        strokeColor: '#FFD700',
        strokeWeight: 3,
        strokeOpacity: 1,
        map: mapInstanceRef.current,
        zIndex: 100, // Higher than trail line
        clickable: false, // Don't block map clicks!
      });
      console.log('[MEASURE] Created new permanent line (blue) with', newPoints.length, 'points');
    } else if (measureModeRef.current === 'area') {
      if (newPoints.length >= 2) {
        if (measurePolygonRef.current) {
          measurePolygonRef.current.setMap(null);
        }
        
        // Remove trail line (used for first point) now that we have a polygon
        if (measureTrailLineRef.current) {
          console.log('[MEASURE] Removing trail line for area mode');
          measureTrailLineRef.current.setMap(null);
          measureTrailLineRef.current = null;
        }
        
        measurePolygonRef.current = new window.google.maps.Polygon({
          paths: newPoints,
          strokeColor: '#FFD700',
          strokeWeight: 3,
          strokeOpacity: 0.9,
          fillColor: '#FFD700',
          fillOpacity: 0.25,
          map: mapInstanceRef.current,
          clickable: false, // Don't block map clicks!
        });
        
        // Show fixed label at last point with current area (without cursor)
        if (newPoints.length >= 3) {
          const area = calculateArea(newPoints);
          // Always show ha for fixed label
          const formatted = `${(area / 10000).toFixed(2)} ha`;
          
          // Remove old fixed label
          if (measureFixedLabelOverlayRef.current) {
            measureFixedLabelOverlayRef.current.setMap(null);
          }
          
          // Create fixed label at last clicked point
          const labelDiv = document.createElement('div');
          labelDiv.style.cssText = `
            position: absolute;
            background: white;
            padding: 6px 10px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #0f233b;
            pointer-events: none;
            white-space: nowrap;
            z-index: 1000;
          `;
          labelDiv.innerHTML = `Yta: ${formatted}`;
          
          class FixedLabelOverlay extends window.google.maps.OverlayView {
            position: any;
            div: HTMLElement;

            constructor(position: any, div: HTMLElement) {
              super();
              this.position = position;
              this.div = div;
            }

            onAdd() {
              const panes = this.getPanes();
              panes?.floatPane.appendChild(this.div);
            }

            draw() {
              const projection = this.getProjection();
              if (!projection) return;
              
              const point = projection.fromLatLngToDivPixel(this.position);
              
              if (point) {
                this.div.style.left = point.x + 'px';
                this.div.style.top = (point.y - 40) + 'px';
              }
            }

            onRemove() {
              if (this.div.parentNode) {
                this.div.parentNode.removeChild(this.div);
              }
            }
          }
          
          measureFixedLabelOverlayRef.current = new FixedLabelOverlay(point, labelDiv);
          measureFixedLabelOverlayRef.current.setMap(mapInstanceRef.current);
          console.log('[MEASURE] Created fixed label at last point:', formatted);
        }
        
        console.log('[MEASURE] Updated polygon with', newPoints.length, 'points');
      }
    }
  };

  const calculateDistance = (points: Array<{ lat: number; lng: number }>) => {
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const from = new window.google.maps.LatLng(points[i].lat, points[i].lng);
      const to = new window.google.maps.LatLng(points[i + 1].lat, points[i + 1].lng);
      totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
    }
    return totalDistance;
  };

  const calculateArea = (points: Array<{ lat: number; lng: number }>) => {
    const path = points.map(p => new window.google.maps.LatLng(p.lat, p.lng));
    return window.google.maps.geometry.spherical.computeArea(path);
  };

  const cleanupMeasurement = () => {
    console.log('=== CLEANING UP MEASUREMENT ===');
    
    // Remove listeners FIRST to stop any new interactions
    if (measureListenerRef.current) {
      console.log('Removing click listener');
      window.google.maps.event.removeListener(measureListenerRef.current);
      measureListenerRef.current = null;
    }
    
    if (measureMouseMoveListenerRef.current) {
      console.log('Removing mousemove listener');
      window.google.maps.event.removeListener(measureMouseMoveListenerRef.current);
      measureMouseMoveListenerRef.current = null;
    }
    
    // Remove permanent line (blue)
    if (measureLineRef.current) {
      console.log('Removing permanent line (blue)');
      measureLineRef.current.setMap(null);
      measureLineRef.current = null;
    }
    
    // Remove trail line (red)
    if (measureTrailLineRef.current) {
      console.log('Removing trail line (red)');
      measureTrailLineRef.current.setMap(null);
      measureTrailLineRef.current = null;
    }
    
    // Remove trail polygon (yellow)
    if (measureTrailPolygonRef.current) {
      console.log('Removing trail polygon (yellow)');
      measureTrailPolygonRef.current.setMap(null);
      measureTrailPolygonRef.current = null;
    }
    
    // Remove polygon
    if (measurePolygonRef.current) {
      console.log('Removing polygon');
      measurePolygonRef.current.setMap(null);
      measurePolygonRef.current = null;
    }
    
    // Remove all markers
    if (measureMarkersRef.current.length > 0) {
      console.log('Removing', measureMarkersRef.current.length, 'markers');
      measureMarkersRef.current.forEach(marker => {
        if (marker) removeMarkerFromMap(marker);
      });
      measureMarkersRef.current = [];
    }
    
    // Remove label overlay
    if (measureLabelOverlayRef.current) {
      console.log('Removing label overlay');
      measureLabelOverlayRef.current.setMap(null);
      measureLabelOverlayRef.current = null;
    }
    
    // Remove fixed label overlay
    if (measureFixedLabelOverlayRef.current) {
      console.log('Removing fixed label overlay');
      measureFixedLabelOverlayRef.current.setMap(null);
      measureFixedLabelOverlayRef.current = null;
    }
    
    // Remove InfoWindow
    if (measureInfoWindowRef.current) {
      console.log('Removing InfoWindow');
      measureInfoWindowRef.current.close();
      measureInfoWindowRef.current = null;
    }
    
    // Clear all points
    setMeasurePoints([]);
    measurePointsRef.current = [];
    
    console.log('=== CLEANUP COMPLETE ===');
  };

  const handleCancelMeasurement = () => {
    cleanupMeasurement();
    
    // Also clear all fixed measurements
    fixedMeasurementsRef.current.forEach(measurement => {
      measurement.lines.forEach(line => line.setMap(null));
      measurement.polygons.forEach(polygon => polygon.setMap(null));
      measurement.markers.forEach(marker => removeMarkerFromMap(marker));
      measurement.labels.forEach(label => label.setMap(null));
    });
    fixedMeasurementsRef.current = [];
    
    setMeasureMode(null);
    measureModeRef.current = null;
    toast.info('Mätning avslutad');
  };

  // Function to "fix" current measurement and allow starting a new one
  const handleFixMeasurement = () => {
    if (measurePointsRef.current.length === 0) {
      return; // Nothing to fix
    }
    
    // Save current elements to fixedMeasurementsRef before clearing refs
    const currentMeasurement = {
      lines: measureLineRef.current ? [measureLineRef.current] : [],
      polygons: measurePolygonRef.current ? [measurePolygonRef.current] : [],
      markers: [...measureMarkersRef.current],
      labels: (measureFixedLabelOverlayRef.current ? [measureFixedLabelOverlayRef.current] : []) as google.maps.OverlayView[]
    };
    
    // Create a permanent label at the last clicked point
    const points = measurePointsRef.current;
    const lastPoint = points[points.length - 1];
    
    // Only create a new permanent label for distance measurement if one doesn't already exist
    // For area measurement, we rely on the existing fixed label (created when clicking)
    if (lastPoint && mapInstanceRef.current && !measureFixedLabelOverlayRef.current && measureModeRef.current === 'distance') {
      let labelContent = '';
      
      if (measureModeRef.current === 'distance') {
        // Calculate total distance
        let totalDistance = 0;
        for (let i = 0; i < points.length - 1; i++) {
          const from = new window.google.maps.LatLng(points[i].lat, points[i].lng);
          const to = new window.google.maps.LatLng(points[i + 1].lat, points[i + 1].lng);
          totalDistance += window.google.maps.geometry.spherical.computeDistanceBetween(from, to);
        }
        
        const formatDistance = (dist: number) => {
          if (dist < 1000) {
            return `${Math.round(dist)} m`;
          } else {
            return `${(dist / 1000).toFixed(2)} km`;
          }
        };
        
        labelContent = formatDistance(totalDistance);
      } else if (measureModeRef.current === 'area') {
        // Calculate area with at least 3 points
        if (points.length >= 3) {
          const area = calculateArea(points);
          const hectares = (area / 10000).toFixed(2);
          // Only show ha for fixed label (not m²)
          labelContent = hectares + ' ha';
        }
      }
      

      
      if (labelContent) {
        // Create permanent label element
        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = `
          position: absolute;
          background: white;
          padding: 6px 10px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f233b;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1000;
        `;
        labelDiv.innerHTML = labelContent;
        
        class FixedLabelOverlay extends window.google.maps.OverlayView {
          position: any;
          div: HTMLElement;

          constructor(position: any, div: HTMLElement) {
            super();
            this.position = position;
            this.div = div;
          }

          onAdd() {
            const panes = this.getPanes();
            panes?.floatPane.appendChild(this.div);
          }

          draw() {
            const projection = this.getProjection();
            if (!projection) return;
            
            const point = projection.fromLatLngToDivPixel(this.position);
            if (point) {
              this.div.style.left = point.x + 'px';
              this.div.style.top = (point.y - 40) + 'px';
            }
          }

          onRemove() {
            if (this.div.parentNode) {
              this.div.parentNode.removeChild(this.div);
            }
          }
        }
        
        const permanentLabel = new FixedLabelOverlay(lastPoint, labelDiv);
        permanentLabel.setMap(mapInstanceRef.current);
        currentMeasurement.labels.push(permanentLabel);
      }
    }
    
    // Add to fixed measurements array
    fixedMeasurementsRef.current.push(currentMeasurement);
    
    // Remove trail elements (the preview line/polygon that follows cursor)
    if (measureTrailLineRef.current) {
      measureTrailLineRef.current.setMap(null);
      measureTrailLineRef.current = null;
    }
    
    if (measureTrailPolygonRef.current) {
      measureTrailPolygonRef.current.setMap(null);
      measureTrailPolygonRef.current = null;
    }
    
    // Clear label overlay (the one that follows cursor)
    if (measureLabelOverlayRef.current) {
      measureLabelOverlayRef.current.setMap(null);
      measureLabelOverlayRef.current = null;
    }
    
    // Clear refs but keep visual elements on map
    measureLineRef.current = null;
    measurePolygonRef.current = null;
    measureMarkersRef.current = [];
    measureFixedLabelOverlayRef.current = null;
    
    // Clear points
    setMeasurePoints([]);
    measurePointsRef.current = [];
    
    // Keep mode active so user can start a new measurement
    toast.info('Mätning fixerad. Klicka för att starta en ny mätning.');
  };

  // Add keyboard listener for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && measureModeRef.current) {
        handleFixMeasurement();
      } else if (e.key === 'Escape' && noteCreationModeRef.current === 'area') {
        handleFinishNoteArea();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show loading screen while properties are loading
  if (isLoadingProperties) {
    return (
      <div className="flex-1 relative h-full w-full flex items-center justify-center bg-[#f7f7f7]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3856]"></div>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Laddar fastigheter...
          </p>
        </div>
      </div>
    );
  }

  // Show error if no properties after loading
  if (!isLoadingProperties && properties.length === 0) {
    return (
      <div className="flex-1 relative h-full w-full flex items-center justify-center bg-[#f7f7f7]">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
          <div className="text-[#1e3856] text-4xl">📋</div>
          <h2 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Inga fastigheter hittades
          </h2>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Det finns inga fastigheter registrerade för {currentUser.name}.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6b]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Ladda om
          </button>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div ref={containerRef} className="flex-1 relative h-full w-full" style={{ minHeight: 0 }}>
      {/* Google Maps container - must be empty for Google Maps to control */}
      <div 
        ref={mapRef} 
        onClick={handleMapClick}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          backgroundColor: '#e5e3df',
          zIndex: 0
        }} 
      />
      
      {/* Loading indicator overlay - separate from map container */}
      {!isMapLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#666',
          fontSize: '16px',
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          Laddar karta...
        </div>
      )}

      {/* Back button - shown when property is selected */}
      {selectedProperty && (
        <div className="absolute top-4 left-4 z-[85] pointer-events-auto">
          <button
            onClick={handleExitProperty}
            className="bg-white px-4 h-[40px] rounded-[12px] shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            style={{ border: "1px solid #e4e4e4" }}
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M15 18L9 12L15 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
            <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black">
              Tillbaka
            </span>
          </button>
        </div>
      )}

      {/* Map control buttons - top right on mobile, bottom right on desktop, follows the drawer like menu button */}
      <div 
        className={`flex absolute z-[70] flex-col gap-3 pointer-events-auto transition-all duration-300 
          top-[16px] md:top-auto md:bottom-6
          ${isDrawerOpen ? 'md:right-[368px] right-4' : 'right-4'}
        `}
      >
        {/* Menu button - only on mobile */}
        <button
          onClick={() => {
            // Dispatch event to toggle mobile drawer
            window.dispatchEvent(new CustomEvent('toggleMobileDrawer'));
          }}
          className="md:hidden bg-white hover:bg-gray-50 rounded-[12px] shadow-lg size-[40px] flex items-center justify-center transition-colors"
          style={{ border: "1px solid #e4e4e4" }}
        >
          {isMobileDrawerOpen ? (
            <svg className="size-6" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          ) : (
            <svg className="size-6" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <rect x="4" y="6" width="16" height="2" rx="1" fill="black" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="black" />
                <rect x="4" y="16" width="16" height="2" rx="1" fill="black" />
              </g>
            </svg>
          )}
        </button>

        {/* Measure button - visible in both overview and property view */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleStartMeasure}
              className="bg-white hover:bg-gray-50 rounded-[12px] shadow-lg size-[40px] flex items-center justify-center transition-colors"
              style={{ border: "1px solid #e4e4e4" }}
            >
              <Ruler className="size-5" strokeWidth={2} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Mätverktyg</p>
          </TooltipContent>
        </Tooltip>
        
        {/* Add Note button - only show when property is selected */}
        {selectedProperty && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleStartAddNote}
                className="bg-white hover:bg-gray-50 rounded-[12px] shadow-lg size-[40px] flex items-center justify-center transition-colors"
                style={{ border: "1px solid #e4e4e4" }}
              >
                <MapPinPlus className="size-5" strokeWidth={2} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Ny anteckning</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Filter button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
                // On mobile, also open the drawer with filters view
                if (window.innerWidth < 768) {
                  window.dispatchEvent(new CustomEvent('openMobileDrawerWithFilters'));
                }
              }}
              className="bg-white hover:bg-gray-50 rounded-[12px] shadow-lg size-[40px] flex items-center justify-center transition-colors"
              style={{ border: "1px solid #e4e4e4" }}
            >
              <SlidersHorizontal className="size-5" strokeWidth={2} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Filtrera karta</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Map Drawer */}
      <MapDrawer 
        properties={properties}
        onPropertySelect={handlePropertySelect}
        selectedPropertyId={selectedProperty?.id}
        container={containerRef.current}
        onPropertyDeselect={handleExitProperty}
        onDepartmentSelect={handleDepartmentSelect}
        selectedDepartmentIdProp={selectedDepartmentId}
        onDepartmentDeselect={handleDepartmentDeselect}
        onDepartmentHover={handleDepartmentHover}
        onHighlightDepartments={handleHighlightDepartments}
        notes={notes}
        onNoteClick={handleNoteClick}
        onNoteHover={setHoveredNoteId}
        onStartAddNote={handleStartAddNote}
        onEditNoteStart={handleEditNoteStart}
        onShareNote={handleShareNote}
        onToggleResolved={handleToggleResolved}
        showResolvedNotes={showResolvedNotes}
        onShowResolvedNotesChange={setShowResolvedNotes}
        onSaveNote={handleSaveNote}
        onCancelNote={handleCancelNote}
        onDeleteNote={handleDeleteNote}
        editingNote={editingNote}
        isAddingNote={isAddingNote}
        isSaving={isSaving}
        isDeleting={isDeleting}
        showFilterMenu={showFilterMenu}
        mapType={mapType}
        showNoteMarkers={showNoteMarkers}
        showDepartmentLabels={showDepartmentLabels}
        showPropertyBorders={showPropertyBorders}
        showDepartmentBoundaries={showDepartmentBoundaries}
        autoZoomToDepartment={autoZoomToDepartment}
        onMapTypeChange={setMapType}
        onShowNoteMarkersChange={setShowNoteMarkers}
        onShowDepartmentLabelsChange={setShowDepartmentLabels}
        onShowPropertyBordersChange={setShowPropertyBorders}
        onShowDepartmentBoundariesChange={setShowDepartmentBoundaries}
        onAutoZoomToDepartmentChange={setAutoZoomToDepartment}
        onCloseFilterMenu={() => setShowFilterMenu(false)}
        onDrawerOpenChange={setIsDrawerOpen}
        noteType={noteCreationMode || (editingNote?.polygon ? 'area' : 'point')}
        onNoteTypeChange={handleNoteTypeChange}
        onEditingNoteColorChange={(color) => setEditingNote(prev => prev ? { ...prev, color } : null)}
        departmentLabelMap={departmentLabelMap}
      />

      {/* Mobile Bottom Drawer */}
      <MobileBottomDrawer
        properties={properties}
        onPropertySelect={handlePropertySelect}
        selectedPropertyId={selectedProperty?.id}
        onPropertyDeselect={handleExitProperty}
        onDepartmentSelect={handleDepartmentSelect}
        selectedDepartmentIdProp={selectedDepartmentId}
        onDepartmentDeselect={handleDepartmentDeselect}
        onDepartmentHover={handleDepartmentHover}
        onHighlightDepartments={handleHighlightDepartments}
        notes={notes}
        onNoteClick={handleNoteClick}
        onNoteHover={setHoveredNoteId}
        onStartAddNote={handleStartAddNote}
        onEditNoteStart={handleEditNoteStart}
        onShareNote={handleShareNote}
        onToggleResolved={handleToggleResolved}
        showResolvedNotes={showResolvedNotes}
        onShowResolvedNotesChange={setShowResolvedNotes}
        onSaveNote={handleSaveNote}
        onCancelNote={handleCancelNote}
        onDeleteNote={handleDeleteNote}
        editingNote={editingNote}
        isAddingNote={isAddingNote}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onDrawerHeightChange={setMobileDrawerHeight}
        onDrawerOpenChange={setIsMobileDrawerOpen}
        noteType={noteCreationMode || (editingNote?.polygon ? 'area' : 'point')}
        onNoteTypeChange={handleNoteTypeChange}
        onEditingNoteColorChange={(color) => setEditingNote(prev => prev ? { ...prev, color } : null)}
        departmentLabelMap={departmentLabelMap}
      />

      {/* Map Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 60 }}>
        <div 
          className="box-border content-stretch flex flex-col h-full items-start justify-between md:p-[24px] p-[16px] pb-[16px] md:pb-[24px] relative w-full"
        >
          {/* Bottom Controls - always at bottom */}
          <div className="content-stretch flex items-end justify-between relative shrink-0 w-full mt-auto">
            {/* Zoom Controls */}
            <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[40px] pointer-events-auto">
              {/* Center on user button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCenterOnUser}
                    disabled={isLocating}
                    className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ border: "1px solid #e4e4e4" }}
                  >
                    <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
                        <div className="relative shrink-0 size-[24px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                            <g id="u:crosshairs">
                              <path d={svgPaths.p32564400} fill="var(--fill-0, black)" id="Vector" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Hitta min position</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Zoom controls group */}
              <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full" style={{ border: "1px solid #e4e4e4" }}>
                {/* Zoom in */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleZoomIn}
                      className="bg-white h-[40px] relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
                          <div className="relative shrink-0 size-[24px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g id="fi:plus">
                                <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Zooma in</p>
                  </TooltipContent>
                </Tooltip>
                <div className="bg-[#e4e4e4] h-px shrink-0 w-full" />
                {/* Zoom out */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleZoomOut}
                      className="bg-white h-[40px] relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
                          <div className="relative shrink-0 size-[24px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g id="fi:minus">
                                <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Zooma ut</p>
                  </TooltipContent>
                </Tooltip>
                <div className="bg-[#e4e4e4] h-px shrink-0 w-full" />
                {/* Compass/Reset North */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleResetNorth}
                      className="bg-white h-[40px] relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
                          <div className="relative shrink-0 size-[24px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                              <g id="fi:compass">
                                <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                <path d={svgPaths.p3dd108f1} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Återställ norr</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Measure mode active - show cancel button */}
      {measureMode && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-auto">
          <div className="bg-white rounded-[8px] shadow-lg px-6 py-3 flex items-center gap-4" style={{ border: "1px solid #e4e4e4" }}>
            <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] text-[14px] text-[#0f233b]">
              {measureMode === 'distance' ? 'Mäter avstånd...' : 'Mäter yta...'}
            </span>
            <button
              onClick={handleCancelMeasurement}
              className="bg-transparent hover:bg-gray-100 border-2 border-[#1e3856] px-4 py-1 rounded-none transition-colors"
            >
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#0f233b] uppercase">
                Avsluta
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Note area creation mode active - show OK button */}
      {noteCreationMode === 'area' && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-auto">
          <div className="bg-white rounded-[8px] shadow-lg px-6 py-3 flex items-center gap-4" style={{ border: "1px solid #e4e4e4" }}>
            <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] text-[14px] text-[#0f233b]">
              Markerar yta... (Tryck ESC eller OK när du är klar)
            </span>
            <button
              onClick={handleFinishNoteArea}
              className="bg-[#1e3856] hover:bg-[#2d4a6b] text-white px-6 py-2 rounded-none transition-colors"
            >
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[13px] uppercase">
                OK
              </span>
            </button>
            <button
              onClick={cleanupNoteAreaCreation}
              className="bg-transparent hover:bg-gray-100 border-2 border-[#1e3856] px-4 py-1 rounded-none transition-colors"
            >
              <span className="font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#0f233b] uppercase">
                Avbryt
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Note type selection modal — Holmen-style matching ShareNoteModal */}
      {showNoteTypeDialog && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setShowNoteTypeDialog(false); }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNoteTypeDialog(false)} />
          <div
            className="relative z-10 bg-white w-full max-w-[440px] mx-4 shadow-2xl overflow-hidden"
            style={{ borderRadius: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e4]">
              <div>
                <h2
                  className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[18px] text-[#1e3856]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Ny anteckning
                </h2>
              </div>
              <button
                onClick={() => setShowNoteTypeDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Options */}
            <div className="px-6 pt-5 pb-2 flex flex-col gap-3">
              <button
                onClick={() => handleSelectNoteType('point')}
                className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-[#e4e4e4] hover:border-[#1e3856] hover:bg-[#f7f7f7] transition-colors text-left"
                style={{ borderRadius: 0 }}
              >
                <div className="size-10 bg-[#1e3856] flex items-center justify-center shrink-0">
                  <MapPin size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <p
                    className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[15px] text-[#0f233b]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Markera punkt
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSelectNoteType('area')}
                className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-[#e4e4e4] hover:border-[#1e3856] hover:bg-[#f7f7f7] transition-colors text-left"
                style={{ borderRadius: 0 }}
              >
                <div className="size-10 bg-[#1e3856] flex items-center justify-center shrink-0">
                  <MapPinned size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <p
                    className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[15px] text-[#0f233b]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Markera yta
                  </p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 mt-1">
              <ForestButton
                variant="white"
                onClick={() => setShowNoteTypeDialog(false)}
                className="w-full"
              >
                Avbryt
              </ForestButton>
            </div>
          </div>
        </div>
      )}

      {/* Measure modal — Holmen-style matching ShareNoteModal */}
      {showMeasureDialog && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setShowMeasureDialog(false); }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMeasureDialog(false)} />
          <div
            className="relative z-10 bg-white w-full max-w-[440px] mx-4 shadow-2xl overflow-hidden"
            style={{ borderRadius: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e4e4e4]">
              <div>
                <h2
                  className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[18px] text-[#1e3856]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Mätverktyg
                </h2>
                <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                  Välj vad du vill mäta på kartan
                </p>
              </div>
              <button
                onClick={() => setShowMeasureDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Options */}
            <div className="px-6 pt-5 pb-2 flex flex-col gap-3">
              <button
                onClick={() => handleSelectMeasureMode('distance')}
                className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-[#e4e4e4] hover:border-[#1e3856] hover:bg-[#f7f7f7] transition-colors text-left"
                style={{ borderRadius: 0 }}
              >
                <div className="size-10 bg-[#1e3856] flex items-center justify-center shrink-0">
                  <Ruler size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <p
                    className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[15px] text-[#0f233b]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Mät avstånd
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                    Mät avståndet mellan två eller flera punkter
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleSelectMeasureMode('area')}
                className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-[#e4e4e4] hover:border-[#1e3856] hover:bg-[#f7f7f7] transition-colors text-left"
                style={{ borderRadius: 0 }}
              >
                <div className="size-10 bg-[#1e3856] flex items-center justify-center shrink-0">
                  <MapPinned size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <p
                    className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[15px] text-[#0f233b]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Mät yta
                  </p>
                  <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                    Rita en polygon och mät dess yta i hektar
                  </p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 mt-1">
              <ForestButton
                variant="white"
                onClick={() => setShowMeasureDialog(false)}
                className="w-full"
              >
                Avbryt
              </ForestButton>
            </div>
          </div>
        </div>
      )}

      {/* Share Note Modal */}
      {shareNoteData && (
        <ShareNoteModal
          note={shareNoteData}
          onClose={() => setShareNoteData(null)}
        />
      )}

      {/* Bekräfta ta bort anteckning */}
      <HolmenModal
        isOpen={!!deleteConfirmNoteId}
        onClose={() => setDeleteConfirmNoteId(null)}
        title="Ta bort anteckning"
      >
        <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[var(--text-secondary)] mb-[4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Är du säker på att du vill ta bort denna anteckning? Åtgärden kan inte ångras.
        </p>
        <HolmenModalFooter>
          <ForestButton variant="white" onClick={() => setDeleteConfirmNoteId(null)}>
            Avbryt
          </ForestButton>
          <ForestButton variant="danger" onClick={() => {
            if (deleteConfirmNoteId) {
              handleDeleteNote(deleteConfirmNoteId);
              if (infoWindowRef.current) infoWindowRef.current.close();
            }
            setDeleteConfirmNoteId(null);
          }}>
            Ta bort
          </ForestButton>
        </HolmenModalFooter>
      </HolmenModal>
      </div>
    </TooltipProvider>
  );
}