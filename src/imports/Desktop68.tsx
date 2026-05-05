import svgPaths from "./svg-desqjdz1to";
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

function Frame25() {
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
      <Frame25 />
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

function Frame26() {
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
      <Frame26 />
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

function Frame27() {
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
      <Frame27 />
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

function Frame28() {
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
      <Frame28 />
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

function Frame29() {
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
      <Frame29 />
    </div>
  );
}

function Frame30() {
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
      <Frame30 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[16px] pt-[3.2px] px-[16px] relative shrink-0">
      <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fakturor
      </p>
    </div>
  );
}

function HorizontalTabs2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="horizontal tabs">
      <Frame31 />
    </div>
  );
}

function Frame32() {
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
      <Frame32 />
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

function Frame33() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UEditAlt />
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame33 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            En faktura är redo att betalas
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Inköp av plant
      </p>
      <div className="bg-[#e4e4e4] h-[24px] shrink-0 w-px" />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
      <div className="bg-[#e4e4e4] h-[24px] shrink-0 w-px" />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[rgba(2,28,32,0.9)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        22876 SEK
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[24px] items-start justify-end relative shrink-0">
      <Frame36 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <Frame37 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Faktura: 1234556
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visa Faktura
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame39 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame40() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame38 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-white min-w-[360px] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame35 />
        <Frame40 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fakturor
      </p>
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Fakturanummer</p>
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
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Fakturadatum</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
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
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Uppdragstyp</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
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
          <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Belopp (SEK)</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Faktura</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table />
      <Table1 />
      <Table2 />
      <Table3 />
      <Table4 />
    </div>
  );
}

function Table5() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">1241241</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table6() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">13 jun 2025</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table7() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Skogsvård</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table8() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5 432 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
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

function Table9() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 1241241</p>
      <FormkitFilepdf />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table5 />
      <Table6 />
      <Table7 />
      <Table8 />
      <Table9 />
    </div>
  );
}

function Table10() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">1234567</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table11() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 jun 2025</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
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
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Leveransvirke</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
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
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">3 789 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
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

function Table14() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 1234567</p>
      <FormkitFilepdf1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table10 />
      <Table11 />
      <Table12 />
      <Table13 />
      <Table14 />
    </div>
  );
}

function Table15() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">8901234</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table16() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">23 maj 2025</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table17() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Leveransvirke</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table18() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5 432 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
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

function Table19() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 8901234</p>
      <FormkitFilepdf2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table15 />
      <Table16 />
      <Table17 />
      <Table18 />
      <Table19 />
    </div>
  );
}

function Table20() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5678901</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table21() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">05 feb 2025</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table22() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Skogsvård</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table23() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">12 198 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
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

function Table24() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 5678901</p>
      <FormkitFilepdf3 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table20 />
      <Table21 />
      <Table22 />
      <Table23 />
      <Table24 />
    </div>
  );
}

function Table25() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">2345678</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table26() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">30 jan 2025</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table27() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table28() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">21 234 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf4() {
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

function Table29() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 2345678</p>
      <FormkitFilepdf4 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table25 />
      <Table26 />
      <Table27 />
      <Table28 />
      <Table29 />
    </div>
  );
}

function Table30() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">3456789</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table31() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">18 nov 2024</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table32() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table33() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">6 543 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf5() {
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

function Table34() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 3456789</p>
      <FormkitFilepdf5 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table30 />
      <Table31 />
      <Table32 />
      <Table33 />
      <Table34 />
    </div>
  );
}

function Table35() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">6789012</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table36() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">22 aug 2024</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table37() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table38() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4 321 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf6() {
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

function Table39() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 6789012</p>
      <FormkitFilepdf6 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table35 />
      <Table36 />
      <Table37 />
      <Table38 />
      <Table39 />
    </div>
  );
}

function Table40() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">4567890</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table41() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">09 mar 2024</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table42() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Avverkningsrätt</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table43() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">76 890 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf7() {
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

function Table44() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 4567890</p>
      <FormkitFilepdf7 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table40 />
      <Table41 />
      <Table42 />
      <Table43 />
      <Table44 />
    </div>
  );
}

function Table45() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">7890123</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table46() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">11 feb 2024</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table47() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">Skogsvård</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table48() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">91 876 kr</p>
          <div className="absolute bottom-0 right-[-0.33px] top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf8() {
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

function Table49() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 7890123</p>
      <FormkitFilepdf8 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table45 />
      <Table46 />
      <Table47 />
      <Table48 />
      <Table49 />
    </div>
  );
}

function Table50() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">8901234</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table51() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">15 dec 2023</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table52() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">18 765 kr</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf9() {
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

function Table53() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 9012345</p>
      <FormkitFilepdf9 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table50 />
      <Table51 />
      <Table52 />
      <Table53 />
    </div>
  );
}

function Table54() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">0123456</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table55() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">04 nov 2023</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table56() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">5 678 kr</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf10() {
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

function Table57() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 0123456</p>
      <FormkitFilepdf10 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table54 />
      <Table55 />
      <Table56 />
      <Table57 />
    </div>
  );
}

function Table58() {
  return (
    <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative shrink-0 w-[300px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">9012345</p>
      <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Table59() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">27 okt 2023</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Table60() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="Table">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['IBM_Plex_Sans_Condensed:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre">21 345 kr</p>
          <div className="absolute bottom-0 right-0 top-0 w-px" data-name="Vertical Divider">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormkitFilepdf11() {
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

function Table61() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[12px] relative shrink-0 w-[220px]" data-name="Table">
      <p className="font-['IBM_Plex_Sans_Condensed:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre">Kundfaktura 9012345</p>
      <FormkitFilepdf11 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex h-[48px] items-start relative shrink-0 w-[1572px]">
      <Table58 />
      <Table59 />
      <Table60 />
      <Table61 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit]">
        <Frame42 />
        <Frame43 />
        <Frame10 />
        <Frame11 />
        <Frame12 />
        <Frame44 />
        <Frame45 />
        <Frame15 />
        <Frame46 />
        <Frame17 />
        <Frame18 />
        <Frame19 />
        <Frame47 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative shrink-0 w-[1604px]">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]" />
      <Frame41 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[0px] text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span>{`I Min skog hittar du dina fakturor från 2023 och framåt. Behöver du tillgång till äldre fakturor är du välkommen att `}</span>
        <span className="[text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-medium text-[rgba(2,28,32,0.9)] underline" style={{ fontVariationSettings: "'wdth' 100" }}>
          kontakta Holmen ekonomi
        </span>
      </p>
      <Frame3 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] items-start relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0">
      <Frame34 />
      <Frame48 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[48px] py-[40px] relative size-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>
          <Frame16 />
          <Frame49 />
        </div>
      </div>
    </div>
  );
}

function Frame50() {
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
      <Frame50 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1089px] items-start left-0 top-0 w-[1800px]">
      <HeaderMinSkogV />
      <Group />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Desktop - 68">
      <Frame51 />
    </div>
  );
}