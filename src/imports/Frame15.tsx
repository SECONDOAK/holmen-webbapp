import svgPaths from "./svg-emvjp8zmf3";

function UCreditCard() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:credit-card">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:credit-card">
          <path d={svgPaths.p6440600} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#e4f5f5] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UCreditCard />
    </div>
  );
}

function Frame21() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame20 />
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
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kundfaktura: 1234556
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
      <Frame8 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[12px] h-[64px] items-start relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Till fakturaöversikt
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame />
        </div>
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
          <Frame22 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[grid-area:1_/_1] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame21 />
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
          <path d={svgPaths.pce03b00} fill="var(--fill-0, #8F3857)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#ffd7e7] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UEditAlt />
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame23 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Nytt kontrakt redo att signeras
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="basis-0 content-start flex flex-wrap font-['IBM_Plex_Sans',sans-serif] font-normal gap-[8px] grow items-start leading-[0] min-h-px min-w-px relative shrink-0 text-[0px]">
      <p className="leading-[normal] relative shrink-0 text-[16px] text-black w-[357px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="font-['IBM_Plex_Sans',sans-serif] font-bold" style={{ fontVariationSettings: "'wdth' 100" }}>
          Daniel Larsson
        </span>
        <span>{` har bjudit in dig att e-signera dokumentet`}</span>
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#0f6bb6] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span style={{ fontVariationSettings: "'wdth' 100" }}>Kontrakt 200433789</span>
        <span style={{ fontVariationSettings: "'wdth' 100" }}> </span>
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-start flex flex-wrap gap-[4px] items-start relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-end relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[12px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
      <Frame11 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[12px] h-[64px] items-start relative shrink-0 w-full">
      <Frame12 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gå till kontrakt
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1e3856] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame25 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="[grid-area:1_/_2] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame24 />
        <Frame13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function UTrees() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:trees">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:trees">
          <path d={svgPaths.p2e055000} fill="var(--fill-0, #597340)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#d9f7d1] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UTrees />
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame26 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Du har nya åtgärder i din plan
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visa åtgärder
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1e3856] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[64px] leading-[normal] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            Enligt din skogsbruksplan är det dags för nya åtgärder. Rätt åtgärd i rätt tid skapar värde både på kort och lång sikt i din skog.
          </p>
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="[grid-area:1_/_3] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame27 />
        <Frame15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
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

function Frame28() {
  return (
    <div className="bg-[#fad2af] content-stretch flex flex-col gap-[24px] items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
      <UMapMarkerInfo />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame28 />
          <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-semibold grow leading-[normal] min-h-px min-w-px relative shrink-0 text-[#021c20] text-[20px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Dags att se över din plan
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Beställ ny plan
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#1e3856] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[64px] leading-[normal] relative shrink-0 text-[14px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
            Din skogsbruksplan för SKOG 1:2 har tjänat dig väl i över 8 år! Det är dags att uppdatera den så att du kan fortsätta sköta din skog på bästa sätt.
          </p>
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="[grid-area:1_/_4] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame31 />
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans',sans-serif] font-semibold items-center leading-[normal] relative shrink-0 text-center text-nowrap uppercase whitespace-pre">
      <p className="relative shrink-0 text-[#663336] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        JULI
      </p>
      <p className="relative shrink-0 text-[#0f233b] text-[40px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        15
      </p>
      <p className="relative shrink-0 text-[#0f233b] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2025
      </p>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 right-0 top-1/2 translate-y-[-50%]" data-name="Time">
      <Frame5 />
    </div>
  );
}

function Block() {
  return (
    <div className="bg-[#e4f5f5] relative shrink-0 size-[100px] z-[2]" data-name="Block">
      <Time />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[12px] grow items-start max-h-[192px] min-h-px min-w-px pb-0 pt-px px-0 relative shrink-0 text-[#021c20] z-[1]" data-name="Paragraph">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Webinarium: Barkborreskola
      </p>
      <p className="-webkit-box font-['IBM_Plex_Sans',sans-serif] font-normal h-[72px] leading-[normal] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Holmen håller ett webinarium om hur du bäst förebygger och åtgärdar barkborreangrepp i din skog. Anmäl ditt intresse idag!
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] isolate items-center pl-0 pr-[9px] py-0 relative w-full">
          <Block />
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Anmäl dig till event
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1e3856] relative shrink-0 w-full" data-name="Button">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[8px] relative w-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Container />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="[grid-area:2_/_1] bg-white min-w-[360px] relative self-start shrink-0">
      <div className="content-stretch flex flex-col items-center min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Frame18 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Frame14() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] size-full">
      <Frame2 />
      <Frame32 />
      <Frame29 />
      <Frame30 />
      <Frame33 />
    </div>
  );
}