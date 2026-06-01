import type { ReactNode } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import AtgardListItem from './AtgardListItem';
import DokumentListItem from './DokumentListItem';
import InnestaendeMedelCard from './InnestaendeMedelCard';
import BetalplanList from './BetalplanList';
import UtbetalningarTable from './UtbetalningarTable';
import ÅterrapporteringTable from './ÅterrapporteringTable';
import {
  formatAmount,
  getLinkedContracts,
  innestaendeTotalt,
  minAndelTotalt,
  statusLabel,
} from '../../data/contractsV2Data';
import type { KontraktV2 } from '../../data/contractsV2Data';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ContractDetailsPanelProps {
  contract: KontraktV2;
  onNavigateToContract?: (id: string) => void;
}

interface SectionCardProps {
  title: string;
  fullWidth?: boolean;
  /**
   * Sätt till `true` för att visa en liten info-ikon bredvid titeln
   * som via en tooltip förklarar att beloppen visas inklusive moms.
   * Används på sektioner som visar monetära belopp.
   */
  showMomsInfo?: boolean;
  children: ReactNode;
}

/**
 * Liten "Belopp visas inklusive moms"-ikon. Återanvänds på alla
 * sektioner som visar summor på kontraktsdetalsidan så användaren
 * vet att talen är inklusive moms.
 */
function MomsInfoIcon() {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Information om moms"
        >
          <Info className="size-[14px] text-[#021c20]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="max-w-[220px] z-[9999] text-center">
        Belopp visas inklusive moms.
      </TooltipContent>
    </Tooltip>
  );
}

