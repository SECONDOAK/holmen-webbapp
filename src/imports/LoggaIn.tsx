import svgPaths from "./svg-0xbdgepmsi";
import imgBackground from "figma:asset/7b5c664b28bdaf6bafa54de30d5805c379bb3dfa.png";

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

function BankIdLogoSvgFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[61.5px] items-end justify-center left-0 overflow-clip pl-[392.596px] pr-[2px] py-[2px] top-0 w-[464px]" data-name="BankID_logo.svg fill">
      <BankIdLogoSvg />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#1e3856] h-[61.5px] relative shrink-0 w-full z-[1]" data-name="Link">
      <div aria-hidden="true" className="absolute border-2 border-[#1e3856] border-solid inset-0 pointer-events-none" />
      <BankIdLogoSvgFill />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans',sans-serif] font-bold h-[26px] justify-center leading-[0] left-1/2 text-[17px] text-center text-white top-[calc(50%-0.6px)] translate-x-[-50%] translate-y-[-50%] uppercase w-[262px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25.5px]">mobilt bankid</p>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col isolate items-start min-w-[464px] pb-[40px] pt-0 px-0 relative shrink-0 w-[464px]" data-name="Main">
      <Link />
    </div>
  );
}

function FiExternalLink() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="fi:external-link">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="fi:external-link">
          <path d={svgPaths.p387614c0} id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="2" />
          <path d="M12.5 2.5H17.5V7.5" id="Vector_2" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="2" />
          <path d="M8.33333 11.6667L17.5 2.5" id="Vector_3" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pb-[4px] pt-0 px-0 relative shrink-0">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.5px] border-[rgba(2,28,32,0.9)] border-solid inset-0 pointer-events-none" />
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Så behandlar vi dina personuppgifter
      </p>
      <FiExternalLink />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Frame />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[28px] text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Logga in i Min skog
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#021c20] text-[16px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Min skog är Holmens tjänst för dig som levererar virke. Här får du överblick över fastigheter, åtgärder och allt som förenklar ditt skogsägande.
      </p>
      <Main />
      <Frame4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[464px]">
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center px-[80px] py-[40px] relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0">
      <HolmenLogoBlueRgbSvg />
      <Frame3 />
    </div>
  );
}

function Background() {
  return (
    <div className="h-[1200px] max-w-[1920px] relative shrink-0 w-full" data-name="Background">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBackground} />
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] p-[80px] relative size-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[1200px] items-center min-h-px min-w-px relative shrink-0">
      <Background />
    </div>
  );
}

function Container() {
  return (
    <div className="content-start flex flex-wrap items-start min-h-[1200px] relative shrink-0 w-full" data-name="Container">
      <Frame6 />
    </div>
  );
}

export default function LoggaIn() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#ffffff] items-center relative size-full to-[#ffffff]" data-name="Logga in">
      <Container />
    </div>
  );
}