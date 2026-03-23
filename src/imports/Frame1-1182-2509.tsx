import svgPaths from "./svg-9o2biw9wox";

function Karta() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="karta 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g clipPath="url(#clip0_1182_2513)" id="karta 1" opacity="0.5">
          <path d={svgPaths.p2cb4ea00} fill="var(--fill-0, #021C20)" id="Vector" />
          <path d={svgPaths.p251b3800} fill="var(--fill-0, #021C20)" id="Vector_2" />
          <path d={svgPaths.p1754a300} fill="var(--fill-0, #021C20)" id="Vector_3" />
          <path d={svgPaths.p22d74000} fill="var(--fill-0, #021C20)" id="Vector_4" />
          <path d={svgPaths.p2df05380} fill="var(--fill-0, #021C20)" id="Vector_5" />
          <path d={svgPaths.p198f0600} fill="var(--fill-0, #021C20)" id="Vector_6" />
          <path d={svgPaths.p3da62470} fill="var(--fill-0, #021C20)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_1182_2513">
            <rect fill="white" height="22" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative size-full">
      <Karta />
    </div>
  );
}