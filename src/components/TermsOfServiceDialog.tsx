import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import ForestButton from './ForestButton';

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * TermsOfServiceDialog — speciell modal med scrollbar mitten.
 * Matchar HolmenModal-stilen i header/footer men har en egen scrollyta
 * mellan dem så användaren måste scrolla till botten innan accept aktiveras.
 */
export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lås body scroll & reset state när dialogen öppnas/stängs
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setHasScrolledToBottom(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Stäng med Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 10;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    console.log('User accepted terms of service');
    onOpenChange(false);
  };

  if (!open) return null;

  const sectionTitle = "font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#1e3856] mb-2";
  const bodyText = "font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] leading-[1.5]";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onOpenChange(false);
      }}
    >
      <div
        className="bg-white w-full max-w-[480px] max-h-[min(680px,90vh)] flex flex-col relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        {/* Close button — top-right corner */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 z-10"
          aria-label="Stäng"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-[8px] p-6 pr-14 border-b border-[#e4e4e4] shrink-0">
          <h2
            id="terms-modal-title"
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[16px] text-[#1e3856]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Nya användarvillkor
          </h2>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[1.5] text-[14px] text-[var(--text-secondary)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Läs igenom hela texten och acceptera villkoren för att fortsätta använda tjänsten. Knappen aktiveras när du scrollat till botten.
          </p>
        </div>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <div className="space-y-4">
            <section>
              <h3 className={sectionTitle}>1. Allmänna villkor</h3>
              <p className={bodyText}>
                Dessa användarvillkor ("Villkoren") reglerar din användning av Holmens digitala tjänster för skogsförvaltning.
                Genom att använda tjänsten accepterar du dessa villkor i sin helhet. Om du inte accepterar villkoren ska du
                inte använda tjänsten.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>2. Tjänstens omfattning</h3>
              <p className={`${bodyText} mb-2`}>Tjänsten tillhandahåller följande funktioner:</p>
              <ul className={`${bodyText} list-disc pl-6 space-y-1`}>
                <li>Digital karthantering och visualisering av fastigheter</li>
                <li>Skogsbruksplanering och åtgärdsuppföljning</li>
                <li>Anteckningar och dokumentation kopplade till geografiska platser</li>
                <li>Avdelningshantering och skogsdata</li>
              </ul>
            </section>

            <section>
              <h3 className={sectionTitle}>3. Användarens ansvar</h3>
              <p className={`${bodyText} mb-2`}>Som användare åtar du dig att:</p>
              <ul className={`${bodyText} list-disc pl-6 space-y-1`}>
                <li>Endast använda tjänsten för lagliga ändamål</li>
                <li>Inte dela dina inloggningsuppgifter med tredje part</li>
                <li>Hålla din kontoinformation aktuell och korrekt</li>
                <li>Omedelbart rapportera eventuella säkerhetsbrott eller obehörig användning</li>
                <li>Följa gällande lagar och förordningar vid användning av tjänsten</li>
              </ul>
            </section>

            <section>
              <h3 className={sectionTitle}>4. Personuppgifter och integritet</h3>
              <p className={bodyText}>
                Holmen behandlar dina personuppgifter i enlighet med gällande dataskyddslagstiftning (GDPR).
                Vi samlar in och behandlar endast de personuppgifter som är nödvändiga för att tillhandahålla tjänsten.
                För mer information, se vår integritetspolicy på holmen.com/integritet.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>5. Immateriella rättigheter</h3>
              <p className={bodyText}>
                Alla immateriella rättigheter till tjänsten, inklusive men inte begränsat till programvara, design,
                varumärken och innehåll, tillhör Holmen eller dess licensgivare. Du får inte kopiera, modifiera,
                distribuera eller på annat sätt utnyttja tjänsten utan skriftligt tillstånd från Holmen.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>6. Tillgänglighet och support</h3>
              <p className={bodyText}>
                Holmen strävar efter att tillhandahålla tjänsten med hög tillgänglighet, men kan inte garantera
                oavbruten eller felfri drift. Vi förbehåller oss rätten att tillfälligt stänga av tjänsten för
                underhåll och uppdateringar. Support tillhandahålls under kontorstid vardagar.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>7. Ansvarsbegränsning</h3>
              <p className={bodyText}>
                Tjänsten tillhandahålls "som den är" utan garantier av något slag. Holmen ansvarar inte för
                direkta eller indirekta skador som uppstår till följd av användning av tjänsten, inklusive men
                inte begränsat till förlorade intäkter, datorer eller annan egendom.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>8. Ändringar av villkoren</h3>
              <p className={bodyText}>
                Holmen förbehåller sig rätten att när som helst ändra dessa villkor. Vid väsentliga ändringar
                kommer användare att informeras via e-post eller genom meddelande i tjänsten. Fortsatt användning
                av tjänsten efter att ändringar trätt i kraft innebär att du accepterar de nya villkoren.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>9. Uppsägning</h3>
              <p className={bodyText}>
                Du kan när som helst avsluta ditt konto genom att kontakta vår support. Holmen förbehåller sig
                rätten att omedelbart stänga av eller avsluta ditt konto om du bryter mot dessa villkor eller
                använder tjänsten på ett sätt som kan skada Holmen eller andra användare.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>10. Tillämplig lag och tvister</h3>
              <p className={bodyText}>
                Dessa villkor ska tolkas och tillämpas i enlighet med svensk lag. Eventuella tvister ska i första
                hand lösas genom förhandling mellan parterna. Om en uppgörelse inte kan nås ska tvisten avgöras
                av svensk domstol med Stockholms tingsrätt som första instans.
              </p>
            </section>

            <section>
              <h3 className={sectionTitle}>11. Kontaktuppgifter</h3>
              <p className={bodyText}>
                Vid frågor om dessa användarvillkor eller tjänsten, vänligen kontakta oss:
              </p>
              <div className={`${bodyText} mt-2 space-y-1`}>
                <p>Holmen AB</p>
                <p>Box 5407</p>
                <p>114 84 Stockholm</p>
                <p>E-post: support@holmen.com</p>
                <p>Telefon: 08-666 21 00</p>
              </div>
            </section>

            <section className="pt-4 pb-2">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[var(--text-secondary)]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex flex-col gap-[16px] shrink-0">
          <div className="flex flex-col-reverse md:flex-row gap-3 [&>*]:flex-auto">
            <ForestButton variant="white" onClick={() => onOpenChange(false)}>
              Avbryt
            </ForestButton>
            <ForestButton
              variant="primary"
              onClick={handleAccept}
              disabled={!hasScrolledToBottom}
            >
              Acceptera villkoren
            </ForestButton>
          </div>
        </div>
      </div>
    </div>
  );
}
