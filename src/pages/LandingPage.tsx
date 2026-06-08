import { useState } from 'react';
import {
  Eye,
  Wallet,
  MousePointerClick,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import imgHero from 'figma:asset/7b5c664b28bdaf6bafa54de30d5805c379bb3dfa.png';
import imgVirkeskopare from 'figma:asset/9e613302068097aa58a90d360320b38f2a46f3c7.png';
import imgService1 from 'figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png';
import imgService2 from 'figma:asset/b9b24634fb07428e2dc20f8097db4e9fc28da1a8.png';
import imgService3 from 'figma:asset/75b3c58e1d7ca3dcdad92a5df6536325e03f9adb.png';
import imgService4 from 'figma:asset/b757b27974630ff853f231ffb96e907b1257534b.png';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import PublicHeader from '../components/PublicHeader';
import ForestButton from '../components/ForestButton';
import { Footer } from '../components/Footer';

interface LandingPageProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

/**
 * Publik landningssida för Min Skog — sidan en förstabesökare ser
 * innan login/onboarding. Genomgående fokus på värde och enkelhet,
 * inte funktionsuppräkning (Skogstoget-toned).
 *
 * Sektioner i ordning:
 *   1. PublicHeader (sticky)
 *   2. Hero — värdeproposition + CTA
 *   3. Intro-paragraf
 *   4. Värden (4 förmånsbaserade kort)
 *   5. Så enkelt kommer du igång (3 steg)
 *   6. Allt du behöver (tjänster)
 *   7. Personligt stöd (Holmen + virkesköpare)
 *   8. Vanliga frågor (FAQ accordion)
 *   9. Slut-CTA (mörk bakgrund)
 *  10. Footer
 */
export default function LandingPage({ onCreateAccount, onLogin }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicHeader onLogin={onLogin} />

      <HeroSection onCreateAccount={onCreateAccount} onLogin={onLogin} />
      <IntroSection />
      <ValuesSection />
      <HowItWorksSection />
      <ServicesSection />
      <PersonalSupportSection />
      <FAQSection />
      <EndCTASection onCreateAccount={onCreateAccount} />

      <Footer />
    </div>
  );
}

/* ============================================================
 * 2. Hero
 * ============================================================ */
