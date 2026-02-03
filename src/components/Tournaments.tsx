import { useState } from "react";
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

  const tournaments: Tournament[] = [
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
      status: "proximamente",
      price: 20000,
      prize: "$300.000",
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
      champion: {
        player1: { name: "Juan", lastName: "Pérez" },
        player2: { name: "Martin", lastName: "Gala" },
      },
      price: 0,
      prize: "$500.000",
    },
  ];

  const genderLabels: Record<string, string> = {
    masculino: "Masculino",
    femenino: "Femenino",
    mixto: "Mixto",
  };

  const statusConfig: Record<string, { label: string; className: string }> = {
    abierto: {
      label: "Inscripción Abierta",
      className: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    proximamente: {
      label: "Próximamente",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    finalizado: {
      label: "Finalizado",
      className: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    },
  };

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
    const MEMBER_DISCOUNT = selectedTournament.price * 0.1; // 10% discount per member

    // Simulate validation - in real app this would call API
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

  return (
    <section
      id="tournaments"
      className="py-32 bg-slate-950 relative scroll-mt-20 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Últimos{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                Torneos
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Prepárate para competir. Consulta el calendario oficial y asegura
              tu lugar en los eventos más importantes de la temporada.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => {
            const status = statusConfig[tournament.status];
            return (
              <Card
                key={tournament.id}
                className="group overflow-hidden border-white/10 bg-slate-900 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <CardContent className="p-0">
                  {/* Header with status badge */}
                  <div className="relative bg-slate-800/50 px-6 py-5">
                    <Badge
                      variant="outline"
                      className={`${status.className} uppercase tracking-wider text-[10px] font-bold`}
                    >
                      {status.label}
                    </Badge>
                    <div className="mt-4">
                      <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors text-balance">
                        {tournament.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6 p-6">
                    {/* Key Info Grid */}
                    <div className="grid grid-cols-1 gap-5">
                      <div className="flex items-start gap-4">
                        <Calendar className="h-6 w-6 shrink-0 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-white text-lg font-semibold">
                            {dayMonthFormat(tournament.startDate)} -{" "}
                            {dayMonthFormat(tournament.endDate)}
                          </p>
                          <p className="text-slate-400 text-sm mt-0.5">
                            Fecha del torneo
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 shrink-0 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-white text-lg font-semibold">
                            Cierra el{" "}
                            {dayMonthFormat(tournament.registrationDeadline)}
                          </p>
                          <p className="text-slate-400 text-sm mt-0.5">
                            Inscripción límite
                          </p>
                        </div>
                      </div>

                      {tournament.location && (
                        <div className="flex items-start gap-4">
                          <MapPin className="h-6 w-6 shrink-0 text-blue-500 mt-0.5" />
                          <div>
                            <p className="text-white text-lg font-semibold">
                              {tournament.location}
                            </p>
                            <p className="text-slate-400 text-sm mt-0.5">
                              Sede
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <Users className="h-6 w-6 shrink-0 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-white text-lg font-medium text-balance">
                            {tournament.gender
                              .map((g) => genderLabels[g])
                              .reduce(
                                (acc, curr, i, arr) =>
                                  i === 0
                                    ? curr
                                    : i === arr.length - 1
                                      ? `${acc} y ${curr}`
                                      : `${acc}, ${curr}`,
                                "",
                              )}
                          </p>
                          <p className="text-slate-400 text-sm mt-0.5">
                            Modalidad
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Trophy className="h-6 w-6 shrink-0 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-white text-lg font-medium text-balance leading-relaxed">
                            {tournament.categories.join(", ")}
                          </p>
                          <p className="text-slate-400 text-sm mt-0.5">
                            Categorías
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white">
                        <User className="h-5 w-5 shrink-0 text-blue-500" />
                        <span className="text-base font-medium">
                          {tournament.pairsCount} parejas
                        </span>
                      </div>
                    </div>

                    {/* Champions (only for finished tournaments) */}
                    {tournament.status === "finalizado" &&
                      tournament.champion && (
                        <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                              Campeones
                            </span>
                          </div>
                          <p className="font-semibold text-white">
                            {tournament.champion.player1.name}{" "}
                            {tournament.champion.player1.lastName} /{" "}
                            {tournament.champion.player2.name}{" "}
                            {tournament.champion.player2.lastName}
                          </p>
                        </div>
                      )}

                    {tournament.status !== "finalizado" && (
                      <>
                        {/* Prize */}
                        {tournament.prize && (
                          <div className="flex items-center justify-between border-t border-white/5 pt-5">
                            <span className="text-sm text-slate-500">
                              Premio total
                            </span>
                            <span className="text-xl font-bold text-blue-400">
                              {tournament.prize}
                            </span>
                          </div>
                        )}

                        {/* CTA */}
                        {tournament.status === "abierto" && (
                          <Button
                            onClick={() => handleRegistration(tournament)}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-full py-6 font-semibold transition-all group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
                          >
                            Inscribirse
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
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
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
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
                        Tu equipo ha sido inscripto correctamente. Te enviamos
                        el comprobante por mail.
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
