import svgPaths from "./svg-g2szz37j5q";
import imgImage from "figma:asset/9e02a57b2caea5f21ff826b9b89d89107c482bdd.png";
import imgImage1 from "figma:asset/79c97b5e7384dbe80a430f6968bbb0db8a2e8461.png";
import imgImage2 from "figma:asset/7e4894246ac213d40d8e6723e9a93bfd063f70d5.png";
import imgImage3 from "figma:asset/75b3c58e1d7ca3dcdad92a5df6536325e03f9adb.png";
import imgImage4 from "figma:asset/b9b24634fb07428e2dc20f8097db4e9fc28da1a8.png";
import imgImage5 from "figma:asset/fe902db78ebf8b551b1b2dc46c5994abab490075.png";
import imgImage6 from "figma:asset/b757b27974630ff853f231ffb96e907b1257534b.png";
import imgImage7 from "figma:asset/602dabd0db506d59f8b824f328d43843335f7ec5.png";
import imgImage8 from "figma:asset/d456a5dcbdc586561ef76722b1e573dec946e8b8.png";
import imgImage9 from "figma:asset/ef0abdba66feec9a8df9205bac2854fd8869932c.png";
import imgImage10 from "figma:asset/d2dfcefe2206c20fb5518ad775630668a537ea3c.png";
import imgHolmensLogotyp from "figma:asset/eac8e95a3633af8f6cad94c84a38006669cd2334.png";
import imgSvPng from "figma:asset/f68a517de6f631dbcd36bd0cdc1363a2694fa8a1.png";

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

function Frame3() {
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
      <Frame3 />
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

function Frame5() {
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
      <Frame5 />
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

function Frame6() {
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
      <Frame6 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p138fd0f1} fill="var(--fill-0, #021C20)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon2 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full opacity-60 relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ekonomi
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p2e055000} fill="var(--fill-0, #1E3856)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[2px] items-center justify-center px-[8px] py-0 relative shrink-0 size-[100px]">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Icon3 />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[#021c20] text-[13px] text-center w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tjänster
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Frame10 />
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

function Frame11() {
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
      <Frame11 />
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

function Time() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage2} />
        <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imgImage3} />
      </div>
      <Time />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbruksplan
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Få en tydlig överblick över din skogsfastighet. En uppdaterad skogsbruksplan hjälper dig att planera åtgärder, öka värdet och bruka skogen hållbart.
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om skogsbruksplan
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame12 />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative w-full">
          <Frame25 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="[grid-area:1_/_1] min-h-[192px] min-w-[320px] relative self-start shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image />
        <Paragraph />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time1() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image1() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
      <Time1 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Röjning
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Behöver din skog röjas eller planteras? Vi hjälper dig att hålla skogen i gott skick genom professionella skogsvårdsåtgärder.
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om röjning
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame26 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="[grid-area:1_/_2] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image1 />
        <Paragraph1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time2() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image2() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage5} />
      <Time2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Rådgivning och planering
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Här hittar du kontaktuppgifter till din virkesköpare och skogliga rådgivare – dina viktigaste kontakter för att utveckla din fastighet.
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Kontakta din rådgivare
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame18 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame27 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="[grid-area:1_/_3] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image2 />
        <Paragraph2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time3() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image3() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
      <Time3 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Plantering
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Efter föryngringsavverkning planterar vi nya träd, oftast gran eller tall beroende på markens förutsättningar. En bra etablering ger framtidsskogen en stark start och skapar långsiktiga värden på fastigheten.
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om plantering
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame28 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="[grid-area:1_/_4] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image3 />
        <Paragraph3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time4() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image4() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[273.44%] left-0 max-w-none top-[-98.47%] w-full" src={imgImage7} />
      </div>
      <Time4 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Föryngringsavverkning
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`När skogen har nått sin mognad är det dags för föryngringsavverkning. Vi avverkar det gamla beståndet och skapar förutsättningar för en ny, livskraftig skog att växa upp. `}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        läs mer om föryngringsavverkning
      </p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame29 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="[grid-area:2_/_1] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image4 />
        <Paragraph4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time5() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image5() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
      <Time5 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbilvägar
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Här hittar du kontaktuppgifter till din virkesköpare och skogliga rådgivare – dina viktigaste kontakter för att utveckla din fastighet.
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om skogsbilvägar
      </p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame31 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="[grid-area:2_/_2] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image5 />
        <Paragraph5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time6() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image6() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage9} />
      <Time6 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Leveransvirke
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Vill du själv hugga men ha hjälp med resten? Vi köper ditt leveransvirke, sköter transporten till industrin och ser till att du får korrekt mätning och ersättning.
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om leveransvirke
      </p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame33 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="[grid-area:2_/_3] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image6 />
        <Paragraph6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Time7() {
  return <div className="absolute h-[130px] left-0 right-[6.01%] top-1/2 translate-y-[-50%]" data-name="Time" />;
}

