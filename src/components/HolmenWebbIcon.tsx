/**
 * Holmen Webbikoner — IcoMoon-genererade ikoner från
 * `assets/Holmen Icons/Holmen_Ikoner_Webb/SVG`.
 *
 * Originalet är 32×32. Vi exponerar samma API som `HolmenIcon`
 * (name + size + color) men låter ikoner med inbyggda färger
 * (t.ex. `arrow-blue.svg` har `fill="#0f6bb6"`) behålla dem
 * såvida inte `color` explicit anges.
 */

const icons = import.meta.glob(
  '../assets/Holmen Icons/Holmen_Ikoner_Webb/SVG/*.svg',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;

const iconMap: Record<string, string> = {};
for (const [path, raw] of Object.entries(icons)) {
  const match = path.match(/\/([^/]+)\.svg$/);
  if (!match) continue;
  // Strip the outer <svg> wrapper and any IcoMoon comment so we can
  // re-wrap it with our own width/height/viewBox.
  const inner = raw
    .replace(/<\?xml[^?]*\?>\s*/g, '')
    .replace(/<!--[\s\S]*?-->\s*/g, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');
  iconMap[match[1]] = inner.trim();
}

export const holmenWebbIconNames = Object.keys(iconMap).sort();

interface HolmenWebbIconProps {
  name: string;
  /** Pixel-storlek på den renderade ikonen (default 24). */
  size?: number;
  className?: string;
  /**
   * Om angiven: tvinga alla `fill`-attribut till denna färg.
   * Annars behåller ikoner som har inbyggd färg (t.ex. blå pilar)
   * sin originalfärg och monokroma ikoner ärver `currentColor`.
   */
  color?: string;
}

export function HolmenWebbIcon({
  name,
  size = 24,
  className = '',
  color,
}: HolmenWebbIconProps) {
  const inner = iconMap[name];
  if (!inner) return null;

  // Om en färg är vald: tvätta bort alla explicita fill-värden så
  // hela ikonen blir enfärgad. Annars: lämna SVG:n orörd.
  const processed = color
    ? inner.replace(/\s*fill="[^"]*"/g, '').replace(/fill="none"/g, 'fill="none"')
    : inner;

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      style={color ? { color, fill: color } : undefined}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
