import { LogOut, Play } from "lucide-react";

interface LogoutChoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSimulateLogout: () => void;
  onRealLogout: () => void;
}

export default function LogoutChoiceModal({
  open,
  onOpenChange,
  onSimulateLogout,
  onRealLogout,
}: LogoutChoiceModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[400px] mx-4 p-6 shadow-2xl">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-[#1e3856] mb-2"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Logga ut
        </h2>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666] mb-6"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Välj hur du vill logga ut.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onOpenChange(false);
              onSimulateLogout();
            }}
            className="w-full h-[48px] border-2 border-[#1e3856] text-[#1e3856] font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] uppercase tracking-[0.5px] flex items-center justify-center gap-2 hover:bg-[#f0f2f4] transition-colors"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <Play className="h-4 w-4" />
            SIMULERA UTLOGGNING AV ANVÄNDARE
          </button>

          <button
            onClick={() => {
              onOpenChange(false);
              onRealLogout();
            }}
            className="w-full h-[48px] bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] uppercase tracking-[0.5px] flex items-center justify-center gap-2 hover:bg-[#2a4d6e] transition-colors"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <LogOut className="h-4 w-4" />
            LOGGA UT FRÅN PROTOTYPEN
          </button>
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="mt-4 w-full text-center font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666] hover:text-[#1e3856] transition-colors"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
}
