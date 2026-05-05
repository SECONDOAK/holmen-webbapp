import svgPaths from "./svg-7zwf4k3sqm";
import imgImage from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage1 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";
import imgImage2 from "figma:asset/6de4179d56125a8b57a135794de8f0a2212ced41.png";
import imgImage3 from "figma:asset/695306fa9eeef29672b44ac0be3805d520fbe8d9.png";
import imgImage4 from "figma:asset/941bf56cd323414c17fd618e873c91abb0be537e.png";
import imgImage5 from "figma:asset/f96bb5ed15ba981ed51c16d43f023d9da75e9a0e.png";
import imgImage6 from "figma:asset/4630a2faf79b97d9651311f9c0575b30cf18ae70.png";

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center leading-[normal] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Din virkesköpare
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal opacity-70 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Daniel Larsson
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center pl-[6px] pr-[16px] py-[6px] relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="pointer-events-none relative rounded-[1000px] size-[40px]" data-name="image">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={imgImage} />
            <div aria-hidden="true" className="absolute border border-solid border-white inset-0 rounded-[1000px]" />
          </div>
        </div>
      </div>
      <Frame20 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="bg-[#e4e4e4] h-[32px] opacity-50 shrink-0 w-px" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame22 />
      <Frame21 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-end leading-[normal] relative shrink-0 text-[14px] text-nowrap whitespace-pre">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0 text-white" style={{ fontVariationSettings: "'wdth' 100" }}>{`John Doe `}</p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[#f2f2f7]" style={{ fontVariationSettings: "'wdth' 100" }}>
        John.doe@holmen.com
      </p>
    </div>
  );
}

function UUser() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:user">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:user">
          <path d={svgPaths.p28c68d00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[22px] items-center justify-center relative rounded-[100px] shrink-0 size-[40px]">
      <UUser />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0">
      <Frame13 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0">
      <Frame />
      <Frame14 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame23 />
      <Frame3 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#1e3856] box-border content-stretch flex items-center justify-between px-[40px] py-[12px] relative self-stretch shrink-0 w-[1800px]" data-name="Header">
      <div className="h-[21px] relative shrink-0 w-[140px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <Frame24 />
    </div>
  );
}

function HeaderMinSkogV() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Header min skog v2">
      <Header />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p37e7fc00} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Översikt
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p34e34a00} id="Vector 4" stroke="var(--stroke-0, #1E3856)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon1 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fastigheter
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p138fd0f1} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon2 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame11 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p2e055000} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon3 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Våra Tjänster
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame12 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p1c3f3d00} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon4 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mer
      </p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Tabs">
      <Frame15 />
    </div>
  );
}

function SideMenu() {
  return (
    <div className="bg-white h-[1536px] relative shrink-0" data-name="Side menu 2">
      <div className="content-stretch flex flex-col h-[1536px] items-start overflow-clip relative rounded-[inherit]">
        <Frame1 />
        <Frame2 />
        <Frame9 />
        <Frame8 />
        <Tabs />
      </div>
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UMapMarkerInfo() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:map-marker-info">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:map-marker-info">
          <path d={svgPaths.p3e227c00} fill="var(--fill-0, #663336)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#fad2af] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UMapMarkerInfo />
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame25 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Skogsbruksplan saknas för TOSÄTTER 7:18
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Beställ skogsbruksplan
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[15px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visa i karta
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame17 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[0px] text-[14px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <span>{`Vi kan se att du saknar en skogsbruksplan för din fastighet `}</span>
            <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
              TOSÄTTER 7:18
            </span>
            . Vi hjälper dig gärna att upprätta en plan för att sköta din skog på ett optimalt sätt.
          </p>
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="[grid-area:1_/_1] bg-white h-[212px] min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col h-[212px] items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame26 />
        <Frame6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UEditAlt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:edit-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:edit-alt">
          <path d={svgPaths.pce03b00} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UEditAlt />
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame29 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Nytt kontrakt väntar på signering
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[0px] text-nowrap w-full whitespace-pre">
      <p className="leading-[normal] relative shrink-0 text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
          Daniel Larsson
        </span>
        <span>{` har bjudit in dig att e-signera kontraktet`}</span>
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame32 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
      <Frame7 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame18 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Signera kontrakt
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1e3856] relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame34 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame19 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="[grid-area:1_/_2] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame30 />
        <Frame35 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-black w-[238px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Daniel Larsson
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] w-[238px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Virkesköpare
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <Frame28 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal italic leading-[normal] min-w-full relative shrink-0 text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hej, jag heter Daniel. Hör av dig till mig när du har frågor om skötseln av din skog, virkesaffärer eller om du vill veta mer om vad vi på Holmen kan hjälpa dig med.
      </p>
    </div>
  );
}

function MaterialSymbolsPhoneIphone() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:phone-iphone">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:phone-iphone">
          <path d={svgPaths.p180c2000} fill="var(--fill-0, #0F233B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <MaterialSymbolsPhoneIphone />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[15px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        123 456 78 90
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 bg-[#e4f5f5] grow min-h-px min-w-[160px] relative shrink-0" data-name="Button">
      <div className="min-w-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start min-w-inherit px-[16px] py-[8px] relative w-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function MaterialSymbolsMailOutlineSharp() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols:mail-outline-sharp">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols:mail-outline-sharp">
          <path d={svgPaths.pdd65500} fill="var(--fill-0, #0F233B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <MaterialSymbolsMailOutlineSharp />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[15px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mejla daniel
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-[#e4f5f5] grow min-h-px min-w-[160px] relative shrink-0" data-name="Button">
      <div className="min-w-inherit overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start min-w-inherit px-[16px] py-[8px] relative w-full">
          <Frame38 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-start flex flex-wrap gap-[12px] items-start relative shrink-0 w-full">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[24px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <Frame36 />
      <Frame39 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <div className="pointer-events-none relative rounded-[1000px] shrink-0 size-[140px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={imgImage} />
        <div aria-hidden="true" className="absolute border border-neutral-300 border-solid inset-0 rounded-[1000px]" />
      </div>
      <Frame40 />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="[grid-area:2_/_1] bg-white relative self-start shrink-0" data-name="Contact card">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[24px] relative w-full">
          <Frame41 />
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[440px] relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1604px]">
      <Frame31 />
      <Frame33 />
      <ContactCard />
    </div>
  );
}

function Time() {
  return <div className="absolute h-[130px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image() {
  return (
    <div className="relative shrink-0 size-[210px] z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
      <Time />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nyhet
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Vi ses på Elmia Wood 5-7 juni
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Image />
      <Paragraph />
    </div>
  );
}

function Calendar() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container />
    </div>
  );
}

