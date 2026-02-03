import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  MoreHorizontal,
  Trash2,
  Edit,
  Trophy,
} from "lucide-react";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  categories: string[];
  status: "abierto" | "proximamente" | "finalizado";
  enrolledCount: number;
}

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "Gran Abierto de Verano",
    startDate: "2026-02-15",
    endDate: "2026-02-17",
    location: "Club Los Naranjos",
    categories: ["2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
    status: "abierto",
    enrolledCount: 24,
  },
  {
    id: 2,
    name: "Copa Ciudad de Mar del Plata",
    startDate: "2026-03-01",
    endDate: "2026-03-03",
    location: "Complejo World Padel",
    categories: ["1ra", "2da", "3ra", "4ta"],
    status: "proximamente",
    enrolledCount: 5,
  },
  {
    id: 3,
    name: "Master de Maestros 2025",
    startDate: "2025-12-10",
    endDate: "2025-12-15",
    location: "Club Atlético MdP",
    categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta"],
    status: "finalizado",
    enrolledCount: 32,
  },
];

export function TournamentsList() {
  const [tournaments, setTournaments] =
    useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [tournamentToDelete, setTournamentToDelete] =
    useState<Tournament | null>(null);

  const confirmDelete = () => {
    if (tournamentToDelete) {
      setTournaments((prev) =>
        prev.filter((t) => t.id !== tournamentToDelete.id),
      );
      setTournamentToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "abierto":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "proximamente":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Torneos</h1>
          <p className="text-slate-400 mt-1">
            Administra los torneos y sus inscripciones
          </p>
        </div>
        <Link
          to="/admin/tournaments/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus className="w-5 h-5" />
          Nuevo Torneo
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${getStatusColor(tournament.status)}`}
                >
                  {tournament.status}
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTournamentToDelete(tournament)}
                    className="p-1.5 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {tournament.name}
              </h3>

              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{tournament.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="truncate">{tournament.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Trophy className="w-4 h-4 text-blue-500" />
                  <span className="truncate">
                    {tournament.categories.length} Categorías
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {tournament.enrolledCount} Parejas Confirmadas
                </span>
              </div>
              <Link
                to={`/admin/tournaments/${tournament.id}`}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Ver Inscriptos <MoreHorizontal className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {tournamentToDelete && (
        <ConfirmActionModal
          isOpen={!!tournamentToDelete}
          title={
            <>
              ¿Estás seguro que querés eliminar el torneo{" "}
              <span className="font-bold">{tournamentToDelete.name}</span>?
            </>
          }
          description="Se eliminará permanentemente el torneo y todas sus inscripciones. Esta acción no se puede deshacer."
          confirmButton={{
            icon: Trash2,
            label: "Eliminar torneo",
            variant: "destructive",
            onConfirm: confirmDelete,
          }}
          cancelButton={{
            label: "No, mantener",
            variant: "outline",
            onCancel: () => setTournamentToDelete(null),
          }}
        />
      )}
    </div>
  );
}
