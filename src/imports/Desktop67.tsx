import svgPaths from "./svg-vm1sobzh2f";
import imgImage from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage1 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";

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

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0">
      <Frame />
      <Frame14 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Frame23 />
      <Frame10 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#1e3856] box-border content-stretch flex items-center justify-between px-[40px] py-[12px] relative self-stretch shrink-0 w-[1800px]" data-name="Header">
      <div className="h-[21px] relative shrink-0 w-[140px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <Frame28 />
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
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p37e7fc00} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Översikt
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <Frame11 />
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

function Frame12() {
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
      <Frame12 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p138fd0f1} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon2 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame29 />
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

function Frame30() {
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
      <Frame30 />
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

function Frame31() {
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
      <Frame31 />
    </div>
  );
}

function SideMenu() {
  return (
    <div className="bg-white h-[1013px] relative shrink-0" data-name="Side menu 2">
      <div className="content-stretch flex flex-col h-[1013px] items-start overflow-clip relative rounded-[inherit]">
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

function Frame32() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Översikt
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame32 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontrakt
      </p>
    </div>
  );
}

function HorizontalTabs1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame34 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fakturor
      </p>
    </div>
  );
}

function HorizontalTabs2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame35 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Årsbesked
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame36 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-[600px]">
      <HorizontalTabs />
      <HorizontalTabs1 />
      <HorizontalTabs2 />
      <HorizontalTabs3 />
    </div>
  );
}

function UInfoCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="u:info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="u:info-circle">
          <path d={svgPaths.p20f26200} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Totalt utbetalt belopp
      </p>
      <UInfoCircle />
    </div>
  );
}

function Frame27() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Frame37 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#32412a] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{` 1 969 027 SEK`}</p>
        </div>
      </div>
    </div>
  );
}

function UInfoCircle1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="u:info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="u:info-circle">
          <path d={svgPaths.p20f26200} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Återstående belopp
      </p>
      <UInfoCircle1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Frame38 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#32412a] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            323 111 SEK
          </p>
        </div>
      </div>
    </div>
  );
}

function UInfoCircle2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="u:info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="u:info-circle">
          <path d={svgPaths.p20f26200} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Antal kontrakt
      </p>
      <UInfoCircle2 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Frame39 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#32412a] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            24
          </p>
        </div>
      </div>
    </div>
  );
}

function UInfoCircle3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="u:info-circle">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p3f032780} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pågående trakter
      </p>
      <UInfoCircle3 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[24px] relative w-full">
          <Frame40 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#32412a] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame27 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame41 />
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

function Frame42() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UEditAlt />
    </div>
  );
}

