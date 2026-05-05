import svgPaths from "./svg-eak34fr3h1";
import imgHolmensLogotyp from "figma:asset/eac8e95a3633af8f6cad94c84a38006669cd2334.png";
import imgSvPng from "figma:asset/f68a517de6f631dbcd36bd0cdc1363a2694fa8a1.png";
import imgImage from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage1 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";

function Frame() {
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
      <Frame />
    </div>
  );
}

function Frame8() {
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
      <Frame8 />
    </div>
  );
}

function Frame9() {
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
      <Frame9 />
    </div>
  );
}

function Frame10() {
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
      <Frame10 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[24px] h-[37.2px] items-center relative shrink-0 w-full">
      <HorizontalTabs />
      <HorizontalTabs1 />
      <HorizontalTabs2 />
      <HorizontalTabs3 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[24px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black w-[440px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Min ekonomi
          </p>
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function UInfoCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="u:info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="u:info-circle">
          <path d={svgPaths.p19261e00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Totalt utbetalt belopp
      </p>
      <UInfoCircle />
    </div>
  );
}

function Frame27() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[150px] relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start min-w-inherit p-[16px] relative w-full">
          <Frame29 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#32412a] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>{` 1 969 027 SEK`}</p>
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
          <path d={svgPaths.p19261e00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Återstående belopp
      </p>
      <UInfoCircle1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[150px] relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start min-w-inherit p-[16px] relative w-full">
          <Frame30 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#32412a] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
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
          <path d={svgPaths.p19261e00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Genomförda kontrakt
      </p>
      <UInfoCircle2 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[150px] relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start min-w-inherit p-[16px] relative w-full">
          <Frame31 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#32412a] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            24
          </p>
        </div>
      </div>
    </div>
  );
}

function UInfoCircle3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="u:info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="u:info-circle">
          <path d={svgPaths.p19261e00} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pågående åtgärder
      </p>
      <UInfoCircle3 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-[150px] relative shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
      <div className="min-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start min-w-inherit p-[16px] relative w-full">
          <Frame32 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#32412a] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            3
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-start flex flex-wrap gap-[16px] items-start px-[16px] py-0 relative w-full">
          <Frame27 />
          <Frame24 />
          <Frame25 />
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[24px] items-start justify-center px-[16px] py-[24px] relative shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px] border-solid inset-0 pointer-events-none" />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[20px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mina kontrakt
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pågående
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsvård
      </p>
      <Frame28 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-medium gap-[2px] items-start leading-[normal] relative shrink-0 text-[#021c20] text-[12px] text-nowrap w-full whitespace-pre">
      <p className="opacity-80 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontrakt 200433789
      </p>
      <p className="opacity-70 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:17
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame34 />
      <Frame35 />
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

function Table() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <FiMinus />
    </div>
  );
}

function Frame37() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
          <Frame36 />
          <Table />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame37 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Utbetalt belopp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 185 1">
            <path d="M0 0.5H185" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        969 027 SEK
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Återstående belopp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159 1">
            <path d="M0 0.5H159" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        123 111 SEK
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Leverantörsavräkning 2025-01-08.pdf
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-between relative shrink-0 w-full">
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        År
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 319 1">
            <path d="M0 0.5H319" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Utbetalt (SEK)
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 194 1">
            <path d="M0 0.5H194" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        969 027 SEK
      </p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="box-border content-stretch flex gap-[4px] items-end px-0 py-[8px] relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Återstående belopp
      </p>
      <div className="basis-0 grow h-0 min-h-px min-w-px relative shrink-0">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]" style={{ "--stroke-0": "rgba(228, 228, 228, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 159 1">
            <path d="M0 0.5H159" id="Vector 2" stroke="var(--stroke-0, #E4E4E4)" strokeDasharray="1 1" />
          </svg>
        </div>
      </div>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        123 111 SEK
      </p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame19 />
      <Frame6 />
      <Frame40 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[16px] relative w-full">
          <Frame39 />
          <Frame3 />
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame42 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame44() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame38 />
        <Frame43 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame45() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-0 relative w-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[440px]">
      <Frame45 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pågående
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsvård
      </p>
      <Frame47 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-medium gap-[2px] items-start leading-[normal] relative shrink-0 text-[#021c20] text-[12px] text-nowrap w-full whitespace-pre">
      <p className="opacity-80 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontrakt 200433789
      </p>
      <p className="opacity-70 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:17
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame48 />
      <Frame49 />
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

function Table1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative shrink-0 size-[48px]" data-name="Table">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <FiPlus />
    </div>
  );
}

function Frame51() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
          <Frame50 />
          <Table1 />
        </div>
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame51 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame52 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame53 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame55() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-0 relative w-full">
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[440px]">
      <Frame55 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col gap-[12px] items-start px-0 py-[16px] relative shrink-0">
      <Frame46 />
      {[...Array(3).keys()].map((_, i) => (
        <Frame56 key={i} />
      ))}
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame1 />
      <Frame57 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-0 px-0 relative rounded-[2px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] shrink-0 w-full">
      <Frame33 />
      <Frame58 />
    </div>
  );
}

function HolmensLogotyp() {
  return (
    <div className="h-[19.19px] max-w-[640px] relative shrink-0 w-[128px]" data-name="Holmens logotyp">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[100.05%] left-0 max-w-none top-[-0.03%] w-full" src={imgHolmensLogotyp} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[640px] min-h-px relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit min-h-inherit pb-[0.53px] pt-[4.28px] px-[15px] relative w-full">
          <HolmensLogotyp />
        </div>
      </div>
    </div>
  );
}

