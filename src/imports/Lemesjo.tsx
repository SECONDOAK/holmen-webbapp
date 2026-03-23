function Frame() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[8px] relative rounded-[8px] shrink-0">
      <p className="font-['IBM_Plex_Sans',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#021c20] text-[14px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        LEMESJÖ 1:52
      </p>
    </div>
  );
}

export default function Lemesjo() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full" data-name="Lemesjö">
      <Frame />
      <div className="h-[10px] relative shrink-0 w-[15px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 10">
            <path d="M7.5 10L0 0H15L7.5 10Z" fill="var(--fill-0, white)" id="Vector 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}