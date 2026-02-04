export type TournamentStatus = "en-curso" | "proximo" | "finalizado";
export type MatchStatus = "pendiente" | "en-juego" | "finalizado";
export type Gender = "masculino" | "femenino" | "mixto";
export type Category = "1ra" | "2da" | "3ra" | "4ta" | "5ta" | "6ta" | "7ma";

export interface Player {
  id: string;
  dni: string;
  name: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface Pair {
  id: string;
  player1: Player;
  player2: Player;
  ranking?: number;
  points?: number;
}

export interface Match {
  id: string;
  pair1: Pair;
  pair2: Pair;
  status: MatchStatus;
  score1?: number[];
  score2?: number[];
  date: string;
  time?: string;
  court?: string;
  zone?: string;
  round?: string;
}

export interface Zone {
  id: string;
  name: string;
  pairs: Pair[];
  matches: Match[];
  standings: ZoneStanding[];
}

export interface ZoneStanding {
  pair: Pair;
  played: number;
  won: number;
  lost: number;
  setsWon: number;
  setsLost: number;
  gamesWon: number;
  gamesLost: number;
  points: number;
}

export interface BracketMatch {
  id: string;
  round: number;
  position: number;
  pair1?: Pair | null;
  pair2?: Pair | null;
  winner?: Pair | null;
  status: MatchStatus;
  score1?: number[];
  score2?: number[];
}

export interface TournamentPro {
  id: string;
  name: string;
  category: Category;
  gender: Gender;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  location?: string;
  prize?: string;
  pairsCount: number;
  champion?: Pair;
  runnerUp?: Pair;
  semifinalists?: Pair[];
  zones?: Zone[];
  bracket?: BracketMatch[];
  description?: string;
}

export interface RankingEntry {
  position: number;
  player: Player;
  points: number;
  tournamentsPlayed: number;
  tournamentsWon: number;
}
