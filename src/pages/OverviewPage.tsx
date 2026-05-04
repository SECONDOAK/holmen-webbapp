import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TermsOfServiceDialog } from '../components/TermsOfServiceDialog';
import { Footer } from '../components/Footer';
import CalendarEventCard from '../components/CalendarEventCard';
import { ActionCard } from '../components/ActionCard';
import ContactCard from '../components/ContactCard';
import ForestButton from '../components/ForestButton';
import svgPaths from '../imports/svg-desqjdz1to';
import { useProfile } from '../contexts/ProfileContext';
import { Trees, ExternalLink, FileSignature, BookOpenCheck } from 'lucide-react';
import imgDanielLarsson from "figma:asset/9e613302068097aa58a90d360320b38f2a46f3c7.png";

export default function OverviewPage() {
  const [isTermsDialogOpen, setTermsDialogOpen] = useState(false);
  const { currentProfile, loggedInUser } = useProfile();

  // Check if the logged-in user has their own profile
  const hasOwnProfile = currentProfile?.isOwn === true;

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-y-auto overflow-x-hidden relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1400px] mx-auto">
          
          {/* No Own Profile Message */}
          {!hasOwnProfile && (
            <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] w-full">
              <div className="p-[24px] md:p-[32px]">
                <div className="flex flex-col items-center text-center gap-[24px]">
                  <div className="bg-[#e4f5f5] p-[20px] flex items-center justify-center">
                    <Trees className="h-[48px] w-[48px] text-[#1e3856]" />
                  </div>
                  
                  <div className="max-w-2xl">
                    <h2 className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[24px] md:text-[28px] text-[#1e3856] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Du har inga egna fastigheter
                    </h2>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[#666666] leading-[1.6] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Du är inloggad som <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>{loggedInUser.name}</span> och har för närvarande inga egna fastigheter registrerade i systemet.
                      {currentProfile && (
                        <> Du har dock tillgång till <span className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#021c20]" style={{ fontVariationSettings: "'wdth' 100" }}>{currentProfile.name}</span>s profil och kan se deras fastigheter och data via menyn.</>
                      )}
                    </p>
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] text-[#666666] leading-[1.6]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Vill du veta mer om hur du kan komma igång med skogsbruk eller om Holmens tjänster?
                    </p>
                  </div>

                  <a 
                    href="https://www.holmen.com/sv/skog/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#1e3856] text-white px-[24px] py-[12px] font-['IBM_Plex_Sans',sans-serif] font-bold hover:bg-[#2a4a6a] transition-colors inline-flex items-center gap-[8px] text-[16px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Besök Holmens webbplats
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Alert Cards - Only show if user has own profile */}
          {hasOwnProfile && (
            <div className="relative shrink-0 w-full">
              {/* Mobile: Vertical stack */}
              <div className="md:hidden flex flex-col gap-[16px]">
                {/* Contract Signing Alert */}
                <ActionCard
                  icon={
                    <FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />
                  }
                  iconBackgroundColor="#e4f5f5"
                  title="Nytt kontrakt väntar på signering"
                  tooltipText="Du har fått ett kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltigt."
                  description={
                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                          <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                            <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                                Daniel Larsson
                              </span>
                              <span>{` har bjudit in dig att signera ett kontrakt med BankID`}</span>
                            </p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  buttons={[
                    { label: 'Signera kontrakt', variant: 'primary' }
                  ]}
                />

                {/* Missing Plan Alert */}
                <ActionCard
                  icon={
                    <BookOpenCheck className="size-6" stroke="#663336" strokeWidth={2} />
                  }
                  iconBackgroundColor="#fad2af"
                  title="Skogsbruksplan saknas för BERGVIK 2:5"
                  tooltipText="En skogsbruksplan ger dig en strukturerad översikt över din skog och hjälper dig att fatta välgrundade beslut om framtida åtgärder."
                  description={
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <span>{`Din fastighet `}</span>
                      <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Bergvik 2:5
                      </span>
                      <span>{` saknar en skogsbruksplan. Med en plan får du en tydlig väg framåt för hur skogen kan skötas på bästa sätt och utvecklas i riktning mot dina mål.`}</span>
                    </p>
                  }
                  buttons={[
                    { 
                      label: 'Beställ skogsbruksplan', 
                      variant: 'primary',
                      onClick: () => {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'services' }));
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('openService', { detail: 'skogsbruksplan' }));
                        }, 100);
                      }
                    },
                    { 
                      label: 'Visa i karta', 
                      variant: 'white',
                      onClick: () => {
                        window.dispatchEvent(new CustomEvent('selectProperty', { detail: '2' }));
                      }
                    }
                  ]}
                />

                {/* Contact Card */}
                <ContactCard
                  image={imgDanielLarsson}
                  name="Daniel Larsson"
                  title="Virkesköpare Hudiksvall / Ljusdal"
                  description="Hör av dig om du har frågor om din skog, virkesaffärer eller om du vill veta mer om hur Holmen kan hjälpa dig."
                  contactInfo={[
                    { icon: 'material-symbols:phone-iphone', label: '123 456 78 90' },
                    { icon: 'material-symbols:mail-outline-sharp', label: 'Mejla daniel' }
                  ]}
                />

                {/* Test Functions Card */}
                <div className="bg-white relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
                  <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
                      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Testfunktioner
                      </p>
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Testa olika funktioner och dialoger i systemet
                      </p>
                      <ForestButton
                        variant="primary"
                        onClick={() => setTermsDialogOpen(true)}
                        className="w-full mt-4"
                      >
                        Testa användarvillkor
                      </ForestButton>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: Grid layout */}
              <div className="hidden md:grid box-border gap-[16px] grid-cols-2 relative shrink-0 w-full max-w-[1604px]">
                {/* Contract Signing Alert */}
                <ActionCard
                  className="[grid-area:1_/_1]"
                  icon={
                    <FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />
                  }
                  iconBackgroundColor="#e4f5f5"
                  title="Nytt kontrakt väntar på signering"
                  tooltipText="Du har fått ett kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltigt."
                  description={
                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                          <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] w-full">
                            <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                                Daniel Larsson
                              </span>
                              <span>{` har bjudit in dig att signera ett kontrakt med BankID`}</span>
                            </p>
                            <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
                              <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  buttons={[
                    { label: 'Signera kontrakt', variant: 'primary' }
                  ]}
                />

                {/* Missing Plan Alert */}
                <ActionCard
                  className="[grid-area:1_/_2]"
                  icon={
                    <BookOpenCheck className="size-6" stroke="#663336" strokeWidth={2} />
                  }
                  iconBackgroundColor="#fad2af"
                  title="Skogsbruksplan saknas för BERGVIK 2:5"
                  tooltipText="En skogsbruksplan ger dig en strukturerad översikt över din skog och hjälper dig att fatta välgrundade beslut om framtida åtgärder."
                  description={
                    <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <span>{`Din fastighet `}</span>
                      <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Bergvik 2:5
                      </span>
                      <span>{` saknar en skogsbruksplan. Med en plan får du en tydlig väg framåt för hur skogen kan skötas på bästa sätt och utvecklas i riktning mot dina mål.`}</span>
                    </p>
                  }
                  buttons={[
                    { 
                      label: 'Beställ skogsbruksplan', 
                      variant: 'primary',
                      onClick: () => {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'services' }));
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('openService', { detail: 'skogsbruksplan' }));
                        }, 100);
                      }
                    },
                    { 
                      label: 'Visa i karta', 
                      variant: 'white',
                      onClick: () => {
                        window.dispatchEvent(new CustomEvent('selectProperty', { detail: '2' }));
                      }
                    }
                  ]}
                />

                {/* Contact Card */}
                <ContactCard
                  image={imgDanielLarsson}
                  name="Daniel Larsson"
                  title="Virkesköpare Hudiksvall / Ljusdal"
                  description="Hör av dig om du har frågor om din skog, virkesaffärer eller om du vill veta mer om hur Holmen kan hjälpa dig."
                  contactInfo={[
                    { icon: 'material-symbols:phone-iphone', label: '123 456 78 90' },
                    { icon: 'material-symbols:mail-outline-sharp', label: 'Mejla daniel' }
                  ]}
                />

                {/* Test Functions Card */}
                <div className="[grid-area:2_/_2] bg-white relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] h-full">
                  <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
                  <div className="size-full">
                    <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full h-full">
                      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Testfunktioner
                      </p>
                      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[#666]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Testa olika funktioner och dialoger i systemet
                      </p>
                      <div className="flex-1" />
                      <ForestButton
                        variant="primary"
                        onClick={() => setTermsDialogOpen(true)}
                        className="w-full"
                      >
                        Testa användarvillkor
                      </ForestButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Section */}
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
            <div className="flex items-center justify-between w-full">
              <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                Senaste nytt
              </p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'all-news' }))}
                className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] hover:text-[#152b40] transition-colors inline-flex items-baseline gap-1 group"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Se fler
                <svg className="w-3.5 h-3.5 relative top-[2px] group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] w-full">
              {/* Show only the 4 most recent items */}
              {[
                { 
                  type: 'news',
                  id: "nya-riktlinjer-skogsavverkning-2025",
                  img: "https://images.unsplash.com/photo-1651990766796-b56814ad40b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3RyeSUyMGxvZ2dpbmd8ZW58MXx8fHwxNzY0NzY1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080", 
                  title: "Nya riktlinjer för skogsavverkning 2025", 
                  description: "Skogsstyrelsen presenterar uppdaterade riktlinjer för hållbar skogsavverkning med fokus på biologisk mångfald..."
                },
                { 
                  type: 'calendar',
                  month: "JANUARI",
                  day: "30",
                  year: "2026",
                  category: "DELÅRSRAPPORT",
                  title: "Bokslutsrapport 2025",
                  description: "Holmen offentliggör bokslutsrapport för 2025 fredag den 30 januari 2026."
                },
                { 
                  type: 'news',
                  id: "rekordpriser-virke-norra-sverige",
                  img: "https://images.unsplash.com/photo-1606073744343-716f021e0730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lJTIwZm9yZXN0JTIwc3dlZGVufGVufDF8fHx8MTc2NDc2NTU0MXww&ixlib=rb-4.1.0&q=80&w=1080", 
                  title: "Rekordpriser på virke i norra Sverige", 
                  description: "Virkespriserna fortsätter att stiga i norra Sverige drivet av stark efterfrågan från sågindustrin..."
                },
                { 
                  type: 'news',
                  id: "digital-skogsskotsel-revolutionerar",
                  img: "https://images.unsplash.com/photo-1595569099963-77bf7706643a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzY0NzY1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
                  title: "Digital skogsskötsel revolutionerar branschen",
                  description: "Ny teknik med drönare och AI gör det enklare att övervaka och planera skogsbruksåtgärder. Digitala verktyg ökar effektiviteten..."
                },
              ].map((item, index) => (
                item.type === 'calendar' ? (
                  <CalendarEventCard
                    key={index}
                    month={item.month}
                    day={item.day}
                    year={item.year}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    showCategory={false}
                  />
                ) : (
                  <div key={index} className="bg-white border border-gray-200 overflow-hidden flex flex-col cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('navigateToArticle', { detail: item.id }))}>
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <ImageWithFallback 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        src={item.img} 
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {item.title}
                      </h3>
                      <p className="font-['IBM_Plex_Sans',sans-serif] text-gray-600 mb-4 flex-1 line-clamp-3" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {item.description}
                      </p>
                      <span 
                        className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[#1e3856] group-hover:text-[#152b40] transition-colors inline-flex items-baseline gap-1"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        Läs mer
                        <svg className="w-3.5 h-3.5 relative top-[2px] group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Dialog */}
      <TermsOfServiceDialog open={isTermsDialogOpen} onOpenChange={setTermsDialogOpen} />

      {/* Footer */}
      <Footer />
    </div>
  );
}