function SvPng() {
  return (
    <div className="absolute left-[26px] size-[40px] top-1/2 translate-y-[-50%]" data-name="sv.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSvPng} />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[18px] relative w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 18">
        <g id="Icon">
          <path d={svgPaths.peec4300} fill="var(--fill-0, #0F233B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.15%_36.76%_84.92%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pl-[74px] pr-[58px] py-[22px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Swedish
          </p>
          <SvPng />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container2 />
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Link">
      <p className="absolute font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] left-0 text-[#0f233b] text-[16px] top-[-2px] w-[177.948px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ytterligare länkar
      </p>
    </div>
  );
}

function Link1() {
  return <div className="h-[48px] shrink-0 w-[206px]" data-name="Link" />;
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <Link1 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Holmen AB - holmen.com
      </p>
      <Link />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cookie policy
      </p>
      <Item />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative self-stretch shrink-0 w-[175px]" data-name="Container">
      <List />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Link">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Om Holmen
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative self-stretch shrink-0 w-[205px]" data-name="Container">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mer om Holmenkoncernen
      </p>
      <Link2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return <div className="h-[24px] shrink-0 w-full" data-name="Container" />;
}

function Container7() {
  return (
    <div className="h-[40px] max-w-[1280px] min-h-px relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit min-h-inherit size-full">
        <div className="box-border content-stretch flex flex-col h-[40px] items-start max-w-inherit min-h-inherit px-[15px] py-0 relative w-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        {`© Holmen 2025 `}
        <br aria-hidden="true" />
        {`Holmens verksamhet utgår från skogens kretslopp och de förnybara produkter vi kan skapa av det. `}
      </p>
      <Frame2 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-px relative shrink-0 w-full" data-name="Separator">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <Container8 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Container9 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame60 />
    </div>
  );
}

function Footer() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Footer">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start max-w-inherit px-[15px] py-0 relative w-full">
          <div className="h-px relative shrink-0 w-full" data-name="Separator">
            <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
          </div>
          <Container3 />
          <Frame14 />
        </div>
      </div>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center px-0 py-[80px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Footer />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[440px]">
      <Frame59 />
      <Frame61 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-[112px] w-[440px]">
      <Frame21 />
      <Frame62 />
    </div>
  );
}

function UCommentDots() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="u:comment-dots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="u:comment-dots">
          <path d={svgPaths.p5a22300} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[8px] items-center justify-center ml-[25px] mt-[24px] relative rounded-[100px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] size-[16px]">
      <UCommentDots />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex items-center justify-center ml-0 mt-0 relative size-[40px]">
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

function Frame64() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[100px] shrink-0">
      <Frame13 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame64 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <Group />
      <Frame65 />
      <div className="absolute h-[21px] left-1/2 top-[calc(50%+0.5px)] translate-x-[-50%] translate-y-[-50%] w-[140px]" data-name="image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#1e3856] h-[62px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[62px] items-center justify-between p-[16px] relative w-full">
          <Frame66 />
        </div>
      </div>
    </div>
  );
}

function MainHeaderMobile() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[440px]" data-name="Main header mobile">
      <div className="bg-[#1e3856] h-[50px] shrink-0 w-full" />
      <Header />
    </div>
  );
}

function UTh() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:th">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:th" opacity="0.5">
          <path d={svgPaths.p37e7fc00} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame67() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTh />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Översikt
      </p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame67 />
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame68 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame69 />
    </div>
  );
}

function UHomeAlt() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:home-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:home-alt" opacity="0.5">
          <path d={svgPaths.p203b2800} id="Vector" stroke="var(--stroke-0, #021C20)" />
        </g>
      </svg>
    </div>
  );
}

function Frame70() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UHomeAlt />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fastigheter
      </p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame70 />
        </div>
      </div>
    </div>
  );
}

function Frame72() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame71 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame72 />
    </div>
  );
}

function UGraphBar() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:graph-bar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:graph-bar">
          <path d={svgPaths.p138fd0f1} fill="var(--fill-0, #0F6BB6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame73() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UGraphBar />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame73 />
        </div>
      </div>
    </div>
  );
}

function Frame75() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#1e3856] h-[4px] rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame74 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame75 />
    </div>
  );
}

function UTrees() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:trees">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:trees" opacity="0.5">
          <path d={svgPaths.pbc03c00} id="Vector" stroke="var(--stroke-0, #021C20)" />
        </g>
      </svg>
    </div>
  );
}

function Frame77() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTrees />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Våra tjänster
      </p>
    </div>
  );
}

function Frame78() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame77 />
        </div>
      </div>
    </div>
  );
}

function Frame79() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame78 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame79 />
    </div>
  );
}

function UEqualCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:equal-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:equal-circle" opacity="0.5">
          <path d={svgPaths.p1c3f3d00} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame80() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UEqualCircle />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mer
      </p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame80 />
        </div>
      </div>
    </div>
  );
}

function Frame82() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame81 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame82 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-[#f7f7f7] bottom-0 content-stretch flex items-center left-[calc(50%+0.5px)] translate-x-[-50%] w-[439px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame11 />
      <Frame12 />
      <Frame76 />
      <Frame17 />
      <Frame83 />
    </div>
  );
}

export default function IPhone16ProMax() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="iPhone 16 Pro Max - 9">
      <Frame63 />
      <MainHeaderMobile />
      <Frame23 />
    </div>
  );
}