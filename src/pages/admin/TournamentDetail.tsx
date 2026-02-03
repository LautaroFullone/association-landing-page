import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  User,
  CheckCircle,
  Download,
} from "lucide-react";

interface EnrolledPair {
  id: string;
  player1Name: string;
  player1Dni: string;
  player2Name: string;
  player2Dni: string;
  category: string;
  registrationDate: string;
  paymentStatus: "paid" | "pending";
}

const MOCK_ENROLLED: EnrolledPair[] = [
  {
    id: "1",
    player1Name: "Juan Pérez",
    player1Dni: "35123456",
    player2Name: "Carlos Lopez",
    player2Dni: "36987654",
    category: "4ta",
    registrationDate: "2026-02-10",
    paymentStatus: "paid",
  },
  {
    id: "2",
    player1Name: "María Garcia",
    player1Dni: "38123123",
    player2Name: "Ana Silva",
    player2Dni: "39456456",
    category: "6ta",
    registrationDate: "2026-02-12",
    paymentStatus: "pending",
  },
];

export function TournamentDetail() {
  const { id } = useParams();
  const [enrolled, setEnrolled] = useState<EnrolledPair[]>(MOCK_ENROLLED);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock tournament info fetching based on ID
  const tournamentName =
    id === "1" ? "Gran Abierto de Verano" : "Torneo Details";

  const filteredEnrolled = enrolled.filter(
    (pair) =>
      pair.player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.player2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <Link
          to="/admin/tournaments"
          className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-4 gap-1 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver a Torneos
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              {tournamentName}
            </h1>
            <p className="text-slate-400">
              Gestiona los inscriptos de este torneo
            </p>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/5">
            <Download className="w-4 h-4" />
            Exportar Inscriptos
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
          <p className="text-slate-400 text-sm font-medium mb-1">
            Total Parejas
          </p>
          <p className="text-2xl font-bold text-white">{enrolled.length}</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
          <p className="text-slate-400 text-sm font-medium mb-1">
            Pagos Confirmados
          </p>
          <p className="text-2xl font-bold text-green-400">
            {enrolled.filter((e) => e.paymentStatus === "paid").length}
          </p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
          <p className="text-slate-400 text-sm font-medium mb-1">
            Pagos Pendientes
          </p>
          <p className="text-2xl font-bold text-yellow-500">
            {enrolled.filter((e) => e.paymentStatus === "pending").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <Filter className="w-4 h-4" />
          Filtrar
        </button>
      </div>

      {/* Enrolled Table */}
      <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/50">
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Pareja
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Categoría
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Fecha Inscripción
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Estado Pago
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnrolled.map((pair) => (
                <tr
                  key={pair.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-blue-400" />
                        <span className="text-white font-medium text-sm">
                          {pair.player1Name}{" "}
                          <span className="text-slate-500 font-normal">
                            ({pair.player1Dni})
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-indigo-400" />
                        <span className="text-white font-medium text-sm">
                          {pair.player2Name}{" "}
                          <span className="text-slate-500 font-normal">
                            ({pair.player2Dni})
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-white/5">
                      {pair.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-sm">
                    {pair.registrationDate}
                  </td>
                  <td className="p-4">
                    {pair.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <CheckCircle className="w-3 h-3" /> Pagado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-xs font-medium bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                        <CreditCard className="w-3 h-3" /> Pendiente
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
