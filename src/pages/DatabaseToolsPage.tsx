import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Database, Plus, RefreshCw, ChevronLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

interface DatabaseToolsPageProps {
  onBack: () => void;
}

export default function DatabaseToolsPage({ onBack }: DatabaseToolsPageProps) {
  const [isSeeding, setIsSeeding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleCheckStatus = async () => {
    setMessage("Kollar status...");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/debug/status`,
        { headers: { Authorization: `Bearer ${publicAnonKey}` } }
      );
      if (response.ok) {
        const data = await response.json();
        setDebugInfo(data);
        setMessage("✅ Status hämtad!");
      } else {
        setMessage("❌ Kunde inte hämta status");
      }
    } catch (error) {
      setMessage(`❌ Fel: ${error}`);
    }
  };

  const handleMigrateSiteIndex = async () => {
    setIsSeeding(true);
    setMessage("Uppdaterar ståndortsindex...");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/migrate-site-index`,
        { method: "POST", headers: { Authorization: `Bearer ${publicAnonKey}`, "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        const error = await response.text();
        setMessage(`❌ Fel: ${response.statusText} - ${error}`);
        setIsSeeding(false);
        return;
      }
      const data = await response.json();
      setMessage(`✅ Klar! Uppdaterade ${data.updated} avdelningar. Laddar om sidan...`);
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage(`❌ Fel: ${String(error)}`);
      setIsSeeding(false);
    }
  };

  const handleSeedMissingData = async () => {
    setIsSeeding(true);
    setMessage("Lägger till saknad data...");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/departments/seed-missing`,
        { method: "POST", headers: { Authorization: `Bearer ${publicAnonKey}`, "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        const error = await response.text();
        setMessage(`❌ Fel: ${response.statusText} - ${error}`);
        setIsSeeding(false);
        return;
      }
      setMessage("✅ Klar! Saknad data har lagts till. Laddar om sidan...");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage(`❌ Fel: ${String(error)}`);
      setIsSeeding(false);
    }
  };

  const handleResetDatabase = async () => {
    if (!confirm("⚠️ VARNING: Detta kommer radera ALL data och starta om. Är du säker?")) return;
    setIsSeeding(true);
    setMessage("Återställer databas...");
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ffc89dab/debug/reinit-all`,
        { method: "POST", headers: { Authorization: `Bearer ${publicAnonKey}`, "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        const error = await response.text();
        setMessage(`❌ Fel: ${response.statusText} - ${error}`);
        setIsSeeding(false);
        return;
      }
      setMessage("✅ Klar! Databasen har återställts. Laddar om sidan...");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      setMessage(`❌ Fel: ${String(error)}`);
      setIsSeeding(false);
    }
  };

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Back button + header */}
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#1e3856] hover:text-[#2a4a6a] transition-colors mb-4"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Adminverktyg
              </span>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1e3856] rounded-lg p-2.5">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Databasverktyg
              </h1>
            </div>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666] ml-[52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Hantera och felsök databasinnehåll
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm w-full">
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <button onClick={handleCheckStatus} disabled={isSeeding} className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <Database className="h-5 w-5" />
                    <span>{isSeeding ? "Arbetar..." : "Kolla status"}</span>
                  </button>
                  <div className="bg-gray-50 px-4 py-3 border-l-4 border-[#1e3856]">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>Kontrollera statusen på servern och visa teknisk information</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="space-y-3">
                  <button onClick={handleMigrateSiteIndex} disabled={isSeeding} className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <Plus className="h-5 w-5" />
                    <span>{isSeeding ? "Arbetar..." : "Uppdatera ståndortsindex"}</span>
                  </button>
                  <div className="bg-green-50 px-4 py-3 border-l-4 border-green-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] text-green-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>Säkert alternativ</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-green-700" style={{ fontVariationSettings: "'wdth' 100" }}>Uppdaterar ståndortsindexet utan att radera befintlig information</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="space-y-3">
                  <button onClick={handleSeedMissingData} disabled={isSeeding} className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <Plus className="h-5 w-5" />
                    <span>{isSeeding ? "Arbetar..." : "Lägg till saknad data"}</span>
                  </button>
                  <div className="bg-green-50 px-4 py-3 border-l-4 border-green-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] text-green-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>Säkert alternativ</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-green-700" style={{ fontVariationSettings: "'wdth' 100" }}>Lägger bara till data som saknas utan att radera befintlig information</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                <div className="space-y-3">
                  <button onClick={handleResetDatabase} disabled={isSeeding} className="w-full px-6 py-4 bg-red-600 text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <RefreshCw className="h-5 w-5" />
                    <span>{isSeeding ? "Arbetar..." : "Återställ hela databasen"}</span>
                  </button>
                  <div className="bg-red-50 px-4 py-3 border-l-4 border-red-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[13px] text-red-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>⚠️ Destruktiv åtgärd</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-red-700" style={{ fontVariationSettings: "'wdth' 100" }}>Raderar ALL data och seedar om från början. Denna åtgärd kan inte ångras.</p>
                  </div>
                </div>
              </div>

              {message && (
                <div className="mt-6 p-4 bg-gray-100 border border-gray-200">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>{message}</p>
                </div>
              )}

              {debugInfo && (
                <div className="mt-6">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-[#021c20] mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>Teknisk Information:</p>
                  <div className="p-4 bg-gray-900 overflow-x-auto">
                    <pre className="font-mono text-[12px] text-green-400 whitespace-pre-wrap break-words">{JSON.stringify(debugInfo, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