function HeroSection({
  onCreateAccount,
  onLogin,
}: {
  onCreateAccount: () => void;
  onLogin: () => void;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#1e3856]">
      {/* Bakgrundsbild med mörk gradient overlay sa vit text blir lasbar */}
      <ImageWithFallback
        src={imgHero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3856]/70 via-[#1e3856]/50 to-[#1e3856]/85" />

      {/* Innehåll */}
      <div className="relative max-w-[1200px] mx-auto px-[16px] md:px-[40px] py-[80px] md:py-[140px] min-h-[480px] md:min-h-[560px] flex flex-col items-start justify-center">
        <h1
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-white text-[28px] md:text-[44px] leading-[1.15] max-w-[760px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Upplev ett enklare skogsägande.
        </h1>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-90 text-[18px] md:text-[22px] mt-[16px] max-w-[640px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Hela din skog — när och var du vill.
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-75 text-[15px] md:text-[16px] mt-[12px] max-w-[540px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          För dig som vill äga skog med koll — utan krångel.
        </p>

        <div className="flex flex-col sm:flex-row gap-[12px] mt-[40px] w-full sm:w-auto">
          <ForestButton variant="primary" onClick={onCreateAccount} className="w-full sm:w-auto">
            Skapa konto
          </ForestButton>
          <ForestButton variant="white" onClick={onLogin} className="w-full sm:w-auto">
            Logga in
          </ForestButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 3. Intro-paragraf
 * ============================================================ */
function IntroSection() {
  return (
    <section className="bg-[#f7f7f7] py-[64px] md:py-[96px]">
      <div className="max-w-[760px] mx-auto px-[16px] md:px-[24px] text-center">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] text-[18px] md:text-[20px] leading-[1.55]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Min Skog ger dig en tydlig översikt över din skog. Här följer du aktuella åtgärder,
          ser dina bestånd när och var du vill, och beställer enkelt tjänster som röjning eller
          en skogsbruksplan — digitalt. Den skogliga ekonomin sköter du smidigt och överskådligt
          — utan papperskrångel.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * 4. Värden (4 förmånsbaserade kort)
 * ============================================================ */
const VALUES = [
  {
    icon: Eye,
    title: 'Tydlig översikt',
    body: 'Hela din skog på ett ställe — fastigheter, kontrakt och åtgärder samlat och alltid uppdaterat.',
  },
  {
    icon: Wallet,
    title: 'Smidig ekonomi',
    body: 'Utbetalningar, avräkningar och årsbesked du faktiskt förstår — utan att leta i pärmar.',
  },
  {
    icon: MousePointerClick,
    title: 'Enkla tjänster',
    body: 'Beställ röjning, plantering eller en skogsbruksplan på minuter — när det passar dig.',
  },
  {
    icon: ShieldCheck,
    title: 'Trygg digital hantering',
    body: 'Signera kontrakt med BankID. Säkert, snabbt och alltid sparat.',
  },
] as const;

function ValuesSection() {
  return (
    <section className="bg-white py-[64px] md:py-[96px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[24px] md:text-[32px] leading-[1.2] text-center max-w-[760px] mx-auto"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Vad du får med Min Skog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] mt-[48px] md:mt-[64px]">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-[20px] md:p-[24px] flex flex-col gap-[16px]"
              >
                <div className="size-[48px] bg-[#e4f5f5] flex items-center justify-center shrink-0">
                  <Icon className="size-[24px] text-[#1e3856]" strokeWidth={2} />
                </div>
                <h3
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[18px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[14px] leading-[1.5]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {v.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 5. Så enkelt kommer du igång (3 steg)
 * ============================================================ */
const STEPS = [
  {
    n: 1,
    title: 'Logga in med BankID',
    body: 'Säkert och enkelt — inga extra lösenord att hålla reda på.',
  },
  {
    n: 2,
    title: 'Hitta din skog',
    body: 'Sök upp din fastighet och kom igång direkt.',
  },
  {
    n: 3,
    title: 'Hantera allt digitalt',
    body: 'Översikt, ekonomi och tjänster — alltid bara några klick bort.',
  },
] as const;

function HowItWorksSection() {
  return (
    <section className="bg-[#f7f7f7] py-[64px] md:py-[96px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[24px] md:text-[32px] leading-[1.2] text-center"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Så enkelt kommer du igång
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] mt-[48px] md:mt-[64px]">
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col items-start">
              {/* Stort siffer-ankare bakom texten */}
              <span
                aria-hidden
                className="font-['IBM_Plex_Sans',sans-serif] font-bold text-[#1e3856] opacity-15 text-[88px] md:text-[100px] leading-none -ml-[4px] mb-[-32px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {s.n}
              </span>
              <h3
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[20px] relative"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {s.title}
              </h3>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[15px] leading-[1.55] mt-[8px] max-w-[320px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 6. Allt du behöver — utan att lyfta luren (tjänster)
 * ============================================================ */
const SERVICES = [
  {
    img: imgService1,
    title: 'Skogsbruksplan',
    body: 'Få en uppdaterad plan att fatta beslut utifrån.',
  },
  {
    img: imgService2,
    title: 'Avverkning & gallring',
    body: 'Sköt din skog när tiden är inne — vi tar hand om resten.',
  },
  {
    img: imgService3,
    title: 'Plantering & röjning',
    body: 'Säkra återväxten utan att lyfta ett finger själv.',
  },
  {
    img: imgService4,
    title: 'Vägar & vägunderhåll',
    body: 'Trygga in- och utfarter för både skördetid och vardag.',
  },
] as const;

function ServicesSection() {
  return (
    <section className="bg-white py-[64px] md:py-[96px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="max-w-[760px] mx-auto text-center">
          <h2
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[24px] md:text-[32px] leading-[1.2]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Allt du behöver — utan att lyfta luren
          </h2>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[16px] md:text-[18px] mt-[16px] leading-[1.55]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Beställ skogliga tjänster direkt i appen. Snabbare, smidigare och alltid med Holmens
            kvalitet bakom.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] md:gap-[24px] mt-[48px] md:mt-[64px]">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#f7f7f7]">
                <ImageWithFallback
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-[20px] flex flex-col gap-[8px] flex-1">
                <h3
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[18px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {s.title}
                </h3>
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[14px] leading-[1.5]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 7. Personligt stöd
 * ============================================================ */
function PersonalSupportSection() {
  return (
    <section className="bg-[#f7f7f7] py-[64px] md:py-[96px]">
      <div className="max-w-[1200px] mx-auto px-[16px] md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[64px] items-center">
          {/* Bild — virkesköpar-foto, rundad */}
          <div className="w-full aspect-square max-w-[420px] mx-auto md:mx-0 md:order-1 overflow-hidden">
            <ImageWithFallback
              src={imgVirkeskopare}
              alt="Virkesköpare hos Holmen"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex flex-col gap-[16px] md:order-2">
            <h2
              className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[24px] md:text-[32px] leading-[1.2]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Personligt stöd — när du behöver det
            </h2>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] text-[16px] md:text-[18px] leading-[1.55]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Bakom Min Skog står Holmen — ett av Sveriges största skogsbolag. Din virkesköpare
              finns alltid bara ett samtal bort.
            </p>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[15px] md:text-[16px] leading-[1.6]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Det digitala underlättar — men det är fortfarande människor som hjälper dig framåt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 8. Vanliga frågor (FAQ)
 * ============================================================ */
const FAQS = [
  {
    q: 'Vad kostar Min Skog?',
    a: 'Min Skog är gratis att använda. Det enda du behöver är BankID.',
  },
  {
    q: 'Måste jag vara kund hos Holmen?',
    a: 'Ja, Min Skog är till för dig som har eller vill ha ett samarbete med Holmen kring din skog.',
  },
  {
    q: 'Kan jag signera kontrakt digitalt?',
    a: 'Ja. Alla kontrakt kan signeras med BankID direkt i Min Skog — säkert och utan att skicka papper fram och tillbaka.',
  },
  {
    q: 'Hur säker är tjänsten?',
    a: 'Inloggning sker med BankID och all kommunikation är krypterad. Din skogliga data är skyddad enligt branschstandard.',
  },
  {
    q: 'Kan flera personer dela på en fastighet?',
    a: 'Ja. Om ni samäger en fastighet kan ni alla logga in och se samma kontrakt, ekonomi och åtgärder.',
  },
  {
    q: 'Vad gör jag om jag behöver hjälp?',
    a: 'Din virkesköpare hos Holmen finns alltid till hands. Du hittar deras kontaktuppgifter både i appen och på vår webbplats.',
  },
  {
    q: 'Hur kommer jag igång?',
    a: "Klicka 'Skapa konto', identifiera dig med BankID och följ stegen — det tar bara ett par minuter.",
  },
] as const;

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="bg-white py-[64px] md:py-[96px]">
      <div className="max-w-[760px] mx-auto px-[16px] md:px-[24px]">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[24px] md:text-[32px] leading-[1.2] text-center"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Vanliga frågor
        </h2>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-70 text-[16px] mt-[12px] text-center"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Här svarar vi på det som brukar dyka upp om Min Skog.
        </p>

        <div className="mt-[40px] md:mt-[56px] border-t border-[#e4e4e4]">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className="border-b border-[#e4e4e4]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-[16px] py-[18px] text-left cursor-pointer"
                  aria-expanded={open}
                >
                  <span
                    className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[#021c20] text-[16px] md:text-[17px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`size-[20px] text-[#021c20] shrink-0 transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2}
                  />
                </button>
                {open && (
                  <p
                    className="font-['IBM_Plex_Sans',sans-serif] text-[#021c20] opacity-80 text-[15px] md:text-[16px] leading-[1.6] pb-[20px] pr-[36px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 9. Slut-CTA
 * ============================================================ */
function EndCTASection({ onCreateAccount }: { onCreateAccount: () => void }) {
  return (
    <section className="bg-[#1e3856] py-[56px] md:py-[80px]">
      <div className="max-w-[760px] mx-auto px-[16px] md:px-[24px] text-center">
        <h2
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-white text-[24px] md:text-[32px] leading-[1.2]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Kom igång med Min Skog idag.
        </h2>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-white opacity-85 text-[16px] md:text-[18px] mt-[12px] md:mt-[16px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Skapa konto med BankID — det tar två minuter.
        </p>
        <div className="mt-[32px] md:mt-[40px] flex justify-center">
          <ForestButton variant="white" onClick={onCreateAccount}>
            <span>Skapa konto</span>
            <ArrowRight className="size-[16px]" strokeWidth={2.5} />
          </ForestButton>
        </div>
      </div>
    </section>
  );
}
