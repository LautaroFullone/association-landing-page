import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  CreditCard,
  User,
  CheckCircle,
  Download,
  UserPlus,
  X,
  Globe,
  Pencil,
  Trash2,
  Loader2,
  Save,
  Phone,
  Mail,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";

interface EnrolledPair {
  id: string;
  player1Name: string;
  player1Dni: string;
  player1Phone?: string;
  player1Email?: string;
  player1IsMember?: boolean;
  player2Name: string;
  player2Dni: string;
  player2Phone?: string;
  player2Email?: string;
  player2IsMember?: boolean;
  category: string;
  registrationDate: string;
  paymentStatus: "paid" | "pending";
  registrationSource: "web" | "manual";
}

interface NewPairFormData {
  player1Name: string;
  player1Dni: string;
  player1Phone: string;
  player1Email: string;
  player1IsMember: boolean;
  player2Name: string;
  player2Dni: string;
  player2Phone: string;
  player2Email: string;
  player2IsMember: boolean;
  category: string;
  paymentStatus: "paid" | "pending";
}

const INITIAL_PAIR_FORM: NewPairFormData = {
  player1Name: "",
  player1Dni: "",
  player1Phone: "",
  player1Email: "",
  player1IsMember: false,
  player2Name: "",
  player2Dni: "",
  player2Phone: "",
  player2Email: "",
  player2IsMember: false,
  category: "",
  paymentStatus: "pending",
};

const MOCK_ENROLLED: EnrolledPair[] = [
  {
    id: "1",
    player1Name: "Juan Pérez",
    player1Dni: "35123456",
    player1Phone: "223 456 7890",
    player1Email: "juan@email.com",
    player1IsMember: true,
    player2Name: "Carlos Lopez",
    player2Dni: "36987654",
    player2Phone: "223 654 3210",
    player2Email: "carlos@email.com",
    player2IsMember: false,
    category: "4ta",
    registrationDate: "2026-02-10",
    paymentStatus: "paid",
    registrationSource: "web",
  },
  {
    id: "2",
    player1Name: "María Garcia",
    player1Dni: "38123123",
    player1Phone: "223 111 2222",
    player1Email: "maria@email.com",
    player1IsMember: true,
    player2Name: "Ana Silva",
    player2Dni: "39456456",
    player2Phone: "223 333 4444",
    player2Email: "ana@email.com",
    player2IsMember: true,
    category: "6ta",
    registrationDate: "2026-02-12",
    paymentStatus: "pending",
    registrationSource: "manual",
  },
];

const AVAILABLE_CATEGORIES = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"];

