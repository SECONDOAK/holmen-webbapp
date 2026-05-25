import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import AtgardListItem from './AtgardListItem';
import DokumentListItem from './DokumentListItem';
import InnestaendeMedelCard from './InnestaendeMedelCard';
import BetalplanList from './BetalplanList';
import UtbetalningarTable from './UtbetalningarTable';
import ÅterrapporteringTable from './ÅterrapporteringTable';
import { formatAmount, minAndelTotalt } from '../../data/contractsV2Data';
import type { KontraktV2 } from '../../data/contractsV2Data';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ContractDetailsPanelProps {
  contract: KontraktV2;
}

interface SectionCardProps {
  title: string;
  fullWidth?: boolean;
  children: ReactNode;
}

function SectionCard({ title, fullWidth = false, children }: SectionCardProps) {
  return (
    <div
      className={`bg-white border border-[#e4e4e4] flex flex-col overflow-hidden ${
        fullWidth ? 'md:col-span-2' : ''
      }`}
    >
      <div className="px-[16px] py-[10px] bg-[#f7f7f7] border-b border-[#e4e4e4]">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-80"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {title}
        </p>
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
    <div className="bg-white border border-[#e4e4e4] p-[16px] flex flex-col gap-[8px]">
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
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[20px] text-[#021c20]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function ContractDetailsPanel({ contract }: ContractDetailsPanelProps) {
  const minAndel = minAndelTotalt(contract);
  const isKostnad = contract.flöde === 'kostnad';
  const headerLabel = isKostnad ? 'Kontraktskostnad' : 'Kontraktsvärde';
  const headerTooltip = isKostnad
    ? 'Kontraktets totala kostnad inklusive alla delägare.'
    : 'Kontraktets totala värde inklusive alla delägare.';
  const andelTooltip = `Din andel av kontraktet (${contract.andel}) baserat på din ägarandel.`;

  const utbetalningarTitle = isKostnad ? 'Genomförda betalningar' : 'Utbetalda medel';
  const betalplanTitle = isKostnad
    ? 'Betalplan (kommande betalningar)'
    : 'Betalplan (planerade utbetalningar)';

  return (
    <div className="bg-[#ededed] border-t border-[#e4e4e4] px-[16px] md:px-[24px] py-[24px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {/* Kontraktsvärde / Kontraktskostnad (column 1) */}
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

        {/* Avräkning — full bredd, bara på kontrakt där inmätningar faktiskt
            rapporterats (avverkningsrätt / leveransvirke). */}
        {contract.återrapportering && contract.återrapportering.length > 0 && (
          <SectionCard title="Avräkning" fullWidth>
            <ÅterrapporteringTable poster={contract.återrapportering} />
          </SectionCard>
        )}

        {/* Innestående medel — full bredd */}
        <SectionCard title="Innestående medel" fullWidth>
          <div className="p-[16px]">
            <InnestaendeMedelCard innestaende={contract.innestaendeMedel} />
          </div>
        </SectionCard>

        {/* Betalplan — endast för intäktskontrakt; kostnader täcks av avsatta
            medel eller faktureras separat och har därför ingen betalplan. */}
        {!isKostnad && (
          <SectionCard title={betalplanTitle}>
            <BetalplanList betalplan={contract.betalplan} flöde={contract.flöde} />
          </SectionCard>
        )}

        {/* Utbetalda medel / Genomförda betalningar — full bredd på kostnadskontrakt
            eftersom betalplan-sektionen är dold där. */}
        <SectionCard title={utbetalningarTitle} fullWidth={isKostnad}>
          <UtbetalningarTable
            utbetalningar={contract.utbetalningar}
            kontraktsnummer={contract.kontraktsnummer}
            flöde={contract.flöde}
          />
        </SectionCard>
      </div>
    </div>
  );
}