function Frame43() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame42 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Nytt kontrakt väntar på signering
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame44() {
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
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame44 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-end relative shrink-0">
      <Frame45 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Signera kontrakt
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame47 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame46 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-white min-w-[360px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame43 />
        <Frame6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[18px] relative w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g id="Icon">
          <path d={svgPaths.peec4300} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.72%_36.76%_84.14%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="basis-0 bg-white grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Component 1">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[68px] items-start pl-[34px] pr-[58px] py-[22px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Alla fastigheter
          </p>
          <Container />
        </div>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[18px] relative w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g id="Icon">
          <path d={svgPaths.peec4300} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.72%_36.76%_84.14%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon6 />
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="basis-0 bg-white grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Component 2">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[68px] items-start pl-[34px] pr-[58px] py-[22px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Alla uppdragstyper
          </p>
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[18px] relative w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g id="Icon">
          <path d={svgPaths.peec4300} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.72%_36.76%_84.14%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="basis-0 bg-white grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Component 3">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[68px] items-start pl-[34px] pr-[58px] py-[22px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            År (alla)
          </p>
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[18px] relative w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g id="Icon">
          <path d={svgPaths.peec4300} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.72%_36.76%_84.14%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon8 />
        </div>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="basis-0 bg-white grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Component 4">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[68px] items-start pl-[34px] pr-[58px] py-[22px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Status (alla)
          </p>
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[17px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visa
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#1e3856] grow min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[33px] py-[21px] relative w-full">
          <Frame48 />
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Component />
      <Component1 />
      <Component2 />
      <Component3 />
      <Button1 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table1() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Fastighet</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table2() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Kontraktsnummer</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table3() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Uppdragstyp</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table4() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">År</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table5() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Status</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table6() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Utbetalt (SEK)</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table7() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Återstående (SEK)</p>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table />
      <Table1 />
      <Table2 />
      <Table3 />
      <Table4 />
      <Table5 />
      <Table6 />
      <Table7 />
    </div>
  );
}

function FiMinus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:minus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:minus">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table8() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiMinus />
    </div>
  );
}

function Table9() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table10() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">200433789</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table11() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table12() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table13() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Pågående</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table14() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">969 027</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table15() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">123 111</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table8 />
      <Table9 />
      <Table10 />
      <Table11 />
      <Table12 />
      <Table13 />
      <Table14 />
      <Table15 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontraktsnummer
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        200433791
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{`Fastighet: `}</p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lemesjö 1:17
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Uppdragstyp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avverkningsrätt
      </p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame5 />
      <Frame51 />
      <Frame4 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Status
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pågående
      </p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Utbetalt belopp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        969 027 SEK
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Återstående belopp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 1">
            <path d="M0 0.5H530" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        123 111 SEK
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <Frame53 />
      <Frame54 />
      <Frame55 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[24px] h-[111px] items-start relative shrink-0 w-full">
      <Frame52 />
      <Frame56 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Leverantörsavräkning 2025-01-08.pdf
      </p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-between relative shrink-0 w-[1444px]">
      <Frame58 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Om kontraktet
      </p>
      <Frame57 />
      <Frame59 />
    </div>
  );
}

function Table16() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col justify-end size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-end px-[16px] py-[12px] relative size-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Sortiment</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center px-[16px] py-[4px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Inmätt volym</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[12px] pt-0 px-[16px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">m3f</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[12px] pt-0 px-[16px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">mto</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Table18 />
      <Table19 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Table17 />
      <Frame61 />
    </div>
  );
}

function Table20() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col justify-end size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-end px-[16px] py-[12px] relative size-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Datum</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table21() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end justify-end size-full">
        <div className="box-border content-stretch flex flex-col items-end justify-end px-[16px] py-[12px] relative size-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Intäkt (SEK)</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full">
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <Table16 />
      </div>
      <Frame62 />
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <Table20 />
      </div>
      <div className="basis-0 flex flex-row grow items-end self-stretch shrink-0">
        <Table21 />
      </div>
    </div>
  );
}

function Table22() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0110 SÅGT TALL OB</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table23() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table24() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Table23 />
      <Table24 />
    </div>
  );
}

function Table25() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 / 1 - 2025</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table26() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4462</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table22 />
      <Frame64 />
      <Table25 />
      <Table26 />
    </div>
  );
}

function Table27() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0110 SÅGT TALL OB</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table28() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table29() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">10</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Table28 />
      <Table29 />
    </div>
  );
}

function Table30() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 / 1 - 2025</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table31() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">11 826</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table27 />
      <Frame66 />
      <Table30 />
      <Table31 />
    </div>
  );
}

function Table32() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0110 SÅGT TALL OB</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table33() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">3</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table34() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Table33 />
      <Table34 />
    </div>
  );
}

function Table35() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 / 1 - 2025</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table36() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">9 122</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table32 />
      <Frame67 />
      <Table35 />
      <Table36 />
    </div>
  );
}

function Table37() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0110 SÅGT TALL OB</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table38() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">1</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table39() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">3</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Table38 />
      <Table39 />
    </div>
  );
}

function Table40() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 / 1 - 2025</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table41() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">3 124</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table37 />
      <Frame68 />
      <Table40 />
      <Table41 />
    </div>
  );
}

function Table42() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0110 SÅGT TALL OB</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table43() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table44() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-start px-[16px] py-[12px] relative shrink-0 w-[80px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Table43 />
      <Table44 />
    </div>
  );
}

function Table45() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 / 1 - 2025</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table46() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="flex flex-col items-end size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-end px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">1 122</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table42 />
      <Frame69 />
      <Table45 />
      <Table46 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame63 />
        <Frame65 />
        <Frame17 />
        <Frame18 />
        <Frame19 />
        <Frame70 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Detaljer
      </p>
      <Frame71 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start px-[64px] py-[40px] relative w-full">
          <Frame60 />
          <Frame72 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame15 />
      <Frame73 />
    </div>
  );
}

function FiPlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table47() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus />
    </div>
  );
}

function Table48() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table49() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">468612106</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table50() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Gallring</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table51() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table52() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table53() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table54() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table47 />
      <Table48 />
      <Table49 />
      <Table50 />
      <Table51 />
      <Table52 />
      <Table53 />
      <Table54 />
    </div>
  );
}

