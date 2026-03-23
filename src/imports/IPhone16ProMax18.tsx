import svgPaths from "./svg-zyy5exipbz";
import imgFrame22 from "figma:asset/e0e70177393fa43d1d840ab8b18fcc7ea22b4575.png";

function Frame2() {
  return <div className="absolute h-[33px] left-[48px] top-[220px] w-[137px]" />;
}

function FiChevronLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="fi:chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="fi:chevron-left">
          <path d="M15 18L9 12L15 6" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function MapButton() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative rounded-[8px] shrink-0" data-name="Map button">
      <FiChevronLeft />
      <div className="flex flex-col font-['IBM_Plex_Sans',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-black text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[12px] whitespace-pre">Tillbaka</p>
      </div>
    </div>
  );
}

function Frame10() {
  return <div className="content-stretch flex gap-[16px] items-center shrink-0" />;
}

function FiMenu() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="fi:menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_22_2391)" id="fi:menu">
          <path d="M3 18H21" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 12H21" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 6H21" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_22_2391">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MapButton1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[10px] py-0 relative rounded-[8px] shrink-0" data-name="Map button">
      <FiMenu />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end relative shrink-0 w-[48px]">
      <Frame10 />
      <MapButton1 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0">
      <MapButton />
      <Frame13 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[171px] items-start justify-end relative shrink-0 w-full">
      <Frame17 />
    </div>
  );
}

function UCrosshairs() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:crosshairs">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:crosshairs">
          <path d={svgPaths.p32564400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[40px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <UCrosshairs />
        </div>
      </div>
    </div>
  );
}

function FiPlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:plus">
          <path d="M12 5V19" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <FiPlus />
        </div>
      </div>
    </div>
  );
}

function FiMinus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:minus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:minus">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <FiMinus />
        </div>
      </div>
    </div>
  );
}

function FiCompass() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi:compass">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi:compass">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3dd108f1} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[40px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <FiCompass />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full">
      <Button1 />
      <div className="bg-[#e4e4e4] h-px shrink-0 w-full" />
      <Button2 />
      <div className="bg-[#e4e4e4] h-px shrink-0 w-full" />
      <Button3 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[40px]">
      <Button />
      <Frame16 />
    </div>
  );
}

function UMapMarkerPlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:map-marker-plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:map-marker-plus">
          <path d={svgPaths.p2dd33600} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[48px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[16px] py-0 relative w-full">
          <UMapMarkerPlus />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[48px]">
      <Button4 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <Frame11 />
      <Frame18 />
    </div>
  );
}

function FiFilter() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="fi:filter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="fi:filter">
          <path d={svgPaths.p2771e980} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <FiFilter />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#021c20] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Filtrera karta
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-white bottom-[24px] box-border content-stretch flex h-[48px] items-center left-[calc(50%-0.5px)] px-[16px] py-[8px] rounded-[100px] translate-x-[-50%]" data-name="Component 1">
      <Frame />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[874px] relative shadow-[0px_4px_16px_0px_rgba(0,0,0,0.24)] shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame22} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[874px] items-start justify-between pb-[24px] pt-[60px] px-[24px] relative w-full">
          <Frame14 />
          <Frame15 />
          <Component />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col h-[874px] items-center relative shrink-0 w-[440px]">
      <Frame2 />
      <Frame19 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col h-[874px] items-center left-0 top-0 w-[440px]">
      <Frame1 />
    </div>
  );
}

function StatusBarTime() {
  return (
    <div className="h-[21px] relative rounded-[24px] shrink-0 w-[54px]" data-name="_StatusBar-time">
      <p className="absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[21px] left-[27px] not-italic text-[16px] text-center text-white top-px tracking-[-0.32px] translate-x-[-50%] w-[54px]">9:41</p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Left Side">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center pb-[3px] pl-[10px] pr-0 pt-0 relative size-full">
          <StatusBarTime />
        </div>
      </div>
    </div>
  );
}

function TrueDepthCamera() {
  return <div className="absolute bg-black h-[37px] left-[calc(50%-22.5px)] rounded-[100px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[80px]" data-name="TrueDepth camera" />;
}

function FaceTimeCamera() {
  return <div className="absolute bg-black left-[calc(50%+44px)] rounded-[100px] size-[37px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="FaceTime camera" />;
}

function StatusBarDynamicIsland() {
  return (
    <div className="bg-black h-[37px] relative rounded-[100px] shrink-0 w-[125px]" data-name="StatusBar-dynamicIsland">
      <TrueDepthCamera />
      <FaceTimeCamera />
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center relative shrink-0" data-name="Dynamic Island">
      <StatusBarDynamicIsland />
    </div>
  );
}

function SignalWifiBattery() {
  return (
    <div className="h-[13px] relative shrink-0 w-[78.401px]" data-name="Signal, Wifi, Battery">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 13">
        <g id="Signal, Wifi, Battery">
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p1ec31400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19f8d480} fill="var(--fill-0, white)" />
            <path d={svgPaths.p13f4aa00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1bfb7500} fill="var(--fill-0, white)" />
          </g>
          <path d={svgPaths.p36909200} fill="var(--fill-0, white)" id="Wifi" />
          <g id="_StatusBar-battery">
            <path d={svgPaths.pa870f80} id="Outline" opacity="0.35" stroke="var(--stroke-0, white)" strokeWidth="1.05509" />
            <path d={svgPaths.p9c6aca0} fill="var(--fill-0, white)" id="Battery End" opacity="0.4" />
            <path d={svgPaths.p1b7cb970} fill="var(--fill-0, white)" id="Fill" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function RightSide() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Right Side">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center pl-0 pr-[11px] py-0 relative size-full">
          <SignalWifiBattery />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute content-stretch flex h-[59px] items-end justify-center left-0 top-0 w-[440px]" data-name="StatusBar">
      <LeftSide />
      <DynamicIsland />
      <RightSide />
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

function Frame20() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTh />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Översikt
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame20 />
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame9 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame21 />
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

function Frame22() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UHomeAlt />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fastigheter
      </p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame23 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame24 />
    </div>
  );
}

function UGraphBar() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:graph-bar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:graph-bar" opacity="0.5">
          <path d={svgPaths.p138fd0f1} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UGraphBar />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame25 />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame26 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame27 />
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

function Frame28() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTrees />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Våra tjänster
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame29 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame30 />
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

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UEqualCircle />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mer
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame31 />
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame32 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame33 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-[#f7f7f7] bottom-0 content-stretch flex items-center left-[calc(50%-0.5px)] translate-x-[-50%] w-[439px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame8 />
      <Frame7 />
    </div>
  );
}

export default function IPhone16ProMax() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="iPhone 16 Pro Max - 18">
      <Frame3 />
      <StatusBar />
      <Frame12 />
    </div>
  );
}