function Time1() {
  return <div className="absolute h-[130px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[210px] z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
      <Time1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsliv
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nytt nummer av skogsliv ute
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Image1 />
      <Paragraph1 />
    </div>
  );
}

function Calendar1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container1 />
    </div>
  );
}

function Time2() {
  return <div className="absolute h-[130px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image2() {
  return (
    <div className="relative shrink-0 size-[210px] z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
      <Time2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hållbarhet
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        2024 års granbarkborrekarta är här
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Image2 />
      <Paragraph2 />
    </div>
  );
}

function Calendar2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container2 />
    </div>
  );
}

function Time3() {
  return <div className="absolute h-[130px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image3() {
  return (
    <div className="relative shrink-0 size-[210px] z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage5} />
      <Time3 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Utbildning
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gratis utbildning i skogsbrand
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Image3 />
      <Paragraph3 />
    </div>
  );
}

function Calendar3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container3 />
    </div>
  );
}

function Time4() {
  return <div className="absolute h-[130px] left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image4() {
  return (
    <div className="relative shrink-0 size-[210px] z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
      <Time4 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Utbildning
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gratis utbildning i skogsbrand
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Image4 />
      <Paragraph4 />
    </div>
  );
}

function Calendar4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container4 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[30px] items-start relative shrink-0 w-[1250px]">
      <Calendar />
      <Calendar1 />
      <Calendar2 />
      <Calendar3 />
      <Calendar4 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nyheter
      </p>
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[normal] relative shrink-0 text-center text-nowrap uppercase whitespace-pre">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#663336] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        JULI
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0 text-[#0f233b] text-[72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        15
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#0f233b] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Time5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time">
      <Frame45 />
    </div>
  );
}

function Block() {
  return (
    <div className="bg-[#e4f5f5] relative shrink-0 size-[210px] z-[2]" data-name="Block">
      <Time5 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Additional label
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Delårsrapport januari - juni 2025
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Block />
      <Paragraph5 />
    </div>
  );
}

function Calendar5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container5 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[normal] relative shrink-0 text-center text-nowrap uppercase whitespace-pre">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#663336] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Augusti
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0 text-[#0f233b] text-[72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        24
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#0f233b] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Time6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time">
      <Frame46 />
    </div>
  );
}

function Block1() {
  return (
    <div className="bg-[#e4f5f5] relative shrink-0 size-[210px] z-[2]" data-name="Block">
      <Time6 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Additional label
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Delårsrapport januari - juni 2025
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Block1 />
      <Paragraph6 />
    </div>
  );
}

function Calendar6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container6 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col items-center leading-[normal] relative shrink-0 text-center text-nowrap uppercase whitespace-pre">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#663336] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nov
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold relative shrink-0 text-[#0f233b] text-[72px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        11
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[#0f233b] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Time7() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time">
      <Frame47 />
    </div>
  );
}

function Block2() {
  return (
    <div className="bg-[#e4f5f5] relative shrink-0 size-[210px] z-[2]" data-name="Block">
      <Time7 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[15.5px] items-start leading-[normal] max-h-[192px] pb-0 pt-px px-0 relative shrink-0 text-[#021c20] w-full z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Additional label
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Delårsrapport januari - juni 2025
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal relative shrink-0 text-[14px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15 maj 2025
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] isolate items-start justify-center min-h-[192px] relative shrink-0" data-name="Container">
      <Block2 />
      <Paragraph7 />
    </div>
  );
}

function Calendar7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-0 py-[24px] relative shrink-0" data-name="Calendar">
      <Container7 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[30px] items-start relative shrink-0 w-[1250px]">
      <Calendar5 />
      <Calendar6 />
      <Calendar7 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kalender
      </p>
      <Frame48 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[40px] h-[1013px] items-start overflow-x-clip overflow-y-auto px-[48px] py-[40px] relative shrink-0 w-[1700px]">
      <Frame42 />
      <Frame44 />
      <Frame49 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex items-start ml-0 mt-0 relative">
      <SideMenu />
      <Frame4 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame50 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1800px]">
      <HeaderMinSkogV />
      <Group />
    </div>
  );
}

export default function FastighetIHolmensVerksamhetsomrade() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Fastighet i holmens verksamhetsområde">
      <Frame51 />
    </div>
  );
}