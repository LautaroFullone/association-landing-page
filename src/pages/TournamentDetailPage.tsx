import { useParams, Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Award,
  Medal,
  UserCheck,
  Swords,
  Grid3X3,
  GitBranch,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
interface Player {
  name: string;
  lastName: string;
}

interface Pair {
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

interface Match {
  id: string;
  pair1: Pair;
  pair2: Pair;
  score?: {
    set1: { pair1: number; pair2: number };
    set2: { pair1: number; pair2: number };
    set3?: { pair1: number; pair2: number };
  };
  status: "pending" | "in-progress" | "finished";
  date?: string;
  time?: string;
  court?: string;
}

interface Zone {
  id: string;
  name: string;
  pairs: Pair[];
  matches: Match[];
}

// Subtorneo = combinación de categoría + género
interface Subtournament {
  category: string;
  gender: "masculino" | "femenino" | "mixto";
  zones: Zone[];
  bracket: Match[];
  champion?: Pair;
  runnerUp?: Pair;
  semifinalists?: Pair[];
}

interface Tournament {
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

// Mock Data
const mockTournament: Tournament = {
  id: "1",
  name: "Torneo Apertura 2026",
  startDate: "2026-02-15",
  endDate: "2026-02-20",
  location: "Club Náutico Mar del Plata",
  categories: ["3ra", "4ta", "5ta", "6ta"],
  genders: ["masculino", "femenino"],
  status: "en-curso",
  prize: "$200.000 + Trofeos",
  content: `
    <p>Torneo oficial organizado por la <strong>Asociación de Pádel de Mar del Plata</strong>.</p>
    <ul>
      <li><strong>Formato:</strong> Fase de grupos + Eliminación directa</li>
      <li><strong>Horarios:</strong> Sábado y domingo de 9:00 a 20:00hs</li>
      <li><strong>Canchas:</strong> 4 canchas disponibles</li>
      <li><strong>Reglamento:</strong> AJPP oficial. Sets a 6 games con tie-break</li>
    </ul>
    <p>Dirección: Av. Martínez de Hoz 2400, Mar del Plata</p>
  `,
  subtournaments: [
    // 4ta Masculino
    {
      category: "4ta",
      gender: "masculino",
      zones: [
        {
          id: "z1-4m",
          name: "Zona A",
          pairs: [
            {
              id: "p1",
              player1: { name: "Martín", lastName: "García" },
              player2: { name: "Lucas", lastName: "Fernández" },
              ranking: 1,
              points: 6,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 1,
              gamesWon: 28,
              gamesLost: 18,
            },
            {
              id: "p2",
              player1: { name: "Juan", lastName: "Pérez" },
              player2: { name: "Diego", lastName: "López" },
              ranking: 2,
              points: 4,
              wins: 1,
              losses: 1,
              setsWon: 3,
              setsLost: 2,
              gamesWon: 24,
              gamesLost: 22,
            },
            {
              id: "p3",
              player1: { name: "Carlos", lastName: "Rodríguez" },
              player2: { name: "Pedro", lastName: "Martínez" },
              ranking: 3,
              points: 2,
              wins: 0,
              losses: 2,
              setsWon: 1,
              setsLost: 4,
              gamesWon: 15,
              gamesLost: 28,
            },
            {
              id: "p4",
              player1: { name: "Andrés", lastName: "Sánchez" },
              player2: { name: "Franco", lastName: "Ruiz" },
              ranking: 4,
              points: 0,
              wins: 0,
              losses: 0,
              setsWon: 0,
              setsLost: 0,
              gamesWon: 0,
              gamesLost: 0,
            },
          ],
          matches: [
            {
              id: "m1",
              pair1: {
                id: "p1",
                player1: { name: "Martín", lastName: "García" },
                player2: { name: "Lucas", lastName: "Fernández" },
              },
              pair2: {
                id: "p2",
                player1: { name: "Juan", lastName: "Pérez" },
                player2: { name: "Diego", lastName: "López" },
              },
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 6, pair2: 3 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "10:00",
              court: "Cancha 1",
            },
            {
              id: "m2",
              pair1: {
                id: "p3",
                player1: { name: "Carlos", lastName: "Rodríguez" },
                player2: { name: "Pedro", lastName: "Martínez" },
              },
              pair2: {
                id: "p4",
                player1: { name: "Andrés", lastName: "Sánchez" },
                player2: { name: "Franco", lastName: "Ruiz" },
              },
              status: "pending",
              date: "2026-02-16",
              time: "14:00",
              court: "Cancha 2",
            },
          ],
        },
        {
          id: "z2-4m",
          name: "Zona B",
          pairs: [
            {
              id: "p5",
              player1: { name: "Roberto", lastName: "González" },
              player2: { name: "Miguel", lastName: "Torres" },
              ranking: 1,
              points: 6,
              wins: 3,
              losses: 0,
              setsWon: 6,
              setsLost: 1,
              gamesWon: 38,
              gamesLost: 22,
            },
            {
              id: "p6",
              player1: { name: "Pablo", lastName: "Díaz" },
              player2: { name: "Nicolás", lastName: "Castro" },
              ranking: 2,
              points: 4,
              wins: 2,
              losses: 1,
              setsWon: 4,
              setsLost: 3,
              gamesWon: 32,
              gamesLost: 28,
            },
            {
              id: "p7",
              player1: { name: "Federico", lastName: "Molina" },
              player2: { name: "Esteban", lastName: "Aguirre" },
              ranking: 3,
              points: 2,
              wins: 1,
              losses: 2,
              setsWon: 3,
              setsLost: 4,
              gamesWon: 26,
              gamesLost: 30,
            },
            {
              id: "p8",
              player1: { name: "Raúl", lastName: "Vera" },
              player2: { name: "Gustavo", lastName: "Quiroz" },
              ranking: 4,
              points: 0,
              wins: 0,
              losses: 3,
              setsWon: 1,
              setsLost: 6,
              gamesWon: 18,
              gamesLost: 36,
            },
          ],
          matches: [
            {
              id: "m3",
              pair1: {
                id: "p5",
                player1: { name: "Roberto", lastName: "González" },
                player2: { name: "Miguel", lastName: "Torres" },
              },
              pair2: {
                id: "p6",
                player1: { name: "Pablo", lastName: "Díaz" },
                player2: { name: "Nicolás", lastName: "Castro" },
              },
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 6, pair2: 3 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "12:00",
              court: "Cancha 2",
            },
            {
              id: "m4",
              pair1: {
                id: "p7",
                player1: { name: "Federico", lastName: "Molina" },
                player2: { name: "Esteban", lastName: "Aguirre" },
              },
              pair2: {
                id: "p8",
                player1: { name: "Raúl", lastName: "Vera" },
                player2: { name: "Gustavo", lastName: "Quiroz" },
              },
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 4 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "14:00",
              court: "Cancha 3",
            },
            {
              id: "m5",
              pair1: {
                id: "p5",
                player1: { name: "Roberto", lastName: "González" },
                player2: { name: "Miguel", lastName: "Torres" },
              },
              pair2: {
                id: "p7",
                player1: { name: "Federico", lastName: "Molina" },
                player2: { name: "Esteban", lastName: "Aguirre" },
              },
              status: "in-progress",
              date: "2026-02-16",
              time: "10:00",
              court: "Cancha 1",
            },
          ],
        },
        {
          id: "z3-4m",
          name: "Zona C",
          pairs: [
            {
              id: "p9",
              player1: { name: "Javier", lastName: "Romero" },
              player2: { name: "Santiago", lastName: "Paz" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 1,
              gamesWon: 26,
              gamesLost: 18,
            },
            {
              id: "p10",
              player1: { name: "Emanuel", lastName: "Ríos" },
              player2: { name: "Damián", lastName: "Luna" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 20,
              gamesLost: 20,
            },
            {
              id: "p11",
              player1: { name: "Matías", lastName: "Blanco" },
              player2: { name: "Ignacio", lastName: "Costa" },
              ranking: 3,
              points: 0,
              wins: 0,
              losses: 2,
              setsWon: 1,
              setsLost: 4,
              gamesWon: 14,
              gamesLost: 24,
            },
          ],
          matches: [
            {
              id: "m6",
              pair1: {
                id: "p9",
                player1: { name: "Javier", lastName: "Romero" },
                player2: { name: "Santiago", lastName: "Paz" },
              },
              pair2: {
                id: "p10",
                player1: { name: "Emanuel", lastName: "Ríos" },
                player2: { name: "Damián", lastName: "Luna" },
              },
              score: {
                set1: { pair1: 7, pair2: 5 },
                set2: { pair1: 6, pair2: 4 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "16:00",
              court: "Cancha 4",
            },
            {
              id: "m7",
              pair1: {
                id: "p10",
                player1: { name: "Emanuel", lastName: "Ríos" },
                player2: { name: "Damián", lastName: "Luna" },
              },
              pair2: {
                id: "p11",
                player1: { name: "Matías", lastName: "Blanco" },
                player2: { name: "Ignacio", lastName: "Costa" },
              },
              status: "pending",
              date: "2026-02-17",
              time: "11:00",
              court: "Cancha 2",
            },
          ],
        },
      ],
      bracket: [
        {
          id: "b1",
          pair1: {
            id: "p1",
            player1: { name: "Martín", lastName: "García" },
            player2: { name: "Lucas", lastName: "Fernández" },
          },
          pair2: {
            id: "p6",
            player1: { name: "Pablo", lastName: "Díaz" },
            player2: { name: "Nicolás", lastName: "Castro" },
          },
          status: "pending",
          date: "2026-02-19",
          time: "16:00",
          court: "Cancha 1",
        },
      ],
    },
    // 4ta Femenino
    {
      category: "4ta",
      gender: "femenino",
      zones: [
        {
          id: "z1-4f",
          name: "Zona A",
          pairs: [
            {
              id: "pf1",
              player1: { name: "María", lastName: "García" },
              player2: { name: "Laura", lastName: "Fernández" },
              ranking: 1,
              points: 6,
              wins: 3,
              losses: 0,
              setsWon: 6,
              setsLost: 1,
              gamesWon: 36,
              gamesLost: 20,
            },
            {
              id: "pf2",
              player1: { name: "Carolina", lastName: "López" },
              player2: { name: "Valentina", lastName: "Martínez" },
              ranking: 2,
              points: 4,
              wins: 2,
              losses: 1,
              setsWon: 4,
              setsLost: 2,
              gamesWon: 28,
              gamesLost: 22,
            },
          ],
          matches: [
            {
              id: "mf1",
              pair1: {
                id: "pf1",
                player1: { name: "María", lastName: "García" },
                player2: { name: "Laura", lastName: "Fernández" },
              },
              pair2: {
                id: "pf2",
                player1: { name: "Carolina", lastName: "López" },
                player2: { name: "Valentina", lastName: "Martínez" },
              },
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 4 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "11:00",
              court: "Cancha 3",
            },
          ],
        },
      ],
      bracket: [],
    },
    // 5ta Masculino
    {
      category: "5ta",
      gender: "masculino",
      zones: [
        {
          id: "z1-5m",
          name: "Zona A",
          pairs: [
            {
              id: "p5m1",
              player1: { name: "Tomás", lastName: "Herrera" },
              player2: { name: "Facundo", lastName: "Paz" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 1,
              gamesWon: 26,
              gamesLost: 18,
            },
            {
              id: "p5m2",
              player1: { name: "Sebastián", lastName: "Morales" },
              player2: { name: "Gonzalo", lastName: "Ríos" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 20,
              gamesLost: 20,
            },
            {
              id: "p5m3",
              player1: { name: "Leandro", lastName: "Suárez" },
              player2: { name: "Agustín", lastName: "Vega" },
              ranking: 3,
              points: 0,
              wins: 0,
              losses: 2,
              setsWon: 0,
              setsLost: 4,
              gamesWon: 10,
              gamesLost: 24,
            },
          ],
          matches: [
            {
              id: "m5m1",
              pair1: {
                id: "p5m1",
                player1: { name: "Tomás", lastName: "Herrera" },
                player2: { name: "Facundo", lastName: "Paz" },
              },
              pair2: {
                id: "p5m2",
                player1: { name: "Sebastián", lastName: "Morales" },
                player2: { name: "Gonzalo", lastName: "Ríos" },
              },
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 7, pair2: 5 },
              },
              status: "finished",
              date: "2026-02-16",
              time: "10:00",
              court: "Cancha 2",
            },
          ],
        },
        {
          id: "z2-5m",
          name: "Zona B",
          pairs: [
            {
              id: "p5m4",
              player1: { name: "Emiliano", lastName: "Quiroga" },
              player2: { name: "Damián", lastName: "Peralta" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 0,
              gamesWon: 24,
              gamesLost: 10,
            },
            {
              id: "p5m5",
              player1: { name: "Bruno", lastName: "Medina" },
              player2: { name: "Iván", lastName: "Acosta" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 18,
              gamesLost: 18,
            },
          ],
          matches: [],
        },
      ],
      bracket: [],
    },
    // 5ta Femenino
    {
      category: "5ta",
      gender: "femenino",
      zones: [
        {
          id: "z1-5f",
          name: "Zona Única",
          pairs: [
            {
              id: "p5f1",
              player1: { name: "Florencia", lastName: "Romero" },
              player2: { name: "Agustina", lastName: "Paz" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 0,
              gamesWon: 24,
              gamesLost: 8,
            },
            {
              id: "p5f2",
              player1: { name: "Camila", lastName: "Ortiz" },
              player2: { name: "Micaela", lastName: "Luna" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 16,
              gamesLost: 16,
            },
          ],
          matches: [],
        },
      ],
      bracket: [],
    },
    // 3ra Masculino
    {
      category: "3ra",
      gender: "masculino",
      zones: [
        {
          id: "z1-3m",
          name: "Zona A",
          pairs: [
            {
              id: "p3m1",
              player1: { name: "Hernán", lastName: "Moyano" },
              player2: { name: "Ramiro", lastName: "Figueroa" },
              ranking: 1,
              points: 6,
              wins: 3,
              losses: 0,
              setsWon: 6,
              setsLost: 0,
              gamesWon: 36,
              gamesLost: 12,
            },
            {
              id: "p3m2",
              player1: { name: "Maximiliano", lastName: "Campos" },
              player2: { name: "Joaquín", lastName: "Navarro" },
              ranking: 2,
              points: 4,
              wins: 2,
              losses: 1,
              setsWon: 4,
              setsLost: 2,
              gamesWon: 28,
              gamesLost: 20,
            },
          ],
          matches: [],
        },
      ],
      bracket: [],
    },
    // 3ra Femenino
    {
      category: "3ra",
      gender: "femenino",
      zones: [
        {
          id: "z1-3f",
          name: "Zona Única",
          pairs: [
            {
              id: "p3f1",
              player1: { name: "Rocío", lastName: "Benítez" },
              player2: { name: "Luciana", lastName: "Pereyra" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 1,
              gamesWon: 26,
              gamesLost: 14,
            },
          ],
          matches: [],
        },
      ],
      bracket: [],
    },
    // 6ta Masculino
    {
      category: "6ta",
      gender: "masculino",
      zones: [
        {
          id: "z1-6m",
          name: "Zona A",
          pairs: [
            {
              id: "p6m1",
              player1: { name: "Claudio", lastName: "Villalba" },
              player2: { name: "Oscar", lastName: "Mendoza" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 0,
              gamesWon: 24,
              gamesLost: 8,
            },
            {
              id: "p6m2",
              player1: { name: "Ricardo", lastName: "Sosa" },
              player2: { name: "Alberto", lastName: "Luna" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 16,
              gamesLost: 16,
            },
            {
              id: "p6m3",
              player1: { name: "Mario", lastName: "Chávez" },
              player2: { name: "Héctor", lastName: "Ramos" },
              ranking: 3,
              points: 0,
              wins: 0,
              losses: 2,
              setsWon: 0,
              setsLost: 4,
              gamesWon: 8,
              gamesLost: 24,
            },
          ],
          matches: [
            {
              id: "m6m1",
              pair1: {
                id: "p6m1",
                player1: { name: "Claudio", lastName: "Villalba" },
                player2: { name: "Oscar", lastName: "Mendoza" },
              },
              pair2: {
                id: "p6m2",
                player1: { name: "Ricardo", lastName: "Sosa" },
                player2: { name: "Alberto", lastName: "Luna" },
              },
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 4 },
              },
              status: "finished",
              date: "2026-02-15",
              time: "16:00",
              court: "Cancha 4",
            },
          ],
        },
      ],
      bracket: [],
    },
    // 6ta Femenino
    {
      category: "6ta",
      gender: "femenino",
      zones: [
        {
          id: "z1-6f",
          name: "Zona Única",
          pairs: [
            {
              id: "p6f1",
              player1: { name: "Patricia", lastName: "Rojas" },
              player2: { name: "Norma", lastName: "Ortega" },
              ranking: 1,
              points: 4,
              wins: 2,
              losses: 0,
              setsWon: 4,
              setsLost: 0,
              gamesWon: 24,
              gamesLost: 10,
            },
            {
              id: "p6f2",
              player1: { name: "Graciela", lastName: "Vargas" },
              player2: { name: "Elena", lastName: "Castro" },
              ranking: 2,
              points: 2,
              wins: 1,
              losses: 1,
              setsWon: 2,
              setsLost: 2,
              gamesWon: 18,
              gamesLost: 18,
            },
          ],
          matches: [],
        },
      ],
      bracket: [],
    },
  ],
};

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
  });
}

const statusConfig = {
  "inscripciones-abiertas": {
    label: "Inscripciones Abiertas",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  "en-curso": {
    label: "En Curso",
    className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  proximo: {
    label: "Próximo",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  finalizado: {
    label: "Finalizado",
    className: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
};

const genderLabels: Record<string, string> = {
  masculino: "Masculino",
  femenino: "Femenino",
  mixto: "Mixto",
};

// Match Card Component
function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === "finished";
  const isInProgress = match.status === "in-progress";

  return (
    <Card className="border-white/10 bg-slate-900/50  overflow-hidden">
      <CardContent className="p-4">
        {/* Match Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {match.date && (
              <span className="text-xs text-slate-400">
                {formatShortDate(match.date)}
              </span>
            )}
            {match.time && (
              <span className="text-xs text-slate-500">{match.time}</span>
            )}
          </div>
          {match.court && (
            <Badge
              variant="outline"
              className="text-xs border-white/10 text-slate-400"
            >
              {match.court}
            </Badge>
          )}
        </div>

        {/* Pair 1 */}
        <div
          className={`flex items-center justify-between p-2 rounded-lg mb-2 ${
            isFinished && match.score
              ? match.score.set1.pair1 > match.score.set1.pair2
                ? "bg-green-500/10"
                : "bg-slate-800/50"
              : "bg-slate-800/50"
          }`}
        >
          <span className="text-sm font-medium text-white">
            {match.pair1.player1.lastName} / {match.pair1.player2.lastName}
          </span>
          {isFinished && match.score && (
            <div className="flex gap-2">
              <span className="text-sm font-bold text-white w-5 text-center">
                {match.score.set1.pair1}
              </span>
              <span className="text-sm font-bold text-white w-5 text-center">
                {match.score.set2.pair1}
              </span>
              {match.score.set3 && (
                <span className="text-sm font-bold text-white w-5 text-center">
                  {match.score.set3.pair1}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pair 2 */}
        <div
          className={`flex items-center justify-between p-2 rounded-lg ${
            isFinished && match.score
              ? match.score.set1.pair2 > match.score.set1.pair1
                ? "bg-green-500/10"
                : "bg-slate-800/50"
              : "bg-slate-800/50"
          }`}
        >
          <span className="text-sm font-medium text-white">
            {match.pair2.player1.lastName} / {match.pair2.player2.lastName}
          </span>
          {isFinished && match.score && (
            <div className="flex gap-2">
              <span className="text-sm font-bold text-white w-5 text-center">
                {match.score.set1.pair2}
              </span>
              <span className="text-sm font-bold text-white w-5 text-center">
                {match.score.set2.pair2}
              </span>
              {match.score.set3 && (
                <span className="text-sm font-bold text-white w-5 text-center">
                  {match.score.set3.pair2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Status */}
        {!isFinished && (
          <div className="mt-3 text-center">
            <Badge
              className={
                isInProgress
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-slate-700 text-slate-300 border-slate-600"
              }
            >
              {isInProgress ? "En juego" : "Pendiente"}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Zone Table Component
function ZoneTable({ zone }: { zone: Zone }) {
  return (
    <Card className="border-white/10 bg-slate-900/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">{zone.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-2 text-slate-400 font-medium">
                  #
                </th>
                <th className="text-left py-2 px-2 text-slate-400 font-medium">
                  Pareja
                </th>
                <th className="text-center py-2 px-2 text-slate-400 font-medium">
                  PJ
                </th>
                <th className="text-center py-2 px-2 text-slate-400 font-medium">
                  G
                </th>
                <th className="text-center py-2 px-2 text-slate-400 font-medium">
                  P
                </th>
                <th className="text-center py-2 px-2 text-slate-400 font-medium">
                  Sets
                </th>
                <th className="text-center py-2 px-2 text-slate-400 font-medium">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody>
              {zone.pairs
                .sort((a, b) => (b.points || 0) - (a.points || 0))
                .map((pair, index) => (
                  <tr
                    key={pair.id}
                    className={`border-b border-white/5 ${
                      index < 2 ? "bg-blue-500/5" : ""
                    }`}
                  >
                    <td className="py-3 px-2 text-slate-400">{index + 1}</td>
                    <td className="py-3 px-2">
                      <span className="font-medium text-white">
                        {pair.player1.lastName} / {pair.player2.lastName}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">
                      {(pair.wins || 0) + (pair.losses || 0)}
                    </td>
                    <td className="py-3 px-2 text-center text-green-400">
                      {pair.wins || 0}
                    </td>
                    <td className="py-3 px-2 text-center text-red-400">
                      {pair.losses || 0}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">
                      {pair.setsWon || 0}-{pair.setsLost || 0}
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-blue-400">
                      {pair.points || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export function TournamentDetailPage() {
  const { id: tournamentId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO: Fetch tournament by ID from API
  console.log("Tournament ID:", tournamentId);
  const tournament = mockTournament;

  // Get values from URL or use defaults
  const activeTab = searchParams.get("tab") || "parejas";
  const selectedCategory =
    searchParams.get("categoria") || tournament.categories[0] || "";
  const selectedGender =
    searchParams.get("genero") || tournament.genders[0] || "";

  // Helper to update URL params
  const updateSearchParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  // Handlers for state changes
  const setActiveTab = (tab: string) => {
    updateSearchParams({ tab });
  };

  const setSelectedCategory = (category: string) => {
    // Check if current gender is available for new category
    const availableGenders = tournament.genders.filter((g) =>
      tournament.subtournaments.some(
        (st) => st.category === category && st.gender === g,
      ),
    );
    const newGender = availableGenders.includes(
      selectedGender as "masculino" | "femenino" | "mixto",
    )
      ? selectedGender
      : availableGenders[0] || tournament.genders[0];

    updateSearchParams({ categoria: category, genero: newGender });
  };

  const setSelectedGender = (gender: string) => {
    updateSearchParams({ genero: gender });
  };

  // Current values (fallback handled above)
  const currentCategory = selectedCategory;
  const currentGender = selectedGender;

  if (!tournament) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-white">Torneo no encontrado</p>
      </div>
    );
  }

  const status = statusConfig[tournament.status];

  // Obtener el subtorneo actual
  const currentSubtournament = tournament.subtournaments.find(
    (st) => st.category === currentCategory && st.gender === currentGender,
  );

  const allMatches =
    currentSubtournament?.zones?.flatMap((zone) => zone.matches) || [];
  const allPairs =
    currentSubtournament?.zones?.flatMap((zone) => zone.pairs) || [];
  const totalPairs = tournament.subtournaments.reduce(
    (acc, st) => acc + st.zones.reduce((zAcc, z) => zAcc + z.pairs.length, 0),
    0,
  );

  // Géneros disponibles para la categoría seleccionada
  const availableGendersForCategory = tournament.genders.filter((g) =>
    tournament.subtournaments.some(
      (st) => st.category === currentCategory && st.gender === g,
    ),
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />

      {/* Tournament Header - Info General */}
      <section className="relative overflow-hidden border-b border-white/5 pt-20 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Back Link */}
          <Button
            variant="ghost"
            asChild
            className="mb-6 -ml-2 text-slate-400 hover:text-white"
          >
            <Link to="/torneos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Torneos
            </Link>
          </Button>

          {/* Header Content */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Title and Meta */}
            <div className="flex-1">
              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {tournament.name}
              </h1>

              {/* Meta Info */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">
                    {formatDate(tournament.startDate)} -{" "}
                    {formatDate(tournament.endDate)}
                  </span>
                </div>
                {tournament.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{tournament.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{totalPairs} parejas</span>
                </div>
                {tournament.prize && (
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-semibold text-white">
                      {tournament.prize}
                    </span>
                  </div>
                )}
              </div>

              {/* Categorías y Géneros disponibles */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tournament.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="border-white/20 text-slate-400"
                  >
                    {cat}
                  </Badge>
                ))}
                <span className="text-slate-600">•</span>
                {tournament.genders.map((g) => (
                  <Badge
                    key={g}
                    variant="outline"
                    className="border-white/20 text-slate-400"
                  >
                    {genderLabels[g]}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right: Status Badge */}
            <div className="shrink-0">
              <div
                className={`px-6 py-4 rounded-xl border ${
                  tournament.status === "en-curso"
                    ? "bg-amber-500/10 border-amber-500/30"
                    : tournament.status === "finalizado"
                      ? "bg-slate-500/10 border-slate-500/30"
                      : tournament.status === "inscripciones-abiertas"
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-1">
                  Estado
                </p>
                <p
                  className={`text-xl font-bold ${
                    tournament.status === "en-curso"
                      ? "text-amber-400"
                      : tournament.status === "finalizado"
                        ? "text-slate-400"
                        : tournament.status === "inscripciones-abiertas"
                          ? "text-green-400"
                          : "text-blue-400"
                  }`}
                >
                  {status.label}
                </p>
              </div>
            </div>
          </div>

          {/* Tournament Content/Info */}
          {tournament.content && (
            <div className="mt-8">
              <Card className="border-white/10 bg-slate-900/50 gap-2">
                <CardContent>
                  <CardHeader className="p-0">
                    <CardTitle className="text-white text-2xl">
                      Información
                    </CardTitle>
                  </CardHeader>

                  <div
                    className="prose prose-sm prose-invert max-w-none
                      prose-p:text-slate-300 prose-p:leading-relaxed prose-p:my-2
                      prose-strong:text-white prose-strong:font-semibold
                      prose-ul:my-2 prose-ul:list-disc prose-ul:pl-5
                      prose-li:text-slate-300 prose-li:my-1
                      [&>ul]:space-y-1 text-slate-300"
                    dangerouslySetInnerHTML={{ __html: tournament.content }}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Summary (for finished tournaments) */}
          {tournament.status === "finalizado" &&
            currentSubtournament?.champion && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Champion */}
                <Card className="border-amber-500/30 bg-amber-500/10">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
                      <Trophy className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Campeones
                      </p>
                      <p className="font-bold text-white">
                        {currentSubtournament.champion.player1.lastName} /{" "}
                        {currentSubtournament.champion.player2.lastName}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Runner Up */}
                {currentSubtournament.runnerUp && (
                  <Card className="border-white/10 bg-slate-900/50">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                        <Award className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          Subcampeones
                        </p>
                        <p className="font-bold text-white">
                          {currentSubtournament.runnerUp.player1.lastName} /{" "}
                          {currentSubtournament.runnerUp.player2.lastName}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Semifinalists */}
                {currentSubtournament.semifinalists &&
                  currentSubtournament.semifinalists.length > 0 && (
                    <Card className="border-white/10 bg-slate-900/50 sm:col-span-2 lg:col-span-2">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                          <Medal className="h-6 w-6 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Semifinalistas
                          </p>
                          <p className="font-bold text-white">
                            {currentSubtournament.semifinalists
                              .map(
                                (pair) =>
                                  `${pair.player1.lastName} / ${pair.player2.lastName}`,
                              )
                              .join(" • ")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </div>
            )}
        </div>
      </section>

      {/* Subtournament Selector + Tabs */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8 flex-1 w-full">
        {/* Selector de Categoría y Género */}
        <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium text-slate-400">
              Seleccionar cuadro:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {/* Categoría Select */}
              <Select
                value={currentCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[120px] bg-slate-950 border-white/10 text-white h-10">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {tournament.categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-white focus:bg-slate-800 focus:text-white"
                    >
                      {cat} Categoría
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Género Select */}
              <Select value={currentGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[140px] bg-slate-950 border-white/10 text-white h-10">
                  <SelectValue placeholder="Género" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {availableGendersForCategory.length > 0
                    ? availableGendersForCategory.map((g) => (
                        <SelectItem
                          key={g}
                          value={g}
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          {genderLabels[g]}
                        </SelectItem>
                      ))
                    : tournament.genders.map((g) => (
                        <SelectItem
                          key={g}
                          value={g}
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          {genderLabels[g]}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>

              {/* Badge mostrando selección actual */}
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-3 py-1.5">
                {currentCategory} {genderLabels[currentGender]}
              </Badge>

              {/* Cantidad de parejas en este subtorneo */}
              <span className="text-sm text-slate-500">
                {allPairs.length} parejas
              </span>
            </div>
          </div>
        </div>

        {/* Tabs del Subtorneo */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex bg-slate-900/50 border border-white/10 p-1 rounded-xl">
            <TabsTrigger
              value="parejas"
              className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Parejas</span>
            </TabsTrigger>
            <TabsTrigger
              value="partidos"
              className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <Swords className="h-4 w-4" />
              <span className="hidden sm:inline">Partidos</span>
            </TabsTrigger>
            <TabsTrigger
              value="zonas"
              className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Zonas</span>
            </TabsTrigger>
            <TabsTrigger
              value="llaves"
              className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
            >
              <GitBranch className="h-4 w-4" />
              <span className="hidden sm:inline">Llaves</span>
            </TabsTrigger>
          </TabsList>

          {/* No Data State */}
          {!currentSubtournament ||
          (allPairs.length === 0 && allMatches.length === 0) ? (
            <Card className="border-white/10 bg-slate-900/50">
              <CardContent className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-slate-600" />
                <p className="mt-4 text-slate-400">
                  No hay información disponible para{" "}
                  <span className="font-medium text-white">
                    {currentCategory} {genderLabels[currentGender]}
                  </span>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Probá seleccionando otra categoría o género
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Pairs Tab */}
              <TabsContent value="parejas">
                <Card className="border-white/10 bg-slate-900/50">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Parejas Inscritas - {currentCategory}{" "}
                      {genderLabels[currentGender]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {allPairs.length > 0 ? (
                        allPairs.map((pair) => (
                          <div
                            key={pair.id}
                            className="flex items-center gap-4 rounded-lg bg-slate-800/50 p-4"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
                              {pair.ranking || "-"}
                            </div>
                            <div>
                              <p className="font-semibold text-white">
                                {pair.player1.name} {pair.player1.lastName}
                              </p>
                              <p className="text-sm text-slate-400">
                                {pair.player2.name} {pair.player2.lastName}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-full text-center text-slate-400">
                          No hay parejas registradas aún
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Matches Tab */}
              <TabsContent value="partidos">
                <div className="space-y-6">
                  {currentSubtournament?.zones &&
                  currentSubtournament.zones.length > 0 ? (
                    currentSubtournament.zones.map((zone) => (
                      <div key={zone.id}>
                        <h3 className="mb-4 text-lg font-semibold text-white">
                          {zone.name}
                        </h3>
                        {zone.matches.length > 0 ? (
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {zone.matches.map((match) => (
                              <MatchCard key={match.id} match={match} />
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 text-sm">
                            No hay partidos programados en esta zona
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-400">
                      No hay partidos programados aún
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Zones Tab */}
              <TabsContent value="zonas">
                <div className="grid gap-6 lg:grid-cols-2">
                  {currentSubtournament?.zones &&
                  currentSubtournament.zones.length > 0 ? (
                    currentSubtournament.zones.map((zone) => (
                      <ZoneTable key={zone.id} zone={zone} />
                    ))
                  ) : (
                    <p className="text-center text-slate-400 col-span-full">
                      No hay zonas definidas aún
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Bracket Tab */}
              <TabsContent value="llaves">
                {currentSubtournament?.bracket &&
                currentSubtournament.bracket.length > 0 ? (
                  <Card className="border-white/10 bg-slate-900/50">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Llave Eliminatoria - {currentCategory}{" "}
                        {genderLabels[currentGender]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {currentSubtournament.bracket.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-white/10 bg-slate-900/50">
                    <CardContent className="py-12 text-center">
                      <GitBranch className="mx-auto h-12 w-12 text-slate-600" />
                      <p className="mt-4 text-slate-400">
                        Las llaves eliminatorias estarán disponibles una vez
                        finalizada la fase de grupos
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
