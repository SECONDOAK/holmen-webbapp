import { FileSignature } from 'lucide-react';
import EconomyTabBar from '../components/EconomyTabBar';
import { Footer } from '../components/Footer';
import { ActionCard } from '../components/ActionCard';
import MoneyStatCard from '../components/contracts-v2/MoneyStatCard';
import SectionCard from '../components/contracts-v2/SectionCard';
import UtbetalningarOverTidChart from '../components/contracts-v2/UtbetalningarOverTidChart';
import BetalplanChart from '../components/contracts-v2/BetalplanChart';
import BetalplanTable from '../components/contracts-v2/BetalplanTable';
import KostnaderTable from '../components/contracts-v2/KostnaderTable';
import {
  getUtbetaltAvverkningsratter,
  getUtbetaltLeveransvirke,
  getInnestaendeMomsBreakdown,
  getDisponibeltMomsBreakdown,
  getBetalplanData,
  getKontraktForSignering,
  getKostnaderPerÅr,
} from '../data/contractsV2Data';

/**
 * Ekonomiöversikt — sidan en skogsägare landar på i ekonomi-flödet.
 *
 * Strukturen följer kraven 1–8 (krav 9 + 10 skjuts till en framtida iteration):
 *   1+2. Två money-stat-kort med utbetalt per kategori (avverkningsrätter
 *        respektive leveransvirke), splittade i inkl/exkl/moms.
 *   3.   Bar chart över utbetalningar per år med kategori-filter.
 *   4.   Money-stat-kort för totala innestående medel.
 *   5.   Betalplan-block (chart + tabell, 2-kol desktop).
 *   6.   Money-stat-kort för disponibelt belopp.
 *   7.   ActionCard överst om något kontrakt väntar på signering.
 *   8.   Kostnader per år — accordion-tabell.
 */
export default function EconomyOverviewPage() {
  const utbetaltAvverkning = getUtbetaltAvverkningsratter();
  const utbetaltLeveransvirke = getUtbetaltLeveransvirke();
  const innestaende = getInnestaendeMomsBreakdown();
  const disponibelt = getDisponibeltMomsBreakdown();
  const betalplan = getBetalplanData();
  const forSignering = getKontraktForSignering();
  const kostnader = getKostnaderPerÅr();

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          {/* Rubrik */}
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[#021c20] text-nowrap whitespace-pre"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Min ekonomi
          </p>

          <EconomyTabBar activePath="economy" />

          {/* Krav 7: Action-block för kontrakt som väntar på signering.
              Endast om sådana finns — annars utelämnas blocket helt.
              Bredd matchar två stat-kort som på ContractsPageV2. */}
          {forSignering.length > 0 && (
            <div className="w-full md:w-[calc(50%-12px)]">
              <ActionCard
                icon={
                  <FileSignature className="size-6" stroke="#1E3856" strokeWidth={2} />
                }
                iconBackgroundColor="#e4f5f5"
                title={
                  forSignering.length === 1
                    ? 'Nytt kontrakt väntar på signering'
                    : `${forSignering.length} kontrakt väntar på signering`
                }
                tooltipText="Du har fått ett eller flera kontrakt från din virkesköpare som behöver signeras digitalt för att bli giltiga."
                description={
                  <div className="flex flex-col gap-[8px] w-full">
                    {forSignering.slice(0, 3).map((c) => (
                      <p
                        key={c.id}
                        className="font-['IBM_Plex_Sans',sans-serif] text-[15px] text-[#021c20] leading-[1.4]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="font-bold">{c.fastighet}</span>
                        <span className="opacity-70">{` · ${c.arbetsform}`}</span>
                      </p>
                    ))}
                    {forSignering.length > 3 && (
                      <p
                        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-70"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        + {forSignering.length - 3} till
                      </p>
                    )}
                  </div>
                }
                buttons={[
                  {
                    label:
                      forSignering.length === 1
                        ? 'Signera kontrakt'
                        : 'Visa kontrakt',
                    variant: 'primary',
                    onClick: () => {
                      window.dispatchEvent(
                        new CustomEvent('navigate', { detail: { path: 'contracts' } })
                      );
                    },
                  },
                ]}
              />
            </div>
          )}

          {/* Krav 1, 2, 4, 6: Money-stat-kort i en grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] items-stretch w-full">
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Avverkningsrätter"
              belopp={utbetaltAvverkning}
              tooltipText="Summan av alla utbetalningar för kontrakt med arbetsform Slutavverkning, Gallring eller Övrig avverkning."
            />
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Leveransvirke"
              belopp={utbetaltLeveransvirke}
              tooltipText="Summan av alla utbetalningar för kontrakt med arbetsform Leveransvirke."
            />
            <MoneyStatCard
              label="Innestående medel"
              belopp={innestaende}
              tooltipText="Totalt innestående: avsatt för skogsvård + i betalplan + disponibelt belopp."
            />
            <MoneyStatCard
              label="Disponibelt belopp"
              belopp={disponibelt}
              tooltipText="Ej reserverat eller i betalplan — tillgängligt att använda."
            />
          </div>

          {/* Krav 3: Utbetalningar över tid */}
          <div className="w-full">
            <UtbetalningarOverTidChart />
          </div>

          {/* Krav 5: Betalplan — chart + tabell, 2 kol desktop, stack mobil */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-[24px] w-full items-start">
            <SectionCard
              title="Betalplan — ackumulerat per år"
              fullWidth
              titleInfoText="Summan av planerade utbetalningar inom respektive år (inkl moms)."
            >
              <BetalplanChart data={betalplan.ackumuleratPerÅr} />
            </SectionCard>

            <SectionCard
              title="Planerade utbetalningar"
              fullWidth
              showMomsInfo="inkl"
            >
              <BetalplanTable
                rader={betalplan.rader}
                totalNetto={betalplan.totalNetto}
                totalMoms={betalplan.totalMoms}
                totalInkl={betalplan.totalInkl}
              />
            </SectionCard>
          </div>

          {/* Krav 8: Kostnader per år (accordion) */}
          <div className="w-full">
            <SectionCard
              title="Kostnader per år"
              fullWidth
              titleInfoText="Negativa belopp från återrapporterade mätbesked grupperade per år. Klicka för att se detaljraderna."
            >
              <KostnaderTable data={kostnader} />
            </SectionCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
