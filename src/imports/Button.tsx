import svgPaths from "./svg-spgf72lc7n";

function URulerCombined() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="u:ruler-combined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="u:ruler-combined">
          <path d={svgPaths.p26cc85f0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-white relative rounded-[100px] size-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-0 relative size-full">
          <URulerCombined />
        </div>
      </div>
    </div>
  );
}