function List1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame74 />
    </div>
  );
}

function FiPlus1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table55() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus1 />
    </div>
  );
}

function Table56() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table57() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">123678945</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table58() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Leveransvirke</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table59() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table60() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table61() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">69 027</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table62() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table55 />
      <Table56 />
      <Table57 />
      <Table58 />
      <Table59 />
      <Table60 />
      <Table61 />
      <Table62 />
    </div>
  );
}

function List2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame75 />
    </div>
  );
}

function FiPlus2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table63() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus2 />
    </div>
  );
}

function Table64() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table65() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">468690006</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table66() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Gallring</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table67() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table68() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table69() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table70() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table63 />
      <Table64 />
      <Table65 />
      <Table66 />
      <Table67 />
      <Table68 />
      <Table69 />
      <Table70 />
    </div>
  );
}

function List3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame76 />
    </div>
  );
}

function FiPlus3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table71() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus3 />
    </div>
  );
}

function Table72() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table73() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">124236475</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table74() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Röjning</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table75() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2024</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table76() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table77() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table78() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table71 />
      <Table72 />
      <Table73 />
      <Table74 />
      <Table75 />
      <Table76 />
      <Table77 />
      <Table78 />
    </div>
  );
}

function List4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame77 />
    </div>
  );
}

function FiPlus4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table79() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus4 />
    </div>
  );
}

function Table80() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">STIG 1:19</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table81() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">121245633</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table82() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table83() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2023</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table84() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table85() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">469 112</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table86() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table79 />
      <Table80 />
      <Table81 />
      <Table82 />
      <Table83 />
      <Table84 />
      <Table85 />
      <Table86 />
    </div>
  );
}

function List5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame78 />
    </div>
  );
}

function FiPlus5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table87() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus5 />
    </div>
  );
}

function Table88() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table89() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">123 678 945</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table90() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Leveransvirke</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table91() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table92() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table93() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">69 027</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table94() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table87 />
      <Table88 />
      <Table89 />
      <Table90 />
      <Table91 />
      <Table92 />
      <Table93 />
      <Table94 />
    </div>
  );
}

function List6() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame79 />
    </div>
  );
}

function FiPlus6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table95() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus6 />
    </div>
  );
}

function Table96() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table97() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">468 690 006</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table98() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Gallring</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table99() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2025</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table100() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table101() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table102() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table95 />
      <Table96 />
      <Table97 />
      <Table98 />
      <Table99 />
      <Table100 />
      <Table101 />
      <Table102 />
    </div>
  );
}

function List7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame80 />
    </div>
  );
}

function FiPlus7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table103() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus7 />
    </div>
  );
}

function Table104() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">LEMESJÖ 1:17</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table105() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">124 236 475</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table106() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Röjning</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table107() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2024</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table108() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table109() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table110() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table103 />
      <Table104 />
      <Table105 />
      <Table106 />
      <Table107 />
      <Table108 />
      <Table109 />
      <Table110 />
    </div>
  );
}

function List8() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="LIST">
      <Frame81 />
    </div>
  );
}

function FiPlus8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table111() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <FiPlus8 />
    </div>
  );
}

function Table112() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">STIG 1:19</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table113() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">121 245 633</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table114() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table115() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2023</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table116() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Genomförd</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table117() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">469 112</p>
          <div className="absolute bottom-0 right-[-0.29px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table118() {
  return (
    <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0</p>
        </div>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table111 />
      <Table112 />
      <Table113 />
      <Table114 />
      <Table115 />
      <Table116 />
      <Table117 />
      <Table118 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="relative shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Frame50 />
        <List />
        <List1 />
        <List2 />
        <List3 />
        <List4 />
        <List5 />
        <List6 />
        <List7 />
        <List8 />
        <Frame82 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Kontrakt
          </p>
          <Frame49 />
          <Frame83 />
        </div>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start relative rounded-[2px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-[1620px]">
      <Frame3 />
      <Frame33 />
      <Frame84 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[48px] py-[40px] relative size-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>
          <Frame16 />
          <Frame85 />
        </div>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex h-[1710px] items-start ml-0 mt-0 relative w-[1800px]">
      <SideMenu />
      <Frame86 />
    </div>
  );
}

function Group() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <Frame87 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1786px] items-start left-0 top-0 w-[1800px]">
      <HeaderMinSkogV />
      <Group />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Desktop - 67">
      <Frame88 />
    </div>
  );
}