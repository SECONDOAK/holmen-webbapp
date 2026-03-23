export type BadgeVariant = 
  | 'blue'        // Default - Pågående, Inväntar betalning
  | 'green'       // Success - Betald, Genomförd
  | 'red'         // Error - Förfallen
  | 'yellow'      // Warning
  | 'gray'        // Neutral/Disabled
  | 'purple'      // Info
  | 'orange';     // Alert

export interface StatusBadgeProps {
  /**
   * The text to display in the badge
   */
  label?: string;
  
  /**
   * The status text (will be used as label if label is not provided)
   */
  status?: string;
  
  /**
   * The color variant of the badge
   * If not provided, will be auto-determined from status/label
   * @default 'blue'
   */
  variant?: BadgeVariant;
  
  /**
   * Optional custom className for additional styling
   */
  className?: string;
}

/**
 * StatusBadge - A reusable component for displaying status information
 * with consistent styling across the app.
 * 
 * @example
 * <StatusBadge label="Pågående" variant="blue" />
 * <StatusBadge label="Betald" variant="green" />
 * <StatusBadge label="Förfallen" variant="red" />
 */
export default function StatusBadge({ 
  label, 
  status,
  variant,
  className = '' 
}: StatusBadgeProps) {
  
  // Determine display text
  const displayText = label || status || '';
  
  // Auto-determine variant if not provided
  const effectiveVariant = variant || getBadgeVariantFromStatus(displayText);
  
  const getVariantStyles = (variant: BadgeVariant) => {
    const variants = {
      blue: {
        bg: '#e4f5f5',
        text: '#1e3856'
      },
      green: {
        bg: '#e8f5e9',
        text: '#2e7d32'
      },
      red: {
        bg: '#ffebee',
        text: '#d32f2f'
      },
      yellow: {
        bg: '#fff9e6',
        text: '#f57c00'
      },
      gray: {
        bg: '#f5f5f5',
        text: 'rgba(2, 28, 32, 0.5)'
      },
      purple: {
        bg: '#f3e5f5',
        text: '#7b1fa2'
      },
      orange: {
        bg: '#fff3e0',
        text: '#e65100'
      }
    };
    
    return variants[variant];
  };
  
  const styles = getVariantStyles(effectiveVariant);
  
  return (
    <div 
      className={`box-border content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 ${className}`}
      style={{ backgroundColor: styles.bg }}
    >
      <p 
        className="font-['IBM_Plex_Sans',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-justify" 
        style={{ 
          fontVariationSettings: "'wdth' 100",
          color: styles.text
        }}
      >
        {displayText}
      </p>
    </div>
  );
}

/**
 * Helper function to automatically determine badge variant based on status text
 */
export function getBadgeVariantFromStatus(status: string): BadgeVariant {
  const statusLower = status.toLowerCase();
  
  // Green variants - Success states
  if (statusLower.includes('betald') || 
      statusLower.includes('genomförd') || 
      statusLower.includes('klar') ||
      statusLower.includes('godkänd')) {
    return 'green';
  }
  
  // Red variants - Error/Alert states
  if (statusLower.includes('förfallen') || 
      statusLower.includes('avbruten') ||
      statusLower.includes('nekad') ||
      statusLower.includes('överskrid') ||
      statusLower.includes('slutavverkning')) {
    return 'red';
  }
  
  // Yellow variants - Warning states
  if (statusLower.includes('påminn') || 
      statusLower.includes('varna') ||
      statusLower.includes('uppmärksam') ||
      statusLower.includes('röjning')) {
    return 'yellow';
  }
  
  // Gray variants - Completed/Neutral states
  if (statusLower.includes('avslutad') || 
      statusLower.includes('arkiverad') ||
      statusLower.includes('inaktiv') ||
      statusLower.includes('inventering')) {
    return 'gray';
  }
  
  // Blue variants - Active/Pending states (default)
  // Pågående, Inväntar betalning, Planerad, Gallring, etc.
  return 'blue';
}