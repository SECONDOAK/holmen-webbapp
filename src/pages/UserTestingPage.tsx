import { useState } from 'react';
import { UserCog, ChevronLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useProfile } from '../contexts/ProfileContext';

interface UserTestingPageProps {
  onBack: () => void;
}

export default function UserTestingPage({ onBack }: UserTestingPageProps) {
  const [message, setMessage] = useState<string | null>(null);
  const { loggedInUser, switchToUser } = useProfile();

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
              <span className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Adminverktyg
              </span>
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1e3856] rounded-lg p-2.5">
                <UserCog className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Användartestning
              </h1>
            </div>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666] ml-[52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Testa appen som olika användare
            </p>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm w-full">
            <div className="p-6">
              <div className="space-y-6">
                {/* Current User Display */}
                <div className="bg-gray-50 px-4 py-3 border border-gray-200">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-[#021c20] mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Nuvarande inloggad användare:
                  </p>
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {loggedInUser.name} ({loggedInUser.email})
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                {/* Switch to John Doe */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      switchToUser('1');
                      setMessage('✅ Växlat till John Doe');
                    }}
                    disabled={loggedInUser.id === '1'}
                    className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <UserCog className="h-5 w-5" />
                    <span>Växla till John Doe (standardanvändare)</span>
                  </button>
                  <div className="bg-blue-50 px-4 py-3 border-l-4 border-blue-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-blue-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>John Doe - Standardanvändare</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-blue-700" style={{ fontVariationSettings: "'wdth' 100" }}>John Doe har sin egen profil med fastigheter och har även tillgång till Jane Doe's profil.</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Switch to Jane Doe */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      switchToUser('2');
                      setMessage('✅ Växlat till Jane Doe');
                    }}
                    disabled={loggedInUser.id === '2'}
                    className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <UserCog className="h-5 w-5" />
                    <span>Växla till Jane Doe</span>
                  </button>
                  <div className="bg-purple-50 px-4 py-3 border-l-4 border-purple-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-purple-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>Jane Doe - Användare med egen profil</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-purple-700" style={{ fontVariationSettings: "'wdth' 100" }}>Jane Doe har sin egen profil med fastigheter men har inte tillgång till andra användares profiler.</p>
                  </div>
                </div>

                <div className="border-t border-gray-200" />

                {/* Switch to Mike Snow */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      switchToUser('3');
                      setMessage('✅ Växlat till Mike Snow (användare utan egen profil)');
                    }}
                    disabled={loggedInUser.id === '3'}
                    className="w-full px-6 py-4 bg-[#1e3856] text-white font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <UserCog className="h-5 w-5" />
                    <span>Växla till Mike Snow (utan egen profil)</span>
                  </button>
                  <div className="bg-orange-50 px-4 py-3 border-l-4 border-orange-600">
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[14px] text-orange-800 mb-1" style={{ fontVariationSettings: "'wdth' 100" }}>Mike Snow - Användare utan egen profil</p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-orange-700" style={{ fontVariationSettings: "'wdth' 100" }}>Mike Snow har ingen egen profil eller fastigheter. Han har endast tillgång till Jane Doe's profil och kan se hennes fastigheter och finansiella data.</p>
                  </div>
                </div>
              </div>

              {message && (
                <div className="mt-6 p-4 bg-gray-100 border border-gray-200">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>{message}</p>
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
