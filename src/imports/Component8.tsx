import svgPaths from "./svg-yzncxbvcbd";
import imgImage from "figma:asset/c670b8c3bfe5b7b90cc68ad9c660adbb198494f7.png";
import imgImage1 from "figma:asset/3738ca4f219c8a6673cd18e6332ca552d1a874f8.png";

function Frame4() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sundsvall
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
      <Frame4 />
    </div>
  );
}

function Frame6() {
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
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame6 />
    </div>
  );
}

function UTimes() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:times">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close menu" opacity="0.5">
          <path d={svgPaths.p2f400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full">
      <Frame11 />
      <UTimes />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return <div className="h-[13px] w-[65px]" />;
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Skogsbruksplan
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="horizontal tabs">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Om fastigheten
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="horizontal tabs">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <HorizontalTabs />
      <HorizontalTabs1 />
    </div>
  );
}

function UBookOpen() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:book-open">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:book-open">
          <path d={svgPaths.p22c05980} fill="var(--fill-0, #32412A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#d9f7d1] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UBookOpen />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skapad: 2020 06 24
      </p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbruksplan LEMESJÖ 1:52
      </p>
      <Frame13 />
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
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame24 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start p-[16px] relative w-full">
          <Frame7 />
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame24Frame() {
  return (
    <div className="relative shrink-0 w-full" data-name="Frame 24/Frame 22">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex font-['IBM_Plex_Sans',sans-serif] font-medium items-start justify-between leading-[normal] px-[16px] py-[8px] relative text-[12px] text-nowrap w-full whitespace-pre">
          <p className="opacity-60 relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Planerad åtgärd
          </p>
          <p className="opacity-60 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            2031
          </p>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component1 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame27 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 13
      </p>
      <Frame14 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame30 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component2 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame31 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame33 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame32 />
      <Frame34 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame35 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component3 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Slutavverkning
      </p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame36 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 14
      </p>
      <Frame38 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame37 />
      <Frame39 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame40 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component4 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Slutavverkning
      </p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame41 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 8
      </p>
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame42 />
      <Frame44 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame45 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex font-['IBM_Plex_Sans',sans-serif] font-medium items-start justify-between leading-[normal] px-[16px] py-[8px] relative text-[12px] text-nowrap w-full whitespace-pre">
          <p className="opacity-60 relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Planerad åtgärd
          </p>
          <p className="opacity-60 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            2028
          </p>
        </div>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component5 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame47 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 3
      </p>
      <Frame49 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame48 />
      <Frame50 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame51 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex font-['IBM_Plex_Sans',sans-serif] font-medium items-start justify-between leading-[normal] px-[16px] py-[8px] relative text-[12px] text-nowrap w-full whitespace-pre">
          <p className="opacity-60 relative shrink-0 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Planerad åtgärd
          </p>
          <p className="opacity-60 relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
            2024
          </p>
        </div>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component6 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame52 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame54 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame53 />
      <Frame55 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame56 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component7 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring
      </p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame57 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 6
      </p>
      <Frame59 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame58 />
      <Frame60 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame61 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Component 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 9">
          <path d={svgPaths.p11d79640} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component8 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Inventering
      </p>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame62 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame64 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame63 />
      <Frame65 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame66 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="basis-0 bg-[#f7f7f7] grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative size-full">
        <Frame24Frame />
        <Frame8 />
        <Frame15 />
        <Frame16 />
        <Frame17 />
        <Frame46 />
        <Frame19 />
        <Frame20 />
        <Frame18 />
        <Frame21 />
        <Frame22 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame68() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame26 />
      <Frame67 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1013px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame68 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Component 8">
      <Frame12 />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[-13px] top-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "65", "--transform-inner-height": "13" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg] scale-y-[-100%]">
          <Frame2 />
        </div>
      </div>
      <Frame9 />
    </div>
  );
}