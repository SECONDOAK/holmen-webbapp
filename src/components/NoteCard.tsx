import { Send, Check } from "lucide-react";
import { useState } from "react";
import { HolmenModal, HolmenModalFooter } from "./HolmenModal";
import ForestButton from "./ForestButton";
import { KebabMenu, KebabMenuItem } from "./KebabMenu";

interface NoteCardProps {
  title: string;
  department: string;
  date: string;
  color: string;
  type?: string;
  resolved?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: (e: React.MouseEvent) => void;
  onToggleResolved?: (e: React.MouseEvent) => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

// Normalize legacy type values from database
const normalizeType = (t?: string) => {
  if (!t) return t;
  if (t === "Vindfäll" || t === "Vindfälle" || t === "Viltskada") return "Skogsskada";
  return t;
};

export function NoteCard({ title, department, date, color, type, resolved, onClick, onEdit, onDelete, onShare, onToggleResolved, onHover, onHoverEnd }: NoteCardProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const displayType = normalizeType(type);
  // Normalize legacy colors: old Vindfälle purple (#5F283F) → Skogsskada orange (#FF6E2E)
  const displayColor = color === '#5F283F' || color === '#D9381E' ? '#FF6E2E' : color;
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

        {/* Top row: badge + department + action buttons */}
        <div className="content-stretch flex items-center justify-between relative w-full">
          <div className="flex items-center gap-[8px]">
            {type && (
              <span style={{
                fontSize: '10px',
                background: displayColor,
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
            {onToggleResolved && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleResolved(e);
                }}
                title={resolved ? "Avmarkera som klar" : "Markera som klar"}
                className="p-[6px] rounded-full hover:bg-[#f3f4f6]"
              >
                <div className={`size-[16px] rounded-full border flex items-center justify-center transition-colors ${resolved ? 'bg-[#1e3856] border-[#1e3856]' : 'border-[#1e3856] bg-white'}`}>
                  <Check size={10} strokeWidth={3} className={resolved ? 'text-white' : 'text-[#1e3856]'} />
                </div>
              </button>
            )}
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(e);
                }}
                title="Dela anteckning"
                className="p-[6px] rounded-full hover:bg-[#f3f4f6] text-[#1e3856]"
              >
                <Send size={15} strokeWidth={2} />
              </button>
            )}
            {(onEdit || onDelete) && (() => {
              const items: KebabMenuItem[] = [];
              if (onEdit) items.push({
                label: 'Redigera',
                onClick: () => onEdit(),
              });
              if (onDelete) items.push({
                label: 'Ta bort',
                onClick: () => setConfirmDeleteOpen(true),
                danger: true,
              });
              return <KebabMenu items={items} />;
            })()}
          </div>
        </div>

        {/* Bottom row: title + date */}
        <div className="content-stretch flex items-start justify-between relative w-full">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[22px] relative shrink-0 text-[16px] text-[#021c20] text-nowrap whitespace-pre"
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

      </div>

      {/* Bekräfta ta bort */}
      {onDelete && (
        <HolmenModal
          isOpen={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
          title="Ta bort anteckning"
        >
          <p className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[var(--text-secondary)] mb-[4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Är du säker på att du vill ta bort denna anteckning? Åtgärden kan inte ångras.
          </p>
          <HolmenModalFooter>
            <ForestButton variant="white" onClick={() => setConfirmDeleteOpen(false)}>
              Avbryt
            </ForestButton>
            <ForestButton variant="danger" onClick={() => { setConfirmDeleteOpen(false); onDelete(); }}>
              Ta bort
            </ForestButton>
          </HolmenModalFooter>
        </HolmenModal>
      )}
    </div>
  );
}
