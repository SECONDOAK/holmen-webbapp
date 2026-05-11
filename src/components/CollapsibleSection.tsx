import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  /** Extra elements to render inline with the title (e.g. info icon) */
  titleExtra?: ReactNode;
  /** Whether to grey-out the title (no-plan state) */
  dimmed?: boolean;
  /** Default open state, defaults to true */
  defaultOpen?: boolean;
  /** Optional top border */
  borderTop?: boolean;
}

/**
 * CollapsibleSection - FIXED v2: Uses div wrapper instead of button to avoid nesting issues
 * with interactive child elements like HuggningsklassInfoIcon
 */
export function CollapsibleSection({
  title,
  children,
  titleExtra,
  dimmed = false,
  defaultOpen = true,
  borderTop = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      {/* Main header wrapper - NOT a button to avoid nesting issues */}
      <div
        className={`w-full bg-[#f7f7f7] py-3 px-4 border-b border-[#e4e4e4] hover:bg-[#efefef] transition-colors ${borderTop ? "border-t" : ""}`}
      >
        {/* Clickable area for collapse/expand */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          <div className="flex items-center gap-2">
            <p
              className={`font-['IBM_Plex_Sans',sans-serif] font-semibold ${
                dimmed ? "text-[#b0b0b0]" : "text-[#021c20]"
              }`}
            >
              {title}
            </p>
            {titleExtra && (
              <span onClick={(e) => e.stopPropagation()}>
                {titleExtra}
              </span>
            )}
          </div>
          <ChevronDown
            className={`size-5 transition-transform duration-200 ${
              dimmed ? "text-[#b0b0b0]" : "text-gray-500"
            } ${isOpen ? "" : "-rotate-90"}`}
            strokeWidth={2}
          />
        </div>
      </div>
      {isOpen && children}
    </>
  );
}
