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
  Phone,
  Mail,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Grid3X3,
  ArrowUp,
  Minus,
  Swords,
  GitBranch,
  Plus,
  Save,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTournamentProById,
  tournamentsPro,
} from "@/data/tournaments-pro.data";
import type {
  TournamentPro,
  Match,
  MatchStatus,
} from "@/model/TournamentPro.model";
import { Button } from "@/components/ui/button";
import { BracketView } from "@/components/bracket/BracketView";

// Enrolled pair interface (for management)
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

// Convert tournament pairs to enrolled pairs format
function convertPairsToEnrolled(tournament: TournamentPro): EnrolledPair[] {
  const enrolledPairs: EnrolledPair[] = [];

  tournament.zones?.forEach((zone) => {
    zone.pairs.forEach((pair) => {
      enrolledPairs.push({
        id: pair.id,
        player1Name: `${pair.player1.name} ${pair.player1.lastName}`,
        player1Dni: pair.player1.dni,
        player1Phone: pair.player1.phone,
        player1Email: pair.player1.email,
        player1IsMember: true,
        player2Name: `${pair.player2.name} ${pair.player2.lastName}`,
        player2Dni: pair.player2.dni,
        player2Phone: pair.player2.phone,
        player2Email: pair.player2.email,
        player2IsMember: true,
        category: tournament.category,
        registrationDate: tournament.startDate,
        paymentStatus: "paid",
        registrationSource: "web",
      });
    });
  });

  return enrolledPairs;
}

