import { X } from "lucide-react";
import svgPaths from "../imports/svg-yzncxbvcbd";
import imgHolmenLogo from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PropertyHeaderProps {
  propertyImage: string;
  propertyName: string;
  propertyLocation: string;
  onClose: () => void;
}

// Close icon component
function CloseIcon() {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g>
        <path d="M18 6L6 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M6 6L18 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function PropertyHeader({ propertyImage, propertyName, propertyLocation, onClose }: PropertyHeaderProps) {
  return (
    <div className="relative shrink-0 w-full border-b border-[#e4e4e4]">
      <div className="box-border flex items-center justify-between p-3 w-full">
        {/* Left: Property info with image */}
        <div className="flex items-center gap-3 flex-1">{/* Property thumbnail */}
          <div className="relative shrink-0 size-[64px] rounded-[4px] overflow-hidden border border-[#e4e4e4]">
            <ImageWithFallback
              src={propertyImage} 
              alt={propertyName}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          {/* Property name and location */}
          <div className="flex flex-col gap-0.5">
            <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
              {propertyName}
            </p>
            <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {propertyLocation}
            </p>
          </div>
        </div>
        {/* Right: Close button */}
        <button
          onClick={onClose}
          className="relative shrink-0 size-[24px] hover:opacity-70 transition-opacity"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}