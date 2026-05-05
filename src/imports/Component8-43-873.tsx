import svgPaths from "./svg-okq3fk9adf";
import imgImage from "figma:asset/c670b8c3bfe5b7b90cc68ad9c660adbb198494f7.png";
import imgImage1 from "figma:asset/3738ca4f219c8a6673cd18e6332ca552d1a874f8.png";
import imgImage2 from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";

function Frame12() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sundsvall
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="h-[48px] relative rounded-[4px] shrink-0 w-[80px]" data-name="image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
          <div className="absolute inset-0 overflow-hidden rounded-[4px]">
            <img alt="" className="absolute h-[119.2%] left-[-10.7%] max-w-none top-[-6.94%] w-[113.33%]" src={imgImage} />
          </div>
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[4px] size-full" src={imgImage1} />
        </div>
      </div>
      <Frame16 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame14 />
    </div>
  );
}

function UTimes() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="u:times">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close menu" opacity="0.5">
          <path d={svgPaths.p2f400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </button>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full">
      <Frame18 />
      <UTimes />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame13 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return <div className="h-[13px] w-[65px]" />;
}

function UBookOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:book-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:book-open">
          <path d={svgPaths.p22c05980} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UBookOpen />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagna åtgärder
      </p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbruksplan
      </p>
      <Frame22 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame23 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame24 />
    </div>
  );
}

function FiChevronRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:chevron-right" opacity="0.5">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white h-[74px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[74px] items-center p-[16px] relative w-full">
          <Frame15 />
          <Frame25 />
          <FiChevronRight />
        </div>
      </div>
    </div>
  );
}

function UBookmarkFull() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:bookmark-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:bookmark-full">
          <path d={svgPaths.p359fa100} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UBookmarkFull />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        3 anteckningar
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Anteckningar
      </p>
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame28 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame29 />
    </div>
  );
}

function FiChevronRight1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:chevron-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:chevron-right" opacity="0.5">
          <path d="M9 18L15 12L9 6" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-white h-[74px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] h-[74px] items-center p-[16px] relative w-full">
          <Frame26 />
          <Frame30 />
          <FiChevronRight1 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame21 />
      <Frame20 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Areal
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 316 1">
            <path d="M0 0.5H316" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        89,3 ha
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tillväxt
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 273 1">
            <path d="M0 0.5H273" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        875 m³sk/år
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total virkesvolym
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 218 1">
            <path d="M0 0.5H218" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        1 423 m³sk
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame5 />
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Grunddata
          </p>
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[4px] relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ägoslag
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsmark produktiv
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 236 1">
            <path d="M0 0.5H236" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        80%
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsmark improduktiv
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 220 1">
            <path d="M0 0.5H220" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        15%
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Öppen våtmark, Myr
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 249 1">
            <path d="M0 0.5H249" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        0%
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[34px] items-end px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Övrigt
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 339 1">
            <path d="M0 0.5H339" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        5%
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[16px] relative w-full">
          <Frame33 />
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame35 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame36 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[4px] relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Din lokala virkesköpare
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] w-[229px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Daniel Larsson
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal italic leading-[normal] relative shrink-0 text-[14px] w-[229px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Vill du veta mer om virkespriser, åtgärder och bästa lösningen för din skog? Jag finns nära dig.
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[9px] grow items-start justify-center min-h-px min-w-px relative shrink-0 text-black">
      <Frame17 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[14px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sundsvall - Härnösand
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <div className="pointer-events-none relative rounded-[1000px] shrink-0 size-[70px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[1000px] size-full" src={imgImage2} />
        <div aria-hidden="true" className="absolute border border-neutral-300 border-solid inset-0 rounded-[1000px]" />
      </div>
      <Frame39 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[15px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontakta daniel
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e4f5f5] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Button />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame38 />
          <Frame40 />
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="basis-0 bg-[#f7f7f7] box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px pb-[16px] pt-0 px-0 relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame31 />
      <Frame37 />
      <Frame41 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative size-full">
        <Frame42 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame44() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame44 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-tl-[16px] rounded-tr-[16px] size-full" data-name="Component 8">
      <Frame19 />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[-13px] top-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "65", "--transform-inner-height": "13" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg] scale-y-[-100%]">
          <Frame1 />
        </div>
      </div>
      <Frame45 />
    </div>
  );
}