const statusConfig: Record<string, { label: string; className: string }> = {
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

const AVAILABLE_CATEGORIES = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"];

export function TournamentProDetail() {
  const { id } = useParams();
  const tournament = getTournamentProById(id || "") || tournamentsPro[0];

  const [enrolled, setEnrolled] = useState<EnrolledPair[]>(
    convertPairsToEnrolled(tournament),
  );
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

  // Match edit modal state
  const [matchToEdit, setMatchToEdit] = useState<Match | null>(null);
  const [editMatchForm, setEditMatchForm] = useState({
    set1Score1: "",
    set1Score2: "",
    set2Score1: "",
    set2Score2: "",
    set3Score1: "",
    set3Score2: "",
    status: "pendiente" as MatchStatus,
  });

  // Description editing state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  // Category and Gender selector state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    tournament.category,
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    tournament.gender,
  );

  // Collapsible sections state for matches
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const status = statusConfig[tournament.status];

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

  // Collect all matches from zones
  const allMatches = tournament.zones?.flatMap((zone) => zone.matches) || [];

  // Open edit match modal
  const openEditMatchModal = (match: Match) => {
    setMatchToEdit(match);
    setEditMatchForm({
      set1Score1: match.score1?.[0]?.toString() || "",
      set1Score2: match.score2?.[0]?.toString() || "",
      set2Score1: match.score1?.[1]?.toString() || "",
      set2Score2: match.score2?.[1]?.toString() || "",
      set3Score1: match.score1?.[2]?.toString() || "",
      set3Score2: match.score2?.[2]?.toString() || "",
      status: match.status,
    });
  };

  const closeEditMatchModal = () => {
    setMatchToEdit(null);
    setEditMatchForm({
      set1Score1: "",
      set1Score2: "",
      set2Score1: "",
      set2Score2: "",
      set3Score1: "",
      set3Score2: "",
      status: "pendiente",
    });
  };

  const handleSaveMatchResult = async () => {
    if (!matchToEdit) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Build scores arrays
    const score1: number[] = [];
    const score2: number[] = [];

    if (editMatchForm.set1Score1 && editMatchForm.set1Score2) {
      score1.push(parseInt(editMatchForm.set1Score1));
      score2.push(parseInt(editMatchForm.set1Score2));
    }
    if (editMatchForm.set2Score1 && editMatchForm.set2Score2) {
      score1.push(parseInt(editMatchForm.set2Score1));
      score2.push(parseInt(editMatchForm.set2Score2));
    }
    if (editMatchForm.set3Score1 && editMatchForm.set3Score2) {
      score1.push(parseInt(editMatchForm.set3Score1));
      score2.push(parseInt(editMatchForm.set3Score2));
    }

    console.log("Guardando resultado:", {
      matchId: matchToEdit.id,
      score1,
      score2,
      status: editMatchForm.status,
    });

    setIsSubmitting(false);
    closeEditMatchModal();
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
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {tournament.name}
                </h1>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold border ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-base text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-yellow-500" />
                {new Date(tournament.startDate).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                })}{" "}
                -{" "}
                {new Date(tournament.endDate).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
              {tournament.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  {tournament.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-yellow-500" />
                {tournament.pairsCount} parejas
              </span>
              {tournament.prize && (
                <span className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  {tournament.prize}
                </span>
              )}
            </div>
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

      {/* Editable Description Section - BEFORE TABS */}
      <div className="bg-slate-900 border border-white/5 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">
            Descripción del Torneo
          </h3>
          {!isEditingDescription && (
            <button
              onClick={() => {
                setIsEditingDescription(true);
                setEditedDescription(
                  tournament.description ||
                    "Torneo oficial de pádel organizado por la asociación deportiva. Participan las mejores parejas de la categoría en formato de zonas clasificatorias seguido de llaves eliminatorias.",
                );
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              Editar
            </button>
          )}
        </div>

        {isEditingDescription ? (
          <div className="space-y-4">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all resize-none leading-relaxed"
              placeholder="Describe el torneo..."
            />
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setIsEditingDescription(false);
                  setEditedDescription("");
                }}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // TODO: Save description to backend
                  console.log("Guardando descripción:", editedDescription);
                  setIsEditingDescription(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-medium rounded-lg transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 leading-relaxed">
            {tournament.description ||
              "Torneo oficial de pádel organizado por la asociación deportiva. Participan las mejores parejas de la categoría en formato de zonas clasificatorias seguido de llaves eliminatorias."}
          </p>
        )}
      </div>

      {/* Selector de Categoría y Género */}
      <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-sm font-medium text-slate-400">
            Seleccionar cuadro:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Categoría Select */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[120px] bg-slate-950 border-white/10 text-white h-10">
                <SelectValue placeholder="Categoría" />
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

            {/* Género Select */}
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-[140px] bg-slate-950 border-white/10 text-white h-10">
                <SelectValue placeholder="Género" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem
                  value="masculino"
                  className="text-white focus:bg-slate-800 focus:text-white"
                >
                  Masculino
                </SelectItem>
                <SelectItem
                  value="femenino"
                  className="text-white focus:bg-slate-800 focus:text-white"
                >
                  Femenino
                </SelectItem>
                <SelectItem
                  value="mixto"
                  className="text-white focus:bg-slate-800 focus:text-white"
                >
                  Mixto
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Badge mostrando selección actual */}
            <div className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <span className="text-sm font-medium text-yellow-400">
                {selectedCategory} -{" "}
                {selectedGender === "masculino"
                  ? "Masculino"
                  : selectedGender === "femenino"
                    ? "Femenino"
                    : "Mixto"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Sin la tab Info */}
      <Tabs defaultValue="parejas" className="space-y-6">
        <TabsList className="w-full grid grid-cols-4 bg-slate-800/50 border border-white/5 p-1">
          <TabsTrigger
            value="parejas"
            className="text-slate-300 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <Users className="w-4 h-4 mr-2" />
            Parejas
          </TabsTrigger>
          <TabsTrigger
            value="partidos"
            className="text-slate-300 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <Swords className="w-4 h-4 mr-2" />
            Partidos
          </TabsTrigger>
          <TabsTrigger
            value="zonas"
            className="text-slate-300 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Zonas
          </TabsTrigger>
          <TabsTrigger
            value="llaves"
            className="text-slate-300 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Llaves
          </TabsTrigger>
        </TabsList>

        {/* Parejas Tab (Management) */}
        <TabsContent value="parejas">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                  {
                    enrolled.filter((e) => e.registrationSource === "web")
                      .length
                  }
                </p>
                <span className="text-slate-500 text-sm">
                  /{" "}
                  {
                    enrolled.filter((e) => e.registrationSource === "manual")
                      .length
                  }{" "}
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
                  className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
                <Filter className="w-4 h-4" />
                <span>Estado:</span>
                <select
                  className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
                  value={paymentFilter}
                  onChange={(e) =>
                    setPaymentFilter(
                      e.target.value as "todos" | "paid" | "pending",
                    )
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
                  className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
                  value={sourceFilter}
                  onChange={(e) =>
                    setSourceFilter(
                      e.target.value as "todos" | "web" | "manual",
                    )
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
                  className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
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
                              <User className="w-3 h-3 text-yellow-400" />
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
                              <User className="w-3 h-3 text-orange-400" />
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
                            <span className="inline-flex items-center gap-1 text-blue-400 text-xs font-medium bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                              <Globe className="w-3 h-3" /> Web
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-medium bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
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
                              className={`w-[140px] border-0 h-8 text-xs font-medium ${
                                pair.paymentStatus === "paid"
                                  ? "bg-green-500/10 text-green-400 focus:ring-green-500/50"
                                  : "bg-yellow-500/10 text-yellow-400 focus:ring-yellow-500/50"
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
                      <td
                        colSpan={6}
                        className="p-8 text-center text-slate-500"
                      >
                        No se encontraron parejas que coincidan con los filtros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Zonas Tab */}
        <TabsContent value="zonas">
          {tournament.zones && tournament.zones.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tournament.zones.map((zone) => (
                <div
                  key={zone.id}
                  className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 bg-slate-800/50">
                    <h3 className="text-lg font-bold text-white">
                      {zone.name}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="p-3 text-xs font-semibold text-slate-400 text-center">
                            #
                          </th>
                          <th className="p-3 text-xs font-semibold text-slate-400 text-left">
                            Pareja
                          </th>
                          <th className="p-3 text-xs font-semibold text-slate-400 text-center">
                            PJ
                          </th>
                          <th className="p-3 text-xs font-semibold text-slate-400 text-center">
                            PG
                          </th>
                          <th className="p-3 text-xs font-semibold text-slate-400 text-center">
                            PP
                          </th>
                          <th className="p-3 text-xs font-semibold text-slate-400 text-center">
                            PTS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {zone.standings.map((standing, index) => {
                          const isQualifying = index < 2;
                          return (
                            <tr
                              key={standing.pair.id}
                              className={
                                isQualifying
                                  ? "bg-green-500/5"
                                  : "hover:bg-white/5"
                              }
                            >
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {isQualifying ? (
                                    <ArrowUp className="w-3 h-3 text-green-400" />
                                  ) : (
                                    <Minus className="w-3 h-3 text-slate-500" />
                                  )}
                                  <span
                                    className={`font-bold ${
                                      isQualifying
                                        ? "text-green-400"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {index + 1}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3">
                                <p className="font-semibold text-white">
                                  {standing.pair.player1.lastName} /{" "}
                                  {standing.pair.player2.lastName}
                                </p>
                              </td>
                              <td className="p-3 text-center text-slate-400">
                                {standing.played}
                              </td>
                              <td className="p-3 text-center text-green-400 font-medium">
                                {standing.won}
                              </td>
                              <td className="p-3 text-center text-red-400">
                                {standing.lost}
                              </td>
                              <td className="p-3 text-center">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/20 font-bold text-yellow-400">
                                  {standing.points}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-800/30 border-t border-white/5">
                    <ArrowUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-slate-400">
                      Clasifican los primeros 2 de cada zona
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-white/5 rounded-xl p-12 text-center">
              <Grid3X3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-white">
                No hay zonas definidas
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Las zonas se crearán cuando comience el torneo
              </p>
            </div>
          )}
        </TabsContent>

        {/* Partidos Tab */}
        <TabsContent value="partidos">
          <div className="space-y-6">
            {/* Partidos de Zonas */}
            {allMatches.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Grid3X3 className="w-5 h-5 text-yellow-400" />
                  Partidos de Fase de Grupos
                </h2>
                {tournament.zones?.map((zone) => {
                  const isCollapsed = collapsedSections.has(`zone-${zone.id}`);
                  return (
                    <div
                      key={zone.id}
                      className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(`zone-${zone.id}`)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <h3 className="text-lg font-bold text-white">
                          {zone.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">
                            {zone.matches.length} partidos
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              isCollapsed ? "" : "rotate-180"
                            }`}
                          />
                        </div>
                      </button>
                      {!isCollapsed && (
                        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {zone.matches.map((match) => (
                            <div
                              key={match.id}
                              className="bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:border-yellow-500/20 transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span
                                  className={`text-xs font-medium px-2 py-1 rounded ${
                                    match.status === "finalizado"
                                      ? "bg-slate-700 text-slate-300"
                                      : match.status === "en-juego"
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-blue-500/10 text-blue-400"
                                  }`}
                                >
                                  {match.status === "finalizado"
                                    ? "Finalizado"
                                    : match.status === "en-juego"
                                      ? "En Juego"
                                      : "Pendiente"}
                                </span>
                                {match.court && (
                                  <span className="text-xs text-slate-400">
                                    {match.court}
                                  </span>
                                )}
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

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-4 w-full bg-transparent text-white"
                                  onClick={() => openEditMatchModal(match)}
                                >
                                  {match.status === "pendiente" ? (
                                    <Plus className="mr-2 h-3 w-3" />
                                  ) : (
                                    <Pencil className="mr-2 h-3 w-3" />
                                  )}
                                  {match.status === "pendiente"
                                    ? "Cargar"
                                    : "Editar"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Partidos de Llaves Eliminatorias */}
            {tournament.bracket && tournament.bracket.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-yellow-400" />
                  Partidos de Llaves Eliminatorias
                </h2>
                {Array.from(new Set(tournament.bracket.map((m) => m.round)))
                  .sort((a, b) => a - b)
                  .map((round) => {
                    const roundMatches = tournament.bracket!.filter(
                      (m) => m.round === round,
                    );
                    const roundName =
                      round === 1
                        ? "Cuartos de Final"
                        : round === 2
                          ? "Semifinales"
                          : "Final";
                    const isCollapsed = collapsedSections.has(
                      `bracket-${round}`,
                    );

                    return (
                      <div
                        key={round}
                        className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(`bracket-${round}`)}
                          className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <h3 className="text-lg font-bold text-yellow-400">
                            {roundName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400">
                              {roundMatches.length} partidos
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 transition-transform ${
                                isCollapsed ? "" : "rotate-180"
                              }`}
                            />
                          </div>
                        </button>
                        {!isCollapsed && (
                          <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roundMatches.map((match) => (
                              <div
                                key={match.id}
                                className="bg-slate-800/50 border border-white/5 rounded-xl p-4 hover:border-yellow-500/20 transition-all"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span
                                    className={`text-xs font-medium px-2 py-1 rounded ${
                                      match.status === "finalizado"
                                        ? "bg-slate-700 text-slate-300"
                                        : match.status === "en-juego"
                                          ? "bg-red-500/10 text-red-400"
                                          : "bg-blue-500/10 text-blue-400"
                                    }`}
                                  >
                                    {match.status === "finalizado"
                                      ? "Finalizado"
                                      : match.status === "en-juego"
                                        ? "En Juego"
                                        : "Pendiente"}
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-white font-medium">
                                      {match.pair1
                                        ? `${match.pair1.player1.lastName} / ${match.pair1.player2.lastName}`
                                        : "Por definir"}
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
                                      {match.pair2
                                        ? `${match.pair2.player1.lastName} / ${match.pair2.player2.lastName}`
                                        : "Por definir"}
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

                                  {match.pair1 && match.pair2 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="mt-4 w-full bg-transparent text-white"
                                      onClick={() =>
                                        openEditMatchModal(
                                          match as unknown as Match,
                                        )
                                      }
                                    >
                                      {match.status === "pendiente" ? (
                                        <Plus className="mr-2 h-3 w-3" />
                                      ) : (
                                        <Pencil className="mr-2 h-3 w-3" />
                                      )}
                                      {match.status === "pendiente"
                                        ? "Cargar"
                                        : "Editar"}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Empty State */}
            {allMatches.length === 0 &&
              (!tournament.bracket || tournament.bracket.length === 0) && (
                <div className="bg-slate-900 border border-white/5 rounded-xl p-12 text-center">
                  <Swords className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-white">
                    No hay partidos programados
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Los partidos se crearán cuando comience el torneo
                  </p>
                </div>
              )}
          </div>
        </TabsContent>

        {/* Llaves Tab */}
        <TabsContent value="llaves">
          {tournament.bracket && tournament.bracket.length > 0 ? (
            <div className="bg-slate-900 border border-white/5 rounded-xl p-6 overflow-x-auto">
              <BracketView
                layers={Array.from(
                  new Set(tournament.bracket.map((m) => m.round)),
                )
                  .sort((a, b) => a - b)
                  .map((round) => {
                    const matches = tournament.bracket!.filter(
                      (m) => m.round === round,
                    );
                    const name =
                      round === 1
                        ? "Cuartos de Final"
                        : round === 2
                          ? "Semifinales"
                          : "Final";

                    return {
                      name,
                      matches: matches.map((m) => ({
                        id: m.id,
                        pair1: m.pair1
                          ? {
                              player1: {
                                name: m.pair1.player1.name,
                                lastName: m.pair1.player1.lastName,
                              },
                              player2: {
                                name: m.pair1.player2.name,
                                lastName: m.pair1.player2.lastName,
                              },
                            }
                          : null,
                        pair2: m.pair2
                          ? {
                              player1: {
                                name: m.pair2.player1.name,
                                lastName: m.pair2.player1.lastName,
                              },
                              player2: {
                                name: m.pair2.player2.name,
                                lastName: m.pair2.player2.lastName,
                              },
                            }
                          : null,
                        score1: m.score1,
                        score2: m.score2,
                        winner: m.winner
                          ? m.winner.id === m.pair1?.id
                            ? 1
                            : 2
                          : null,
                        status:
                          m.status === "finalizado"
                            ? "finished"
                            : m.status === "en-juego"
                              ? "en-juego"
                              : "pending",
                      })),
                    };
                  })}
              />
            </div>
          ) : (
            <div className="bg-slate-900 border border-white/5 rounded-xl p-12 text-center">
              <GitBranch className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-white">
                Llaves no disponibles
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Las llaves eliminatorias estarán disponibles una vez finalizada
                la fase de grupos
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* New Pair Modal - reusing the same modal structure */}
      {isNewPairModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeNewPairModal}
          />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <UserPlus className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Agregar Pareja
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
              className="p-6 overflow-y-auto space-y-6"
            >
              {/* Player 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <span className="text-yellow-400 text-xs font-bold">1</span>
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-4 h-4 rounded border-white/20 bg-slate-950 text-yellow-500 focus:ring-yellow-500/50"
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
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-400 text-xs font-bold">2</span>
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
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
                        className="w-4 h-4 rounded border-white/20 bg-slate-950 text-yellow-500 focus:ring-yellow-500/50"
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
                <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-4">
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
                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Agregar Pareja
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
              ¿Eliminar pareja{" "}
              <span className="font-bold">
                {pairToDelete.player1Name} / {pairToDelete.player2Name}
              </span>
              ?
            </>
          }
          description="Se eliminará permanentemente esta pareja del torneo. Esta acción no se puede deshacer."
          confirmButton={{
            icon: Trash2,
            label: "Eliminar pareja",
            variant: "destructive",
            onConfirm: handleDeletePair,
          }}
          cancelButton={{
            label: "Cancelar",
            variant: "outline",
            onCancel: () => setPairToDelete(null),
          }}
        />
      )}

      {/* Edit Match Result Modal */}
      {matchToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeEditMatchModal}
          />
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {/* Header - Status Bar */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-800/50 px-5 py-3">
              <div className="flex items-center gap-3">
                <Swords className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-white">
                  Editar Resultado
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {matchToEdit.time && <span>{matchToEdit.time}</span>}
                {matchToEdit.court && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {matchToEdit.court}
                  </span>
                )}
                <button
                  onClick={closeEditMatchModal}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Match Content */}
            <div className="p-5">
              {/* Pair 1 */}
              <div className="flex items-center justify-between rounded-xl p-4 bg-slate-800/30 border border-white/5">
                <div>
                  <p className="font-semibold text-white">
                    {matchToEdit.pair1.player1.name}{" "}
                    {matchToEdit.pair1.player1.lastName}
                  </p>
                  <p className="text-sm text-slate-400">
                    {matchToEdit.pair1.player2.name}{" "}
                    {matchToEdit.pair1.player2.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set1Score1}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set1Score1: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-950 border border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="-"
                  />
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set2Score1}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set2Score1: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-950 border border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="-"
                  />
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set3Score1}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set3Score1: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-800/50 border border-dashed border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 placeholder:text-slate-600"
                    placeholder="3°"
                  />
                </div>
              </div>

              {/* VS Divider */}
              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  VS
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Pair 2 */}
              <div className="flex items-center justify-between rounded-xl p-4 bg-slate-800/30 border border-white/5">
                <div>
                  <p className="font-semibold text-white">
                    {matchToEdit.pair2.player1.name}{" "}
                    {matchToEdit.pair2.player1.lastName}
                  </p>
                  <p className="text-sm text-slate-400">
                    {matchToEdit.pair2.player2.name}{" "}
                    {matchToEdit.pair2.player2.lastName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set1Score2}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set1Score2: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-950 border border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="-"
                  />
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set2Score2}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set2Score2: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-950 border border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
                    placeholder="-"
                  />
                  <input
                    type="number"
                    min="0"
                    max="7"
                    value={editMatchForm.set3Score2}
                    onChange={(e) =>
                      setEditMatchForm((prev) => ({
                        ...prev,
                        set3Score2: e.target.value,
                      }))
                    }
                    className="w-12 h-12 bg-slate-800/50 border border-dashed border-white/10 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 placeholder:text-slate-600"
                    placeholder="3°"
                  />
                </div>
              </div>

              {/* Set Labels */}
              <div className="flex justify-end mt-2 pr-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
                  <span className="w-12 text-center">Set 1</span>
                  <span className="w-12 text-center">Set 2</span>
                  <span className="w-12 text-center">Set 3</span>
                </div>
              </div>
            </div>

            {/* Status Selector */}
            <div className="px-5 pb-5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Estado del partido
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setEditMatchForm((prev) => ({
                      ...prev,
                      status: "pendiente",
                    }))
                  }
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    editMatchForm.status === "pendiente"
                      ? "bg-blue-500/20 text-blue-400 border-2 border-blue-500/50"
                      : "bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${editMatchForm.status === "pendiente" ? "bg-blue-400" : "bg-slate-500"}`}
                  />
                  Pendiente
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditMatchForm((prev) => ({
                      ...prev,
                      status: "en-juego",
                    }))
                  }
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    editMatchForm.status === "en-juego"
                      ? "bg-red-500/20 text-red-400 border-2 border-red-500/50"
                      : "bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full animate-pulse ${editMatchForm.status === "en-juego" ? "bg-red-400" : "bg-slate-500"}`}
                  />
                  En Juego
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditMatchForm((prev) => ({
                      ...prev,
                      status: "finalizado",
                    }))
                  }
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    editMatchForm.status === "finalizado"
                      ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50"
                      : "bg-slate-800 text-slate-400 border border-white/5 hover:bg-slate-700"
                  }`}
                >
                  <CheckCircle
                    className={`w-3.5 h-3.5 ${editMatchForm.status === "finalizado" ? "text-emerald-400" : "text-slate-500"}`}
                  />
                  Finalizado
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/5 bg-slate-800/30 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditMatchModal}
                className="px-5 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveMatchResult}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-yellow-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Guardar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
