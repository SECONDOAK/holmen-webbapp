const icons = import.meta.glob(
  '../assets/Holmen Icons/Holmen_Ikoner_MediaBank/SVG/Holmen_Ikoner_RGB_24px_Pos_*.svg',
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

// Build a map: name -> svg content (paths only)
const iconMap: Record<string, string> = {};
for (const [path, raw] of Object.entries(icons)) {
  const match = path.match(/Pos_(.+)\.svg$/);
  if (match) {
    // Extract just the path/shape elements, strip outer SVG and defs
    const inner = raw
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '')
      .replace(/<defs>.*?<\/defs>/s, '');
    iconMap[match[1]] = inner;
  }
}

export const holmenIconNames = Object.keys(iconMap).sort();

interface HolmenIconProps {
  name: string;
  /** Size in pixels — visually matches Lucide icons at the same size */
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Renders a Holmen icon at the given size.
 * Uses a cropped viewBox (4 4 16 16) to remove the internal padding
 * in the original 24x24 SVGs, making them visually match Lucide icons.
 */
export function HolmenIcon({ name, size = 24, className = '', color }: HolmenIconProps) {
  const inner = iconMap[name];
  if (!inner) return null;

  const fill = color || 'currentColor';

  return (
    <svg
      viewBox="2 2 20 20"
      width={size}
      height={size}
      className={className}
      dangerouslySetInnerHTML={{
        __html: inner
          .replace(/fill="#1e3856"/g, `fill="${fill}"`)
          .replace(/fill:#1e3856/g, `fill:${fill}`)
          .replace(/class="cls-1"/g, `fill="${fill}"`)
      }}
    />
  );
}
