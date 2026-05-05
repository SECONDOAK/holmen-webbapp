import svgPaths from "./svg-zuqodhownz";
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

function Frame5() {
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
      <Frame5 />
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
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p37e7fc00} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
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
      <Frame6 />
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

function Frame7() {
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
      <Frame7 />
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

function Frame15() {
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
      <Frame15 />
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

function Frame17() {
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
      <Frame17 />
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

function Frame18() {
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
      <Frame18 />
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

function Frame19() {
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
      <Frame19 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontrakt
      </p>
    </div>
  );
}

function HorizontalTabs1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame25 />
    </div>
  );
}

function Frame26() {
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
      <Frame26 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
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
      <Frame27 />
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

function Frame28() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Årsbesked
      </p>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[275px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Besked</p>
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
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">-</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[200px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Åtgärd</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table />
      <Table1 />
      <Table2 />
    </div>
  );
}

function FormkitFilepdf() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="formkit:filepdf">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="formkit:filepdf">
          <path d={svgPaths.p220a8f20} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p21228300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a679470} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Table3() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[275px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Årsbesked 2024</p>
      <FormkitFilepdf />
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table4() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">-</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FiDownload() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:download">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 10L12 15L17 10" id="Vector_2" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15V3" id="Vector_3" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[200px]" data-name="Table">
      <FiDownload />
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Ladda ner</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table3 />
      <Table4 />
      <Table5 />
    </div>
  );
}

function FormkitFilepdf1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="formkit:filepdf">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="formkit:filepdf">
          <path d={svgPaths.p220a8f20} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p21228300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a679470} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Table6() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[275px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Årsbesked 2023</p>
      <FormkitFilepdf1 />
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table7() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">-</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FiDownload1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:download">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 10L12 15L17 10" id="Vector_2" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15V3" id="Vector_3" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table8() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[4px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[200px]" data-name="Table">
      <FiDownload1 />
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Ladda ner</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table6 />
      <Table7 />
      <Table8 />
    </div>
  );
}

function FormkitFilepdf2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="formkit:filepdf">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="formkit:filepdf">
          <path d={svgPaths.p220a8f20} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p21228300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a679470} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Table9() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[275px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Årsbesked 2022</p>
      <FormkitFilepdf2 />
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table10() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">-</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FiDownload2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:download">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 10L12 15L17 10" id="Vector_2" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15V3" id="Vector_3" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table11() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[4px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[200px]" data-name="Table">
      <FiDownload2 />
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Ladda ner</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table9 />
      <Table10 />
      <Table11 />
    </div>
  );
}

function FormkitFilepdf3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19px]" data-name="formkit:filepdf">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 20">
        <g id="formkit:filepdf">
          <path d={svgPaths.p220a8f20} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p21228300} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p2a679470} fill="var(--fill-0, black)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Table12() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[275px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Årsbesked 2021</p>
      <FormkitFilepdf3 />
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table13() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">-</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FiDownload3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:download">
          <path d={svgPaths.p2d557600} id="Vector" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M7 10L12 15L17 10" id="Vector_2" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 15V3" id="Vector_3" stroke="var(--stroke-0, #0F6BB6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Table14() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[4px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[200px]" data-name="Table">
      <FiDownload3 />
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Ladda ner</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-full">
      <Table12 />
      <Table13 />
      <Table14 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame29 />
      <Frame10 />
      <Frame3 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <Frame28 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Här kan du se dina årsbesked från tidigare år.
          </p>
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[48px] py-[40px] relative size-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>
          <Frame16 />
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex h-[1013px] items-start ml-0 mt-0 relative w-[1800px]">
      <SideMenu />
      <Frame4 />
    </div>
  );
}

function Group() {
  return (
    <div className="basis-0 grid-cols-[max-content] grid-rows-[max-content] grow inline-grid leading-[0] min-h-px min-w-px place-items-start relative shrink-0">
      <Frame32 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1089px] items-start left-0 top-0 w-[1800px]">
      <HeaderMinSkogV />
      <Group />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Desktop - 69">
      <Frame33 />
    </div>
  );
}