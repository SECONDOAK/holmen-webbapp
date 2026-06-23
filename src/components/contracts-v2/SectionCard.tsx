import type { ReactNode } from 'react';
import { MomsInfoIcon, InfoTooltipIcon, type MomsVariant } from './MomsInfoIcon';

interface SectionCardProps {
  title: string;
  fullWidth?: boolean;
  /**
   * Visar en liten info-ikon bredvid titeln med moms-info som tooltip.
   * Värdet styr texten — välj variant baserat på vad sektionen visar.
   */
  showMomsInfo?: MomsVariant;
  /**
   * Visar en liten info-ikon med valfri text (utöver moms-info). Används
   * för sektioner som behöver förklara vad de visar — t.ex. Kopplade
   * kontrakt.
   */
  titleInfoText?: string;
  /**
   * Valfritt innehåll som placeras längst till höger i titel-bandet —
   * t.ex. en `MomsToggle`. Renderas efter titel och ev. info-ikoner.
   */
  headerRight?: ReactNode;
  children: ReactNode;
}

/**
 * Standard-section-card med grått titel-band överst och vit body under.
 * Används både i ContractDetailsPanel (kontraktsvyn) och i
 * EconomyOverviewPage för konsekvent visuell hierarki.
 */
export default function SectionCard({
  title,
  fullWidth = false,
  showMomsInfo,
  titleInfoText,
  headerRight,
  children,
}: SectionCardProps) {
  return (
    <div
      className={`bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden h-full col-span-2 ${
        fullWidth ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      {/* Grått titel-band — skuggan + bordern runt kortet gör att
          bandet inte längre "läcker" ut i sidans bakgrund, så vi
          återställer den ljusgrå färgen för tydligare intern
          hierarki mellan rubrik och innehåll. */}
      <div className="px-[16px] md:px-[24px] py-[12px] bg-[#f7f7f7] border-b border-[#e4e4e4] flex items-center gap-[8px]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </p>
        {showMomsInfo && <MomsInfoIcon variant={showMomsInfo} />}
        {titleInfoText && <InfoTooltipIcon text={titleInfoText} />}
        {headerRight}
      </div>
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
