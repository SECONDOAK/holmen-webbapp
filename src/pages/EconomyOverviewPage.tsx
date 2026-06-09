import { FileSignature } from 'lucide-react';
import EconomyTabBar from '../components/EconomyTabBar';
import { Footer } from '../components/Footer';
import { ActionCard } from '../components/ActionCard';
import MoneyStatCard from '../components/contracts-v2/MoneyStatCard';
import PaymentsChart from '../components/contracts-v2/PaymentsChart';
import KostnaderChart from '../components/contracts-v2/KostnaderChart';
import SortimentChart from '../components/contracts-v2/SortimentChart';
import {
  getUtbetaltAvverkningsratter,
  getUtbetaltLeveransvirke,
  getInnestaendeMomsBreakdown,
  getDisponibeltMomsBreakdown,
  getKontraktForSignering,
} from '../data/contractsV2Data';

/**
 * Ekonomiöversikt — sidan en skogsägare landar på i ekonomi-flödet.
 *
 * Strukturen följer kraven 1–8 (krav 9 + 10 skjuts till en framtida iteration):
 *   1+2. Money-stat-kort: utbetalt per kategori (avverkningsrätter
 *        respektive leveransvirke), inkl moms som huvudvärde med tydlig
 *        "INKL MOMS"-badge.
 *   4.   Money-stat-kort: innestående medel, netto (inte utbetalt ännu).
 *   6.   Money-stat-kort: disponibelt belopp, netto.
 *   3+5. PaymentsChart — kombinerar utbetalda + planerade utbetalningar
 *        som månads-bucketed staplar (utbetalt = solid färg, planerad =
 *        ljusare färg). Datumväljare för intervall, kategori-filter.
 *   8.   KostnaderChart — kostnader över tid med datumväljare per månad.
 *   7.   ActionCard överst om något kontrakt väntar på signering.
 */
export default function EconomyOverviewPage() {
  const utbetaltAvverkning = getUtbetaltAvverkningsratter();
  const utbetaltLeveransvirke = getUtbetaltLeveransvirke();
  const innestaende = getInnestaendeMomsBreakdown();
  const disponibelt = getDisponibeltMomsBreakdown();
  const forSignering = getKontraktForSignering();

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

          {/* Krav 1, 2, 4, 6: Money-stat-kort i en grid.
              Utbetalt-korten kor momsMode='utbetalt' (inkl moms som huvudvarde
              + "INKL MOMS"-badge); Innestaende + Disponibelt kor 'simple'
              (netto-belopp med "EXKL MOMS"-badge, ingen moms-split). */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] items-stretch w-full">
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Avverkningsrätter"
              belopp={utbetaltAvverkning}
              momsMode="utbetalt"
              tooltipText="Summan av alla utbetalningar för kontrakt med arbetsform Slutavverkning, Gallring eller Övrig avverkning. Inkl moms."
            />
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Leveransvirke"
              belopp={utbetaltLeveransvirke}
              momsMode="utbetalt"
              tooltipText="Summan av alla utbetalningar för kontrakt med arbetsform Leveransvirke. Inkl moms."
            />
            <MoneyStatCard
              label="Innestående medel"
              belopp={innestaende}
              momsMode="simple"
              tooltipText="Totalt innestående exkl moms: avsatt för skogsvård + i betalplan + disponibelt belopp. Moms tillkommer vid utbetalning."
            />
            <MoneyStatCard
              label="Disponibelt belopp"
              belopp={disponibelt}
              momsMode="simple"
              tooltipText="Ej reserverat eller i betalplan. Exkl moms."
            />
          </div>

          {/* Krav 3 + 5: Kombinerad utbetalt + planerad i en chart */}
          <div className="w-full">
            <PaymentsChart />
          </div>

          {/* Krav 8: Kostnader over tid (manads-bucketed med datum-range) */}
          <div className="w-full">
            <KostnaderChart />
          </div>

          {/* Krav 10: Intakter per sortiment (pie chart + legend-tabell) */}
          <div className="w-full">
            <SortimentChart />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
