import svgPaths from "../imports/svg-89n0prm9l6";
import imgBackground from "figma:asset/7b5c664b28bdaf6bafa54de30d5805c379bb3dfa.png";
import imgPropertyMap from "figma:asset/16120362ff46e0ee48e96950e7d75c4ec8deb37a.png";
import { useState } from 'react';
import { HolmenCheckbox } from '../components/HolmenCheckbox';
import { HolmenInput } from '../components/HolmenInput';
import ForestButton from '../components/ForestButton';
import { Check } from 'lucide-react';

function HolmenLogoBlueRgbSvg() {
  return (
    <div className="h-[78.249px] relative shrink-0 w-[225px]" data-name="Holmen_Logo_Blue_RGB.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 225 79">
        <g id="Holmen_Logo_Blue_RGB.svg">
          <path d={svgPaths.p1841f100} fill="var(--fill-0, #1E3856)" id="Vector" />
          <path d={svgPaths.p192405f0} fill="var(--fill-0, #1E3856)" id="Vector_2" />
          <path d={svgPaths.pfb3fc00} fill="var(--fill-0, #1E3856)" id="Vector_3" />
          <path d={svgPaths.pd351180} fill="var(--fill-0, #1E3856)" id="Vector_4" />
          <path d={svgPaths.p11bf5370} fill="var(--fill-0, #1E3856)" id="Vector_5" />
          <path d={svgPaths.p28f00e00} fill="var(--fill-0, #1E3856)" id="Vector_6" />
        </g>
      </svg>
    </div>
  );
}

