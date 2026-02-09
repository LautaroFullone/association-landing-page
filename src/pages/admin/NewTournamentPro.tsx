import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Users,
  Loader2,
  Calendar,
  DollarSign,
  Save,
} from "lucide-react";
import type {
  TournamentPro,
  Gender,
  Category,
} from "@/model/TournamentPro.model";

// Form interface matching base tournament
interface TournamentFormData {
  name: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  location: string;
  address: string;
  categories: string[];
  gender: string[];
  maxPairs: number;
  price: number;
  prize: string;
  description: string;
}

const AVAILABLE_CATEGORIES = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"];

const AVAILABLE_GENDERS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "mixto", label: "Mixto" },
];

export function NewTournamentPro() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TournamentFormData>({
    name: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    address: "",
    categories: [],
    gender: [],
    maxPairs: 32,
    price: 15000,
    prize: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleGender = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: prev.gender.includes(gender)
        ? prev.gender.filter((g) => g !== gender)
        : [...prev.gender, gender],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      formData.categories.length === 0 ||
      formData.gender.length === 0
    )
      return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create new tournament (in real app, this would be an API call)
    const newTournament: TournamentPro = {
      id: `t${Date.now()}`,
      name: formData.name,
      category: formData.categories[0] as Category, // First category for now
      gender: formData.gender[0] as Gender, // First gender for now
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "proximo",
      location: formData.location,
      prize: formData.prize || undefined,
      pairsCount: 0,
      maxPairs: formData.maxPairs,
      description: formData.description || undefined,
    };

    // Store in localStorage temporarily (in real app, would be saved to backend)
    const existingTournaments = JSON.parse(
      localStorage.getItem("tournamentsPro") || "[]",
    );
    localStorage.setItem(
      "tournamentsPro",
      JSON.stringify([newTournament, ...existingTournaments]),
    );

    setIsSubmitting(false);

    // Navigate to the new tournament detail page
    navigate(`/admin/tournaments-pro/${newTournament.id}`);
  };

  const isFormValid =
    formData.name &&
    formData.categories.length > 0 &&
    formData.gender.length > 0 &&
    formData.startDate &&
    formData.endDate;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/tournaments-pro"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Nuevo Torneo
              </h1>
            </div>
            <p className="text-slate-400 mt-1">
              Completa los datos para crear un nuevo torneo
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información General */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Información General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nombre del Torneo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Gran Abierto de Verano 2026"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Descripción breve del torneo..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Fechas del Torneo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                name="startDate"
                required
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Fecha de Fin *
              </label>
              <input
                type="date"
                name="endDate"
                required
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Cierre de Inscripción *
              </label>
              <input
                type="date"
                name="registrationDeadline"
                required
                value={formData.registrationDeadline}
                onChange={handleInputChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            Ubicación
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sede / Club *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ej: Club Los Naranjos"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Ej: Av. Constitución 1234"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categorías y Modalidades */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Categorías y Modalidades
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Categorías *
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      formData.categories.includes(category)
                        ? "bg-yellow-500 text-black"
                        : "bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Modalidad *
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_GENDERS.map((gender) => (
                  <button
                    key={gender.value}
                    type="button"
                    onClick={() => toggleGender(gender.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      formData.gender.includes(gender.value)
                        ? "bg-yellow-500 text-black"
                        : "bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10"
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Máximo de Parejas *
              </label>
              <input
                type="number"
                name="maxPairs"
                required
                min={4}
                max={128}
                value={formData.maxPairs}
                onChange={handleNumberChange}
                className="w-full md:w-48 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Precios y Premios */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Precios y Premios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Precio de Inscripción *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  required
                  min={0}
                  value={formData.price}
                  onChange={handleNumberChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Premio Total
              </label>
              <input
                type="text"
                name="prize"
                value={formData.prize}
                onChange={handleInputChange}
                placeholder="Ej: $150.000"
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
          <Link
            to="/admin/tournaments-pro"
            className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium transition-all text-center"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Crear Torneo
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
