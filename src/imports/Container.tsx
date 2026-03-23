import svgPaths from "./svg-b657te3gpb";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon" opacity="0.5">
          <rect height="10" id="Rectangle 237" rx="4" stroke="var(--stroke-0, #021C20)" strokeWidth="2" width="8" x="11.9998" y="2.60547" />
          <path d="M9 7L20.5 7" id="Vector 27" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeWidth="2" />
          <path d={svgPaths.p16d34100} id="Vector" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2470da00} id="Vector_2" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeWidth="2" />
          <path d="M6 12.5V15.5" id="Vector 28" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeWidth="2" />
          <path d="M19 20V21.5" id="Vector 30" stroke="var(--stroke-0, #021C20)" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Icon />
    </div>
  );
}