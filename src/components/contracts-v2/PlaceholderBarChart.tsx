/**
 * Gray placeholder bar chart for the Översikt tab.
 *
 * Uses the same flex-based bar-chart pattern as MapDrawer.tsx, but with all
 * bars rendered in muted greys to signal that this is a placeholder until
 * the real data flow is wired up.
 */

export type PlaceholderOrientation = 'horizontal' | 'vertical';

interface PlaceholderBarChartProps {
  title: string;
  caption?: string;
  /** Data rows. Value is used for relative bar length only (units are placeholder). */
  data: { label: string; value: number }[];
  orientation?: PlaceholderOrientation;
}

const BAR_COLOR = '#e4e4e4';
const BAR_TEXT_COLOR = 'rgba(2,28,32,0.45)';

export default function PlaceholderBarChart({
  title,
  caption = 'Visualisering kommer snart',
  data,
  orientation = 'horizontal',
}: PlaceholderBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white relative w-full shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
      <div
        aria-hidden="true"
        className="absolute border border-[#e4e4e4] border-solid inset-0 pointer-events-none"
      />
      <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] md:p-[24px] relative w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {title}
          </p>
          <p
            className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {caption}
          </p>
        </div>

        {orientation === 'horizontal' ? (
          <div className="content-stretch flex flex-col gap-[8px] w-full">
            {data.map((row) => (
              <div key={row.label} className="content-stretch flex items-center gap-[12px] w-full">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] text-[12px] w-[120px] shrink-0"
                  style={{ color: BAR_TEXT_COLOR, fontVariationSettings: "'wdth' 100" }}
                >
                  {row.label}
                </p>
                <div className="relative flex-1 h-[14px] bg-[#f3f3f5]">
                  <div
                    className="absolute top-0 left-0 h-full"
                    style={{
                      width: `${Math.max(8, (row.value / max) * 100)}%`,
                      backgroundColor: BAR_COLOR,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="content-stretch flex items-end gap-[12px] h-[160px] w-full">
            {data.map((row) => (
              <div key={row.label} className="content-stretch flex flex-col items-center gap-[8px] basis-0 grow">
                <div className="w-full bg-[#f3f3f5] relative h-full flex items-end">
                  <div
                    className="w-full"
                    style={{
                      height: `${Math.max(6, (row.value / max) * 100)}%`,
                      backgroundColor: BAR_COLOR,
                    }}
                  />
                </div>
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] text-[12px]"
                  style={{ color: BAR_TEXT_COLOR, fontVariationSettings: "'wdth' 100" }}
                >
                  {row.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
