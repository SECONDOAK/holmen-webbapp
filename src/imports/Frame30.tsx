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

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Skogsbruksplan för LEMESJÖ 1:52
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <FiChevronLeft />
      <Frame2 />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="relative size-full">
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}