import { Fragment } from 'react';
import {
  ArrowRight,
  Lock,
  Headphones,
  Check,
  ChevronRight,
} from 'lucide-react';
import imgHero from '../assets/Hero image.png';
import imgPropertyMap from 'figma:asset/16120362ff46e0ee48e96950e7d75c4ec8deb37a.png';
import imgSapling from 'figma:asset/75b3c58e1d7ca3dcdad92a5df6536325e03f9adb.png';
import imgForestWide from 'figma:asset/602dabd0db506d59f8b824f328d43843335f7ec5.png';
import imgForestExtra from 'figma:asset/b757b27974630ff853f231ffb96e907b1257534b.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HolmenWebbIcon } from '../components/HolmenWebbIcon';
import PublicHeader from '../components/PublicHeader';
import ForestButton from '../components/ForestButton';
import { Footer } from '../components/Footer';

/**
 * Publik landningssida för Min Skog — utbyggd version som matchar
 * tonen och strukturen på holmen.com/sv/skog/tjanster/min-skog.
 *
 * Sektioner:
 *   1. PublicHeader
 *   2. HERO  — bred hero med säljande rubrik + två CTAs
 *   3. "Din skog samlad på ett ställe"  — 50/50 + 3 feature cards
 *   4. "Utforska din fastighet i kartan"  — 50/50 med map-screenshot
 *   5. "Planera för framtiden"  — 50/50 med sapling-bild vänster
 *   6. "Så kommer du igång"  — 3 numrerade steg
 *   7. Stats  — mörk forest-bg, "En trygg partner"
 *   8. "Tillgänglig på dator, surfplatta och mobil"  — multi-device
 *   9. "Behöver du hjälp?"  — support-bar
 *  10. Final CTA  — full-bleed forest med två CTAs
 *  11. Footer
 *
 * Designprinciper:
 *   - Behåller Holmens formspråk: IBM Plex Sans-typografi, ForestButton
 *     i primary (navy #1e3856) + white outlined, accent-grön #1a5e35
 *     för ikon-cirklar (matchar Holmen Skog-paletten visuellt utan att
 *     bryta mot etablerade button-färger i appen).
 *   - Sektions-baserad layout med tydliga eyebrow-labels (uppercase,
 *     tracking) följt av stora rubriker, brödtext och CTA.
 */

const HOLMEN_GREEN = '#1a5e35';
const NAVY = '#1e3856';
const DARK_BG = '#0c1d17';

interface LandingPageProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

export default function LandingPage({ onCreateAccount, onLogin }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader onLogin={onLogin} />

      <HeroSection onCreateAccount={onCreateAccount} onLogin={onLogin} />
      <OverviewSection />
      <MapSection />
      <PlanSection />
      <StepsSection />
      <StatsSection />
      <MultiDeviceSection />
      <HelpSection />
      <FinalCTASection onCreateAccount={onCreateAccount} onLogin={onLogin} />

      <Footer />
    </div>
  );
}

/* ============================================================
 * Återanvändbara mini-komponenter
 * ============================================================ */

/** Liten uppercase-label som ankrar varje sektion. */
function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] md:text-[13px] tracking-[0.14em] uppercase ${className}`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </span>
  );
}

/** Standardiserad H2 — används i de flesta sektioner. */
function SectionHeading({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[28px] md:text-[40px] leading-[1.15] ${className}`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </h2>
  );
}

