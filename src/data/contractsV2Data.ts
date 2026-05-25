/**
 * Mock data for the new "Kontrakt" view in the Ekonomi section.
 *
 * Includes types for contracts, affärer (grouping multiple contracts into a
 * single skogsaffär), åtgärder, dokument, utbetalningar, innestående medel
 * and betalplan.
 */

export type ContractStatusV2 = 'avslutad' | 'signerad' | 'för-signering';

export type Arbetsform =
  | 'Gallring'
  | 'Skörd'
  | 'Markberedning'
  | 'Plantering'
  | 'Röjning'
  | 'Inköp av plantor';

export interface ÅtgardV2 {
  id: string;
  namn: string;
  status: 'planerad' | 'pågående' | 'avslutad';
  datum?: string;
}

export interface DokumentV2 {
  id: string;
  namn: string;
  filtyp: 'pdf' | 'xlsx';
  storlek?: string;
  uppladdat?: string;
}

export interface UtbetalningV2 {
  datum: string;
  /** Din andel av utbetalningen (varje delägare har sina egna belopp). */
  belopp: number;
}

export interface BetalplanPostV2 {
  datum: string;
  /** Din andel av den planerade utbetalningen. */
  belopp: number;
  beskrivning?: string;
}

export interface InnestaendeMedelV2 {
  /** Avsatt för framtida skogsvård (ingår inte i kommande betalplaner). */
  avsattSkogsvård: number;
  /** Innestående som reserverats enligt en betalplan. */
  iBetalplan: number;
  /** Fria medel — varken avsatta eller i betalplan. */
  fria: number;
}

/**
 * Riktning på pengaflödet ur delägarens perspektiv.
 * - `intäkt`: pengar in (avverkning, leveransvirke etc.)
 * - `kostnad`: pengar ut (skogsvård, inköp av plantor etc.)
 */
export type Flöde = 'intäkt' | 'kostnad';

/**
 * En återrapporterad inmätning för ett virkeskontrakt (avverkningsrätt /
 * leveransvirke). Varje rad är ett sortiment med uppmätt volym och det
 * belopp delägaren får ut för sortimentet. Negativt belopp = avdrag
 * (mätningsavgift, vägunderhåll osv.).
 */
export interface ÅterrapporteringPostV2 {
  /** Datum för mätbeskedet. */
  datum: string;
  /** Sortiment, t.ex. "0110 SÅGT TALL OB". */
  sortiment: string;
  /** Inmätt volym i m³f (fast volym). Lämna ut för avdragsrader. */
  volymM3f?: number;
  /** Inmätt volym i m³to (toppmått). Lämna ut för avdragsrader. */
  volymMto?: number;
  /** Belopp för raden — positivt = intäkt, negativt = avdrag. Din andel. */
  belopp: number;
}

export interface KontraktV2 {
  id: string;
  affärId?: string;
  kontraktsnummer: string;
  uppdragstyp: string;
  arbetsform: Arbetsform;
  år: string;
  status: ContractStatusV2;
  fastighet: string;
  /** Din procentuella andel av kontraktet, t.ex. "100%" eller "50%". */
  andel: string;
  /**
   * Kontraktets totala värde (alla delägare tillsammans).
   * Belopp i utbetalningar och betalplan är redan filtrerade till
   * den inloggade delägarens andel.
   */
  kontraktsTotalt: number;
  /** Är kontraktet en intäkt eller en kostnad för delägaren? */
  flöde: Flöde;
  åtgärder: ÅtgardV2[];
  dokument: DokumentV2[];
  utbetalningar: UtbetalningV2[];
  innestaendeMedel: InnestaendeMedelV2;
  betalplan: BetalplanPostV2[];
  /**
   * Återrapporterade inmätningar från avverkning. Optional —
   * visas bara på kontrakt där mätbesked faktiskt rapporterats.
   */
  återrapportering?: ÅterrapporteringPostV2[];
}

export interface AffärV2 {
  id: string;
  namn: string;
  år: string;
  fastighet: string;
}

export const affärerV2Data: AffärV2[] = [
  {
    id: 'aff-1',
    namn: 'Skogsaffär 2025 — LEMESJÖ 1:52',
    år: '2025',
    fastighet: 'LEMESJÖ 1:52',
  },
  {
    id: 'aff-2',
    namn: 'Gallringspaket 2024 — BJÖRKLUND 4:21',
    år: '2024',
    fastighet: 'BJÖRKLUND 4:21',
  },
];

