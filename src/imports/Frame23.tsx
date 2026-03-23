function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[15px] text-center text-nowrap text-white uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Beställ skogsbruksplan
      </p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3856] relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-bold leading-[25.5px] relative shrink-0 text-[#0f233b] text-[15px] text-center text-nowrap uppercase whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Visa i karta
      </p>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div className="box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#1e3856] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative size-full">
      <Button />
      <Button1 />
    </div>
  );
}