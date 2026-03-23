import * as React from "react";
import { Check } from "lucide-react";

interface HolmenCheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function HolmenCheckbox({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
}: HolmenCheckboxProps) {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={`
        shrink-0 size-[20px] border-2 
        flex items-center justify-center transition-colors duration-150 outline-none
        focus-visible:ring-2 focus-visible:ring-[#1e3856]/40 focus-visible:ring-offset-1
        ${checked
          ? "bg-[#1e3856] border-[#1e3856]"
          : "bg-white border-[#D4D4D4]"
        }
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:border-[#1e3856]"
        }
        ${className}
      `}
    >
      {checked && (
        <Check className="size-[14px] text-white" strokeWidth={3} />
      )}
    </button>
  );
}