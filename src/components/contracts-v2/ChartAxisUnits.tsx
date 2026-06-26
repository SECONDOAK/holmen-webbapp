import type { ReactNode } from 'react';

/**
 * Lägger en enhets-rubrik ("Kkr") överst vid y-axeln och en ("År") längst
 * ut till höger vid x-axeln, ovanpå ett recharts-diagram. Enheten anges
 * alltså EN gång som rubrik istället för att upprepas på varje tick —
 * genomgående för alla ekonomi-grafer (vi blandar aldrig Mkr och Kkr).
 *
 * Wrappar select diagrammet; barnen (ResponsiveContainer) fyller ytan.
 */
export default function ChartAxisUnits({ children }: { children: ReactNode }) {
  const unitCls =
    "absolute z-10 font-['IBM_Plex_Sans',sans-serif] text-[11px] text-[#021c20] opacity-60 pointer-events-none";
  return (
    <div className="relative w-full h-full">
      <span
        className={`${unitCls} top-0 left-0`}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Kkr
      </span>
      {children}
      <span
        className={`${unitCls} bottom-0 right-0`}
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        År
      </span>
    </div>
  );
}