/**
 * Human-readable label for status.
 */
export const statusLabel: Record<ContractStatusV2, string> = {
  'avslutad': 'Avslutad',
  'signerad': 'Signerad',
  'för-signering': 'För signering',
};

export const contractsV2Data: KontraktV2[] = [
  // Affär 1 — Skogsaffär 2025 LEMESJÖ (3 kontrakt: avverkning + markberedning + plantering)
  {
    id: 'c1',
    affärId: 'aff-1',
    kontraktsnummer: '200433789',
    uppdragstyp: 'Avverkningsrätt',
    arbetsform: 'Skörd',
    år: '2025',
    status: 'avslutad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '100%',
    kontraktsTotalt: 1092138,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a1', namn: 'Slutavverkning avd 12', status: 'avslutad', datum: '2025-02-14' },
      { id: 'a2', namn: 'Vägunderhåll', status: 'avslutad', datum: '2025-03-02' },
    ],
    dokument: [
      { id: 'd1', namn: 'Kontrakt 200433789.pdf', filtyp: 'pdf', storlek: '412 kB', uppladdat: '2024-11-08' },
      { id: 'd2', namn: 'Mätbesked 2025-01-08.pdf', filtyp: 'pdf', storlek: '184 kB', uppladdat: '2025-01-08' },
      { id: 'd3', namn: 'Leverantörsavräkning 2025-01-08.pdf', filtyp: 'pdf', storlek: '218 kB', uppladdat: '2025-01-08' },
      { id: 'd4', namn: 'Mätbesked 2025-02-14.pdf', filtyp: 'pdf', storlek: '196 kB', uppladdat: '2025-02-14' },
      { id: 'd5', namn: 'Sortimentsspecifikation.xlsx', filtyp: 'xlsx', storlek: '46 kB', uppladdat: '2025-02-14' },
    ],
    utbetalningar: [
      { datum: '2025-01-08', belopp: 412500 },
      { datum: '2025-02-14', belopp: 556527 },
    ],
    innestaendeMedel: { avsattSkogsvård: 124000, iBetalplan: 80000, fria: 38000 },
    betalplan: [
      { datum: '2025-08-15', belopp: 80000, beskrivning: 'Slutreglering efter markberedning' },
    ],
    återrapportering: [
      { datum: '2025-01-08', sortiment: '0110 SÅGT TALL OB', volymM3f: 312, volymMto: 269, belopp: 391920 },
      { datum: '2025-01-08', sortiment: '0120 SÅGT GRAN OB', volymM3f: 287, volymMto: 248, belopp: 362920 },
      { datum: '2025-01-08', sortiment: '0130 SÅGT BJÖRK', volymM3f: 38, volymMto: 33, belopp: 45600 },
      { datum: '2025-02-14', sortiment: '0210 MASSAVED TALL', volymM3f: 92, volymMto: 79, belopp: 64400 },
      { datum: '2025-02-14', sortiment: '0220 MASSAVED GRAN', volymM3f: 168, volymMto: 145, belopp: 117600 },
      { datum: '2025-02-14', sortiment: '0230 MASSAVED BJÖRK', volymM3f: 56, volymMto: 48, belopp: 39200 },
      { datum: '2025-02-14', sortiment: '0310 ENERGIVED', volymM3f: 87, volymMto: 75, belopp: 84298 },
      { datum: '2025-02-14', sortiment: 'Mätningsavgift', belopp: -8200 },
      { datum: '2025-02-14', sortiment: 'Vägunderhåll', belopp: -5600 },
    ],
  },
  {
    id: 'c2',
    affärId: 'aff-1',
    kontraktsnummer: '200433790',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Markberedning',
    år: '2025',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '100%',
    kontraktsTotalt: 65000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a3', namn: 'Markberedning avd 12', status: 'planerad', datum: '2025-06-10' },
    ],
    dokument: [
      { id: 'd4', namn: 'Kontrakt 200433790.pdf', filtyp: 'pdf', storlek: '298 kB', uppladdat: '2025-03-22' },
    ],
    utbetalningar: [],
    innestaendeMedel: { avsattSkogsvård: 65000, iBetalplan: 0, fria: 0 },
    betalplan: [],
  },
  {
    id: 'c3',
    affärId: 'aff-1',
    kontraktsnummer: '200433791',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Plantering',
    år: '2025',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '100%',
    kontraktsTotalt: 48000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a4', namn: 'Plantering 6 000 plantor', status: 'planerad', datum: '2025-08-20' },
    ],
    dokument: [
      { id: 'd5', namn: 'Kontrakt 200433791.pdf', filtyp: 'pdf', storlek: '276 kB', uppladdat: '2025-03-22' },
    ],
    utbetalningar: [],
    innestaendeMedel: { avsattSkogsvård: 48000, iBetalplan: 0, fria: 0 },
    betalplan: [],
  },

  // Affär 2 — Gallringspaket 2024 BJÖRKLUND (2 kontrakt, 50% andel)
  {
    id: 'c4',
    affärId: 'aff-2',
    kontraktsnummer: '200398421',
    uppdragstyp: 'Avverkningsrätt',
    arbetsform: 'Gallring',
    år: '2024',
    status: 'avslutad',
    fastighet: 'BJÖRKLUND 4:21',
    andel: '50%',
    kontraktsTotalt: 488200,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a5', namn: 'Gallring avd 4-7', status: 'avslutad', datum: '2024-09-12' },
    ],
    dokument: [
      { id: 'd6', namn: 'Kontrakt 200398421.pdf', filtyp: 'pdf', storlek: '388 kB', uppladdat: '2024-05-04' },
      { id: 'd7', namn: 'Mätbesked 2024-09-30.pdf', filtyp: 'pdf', storlek: '172 kB', uppladdat: '2024-09-30' },
      { id: 'd8', namn: 'Leverantörsavräkning 2024-09-30.pdf', filtyp: 'pdf', storlek: '202 kB', uppladdat: '2024-09-30' },
    ],
    utbetalningar: [
      { datum: '2024-09-30', belopp: 244100 },
    ],
    innestaendeMedel: { avsattSkogsvård: 42000, iBetalplan: 0, fria: 18500 },
    betalplan: [],
    återrapportering: [
      // Belopp redan filtrerade till 50%-andelen
      { datum: '2024-09-30', sortiment: '0110 SÅGT TALL OB', volymM3f: 64, volymMto: 55, belopp: 80400 },
      { datum: '2024-09-30', sortiment: '0210 MASSAVED TALL', volymM3f: 88, volymMto: 76, belopp: 61600 },
      { datum: '2024-09-30', sortiment: '0220 MASSAVED GRAN', volymM3f: 142, volymMto: 122, belopp: 99400 },
      { datum: '2024-09-30', sortiment: '0310 ENERGIVED', volymM3f: 22, volymMto: 19, belopp: 6700 },
      { datum: '2024-09-30', sortiment: 'Mätningsavgift', belopp: -4000 },
    ],
  },
  {
    id: 'c5',
    affärId: 'aff-2',
    kontraktsnummer: '200398422',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Röjning',
    år: '2024',
    status: 'avslutad',
    fastighet: 'BJÖRKLUND 4:21',
    andel: '50%',
    kontraktsTotalt: 64000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a6', namn: 'Röjning avd 9', status: 'avslutad', datum: '2024-06-22' },
    ],
    dokument: [
      { id: 'd8', namn: 'Kontrakt 200398422.pdf', filtyp: 'pdf', storlek: '254 kB', uppladdat: '2024-05-04' },
    ],
    utbetalningar: [
      { datum: '2024-07-12', belopp: 32000 },
    ],
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
  },

  // Övriga kontrakt utan affärsgruppering
  {
    id: 'c6',
    kontraktsnummer: '200455102',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Inköp av plantor',
    år: '2025',
    status: 'för-signering',
    fastighet: 'BERGVIK 2:15',
    andel: '100%',
    kontraktsTotalt: 28800,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a7', namn: 'Leverans 4 000 plantor', status: 'planerad' },
    ],
    dokument: [
      { id: 'd9', namn: 'Kontrakt 200455102 (utkast).pdf', filtyp: 'pdf', storlek: '189 kB', uppladdat: '2025-04-30' },
    ],
    utbetalningar: [],
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
  },
  {
    id: 'c7',
    kontraktsnummer: '200421003',
    uppdragstyp: 'Leveransvirke',
    arbetsform: 'Skörd',
    år: '2023',
    status: 'avslutad',
    fastighet: 'SKOGSHEM 3:7',
    andel: '100%',
    kontraktsTotalt: 192400,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a8', namn: 'Avverkning ledningsgata', status: 'avslutad', datum: '2023-11-04' },
    ],
    dokument: [
      { id: 'd10', namn: 'Kontrakt 200421003.pdf', filtyp: 'pdf', storlek: '344 kB', uppladdat: '2023-08-12' },
      { id: 'd11', namn: 'Mätbesked 2023-12-01.pdf', filtyp: 'pdf', storlek: '168 kB', uppladdat: '2023-12-01' },
      { id: 'd12', namn: 'Leverantörsavräkning 2023-12-01.pdf', filtyp: 'pdf', storlek: '212 kB', uppladdat: '2023-12-01' },
    ],
    utbetalningar: [
      { datum: '2023-12-01', belopp: 192400 },
    ],
    innestaendeMedel: { avsattSkogsvård: 15000, iBetalplan: 0, fria: 4200 },
    betalplan: [],
    återrapportering: [
      { datum: '2023-12-01', sortiment: '0210 MASSAVED TALL', volymM3f: 124, volymMto: 107, belopp: 86800 },
      { datum: '2023-12-01', sortiment: '0220 MASSAVED GRAN', volymM3f: 98, volymMto: 84, belopp: 68600 },
      { datum: '2023-12-01', sortiment: '0310 ENERGIVED', volymM3f: 112, volymMto: 96, belopp: 40400 },
      { datum: '2023-12-01', sortiment: 'Mätningsavgift', belopp: -3400 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatSEK(value: number): string {
  return `${value.toLocaleString('sv-SE').replace(/,/g, ' ')} kr`;
}

/**
 * Formaterar ett belopp med tanke på flödesriktning.
 * För kostnader prefixas med proper minustecken (−) så det visuellt
 * skiljer sig från intäkter.
 */
export function formatAmount(value: number, flöde: Flöde = 'intäkt'): string {
  const base = `${value.toLocaleString('sv-SE').replace(/,/g, ' ')} kr`;
  return flöde === 'kostnad' ? `−${base}` : base;
}

/**
 * "50%" -> 0.5, "100%" -> 1.0
 */
export function parseAndelFraction(andel: string): number {
  const n = Number(andel.replace('%', '').trim());
  return Number.isFinite(n) ? n / 100 : 1;
}

/**
 * Räknar ut din andel av kontraktets totala värde.
 */
export function minAndelTotalt(contract: KontraktV2): number {
  return Math.round(contract.kontraktsTotalt * parseAndelFraction(contract.andel));
}

/**
 * Aggregates totals across the supplied contracts (default: all V2 contracts).
 */
export function aggregateContractsV2(contracts: KontraktV2[] = contractsV2Data) {
  // Bara intäktskontrakt räknas in i "Totalt utbetalt" — kostnadsrelaterade
  // utbetalningar är pengar UT, inte pengar IN.
  const totalUtbetalt = contracts.reduce(
    (sum, c) =>
      c.flöde === 'intäkt'
        ? sum + c.utbetalningar.reduce((s, u) => s + u.belopp, 0)
        : sum,
    0
  );
  const totalInnestaendeAvsatt = contracts.reduce(
    (sum, c) => sum + c.innestaendeMedel.avsattSkogsvård,
    0
  );
  const totalInnestaendeIBetalplan = contracts.reduce(
    (sum, c) => sum + c.innestaendeMedel.iBetalplan,
    0
  );
  const totalInnestaendeFria = contracts.reduce(
    (sum, c) => sum + c.innestaendeMedel.fria,
    0
  );
  const totalKontrakt = contracts.length;

  return {
    totalUtbetalt,
    totalInnestaendeAvsatt,
    totalInnestaendeIBetalplan,
    totalInnestaendeFria,
    totalInnestaende:
      totalInnestaendeAvsatt + totalInnestaendeIBetalplan + totalInnestaendeFria,
    totalKontrakt,
  };
}
