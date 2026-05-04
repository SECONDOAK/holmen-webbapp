import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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

interface PropertySwitcherProps {
  properties: Property[];
  selectedProperty: Property;
  onSwitch: (property: Property) => void;
}

export function PropertySwitcher({ properties, selectedProperty, onSwitch }: PropertySwitcherProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[16px] text-black truncate" style={{ fontVariationSettings: "'wdth' 100" }}>
          {selectedProperty.name}
        </h2>
        <ChevronDown className={`size-5 text-black shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 bg-white border border-[#e4e4e4] shadow-lg z-50 min-w-[260px] max-h-[300px] overflow-y-auto">
          {properties.map((property) => (
            <button
              key={property.id}
              onClick={() => {
                onSwitch(property);
                setOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-[#f7f7f7] transition-colors border-b border-[#e4e4e4] last:border-b-0"
            >
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {property.name}
                </span>
                <span className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {property.location}
                </span>
              </div>
              {selectedProperty.id === property.id && (
                <Check className="size-5 text-[#1e3856] shrink-0" strokeWidth={2} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
