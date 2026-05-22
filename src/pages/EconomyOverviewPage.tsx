import StatCard from '../components/StatCard';
import EconomyTabBar from '../components/EconomyTabBar';
import PlaceholderBarChart from '../components/contracts-v2/PlaceholderBarChart';
import { Footer } from '../components/Footer';
import { aggregateContractsV2, formatSEK, contractsV2Data } from '../data/contractsV2Data';

export default function EconomyOverviewPage() {
  const agg = aggregateContractsV2();

  // Placeholder data — exact values don't matter, we just want bars in different lengths.
  const utbetalningarPerÅr = [
    { label: '2022', value: 320 },
    { label: '2023', value: 192 },
    { label: '2024', value: 552 },
    { label: '2025', value: 969 },
  ];

  const innestaendeÖverTid = [
    { label: 'Q1', value: 280 },
    { label: 'Q2', value: 220 },
    { label: 'Q3', value: 195 },
    { label: 'Q4', value: 162 },
  ];

  const fördelningArbetsform = [
    { label: 'Skörd', value: 64 },
    { label: 'Gallring', value: 28 },
    { label: 'Markberedning', value: 12 },
    { label: 'Plantering', value: 9 },
    { label: 'Röjning', value: 6 },
    { label: 'Inköp av plantor', value: 3 },
  ];

  return (
    <div className="basis-0 grow bg-[#f7f7f7] h-full min-h-px min-w-px overflow-auto relative shrink-0 flex flex-col">
      <div className="flex-1">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[16px] md:px-[24px] lg:px-[40px] xl:px-[64px] py-[24px] md:py-[40px] relative w-full max-w-[1800px] mx-auto">
          <p
            className="font-['IBM_Plex_Sans',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-[#021c20] text-nowrap whitespace-pre"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Min ekonomi
          </p>

          <EconomyTabBar activePath="economy" />

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[24px] items-start w-full">
            <StatCard
              label="Totalt utbetalt"
              value={formatSEK(agg.totalUtbetalt)}
              tooltipText="Summa av alla utbetalda medel över dina kontrakt (din andel)."
            />
            <StatCard
              label="Innestående medel"
              value={formatSEK(agg.totalInnestaende)}
              tooltipText="Totalt innestående medel: avsatt för skogsvård + i betalplan + fria medel."
            />
            <StatCard
              label="Fria medel"
              value={formatSEK(agg.totalInnestaendeFria)}
              tooltipText="Innestående medel som varken är avsatta för skogsvård eller ingår i en betalplan."
            />
            <StatCard
              label="Antal kontrakt"
              value={String(contractsV2Data.length)}
              tooltipText="Totalt antal kontrakt — avslutade, signerade och för signering."
            />
          </div>

          {/* Placeholder graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px] w-full">
            <PlaceholderBarChart
              title="Utbetalningar per år"
              data={utbetalningarPerÅr}
              orientation="vertical"
            />
            <PlaceholderBarChart
              title="Innestående medel över tid"
              data={innestaendeÖverTid}
              orientation="vertical"
            />
            <div className="md:col-span-2">
              <PlaceholderBarChart
                title="Fördelning per arbetsform"
                data={fördelningArbetsform}
                orientation="horizontal"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
