import { MoreHorizontal } from 'lucide-react';
import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';

export interface KebabMenuItem {
  label: string;
  onClick: () => void;
  /** Highlight as a destructive action (red text). */
  danger?: boolean;
}

export interface KebabMenuProps {
  items: KebabMenuItem[];
  /** Position the menu relative to the trigger. Defaults to right-aligned, below the trigger. */
  align?: 'left' | 'right';
  /** Override the menu's minimum width. */
  minWidth?: string;
  /** Tooltip on the trigger. */
  triggerTitle?: string;
  /** Optional extra className on the trigger button. */
  className?: string;
}

/**
 * KebabMenu — shared three-dot dropdown menu for row-level actions
 * (notes, access cards, etc.). Keeps a single look-and-feel across
 * the app.
 */
export function KebabMenu({
  items,
  align = 'right',
  minWidth = '180px',
  triggerTitle = 'Fler alternativ',
  className = '',
}: KebabMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [open]);

  if (items.length === 0) return null;

  const handleTriggerClick = (e: ReactMouseEvent) => {
    e.stopPropagation();
    setOpen((p) => !p);
  };

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={handleTriggerClick}
        className={`p-2 text-[#1e3856] hover:bg-[#f3f4f6] transition-colors ${className}`}
        title={triggerTitle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute top-full mt-[2px] bg-white border border-[#e4e4e4] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-20 ${align === 'right' ? 'right-0' : 'left-0'}`}
          style={{ minWidth }}
        >
          {items.map((item, idx) => (
            <button
              key={`${item.label}-${idx}`}
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className={`w-full px-[16px] py-[8px] hover:bg-[#f7f7f7] cursor-pointer font-['IBM_Plex_Sans',sans-serif] text-[14px] text-left whitespace-nowrap ${item.danger ? 'text-[#b43437]' : 'text-[#021c20]'}`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
