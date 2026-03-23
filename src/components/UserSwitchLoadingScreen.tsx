import { Loader2 } from "lucide-react";

export default function UserSwitchLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#1e3856] z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated spinner */}
        <Loader2 className="h-12 w-12 text-white animate-spin" />
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p 
            className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-white" 
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Växlar profil...
          </p>
          <p 
            className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-white opacity-70" 
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Laddar fastigheter och data
          </p>
        </div>
      </div>
    </div>
  );
}