import svgPaths from "../imports/svg-desqjdz1to";
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgImage from "figma:asset/91eb10bb81ccd2d00f07a0f0f81b0df086a93d2b.png";

interface Property {
  id: string;
  name: string;
  area: number;
  location: string;
}

interface MobilePropertyPanelProps {
  property: Property | null;
  onClose: () => void;
}

export default function MobilePropertyPanel({ property, onClose }: MobilePropertyPanelProps) {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  if (!property) return null;

  return (
    <>
      {/* Backdrop overlay when expanded */}
      {isPanelExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 z-[100]"
          onClick={() => setIsPanelExpanded(false)}
        />
      )}

      {/* Slide-up panel */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isPanelExpanded ? 0 : "calc(100% - 300px)" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.24)] z-[101]"
        style={{ maxHeight: "90vh" }}
      >
        {/* Drag handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-pointer"
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
        >
          <div className="w-[40px] h-[4px] bg-[#e4e4e4] rounded-full" />
        </div>

        {/* Panel header */}
        <div className="px-[16px] pb-[16px] border-b border-[#e4e4e4]">
          <div className="flex items-start gap-[12px]">
            <img 
              src={imgImage} 
              alt={property.name} 
              className="w-[64px] h-[64px] object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[18px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {property.name}
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {property.location}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#f0f0f0] rounded-full transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 150px)" }}>
          <div className="px-[16px] py-[16px]">
            {/* Navigation items */}
            <div className="space-y-[8px]">
              <div className="flex items-center justify-between py-[16px] border-b border-[#f0f0f0] cursor-pointer hover:bg-[#f7f7f7]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[40px] h-[40px] bg-[#e4f5f5] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g>
                        <path d={svgPaths.p1ccd4100} fill="#1E3856" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Skogsbruksplan
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Föreslagna åtgärder
                    </p>
                  </div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flex items-center justify-between py-[16px] border-b border-[#f0f0f0] cursor-pointer hover:bg-[#f7f7f7]">
                <div className="flex items-center gap-[16px]">
                  <div className="w-[40px] h-[40px] bg-[#e4f5f5] flex items-center justify-center">
                    <FileText className="size-5" stroke="#1E3856" strokeWidth={2} fill="none" />
                  </div>
                  <div>
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Anteckningar
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      3 anteckningar
                    </p>
                  </div>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Grunddata */}
            <div className="mt-[24px]">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Grunddata
              </p>
              <div className="space-y-[12px]">
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Areal
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    89,3 ha
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Tillväxt
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    875 m³sk/år
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Total virkesvolym
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    1 423 m³sk
                  </p>
                </div>
              </div>
            </div>

            {/* Ågosaglag */}
            <div className="mt-[24px]">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Ågoslag
              </p>
              <div className="space-y-[12px]">
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Skogsmark produktiv
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    80%
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Skogsmark improduktiv
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    15%
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Öppen våtmark, Myr
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    0%
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Övrigt
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    5%
                  </p>
                </div>
              </div>
            </div>

            {/* Din lokala virkesköpare */}
            <div className="mt-[24px] mb-[24px]">
              <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Din lokala virkesköpare
              </p>
              <div className="flex items-center gap-[12px]">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1743585497049-7f7cd13daf78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3RyeSUyMHdvcmtlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzU1MDk2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Daniel Larsson" 
                  className="w-[48px] h-[48px] rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Daniel Larsson
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] italic text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Vill du veta mer om virkesaffärer?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}