function Image7() {
  return (
    <div className="h-[210px] relative shrink-0 w-full z-[2]" data-name="image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage10} />
      <Time7 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[147px] items-start leading-[normal] relative shrink-0 text-[#021c20] w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold relative shrink-0 text-[20px] w-[312px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring
      </p>
      <p className="basis-0 font-['IBM_Plex_Sans',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Gallring innebär att vi tar bort vissa träd i ett växande bestånd för att ge kvarvarande träd bättre ljus, utrymme och näring. Åtgärden ökar tillväxten och förbättrar skogens kvalitet inför framtida avverkningar.
      </p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Läs mer om Gallring
      </p>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#1e3856] h-[60px] relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] h-[60px] items-center justify-center px-[16px] py-[8px] relative w-full">
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-full z-[1]" data-name="Paragraph">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <Frame35 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="[grid-area:2_/_4] h-[489px] min-h-[192px] min-w-[320px] relative shrink-0" data-name="Container">
      <div className="content-stretch flex flex-col h-[489px] isolate items-start justify-center min-h-inherit min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        <Image7 />
        <Paragraph7 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame37() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[1002px] relative shrink-0 w-full">
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[1013px] relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[1013px] items-start px-[48px] py-[40px] relative w-full">
          <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Skogliga tjänster
          </p>
          <Frame37 />
        </div>
      </div>
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

function Container8() {
  return (
    <div className="basis-0 grow max-w-[640px] min-h-px min-w-px relative shrink-0" data-name="Container">
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

function Icon5() {
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

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[36.76%_11.15%_36.76%_84.92%] items-start" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none scale-y-[-100%]">
          <Icon5 />
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
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[305px]" data-name="Container">
      <BackgroundBorder />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-center flex flex-wrap h-[68px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function GgFacebook() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="gg:facebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="gg:facebook">
          <path d={svgPaths.pdc8def2} fill="var(--fill-0, #0F6BB6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="box-border content-stretch flex gap-[3px] items-center p-[8px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <GgFacebook />
    </div>
  );
}

function MdiInstagram() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:instagram">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:instagram">
          <path d={svgPaths.p2c5f2300} fill="var(--fill-0, #383838)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame39() {
  return (
    <div className="box-border content-stretch flex gap-[3px] items-center p-[8px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <MdiInstagram />
    </div>
  );
}

function BasilLinkedinSolid() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="basil:linkedin-solid">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="basil:linkedin-solid">
          <path d={svgPaths.p35816d80} fill="var(--fill-0, #008CFF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="box-border content-stretch flex gap-[3px] items-center p-[8px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <BasilLinkedinSolid />
    </div>
  );
}

function MdiYoutube() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mdi:youtube">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mdi:youtube">
          <path d={svgPaths.p9733b30} fill="var(--fill-0, #FF0000)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="box-border content-stretch flex gap-[3px] items-center p-[8px] relative rounded-[1000px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      <MdiYoutube />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0">
      <Frame38 />
      <Frame39 />
      <Frame15 />
      <Frame16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[24px] min-w-full relative shrink-0 text-[#0f233b] text-[16px] w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Följ oss i sociala medier
      </p>
      <Frame40 />
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow max-w-[1280px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit px-[15px] py-0 relative w-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="h-[20px] relative shrink-0 w-[197.61px]" data-name="Link">
      <p className="absolute font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] left-0 text-[#0f233b] text-[16px] top-[-2px] w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ändra cookieinställningar
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
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Om webbplatsen
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cookies
      </p>
      <Link />
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-[199.265px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Personuppgifter (GDPR)
      </p>
      <Item />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <List />
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow max-w-[1280px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col items-start max-w-inherit px-[15px] py-0 relative w-full">
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return <div className="h-[48px] shrink-0 w-[206px]" data-name="Link" />;
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <Link2 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Länkar
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-[199.265px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Holmen.com
      </p>
      <p className="font-['IBM_Plex_Sans',sans-serif] font-normal h-[24px] leading-[24px] relative shrink-0 text-[#0f233b] text-[16px] w-[199.265px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Holmen skog
      </p>
      <Item1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <List1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-w-[1280px] px-[15px] py-0 relative shrink-0 w-[160px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0">
      <Container13 />
      <Container15 />
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Frame41 />
      <div className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[0] relative shrink-0 text-[#0f233b] text-[16px] w-[559px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px] mb-0">© Holmen AB 2025 - Holmen.com</p>
        <p className="leading-[24px] mb-0"> </p>
        <p className="leading-[24px] mb-0">Holmen brukar skogen aktivt och hållbart. Virket förädlas till trävaror för hållbart byggande och av det som blir över tillverkar vi världsledande kartong och innovativa pappersprodukter. När vi odlar hus, odlar vi förändring.</p>
        <p className="leading-[24px]">
          <span>{`Holmens verksamhet utgår från skogens kretslopp och de förnybara produkter vi kan skapa av det. Våra affärsområden är Skog, Trävaror, Kartong och Papper samt Energi. Vi är 3 500 medarbetare som skapar värde för aktieägare, kunder och samhälle. Vår omsättning uppgick 2024 till nästan 23 Mdkr och aktien är noterad på Nasdaq Stockholm, Large Cap. Välkommen att besöka `}</span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid underline">holmen.com</span>
          <span>{` för mer information. `}</span>
        </p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-px relative shrink-0 w-full" data-name="Separator">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <Container18 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Container19 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame42 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[1250px] relative shrink-0 w-full">
      <Container11 />
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-center justify-center pb-[40px] pt-0 px-[40px] relative w-full">
          <Frame44 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[1280px]" data-name="Footer">
      <div className="h-px relative shrink-0 w-full" data-name="Separator">
        <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      </div>
      <Frame45 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center px-0 py-[80px] relative shrink-0 w-full">
      <Footer />
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[#f7f7f7] content-stretch flex flex-col h-full items-center overflow-clip relative shrink-0 w-[1700px]">
      <Frame4 />
      <Frame46 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="[grid-area:1_/_1] box-border content-stretch flex h-[1013px] items-start ml-0 mt-0 relative">
      <SideMenu />
      <Frame47 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame48 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1089px] items-start left-0 top-0 w-[1800px]">
      <HeaderMinSkogV />
      <Group />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Desktop - 65">
      <Frame49 />
    </div>
  );
}