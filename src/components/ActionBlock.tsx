import svgPaths from "../imports/svg-yzncxbvcbd";
import StatusBadge from "./StatusBadge";

interface ActionBlockProps {
  type: "Röjning" | "Gallring" | "Slutavverkning" | "Inventering";
  year: number;
  department?: string;
  status: "Föreslagen" | "Planerad" | "Genomförd";
  comment?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ActionBlock({ 
  type, 
  year, 
  department, 
  status, 
  comment,
  onClick,
  onMouseEnter,
  onMouseLeave
}: ActionBlockProps) {
  return (
    <div 
      className={`bg-white relative w-full ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="w-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
            <div className="content-stretch flex items-start justify-between relative w-full">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <p className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {type}
                </p>
              </div>
              <p className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                {year}
              </p>
            </div>
            <div className="content-start flex flex-wrap gap-[8px] items-start justify-between relative w-full">
              {department && (
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-justify text-nowrap underline whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {department}
                </p>
              )}
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}