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

          {/* Meta-box — kontraktets identifierande egenskaper i en
              inline-rad. Åtgärd + Fastighet vänster (det viktiga
              "vad/var"), datum till höger som sekundär kontext.
              Stackar vertikalt på mobil. */}
          <div className="bg-white border border-[#e4e4e4] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[12px] md:gap-[16px] px-[20px] md:px-[24px] py-[18px]">
              <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[4px] min-w-0">
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20] truncate"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {contract.fastighet}
                </p>
                <span
                  className="hidden sm:inline-block w-px h-[18px] bg-[#021c20] opacity-20 shrink-0"
                  aria-hidden
                />
                <p
                  className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[16px] text-[#021c20] truncate"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {contract.arbetsform}
                </p>
              </div>
              <p
                className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60 shrink-0"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Tecknat {contract.kontraktsdatum}
              </p>
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
