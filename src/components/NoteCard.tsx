import { Pencil, Share } from "lucide-react";

interface NoteCardProps {
  title: string;
  department: string;
  date: string;
  color: string;
  type?: string;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

// Normalize legacy type values from database
const normalizeType = (t?: string) => {
  if (!t) return t;
  if (t === "Vindfäll") return "Vindfälle";
  return t;
};

export function NoteCard({ title, department, date, color, type, onClick, onEdit, onShare, onHover, onHoverEnd }: NoteCardProps) {
  const displayType = normalizeType(type);
  return (
    <div
      className={`bg-white relative shrink-0 w-full ${onClick ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {/* Bottom border */}
      <div aria-hidden="true" className="absolute border-[#e4e4e4] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />

      <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">

        {/* Top row: title + date */}
        <div className="content-stretch flex items-start justify-between relative w-full">
          <p
            className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-black text-nowrap whitespace-pre"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {title}
          </p>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-nowrap whitespace-pre ml-2 mt-[2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {date}
          </p>
        </div>

        {/* Bottom row: badge + department + action buttons */}
        <div className="content-stretch flex items-center justify-between relative w-full">
          <div className="flex items-center gap-[8px]">
            {type && (
              <span style={{
                fontSize: '10px',
                background: color,
                padding: '3px 8px',
                color: 'white',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                fontFamily: "'IBM Plex Sans', sans-serif",
                lineHeight: 1.4,
              }}>
                {displayType}
              </span>
            )}
            {department && (
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#1e3856] text-[14px] text-nowrap whitespace-pre"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {department}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 -mr-1">
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(e);
                }}
                title="Dela anteckning"
                className="p-[6px] hover:bg-[#e4f5f5] transition-colors text-[#1e3856]"
              >
                <Share size={15} strokeWidth={2} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(e);
                }}
                title="Redigera anteckning"
                className="p-[6px] hover:bg-[#e4f5f5] transition-colors text-[#1e3856]"
              >
                <Pencil size={15} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
