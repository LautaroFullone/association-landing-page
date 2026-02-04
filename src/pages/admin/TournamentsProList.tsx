import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Eye,
  Play,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Zap,
  GitBranch,
  Radio,
  Medal,
} from "lucide-react";
import {
  tournamentsPro as initialTournaments,
  liveMatches,
} from "@/data/tournaments-pro.data";
import type {
  TournamentPro,
  TournamentStatus,
  Gender,
} from "@/model/TournamentPro.model";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import { Separator } from "@/components/ui/separator";

const statusConfig: Record<
  TournamentStatus,
  { label: string; className: string }
> = {
  "en-curso": {
    label: "En Curso",
    className: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  proximo: {
    label: "Próximo",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  finalizado: {
    label: "Finalizado",
    className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
};

const genderLabels: Record<Gender, string> = {
  masculino: "Masculino",
  femenino: "Femenino",
  mixto: "Mixto",
};

// Features comparison data
const proFeatures = [
  {
    icon: GitBranch,
    title: "Llaves",
    description: "Sistema visual de eliminatorias con cuadros dinámicos",
  },
  {
    icon: Radio,
    title: "Partidos en Vivo",
    description: "Actualización de resultados en tiempo real",
  },
  {
    icon: Medal,
    title: "Ranking Integrado",
    description: "Sistema de puntos y clasificación automática",
  },
  {
    icon: Users,
    title: "Gestión de Zonas",
    description: "Fase de grupos con tablas de posiciones",
  },
];

export function TournamentsProList() {
  const [tournaments, setTournaments] =
    useState<TournamentPro[]>(initialTournaments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | "all">(
    "all",
  );
  const [tournamentToDelete, setTournamentToDelete] =
    useState<TournamentPro | null>(null);

  const filteredTournaments = tournaments.filter((t) => {
    const matchesSearch = t.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const confirmDelete = () => {
    if (tournamentToDelete) {
      setTournaments((prev) =>
        prev.filter((t) => t.id !== tournamentToDelete.id),
      );
      setTournamentToDelete(null);
    }
  };

  const activeTournaments = tournaments.filter((t) => t.status === "en-curso");
  const upcomingTournaments = tournaments.filter((t) => t.status === "proximo");

  return (
    <div className="animate-in fade-in duration-500">
      {/* PRO Header */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <Zap className="w-7 h-7 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-white">Torneos</h1>
                <span className="text-sm font-bold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">
                  PRO
                </span>
              </div>
              <p className="text-slate-400 mt-1">
                Gestión avanzada de torneos con zonas, parejas inscriptas y
                resultados en vivo
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-yellow-500/20">
            <Plus className="w-5 h-5" />
            Nuevo Torneo PRO
          </button>
        </div>
      </div>

      {/* PRO Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {proFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-800/30 border border-white/5 hover:border-yellow-500/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Matches Section */}
      {/* {liveMatches.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-xl font-bold text-white">Partidos En Vivo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((match) => (
              <div
                key={match.id}
                className="p-4 rounded-xl bg-slate-800/50 border border-red-500/20 hover:border-red-500/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded">
                    {match.zone}
                  </span>
                  <span className="text-xs text-slate-400">
                    {match.court} • {match.time}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      {match.pair1.player1.lastName} /{" "}
                      {match.pair1.player2.lastName}
                    </span>
                    <div className="flex gap-1">
                      {match.score1?.map((set, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded text-sm font-bold ${
                            set > (match.score2?.[i] ?? 0)
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {set}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      {match.pair2.player1.lastName} /{" "}
                      {match.pair2.player2.lastName}
                    </span>
                    <div className="flex gap-1">
                      {match.score2?.map((set, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded text-sm font-bold ${
                            set > (match.score1?.[i] ?? 0)
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {set}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
      <Separator className="mb-8" />
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {activeTournaments.length}
              </p>
              <p className="text-sm text-slate-400">En Curso</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {upcomingTournaments.length}
              </p>
              <p className="text-sm text-slate-400">Próximos</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {tournaments.reduce((acc, t) => acc + t.pairsCount, 0)}
              </p>
              <p className="text-sm text-slate-400">Parejas Totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar torneos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as TournamentStatus | "all")
          }
          className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
        >
          <option value="all">Todos los estados</option>
          <option value="en-curso">En Curso</option>
          <option value="proximo">Próximos</option>
          <option value="finalizado">Finalizados</option>
        </select>
      </div>

      {/* Tournaments List */}
      <div className="space-y-4">
        {filteredTournaments.map((tournament) => {
          const status = statusConfig[tournament.status];
          return (
            <div
              key={tournament.id}
              className="p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-yellow-500/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex w-12 h-12 rounded-lg bg-yellow-500/10 items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {tournament.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold border ${status.className}`}
                      >
                        {status.label}
                      </span>
                      {tournament.zones && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {tournament.zones.length} Zonas
                        </span>
                      )}
                      {/* {tournament.bracket && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          Bracket
                        </span>
                      )} */}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(tournament.startDate).toLocaleDateString(
                          "es-AR",
                          { day: "numeric", month: "short" },
                        )}{" "}
                        -{" "}
                        {new Date(tournament.endDate).toLocaleDateString(
                          "es-AR",
                          { day: "numeric", month: "short" },
                        )}
                      </span>
                      {tournament.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {tournament.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {tournament.pairsCount} parejas
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                        {tournament.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300">
                        {genderLabels[tournament.gender]}
                      </span>
                      {tournament.prize && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400">
                          {tournament.prize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/tournaments-pro/${tournament.id}`}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Gestionar
                  </Link>
                  <button
                    onClick={() => setTournamentToDelete(tournament)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Champion info for finished tournaments */}
              {tournament.status === "finalizado" && tournament.champion && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-400">Campeón:</span>
                    <span className="text-white font-medium">
                      {tournament.champion.player1.lastName} /{" "}
                      {tournament.champion.player2.lastName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-lg font-medium text-white">No hay torneos</p>
            <p className="text-sm text-slate-400">
              {searchQuery || statusFilter !== "all"
                ? "No se encontraron torneos con esos filtros"
                : "Crea tu primer torneo PRO para empezar"}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {tournamentToDelete && (
        <ConfirmActionModal
          isOpen={!!tournamentToDelete}
          title={
            <>
              ¿Eliminar torneo{" "}
              <span className="font-bold">{tournamentToDelete.name}</span>?
            </>
          }
          description="Se eliminarán permanentemente todas las zonas, parejas inscriptas y resultados asociados. Esta acción no se puede deshacer."
          confirmButton={{
            icon: Trash2,
            label: "Eliminar torneo",
            variant: "destructive",
            onConfirm: confirmDelete,
          }}
          cancelButton={{
            label: "Cancelar",
            variant: "outline",
            onCancel: () => setTournamentToDelete(null),
          }}
        />
      )}
    </div>
  );
}
