import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { HolmenCheckbox } from './HolmenCheckbox';

/**
 * Kompakt multi-select-filter renderat som en dropdown med checkbox-lista
 * i popovern. Triggern ser ut som ett HolmenInput-fält (48px hög, 2px border)
 * och visar antalet valda värden som en blå badge när något är valt.
 */

interface FilterDropdownProps {
  /** Rubrik / placeholder (t.ex. "Kategori"). */
  label: string;
  /** Tillgängliga värden. */
  options: string[];
  /** Set av valda värden. */
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  /** Map värdet till en visningsetikett (t.ex. för status-koder). */
  formatOption?: (value: string) => string;
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  formatOption,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const count = selected.size;
  const hasSelection = count > 0;

  const toggle = (v: string) => {
    const next = new Set(selected);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    onChange(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-full h-[48px] bg-white border-2 rounded-none px-[16px] flex items-center justify-between gap-[12px] transition-colors cursor-pointer outline-none font-['IBM_Plex_Sans',sans-serif] text-[14px] ${
            hasSelection
              ? 'border-[#1e3856] text-[#021c20]'
              : 'border-[#ededed] text-[#021c20] hover:border-[#1e3856]/40'
          }`}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <span className="flex items-center gap-[8px] min-w-0">
            <span
              className="font-semibold text-[12px] uppercase tracking-[0.5px] opacity-70 shrink-0"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {label}
            </span>
            {hasSelection && (
              <span
                className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-[6px] bg-[#1e3856] text-white text-[12px] font-bold"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {count}
              </span>
            )}
          </span>
          <ChevronDown
            className={`size-[16px] shrink-0 text-[#021c20] transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            strokeWidth={2}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-[var(--radix-popover-trigger-width)] max-h-[320px] overflow-y-auto p-0 border-2 border-[#ededed] rounded-none shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] bg-white"
      >
        <div className="flex flex-col py-[4px]">
          {options.map((opt) => {
            const isChecked = selected.has(opt);
            return (
              <label
                key={opt}
                className="flex items-center gap-[12px] px-[16px] py-[10px] cursor-pointer hover:bg-[#f7f7f7] select-none"
              >
                <HolmenCheckbox
                  checked={isChecked}
                  onCheckedChange={() => toggle(opt)}
                />
                <span
                  className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {formatOption ? formatOption(opt) : opt}
                </span>
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
