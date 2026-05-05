import svgPaths from "./svg-ryur2ei9qw";
import imgFrame22 from "figma:asset/e0e70177393fa43d1d840ab8b18fcc7ea22b4575.png";
import imgImage from "figma:asset/c670b8c3bfe5b7b90cc68ad9c660adbb198494f7.png";
import imgImage1 from "figma:asset/3738ca4f219c8a6673cd18e6332ca552d1a874f8.png";

function Frame3() {
  return <div className="absolute h-[33px] left-[48px] top-[220px] w-[137px]" />;
}

function FiChevronLeft() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="fi:chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="fi:chevron-left">
          <path d="M12.5 15L7.5 10L12.5 5" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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

function Frame14() {
  return <div className="content-stretch flex gap-[16px] items-center shrink-0" />;
}

function FiMenu() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="fi:menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="fi:menu">
          <path d="M2.5 15H17.5" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2.5 10H17.5" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M2.5 5H17.5" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
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

function Frame17() {
  return (
    <div className="content-stretch flex gap-[20px] items-start justify-end relative shrink-0 w-[48px]">
      <Frame14 />
      <MapButton1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="basis-0 content-stretch flex grow items-start justify-between min-h-px min-w-px relative shrink-0">
      <MapButton />
      <Frame17 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[171px] items-start justify-end relative shrink-0 w-full">
      <Frame21 />
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

function Frame18() {
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

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[40px]">
      <Button />
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

function Frame20() {
  return (
    <div className="h-[874px] relative shadow-[0px_4px_16px_0px_rgba(0,0,0,0.24)] shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFrame22} />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[874px] items-start justify-between pb-[24px] pt-[60px] px-[24px] relative w-full">
          <Frame16 />
          <div className="bg-[#d9d9d9] shrink-0 size-[100px]" />
          <Frame15 />
          <Component />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col h-[874px] items-center relative shrink-0 w-[440px]">
      <Frame3 />
      <Frame20 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[874px] items-center left-0 top-0 w-[440px]">
      <Frame2 />
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

function Frame27() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTh />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Översikt
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame30 />
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

function Frame31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UHomeAlt />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Fastigheter
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

function Frame34() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UGraphBar />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame35 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame36 />
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

function Frame37() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UTrees />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Våra tjänster
      </p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame38 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame39 />
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

function Frame40() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-0 py-[8px] relative rounded-[8px] shrink-0">
      <UEqualCircle />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[11px] text-center w-[84px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mer
      </p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center pb-[12px] pt-0 px-[12px] relative w-full">
          <Frame40 />
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative shrink-0 w-full">
      <div className="bg-[#0f6bb6] h-[4px] opacity-0 rounded-bl-[10px] rounded-br-[10px] shrink-0 w-[68px]" />
      <Frame41 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow h-[83px] items-start justify-between min-h-px min-w-px relative shrink-0">
      <Frame42 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute bg-[#f7f7f7] bottom-0 content-stretch flex items-center left-[calc(50%-0.5px)] translate-x-[-50%] w-[439px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame11 />
      <Frame9 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] opacity-70 relative shrink-0 text-[#021c20] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sundsvall
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
      <Frame12 />
    </div>
  );
}

function Frame45() {
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
      <Frame44 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[259px]">
      <Frame45 />
    </div>
  );
}

function UTimes() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:times">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:times" opacity="0.5">
          <path d={svgPaths.p2f400} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full">
      <Frame46 />
      <UTimes />
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame47 />
        </div>
      </div>
    </div>
  );
}

function FiChevronLeft1() {
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

function Frame49() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbruksplan för LEMESJÖ 1:52
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame49 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <FiChevronLeft1 />
      <Frame50 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <Frame51 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#1e3856] border-[0px_0px_3px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Åtgärder
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="horizontal tabs">
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center p-[16px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] opacity-60 relative shrink-0 text-[#021c20] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Om planen
          </p>
        </div>
      </div>
    </div>
  );
}

function HorizontalTabs1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative shrink-0" data-name="horizontal tabs">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Frame5 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex items-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <HorizontalTabs />
      <HorizontalTabs1 />
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

function Frame53() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component2 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame53 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 13
      </p>
      <Frame55 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame54 />
      <Frame56 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame57 />
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

function Frame59() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component3 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring
      </p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame59 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame61 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame60 />
      <Frame62 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame63 />
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

function Frame64() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component4 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Slutavverkning
      </p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame64 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 14
      </p>
      <Frame66 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame65 />
      <Frame67 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame68 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
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

function Frame69() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component5 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Slutavverkning
      </p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame69 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 8
      </p>
      <Frame71 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame70 />
      <Frame72 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame73 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
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

function Frame74() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component6 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame74 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 3
      </p>
      <Frame76 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame75 />
      <Frame77 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame78 />
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

function Frame79() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component7 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame79 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame81 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame80 />
      <Frame82 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame83 />
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

function Frame84() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component8 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring
      </p>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame84 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame86() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 6
      </p>
      <Frame86 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame85 />
      <Frame87 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame88 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Component9() {
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

function Frame89() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Component9 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Inventering
      </p>
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame89 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2031
      </p>
    </div>
  );
}

function Frame91() {
  return (
    <div className="bg-[#e4f5f5] box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föreslagen
      </p>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative shrink-0 w-full">
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Avdelning 11
      </p>
      <Frame91 />
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame90 />
      <Frame92 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Frame93 />
          <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            [ Frivillig kommentar ]
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame94() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[907px] items-start overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative shrink-0 w-full">
      <Frame58 />
      <Frame22 />
      <Frame23 />
      <Frame24 />
      <Frame26 />
      <Frame25 />
      <Frame28 />
      <Frame29 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col h-[1093px] items-start relative shrink-0 w-full">
      <Frame48 />
      <Frame52 />
      <Frame10 />
      <Frame94 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="bg-[#f7f7f7] box-border content-stretch flex flex-col h-[1093px] items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame96() {
  return (
    <div className="basis-0 bg-[#f7f7f7] box-border content-stretch flex flex-col grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto pb-[40px] pt-0 px-0 relative shrink-0 w-full">
      <Frame95 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame96 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
      <Frame97 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[725px] items-start left-0 overflow-clip rounded-tl-[16px] rounded-tr-[16px] top-[232px] w-[440px]" data-name="Component 8">
      <Frame98 />
    </div>
  );
}

export default function IPhone16ProMax() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="iPhone 16 Pro Max - 20">
      <Frame4 />
      <StatusBar />
      <Frame43 />
      <Component1 />
    </div>
  );
}