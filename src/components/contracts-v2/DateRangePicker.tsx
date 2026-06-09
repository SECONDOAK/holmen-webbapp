import { useMemo, useState } from 'react';
import { Calendar, Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  /** Tillgängliga datumgränser för validering och "Hela perioden". */
  bounds?: { min: string; max: string };
}

/**
 * Kompakt datumväljare i Shopify-stil — en singel-trigger som öppnar en
 * popover med vanliga presets ("Idag", "Senaste 12 månader", etc.) plus
 * ett anpassat intervall längst ner.
 *
 * Triggen matchar visuellt `FilterDropdown` (h-[48px], 2px border, vit bg,
 * navy-fokus) så datumväljaren och kategori-filtret står i samma rad och
 * läser sig som ett konsistent kontrollpanel.
 *
 * Presets är generella tidsfönster — inga butiksspecifika varianter
 * (Black Friday etc.) som inte är relevanta för skogsbruk.
 */

const SWEDISH_MONTHS_SHORT = [
  'jan', 'feb', 'mar', 'apr', 'maj', 'jun',
  'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function addMonthsISO(iso: string, months: number): string {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function formatRangeLabel(start: string, end: string): string {
  if (!start || !end) return 'Välj datumintervall';
  const [sy, sm, sd] = start.split('-').map(Number);
  const [ey, em, ed] = end.split('-').map(Number);
  if (sy === ey && sm === em && sd === ed) {
    return `${sd} ${SWEDISH_MONTHS_SHORT[sm - 1]}. ${sy}`;
  }
  if (sy === ey) {
    return `${sd} ${SWEDISH_MONTHS_SHORT[sm - 1]}. – ${ed} ${SWEDISH_MONTHS_SHORT[em - 1]}. ${ey}`;
  }
  return `${sd} ${SWEDISH_MONTHS_SHORT[sm - 1]}. ${sy} – ${ed} ${SWEDISH_MONTHS_SHORT[em - 1]}. ${ey}`;
}

interface Preset {
  key: string;
  label: string;
  compute: (bounds?: { min: string; max: string }) => { start: string; end: string };
}

/**
 * Standardpresets relevanta för skogsbruk. Vi har medvetet skippat
 * butiksspecifika (Black Friday, Cyber Monday) och håller listan kort.
 */
const PRESETS: Preset[] = [
  {
    key: 'today',
    label: 'Idag',
    compute: () => {
      const t = todayISO();
      return { start: t, end: t };
    },
  },
  {
    key: 'yesterday',
    label: 'Igår',
    compute: () => {
      const y = addDaysISO(todayISO(), -1);
      return { start: y, end: y };
    },
  },
  {
    key: 'last7',
    label: 'Senaste 7 dagar',
    compute: () => {
      const today = todayISO();
      return { start: addDaysISO(today, -6), end: today };
    },
  },
  {
    key: 'last30',
    label: 'Senaste 30 dagar',
    compute: () => {
      const today = todayISO();
      return { start: addDaysISO(today, -29), end: today };
    },
  },
  {
    key: 'last3mo',
    label: 'Senaste 3 månader',
    compute: () => {
      const today = todayISO();
      return { start: addMonthsISO(today, -3), end: today };
    },
  },
  {
    key: 'last12mo',
    label: 'Senaste 12 månader',
    compute: () => {
      const today = todayISO();
      return { start: addMonthsISO(today, -12), end: today };
    },
  },
  {
    key: 'ytd',
    label: 'Året hittills',
    compute: () => {
      const today = todayISO();
      const year = parseInt(today.slice(0, 4), 10);
      return { start: `${year}-01-01`, end: today };
    },
  },
  {
    key: 'prevYear',
    label: 'Föregående år',
    compute: () => {
      const today = todayISO();
      const year = parseInt(today.slice(0, 4), 10) - 1;
      return { start: `${year}-01-01`, end: `${year}-12-31` };
    },
  },
  {
    key: 'all',
    label: 'Hela perioden',
    compute: (bounds) =>
      bounds ? { start: bounds.min, end: bounds.max } : { start: '', end: '' },
  },
];

