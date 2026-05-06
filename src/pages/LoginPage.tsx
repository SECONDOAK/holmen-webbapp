import svgPaths from "../imports/svg-0xbdgepmsi";
import imgBackground from "figma:asset/7b5c664b28bdaf6bafa54de30d5805c379bb3dfa.png";
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

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

function BankIdLogoSvg() {
  return (
    <div className="h-[57.5px] relative shrink-0 w-[69.404px]" data-name="BankID_logo.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 58">
        <g clipPath="url(#clip0_828_787)" id="BankID_logo.svg">
          <g id="Group">
            <path d={svgPaths.p3a962000} fill="var(--fill-0, white)" id="Vector" />
            <g id="Group_2">
              <path d={svgPaths.p31b76680} fill="var(--fill-0, white)" id="Vector_2" />
              <path d={svgPaths.p3bc60300} fill="var(--fill-0, white)" id="Vector_3" />
              <path d={svgPaths.p923ab00} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p16975f80} fill="var(--fill-0, white)" id="Vector_5" />
            </g>
            <path d={svgPaths.p3035b000} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p3cb3da00} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.pef81500} fill="var(--fill-0, white)" id="Vector_8" />
          </g>
          <g id="Vector_9"></g>
        </g>
        <defs>
          <clipPath id="clip0_828_787">
            <rect fill="white" height="57.5" width="69.4035" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface LoginPageProps {
  onLoginComplete: () => void;
}

export default function LoginPage({ onLoginComplete }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBankIdClick = () => {
    setIsLoading(true);
    // Simulate BankID authentication
    setTimeout(() => {
      onLoginComplete();
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffffff] items-center relative size-full to-[#ffffff] min-h-screen overflow-auto" data-name="Logga in">
      <div className="relative w-full min-h-screen flex items-start justify-center pt-[80px] md:pt-[120px]">
        <img alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={imgBackground} />
        
        <div className="relative z-10 flex flex-col items-center gap-[24px] px-4 pb-[80px] w-full max-w-[624px]">
          <HolmenLogoBlueRgbSvg />
          
          <div className="bg-white content-stretch flex flex-col items-center px-[40px] md:px-[80px] py-[40px] relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full max-w-[464px]">
              <h2 className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] md:text-[24px] text-[#1e3856] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Logga in i Min skog
              </h2>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[var(--text-secondary)] text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
                Min skog är Holmens tjänst för dig som levererar virke. Här får du överblick över fastigheter, åtgärder och allt som förenklar ditt skogsägande.
              </p>
              
              <button
                onClick={handleBankIdClick}
                disabled={isLoading}
                className="bg-[#1e3856] hover:bg-[#152b40] disabled:opacity-50 transition-colors w-full relative"
              >
                <div aria-hidden="true" className="absolute border-2 border-[#1e3856] border-solid inset-0 pointer-events-none" />
                <div className="absolute flex flex-col h-[26px] justify-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] text-[16px] text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    mobilt bankid
                  </p>
                </div>
                <div className="absolute right-[16px] top-1/2 translate-y-[-50%]">
                  <BankIdLogoSvg />
                </div>
                <div className="h-[61.5px]" />
              </button>

              <button className="content-stretch flex gap-[8px] items-center pb-[4px] pt-0 px-0 relative shrink-0 hover:opacity-80 transition-opacity">
                <div aria-hidden="true" className="absolute border-[0px_0px_1.5px] border-[rgba(2,28,32,0.9)] border-solid inset-0 pointer-events-none" />
                <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Så behandlar vi dina personuppgifter
                </p>
                <ExternalLink className="w-5 h-5 text-[rgba(2,28,32,0.9)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}