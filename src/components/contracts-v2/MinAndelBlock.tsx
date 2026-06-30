import { useState } from 'react';
import { formatSEK, minAndelTotalt } from '../../data/contractsV2Data';
import type { KontraktV2 } from '../../data/contractsV2Data';
import CollapsibleGroupHeader from './CollapsibleGroupHeader';

/**
 * "Din andel" — hopfällbart block i samma stil som avräkningsnotans grupper:
 * summan (pengar ut exkl. moms) ligger i toppen på grupp-rubriken, och
 * detaljerna (din andel, redovisat värde, kontraktstillägg, avräkning) fälls
 * ut under. Ingen botten-summeringsrad — totalen syns redan i rubriken.
 *
 * OBS prototyp-logik: Kontraktstillägg och Avräkning saknar egna datafält
 * och defaultar till 0, så Pengar ut = Redovisat värde (din andel).
 */
export default function MinAndelBlock({ contract }: { contract: KontraktV2 }) {
  const [open, setOpen] = useState(false);

  const redovisatVärde = minAndelTotalt(contract);
  const kontraktstillägg = 0;
  const avräkning = 0;
  const pengarUt = redovisatVärde + kontraktstillägg - avräkning;

  return (
    <>
      <CollapsibleGroupHeader
        label="Din andel"
        total={formatSEK(pengarUt)}
        open={open}
        onToggle={() => setOpen((v) => !v)}
        info="Din andel av kontraktets redovisade värde, efter eventuellt kontraktstillägg och avräkning. Det här är pengar ut till dig, exklusive moms."
      />
      {open && (
        <>
          <Row label="Din andel av kontraktet" value={contract.andel} />
          <Row label="Redovisat värde" value={formatSEK(redovisatVärde)} />
          <Row label="Kontraktstillägg" value={formatSEK(kontraktstillägg)} />
          <Row
            label="Avräkning"
            value={avräkning === 0 ? '− 0 kr' : `−${formatSEK(avräkning)}`}
          />
        </>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-[16px] md:px-[24px] py-[12px] border-b border-[#e4e4e4] last:border-b-0">
      <p
        className="font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </p>
      <p
        className="text-right font-['IBM_Plex_Sans',sans-serif] text-[14px] text-[#021c20] tabular-nums"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {value}
      </p>
    </div>
  );
}
