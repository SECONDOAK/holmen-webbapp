import { formatSEK, type BetalplanRad } from '../../data/contractsV2Data';

interface BetalplanTableProps {
  rader: BetalplanRad[];
  totalNetto: number;
  totalMoms: number;
  totalInkl: number;
}

/**
 * Krav 5 (tabell-delen): Datum + beskrivning + tre belopp-kolumner
 * (exkl moms, moms, inkl moms) per planerad utbetalning. Summa-rad
 * längst ner. Följer CSS-grid-mönstret från UtbetalningarTable.
 */
export default function BetalplanTable({
  rader,
  totalNetto,
  totalMoms,
  totalInkl,
}: BetalplanTableProps) {
  if (rader.length === 0) {
    return (
      <p
        className="px-[16px] py-[16px] font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Inga planerade utbetalningar.
      </p>
    );
  }

  // Grid: Datum (auto) | Beskrivning (1fr) | Exkl moms | Moms | Inkl moms
  // På mobil förenklas till en wrapper med overflow-x-auto.
  const gridCls =
    'grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-[12px] md:gap-x-[16px] px-[16px]';

  return (
    <div className="flex flex-col flex-1 w-full overflow-x-auto">
      <div className="min-w-[640px] md:min-w-0">
        {/* Header */}
        <div className={`${gridCls} py-[8px] border-b border-[#e4e4e4]`}>
          <Th align="left">Datum</Th>
          <Th align="left">Beskrivning</Th>
          <Th align="right">Exkl moms</Th>
          <Th align="right">Moms</Th>
          <Th align="right">Inkl moms</Th>
        </div>

        {/* Rows */}
        {rader.map((r, i) => (
          <div
            key={`${r.datum}-${r.kontraktsnummer}-${i}`}
            className={`${gridCls} items-center py-[12px] border-b border-[#e4e4e4]`}
          >
            <Td>{r.datum}</Td>
            <Td truncate>{r.beskrivning}</Td>
            <Td align="right" subdued>
              {formatSEK(r.netto)}
            </Td>
            <Td align="right" subdued>
              {formatSEK(r.moms)}
            </Td>
            <Td align="right" bold>
              {formatSEK(r.inkl)}
            </Td>
          </div>
        ))}

        {/* Summa */}
        <div
          className={`${gridCls} items-center py-[12px] bg-[#f7f7f7] border-b border-[#e4e4e4]`}
        >
          <Td bold>Summa</Td>
          <Td />
          <Td align="right" subdued>
            {formatSEK(totalNetto)}
          </Td>
          <Td align="right" subdued>
            {formatSEK(totalMoms)}
          </Td>
          <Td align="right" bold>
            {formatSEK(totalInkl)}
          </Td>
        </div>
      </div>
    </div>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
}) {
  return (
    <p
      className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </p>
  );
}

function Td({
  children,
  align = 'left',
  bold = false,
  subdued = false,
  truncate = false,
}: {
  children?: React.ReactNode;
  align?: 'left' | 'right';
  bold?: boolean;
  subdued?: boolean;
  truncate?: boolean;
}) {
  return (
    <p
      className={`font-['IBM_Plex_Sans',sans-serif] text-[13px] md:text-[14px] text-[#021c20] ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${bold ? 'font-semibold' : ''} ${subdued ? 'opacity-70' : ''} ${
        truncate ? 'truncate' : ''
      }`}
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {children}
    </p>
  );
}
