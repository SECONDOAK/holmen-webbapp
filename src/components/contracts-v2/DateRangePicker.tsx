import { useMemo, useState } from 'react';
import { Calendar, Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MOCK_TODAY } from '../../data/contractsV2Data';

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

/**
 * "Today" för presetberäkningarna. Vi anvander MOCK_TODAY (samma som
 * data-layerens cutoff för planerade utbetalningar) sa presetsen
 * synkar med vad chart:en faktiskt visar — kommande-presets dackar
 * verkligen kommande betalplan-poster och inte ett real-time-now som
 * kan ligga utanfor datasetet.
 */
function todayISO(): string {
  return MOCK_TODAY;
}

/** Innevarande år enligt MOCK_TODAY — bas för års-presetsen. */
const CURRENT_YEAR = parseInt(todayISO().slice(0, 4), 10);

/**
 * Format ett datumintervall som lasbar svensk text, t.ex.
 * "15 okt. 2024 – 9 jun. 2026". Exporterad sa charts kan visa vilken
 * period som galler aven nar man scrollat forbi periodvaljaren.
 */
export function formatRangeLabel(start: string, end: string): string {
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
  /** Grupp för visuell uppdelning i menyn. */
  group: 'år' | 'fönster' | 'period';
  compute: (bounds?: { min: string; max: string }) => { start: string; end: string };
}

/** Helt kalenderår som datumintervall. */
function wholeYear(year: number): { start: string; end: string } {
  return { start: `${year}-01-01`, end: `${year}-12-31` };
}

/**
 * Slimmad preset-lista enligt design-skissen:
 *   VÄLJ ÅR: innevarande + två bakåt (enskilda kalenderår)
 *   Senaste 3 åren — default-fönstret (de tre senaste åren)
 *   Hela perioden — från och med det första kontraktet
 * Anpassat intervall hanteras separat i popovern.
 */
const PRESETS: Preset[] = [
  // ── Enskilda kalenderår ──────────────────────────────
  {
    key: 'year0',
    label: String(CURRENT_YEAR),
    group: 'år',
    compute: () => wholeYear(CURRENT_YEAR),
  },
  {
    key: 'year1',
    label: String(CURRENT_YEAR - 1),
    group: 'år',
    compute: () => wholeYear(CURRENT_YEAR - 1),
  },
  {
    key: 'year2',
    label: String(CURRENT_YEAR - 2),
    group: 'år',
    compute: () => wholeYear(CURRENT_YEAR - 2),
  },
  // ── Default-fönster + hela perioden ──────────────────
  {
    key: 'last3years',
    label: 'Senaste 3 åren',
    group: 'fönster',
    compute: (bounds) => ({
      start: `${CURRENT_YEAR - 2}-01-01`,
      end: bounds ? bounds.max : todayISO(),
    }),
  },
  {
    key: 'all',
    label: 'Hela perioden',
    group: 'period',
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

  /** Anpassat intervall ar ihopfallt som standard; expanderas pa klick. */
  const [customOpen, setCustomOpen] = useState(false);
  const showCustomFields = customOpen || activePresetKey === 'custom';

  // "Senaste 3 åren" finns kvar i PRESETS for default-mappningen
  // (trigger-labeln) men renderas inte langre som en menyrad.
  const yearPresets = PRESETS.filter((p) => p.group === 'år');
  const hela = PRESETS.find((p) => p.key === 'all');
  const helaRange = hela?.compute(bounds);

  // En fast ledtext-kolumn (check eller tom) langst till vanster sa
  // alla rad-texter linjerar — aven med Anpassat intervall som har en
  // kalender-ikon i samma kolumn.
  const renderPresetRow = (p: Preset, subtitle?: string) => {
    const active = activePresetKey === p.key;
    return (
      <button
        key={p.key}
        type="button"
        onClick={() => applyPreset(p)}
        className="w-full flex items-start gap-[10px] px-[16px] py-[10px] hover:bg-[#f7f7f7] text-left transition-colors"
      >
        <span className="size-[16px] shrink-0 mt-[2px] flex items-center justify-center">
          {active && <Check className="size-[16px] text-[#1e3856]" strokeWidth={2.5} />}
        </span>
        <span className="flex flex-col gap-[1px] min-w-0">
          <span
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {p.label}
          </span>
          {subtitle && (
            <span
              className="font-['IBM_Plex_Sans',sans-serif] text-[12px] text-[#021c20] opacity-60"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {subtitle}
            </span>
          )}
        </span>
      </button>
    );
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
        className="w-[300px] max-w-[calc(100vw-32px)] p-0 border-2 border-[#ededed] rounded-none shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)] bg-white"
      >
        {/* Enkolumns-lista: VÄLJ ÅR + Senaste 3 åren, Hela perioden med
            datum-subtitel, sen Anpassat intervall ihopfallt langst ner. */}
        <div className="flex flex-col py-[4px]">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] uppercase tracking-[0.5px] text-[#021c20] opacity-50 px-[16px] pt-[8px] pb-[4px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Välj år
          </p>
          {yearPresets.map((p) => renderPresetRow(p))}

          <div className="mx-[16px] my-[4px] border-t border-[#e4e4e4]" />
          {hela &&
            renderPresetRow(
              hela,
              helaRange && helaRange.start
                ? formatRangeLabel(helaRange.start, helaRange.end)
                : undefined
            )}

          <div className="mx-[16px] my-[4px] border-t border-[#e4e4e4]" />
          {/* Anpassat intervall — kalender-ikon i samma ledtext-kolumn
              som rad-checkarna sa texten linjerar. Togglar date-falten. */}
          <button
            type="button"
            onClick={() => setCustomOpen((v) => !v)}
            className="w-full flex items-center gap-[10px] px-[16px] py-[10px] hover:bg-[#f7f7f7] text-left transition-colors"
            aria-expanded={showCustomFields}
          >
            <span className="size-[16px] shrink-0 flex items-center justify-center">
              <Calendar className="size-[16px] text-[#021c20] opacity-70" strokeWidth={2} />
            </span>
            <span
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] flex-1 min-w-0"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Anpassat intervall…
            </span>
            {activePresetKey === 'custom' ? (
              <Check className="size-[16px] text-[#1e3856] shrink-0" strokeWidth={2.5} />
            ) : (
              <ChevronDown
                className={`size-[16px] shrink-0 text-[#021c20] opacity-60 transition-transform ${
                  showCustomFields ? 'rotate-180' : ''
                }`}
                strokeWidth={2}
              />
            )}
          </button>

          {showCustomFields && (
            <div className="flex flex-col gap-[12px] px-[16px] pt-[8px] pb-[12px] bg-[#fafafa]">
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
          )}
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
    <label className="flex flex-col gap-[6px]">
      <span
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] uppercase tracking-[0.5px] text-[#021c20] opacity-70"
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
        className="w-full h-[48px] px-[16px] bg-white border-2 border-[#ededed] hover:border-[#1e3856]/40 focus:border-[#1e3856] focus:outline-none font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] rounded-none transition-colors"
        style={{ fontVariationSettings: "'wdth' 100" }}
      />
    </label>
  );
}
