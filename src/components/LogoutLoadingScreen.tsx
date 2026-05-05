import { Loader2 } from 'lucide-react';

export default function LogoutLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="w-16 h-16 text-[#1e3856] animate-spin" />
        <div className="flex flex-col items-center gap-2">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[24px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Loggar ut
          </p>
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Vänligen vänta...
          </p>
        </div>
      </div>
    </div>
  );
}
