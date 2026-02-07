import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Trophy,
  CreditCard,
  X,
  CheckCircle2,
  Loader2,
  Clock,
  User,
  Phone,
  Mail,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  categories: string[];
  gender: ("masculino" | "femenino" | "mixto")[];
  registrationDeadline: string;
  pairsCount: number;
  status: "abierto" | "proximamente" | "finalizado";
  price: number;
  prize?: string;
  champion?: {
    player1: { name: string; lastName: string };
    player2: { name: string; lastName: string };
  };
  lastSpots?: boolean;
}

export function Tournaments() {
  const [selectedTournament, setSelectedTournament] =
    useState<Tournament | null>(null);
  const [paymentStep, setPaymentStep] = useState<
    "form" | "checkout" | "processing" | "success"
  >("form");

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

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // MOCK DATA - Filtered for open tournaments mostly, but keeping structure
  const allTournaments: Tournament[] = [
    {
      id: 1,
      name: "Gran Abierto de Verano",
      startDate: "2026-02-15",
      endDate: "2026-02-17",
      location: "Club Los Naranjos",
      categories: ["2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
      gender: ["masculino", "femenino"],
      registrationDeadline: "2026-02-12",
      pairsCount: 32,
      status: "abierto",
      price: 15000,
      prize: "$150.000",
      lastSpots: true,
    },
    {
      id: 2,
      name: "Copa Ciudad de Mar del Plata",
      startDate: "2026-03-01",
      endDate: "2026-03-03",
      location: "Complejo World Padel",
      categories: ["1ra", "2da", "3ra", "4ta"],
      gender: ["masculino", "femenino"],
      registrationDeadline: "2026-02-28",
      pairsCount: 24,
      status: "abierto",
      price: 20000,
      prize: "$300.000",
      lastSpots: false,
    },
    {
      id: 4,
      name: "Torneo Express Fin de Semana",
      startDate: "2026-03-10",
      endDate: "2026-03-12",
      location: "Paddle Point",
      categories: ["4ta", "5ta", "6ta"],
      gender: ["masculino", "mixto"],
      registrationDeadline: "2026-03-05",
      pairsCount: 16,
      status: "abierto",
      price: 12000,
      prize: "Indumentaria",
      lastSpots: true,
    },
    {
      id: 5,
      name: "Circuito Femenino - Fecha 2",
      startDate: "2026-03-15",
      endDate: "2026-03-17",
      location: "Los Naranjos",
      categories: ["3ra", "4ta", "5ta", "6ta", "7ma"],
      gender: ["femenino"],
      registrationDeadline: "2026-03-12",
      pairsCount: 20,
      status: "abierto",
      price: 14000,
      prize: "$100.000 + Trofeos",
      lastSpots: false,
    },
    {
      id: 6,
      name: "Torneo Aniversario Club Raqueta",
      startDate: "2026-03-20",
      endDate: "2026-03-24",
      location: "Club de Raqueta",
      categories: ["2da", "3ra", "4ta", "5ta", "6ta"],
      gender: ["masculino", "femenino"],
      registrationDeadline: "2026-03-15",
      pairsCount: 40,
      status: "abierto",
      price: 18000,
      prize: "Paletas + Indumentaria",
      lastSpots: false,
    },
    {
      id: 7,
      name: "Copa Challenge Apertura",
      startDate: "2026-04-01",
      endDate: "2026-04-05",
      location: "Complejo Central",
      categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
      gender: ["masculino", "mixto"],
      registrationDeadline: "2026-03-28",
      pairsCount: 64,
      status: "abierto",
      price: 22000,
      prize: "$400.000",
      lastSpots: true,
    },
    {
      id: 3,
      name: "Master de Maestros 2025",
      startDate: "2025-12-10",
      endDate: "2025-12-15",
      location: "Club Atlético MdP",
      categories: ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"],
      gender: ["masculino", "femenino", "mixto"],
      registrationDeadline: "2025-12-05",
      pairsCount: 16,
      status: "finalizado",
      price: 0,
      prize: "$500.000",
    },
  ];

  // Filter only 'abierto' tournaments
  const activeTournaments = allTournaments.filter(
    (t) => t.status === "abierto",
  );

  const dayMonthFormat = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", { day: "numeric", month: "long" });
  };

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

  const calculateTotal = () => {
    if (!selectedTournament)
      return { subtotal: 0, discount: 0, total: 0, memberCount: 0 };

    const total = selectedTournament.price;
    let discount = 0;
    let memberCount = 0;
    const MEMBER_DISCOUNT = selectedTournament.price * 0.1;

    if (formData.player1MemberId) {
      discount += MEMBER_DISCOUNT;
      memberCount++;
    }
    if (formData.player2MemberId) {
      discount += MEMBER_DISCOUNT;
      memberCount++;
    }

    return {
      subtotal: selectedTournament.price,
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

  const closeModal = () => {
    setSelectedTournament(null);
    setPaymentStep("form");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Scroll Helpers
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 0;
      const gap = 32; // gap-8 = 2rem = 32px
      const scrollAmount = cardWidth + gap;

      const currentScroll = container.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Auto-play
  useEffect(() => {
    if (activeTournaments.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If we reached the end, go back to start, otherwise scroll right
        if (container.scrollLeft >= maxScroll - 10) {
          // tolerance
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTournaments.length, isPaused]);

  return (
    <section
      id="tournaments"
      className="py-24 bg-slate-950 relative scroll-mt-20 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Inscripciones{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                Abiertas
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Asegurá tu lugar en los próximos eventos. ¡Cupos limitados!
            </p>
          </div>

          {/* Navigation Buttons */}
          {activeTournaments.length > 0 && (
            <div className="flex gap-3">
              <Button
                onClick={() => scroll("left")}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-white text-slate-900 hover:bg-slate-200 border-0 shadow-lg cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={() => scroll("right")}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-white text-slate-900 hover:bg-slate-200 border-0 shadow-lg cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>

        {activeTournaments.length === 0 ? (
          /* Empty State */
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Próximamente habrá torneos
            </h3>
            <p className="text-slate-400">
              Actualmente no hay inscripciones abiertas. Seguinos en nuestras
              redes para enterarte de las próximas fechas.
            </p>
          </div>
        ) : (
          /* Scroll Container */
          <div
            className="relative group/carousel -mx-4 px-4 sm:mx-0 sm:px-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollContainerRef}
              className={cn(
                "flex gap-8 overflow-x-auto snap-x snap-mandatory pt-2 pb-12 px-1 [&::-webkit-scrollbar]:hidden scrollbar-none",
                isDragging ? "cursor-grabbing snap-none" : "cursor-grab",
              )}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {activeTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="min-w-[85vw] sm:min-w-[420px] md:min-w-[380px] lg:min-w-[32%] shrink-0 snap-center first:pl-2 last:pr-2"
                >
                  <Card className="group relative overflow-hidden border-white/10 bg-slate-900 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 h-full flex flex-col rounded-3xl select-none">
                    {/* Last Spots Badge - Friendly Version */}
                    {tournament.lastSpots && (
                      <div className="absolute top-4 right-4 z-20 animate-pulse">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 border-0 shadow-lg shadow-orange-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                          <Flame className="w-3.5 h-3.5 mr-1.5 fill-white" />
                          Últimos lugares
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-0 flex flex-col h-full pointer-events-none">
                      {/* Disable pointer events on content to facilitate drag */}
                      {/* Header */}
                      <div className="relative bg-slate-800/50 px-8 py-8 shrink-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>

                          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                            Inscripciónes hasta:{" "}
                            {dayMonthFormat(tournament.endDate)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors text-balance leading-tight">
                            {tournament.name}
                          </h3>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-8 space-y-6 flex flex-col flex-1">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-start gap-4">
                            <Calendar className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
                            <div>
                              <p className="text-white font-medium">
                                {dayMonthFormat(tournament.startDate)} -{" "}
                                {dayMonthFormat(tournament.endDate)}
                              </p>
                              <p className="text-slate-500 text-sm">Fecha</p>
                            </div>
                          </div>

                          {/* <div className="flex items-start gap-4">
                            <Clock className="h-5 w-5 shrink-0 text-amber-500 mt-1" />
                            <div>
                              <p className="text-white font-medium">
                                Cierra{" "}
                                {dayMonthFormat(
                                  tournament.registrationDeadline,
                                )}
                              </p>
                              <p className="text-slate-500 text-sm">Deadline</p>
                            </div>
                          </div> */}

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
                              <p className="text-slate-500 text-sm">
                                Modalidad
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <Trophy className="h-5 w-5 shrink-0 text-blue-500 mt-1" />
                            <div>
                              <p className="text-white font-medium">
                                {tournament.categories.slice(0, 3).join(", ")}
                                {tournament.categories.length > 3 && "..."}
                              </p>
                              <p className="text-slate-500 text-sm">
                                Categorías
                              </p>
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
                                <p className="text-slate-500 text-sm">
                                  Premios
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Button needs to be clickable, so re-enable pointer events */}
                        <div className="pointer-events-auto mt-auto">
                          <Button
                            onClick={() => handleRegistration(tournament)}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-6 font-bold text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 cursor-pointer"
                          >
                            Inscribirse
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal Overlay */}
      {selectedTournament && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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
                          <SelectContent className="z-200 bg-slate-900 border-white/10 text-white">
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
                      {/* Summary Content */}
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
    </section>
  );
}
