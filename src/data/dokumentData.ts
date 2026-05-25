/**
 * Berikad dokumentmodell för den samlade Dokument-sidan under Ekonomi.
 *
 * Datat består av två delar:
 *   1. Alla dokument från befintliga kontrakt (flatmap från `contractsV2Data`)
 *      där kategori härleds från filnamnet och källa byggs av kontraktets
 *      nummer + fastighet.
 *   2. "Standalone"-dokument som inte är kopplade till ett specifikt
 *      kontrakt: årsbesked, skogsbruksplaner, försäkringsbrev, fakturor.
 */

import { contractsV2Data } from './contractsV2Data';

export type DokumentKategori =
  | 'Kontrakt'
  | 'Mätbesked'
  | 'Avräkning'
  | 'Sortimentsspecifikation'
  | 'Årsbesked'
  | 'Skogsbruksplan'
  | 'Försäkringsbrev'
  | 'Faktura';

export interface DokumentEnriched {
  id: string;
  namn: string;
  filtyp: 'pdf' | 'xlsx';
  storlek?: string;
  /** ISO-datum (uppladdat / skapat). */
  datum: string;
  kategori: DokumentKategori;
  /** T.ex. "Kontrakt 200433789 · LEMESJÖ 1:52" eller "Holmen". */
  källa: string;
  /** Frivillig — för "öppna kontraktet"-snabblänk i framtiden. */
  kontraktId?: string;
}

/**
 * Härleder kategori från filnamnet. Använder enkel prefix-matchning
 * eftersom alla mock-namn följer ett kontrollerat mönster.
 */
function deriveKategori(namn: string): DokumentKategori {
  const n = namn.toLowerCase();
  if (n.startsWith('kontrakt')) return 'Kontrakt';
  if (n.startsWith('mätbesked')) return 'Mätbesked';
  if (n.includes('avräkning')) return 'Avräkning';
  if (n.startsWith('sortimentsspecifikation')) return 'Sortimentsspecifikation';
  if (n.startsWith('årsbesked')) return 'Årsbesked';
  if (n.startsWith('skogsbruksplan')) return 'Skogsbruksplan';
  if (n.startsWith('försäkring')) return 'Försäkringsbrev';
  if (n.startsWith('faktura')) return 'Faktura';
  return 'Kontrakt'; // sane fallback
}

/**
 * Extra dokument som inte är direkt kopplade till ett kontrakt.
 * Källa anges som "Holmen" eller fastighetsnamnet beroende på typ.
 */
export const standaloneDokument: DokumentEnriched[] = [
  {
    id: 's1',
    namn: 'Årsbesked 2024.pdf',
    filtyp: 'pdf',
    storlek: '124 kB',
    datum: '2025-02-10',
    kategori: 'Årsbesked',
    källa: 'Holmen',
  },
  {
    id: 's2',
    namn: 'Årsbesked 2023.pdf',
    filtyp: 'pdf',
    storlek: '118 kB',
    datum: '2024-02-08',
    kategori: 'Årsbesked',
    källa: 'Holmen',
  },
  {
    id: 's3',
    namn: 'Skogsbruksplan LEMESJÖ 1:52.pdf',
    filtyp: 'pdf',
    storlek: '2.1 MB',
    datum: '2023-09-15',
    kategori: 'Skogsbruksplan',
    källa: 'LEMESJÖ 1:52',
  },
  {
    id: 's4',
    namn: 'Skogsbruksplan BJÖRKLUND 4:21.pdf',
    filtyp: 'pdf',
    storlek: '1.8 MB',
    datum: '2022-11-03',
    kategori: 'Skogsbruksplan',
    källa: 'BJÖRKLUND 4:21',
  },
  {
    id: 's5',
    namn: 'Försäkringsbrev skog 2025.pdf',
    filtyp: 'pdf',
    storlek: '88 kB',
    datum: '2025-01-15',
    kategori: 'Försäkringsbrev',
    källa: 'Holmen',
  },
  {
    id: 's6',
    namn: 'Faktura 5678901.pdf',
    filtyp: 'pdf',
    storlek: '96 kB',
    datum: '2025-01-20',
    kategori: 'Faktura',
    källa: 'Holmen',
  },
  {
    id: 's7',
    namn: 'Faktura 5678902.pdf',
    filtyp: 'pdf',
    storlek: '102 kB',
    datum: '2025-02-18',
    kategori: 'Faktura',
    källa: 'Holmen',
  },
];

/**
 * Returnerar alla dokument samlade — kontraktsdokument berikade med
 * kategori och källa, plus standalone-dokumenten ovan.
 */
export function getAllDokument(): DokumentEnriched[] {
  const fromContracts: DokumentEnriched[] = contractsV2Data.flatMap((k) =>
    k.dokument.map((d) => ({
      id: `${k.id}-${d.id}`,
      namn: d.namn,
      filtyp: d.filtyp,
      storlek: d.storlek,
      datum: d.uppladdat ?? '',
      kategori: deriveKategori(d.namn),
      källa: `Kontrakt ${k.kontraktsnummer} · ${k.fastighet}`,
      kontraktId: k.id,
    })),
  );
  return [...fromContracts, ...standaloneDokument];
}

/**
 * Parsea storleks-strängar som "412 kB" eller "2.1 MB" till bytes
 * för numerisk sortering. Returnerar 0 om strängen saknas/inte parsas.
 */
export function parseStorlekBytes(storlek?: string): number {
  if (!storlek) return 0;
  const m = storlek.match(/^([\d.,]+)\s*(kB|MB|GB|B)?$/i);
  if (!m) return 0;
  const value = parseFloat(m[1].replace(',', '.'));
  const unit = (m[2] ?? 'B').toLowerCase();
  switch (unit) {
    case 'gb':
      return value * 1_000_000_000;
    case 'mb':
      return value * 1_000_000;
    case 'kb':
      return value * 1_000;
    default:
      return value;
  }
}
