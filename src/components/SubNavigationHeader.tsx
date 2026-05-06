import { ChevronLeft } from "lucide-react";

interface SubNavigationHeaderProps {
  title: string;
  onBack: () => void;
}

export function SubNavigationHeader({ title, onBack }: SubNavigationHeaderProps) {
  return (
    <div className="relative shrink-0 w-full bg-white border-b border-[#e4e4e4]">
      <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <button
          onClick={onBack}
          className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full hover:opacity-70 transition-opacity"
        >
          <div className="relative shrink-0 size-[24px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <path d="M15 18L9 12L15 6" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
          <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
            <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0">
              <p className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[#021c20] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                {title}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}