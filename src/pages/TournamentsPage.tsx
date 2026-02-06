import { useState, useMemo } from "react";
import {
  Trophy,
  Calendar,
  CheckCircle,
  Zap,
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  ClipboardList,
  ArrowRight,
  X,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Mail,
  Edit2,
  CreditCard,
  Flame,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
type TournamentStatus =
  | "inscripciones-abiertas"
  | "en-curso"
  | "proximo"
  | "finalizado";

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  categories: string[];
  gender: ("masculino" | "femenino" | "mixto")[];
  status: TournamentStatus;
  registrationDeadline?: string;
  pairsCount?: number;
  maxPairs?: number;
  prize?: string;
  price?: number;
  lastSpots?: boolean;
}

// Mock Data
const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: "Torneo Apertura 2026",
    startDate: "2026-02-15",
    endDate: "2026-02-20",
    location: "Club Náutico Mar del Plata",
    categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
    gender: ["masculino", "femenino"],
    status: "en-curso",
    pairsCount: 64,
    maxPairs: 64,
    prize: "$200.000 + Trofeos",
  },
  //   {
  //     id: 2,
  //     name: "Copa Verano MdP",
  //     startDate: "2026-02-10",
  //     endDate: "2026-02-14",
  //     location: "Pádel Zone",
  //     categories: ["3ra", "4ta", "5ta"],
  //     gender: ["masculino"],
  //     status: "en-curso",
  //     pairsCount: 32,
  //     maxPairs: 32,
  //     prize: "$150.000",
  //   },
  {
    id: 3,
    name: "Circuito Femenino - Fecha 1",
    startDate: "2026-03-01",
    endDate: "2026-03-03",
    location: "Los Naranjos",
    categories: ["3ra", "4ta", "5ta", "6ta", "7ma"],
    gender: ["femenino"],
    status: "inscripciones-abiertas",
    registrationDeadline: "2026-02-25",
    pairsCount: 18,
    maxPairs: 32,
    price: 14000,
    prize: "$100.000 + Trofeos",
    lastSpots: true,
  },
  {
    id: 4,
    name: "Torneo Express Fin de Semana",
    startDate: "2026-03-10",
    endDate: "2026-03-12",
    location: "Paddle Point",
    categories: ["4ta", "5ta", "6ta"],
    gender: ["masculino", "mixto"],
    status: "inscripciones-abiertas",
    registrationDeadline: "2026-03-07",
    pairsCount: 12,
    maxPairs: 24,
    price: 12000,
    prize: "$80.000",
  },
  {
    id: 5,
    name: "Copa Otoño",
    startDate: "2026-04-05",
    endDate: "2026-04-10",
    location: "Club Náutico Mar del Plata",
    categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
    gender: ["masculino", "femenino"],
    status: "proximo",
    registrationDeadline: "2026-03-28",
    maxPairs: 64,
    price: 18000,
    prize: "$250.000 + Trofeos",
  },
  {
    id: 6,
    name: "Torneo Aniversario Club Raqueta",
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    location: "Club de Raqueta",
    categories: ["2da", "3ra", "4ta", "5ta"],
    gender: ["masculino", "femenino", "mixto"],
    status: "proximo",
    registrationDeadline: "2026-04-15",
    maxPairs: 48,
    price: 15000,
    prize: "$180.000",
  },
  {
    id: 7,
    name: "Torneo Clausura 2025",
    startDate: "2025-11-15",
    endDate: "2025-11-22",
    location: "Club Náutico Mar del Plata",
    categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
    gender: ["masculino", "femenino"],
    status: "finalizado",
    pairsCount: 58,
    maxPairs: 64,
    prize: "$200.000 + Trofeos",
  },
  {
    id: 8,
    name: "Copa Invierno 2025",
    startDate: "2025-08-10",
    endDate: "2025-08-15",
    location: "Pádel Zone",
    categories: ["3ra", "4ta", "5ta", "6ta"],
    gender: ["masculino"],
    status: "finalizado",
    pairsCount: 40,
    maxPairs: 48,
    prize: "$120.000",
  },
];

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
  });
}

function getStatusConfig(status: TournamentStatus) {
  switch (status) {
    case "en-curso":
      return {
        label: "En Curso",
        headerLabel: "Jugándose ahora",
        color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      };
    case "inscripciones-abiertas":
      return {
        label: "Inscripciones Abiertas",
        headerLabel: "Inscripciones hasta:",
        color: "bg-green-500/10 border-green-500/20 text-green-400",
      };
    case "proximo":
      return {
        label: "Próximo",
        headerLabel: "Próximamente",
        color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      };
    case "finalizado":
      return {
        label: "Finalizado",
        headerLabel: "Finalizado",
        color: "bg-slate-500/10 border-slate-500/20 text-slate-400",
      };
  }
}

