import { useMemo, useState } from 'react';
import { FileSignature } from 'lucide-react';
import EconomyTabBar from '../components/EconomyTabBar';
import { Footer } from '../components/Footer';
import { ActionCard } from '../components/ActionCard';
import MoneyStatCard from '../components/contracts-v2/MoneyStatCard';
import PaymentsChart from '../components/contracts-v2/PaymentsChart';
import BetalplanChart from '../components/contracts-v2/BetalplanChart';
import KostnaderChart from '../components/contracts-v2/KostnaderChart';
import InnestaendeMedelBlock from '../components/contracts-v2/InnestaendeMedelBlock';
import DateRangePicker from '../components/contracts-v2/DateRangePicker';
import {
  getUtbetaltAvverkningsratter,
  getUtbetaltLeveransvirke,
  getAvrakningarBreakdown,
  getKontraktForSignering,
  getPaymentsDataDateRange,
} from '../data/contractsV2Data';

/**
 * Ekonomiöversikt — sidan en skogsägare landar på i ekonomi-flödet.
 *
 * En GLOBAL periodväljare överst styr stat-korten och alla grafer.
 * Graferna och detalj-listorna arbetar på ÅRS-nivå (inte månad).
 *
 * Struktur:
 *   - ActionCard om kontrakt väntar på signering
 *   - Periodväljare
 *   - 3 stat-kort: Utbetalt Avverkningsrätter / Utbetalt Leveransvirke /
 *     Avräkningar — alla inom vald period
 *   - Utbetalningar över tid (genomförda, per år)
 *   - Betalplan (kommande planerade utbetalningar, per år)
 *   - Innestående medel (saldo, ej period) — fördelning med pie
 *   - Avräkningar över tid (per år)
 *
 * SortimentChart (intäkter per sortiment) är tillsvidare bortplockad —
 * oklart om den ska vara med.
 */
export default function EconomyOverviewPage() {
  // Global period — default: hela datasetets spann.
  const dataRange = useMemo(() => getPaymentsDataDateRange(), []);
  const [startDate, setStartDate] = useState(dataRange.min);
  const [endDate, setEndDate] = useState(dataRange.max);

  const utbetaltAvverkning = useMemo(
    () => getUtbetaltAvverkningsratter({ startDate, endDate }),
    [startDate, endDate]
  );
  const utbetaltLeveransvirke = useMemo(
    () => getUtbetaltLeveransvirke({ startDate, endDate }),
    [startDate, endDate]
  );
  const avrakningar = useMemo(
    () => getAvrakningarBreakdown({ startDate, endDate }),
    [startDate, endDate]
  );
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

          {/* Global periodväljare — styr utbetalt-korten och alla charts.
              Saldo-korten (Innestående + Disponibelt) är nuläge och
              påverkas inte. */}
          <div className="w-full md:max-w-[340px]">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
              bounds={dataRange}
            />
          </div>

          {/* Stat-kort: utbetalt per kategori + avrakningar — alla styrda
              av vald period, momsMode='utbetalt' (inkl moms som huvudvarde,
              breakdown Moms + Exklusive moms). */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[24px] items-stretch w-full">
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Avverkningsrätter"
              belopp={utbetaltAvverkning}
              momsMode="utbetalt"
              tooltipText="Summan av utbetalningar inom vald period för kontrakt med arbetsform Slutavverkning, Gallring eller Övrig avverkning. Inkl moms."
            />
            <MoneyStatCard
              label="Totalt utbetalt"
              subLabel="Leveransvirke"
              belopp={utbetaltLeveransvirke}
              momsMode="utbetalt"
              tooltipText="Summan av utbetalningar inom vald period för kontrakt med arbetsform Leveransvirke. Inkl moms."
            />
            <MoneyStatCard
              label="Avräkningar"
              belopp={avrakningar}
              momsMode="utbetalt"
              tooltipText="Kostnader som räknats av från intäkterna i dina kontrakt inom vald period, t.ex. mätningsavgifter och vägunderhåll. Inkl moms."
            />
          </div>

          {/* Utbetalningar + Betalplan sida vid sida pa desktop sa man
              ser genomfort och kommande samtidigt. Stackas pa mindre
              skarmar. Wrapper-divs kravs eftersom SectionCard har egna
              col-span-klasser som annars skulle sla igenom i griden. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-[24px] items-start w-full">
            <div className="min-w-0">
              <PaymentsChart startDate={startDate} endDate={endDate} />
            </div>
            <div className="min-w-0">
              <BetalplanChart startDate={startDate} endDate={endDate} />
            </div>
          </div>

          {/* Innestaende medel — saldo med fordelnings-pie (ej period) */}
          <div className="w-full">
            <InnestaendeMedelBlock />
          </div>

          {/* Avrakningar over tid (per ar) */}
          <div className="w-full">
            <KostnaderChart startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