/** Standardiserad brödtext för sektioner. */
function SectionBody({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-['IBM_Plex_Sans',sans-serif] text-[16px] md:text-[17px] leading-[1.6] ${className}`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </p>
  );
}

/* ============================================================
 * 2. HERO
 * ============================================================ */
function HeroSection({
  onCreateAccount,
  onLogin,
}: {
  onCreateAccount: () => void;
  onLogin: () => void;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#021c20]">
      <ImageWithFallback
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Mjuk svart-till-transparent gradient från vänster för läsbarhet —
          ingen blå tint, bilden behåller sin egen ton. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      <div className="relative max-w-[1200px] mx-auto px-[16px] md:px-[40px] py-[96px] md:py-[160px] min-h-[560px] md:min-h-[680px] flex flex-col items-start justify-center">
        <Eyebrow className="text-white/85">Min Skog</Eyebrow>
        <h1
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-white text-[34px] md:text-[56px] leading-[1.08] max-w-[760px] mt-[16px] md:mt-[20px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Ta hand om din skog, var du än är.
        </h1>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-90 text-[17px] md:text-[19px] leading-[1.55] mt-[20px] md:mt-[24px] max-w-[600px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Med Min Skog får du en tydlig överblick över din skogsfastighet, dina åtgärder och din
          kontakt med Holmen. Följ vad som händer i skogen, se kartor och planera nästa steg —
          direkt i mobilen eller datorn.
        </p>

        <div className="flex flex-col sm:flex-row gap-[12px] mt-[40px] md:mt-[44px] w-full sm:w-auto">
          <ForestButton variant="primary" onClick={onLogin} className="w-full sm:w-auto">
            <span>Logga in på Min Skog</span>
            <ArrowRight className="size-[16px]" strokeWidth={2.5} />
          </ForestButton>
          <ForestButton variant="white" onClick={onCreateAccount} className="w-full sm:w-auto">
            Skapa konto
          </ForestButton>
        </div>

        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-75 text-[13px] md:text-[14px] mt-[24px] md:mt-[28px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          För dig som säljer virke till Holmen eller har en skoglig relation med oss.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * 3. Din skog samlad på ett ställe (50/50 + 3 feature cards)
 * ============================================================ */
const FEATURE_CARDS = [
  {
    icon: 'karta',
    title: 'Se din skog på kartan',
    body: 'Utforska din fastighet i digitala kartor och få bättre förståelse för bestånd, gränser och planerade åtgärder.',
  },
  {
    icon: 'skogsbruksplan',
    title: 'Följ åtgärder över tid',
    body: 'Se vad som är gjort, vad som pågår och vad som planeras framåt i din skog.',
  },
  {
    icon: 'kontaktperson',
    title: 'Ha Holmen nära till hands',
    body: 'Hitta kontaktvägar, få aktuell information och håll dialogen med din virkesköpare samlad.',
  },
] as const;

function OverviewSection() {
  return (
    <section className="bg-white py-[72px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        {/* Övre block: 50/50 text + bild */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-center">
          <div className="flex flex-col">
            <Eyebrow className="text-[#1a5e35]">Din skog samlad på ett ställe</Eyebrow>
            <SectionHeading className="text-[#021c20] mt-[16px] md:mt-[20px]">
              All information om din skog, samlad och lätt att hitta.
            </SectionHeading>
            <SectionBody className="text-[#021c20] opacity-80 mt-[20px] md:mt-[24px]">
              Skogen förändras över tid. Med Min Skog blir det enklare att följa utvecklingen,
              förstå planerade åtgärder och hålla kontakt med din virkesköpare.
            </SectionBody>
            <SectionBody className="text-[#021c20] opacity-80 mt-[16px]">
              Du får en digital plats där information om din skog, dina kontrakt och dina
              skogliga aktiviteter finns samlade.
            </SectionBody>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <ImageWithFallback
              src={imgForestWide}
              alt="Skogslandskap i kvällsljus"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Tre feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px] mt-[48px] md:mt-[72px]">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-[#e4e4e4] p-[24px] md:p-[28px] flex flex-col gap-[20px] hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer group"
            >
              <div
                className="size-[56px] rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: HOLMEN_GREEN }}
              >
                <HolmenWebbIcon name={card.icon} size={28} color="#ffffff" />
              </div>
              <h3
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[19px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {card.title}
              </h3>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-75 text-[14px] md:text-[15px] leading-[1.55] flex-1"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {card.body}
              </p>
              <ArrowRight
                className="size-[20px] text-[#021c20] opacity-60 group-hover:opacity-100 group-hover:translate-x-[4px] transition-all"
                strokeWidth={2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4. Kartan — 50/50 med map-screenshot
 * ============================================================ */
const MAP_FEATURES = [
  'Digital karta över fastigheten',
  'Överblick över bestånd och områden',
  'Stöd när du är ute i skogen',
  'Fungerar i mobil, surfplatta och dator',
];

function MapSection() {
  return (
    <section className="bg-[#f7f7f7] py-[72px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-center">
          {/* Text */}
          <div className="flex flex-col">
            <Eyebrow className="text-[#1a5e35]">Kartan som gör skogen lättare att förstå</Eyebrow>
            <SectionHeading className="text-[#021c20] mt-[16px] md:mt-[20px]">
              Utforska din fastighet i detalj — direkt i kartan.
            </SectionHeading>
            <SectionBody className="text-[#021c20] opacity-80 mt-[20px] md:mt-[24px]">
              I Min Skog kan du se din fastighet digitalt och navigera i skogen med hjälp av
              kartan. Det gör det enklare att förstå var olika bestånd finns, vilka åtgärder
              som är aktuella och hur skogen utvecklas.
            </SectionBody>
            <ul className="mt-[24px] md:mt-[32px] flex flex-col gap-[14px]">
              {MAP_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-[12px]">
                  <span
                    className="size-[22px] rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                    style={{ backgroundColor: HOLMEN_GREEN }}
                  >
                    <Check className="size-[14px] text-white" strokeWidth={3} />
                  </span>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] text-[15px] md:text-[16px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map screenshot — använder den riktiga property-map-bilden */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white shadow-[0px_24px_60px_0px_rgba(0,0,0,0.12)]">
              <ImageWithFallback
                src={imgPropertyMap}
                alt="Fastighetskarta i Min Skog"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5. Planera för framtiden — bild vänster, text höger
 * ============================================================ */
function PlanSection() {
  return (
    <section className="bg-white py-[72px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden md:order-1">
            <ImageWithFallback
              src={imgSapling}
              alt="Ung tallplanta i nyröjt område"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col md:order-2">
            <Eyebrow className="text-[#1a5e35]">Fatta tryggare beslut om din skog</Eyebrow>
            <SectionHeading className="text-[#021c20] mt-[16px] md:mt-[20px]">
              Planera för framtiden med rätt information.
            </SectionHeading>
            <SectionBody className="text-[#021c20] opacity-80 mt-[20px] md:mt-[24px]">
              Att äga skog handlar om långsiktighet. Med rätt information blir det lättare att
              planera, följa upp och fatta beslut tillsammans med din virkesköpare.
            </SectionBody>
            <SectionBody className="text-[#021c20] opacity-80 mt-[16px]">
              Min Skog hjälper dig att förstå nuläget och se vad som kan vara nästa steg — oavsett
              om det handlar om avverkning, skogsvård, återväxt eller planering.
            </SectionBody>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6. Så kommer du igång — 3 numrerade steg
 * ============================================================ */
const STEPS = [
  {
    n: 1,
    icon: 'avatar',
    title: 'Skapa konto',
    body: 'Registrera dig med ditt leverantörsnummer och mejladress.',
    useLucide: false,
  },
  {
    n: 2,
    icon: 'lock',
    title: 'Logga in säkert',
    body: 'Använd BankID eller dina inloggningsuppgifter.',
    useLucide: true,
  },
  {
    n: 3,
    icon: 'fastigheter',
    title: 'Utforska din skog',
    body: 'Se kartor, åtgärder, dokument och aktuell information.',
    useLucide: false,
  },
] as const;

function StepsSection() {
  return (
    <section className="bg-[#f7f7f7] py-[72px] md:py-[96px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <Eyebrow className="text-[#1a5e35]">Så kommer du igång</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-[16px] md:gap-[8px] mt-[32px]">
          {STEPS.map((s, i) => (
            <Fragment key={s.title}>
              <div
                className="bg-white border border-[#e4e4e4] p-[20px] md:p-[24px] flex items-center gap-[20px]"
              >
                <div className="relative shrink-0">
                  <div
                    className="size-[64px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#f0f4f0' }}
                  >
                    {s.useLucide ? (
                      <Lock className="size-[28px]" style={{ color: HOLMEN_GREEN }} strokeWidth={1.75} />
                    ) : (
                      <HolmenWebbIcon name={s.icon} size={30} color={HOLMEN_GREEN} />
                    )}
                  </div>
                  <span
                    className="absolute -top-[4px] -right-[4px] size-[24px] rounded-full text-white text-[12px] font-semibold flex items-center justify-center"
                    style={{ backgroundColor: HOLMEN_GREEN, fontVariationSettings: "'wdth' 100" }}
                  >
                    {s.n}
                  </span>
                </div>
                <div className="flex flex-col gap-[4px] flex-1 min-w-0">
                  <h3
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[17px] md:text-[18px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-75 text-[14px] leading-[1.5]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight
                  className="hidden md:block size-[28px] text-[#021c20] opacity-30 mx-auto"
                  strokeWidth={2}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 7. Stats — mörk forest-bg
 * ============================================================ */
const STATS = [
  {
    value: '15 000',
    label: 'privata skogsägare\nsamarbetar med Holmen',
  },
  {
    value: '11 miljoner m³',
    label: 'virke anskaffas\nvarje år',
  },
  {
    value: 'Nästan hela Sverige',
    label: 'Holmen Skog finns nära\nmånga skogsägare',
  },
] as const;

function StatsSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: DARK_BG }}>
      <ImageWithFallback
        src={imgForestExtra}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0" style={{ backgroundColor: `${DARK_BG}cc` }} />
      <div className="relative max-w-[1200px] mx-auto px-[16px] md:px-[40px] py-[64px] md:py-[88px]">
        <Eyebrow className="text-white/80 text-center block">En trygg partner i ditt skogsägande</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] mt-[32px] md:mt-[40px] divide-y md:divide-y-0 md:divide-x divide-white/15">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col items-center text-center px-[16px] py-[24px] md:py-0">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-white text-[32px] md:text-[44px] leading-[1.1]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {s.value}
              </p>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-80 text-[14px] md:text-[15px] leading-[1.5] mt-[12px] whitespace-pre-line"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 8. Tillgänglig på dator, surfplatta och mobil
 * ============================================================ */
function MultiDeviceSection() {
  return (
    <section className="bg-white py-[72px] md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-center">
          <div className="flex flex-col">
            <Eyebrow className="text-[#1a5e35]">Samma skog, oavsett skärm</Eyebrow>
            <SectionHeading className="text-[#021c20] mt-[16px] md:mt-[20px]">
              Tillgänglig på dator, surfplatta och mobil.
            </SectionHeading>
            <SectionBody className="text-[#021c20] opacity-80 mt-[20px] md:mt-[24px]">
              Planera hemma vid datorn. Följ upp ute i skogen med mobilen. Få samma översikt i
              surfplattan när du tar det lugnt. Min Skog fungerar lika bra oavsett vilken skärm
              du har framför dig — så att du kan komma åt informationen när du behöver den.
            </SectionBody>
            <ul className="mt-[24px] md:mt-[32px] flex flex-col gap-[14px]">
              {['Dator', 'Surfplatta', 'Mobil'].map((d) => (
                <li key={d} className="flex items-start gap-[12px]">
                  <span
                    className="size-[22px] rounded-full flex items-center justify-center shrink-0 mt-[2px]"
                    style={{ backgroundColor: HOLMEN_GREEN }}
                  >
                    <Check className="size-[14px] text-white" strokeWidth={3} />
                  </span>
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] text-[15px] md:text-[16px] font-medium"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Multi-device mockup — tablet + phone overlay, byggt med CSS */}
          <div className="relative w-full">
            <div className="relative w-full aspect-[5/4]">
              {/* Tablet */}
              <div
                className="absolute right-0 top-0 w-[78%] aspect-[4/3] bg-[#2d3a4e] rounded-[14px] p-[10px] shadow-[0px_24px_60px_0px_rgba(0,0,0,0.18)]"
              >
                <div className="bg-white rounded-[6px] w-full h-full overflow-hidden">
                  <ImageWithFallback
                    src={imgPropertyMap}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Phone */}
              <div
                className="absolute left-0 bottom-0 w-[34%] aspect-[9/19] bg-[#2d3a4e] rounded-[26px] p-[6px] shadow-[0px_24px_60px_0px_rgba(0,0,0,0.22)]"
              >
                <div className="bg-white rounded-[20px] w-full h-full overflow-hidden relative">
                  <ImageWithFallback
                    src={imgPropertyMap}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* Notch */}
                  <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[36%] h-[14px] bg-[#2d3a4e] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 9. Behöver du hjälp? — support bar
 * ============================================================ */
function HelpSection() {
  return (
    <section className="bg-[#f7f7f7] py-[40px] md:py-[56px] border-t border-[#e4e4e4]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[24px] md:gap-[32px]">
          <div
            className="size-[56px] rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#e8edf0' }}
          >
            <Headphones className="size-[28px]" style={{ color: NAVY }} strokeWidth={1.75} />
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <Eyebrow className="text-[#021c20] opacity-70">Behöver du hjälp?</Eyebrow>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] text-[14px] md:text-[15px] leading-[1.55] max-w-[680px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Har du frågor om din skog, ett avtal eller en planerad åtgärd kontaktar du din
              virkesköpare. Vid tekniska frågor om inloggning eller konto hjälper Holmens
              support dig vidare.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-[12px] w-full md:w-auto shrink-0">
            <ForestButton variant="white" size="small" className="w-full sm:w-auto">
              <span>Hitta din kontakt</span>
              <ArrowRight className="size-[14px]" strokeWidth={2.5} />
            </ForestButton>
            <ForestButton variant="primary" size="small" className="w-full sm:w-auto">
              <span>Kontakta supporten</span>
              <ArrowRight className="size-[14px]" strokeWidth={2.5} />
            </ForestButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 10. Final CTA — full-bleed forest med två CTAs
 * ============================================================ */
function FinalCTASection({
  onCreateAccount,
  onLogin,
}: {
  onCreateAccount: () => void;
  onLogin: () => void;
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: DARK_BG }}>
      <ImageWithFallback
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="relative max-w-[1200px] mx-auto px-[16px] md:px-[40px] py-[72px] md:py-[112px] flex flex-col items-center text-center">
        <Eyebrow className="text-white/85">Logga in och se din skog digitalt</Eyebrow>
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-white text-[28px] md:text-[40px] leading-[1.15] mt-[16px] md:mt-[20px] max-w-[820px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Få överblick över din fastighet, dina åtgärder och din kontakt med Holmen.
        </h2>
        <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px] md:mt-[40px] w-full sm:w-auto">
          <ForestButton variant="primary" onClick={onLogin} className="w-full sm:w-auto">
            <span>Logga in på Min Skog</span>
            <ArrowRight className="size-[16px]" strokeWidth={2.5} />
          </ForestButton>
          <ForestButton variant="white" onClick={onCreateAccount} className="w-full sm:w-auto">
            Skapa konto
          </ForestButton>
        </div>
      </div>
    </section>
  );
}
