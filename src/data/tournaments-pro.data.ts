import type {
  TournamentPro,
  Player,
  Pair,
  Match,
  Zone,
  ZoneStanding,
  BracketMatch,
  RankingEntry,
} from "@/model/TournamentPro.model";

// Mock Players
const players: Player[] = [
  { id: "1", dni: "12345678", name: "Carlos", lastName: "García" },
  { id: "2", dni: "23456789", name: "Miguel", lastName: "Rodríguez" },
  { id: "3", dni: "34567890", name: "Juan", lastName: "Martínez" },
  { id: "4", dni: "45678901", name: "Pedro", lastName: "López" },
  { id: "5", dni: "56789012", name: "Antonio", lastName: "Fernández" },
  { id: "6", dni: "67890123", name: "Francisco", lastName: "González" },
  { id: "7", dni: "78901234", name: "Roberto", lastName: "Sánchez" },
  { id: "8", dni: "89012345", name: "Diego", lastName: "Ramírez" },
  { id: "9", dni: "90123456", name: "Alejandro", lastName: "Torres" },
  { id: "10", dni: "01234567", name: "Luis", lastName: "Díaz" },
  { id: "11", dni: "11234567", name: "María", lastName: "García" },
  { id: "12", dni: "21234567", name: "Ana", lastName: "Rodríguez" },
  { id: "13", dni: "31234567", name: "Laura", lastName: "Martínez" },
  { id: "14", dni: "41234567", name: "Carmen", lastName: "López" },
  { id: "15", dni: "51234567", name: "Elena", lastName: "Fernández" },
  { id: "16", dni: "61234567", name: "Patricia", lastName: "González" },
];

// Mock Pairs
const pairs: Pair[] = [
  {
    id: "p1",
    player1: players[0],
    player2: players[1],
    ranking: 1,
    points: 850,
  },
  {
    id: "p2",
    player1: players[2],
    player2: players[3],
    ranking: 2,
    points: 780,
  },
  {
    id: "p3",
    player1: players[4],
    player2: players[5],
    ranking: 3,
    points: 720,
  },
  {
    id: "p4",
    player1: players[6],
    player2: players[7],
    ranking: 4,
    points: 650,
  },
  {
    id: "p5",
    player1: players[8],
    player2: players[9],
    ranking: 5,
    points: 600,
  },
  {
    id: "p6",
    player1: players[10],
    player2: players[11],
    ranking: 1,
    points: 800,
  },
  {
    id: "p7",
    player1: players[12],
    player2: players[13],
    ranking: 2,
    points: 750,
  },
  {
    id: "p8",
    player1: players[14],
    player2: players[15],
    ranking: 3,
    points: 680,
  },
];

// Mock Zone Standings
const createZoneStandings = (zonePairs: Pair[]): ZoneStanding[] => {
  return zonePairs.map((pair, index) => ({
    pair,
    played: 3,
    won: 3 - index,
    lost: index,
    setsWon: 6 - index * 2,
    setsLost: index * 2,
    gamesWon: 36 - index * 6,
    gamesLost: 18 + index * 4,
    points: (3 - index) * 3,
  }));
};

// Mock Matches
const createZoneMatches = (zonePairs: Pair[], zone: string): Match[] => {
  const matches: Match[] = [];
  for (let i = 0; i < zonePairs.length; i++) {
    for (let j = i + 1; j < zonePairs.length; j++) {
      matches.push({
        id: `m-${zone}-${i}-${j}`,
        pair1: zonePairs[i],
        pair2: zonePairs[j],
        status: "finalizado",
        score1: [6, 6],
        score2: [4, 3],
        date: "2025-01-25",
        time: `${10 + i}:00`,
        court: `Cancha ${(i % 3) + 1}`,
        zone,
      });
    }
  }
  return matches;
};

// Mock Zones
const zones: Zone[] = [
  {
    id: "z1",
    name: "Zona A",
    pairs: pairs.slice(0, 4),
    matches: createZoneMatches(pairs.slice(0, 4), "Zona A"),
    standings: createZoneStandings(pairs.slice(0, 4)),
  },
  {
    id: "z2",
    name: "Zona B",
    pairs: [pairs[4], pairs[0], pairs[2], pairs[3]],
    matches: createZoneMatches(
      [pairs[4], pairs[0], pairs[2], pairs[3]],
      "Zona B",
    ),
    standings: createZoneStandings([pairs[4], pairs[0], pairs[2], pairs[3]]),
  },
];

