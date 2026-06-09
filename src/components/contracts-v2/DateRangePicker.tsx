interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  /** Datum-range som "återställ"-knappen återgår till. */
  defaultRange?: { start: string; end: string };
  /** Tillgängliga datumgränser för validering (min/max). */
  bounds?: { min: string; max: string };
}

/**
 * Tunn wrapper runt två native `<input type="date">`-fält plus en
 * återställ-knapp. Tillämpas i charts där användaren behöver styra
 * intervallet (utbetalningar / kostnader över tid).
 *
 * Hålls visuellt enkel — Holmen har ingen design-system-komponent
 * för date-pickers, så vi förlitar oss på native input med subtilt
 * stylade omslag.
 */
export default function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  defaultRange,
  bounds,
}: DateRangePickerProps) {
  const reset = () => {
    if (!defaultRange) return;
    onStartChange(defaultRange.start);
    onEndChange(defaultRange.end);
  };

  const hasChanged =
    defaultRange &&
    (startDate !== defaultRange.start || endDate !== defaultRange.end);

  return (
    <div className="flex flex-wrap items-end gap-[12px]">
      <DateField
        label="Från"
        value={startDate}
        onChange={onStartChange}
        min={bounds?.min}
        max={endDate || bounds?.max}
      />
      <DateField
        label="Till"
        value={endDate}
        onChange={onEndChange}
        min={startDate || bounds?.min}
        max={bounds?.max}
      />
      {defaultRange && hasChanged && (
        <button
          type="button"
          onClick={reset}
          className="h-[40px] px-[12px] font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] uppercase tracking-[0.5px] text-[#1E3856] hover:underline"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Återställ
        </button>
      )}
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
}) {
  return (
    <label className="flex flex-col gap-[4px]">
      <span
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] md:text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        className="h-[40px] px-[12px] bg-white border-2 border-[#ededed] hover:border-[#1e3856]/40 focus:border-[#1e3856] focus:outline-none font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] rounded-none transition-colors"
        style={{ fontVariationSettings: "'wdth' 100" }}
      />
    </label>
  );
}
