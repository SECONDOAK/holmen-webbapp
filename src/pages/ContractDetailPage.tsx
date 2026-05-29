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
 * Fält i meta-boxen ovanför sektionerna. Uppercase-label i 12px med
 * tracking, värdet under i 16px medium — matchar stilen pa stat-
 * korten sa hela detalsidan kanns visuellt sammanhangande.
 */
function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[6px] min-w-0">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </p>
      <p
        className="font-['IBM_Plex_Sans',sans-serif] font-medium text-[16px] text-[#021c20] truncate"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {value}
      </p>
    </div>
  );
}

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
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                onClick={onBack}
                aria-label="Tillbaka till kontrakt"
                title="Tillbaka till kontrakt"
                className="inline-flex items-center justify-center size-[40px] -ml-[8px] hover:bg-black/5 transition-colors shrink-0"
              >
                <ArrowLeft className="size-[22px] text-[#021c20]" strokeWidth={2} />
              </button>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[16px] text-[#021c20] opacity-70"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Kontraktet kunde inte hittas.
              </p>
            </div>
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
          {/* Kontraktshuvud — tillbaka-pil till vänster om
              kontraktsnumret, så hela toppen blir en tight enhet
              istället för två separata rader. */}
          <div className="flex items-center gap-[12px] w-full">
            <button
              type="button"
              onClick={onBack}
              aria-label="Tillbaka till kontrakt"
              title="Tillbaka till kontrakt"
              className="inline-flex items-center justify-center size-[40px] -ml-[8px] hover:bg-black/5 transition-colors shrink-0"
            >
              <ArrowLeft className="size-[22px] text-[#021c20]" strokeWidth={2} />
            </button>
            <div className="flex flex-wrap items-center gap-[12px] min-w-0">
              <p
                className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] text-[22px] text-[#021c20]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Kontrakt {contract.kontraktsnummer}
              </p>
              <StatusBadge
                label={statusLabel[contract.status]}
                variant={statusVariant[contract.status]}
              />
            </div>
          </div>

          {/* Meta-box — kontraktets identifierande egenskaper
              presenterade som en 3-fälts-grid med uppercase-labels
              ovanför värdena. Matchar stilen pa stat-korten i
              kontrakts-oversikten. Stackar 2-och-1 pa mobil. */}
          <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[20px] md:gap-[32px] p-[20px] md:p-[24px]">
              <MetaField label="Åtgärd" value={contract.arbetsform} />
              <MetaField label="Fastighet" value={contract.fastighet} />
              <MetaField label="Datum" value={contract.kontraktsdatum} />
            </div>
          </div>

          {/* Sektioner direkt på sidans bakgrund — utan extra grå-ram
              eftersom sidan själv redan ger ramarna. Lyft-animation
              bara här, inte på rubriken ovanför — toppen ska kannas
              statisk så bara sektionsblocken "fyller på". */}
          <div className="w-full animate-page-enter">
            <ContractDetailsPanel
              contract={contract}
              onNavigateToContract={handleNavigateToContract}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