// Mock Bracket
const bracket: BracketMatch[] = [
  // Semifinals
  {
    id: "b1",
    round: 1,
    position: 1,
    pair1: pairs[0],
    pair2: pairs[3],
    winner: pairs[0],
    status: "finalizado",
    score1: [6, 6],
    score2: [3, 4],
  },
  {
    id: "b2",
    round: 1,
    position: 2,
    pair1: pairs[1],
    pair2: pairs[2],
    winner: pairs[1],
    status: "finalizado",
    score1: [7, 6],
    score2: [5, 4],
  },
  // Final
  {
    id: "b3",
    round: 2,
    position: 1,
    pair1: pairs[0],
    pair2: pairs[1],
    winner: pairs[0],
    status: "finalizado",
    score1: [6, 7, 6],
    score2: [4, 6, 3],
  },
];

// Mock Tournaments
export const tournamentsPro: TournamentPro[] = [
  {
    id: "t1",
    name: "Torneo Apertura 2025",
    category: "3ra",
    gender: "masculino",
    startDate: "2025-01-20",
    endDate: "2025-01-26",
    status: "en-curso",
    location: "Club Deportivo Central",
    prize: "$50,000",
    pairsCount: 16,
    zones,
    bracket,
    description:
      "Torneo de apertura de temporada 2025. Inscripción abierta para todas las categorías.",
  },
  {
    id: "t2",
    name: "Copa Primavera",
    category: "2da",
    gender: "femenino",
    startDate: "2025-02-15",
    endDate: "2025-02-22",
    status: "proximo",
    location: "Pádel Club Norte",
    prize: "$75,000",
    pairsCount: 12,
    description: "Copa tradicional de primavera. Categoría femenina 2da.",
  },
  {
    id: "t3",
    name: "Masters Verano 2025",
    category: "1ra",
    gender: "masculino",
    startDate: "2025-03-01",
    endDate: "2025-03-08",
    status: "proximo",
    location: "Arena Pádel Premium",
    prize: "$100,000",
    pairsCount: 8,
    description:
      "El torneo más importante del año. Solo las mejores parejas clasificadas.",
  },
  {
    id: "t4",
    name: "Torneo Clausura 2024",
    category: "3ra",
    gender: "masculino",
    startDate: "2024-12-01",
    endDate: "2024-12-08",
    status: "finalizado",
    location: "Club Deportivo Central",
    prize: "$45,000",
    pairsCount: 16,
    champion: pairs[0],
    runnerUp: pairs[1],
    semifinalists: [pairs[2], pairs[3]],
    zones,
    bracket,
    description: "Torneo de clausura de temporada 2024.",
  },
  {
    id: "t5",
    name: "Copa Invierno Femenina",
    category: "2da",
    gender: "femenino",
    startDate: "2024-11-15",
    endDate: "2024-11-22",
    status: "finalizado",
    location: "Pádel Club Sur",
    prize: "$60,000",
    pairsCount: 12,
    champion: pairs[5],
    runnerUp: pairs[6],
    semifinalists: [pairs[7]],
  },
];

// Live matches for dashboard
export const liveMatches: Match[] = [
  {
    id: "live1",
    pair1: pairs[0],
    pair2: pairs[1],
    status: "en-juego",
    score1: [6, 4],
    score2: [3, 4],
    date: "2025-01-29",
    time: "10:30",
    court: "Cancha Central",
    zone: "Semifinal",
  },
  {
    id: "live2",
    pair1: pairs[2],
    pair2: pairs[3],
    status: "en-juego",
    score1: [5],
    score2: [5],
    date: "2025-01-29",
    time: "10:45",
    court: "Cancha 2",
    zone: "Semifinal",
  },
];

// Rankings
export const rankings: {
  masculino: RankingEntry[];
  femenino: RankingEntry[];
} = {
  masculino: players.slice(0, 10).map((player, index) => ({
    position: index + 1,
    player,
    points: 1000 - index * 50,
    tournamentsPlayed: 8 - Math.floor(index / 2),
    tournamentsWon: Math.max(0, 3 - index),
  })),
  femenino: players.slice(10, 16).map((player, index) => ({
    position: index + 1,
    player,
    points: 950 - index * 45,
    tournamentsPlayed: 7 - Math.floor(index / 2),
    tournamentsWon: Math.max(0, 2 - index),
  })),
};

export const getTournamentProById = (id: string): TournamentPro | undefined => {
  return tournamentsPro.find((t) => t.id === id);
};

export const getTournamentsProByStatus = (
  status: TournamentPro["status"],
): TournamentPro[] => {
  return tournamentsPro.filter((t) => t.status === status);
};