// Tournament Card Component (matching Tournaments.tsx style)
function TournamentCard({
  tournament,
  onRegister,
}: {
  tournament: Tournament;
  onRegister: (tournament: Tournament) => void;
}) {
  const statusConfig = getStatusConfig(tournament.status);
  const canRegister = tournament.status === "inscripciones-abiertas";

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-slate-900 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 h-full flex flex-col rounded-3xl">
      {/* Last Spots Badge */}
      {tournament.lastSpots && canRegister && (
        <div className="absolute top-4 right-4 z-20 animate-pulse">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 shadow-lg shadow-orange-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Flame className="w-3.5 h-3.5 mr-1.5 fill-white" />
            Últimos lugares
          </Badge>
        </div>
      )}

      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="relative bg-slate-800/50 px-8 py-8 shrink-0">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors text-balance leading-tight">
              {tournament.name}
            </h3>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mt-4 ${statusConfig.color}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  tournament.status === "en-curso"
                    ? "bg-amber-400 animate-ping"
                    : ""
                } ${tournament.status === "inscripciones-abiertas" ? "bg-green-400" : ""} ${
                  tournament.status === "proximo" ? "bg-blue-400" : ""
                } ${tournament.status === "finalizado" ? "bg-slate-400" : ""}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  tournament.status === "en-curso" ? "bg-amber-500" : ""
                } ${tournament.status === "inscripciones-abiertas" ? "bg-green-500" : ""} ${
                  tournament.status === "proximo" ? "bg-blue-500" : ""
                } ${tournament.status === "finalizado" ? "bg-slate-500" : ""}`}
              ></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {statusConfig.headerLabel}{" "}
              {tournament.status === "inscripciones-abiertas" &&
                tournament.registrationDeadline &&
                formatDate(tournament.registrationDeadline)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 flex flex-col flex-1">
          <div className="space-y-4 flex-1">
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
              <div>
                <p className="text-white font-medium">
                  {formatDate(tournament.startDate)} -{" "}
                  {formatDate(tournament.endDate)}
                </p>
                <p className="text-slate-500 text-sm">Fecha</p>
              </div>
            </div>

            {tournament.location && (
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
                <div>
                  <p className="text-white font-medium">
                    {tournament.location}
                  </p>
                  <p className="text-slate-500 text-sm">Sede</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <Users className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
              <div>
                <p className="text-white font-medium capitalize">
                  {tournament.gender.join(", ")}
                </p>
                <p className="text-slate-500 text-sm">Modalidad</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Trophy className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
              <div>
                <p className="text-white font-medium">
                  {tournament.categories.slice(0, 3).join(", ")}
                  {tournament.categories.length > 3 && "..."}
                </p>
                <p className="text-slate-500 text-sm">Categorías</p>
              </div>
            </div>

            {tournament.prize && (
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 flex items-center justify-center text-green-500 mt-1 font-bold text-lg">
                  $
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {tournament.prize}
                  </p>
                  <p className="text-slate-500 text-sm">Premios</p>
                </div>
              </div>
            )}
          </div>

          {/* Button */}
          <div className="mt-auto">
            {canRegister ? (
              <Button
                onClick={() => onRegister(tournament)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6 font-bold text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer"
              >
                Inscribirse
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl py-6 font-bold text-lg transition-all cursor-pointer"
              >
                Ver Detalles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TournamentSection({
  title,
  icon: Icon,
  iconColor,
  tournaments,
  showLiveIndicator = false,
  onRegister,
}: {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  tournaments: Tournament[];
  showLiveIndicator?: boolean;
  onRegister: (tournament: Tournament) => void;
}) {
  if (tournaments.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        {showLiveIndicator && (
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-amber-500 opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-amber-500" />
          </div>
        )}
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        {/* <Badge variant="secondary" className="ml-2 bg-slate-800 text-slate-300">
          {tournaments.length}
        </Badge> */}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            onRegister={onRegister}
          />
        ))}
      </div>
    </section>
  );
}

// Filter options
const categoryFilters = [
  { value: "all", label: "Todas" },
  { value: "1ra", label: "1ra" },
  { value: "2da", label: "2da" },
  { value: "3ra", label: "3ra" },
  { value: "4ta", label: "4ta" },
  { value: "5ta", label: "5ta" },
  { value: "6ta", label: "6ta" },
  { value: "7ma", label: "7ma" },
];

const genderFilters = [
  { value: "all", label: "Todos" },
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "mixto", label: "Mixto" },
];

// Main Component
export function TournamentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    TournamentStatus | "all"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Modal State
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [paymentStep, setPaymentStep] = useState<
    "form" | "checkout" | "processing" | "success"
  >("form");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formData, setFormData] = useState({
    player1Name: "",
    player1Dni: "",
    player1MemberId: "",
    player1Email: "",
    player1Phone: "",
    player2Name: "",
    player2Dni: "",
    player2MemberId: "",
    player2Email: "",
    player2Phone: "",
    category: "",
  });

  // Filter logic
  const filteredTournaments = useMemo(() => {
    return mockTournaments.filter((t) => {
      const matchesStatus =
        selectedStatus === "all" || t.status === selectedStatus;
      const matchesSearch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || t.categories.includes(selectedCategory);
      const matchesGender =
        selectedGender === "all" ||
        t.gender.includes(selectedGender as "masculino" | "femenino" | "mixto");
      return matchesStatus && matchesSearch && matchesCategory && matchesGender;
    });
  }, [selectedStatus, searchQuery, selectedCategory, selectedGender]);

  // Group by status
  const enCurso = filteredTournaments.filter((t) => t.status === "en-curso");
  const inscripcionesAbiertas = filteredTournaments.filter(
    (t) => t.status === "inscripciones-abiertas",
  );
  const proximos = filteredTournaments.filter((t) => t.status === "proximo");
  const finalizados = filteredTournaments.filter(
    (t) => t.status === "finalizado",
  );

  const statusFilters = [
    { value: "all", label: "Todos" },
    { value: "en-curso", label: "En Curso" },
    { value: "inscripciones-abiertas", label: "Inscripciones" },
    { value: "proximo", label: "Próximos" },
    { value: "finalizado", label: "Finalizados" },
  ];

  const hasActiveFilters =
    selectedStatus !== "all" ||
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedGender !== "all";

  const clearFilters = () => {
    setSelectedStatus("all");
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedGender("all");
  };

  // Stats
  const stats = {
    total: mockTournaments.length,
    enCurso: mockTournaments.filter((t) => t.status === "en-curso").length,
    abiertas: mockTournaments.filter(
      (t) => t.status === "inscripciones-abiertas",
    ).length,
  };

  // Modal handlers
  const handleRegistration = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setPaymentStep("form");
    setFormData({
      player1Name: "",
      player1Dni: "",
      player1MemberId: "",
      player1Email: "",
      player1Phone: "",
      player2Name: "",
      player2Dni: "",
      player2MemberId: "",
      player2Email: "",
      player2Phone: "",
      category: "",
    });
  };

  const closeModal = () => {
    setSelectedTournament(null);
    setPaymentStep("form");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!selectedTournament)
      return { subtotal: 0, discount: 0, total: 0, memberCount: 0 };

    const total = selectedTournament.price || 0;
    let discount = 0;
    let memberCount = 0;
    const MEMBER_DISCOUNT = total * 0.1;

    if (formData.player1MemberId) {
      discount += MEMBER_DISCOUNT;
      memberCount++;
    }
    if (formData.player2MemberId) {
      discount += MEMBER_DISCOUNT;
      memberCount++;
    }

    return {
      subtotal: total,
      discount,
      total: total - discount,
      memberCount,
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    setTimeout(() => {
      setIsSubmittingForm(false);
      setPaymentStep("checkout");
    }, 1000);
  };

  const processPayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 pt-20 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Nuestros{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                  Torneos
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-xl">
                Seguí el estado de todos los torneos de la asociación.
                Inscribite, consultá fixtures y resultados.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-white/5">
                <Trophy className="h-4 w-4 text-blue-400" />
                <span className="text-sm">
                  <span className="font-semibold text-white">
                    {stats.total}
                  </span>{" "}
                  <span className="text-slate-400">torneos</span>
                </span>
              </div>
              {stats.enCurso > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-sm">
                    <span className="font-semibold text-amber-400">
                      {stats.enCurso}
                    </span>{" "}
                    <span className="text-slate-400">en curso</span>
                  </span>
                </div>
              )}
              {stats.abiertas > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <ClipboardList className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">
                    <span className="font-semibold text-emerald-400">
                      {stats.abiertas}
                    </span>{" "}
                    <span className="text-slate-400">abiertos</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8 space-y-10">
          {/* Filters */}
          <div>
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full justify-between border-white/10 bg-slate-900/50"
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge className="bg-blue-600 text-white text-xs px-1.5">
                      Activos
                    </Badge>
                  )}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </Button>
            </div>

            {/* Filters Container */}
            <div
              className={`${showFilters ? "block" : "hidden"} md:block bg-slate-900/50 p-4 md:p-6 rounded-2xl border border-white/5`}
            >
              <div className="flex flex-col gap-4">
                {/* First Row: Search + Selects */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="Buscar torneo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-950 border-white/10 text-white h-11 placeholder:text-slate-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Category Select */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 shrink-0 hidden sm:inline">
                      Categoría:
                    </span>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-[130px] bg-slate-950 border-white/10 text-white h-11">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        {categoryFilters.map((filter) => (
                          <SelectItem
                            key={filter.value}
                            value={filter.value}
                            className="focus:bg-slate-800 focus:text-white"
                          >
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Gender Select */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 shrink-0 hidden sm:inline">
                      Género:
                    </span>
                    <Select
                      value={selectedGender}
                      onValueChange={setSelectedGender}
                    >
                      <SelectTrigger className="w-[140px] bg-slate-950 border-white/10 text-white h-11">
                        <SelectValue placeholder="Género" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        {genderFilters.map((filter) => (
                          <SelectItem
                            key={filter.value}
                            value={filter.value}
                            className="focus:bg-slate-800 focus:text-white"
                          >
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-slate-400 hover:text-white shrink-0"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>

                {/* Second Row: Status Pills */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm text-slate-400 shrink-0">
                    Estado:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {statusFilters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() =>
                          setSelectedStatus(
                            filter.value as TournamentStatus | "all",
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          selectedStatus === filter.value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Sections */}
          <div className="space-y-12">
            {/* En Curso */}
            <TournamentSection
              title="Torneos en Curso"
              icon={Zap}
              iconColor="text-amber-400"
              tournaments={enCurso}
              showLiveIndicator={true}
              onRegister={handleRegistration}
            />

            {/* Inscripciones Abiertas */}
            <TournamentSection
              title="Inscripciones Abiertas"
              icon={ClipboardList}
              iconColor="text-emerald-400"
              tournaments={inscripcionesAbiertas}
              onRegister={handleRegistration}
            />

            {/* Próximos */}
            <TournamentSection
              title="Próximos Torneos"
              icon={Calendar}
              iconColor="text-blue-400"
              tournaments={proximos}
              onRegister={handleRegistration}
            />

            {/* Finalizados */}
            <TournamentSection
              title="Torneos Finalizados"
              icon={CheckCircle}
              iconColor="text-slate-400"
              tournaments={finalizados}
              onRegister={handleRegistration}
            />

            {/* Empty State */}
            {filteredTournaments.length === 0 && (
              <div className="text-center py-16">
                <Trophy className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No se encontraron torneos
                </h3>
                <p className="text-slate-400 mb-6">
                  Probá ajustando los filtros o la búsqueda
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Registration Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-50"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col flex-1 overflow-hidden">
              {paymentStep === "form" && (
                <>
                  <div className="px-8 pt-10 pb-4 shrink-0 text-center z-10 bg-slate-900">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Inscripción al Torneo
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {selectedTournament.name}
                    </p>
                  </div>

                  <div className="px-8 flex-1 overflow-y-auto pb-4 custom-scrollbar">
                    <form
                      id="tournament-form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label className="text-slate-300">Categoría</Label>
                        <Select
                          required
                          onValueChange={(val) =>
                            setFormData((prev) => ({ ...prev, category: val }))
                          }
                        >
                          <SelectTrigger className="w-full bg-slate-950/50 border-white/10 text-white h-12">
                            <SelectValue placeholder="Seleccionar Categoría" />
                          </SelectTrigger>
                          <SelectContent className="z-[200] bg-slate-900 border-white/10 text-white">
                            {selectedTournament.categories.map((cat) => (
                              <SelectItem
                                key={cat}
                                value={cat}
                                className="focus:bg-slate-800 focus:text-white"
                              >
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                            1
                          </span>
                          <h4 className="text-sm font-medium text-white">
                            Datos primer Jugador
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player1Name"
                              value={formData.player1Name}
                              placeholder="Nombre y Apellido"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                          <Input
                            required
                            name="player1Dni"
                            value={formData.player1Dni}
                            placeholder="DNI"
                            className="bg-slate-950/50 border-white/10 text-white h-11"
                            onChange={handleInputChange}
                          />
                          <Input
                            name="player1MemberId"
                            value={formData.player1MemberId}
                            placeholder="N° Socio (Opcional)"
                            className="bg-slate-950/50 border-white/10 text-white h-11"
                            onChange={handleInputChange}
                          />
                          <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player1Phone"
                              value={formData.player1Phone}
                              placeholder="Teléfono"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="relative sm:col-span-2">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player1Email"
                              value={formData.player1Email}
                              type="email"
                              placeholder="Email"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                            2
                          </span>
                          <h4 className="text-sm font-medium text-white">
                            Datos segundo Jugador
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player2Name"
                              value={formData.player2Name}
                              placeholder="Nombre y Apellido"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                          <Input
                            required
                            name="player2Dni"
                            value={formData.player2Dni}
                            placeholder="DNI"
                            className="bg-slate-950/50 border-white/10 text-white h-11"
                            onChange={handleInputChange}
                          />
                          <Input
                            name="player2MemberId"
                            value={formData.player2MemberId}
                            placeholder="N° Socio (Opcional)"
                            className="bg-slate-950/50 border-white/10 text-white h-11"
                            onChange={handleInputChange}
                          />
                          <div className="relative">
                            <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player2Phone"
                              value={formData.player2Phone}
                              placeholder="Teléfono"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="relative sm:col-span-2">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                            <Input
                              required
                              name="player2Email"
                              value={formData.player2Email}
                              type="email"
                              placeholder="Email"
                              className="pl-10 bg-slate-950/50 border-white/10 text-white h-11"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="p-8 pt-4 bg-slate-900 border-t border-white/5 shrink-0 z-20">
                    <Button
                      type="submit"
                      form="tournament-form"
                      disabled={isSubmittingForm}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12"
                    >
                      {isSubmittingForm ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Continuar al Pago"
                      )}
                    </Button>
                  </div>
                </>
              )}

              {paymentStep === "checkout" && (
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="px-8 pt-10 text-center shrink-0">
                    <h3 className="text-2xl font-bold text-white">
                      Resumen de Pago
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                    <div className="bg-slate-950/50 rounded-3xl p-6 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Inscripción</span>
                        <span className="text-white font-medium">
                          {selectedTournament.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Categoría</span>
                        <span className="text-white font-medium">
                          {formData.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-400">
                        <span>Pareja</span>
                        <span className="text-white font-medium text-right text-sm">
                          {formData.player1Name} / {formData.player2Name}
                        </span>
                      </div>
                      <div className="h-px bg-white/5" />

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-slate-400 text-sm">
                          <span>Subtotal</span>
                          <span>
                            ${calculateTotal().subtotal.toLocaleString()}
                          </span>
                        </div>
                        {calculateTotal().discount > 0 && (
                          <div className="flex justify-between items-center text-green-400 text-sm">
                            <span>
                              Descuento Socios (
                              {calculateTotal().memberCount * 10}%)
                            </span>
                            <span>
                              -${calculateTotal().discount.toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-lg font-bold text-white">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-blue-400">
                            ${calculateTotal().total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0 shrink-0 space-y-3 z-20 bg-slate-900 pb-8">
                    <Button
                      onClick={processPayment}
                      className="w-full h-16 bg-[#009EE3] hover:bg-[#0089C7] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg shadow-[#009EE3]/20"
                    >
                      <CreditCard className="w-6 h-6" />
                      Ir a Pagar
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setPaymentStep("form")}
                      className="w-full text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Editar Datos
                    </Button>
                  </div>
                </div>
              )}

              {paymentStep === "processing" && (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center animate-in zoom-in duration-300 p-8">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-[#009EE3] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#009EE3] rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-bold text-xl">
                      Procesando pago
                    </p>
                    <p className="text-slate-400 text-sm">
                      Estamos conectando con Mercado Pago...
                    </p>
                  </div>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="h-full flex flex-col justify-center space-y-8 text-center p-8 pt-10 animate-in zoom-in duration-300">
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-bold text-white">
                        ¡Inscripción Exitosa!
                      </h3>
                      <p className="text-slate-400">
                        Tu equipo ha sido inscripto correctamente. Nos vamos a
                        contactar a la brevedad.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={closeModal}
                    className="w-full h-14 bg-white text-slate-950 hover:bg-slate-200 font-bold rounded-2xl cursor-pointer"
                  >
                    Cerrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
