import { X } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';

/**
 * HolmenModal — Återanvändbar modal-komponent med konsekvent Holmen-design.
 * 
 * Designspecifikation:
 * - X-knapp uppe till höger för att stänga
 * - Padding: 24px (mobil) / 32px (desktop)
 * - Titel: IBM Plex Sans SemiBold, 20px, #1e3856
 * - Beskrivning: IBM Plex Sans Regular, 14px, var(--text-secondary)
 * - Knappar: ForestButton i footer med gap-3
 * - maxWidth: 500px (standard)
 * - Stöd för valfri ikon bredvid titeln
 */

export interface HolmenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export function HolmenModal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  maxWidth = '500px',
}: HolmenModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lås body scroll när modalen är öppen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Stäng med Escape-tangenten
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="bg-white w-full relative shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]"
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="holmen-modal-title"
      >
        {/* X-knapp — alltid uppe till höger */}
        <button
          onClick={onClose}
          className="absolute top-[20px] right-[20px] md:top-[24px] md:right-[24px] text-[#6b7280] hover:text-[#1e3856] transition-colors z-10 cursor-pointer"
          aria-label="Stäng"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Innehåll med padding */}
        <div className="p-[24px] md:p-[32px]">
          {/* Header */}
          <div className="flex items-start gap-3 pr-8 mb-2">
            {icon && (
              <div className="shrink-0 mt-0.5">
                {icon}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h2
                id="holmen-modal-title"
                className="font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold leading-[normal] text-[20px] text-[#1e3856]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {title}
              </h2>
              {description && (
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] text-[14px] text-[var(--text-secondary)]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="mt-[20px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * HolmenModalFooter — Konsekvent knapp-layout för modal-footer.
 * Knappar visas i en rad med gap-3, flex-1 per knapp.
 */
export function HolmenModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 mt-[24px]">
      {children}
    </div>
  );
}

/**
 * Hjälpkomponent för varningsikon i modaler (t.ex. "Avsluta konto", "Ta bort åtkomst").
 */
export function HolmenModalWarningIcon({ children }: { children: ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
      {children}
    </div>
  );
}