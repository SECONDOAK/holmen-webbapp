import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import StatusBadge from '../components/StatusBadge';
import ContractDetailsPanel from '../components/contracts-v2/ContractDetailsPanel';
import {
  contractsV2Data,
  statusLabel,
  type ContractStatusV2,
} from '../data/contractsV2Data';

interface ContractDetailPageProps {
  contractId: string;
  onBack: () => void;
}

const statusVariant: Record<ContractStatusV2, 'info' | 'warning'> = {
  signerad: 'info',
  'för-signering': 'warning',
};

/**
 * Dedikerad sida för ett enskilt kontrakt — alternativ till
 * inline-expansionen i Kontrakt-vyn. Återanvänder
 * `ContractDetailsPanel` för själva innehållet så båda mönstren
 * visar exakt samma data och layout — det enda som skiljer är
 * sidchromen (titelrad + tillbaka-knapp + statusrad).
 */
export default function ContractDetailPage({ contractId, onBack }: ContractDetailPageProps) {
  const contract = contractsV2Data.find((c) => c.id === contractId);

  const handleNavigateToContract = (id: string) => {
    window.dispatchEvent(new CustomEvent('openContract', { detail: id }));
  };

  if (!contract) {
    return (
      <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
        <div className="flex-1">
          <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] w-full max-w-[1800px] mx-auto">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-[8px] font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] hover:opacity-80 transition-opacity"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <ArrowLeft className="size-[16px]" strokeWidth={2} />
              Tillbaka till kontrakt
            </button>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Kontraktet kunde inte hittas.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          {/* Tillbaka-knapp — den enda navigationen vi behöver här
              eftersom vi är inne i ett specifikt kontrakts kontext. */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-[8px] font-['IBM_Plex_Sans',sans-serif] font-semibold text-[14px] text-[#1e3856] hover:opacity-80 transition-opacity"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <ArrowLeft className="size-[16px]" strokeWidth={2} />
            Tillbaka till kontrakt
          </button>

          {/* Kontraktshuvud — kontraktsnummer + status + meta. Ingen
              "Min ekonomi"-rubrik eller tab-bar här; vi är inne i
              kontraktets kontext och de skulle bara skapa visuell
              ledtråd som inte längre stämmer. */}
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-wrap items-center gap-[12px]">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[28px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Kontrakt {contract.kontraktsnummer}
              </p>
              <StatusBadge
                label={statusLabel[contract.status]}
                variant={statusVariant[contract.status]}
              />
            </div>
            <p
              className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {contract.uppdragstyp} · {contract.arbetsform} · {contract.fastighet} · {contract.år}
            </p>
          </div>

          {/* Sektioner direkt på sidans bakgrund — utan extra grå-ram
              eftersom sidan själv redan ger ramarna. Återanvänder
              `ContractDetailsPanel` i embedded-läge så samma layout
              används som i inline-expansionen. */}
          <div className="w-full">
            <ContractDetailsPanel
              contract={contract}
              onNavigateToContract={handleNavigateToContract}
              embedded
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
