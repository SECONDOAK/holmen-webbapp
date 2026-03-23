import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import ForestButton from './ForestButton';
import { HolmenCheckbox } from './HolmenCheckbox';

interface TermsOfServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsOfServiceDialog({ open, onOpenChange }: TermsOfServiceDialogProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setHasScrolledToBottom(false);
      setHasAccepted(false);
    }
  }, [open]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    // Check if scrolled to bottom (with 10px tolerance)
    const isAtBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 10;
    
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    // Here you would typically save the acceptance to backend
    console.log('User accepted terms of service');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#e4e4e4]">
          <DialogTitle className="font-['IBM_Plex_Sans',sans-serif] text-[24px] text-[#1e3856]">
            Nya användarvillkor
          </DialogTitle>
          <DialogDescription className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#666] mt-2">
            Vänligen läs igenom och acceptera de nya användarvillkoren för att fortsätta använda tjänsten.
          </DialogDescription>
        </DialogHeader>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="px-6 py-4 overflow-y-auto max-h-[50vh] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#333] leading-relaxed"
        >
          <div className="space-y-4">
            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                1. Allmänna villkor
              </h3>
              <p>
                Dessa användarvillkor ("Villkoren") reglerar din användning av Holmens digitala tjänster för skogsförvaltning. 
                Genom att använda tjänsten accepterar du dessa villkor i sin helhet. Om du inte accepterar villkoren ska du 
                inte använda tjänsten.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                2. Tjänstens omfattning
              </h3>
              <p className="mb-2">Tjänsten tillhandahåller följande funktioner:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Digital karthantering och visualisering av fastigheter</li>
                <li>Skogsbruksplanering och åtgärdsuppföljning</li>
                <li>Anteckningar och dokumentation kopplade till geografiska platser</li>
                <li>Avdelningshantering och skogsdata</li>
              </ul>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                3. Användarens ansvar
              </h3>
              <p className="mb-2">Som användare åtar du dig att:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Endast använda tjänsten för lagliga ändamål</li>
                <li>Inte dela dina inloggningsuppgifter med tredje part</li>
                <li>Hålla din kontoinformation aktuell och korrekt</li>
                <li>Omedelbart rapportera eventuella säkerhetsbrott eller obehörig användning</li>
                <li>Följa gällande lagar och förordningar vid användning av tjänsten</li>
              </ul>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                4. Personuppgifter och integritet
              </h3>
              <p>
                Holmen behandlar dina personuppgifter i enlighet med gällande dataskyddslagstiftning (GDPR). 
                Vi samlar in och behandlar endast de personuppgifter som är nödvändiga för att tillhandahålla tjänsten. 
                För mer information, se vår integritetspolicy på holmen.com/integritet.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                5. Immateriella rättigheter
              </h3>
              <p>
                Alla immateriella rättigheter till tjänsten, inklusive men inte begränsat till programvara, design, 
                varumärken och innehåll, tillhör Holmen eller dess licensgivare. Du får inte kopiera, modifiera, 
                distribuera eller på annat sätt utnyttja tjänsten utan skriftligt tillstånd från Holmen.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                6. Tillgänglighet och support
              </h3>
              <p>
                Holmen strävar efter att tillhandahålla tjänsten med hög tillgänglighet, men kan inte garantera 
                oavbruten eller felfri drift. Vi förbehåller oss rätten att tillfälligt stänga av tjänsten för 
                underhåll och uppdateringar. Support tillhandahålls under kontorstid vardagar.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                7. Ansvarsbegränsning
              </h3>
              <p>
                Tjänsten tillhandahålls "som den är" utan garantier av något slag. Holmen ansvarar inte för 
                direkta eller indirekta skador som uppstår till följd av användning av tjänsten, inklusive men 
                inte begränsat till förlorade intäkter, datorer eller annan egendom.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                8. Ändringar av villkoren
              </h3>
              <p>
                Holmen förbehåller sig rätten att när som helst ändra dessa villkor. Vid väsentliga ändringar 
                kommer användare att informeras via e-post eller genom meddelande i tjänsten. Fortsatt användning 
                av tjänsten efter att ändringar trätt i kraft innebär att du accepterar de nya villkoren.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                9. Uppsägning
              </h3>
              <p>
                Du kan när som helst avsluta ditt konto genom att kontakta vår support. Holmen förbehåller sig 
                rätten att omedelbart stänga av eller avsluta ditt konto om du bryter mot dessa villkor eller 
                använder tjänsten på ett sätt som kan skada Holmen eller andra användare.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                10. Tillämplig lag och tvister
              </h3>
              <p>
                Dessa villkor ska tolkas och tillämpas i enlighet med svensk lag. Eventuella tvister ska i första 
                hand lösas genom förhandling mellan parterna. Om en uppgörelse inte kan nås ska tvisten avgöras 
                av svensk domstol med Stockholms tingsrätt som första instans.
              </p>
            </section>

            <section>
              <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#1e3856] mb-2">
                11. Kontaktuppgifter
              </h3>
              <p>
                Vid frågor om dessa användarvillkor eller tjänsten, vänligen kontakta oss:
              </p>
              <div className="mt-2 space-y-1">
                <p>Holmen AB</p>
                <p>Box 5407</p>
                <p>114 84 Stockholm</p>
                <p>E-post: support@holmen.com</p>
                <p>Telefon: 08-666 21 00</p>
              </div>
            </section>

            <section className="pt-4 pb-2">
              <p className="font-['IBM_Plex_Sans:Italic',sans-serif] text-[12px] text-[#666]">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#e4e4e4] space-y-4">
          <div className="flex items-start gap-3">
            <HolmenCheckbox
              id="accept-terms"
              checked={hasAccepted}
              onCheckedChange={(checked) => setHasAccepted(checked === true)}
              disabled={!hasScrolledToBottom}
              className="mt-1"
            />
            <label
              htmlFor="accept-terms"
              className={`font-['IBM_Plex_Sans',sans-serif] text-[14px] leading-relaxed cursor-pointer ${
                !hasScrolledToBottom ? 'text-[#999]' : 'text-[#333]'
              }`}
            >
              Jag har läst och accepterar de nya användarvillkoren. Jag förstår att fortsatt användning av 
              tjänsten innebär att jag följer dessa villkor.
            </label>
          </div>

          {!hasScrolledToBottom && (
            <p className="font-['IBM_Plex_Sans:Italic',sans-serif] text-[12px] text-[#ff6b35]">
              Du måste scrolla till botten av användarvillkoren för att kunna acceptera dem.
            </p>
          )}

          <div className="flex gap-3 justify-end">
            <ForestButton
              variant="white"
              size="small"
              onClick={() => onOpenChange(false)}
            >
              Avbryt
            </ForestButton>
            <ForestButton
              variant="primary"
              size="small"
              onClick={handleAccept}
              disabled={!hasAccepted}
            >
              Acceptera villkoren
            </ForestButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}