/**
 * StatusBadge — square pill med Holmens varumärkesfärger.
 *
 * Föredra de semantiska varianterna (info, success, warning, danger, neutral).
 * Färgerna kommer från designsystemets CSS-variabler i `globals.css`:
 *   --h-blue-1..6, --h-green-1..6, --h-red-1..6, --h-brown-1..6
 *
 * Äldre färgnamn ('blue', 'green', 'red', 'yellow', 'orange', 'gray', 'purple')
 * accepteras fortfarande och mappas internt mot de semantiska varianterna så
 * att gamla anrop fungerar utan ändring.
 */

export type SemanticVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';
export type LegacyVariant = 'blue' | 'green' | 'red' | 'yellow' | 'orange' | 'gray' | 'purple';
export type BadgeVariant = SemanticVariant | LegacyVariant;

export interface StatusBadgeProps {
  /** Text att visa i badgen. */
  label?: string;
  /** Statustext (används som label om label saknas, även för auto-variant). */
  status?: string;
  /** Färgvariant. Om utelämnad så härleds den från text-innehållet. */
  variant?: BadgeVariant;
  /** Extra className för layout-specifika behov. */
  className?: string;
}

const semanticStyles: Record<SemanticVariant, { bg: string; text: string }> = {
  // Info — Holmen blue family
  info: { bg: 'var(--h-blue-6)', text: 'var(--h-blue-1)' },
  // Success — Holmen green family
  success: { bg: 'var(--h-green-6)', text: 'var(--h-green-3)' },
  // Warning — Holmen brown/orange family
  warning: { bg: 'var(--h-brown-6)', text: 'var(--h-brown-3)' },
  // Danger — Holmen red family
  danger: { bg: 'var(--h-red-6)', text: 'var(--h-red-3)' },
  // Neutral — gråtoner, ingen brand-färg
  neutral: { bg: '#f3f3f5', text: 'rgba(2, 28, 32, 0.7)' },
};

const legacyAlias: Record<LegacyVariant, SemanticVariant> = {
  blue: 'info',
  green: 'success',
  red: 'danger',
  yellow: 'warning',
  orange: 'warning',
  gray: 'neutral',
  purple: 'neutral',
};

function resolveVariant(variant: BadgeVariant): SemanticVariant {
  if (variant in semanticStyles) return variant as SemanticVariant;
  return legacyAlias[variant as LegacyVariant] ?? 'info';
}

/**
 * @example
 *   <StatusBadge label="Avslutad" variant="success" />
 *   <StatusBadge label="Pågående" variant="info" />
 *   <StatusBadge label="Förfallen" variant="danger" />
 *   <StatusBadge status="Pågående" />            // auto-variant
 */
export default function StatusBadge({
  label,
  status,
  variant,
  className = '',
}: StatusBadgeProps) {
  const displayText = label || status || '';
  const effectiveVariant: SemanticVariant = variant
    ? resolveVariant(variant)
    : getBadgeVariantFromStatus(displayText);

  const styles = semanticStyles[effectiveVariant];

  return (
    <div
      className={`box-border inline-flex items-center justify-center px-[8px] py-[4px] relative shrink-0 ${className}`}
      style={{ backgroundColor: styles.bg }}
    >
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-center"
        style={{
          fontVariationSettings: "'wdth' 100",
          color: styles.text,
        }}
      >
        {displayText}
      </p>
    </div>
  );
}

/**
 * Auto-mapping från statustext till semantisk variant.
 * Returnerar alltid en `SemanticVariant`.
 */
export function getBadgeVariantFromStatus(status: string): SemanticVariant {
  const s = status.toLowerCase();

  // success — slutförda / godkända
  if (
    s.includes('avslutad') ||
    s.includes('betald') ||
    s.includes('genomförd') ||
    s.includes('klar') ||
    s.includes('godkänd')
  ) {
    return 'success';
  }

  // danger — fel / avbrutna / förfallna
  if (
    s.includes('förfallen') ||
    s.includes('avbruten') ||
    s.includes('nekad') ||
    s.includes('överskrid')
  ) {
    return 'danger';
  }

  // warning — påminnelser / signering / röjning
  if (
    s.includes('påminn') ||
    s.includes('varna') ||
    s.includes('uppmärksam') ||
    s.includes('för signering') ||
    s.includes('röjning')
  ) {
    return 'warning';
  }

  // neutral — arkiverat / inaktivt / planerat
  if (
    s.includes('arkiverad') ||
    s.includes('inaktiv') ||
    s.includes('inventering') ||
    s.includes('planerad')
  ) {
    return 'neutral';
  }

  // info — aktiva / pågående / signerade
  return 'info';
}
