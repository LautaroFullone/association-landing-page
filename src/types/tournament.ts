export interface Player {
  name: string;
  lastName: string;
}

export interface Pair {
  id: string;
  player1: Player;
  player2: Player;
  ranking?: number;
  points?: number;
  wins?: number;
  losses?: number;
  setsWon?: number;
  setsLost?: number;
  gamesWon?: number;
  gamesLost?: number;
}

export interface Match {
  id: string;
  pair1: Pair;
  pair2: Pair;
  score?: {
    set1: { pair1: number; pair2: number };
    set2: { pair1: number; pair2: number };
    set3?: { pair1: number; pair2: number };
  };
  status: "pending" | "finished";
  winner?: 1 | 2; // Añadido para consistencia si se necesitara
  date?: string;
  time?: string;
  court?: string;
}

export interface BracketMatch {
  id: string;
  pair1: Pair | null;
  pair2: Pair | null;
  score?: {
    set1: { pair1: number; pair2: number };
    set2: { pair1: number; pair2: number };
    set3?: { pair1: number; pair2: number };
  };
  winner?: 1 | 2; // 1 for pair1, 2 for pair2
  status: "pending" | "finished";
  date?: string;
  time?: string;
  court?: string;
}

export interface BracketRound {
  id: string;
  name: string; // "Cuartos", "Semifinales", "Final"
  matches: BracketMatch[];
}

export interface Zone {
  id: string;
  name: string;
  pairs: Pair[];
  matches: Match[];
}

export interface Subtournament {
  category: string;
  gender: "masculino" | "femenino" | "mixto";
  zones: Zone[];
  bracket: BracketRound[];
  champion?: Pair;
  runnerUp?: Pair;
  semifinalists?: Pair[];
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  categories: string[];
  genders: ("masculino" | "femenino" | "mixto")[];
  status: "inscripciones-abiertas" | "en-curso" | "proximo" | "finalizado";
  prize?: string;
  // Rich text content - supports basic HTML: <strong>, <ul>, <li>, <br>
  content?: string;
  subtournaments: Subtournament[];
}

// Stats Helpers for UI
export const statusConfig = {
  "inscripciones-abiertas": {
    label: "Inscripciones Abiertas",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  "en-curso": {
    label: "En Curso",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  proximo: {
    label: "Próximo",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  finalizado: {
    label: "Finalizado",
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
  },
};

export const genderLabels = {
  masculino: "Masculino",
  femenino: "Femenino",
  mixto: "Mixto",
};
