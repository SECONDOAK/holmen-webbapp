/**
 * Mock-data för fakturor visade under Ekonomi → Fakturor.
 *
 * Belopp är lagrade som tal (öre/heltal kr) så de kan sorteras
 * numeriskt. `formatBelopp` ger samma formatering som övriga
 * tabeller i appen (sv-SE med tunnt mellanslag).
 */

export type FakturaStatus = 'Inväntar betalning' | 'Betald' | 'Förfallen';

export interface Faktura {
  id: string;
  fakturanr: string;
  datum: string; // ISO YYYY-MM-DD
  uppdragstyp: string;
  belopp: number; // i kr
  status: FakturaStatus;
  fastighet: string;
}

export const fakturorData: Faktura[] = [
  {
    id: '1',
    fakturanr: '1241241',
    datum: '2025-06-13',
    uppdragstyp: 'Skogsvård',
    belopp: 5432,
    status: 'Inväntar betalning',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '2',
    fakturanr: '1234567',
    datum: '2025-06-12',
    uppdragstyp: 'Leveransvirke',
    belopp: 3789,
    status: 'Inväntar betalning',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '3',
    fakturanr: '8901234',
    datum: '2025-05-23',
    uppdragstyp: 'Leveransvirke',
    belopp: 5432,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '4',
    fakturanr: '5678901',
    datum: '2025-02-05',
    uppdragstyp: 'Skogsvård',
    belopp: 12198,
    status: 'Förfallen',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '5',
    fakturanr: '2345678',
    datum: '2025-01-30',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 21234,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '6',
    fakturanr: '3456789',
    datum: '2024-11-18',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 6543,
    status: 'Betald',
    fastighet: 'BJÖRKLUND 4:21',
  },
  {
    id: '7',
    fakturanr: '6789012',
    datum: '2024-08-22',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 4321,
    status: 'Betald',
    fastighet: 'BJÖRKLUND 4:21',
  },
  {
    id: '8',
    fakturanr: '4567890',
    datum: '2024-03-09',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 76890,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '9',
    fakturanr: '7890123',
    datum: '2024-02-11',
    uppdragstyp: 'Skogsvård',
    belopp: 91876,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '10',
    fakturanr: '8901235',
    datum: '2023-12-15',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 18765,
    status: 'Betald',
    fastighet: 'SKOGSHEM 3:7',
  },
  {
    id: '11',
    fakturanr: '0123456',
    datum: '2023-11-04',
    uppdragstyp: 'Skogsvård',
    belopp: 5678,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: '12',
    fakturanr: '9012345',
    datum: '2023-10-27',
    uppdragstyp: 'Avverkningsrätt',
    belopp: 21345,
    status: 'Betald',
    fastighet: 'LEMESJÖ 1:52',
  },
];

export function formatBelopp(value: number): string {
  return `${value.toLocaleString('sv-SE').replace(/,/g, ' ')} kr`;
}
