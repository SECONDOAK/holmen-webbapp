/**
 * Mock data for the new "Kontrakt" view in the Ekonomi section.
 *
 * Includes types for contracts, affärer (grouping multiple contracts into a
 * single skogsaffär), åtgärder, dokument, utbetalningar, innestående medel
 * and betalplan.
 */

export type ContractStatusV2 = 'signerad' | 'för-signering';

/**
 * Arbetsform — uppdelad i tre uppdragstyper:
 *   - Avverkning:    Slutavverkning, Gallring, Övrig avverkning, Leveransvirke
 *   - Skogsvård:     Förrensning, Hyggesrensning, Markberedning, Plantering,
 *                    Sådd, Röjning, Dikning, Gödsling, Inköp av plant,
 *                    Förförsäljning
 *   - Skogsbränsle:  Grotuttag, Stubbuttag, Träddelsuttag, Skogsbränsleleverans
 *
 * "Inköp av plant" är formulerat ur kundens perspektiv (kunden köper
 * plantor från Holmen) i stället för Holmens "Plantförsäljning".
 */
export type Arbetsform =
  // Avverkning
  | 'Slutavverkning'
  | 'Gallring'
  | 'Övrig avverkning'
  | 'Leveransvirke'
  // Skogsvård
  | 'Förrensning'
  | 'Hyggesrensning'
  | 'Markberedning'
  | 'Plantering'
  | 'Sådd'
  | 'Röjning'
  | 'Dikning'
  | 'Gödsling'
  | 'Inköp av plant'
  | 'Förförsäljning'
  // Skogsbränsle
  | 'Grotuttag'
  | 'Stubbuttag'
  | 'Träddelsuttag'
  | 'Skogsbränsleleverans';

export type Uppdragstyp = 'Avverkning' | 'Skogsvård' | 'Skogsbränsle';

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
  /** Disponibelt belopp — varken avsatt eller i betalplan. */
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
  /** Inmätt volym i m³fub (fast volym under bark). Lämna ut för avdragsrader. */
  volymM3f?: number;
  /** Inmätt volym i m³to (toppmått). Lämna ut för avdragsrader. */
  volymMto?: number;
  /** Belopp för raden — positivt = intäkt, negativt = avdrag. Din andel. */
  belopp: number;
}

export interface KontraktV2 {
  id: string;
  /** @deprecated — affärs­klustring används inte längre i UI:t. */
  affärId?: string;
  /**
   * Pekar på avverkningsrätt-kontraktet som detta skogsvårdskontrakt
   * är länkat från. Avverkningsrätten är "moder­kontraktet"; markberedning,
   * plantering, röjning osv. är "uppföljnings­kontrakt".
   */
  parentContractId?: string;
  kontraktsnummer: string;
  uppdragstyp: Uppdragstyp;
  /**
   * Primär arbetsform — den som används för sortering och som visas
   * först i tabellen. För kontrakt med fler än en arbetsform listas
   * de extra i `additionalArbetsformer`.
   */
  arbetsform: Arbetsform;
  /**
   * Extra arbetsformer utöver den primära. Mest aktuellt för
   * skogsvårdskontrakt som bundlar flera operationer (t.ex.
   * Röjning + Förrensning + Hyggesrensning).
   */
  additionalArbetsformer?: Arbetsform[];
  /** Tecknat / signerat datum (ISO YYYY-MM-DD). */
  kontraktsdatum: string;
  status: ContractStatusV2;
  fastighet: string;
  /** Din andel av kontraktet i bråk-format, t.ex. "1/1" eller "1/2". */
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
  'signerad': 'Signerad',
  'för-signering': 'För signering',
};