function UCheck() {
  return (
    <div className="absolute left-1/2 size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="u:check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:check">
          <path d={svgPaths.p22acaec0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Kontaktuppgifter, 2: Fastigheter, 3: Loading, 4: Klar
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('073 123 45 67');
  const [consentStorage, setConsentStorage] = useState(false);
  const [consentContact, setConsentContact] = useState(false);

  const canProceedStep1 = consentStorage; // Only require storage consent

  const handleNext = () => {
    if (currentStep === 1 && canProceedStep1) {
      setCurrentStep(2); // Go to properties step
    } else if (currentStep === 2) {
      setCurrentStep(3); // Go to loading
      // Simulate loading
      setTimeout(() => {
        setCurrentStep(4); // Go to completion
      }, 3000);
    } else if (currentStep === 4) {
      onComplete(); // Complete onboarding
    }
  };

  const handleSkip = () => {
    if (currentStep === 2) {
      setCurrentStep(4); // Skip to completion
    }
  };

  // Step indicator component
  const StepIndicator = ({ step, label, isCompleted, isActive }: { step: number; label: string; isCompleted: boolean; isActive: boolean }) => (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]">
      <div className={`relative rounded-[100px] shrink-0 size-[32px] ${isCompleted ? 'bg-[#1e3856]' : ''}`}>
        <div 
          aria-hidden="true" 
          className={`absolute inset-0 pointer-events-none rounded-[100px] ${
            isCompleted || isActive 
              ? 'border-[6px] border-[#1e3856]' 
              : 'border-2 border-[#d4d4d4]'
          } border-solid`} 
        />
        {isCompleted && <UCheck />}
      </div>
      <div 
        className={`font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[12px] text-center ${
          isCompleted || isActive ? 'text-[rgba(2,28,32,0.9)]' : 'text-[#021c20]'
        }`} 
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label.includes('-') ? (
          <>
            <p className="mb-0">{label.split('-')[0]}</p>
            <p>{label.split('-')[1]}</p>
          </>
        ) : (
          <p className="text-nowrap">{label}</p>
        )}
      </div>
    </div>
  );

  // Determine step states
  const loginCompleted = true; // Always completed since we're past login
  const contactCompleted = currentStep > 1;
  const dataCompleted = currentStep > 3;
  const doneCompleted = currentStep === 4;

  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffffff] items-center relative size-full to-[#ffffff] min-h-screen overflow-auto" data-name="Onboarding">
      <div className="relative w-full min-h-screen flex items-start justify-center pt-[80px] md:pt-[120px]">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBackground} />
        
        <div className="relative z-10 flex flex-col items-center gap-[24px] px-4 pb-[80px] w-full max-w-[704px]">
          <HolmenLogoBlueRgbSvg />
          
          <div className="bg-white content-stretch flex flex-col gap-[40px] items-center px-[40px] md:px-[80px] py-[40px] relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
            {/* Progress indicator */}
            <div className="content-stretch flex items-start w-full max-w-[464px]">
              <StepIndicator step={0} label="Logga in" isCompleted={loginCompleted} isActive={false} />
              
              <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0 -mx-2">
                <div aria-hidden="true" className={`absolute left-0 right-0 top-[16px] pointer-events-none border-t-2 border-dashed ${contactCompleted ? 'border-[#1e3856]' : 'border-[#d4d4d4]'}`} />
              </div>
              
              <StepIndicator step={1} label="Kontakt-uppgifter" isCompleted={contactCompleted} isActive={currentStep === 1} />
              
              <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0 -mx-2">
                <div aria-hidden="true" className={`absolute left-0 right-0 top-[16px] pointer-events-none border-t-2 border-dashed ${dataCompleted ? 'border-[#1e3856]' : 'border-[#d4d4d4]'}`} />
              </div>
              
              <StepIndicator step={2} label="Hämta data" isCompleted={dataCompleted} isActive={currentStep === 2 || currentStep === 3} />
              
              <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0 -mx-2">
                <div aria-hidden="true" className={`absolute left-0 right-0 top-[16px] pointer-events-none border-t-2 border-dashed ${doneCompleted ? 'border-[#1e3856]' : 'border-[#d4d4d4]'}`} />
              </div>
              
              <StepIndicator step={3} label="Klar!" isCompleted={doneCompleted} isActive={currentStep === 4} />
            </div>

            {/* Step content */}
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full max-w-[464px]">
              {/* Step 1: Kontaktuppgifter */}
              {currentStep === 1 && (
                <>
                  <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1e3856] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Dina kontaktuppgifter
                  </h2>
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-secondary)] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Fyll i de kontaktuppgifter du vill spara i Mina sidor. Använd en e-postadress som du regelbundet läser, då vi skickar bekräftelser, driftinformation och annan viktig kommunikation dit.
                  </p>

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <HolmenInput
                      id="email"
                      label="Epostadress"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <HolmenInput
                      id="phone"
                      label="Telefonnummer"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
                    <div className="flex items-start gap-3 w-full">
                      <HolmenCheckbox 
                        id="consent-storage" 
                        checked={consentStorage}
                        onCheckedChange={(checked) => setConsentStorage(checked === true)}
                        className="mt-1"
                      />
                      <label htmlFor="consent-storage" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] text-[var(--text-primary)] cursor-pointer" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Jag godkänner att Holmen lagrar och hanterar mina kontaktuppgifter.
                      </label>
                    </div>
                    
                    <div className="flex items-start gap-3 w-full">
                      <HolmenCheckbox 
                        id="consent-contact" 
                        checked={consentContact}
                        onCheckedChange={(checked) => setConsentContact(checked === true)}
                        className="mt-1"
                      />
                      <label htmlFor="consent-contact" className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[24px] text-[var(--text-primary)] cursor-pointer" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Jag godkänner att Holmen får kontakta mig.
                      </label>
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <ForestButton
                      onClick={handleNext}
                      disabled={!canProceedStep1}
                      className="w-full"
                    >
                      Nästa
                    </ForestButton>
                  </div>

                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[12px] text-[var(--text-secondary)] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Mer om hur vi lagrar dina personuppgifter hittar du i vår <span className="underline cursor-pointer hover:opacity-70">integritetspolicy</span>
                  </p>
                </>
              )}

              {/* Step 2: Lägg till fastigheter */}
              {currentStep === 2 && (
                <>
                  <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1e3856] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Lägg till dina fastigheter i Min skog
                  </h2>
                  
                  <div className="h-[260px] relative rounded-[12px] shrink-0 w-full overflow-hidden">
                    <img alt="Fastighetskarta" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgPropertyMap} />
                  </div>
                  
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-secondary)] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Med ett klick hämtar vi in dina fastigheter från offentliga register och visar dem samlat i Min skog.
                  </p>

                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <ForestButton
                      onClick={handleNext}
                      className="w-full"
                    >
                      Hämta mina fastigheter
                    </ForestButton>

                    <button
                      onClick={handleSkip}
                      className="w-full text-center hover:opacity-70 transition-opacity font-['IBM_Plex_Sans',sans-serif] font-bold text-[15px] text-[var(--text-primary)] uppercase"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Jag gör det senare
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Loading */}
              {currentStep === 3 && (
                <>
                  <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1e3856] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Vi bygger din skogsvy
                  </h2>
                  
                  <div className="py-6">
                    <div className="w-12 h-12 border-4 border-[#1e3856] border-t-transparent rounded-full animate-spin" />
                  </div>

                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-secondary)] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Hämtar fastigheter...
                  </p>
                </>
              )}

              {/* Step 4: Klar! */}
              {currentStep === 4 && (
                <>
                  <h2 className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1e3856] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Din skogsvy är redo!
                  </h2>
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-secondary)] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Dina fastigheter är nu kopplade till Min skog. Börja utforska kartor, åtgärder och tips för ett enklare skogsägande.
                  </p>

                  <ForestButton
                    onClick={handleNext}
                    className="w-full mt-4"
                  >
                    Utforska min skog
                  </ForestButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}