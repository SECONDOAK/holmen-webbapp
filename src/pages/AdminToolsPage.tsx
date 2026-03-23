import { Settings, Database, UserCog, Palette } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function AdminToolsPage() {
  const navigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  const cards = [
    {
      page: 'database-tools',
      icon: <Database className="h-5 w-5 text-white" strokeWidth={2} />,
      title: 'Databasverktyg',
      description: 'Hantera och felsök databasinnehåll',
    },
    {
      page: 'user-testing',
      icon: <UserCog className="h-5 w-5 text-white" strokeWidth={2} />,
      title: 'Användartestning',
      description: 'Testa appen som olika användare',
    },
    {
      page: 'design-library',
      icon: <Palette className="h-5 w-5 text-white" strokeWidth={2} />,
      title: 'Designbibliotek',
      description: 'Alla komponenter samlade med varianter, storlekar och breakpoints',
    },
  ];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1e3856] rounded-lg p-2.5">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[32px] text-[#1e3856]" style={{ fontVariationSettings: "'wdth' 100" }}>
                Adminverktyg
              </h1>
            </div>
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666] ml-[52px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Verktyg för utveckling och databashantering
            </p>
          </div>

          {/* Navigation cards */}
          <div className="flex flex-col gap-[16px] w-full">
            {cards.map((card) => (
              <div key={card.page} className="bg-white border border-gray-200 shadow-sm w-full">
                <button
                  onClick={() => navigate(card.page)}
                  className="w-full text-left cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                >
                  <div className="px-6 py-5 flex items-center gap-4">
                    <div className="bg-[#1e3856] rounded-lg p-2.5 shrink-0">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[20px] text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {card.title}
                      </h2>
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666] mt-1" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {card.description}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-[#1e3856] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="px-6 py-4 bg-blue-50 border border-blue-200 w-full">
            <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-blue-900 leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <span className="font-bold">Obs:</span> Dessa verktyg är endast avsedda för utveckling och testning.
              Använd dem med försiktighet, särskilt återställningsfunktionen som raderar all data permanent.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
