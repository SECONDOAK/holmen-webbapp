import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatSEK } from '../../data/contractsV2Data';

interface BetalplanChartProps {
  data: { year: string; belopp: number }[];
}

const COLOR_PRIMARY = '#1E3856';

function formatTick(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')} Mkr`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${Math.round(value / 1_000)} kkr`;
  }
  return String(value);
}

/**
 * Krav 5 (chart-delen): Vertikalt stapeldiagram som visar ackumulerad
 * planerad utbetalning per år. Använder samma färgskala som
 * UtbetalningarOverTidChart för konsekvent visuell rytm.
 */
export default function BetalplanChart({ data }: BetalplanChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[240px] md:h-[280px] w-full flex items-center justify-center">
        <p
          className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Inga planerade utbetalningar.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[240px] md:h-[280px] w-full p-[8px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#e4e4e4" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="#021c20"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: '#e4e4e4' }}
          />
          <YAxis
            stroke="#021c20"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatTick}
            width={70}
          />
          <Tooltip
            cursor={{ fill: '#f0f4f0' }}
            contentStyle={{
              border: '1px solid #e4e4e4',
              borderRadius: 0,
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontSize: 13,
            }}
            formatter={(value: number) => formatSEK(value)}
          />
          <Bar
            dataKey="belopp"
            name="Planerad utbetalning"
            fill={COLOR_PRIMARY}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
