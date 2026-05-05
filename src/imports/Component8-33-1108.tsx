import svgPaths from "./svg-ikz2d2yxru";
import imgImage from "figma:asset/c670b8c3bfe5b7b90cc68ad9c660adbb198494f7.png";
import imgImage1 from "figma:asset/3738ca4f219c8a6673cd18e6332ca552d1a874f8.png";

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sundsvall
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
      <Frame3 />
    </div>
  );
}

function Frame5() {
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
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame5 />
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

function Frame4() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full">
      <Frame7 />
      <UTimes />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return <div className="h-[13px] w-[65px]" />;
}

function FiChevronLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:chevron-left">
          <path d="M15 18L9 12L15 6" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Anteckningar
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame10 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <FiChevronLeft />
      <Frame13 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[6px] items-center pl-0 pr-[24px] py-0 relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Alla
      </p>
    </div>
  );
}

function Icon() {
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
    <div className="content-stretch flex flex-col h-[18px] items-end relative shrink-0 w-[12px]" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Component 3">
      <div aria-hidden="true" className="absolute border-2 border-[#ededed] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[48px] items-center justify-between px-[24px] py-[8px] relative w-full">
          <Frame />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[16px] relative w-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

function UMapMarkerPlus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="u:map-marker-plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="u:map-marker-plus">
          <path d={svgPaths.p16d19000} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[12px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ny anteckning
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center justify-center pl-[12px] pr-[16px] py-[8px] relative w-full">
          <UMapMarkerPlus />
          <Frame1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-300 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Button />
        </div>
      </div>
    </div>
  );
}

function UMapMarkerAlt() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="u:map-marker-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="u:map-marker-alt">
          <path d={svgPaths.p101e26f0} fill="var(--fill-0, #8F3857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <UMapMarkerAlt />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skador på plant. Älg
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avd 11.
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame20 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        12 feb 2025
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame21 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame22 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] relative w-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function UMapMarkerAlt1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="u:map-marker-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="u:map-marker-alt">
          <path d={svgPaths.p101e26f0} fill="var(--fill-0, #5F283F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <UMapMarkerAlt1 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsskada i området
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avd 14.
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame26 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        14 feb 2025
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Frame28 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] relative w-full">
          <Frame29 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame8 />
      <Frame16 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[347px]">
      <Frame14 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="basis-0 bg-[#f7f7f7] box-border content-stretch flex flex-col grow items-start min-h-px min-w-px pb-[16px] pt-0 px-0 relative shrink-0 w-full">
      <Frame17 />
      <Frame11 />
      <Frame12 />
      <Frame30 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="basis-0 bg-[#f7f7f7] box-border content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative shrink-0 w-full">
      <Frame31 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame32 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame33 />
    </div>
  );
}

export default function Component1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Component 8">
      <Frame9 />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[-13px] top-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "65", "--transform-inner-height": "13" } as React.CSSProperties}>
        <div className="flex-none rotate-[90deg] scale-y-[-100%]">
          <Frame2 />
        </div>
      </div>
      <Frame34 />
    </div>
  );
}