export function TournamentDetail() {
  const { id } = useParams();
  const [enrolled, setEnrolled] = useState<EnrolledPair[]>(MOCK_ENROLLED);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"todos" | "web" | "manual">(
    "todos",
  );
  const [paymentFilter, setPaymentFilter] = useState<
    "todos" | "paid" | "pending"
  >("todos");
  const [categoryFilter, setCategoryFilter] = useState<string>("todas");

  // Modal states
  const [isNewPairModalOpen, setIsNewPairModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPairForm, setNewPairForm] =
    useState<NewPairFormData>(INITIAL_PAIR_FORM);
  const [pairToDelete, setPairToDelete] = useState<EnrolledPair | null>(null);

  // Mock tournament info fetching based on ID
  const tournamentName =
    id === "1" ? "Gran Abierto de Verano" : "Detalle del Torneo";

  const filteredEnrolled = enrolled.filter((pair) => {
    const matchesSearch =
      pair.player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.player2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.player1Dni.includes(searchTerm) ||
      pair.player2Dni.includes(searchTerm) ||
      pair.registrationDate.includes(searchTerm);

    const matchesSource =
      sourceFilter === "todos" || pair.registrationSource === sourceFilter;

    const matchesPayment =
      paymentFilter === "todos" || pair.paymentStatus === paymentFilter;

    const matchesCategory =
      categoryFilter === "todas" || pair.category === categoryFilter;

    return matchesSearch && matchesSource && matchesPayment && matchesCategory;
  });

  // Parejas que participan son solo las que tienen pago confirmado
  const participatingPairs = enrolled.filter((e) => e.paymentStatus === "paid");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewPairForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewPairForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewPair = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPair: EnrolledPair = {
      id: `manual-${Date.now()}`,
      player1Name: newPairForm.player1Name,
      player1Dni: newPairForm.player1Dni,
      player1Phone: newPairForm.player1Phone,
      player1Email: newPairForm.player1Email,
      player1IsMember: newPairForm.player1IsMember,
      player2Name: newPairForm.player2Name,
      player2Dni: newPairForm.player2Dni,
      player2Phone: newPairForm.player2Phone,
      player2Email: newPairForm.player2Email,
      player2IsMember: newPairForm.player2IsMember,
      category: newPairForm.category,
      registrationDate: new Date().toISOString().split("T")[0],
      paymentStatus: newPairForm.paymentStatus,
      registrationSource: "manual",
    };

    setEnrolled((prev) => [newPair, ...prev]);
    setIsSubmitting(false);
    setIsNewPairModalOpen(false);
    setNewPairForm(INITIAL_PAIR_FORM);
  };

  const closeNewPairModal = () => {
    setIsNewPairModalOpen(false);
    setNewPairForm(INITIAL_PAIR_FORM);
  };

  const handleDeletePair = () => {
    if (pairToDelete) {
      setEnrolled((prev) => prev.filter((p) => p.id !== pairToDelete.id));
      setPairToDelete(null);
    }
  };

  const handlePaymentStatusChange = (
    pairId: string,
    newStatus: "paid" | "pending",
  ) => {
    setEnrolled((prev) =>
      prev.map((p) =>
        p.id === pairId ? { ...p, paymentStatus: newStatus } : p,
      ),
    );
  };

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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewPairModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-600/20 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Agregar Pareja
            </button>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/5 cursor-pointer">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
          <p className="text-slate-400 text-sm font-medium mb-1">
            Parejas Participantes
          </p>
          <p className="text-2xl font-bold text-white">
            {participatingPairs.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            de {enrolled.length} inscriptas
          </p>
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
        <div className="bg-slate-900 border border-white/5 p-4 rounded-xl">
          <p className="text-slate-400 text-sm font-medium mb-1">
            Inscriptos Web
          </p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-blue-400">
              {enrolled.filter((e) => e.registrationSource === "web").length}
            </p>
            <span className="text-slate-500 text-sm">
              /{" "}
              {enrolled.filter((e) => e.registrationSource === "manual").length}{" "}
              manual
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 flex-1 w-full flex-wrap">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI o fecha..."
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Estado:</span>
            <select
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value as "todos" | "paid" | "pending")
              }
            >
              <option value="todos">Todos</option>
              <option value="paid">Pagado</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <span>Origen:</span>
            <select
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(e.target.value as "todos" | "web" | "manual")
              }
            >
              <option value="todos">Todos</option>
              <option value="web">Web</option>
              <option value="manual">Manual</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <span>Categoría:</span>
            <select
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="todas">Todas</option>
              {AVAILABLE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
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
                  Fecha
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Origen
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
              {filteredEnrolled.length > 0 ? (
                filteredEnrolled.map((pair) => (
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
                          {pair.player1IsMember && (
                            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20">
                              SOCIO
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-indigo-400" />
                          <span className="text-white font-medium text-sm">
                            {pair.player2Name}{" "}
                            <span className="text-slate-500 font-normal">
                              ({pair.player2Dni})
                            </span>
                          </span>
                          {pair.player2IsMember && (
                            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20">
                              SOCIO
                            </span>
                          )}
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
                      {pair.registrationSource === "web" ? (
                        <span className="inline-flex items-center gap-1 text-sky-400 text-xs font-medium bg-sky-500/10 px-2 py-1 rounded-full border border-sky-500/20">
                          <Globe className="w-3 h-3" /> Web
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-purple-400 text-xs font-medium bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">
                          <Pencil className="w-3 h-3" /> Manual
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <Select
                        value={pair.paymentStatus}
                        onValueChange={(value) =>
                          handlePaymentStatusChange(
                            pair.id,
                            value as "paid" | "pending",
                          )
                        }
                      >
                        <SelectTrigger
                          className={`w-[120px] border-0 h-8 text-xs font-medium ${
                            pair.paymentStatus === "paid"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10">
                          <SelectItem
                            value="paid"
                            className="text-green-400 focus:bg-green-500/10 focus:text-green-400"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-current" />
                              <span>Pagado</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="pending"
                            className="text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-400"
                          >
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-3 h-3 text-current" />
                              <span>Pendiente</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setPairToDelete(pair)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Eliminar pareja"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No se encontraron parejas que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Pair Modal */}
      {isNewPairModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeNewPairModal}
          />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <UserPlus className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Agregar Pareja Manualmente
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Registra una pareja al torneo
                  </p>
                </div>
              </div>
              <button
                onClick={closeNewPairModal}
                className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmitNewPair}
              className="p-6 overflow-y-auto custom-scrollbar space-y-6"
            >
              {/* Player 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 text-xs font-bold">1</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Jugador 1
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="player1Name"
                        required
                        value={newPairForm.player1Name}
                        onChange={handleInputChange}
                        placeholder="Juan Pérez"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      DNI *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="player1Dni"
                        required
                        value={newPairForm.player1Dni}
                        onChange={handleInputChange}
                        placeholder="12345678"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        name="player1Phone"
                        value={newPairForm.player1Phone}
                        onChange={handleInputChange}
                        placeholder="223 123 4567"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        name="player1Email"
                        value={newPairForm.player1Email}
                        onChange={handleInputChange}
                        placeholder="email@ejemplo.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="player1IsMember"
                        checked={newPairForm.player1IsMember}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-white/20 bg-slate-950 text-purple-500 focus:ring-purple-500/50"
                      />
                      <span className="text-sm text-slate-300">
                        Es socio de la asociación
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* Player 2 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-400 text-xs font-bold">2</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Jugador 2
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="player2Name"
                        required
                        value={newPairForm.player2Name}
                        onChange={handleInputChange}
                        placeholder="Carlos López"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      DNI *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="player2Dni"
                        required
                        value={newPairForm.player2Dni}
                        onChange={handleInputChange}
                        placeholder="87654321"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        name="player2Phone"
                        value={newPairForm.player2Phone}
                        onChange={handleInputChange}
                        placeholder="223 987 6543"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        name="player2Email"
                        value={newPairForm.player2Email}
                        onChange={handleInputChange}
                        placeholder="email@ejemplo.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="player2IsMember"
                        checked={newPairForm.player2IsMember}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-white/20 bg-slate-950 text-purple-500 focus:ring-purple-500/50"
                      />
                      <span className="text-sm text-slate-300">
                        Es socio de la asociación
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* Registration Details */}
              <div>
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
                  Datos de Inscripción
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Categoría *
                    </label>
                    <Select
                      value={newPairForm.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-slate-950 border-white/10 text-white">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {AVAILABLE_CATEGORIES.map((cat) => (
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Estado del Pago
                    </label>
                    <Select
                      value={newPairForm.paymentStatus}
                      onValueChange={(value) =>
                        handleSelectChange(
                          "paymentStatus",
                          value as "paid" | "pending",
                        )
                      }
                    >
                      <SelectTrigger className="w-full bg-slate-950 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        <SelectItem
                          value="pending"
                          className="text-yellow-400 focus:bg-yellow-500/10 focus:text-yellow-400"
                        >
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-3 h-3" />
                            <span>Pendiente</span>
                          </div>
                        </SelectItem>
                        <SelectItem
                          value="paid"
                          className="text-green-400 focus:bg-green-500/10 focus:text-green-400"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            <span>Pagado</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-sm text-amber-400">
                  <strong>Nota:</strong> La pareja se registrará con origen
                  "Manual" para diferenciarse de las inscripciones realizadas a
                  través de la web.
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-slate-900 sticky bottom-0 z-10 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeNewPairModal}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !newPairForm.category}
                onClick={handleSubmitNewPair}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Inscribir Pareja
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {pairToDelete && (
        <ConfirmActionModal
          isOpen={!!pairToDelete}
          title={
            <>
              ¿Estás seguro que querés eliminar a{" "}
              <span className="font-bold">
                {pairToDelete.player1Name} / {pairToDelete.player2Name}
              </span>
              ?
            </>
          }
          description="Se eliminará permanentemente la pareja del torneo. Esta acción no se puede deshacer."
          confirmButton={{
            icon: Trash2,
            label: "Eliminar pareja",
            variant: "destructive",
            onConfirm: handleDeletePair,
          }}
          cancelButton={{
            label: "No, mantener",
            variant: "outline",
            onCancel: () => setPairToDelete(null),
          }}
        />
      )}
    </div>
  );
}