export default function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  bounds,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  // Identifiera vilket preset (om något) som matchar nuvarande datum.
  const activePresetKey = useMemo(() => {
    for (const p of PRESETS) {
      const { start, end } = p.compute(bounds);
      if (start === startDate && end === endDate) return p.key;
    }
    return 'custom';
  }, [startDate, endDate, bounds]);

  // Trigger-labeln: visa preset-namnet om ett matchar, annars formaterat range.
  const triggerLabel = useMemo(() => {
    const preset = PRESETS.find((p) => p.key === activePresetKey);
    if (preset) return preset.label;
    return formatRangeLabel(startDate, endDate);
  }, [activePresetKey, startDate, endDate]);

  const applyPreset = (preset: Preset) => {
    const { start, end } = preset.compute(bounds);
    onStartChange(start);
    onEndChange(end);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-full md:min-w-[260px] md:max-w-[320px] h-[48px] bg-white border-2 rounded-none px-[16px] flex items-center justify-between gap-[12px] transition-colors cursor-pointer outline-none font-['IBM_Plex_Sans',sans-serif] text-[14px] ${
            activePresetKey !== 'custom' && activePresetKey !== 'all'
              ? 'border-[#1e3856] text-[#021c20]'
              : 'border-[#ededed] text-[#021c20] hover:border-[#1e3856]/40'
          }`}
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <span className="flex items-center gap-[10px] min-w-0">
            <Calendar className="size-[16px] shrink-0 text-[#021c20]" strokeWidth={2} />
            <span
              className="font-semibold text-[12px] uppercase tracking-[0.5px] opacity-70 shrink-0"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Period
            </span>
            <span className="truncate text-[#021c20]">{triggerLabel}</span>
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
        className="w-[520px] max-w-[calc(100vw-32px)] p-0 border-2 border-[#ededed] rounded-none shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] bg-white"
      >
        {/* Tva-kolumners layout: presets vanster, anpassat intervall hoger.
            Pa mobil stackas det automatiskt eftersom max-w begransas av
            viewport och vi switchar till flex-col under sm-breakpointen. */}
        <div className="flex flex-col sm:flex-row min-h-[280px]">
          {/* Vanster: preset-lista */}
          <div className="flex flex-col py-[4px] sm:w-[220px] sm:border-r sm:border-[#e4e4e4]">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => applyPreset(p)}
                className="flex items-center justify-between gap-[8px] px-[16px] py-[10px] hover:bg-[#f7f7f7] text-left transition-colors"
              >
                <span
                  className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {p.label}
                </span>
                {activePresetKey === p.key && (
                  <Check className="size-[16px] text-[#1e3856] shrink-0" strokeWidth={2.5} />
                )}
              </button>
            ))}
          </div>

          {/* Hoger: anpassat intervall */}
          <div className="flex-1 px-[20px] py-[16px] flex flex-col gap-[14px] bg-[#fafafa] sm:bg-white border-t sm:border-t-0 border-[#e4e4e4]">
            <div className="flex items-center justify-between">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Anpassat intervall
              </p>
              {activePresetKey === 'custom' && (
                <Check className="size-[16px] text-[#1e3856]" strokeWidth={2.5} />
              )}
            </div>
            <div className="flex flex-col gap-[12px]">
              <CompactDateField
                label="Från"
                value={startDate}
                onChange={onStartChange}
                min={bounds?.min}
                max={endDate || bounds?.max}
              />
              <CompactDateField
                label="Till"
                value={endDate}
                onChange={onEndChange}
                min={startDate || bounds?.min}
                max={bounds?.max}
              />
            </div>
            {bounds && (
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60 leading-[1.5] mt-auto"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Tillgänglig data:
                <br />
                {bounds.min} → {bounds.max}
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CompactDateField({
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
        className="font-['IBM_Plex_Sans',sans-serif] text-[11px] text-[#021c20] opacity-70"
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
        className="h-[36px] px-[8px] bg-white border border-[#ededed] hover:border-[#1e3856]/40 focus:border-[#1e3856] focus:outline-none font-['IBM_Plex_Sans',sans-serif] text-[13px] text-[#021c20] rounded-none transition-colors"
        style={{ fontVariationSettings: "'wdth' 100" }}
      />
    </label>
  );
}