export const contractsV2Data: KontraktV2[] = [
  // Affär 1 — Skogsaffär 2025 LEMESJÖ (3 kontrakt: avverkning + markberedning + plantering)
  {
    id: 'c1',
    affärId: 'aff-1',
    kontraktsnummer: '200433789',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Slutavverkning',
    kontraktsdatum: '2024-12-08',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '1/1',
    kontraktsTotalt: 1092138,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a1', namn: 'Slutavverkning avd 12', status: 'avslutad', datum: '2025-01-15' },
      { id: 'a1b', namn: 'Slutavverkning avd 8', status: 'avslutad', datum: '2025-01-28' },
      { id: 'a2', namn: 'Slutavverkning avd 14', status: 'avslutad', datum: '2025-02-14' },
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
      { datum: '2025-02-14', sortiment: '0310 ENERGIVED', volymM3f: 87, volymMto: 75, belopp: 79498 },
      { datum: '2025-02-20', sortiment: 'Stamräntekompensation', belopp: 3200 },
      { datum: '2025-02-20', sortiment: 'Vägbidrag', belopp: 1600 },
      { datum: '2025-02-14', sortiment: 'Mätningsavgift', belopp: -8200 },
      { datum: '2025-02-14', sortiment: 'Vägunderhåll', belopp: -5600 },
    ],
  },
  {
    id: 'c2',
    affärId: 'aff-1',
    parentContractId: 'c1',
    kontraktsnummer: '200433790',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Markberedning',
    kontraktsdatum: '2025-04-22',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '1/1',
    kontraktsTotalt: 65000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a3', namn: 'Markberedning avd 12', status: 'planerad', datum: '2025-06-10' },
    ],
    dokument: [
      { id: 'd4', namn: 'Kontrakt 200433790.pdf', filtyp: 'pdf', storlek: '298 kB', uppladdat: '2025-03-22' },
    ],
    utbetalningar: [],
    // Skogsvårdskontrakt = kostnad → ingen innestående medel.
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2025-06-10', sortiment: 'Markberedning avd 12', belopp: -65000 },
    ],
  },
  {
    id: 'c3',
    affärId: 'aff-1',
    parentContractId: 'c1',
    kontraktsnummer: '200433791',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Plantering',
    kontraktsdatum: '2025-05-15',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '1/1',
    kontraktsTotalt: 48000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a4', namn: 'Plantering 6 000 plantor', status: 'planerad', datum: '2025-08-20' },
    ],
    dokument: [
      { id: 'd5', namn: 'Kontrakt 200433791.pdf', filtyp: 'pdf', storlek: '276 kB', uppladdat: '2025-03-22' },
    ],
    utbetalningar: [],
    // Skogsvårdskontrakt = kostnad → ingen innestående medel.
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2025-08-20', sortiment: 'Plantering 6 000 plantor', belopp: -48000 },
    ],
  },

  // Affär 2 — Gallringspaket 2024 BJÖRKLUND (2 kontrakt, 50% andel)
  {
    id: 'c4',
    affärId: 'aff-2',
    kontraktsnummer: '200398421',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Gallring',
    kontraktsdatum: '2024-06-18',
    status: 'signerad',
    fastighet: 'BJÖRKLUND 4:21',
    andel: '1/2',
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
      { datum: '2024-10-08', sortiment: 'Stamräntekompensation', belopp: 1400 },
      { datum: '2024-10-08', sortiment: 'Vägbidrag', belopp: 700 },
      { datum: '2024-09-30', sortiment: 'Mätningsavgift', belopp: -4000 },
      { datum: '2024-09-30', sortiment: 'Vägunderhåll', belopp: -2400 },
    ],
  },
  {
    id: 'c5',
    affärId: 'aff-2',
    parentContractId: 'c4',
    kontraktsnummer: '200398422',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Röjning',
    additionalArbetsformer: ['Förrensning'],
    kontraktsdatum: '2024-03-14',
    status: 'signerad',
    fastighet: 'BJÖRKLUND 4:21',
    andel: '1/2',
    kontraktsTotalt: 64000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a6a', namn: 'Förrensning avd 9', status: 'avslutad', datum: '2024-04-15' },
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
    återrapportering: [
      { datum: '2024-04-15', sortiment: 'Förrensning avd 9', belopp: -8000 },
      { datum: '2024-06-22', sortiment: 'Röjning avd 9', belopp: -24000 },
    ],
  },

  // Fristående kontrakt utan affärsgruppering — kan vara av valfri
  // ålder, t.ex. enskilda skogsvårdsåtgärder eller leveransvirke-
  // affärer som inte ingår i en större "Skogsaffär"-paketering.
  {
    id: 'c6',
    parentContractId: 'c12',
    kontraktsnummer: '200455102',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Inköp av plant',
    kontraktsdatum: '2025-03-04',
    status: 'för-signering',
    fastighet: 'BERGVIK 2:15',
    andel: '1/1',
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
    // Ingen återrapportering — kontraktet är "för signering" och inget
    // arbete har utförts ännu.
  },
  {
    id: 'c7',
    // Leveransvirke betalas ut direkt vid inmätning — inga betalplaner
    // och inga innestående medel sätts av på den här typen av kontrakt.
    kontraktsnummer: '200421003',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Leveransvirke',
    kontraktsdatum: '2023-09-12',
    status: 'signerad',
    fastighet: 'SKOGSHEM 3:7',
    andel: '1/1',
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
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2023-12-01', sortiment: '0210 MASSAVED TALL', volymM3f: 124, volymMto: 107, belopp: 86800 },
      { datum: '2023-12-01', sortiment: '0220 MASSAVED GRAN', volymM3f: 98, volymMto: 84, belopp: 68600 },
      { datum: '2023-12-01', sortiment: '0310 ENERGIVED', volymM3f: 112, volymMto: 96, belopp: 40400 },
      { datum: '2023-12-15', sortiment: 'Stamräntekompensation', belopp: 600 },
      { datum: '2023-12-01', sortiment: 'Mätningsavgift', belopp: -3400 },
    ],
  },

  // c8: Nytt 2026-kontrakt på SKOGSHEM, väntar på signering
  {
    id: 'c8',
    kontraktsnummer: '200512004',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Gallring',
    kontraktsdatum: '2026-03-04',
    status: 'signerad',
    fastighet: 'SKOGSHEM 3:7',
    andel: '1/1',
    kontraktsTotalt: 285000,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a9', namn: 'Gallring avd 4-6', status: 'planerad', datum: '2026-08-15' },
    ],
    dokument: [
      { id: 'd13', namn: 'Kontrakt 200512004 (utkast).pdf', filtyp: 'pdf', storlek: '298 kB', uppladdat: '2026-03-04' },
    ],
    utbetalningar: [],
    // iBetalplan speglar betalplanen: 142500 + 142500 = 285000.
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 285000, fria: 0 },
    betalplan: [
      { datum: '2026-09-15', belopp: 142500, beskrivning: 'Delbetalning efter avverkning' },
      { datum: '2026-11-30', belopp: 142500, beskrivning: 'Slutreglering' },
    ],
  },

  // c9: 2026 skogsvårdsuppdrag på BERGVIK, signerad
  {
    id: 'c9',
    parentContractId: 'c12',
    kontraktsnummer: '200511220',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Plantering',
    kontraktsdatum: '2025-12-18',
    status: 'signerad',
    fastighet: 'BERGVIK 2:15',
    andel: '1/1',
    kontraktsTotalt: 54000,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a10', namn: 'Plantering 8 000 plantor', status: 'planerad', datum: '2026-05-20' },
    ],
    dokument: [
      { id: 'd14', namn: 'Kontrakt 200511220.pdf', filtyp: 'pdf', storlek: '262 kB', uppladdat: '2026-02-18' },
    ],
    utbetalningar: [],
    // Skogsvårdskontrakt = kostnad → ingen innestående medel.
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2026-05-20', sortiment: 'Plantering 8 000 plantor', belopp: -54000 },
    ],
  },

  // c10: 2025 leveransvirke på BJÖRKLUND — nyare än 2024-affären på
  // samma fastighet, men inte del av den affären
  {
    id: 'c10',
    // Leveransvirke betalas ut direkt vid inmätning — inga betalplaner
    // och inga innestående medel sätts av på den här typen av kontrakt.
    kontraktsnummer: '200478156',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Leveransvirke',
    kontraktsdatum: '2025-04-20',
    status: 'signerad',
    fastighet: 'BJÖRKLUND 4:21',
    andel: '1/2',
    kontraktsTotalt: 124800,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a11', namn: 'Avverkning kantzon', status: 'avslutad', datum: '2025-07-08' },
    ],
    dokument: [
      { id: 'd15', namn: 'Kontrakt 200478156.pdf', filtyp: 'pdf', storlek: '318 kB', uppladdat: '2025-05-12' },
      { id: 'd16', namn: 'Mätbesked 2025-07-15.pdf', filtyp: 'pdf', storlek: '152 kB', uppladdat: '2025-07-15' },
      { id: 'd17', namn: 'Leverantörsavräkning 2025-07-15.pdf', filtyp: 'pdf', storlek: '198 kB', uppladdat: '2025-07-15' },
    ],
    utbetalningar: [
      { datum: '2025-07-15', belopp: 62400 },
    ],
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2025-07-15', sortiment: '0110 SÅGT TALL OB', volymM3f: 38, volymMto: 33, belopp: 23900 },
      { datum: '2025-07-15', sortiment: '0210 MASSAVED TALL', volymM3f: 26, volymMto: 22, belopp: 18200 },
      { datum: '2025-07-15', sortiment: '0220 MASSAVED GRAN', volymM3f: 28, volymMto: 24, belopp: 19600 },
      { datum: '2025-07-30', sortiment: 'Stamräntekompensation', belopp: 400 },
      { datum: '2025-07-15', sortiment: 'Mätningsavgift', belopp: -1500 },
    ],
  },

  // c11: 2022 äldre kontrakt på LEMESJÖ — innan 2025-affären
  {
    id: 'c11',
    kontraktsnummer: '200362441',
    uppdragstyp: 'Skogsvård',
    arbetsform: 'Röjning',
    additionalArbetsformer: ['Hyggesrensning', 'Förrensning'],
    kontraktsdatum: '2022-03-15',
    status: 'signerad',
    fastighet: 'LEMESJÖ 1:52',
    andel: '1/1',
    kontraktsTotalt: 38500,
    flöde: 'kostnad',
    åtgärder: [
      { id: 'a12a', namn: 'Förrensning avd 3-5', status: 'avslutad', datum: '2022-07-10' },
      { id: 'a12b', namn: 'Hyggesrensning avd 3-5', status: 'avslutad', datum: '2022-08-15' },
      { id: 'a12', namn: 'Röjning avd 3-5', status: 'avslutad', datum: '2022-09-20' },
    ],
    dokument: [
      { id: 'd18', namn: 'Kontrakt 200362441.pdf', filtyp: 'pdf', storlek: '244 kB', uppladdat: '2022-06-10' },
    ],
    utbetalningar: [
      { datum: '2022-10-05', belopp: 38500 },
    ],
    innestaendeMedel: { avsattSkogsvård: 0, iBetalplan: 0, fria: 0 },
    betalplan: [],
    återrapportering: [
      { datum: '2022-07-10', sortiment: 'Förrensning avd 3-5', belopp: -7500 },
      { datum: '2022-08-15', sortiment: 'Hyggesrensning avd 3-5', belopp: -11000 },
      { datum: '2022-09-20', sortiment: 'Röjning avd 3-5', belopp: -20000 },
    ],
  },

  // c12: gammalt slutavverkningskontrakt på BERGVIK 2:15 (2023). Skapar
  // möjligheten att para ihop skogsvårdskontrakten på fastigheten
  // (c6 Inköp av plant + c9 Plantering) med en avverkning som har
  // medel avsatta för skogsvården.
  {
    id: 'c12',
    kontraktsnummer: '200362987',
    uppdragstyp: 'Avverkning',
    arbetsform: 'Slutavverkning',
    kontraktsdatum: '2023-04-10',
    status: 'signerad',
    fastighet: 'BERGVIK 2:15',
    andel: '1/1',
    kontraktsTotalt: 425000,
    flöde: 'intäkt',
    åtgärder: [
      { id: 'a13', namn: 'Slutavverkning avd 7', status: 'avslutad', datum: '2023-09-22' },
    ],
    dokument: [
      { id: 'd19', namn: 'Kontrakt 200362987.pdf', filtyp: 'pdf', storlek: '358 kB', uppladdat: '2023-03-12' },
      { id: 'd20', namn: 'Mätbesked 2023-10-05.pdf', filtyp: 'pdf', storlek: '174 kB', uppladdat: '2023-10-05' },
      { id: 'd21', namn: 'Leverantörsavräkning 2023-10-05.pdf', filtyp: 'pdf', storlek: '208 kB', uppladdat: '2023-10-05' },
    ],
    utbetalningar: [
      { datum: '2023-10-05', belopp: 321500 },
    ],
    // Avsatt-skogsvård täcker c6 (28 800 kr) + c9 (54 000 kr) = 82 800 kr,
    // med ~12 200 kr kvar för eventuella framtida skogsvårdsinsatser.
    innestaendeMedel: { avsattSkogsvård: 95000, iBetalplan: 0, fria: 8500 },
    betalplan: [],
    återrapportering: [
      { datum: '2023-10-05', sortiment: '0110 SÅGT TALL OB', volymM3f: 138, volymMto: 119, belopp: 173400 },
      { datum: '2023-10-05', sortiment: '0120 SÅGT GRAN OB', volymM3f: 96, volymMto: 83, belopp: 121400 },
      { datum: '2023-10-05', sortiment: '0210 MASSAVED TALL', volymM3f: 42, volymMto: 36, belopp: 29400 },
      { datum: '2023-10-05', sortiment: '0220 MASSAVED GRAN', volymM3f: 35, volymMto: 30, belopp: 24500 },
      { datum: '2023-10-05', sortiment: '0310 ENERGIVED', volymM3f: 38, volymMto: 33, belopp: 13700 },
      { datum: '2023-10-18', sortiment: 'Stamräntekompensation', belopp: 1000 },
      { datum: '2023-10-18', sortiment: 'Vägbidrag', belopp: 500 },
      { datum: '2023-10-05', sortiment: 'Mätningsavgift', belopp: -3500 },
      { datum: '2023-10-05', sortiment: 'Vägunderhåll', belopp: -2400 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returnerar länkade kontrakt för ett givet kontrakt:
 *   - `parent`: moderkontraktet (avverkningsrätten) om detta är ett
 *     skogsvårdskontrakt
 *   - `children`: uppföljnings­kontrakt (skogsvård) som länkar till
 *     detta kontrakt
 */
export function getLinkedContracts(
  contract: KontraktV2,
  all: KontraktV2[] = contractsV2Data,
): { parent?: KontraktV2; children: KontraktV2[] } {
  const parent = contract.parentContractId
    ? all.find((c) => c.id === contract.parentContractId)
    : undefined;
  const children = all.filter((c) => c.parentContractId === contract.id);
  return { parent, children };
}

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
 * Konverterar andel-strängen till en decimal mellan 0 och 1.
 *
 * Stöder både bråk-format ("1/2" -> 0.5, "1/1" -> 1) och äldre
 * procent-format ("50 %" -> 0.5) för bakåt­kompatibilitet.
 */
export function parseAndelFraction(andel: string): number {
  if (andel.includes('/')) {
    const [num, den] = andel.split('/').map((s) => Number(s.trim()));
    if (Number.isFinite(num) && Number.isFinite(den) && den > 0) {
      return num / den;
    }
    return 1;
  }
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
 * Returnerar alla arbetsformer på ett kontrakt — primär först,
 * sedan eventuella extra. Användbart för filter (matcha på någon
 * av dem) och för visning i detalvy/badges.
 */
export function getAllArbetsformer(contract: KontraktV2): Arbetsform[] {
  return [contract.arbetsform, ...(contract.additionalArbetsformer ?? [])];
}

/**
 * Returnerar totalt innestående medel för ett kontrakt — summan av
 * avsatt för skogsvård, i betalplan och disponibelt belopp.
 */
export function innestaendeTotalt(contract: KontraktV2): number {
  const m = contract.innestaendeMedel;
  return m.avsattSkogsvård + m.iBetalplan + m.fria;
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

/* ============================================================================
 * EconomyOverviewPage helpers
 *
 * Genomgående regel: alla penningvärden i datasetet (utbetalning.belopp,
 * betalplanPost.belopp, innestaendeMedel.*) tolkas som NETTO (exkl moms).
 * Moms applyas via 25 %-schablon — samma logik som ÅterrapporteringTable
 * och konsistent med MomsInfoIcon-tooltipens "exkl moms"-variant.
 * ========================================================================== */

/** Arbetsformer som räknas som "Avverkningsrätter" (exkluderar Leveransvirke). */
const AVVERKNINGSRATT_ARBETSFORMER: readonly Arbetsform[] = [
  'Slutavverkning',
  'Gallring',
  'Övrig avverkning',
] as const;

/** Returnerar {netto, moms, inkl} givet ett netto-belopp. */
function applyMoms(netto: number): { netto: number; moms: number; inkl: number } {
  const moms = Math.round(netto * 0.25);
  return { netto, moms, inkl: netto + moms };
}

/** Datum-range-filter som delas av utbetalt-aggregaten. */
export interface DateRangeFilter {
  /** Inklusive start-datum, ISO YYYY-MM-DD. */
  startDate?: string;
  /** Inklusive slut-datum, ISO YYYY-MM-DD. */
  endDate?: string;
}

function makeInRange(filter: DateRangeFilter): (datum: string) => boolean {
  return (datum) => {
    if (filter.startDate && datum < filter.startDate) return false;
    if (filter.endDate && datum > filter.endDate) return false;
    return true;
  };
}

/**
 * Krav 1: Totalt utbetalt för avverkningsrätter — summan av utbetalningar
 * från kontrakt vars arbetsform är Slutavverkning, Gallring eller Övrig
 * avverkning (inte Leveransvirke). Filtrerbar på datumintervall så
 * stat-kortet kan synca mot sidans valda period.
 */
export function getUtbetaltAvverkningsratter(
  filter: DateRangeFilter = {}
): { netto: number; moms: number; inkl: number } {
  const inRange = makeInRange(filter);
  const netto = contractsV2Data
    .filter(
      (c) =>
        c.flöde === 'intäkt' &&
        AVVERKNINGSRATT_ARBETSFORMER.includes(c.arbetsform)
    )
    .reduce(
      (sum, c) =>
        sum +
        c.utbetalningar
          .filter((u) => inRange(u.datum))
          .reduce((s, u) => s + u.belopp, 0),
      0
    );
  return applyMoms(netto);
}

/**
 * Krav 2: Totalt utbetalt för leveransvirke — summan av utbetalningar
 * från kontrakt med arbetsform = Leveransvirke. Filtrerbar på
 * datumintervall.
 */
export function getUtbetaltLeveransvirke(
  filter: DateRangeFilter = {}
): { netto: number; moms: number; inkl: number } {
  const inRange = makeInRange(filter);
  const netto = contractsV2Data
    .filter((c) => c.flöde === 'intäkt' && c.arbetsform === 'Leveransvirke')
    .reduce(
      (sum, c) =>
        sum +
        c.utbetalningar
          .filter((u) => inRange(u.datum))
          .reduce((s, u) => s + u.belopp, 0),
      0
    );
  return applyMoms(netto);
}

/**
 * Krav 4: Innestående medel totalt — netto/moms/inkl.
 * Summerar alla tre delar (avsatt + i betalplan + fria) över alla kontrakt.
 */
export function getInnestaendeMomsBreakdown(): { netto: number; moms: number; inkl: number } {
  const netto = contractsV2Data.reduce((sum, c) => sum + innestaendeTotalt(c), 0);
  return applyMoms(netto);
}

/**
 * Krav 6: Disponibelt belopp — netto/moms/inkl.
 */
export function getDisponibeltMomsBreakdown(): { netto: number; moms: number; inkl: number } {
  const netto = contractsV2Data.reduce(
    (sum, c) => sum + c.innestaendeMedel.fria,
    0
  );
  return applyMoms(netto);
}

export interface UtbetalningarOverTidFilter {
  /** Vilka avverkningsrätt-arbetsformer som ska summeras till stapel 1. */
  arbetsformer: Set<Arbetsform>;
  /** Om Leveransvirke ska summeras till stapel 2. */
  inkluderaLeveransvirke: boolean;
}

/**
 * Krav 3: Utbetalningar över tid grupperat per år.
 * Returnerar en serie med stapel 1 (avverkningsrätter, filtrerat) och
 * stapel 2 (leveransvirke). Belopp är inkl moms (huvudvärdet i chart:en).
 */
export function getUtbetalningarOverTid(
  filter: UtbetalningarOverTidFilter
): { year: string; avverkning: number; leveransvirke: number }[] {
  const yearMap = new Map<string, { avverkning: number; leveransvirke: number }>();

  for (const c of contractsV2Data) {
    if (c.flöde !== 'intäkt') continue;
    const isAvverkning =
      AVVERKNINGSRATT_ARBETSFORMER.includes(c.arbetsform) &&
      filter.arbetsformer.has(c.arbetsform);
    const isLeveransvirke =
      c.arbetsform === 'Leveransvirke' && filter.inkluderaLeveransvirke;
    if (!isAvverkning && !isLeveransvirke) continue;

    for (const u of c.utbetalningar) {
      const year = u.datum.slice(0, 4);
      // Inkl moms (25 % på netto)
      const inkl = u.belopp * 1.25;
      if (!yearMap.has(year)) {
        yearMap.set(year, { avverkning: 0, leveransvirke: 0 });
      }
      const entry = yearMap.get(year)!;
      if (isAvverkning) entry.avverkning += inkl;
      if (isLeveransvirke) entry.leveransvirke += inkl;
    }
  }

  return Array.from(yearMap.entries())
    .map(([year, vals]) => ({
      year,
      avverkning: Math.round(vals.avverkning),
      leveransvirke: Math.round(vals.leveransvirke),
    }))
    .sort((a, b) => a.year.localeCompare(b.year));
}

export interface BetalplanRad {
  datum: string;
  beskrivning: string;
  kontraktsnummer: string;
  fastighet: string;
  netto: number;
  moms: number;
  inkl: number;
}

/**
 * Krav 5: Betalplan-data — alla planerade utbetalningar med datum + belopp
 * i tre varianter (netto/moms/inkl) samt ackumulerat per år.
 */
export function getBetalplanData(): {
  rader: BetalplanRad[];
  ackumuleratPerÅr: { year: string; belopp: number }[];
  totalNetto: number;
  totalMoms: number;
  totalInkl: number;
} {
  const rader: BetalplanRad[] = [];

  for (const c of contractsV2Data) {
    for (const p of c.betalplan) {
      const m = applyMoms(p.belopp);
      rader.push({
        datum: p.datum,
        beskrivning: p.beskrivning ?? `${c.fastighet} · ${c.arbetsform}`,
        kontraktsnummer: c.kontraktsnummer,
        fastighet: c.fastighet,
        netto: m.netto,
        moms: m.moms,
        inkl: m.inkl,
      });
    }
  }

  // Sortera kronologiskt
  rader.sort((a, b) => a.datum.localeCompare(b.datum));

  // Ackumulerat per år (inkl moms — det är huvudvärdet i diagrammet)
  const yearMap = new Map<string, number>();
  for (const r of rader) {
    const year = r.datum.slice(0, 4);
    yearMap.set(year, (yearMap.get(year) ?? 0) + r.inkl);
  }
  const ackumuleratPerÅr = Array.from(yearMap.entries())
    .map(([year, belopp]) => ({ year, belopp: Math.round(belopp) }))
    .sort((a, b) => a.year.localeCompare(b.year));

  return {
    rader,
    ackumuleratPerÅr,
    totalNetto: rader.reduce((s, r) => s + r.netto, 0),
    totalMoms: rader.reduce((s, r) => s + r.moms, 0),
    totalInkl: rader.reduce((s, r) => s + r.inkl, 0),
  };
}

/**
 * Krav 7: Kontrakt som väntar på signering. Används av ActionCard-blocket
 * högst upp på EconomyOverviewPage.
 */
export function getKontraktForSignering(): KontraktV2[] {
  return contractsV2Data.filter((c) => c.status === 'för-signering');
}

export interface KostnadRad {
  datum: string;
  kontraktsnummer: string;
  fastighet: string;
  sortiment: string;
  /** Negativt belopp — pengar ut. */
  belopp: number;
}

/**
 * Krav 8: Kostnader (negativa belopp i återrapportering) grupperat per år.
 * Nyaste år först.
 */
export function getKostnaderPerÅr(): {
  year: string;
  totalKostnad: number;
  rader: KostnadRad[];
}[] {
  const yearMap = new Map<string, { totalKostnad: number; rader: KostnadRad[] }>();

  for (const c of contractsV2Data) {
    if (!c.återrapportering) continue;
    for (const r of c.återrapportering) {
      if (r.belopp >= 0) continue; // skippa intäkter och nollrader
      const year = r.datum.slice(0, 4);
      if (!yearMap.has(year)) {
        yearMap.set(year, { totalKostnad: 0, rader: [] });
      }
      const entry = yearMap.get(year)!;
      entry.totalKostnad += r.belopp;
      entry.rader.push({
        datum: r.datum,
        kontraktsnummer: c.kontraktsnummer,
        fastighet: c.fastighet,
        sortiment: r.sortiment,
        belopp: r.belopp,
      });
    }
  }

  return Array.from(yearMap.entries())
    .map(([year, data]) => ({ year, ...data }))
    .sort((a, b) => b.year.localeCompare(a.year)); // nyaste först
}

/* ============================================================================
 * Datum-bucketed helpers (combined payments + kostnader over time)
 *
 * Dessa helpers ersätter de tidigare år-baserade getUtbetalningarOverTid,
 * getBetalplanData och getKostnaderPerÅr i EconomyOverviewPage. De gamla
 * helperna finns kvar för bakåtkompat men nya konsumenter bör använda
 * dessa månads-bucketade varianter.
 * ========================================================================== */

/**
 * Demo-implicit "today" — fixerad så tidslinjen ser konsekvent ut i
 * demon oavsett real-time. Justera om datasetet flyttas i tid.
 *
 * Används för att filtrera bort historiskt-daterade betalplan-poster
 * från "kommande utbetalningar" — en planerad utbetalning kan per
 * definition inte ligga bakåt i tiden.
 */
export const MOCK_TODAY = '2026-06-09';

/** "YYYY-MM" från en ISO-datum-sträng. */
function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

/**
 * Iterera över alla månader (YYYY-MM) mellan två ISO-datum, inklusivt.
 * Används för att fylla X-axeln med en kontinuerlig tidslinje så
 * tomma månader ger tomt utrymme i chart:en (inte komprimerar).
 */
function* iterMonthsBetween(start: string, end: string): Generator<string> {
  const [sy, sm] = start.slice(0, 7).split('-').map(Number);
  const [ey, em] = end.slice(0, 7).split('-').map(Number);
  let year = sy;
  let month = sm;
  while (year < ey || (year === ey && month <= em)) {
    yield `${year}-${String(month).padStart(2, '0')}`;
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }
}

/** Klassificerar ett kontrakt — Avverkningsrätt / Leveransvirke / Annat. */
function classifyContract(c: KontraktV2): 'avverkning' | 'leveransvirke' | 'other' {
  if (c.arbetsform === 'Leveransvirke') return 'leveransvirke';
  if (AVVERKNINGSRATT_ARBETSFORMER.includes(c.arbetsform)) return 'avverkning';
  return 'other';
}

/**
 * Returnerar tidsspannet (min/max ISO-datum) som täcker all betalnings-
 * och återrapporteringsdata. Används för att bestämma standard-range i
 * datum-väljaren på charts.
 */
export function getPaymentsDataDateRange(): { min: string; max: string } {
  let min = '9999-12-31';
  let max = '0000-01-01';
  for (const c of contractsV2Data) {
    for (const u of c.utbetalningar) {
      if (u.datum < min) min = u.datum;
      if (u.datum > max) max = u.datum;
    }
    for (const p of c.betalplan) {
      if (p.datum < min) min = p.datum;
      if (p.datum > max) max = p.datum;
    }
    if (c.återrapportering) {
      for (const r of c.återrapportering) {
        if (r.datum < min) min = r.datum;
        if (r.datum > max) max = r.datum;
      }
    }
  }
  // Fallback om datan är tom
  if (min === '9999-12-31') {
    const today = '2026-06-09';
    return { min: today, max: today };
  }
  return { min, max };
}

export interface PaymentsOverTimeFilter {
  /** Inklusive start-datum, ISO YYYY-MM-DD. */
  startDate?: string;
  /** Inklusive slut-datum, ISO YYYY-MM-DD. */
  endDate?: string;
  /** Vilka avverkningsrätt-arbetsformer som ska inkluderas. */
  arbetsformer?: Set<Arbetsform>;
  /** Om Leveransvirke ska inkluderas. */
  inkluderaLeveransvirke?: boolean;
  /** Om planerade utbetalningar (betalplan) ska inkluderas. */
  inkluderaPlanerade?: boolean;
}

export interface PaymentsOverTimeRow {
  /** "YYYY-MM" — månadsbucketen. */
  month: string;
  /** Utbetalt (inkl moms) för avverkningsrätter denna månad. */
  utbetaltAvverkning: number;
  /** Utbetalt (inkl moms) för leveransvirke denna månad. */
  utbetaltLeveransvirke: number;
  /** Planerade utbetalningar (inkl moms) denna månad. */
  planerad: number;
}

/**
 * Returnerar månadsbucketed serien för combined payments-chart:
 * utbetalt avverkningsrätter + utbetalt leveransvirke + planerade.
 * Alla belopp i inkl moms (huvudvärdet i diagrammet).
 *
 * Filter kontrollerar datum-range och vilka kategorier som inkluderas.
 * Default: alla kategorier på + hela datasetet.
 */
export function getPaymentsOverTime(
  filter: PaymentsOverTimeFilter = {}
): PaymentsOverTimeRow[] {
  const {
    startDate,
    endDate,
    arbetsformer = new Set<Arbetsform>(AVVERKNINGSRATT_ARBETSFORMER),
    inkluderaLeveransvirke = true,
    inkluderaPlanerade = true,
  } = filter;

  const inRange = (datum: string) => {
    if (startDate && datum < startDate) return false;
    if (endDate && datum > endDate) return false;
    return true;
  };

  const monthMap = new Map<string, PaymentsOverTimeRow>();
  const ensure = (month: string): PaymentsOverTimeRow => {
    if (!monthMap.has(month)) {
      monthMap.set(month, {
        month,
        utbetaltAvverkning: 0,
        utbetaltLeveransvirke: 0,
        planerad: 0,
      });
    }
    return monthMap.get(month)!;
  };

  // Forfyll alla manader i intervallet med nollor sa X-axeln blir en
  // kontinuerlig tidslinje. Manader utan data far inga staplar visuellt
  // (alla varden = 0) men positionen pa X-axeln bevaras.
  if (startDate && endDate) {
    for (const m of iterMonthsBetween(startDate, endDate)) {
      ensure(m);
    }
  }

  for (const c of contractsV2Data) {
    if (c.flöde !== 'intäkt') continue;
    const klass = classifyContract(c);

    // Historiska utbetalningar
    if (klass === 'avverkning' && arbetsformer.has(c.arbetsform)) {
      for (const u of c.utbetalningar) {
        if (!inRange(u.datum)) continue;
        ensure(monthKey(u.datum)).utbetaltAvverkning += u.belopp * 1.25;
      }
    }
    if (klass === 'leveransvirke' && inkluderaLeveransvirke) {
      for (const u of c.utbetalningar) {
        if (!inRange(u.datum)) continue;
        ensure(monthKey(u.datum)).utbetaltLeveransvirke += u.belopp * 1.25;
      }
    }

    // Planerade utbetalningar (betalplan) — oavsett kategori, om bockad.
    // En "planerad" utbetalning ar per definition framtida, sa vi
    // exkluderar betalplan-poster som ligger bakat i tiden relativt
    // MOCK_TODAY (de borde redan vara utbetalda eller bortrensade).
    if (inkluderaPlanerade) {
      for (const p of c.betalplan) {
        if (p.datum < MOCK_TODAY) continue;
        if (!inRange(p.datum)) continue;
        ensure(monthKey(p.datum)).planerad += p.belopp * 1.25;
      }
    }
  }

  return Array.from(monthMap.values())
    .map((r) => ({
      month: r.month,
      utbetaltAvverkning: Math.round(r.utbetaltAvverkning),
      utbetaltLeveransvirke: Math.round(r.utbetaltLeveransvirke),
      planerad: Math.round(r.planerad),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export interface PaymentDetailRow {
  /** Kontraktets interna id (för navigering via openContract-event). */
  kontraktsId: string;
  datum: string;
  kontraktsnummer: string;
  fastighet: string;
  arbetsform: Arbetsform;
  /** Inkl moms — det belopp som faktiskt landat på kontot (utbetalt) eller
   *  förväntas landa på kontot (planerad). */
  belopp: number;
  typ: 'utbetalt-avverkning' | 'utbetalt-leveransvirke' | 'planerad';
}

/**
 * Returnerar månadsbucketed detalj-rader för combined payments-listan
 * under chart:en (Avanza-stil expanderbara månader → enskilda
 * utbetalningar/planerade). Använder samma filter som getPaymentsOverTime.
 *
 * Sortering: månader stigande, rader inom månad stigande på datum.
 */
export function getPaymentsDetailByMonth(
  filter: PaymentsOverTimeFilter = {}
): { month: string; total: number; rader: PaymentDetailRow[] }[] {
  const {
    startDate,
    endDate,
    arbetsformer = new Set<Arbetsform>(AVVERKNINGSRATT_ARBETSFORMER),
    inkluderaLeveransvirke = true,
    inkluderaPlanerade = true,
  } = filter;

  const inRange = (datum: string) => {
    if (startDate && datum < startDate) return false;
    if (endDate && datum > endDate) return false;
    return true;
  };

  const monthMap = new Map<string, { total: number; rader: PaymentDetailRow[] }>();
  const ensure = (month: string) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, { total: 0, rader: [] });
    }
    return monthMap.get(month)!;
  };

  for (const c of contractsV2Data) {
    if (c.flöde !== 'intäkt') continue;
    const klass = classifyContract(c);

    // Utbetalda (historiska)
    if (klass === 'avverkning' && arbetsformer.has(c.arbetsform)) {
      for (const u of c.utbetalningar) {
        if (!inRange(u.datum)) continue;
        const inkl = Math.round(u.belopp * 1.25);
        const m = ensure(monthKey(u.datum));
        m.total += inkl;
        m.rader.push({
          kontraktsId: c.id,
          datum: u.datum,
          kontraktsnummer: c.kontraktsnummer,
          fastighet: c.fastighet,
          arbetsform: c.arbetsform,
          belopp: inkl,
          typ: 'utbetalt-avverkning',
        });
      }
    }
    if (klass === 'leveransvirke' && inkluderaLeveransvirke) {
      for (const u of c.utbetalningar) {
        if (!inRange(u.datum)) continue;
        const inkl = Math.round(u.belopp * 1.25);
        const m = ensure(monthKey(u.datum));
        m.total += inkl;
        m.rader.push({
          kontraktsId: c.id,
          datum: u.datum,
          kontraktsnummer: c.kontraktsnummer,
          fastighet: c.fastighet,
          arbetsform: c.arbetsform,
          belopp: inkl,
          typ: 'utbetalt-leveransvirke',
        });
      }
    }

    // Planerade (betalplan) — bara framtida poster relativt MOCK_TODAY.
    if (inkluderaPlanerade) {
      for (const p of c.betalplan) {
        if (p.datum < MOCK_TODAY) continue;
        if (!inRange(p.datum)) continue;
        const inkl = Math.round(p.belopp * 1.25);
        const m = ensure(monthKey(p.datum));
        m.total += inkl;
        m.rader.push({
          kontraktsId: c.id,
          datum: p.datum,
          kontraktsnummer: c.kontraktsnummer,
          fastighet: c.fastighet,
          arbetsform: c.arbetsform,
          belopp: inkl,
          typ: 'planerad',
        });
      }
    }
  }

  return Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      total: data.total,
      rader: data.rader.sort((a, b) => a.datum.localeCompare(b.datum)),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export interface KostnadDetailRow {
  /** Kontraktets interna id (för navigering via openContract-event). */
  kontraktsId: string;
  datum: string;
  kontraktsnummer: string;
  fastighet: string;
  sortiment: string;
  /** Negativt belopp — pengar ut. */
  belopp: number;
}

/**
 * Returnerar månadsbucketed detalj-rader för kostnader (negativa belopp
 * ur återrapportering) — samma mönster som getPaymentsDetailByMonth men
 * för KostnaderChart:s expanderbara detaljlista.
 *
 * Sortering: månader stigande, rader inom månad stigande på datum.
 */
export function getKostnaderDetailByMonth(
  filter: { startDate?: string; endDate?: string } = {}
): { month: string; total: number; rader: KostnadDetailRow[] }[] {
  const { startDate, endDate } = filter;
  const inRange = (datum: string) => {
    if (startDate && datum < startDate) return false;
    if (endDate && datum > endDate) return false;
    return true;
  };

  const monthMap = new Map<string, { total: number; rader: KostnadDetailRow[] }>();
  const ensure = (month: string) => {
    if (!monthMap.has(month)) {
      monthMap.set(month, { total: 0, rader: [] });
    }
    return monthMap.get(month)!;
  };

  for (const c of contractsV2Data) {
    if (!c.återrapportering) continue;
    for (const r of c.återrapportering) {
      if (r.belopp >= 0) continue;
      if (!inRange(r.datum)) continue;
      const m = ensure(monthKey(r.datum));
      m.total += r.belopp;
      m.rader.push({
        kontraktsId: c.id,
        datum: r.datum,
        kontraktsnummer: c.kontraktsnummer,
        fastighet: c.fastighet,
        sortiment: r.sortiment,
        belopp: r.belopp,
      });
    }
  }

  return Array.from(monthMap.entries())
    .map(([month, data]) => ({
      month,
      total: data.total,
      rader: data.rader.sort((a, b) => a.datum.localeCompare(b.datum)),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export interface SortimentIncomeRow {
  sortiment: string;
  /** Summan av positiva återrapporterings-rader för sortimentet. */
  belopp: number;
  /** Andel av total intäkt (0–1). */
  andel: number;
}

/**
 * Krav 10: Intäkter per sortiment inom valt datumintervall. Aggregerar
 * positiva belopp ur `återrapportering[]` per sortiment och beräknar
 * andel av total.
 *
 * Sortering: störst andel först — gör att största sortiment alltid
 * ligger överst i tabeller och som forsta slice i pien.
 */
export function getIntakterPerSortiment(
  filter: { startDate?: string; endDate?: string } = {}
): SortimentIncomeRow[] {
  const { startDate, endDate } = filter;
  const inRange = (datum: string) => {
    if (startDate && datum < startDate) return false;
    if (endDate && datum > endDate) return false;
    return true;
  };

  const sortimentMap = new Map<string, number>();
  for (const c of contractsV2Data) {
    if (!c.återrapportering) continue;
    for (const r of c.återrapportering) {
      if (r.belopp <= 0) continue;
      if (!inRange(r.datum)) continue;
      sortimentMap.set(r.sortiment, (sortimentMap.get(r.sortiment) ?? 0) + r.belopp);
    }
  }

  const total = Array.from(sortimentMap.values()).reduce((s, v) => s + v, 0);
  if (total === 0) return [];

  return Array.from(sortimentMap.entries())
    .map(([sortiment, belopp]) => ({
      sortiment,
      belopp,
      andel: belopp / total,
    }))
    .sort((a, b) => b.belopp - a.belopp);
}

export interface KostnaderOverTidRow {
  /** "YYYY-MM". */
  month: string;
  /** Negativt belopp — pengar ut. */
  kostnad: number;
}

/**
 * Returnerar månadsbucketed kostnader (negativa belopp ur återrapportering)
 * inom valt datumintervall.
 */
export function getKostnaderOverTid(
  filter: { startDate?: string; endDate?: string } = {}
): KostnaderOverTidRow[] {
  const { startDate, endDate } = filter;
  const inRange = (datum: string) => {
    if (startDate && datum < startDate) return false;
    if (endDate && datum > endDate) return false;
    return true;
  };

  const monthMap = new Map<string, number>();
  // Forfyll alla manader i intervallet sa X-axeln blir kontinuerlig.
  if (startDate && endDate) {
    for (const m of iterMonthsBetween(startDate, endDate)) {
      monthMap.set(m, 0);
    }
  }
  for (const c of contractsV2Data) {
    if (!c.återrapportering) continue;
    for (const r of c.återrapportering) {
      if (r.belopp >= 0) continue;
      if (!inRange(r.datum)) continue;
      const m = monthKey(r.datum);
      monthMap.set(m, (monthMap.get(m) ?? 0) + r.belopp);
    }
  }

  return Array.from(monthMap.entries())
    .map(([month, kostnad]) => ({ month, kostnad: Math.round(kostnad) }))
    .sort((a, b) => a.month.localeCompare(b.month));
}
