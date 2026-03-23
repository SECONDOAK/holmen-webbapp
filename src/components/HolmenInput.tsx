import * as React from "react";

interface HolmenInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
}

export const HolmenInput = React.forwardRef<HTMLInputElement, HolmenInputProps>(
  ({ label, labelClassName, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[8px] w-full">
        {label && (
          <label
            htmlFor={id}
            className={`font-['IBM_Plex_Sans:SemiBold',sans-serif] font-semibold text-[14px] text-[var(--text-primary)] ${labelClassName || ""}`}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            w-full h-[48px] px-[16px] py-[12px]
            bg-white border-2 border-[#ededed] rounded-none
            font-['IBM_Plex_Sans',sans-serif] font-normal text-[16px] text-[var(--text-primary)]
            placeholder:text-[#999]
            outline-none transition-colors
            focus:border-[#1e3856]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          style={{ fontVariationSettings: "'wdth' 100" }}
          {...props}
        />
      </div>
    );
  }
);

HolmenInput.displayName = "HolmenInput";