function SectionCard({ title, fullWidth = false, showMomsInfo = false, children }: SectionCardProps) {
  return (
    <div
      className={`bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden col-span-2 ${
        fullWidth ? 'md:col-span-2' : 'md:col-span-1'
      }`}
    >
      {/* Grått titel-band — skuggan + bordern runt kortet gör att
          bandet inte längre "läcker" ut i sidans bakgrund, så vi
          återställer den ljusgrå färgen för tydligare intern
          hierarki mellan rubrik och innehåll. */}
      <div className="px-[16px] py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4] flex items-center gap-[6px]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </p>
        {showMomsInfo && <MomsInfoIcon />}
      </div>
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}

/**
 * Header-card för Kontraktsvärde / Din andel.
 * Vitt block med uppercase-rubrik + info-tooltip överst, värdet under.
 */
function HeaderCard({
  label,
  value,
  tooltipText,
}: {
  label: string;
  value: string;
  tooltipText: string;
}) {
  return (
    <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] p-[16px] flex flex-col gap-[8px]">
      <div className="flex items-center gap-[4px]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {label}
        </p>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center shrink-0"
              aria-label={`Info om ${label}`}
            >
              <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="center" className="max-w-[280px] z-[9999] text-center">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </div>
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[17px] md:text-[20px] text-[#021c20]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Klickbar rad som visar ett länkat kontrakt — matchar samma stil
 * som DokumentListItem (px-16 py-12, två-rads-meta, chevron till höger,
 * border-b mellan rader).
 *
 * `avsattForSkogsvard` visas som en extra rad när det aktuella
 * kontraktet är ett skogsvårdskontrakt och föräldra-avverkningen
 * har medel avsatta för skogsvård — de medlen är vad som finansierar
 * det aktuella arbetet.
 */
function LinkedContractLink({
  contract,
  onClick,
  avsattForSkogsvard,
}: {
  contract: KontraktV2;
  onClick?: (id: string) => void;
  avsattForSkogsvard?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick ? () => onClick(contract.id) : undefined}
      disabled={!onClick}
      className="content-stretch flex items-center justify-between gap-[12px] px-[16px] py-[12px] border-b border-[#e4e4e4] last:border-b-0 hover:bg-[#f7f7f7] transition-colors cursor-pointer disabled:cursor-default disabled:hover:bg-transparent"
    >
      {/* Mobil: stacka vertikalt. Desktop: en horisontell rad där
          meta-texten flexar och tar upp överflödig bredd, så avsatta-
          medel-raden trycks ut åt höger nära chevronen istället för
          att hänga som en lös rad under. */}
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-[12px] gap-[2px] min-w-0 flex-1 text-left">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#021c20] truncate md:shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.kontraktsnummer}
        </p>
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70 truncate md:shrink-0"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {contract.uppdragstyp} · {contract.arbetsform} · {statusLabel[contract.status]}
        </p>
        {avsattForSkogsvard !== undefined && avsattForSkogsvard > 0 && (
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] truncate md:shrink-0 mt-[2px] md:mt-0"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {avsattForSkogsvard.toLocaleString('sv-SE').replace(/,/g, ' ')} kr avsatta för skogsvård
          </p>
        )}
      </div>
      {onClick && (
        <ArrowRight className="size-[18px] text-[#1e3856] shrink-0" strokeWidth={2} />
      )}
    </button>
  );
}

export default function ContractDetailsPanel({
  contract,
  onNavigateToContract,
}: ContractDetailsPanelProps) {
  const minAndel = minAndelTotalt(contract);
  const isKostnad = contract.flöde === 'kostnad';
  // "Totalt utfall" visas när det finns återrapporterad data (mätbesked /
  // utförda arbeten), dvs när kontraktet faktiskt har ett uppmätt utfall.
  // Annars visas det estimerade kontraktsvärdet/-kostnaden.
  const hasUtfall = (contract.återrapportering?.length ?? 0) > 0;
  const headerLabel = hasUtfall
    ? 'Totalt utfall'
    : isKostnad
      ? 'Kontraktskostnad'
      : 'Kontraktsvärde';
  const headerTooltip = hasUtfall
    ? 'Det faktiska utfallet av kontraktet baserat på återrapporterad data (inklusive alla delägare). Belopp visas inklusive moms.'
    : isKostnad
      ? 'Kontraktets totala kostnad inklusive alla delägare. Belopp visas inklusive moms.'
      : 'Kontraktets totala värde inklusive alla delägare. Belopp visas inklusive moms.';
  const andelTooltip = `Din andel av kontraktet (${contract.andel}) baserat på din ägarandel. Belopp visas inklusive moms.`;

  const utbetalningarTitle = isKostnad ? 'Genomförda betalningar' : 'Utbetalda medel';
  const betalplanTitle = isKostnad
    ? 'Betalplan (kommande betalningar)'
    : 'Betalplan (planerade utbetalningar)';

  const { parent, children } = getLinkedContracts(contract);
  const hasLinkages = !!parent || children.length > 0;

  return (
    <div className="grid grid-cols-2 gap-[12px] md:gap-[16px]">
      {/* Kontraktsvärde / Kontraktskostnad / Totalt utfall (column 1) */}
        <HeaderCard
          label={headerLabel}
          value={formatAmount(contract.kontraktsTotalt, contract.flöde)}
          tooltipText={headerTooltip}
        />

        {/* Din andel (column 2) */}
        <HeaderCard
          label={`Din andel (${contract.andel})`}
          value={formatAmount(minAndel, contract.flöde)}
          tooltipText={andelTooltip}
        />

        {/* Kopplade kontrakt — placeras direkt under värdekorten som
            full bredd, i samma SectionCard-stil som övriga sektioner.
            Samma rubrik oavsett om det är moder­kontraktet eller
            uppföljnings­kontrakt som listas. */}
        {hasLinkages && (
          <SectionCard title="Kopplade kontrakt" fullWidth>
            <div className="flex flex-col">
              {parent && (
                <LinkedContractLink
                  contract={parent}
                  onClick={onNavigateToContract}
                  // Visa avsatta-skogsvårdsmedel på föräldra-avverkningen
                  // när det aktuella kontraktet är skogsvård — det är de
                  // medlen som finansierar skogsvårdsarbetet.
                  avsattForSkogsvard={
                    isKostnad ? parent.innestaendeMedel.avsattSkogsvård : undefined
                  }
                />
              )}
              {children.map((c) => (
                <LinkedContractLink key={c.id} contract={c} onClick={onNavigateToContract} />
              ))}
            </div>
          </SectionCard>
        )}
        {/* Åtgärder */}
        <SectionCard title="Åtgärder">
          {contract.åtgärder.length > 0 ? (
            <div className="flex flex-col">
              {contract.åtgärder.map((å) => (
                <AtgardListItem key={å.id} åtgärd={å} />
              ))}
            </div>
          ) : (
            <p
              className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Inga åtgärder kopplade.
            </p>
          )}
        </SectionCard>

        {/* Dokument */}
        <SectionCard title="Dokument">
          {contract.dokument.length > 0 ? (
            <div className="flex flex-col">
              {contract.dokument.map((d) => (
                <DokumentListItem key={d.id} dokument={d} />
              ))}
            </div>
          ) : (
            <p
              className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Inga dokument kopplade.
            </p>
          )}
        </SectionCard>

        {/* Avräkning / Kostnader — full bredd.
            - "Avräkning" när det finns sortimentsdata (avverkningsrätt /
              leveransvirke) eller en blandning av intäkter + kostnader.
            - "Kostnader" när det BARA finns kostnader (rena skogsvårds-
              kontrakt), eftersom tabellen då bara visar en kostnadsrad. */}
        {contract.återrapportering && contract.återrapportering.length > 0 && (() => {
          const hasInmätningar = contract.återrapportering.some(
            (p) => p.belopp >= 0 && (p.volymM3f !== undefined || p.volymMto !== undefined),
          );
          const hasÖvrigaIntäkter = contract.återrapportering.some(
            (p) => p.belopp >= 0 && p.volymM3f === undefined && p.volymMto === undefined,
          );
          const sectionTitle =
            hasInmätningar || hasÖvrigaIntäkter ? 'Avräkning' : 'Kostnader';
          return (
            <SectionCard title={sectionTitle} fullWidth showMomsInfo>
              <ÅterrapporteringTable poster={contract.återrapportering} />
            </SectionCard>
          );
        })()}

        {/* Innestående medel — visas bara om kontraktet faktiskt har
            något innestående att redovisa. Skogsvårdskontrakt (kostnad)
            har per definition inget innestående, och då skulle rutan
            bara visa nollor utan att tillföra något. */}
        {innestaendeTotalt(contract) > 0 && (
          <SectionCard title="Innestående medel" fullWidth showMomsInfo>
            <div className="p-[16px]">
              <InnestaendeMedelCard innestaende={contract.innestaendeMedel} />
            </div>
          </SectionCard>
        )}

        {/* Betalplan — endast för intäktskontrakt; kostnader täcks av avsatta
            medel eller faktureras separat och har därför ingen betalplan. */}
        {!isKostnad && (
          <SectionCard title={betalplanTitle} showMomsInfo>
            <BetalplanList betalplan={contract.betalplan} flöde={contract.flöde} />
          </SectionCard>
        )}

        {/* Utbetalda medel — visas BARA på intäktskontrakt. Kostnads­kontrakt
            visar istället sin avräkning ovan (med kostnader-sektionen) och
            behöver ingen separat "Genomförda betalningar"-tabell. */}
        {!isKostnad && (
          <SectionCard title={utbetalningarTitle} showMomsInfo>
            <UtbetalningarTable
              utbetalningar={contract.utbetalningar}
              kontraktsnummer={contract.kontraktsnummer}
              flöde={contract.flöde}
            />
          </SectionCard>
        )}
    </div>
  );
}
