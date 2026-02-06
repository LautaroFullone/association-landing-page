import { useState, useMemo } from "react";
import { Trophy, Search, Filter, Users, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types
type Category = "1ra" | "2da" | "3ra" | "4ta" | "5ta" | "6ta" | "7ma";

interface RankingEntry {
  player: {
    id: string;
    name: string;
    lastName: string;
  };
  globalPosition: number;
  points: number;
  tournamentsPlayed: number;
  tournamentsWon: number;
  category: Category;
}

// Mock Data
const mockRankingsMasculino: RankingEntry[] = [
  {
    player: { id: "1", name: "Martín", lastName: "González" },
    globalPosition: 1,
    points: 2850,
    tournamentsPlayed: 12,
    tournamentsWon: 5,
    category: "1ra",
  },
  {
    player: { id: "2", name: "Lucas", lastName: "Rodríguez" },
    globalPosition: 2,
    points: 2720,
    tournamentsPlayed: 14,
    tournamentsWon: 3,
    category: "1ra",
  },
  {
    player: { id: "3", name: "Federico", lastName: "López" },
    globalPosition: 3,
    points: 2580,
    tournamentsPlayed: 11,
    tournamentsWon: 2,
    category: "1ra",
  },
  {
    player: { id: "4", name: "Nicolás", lastName: "Pérez" },
    globalPosition: 4,
    points: 2450,
    tournamentsPlayed: 10,
    tournamentsWon: 1,
    category: "2da",
  },
  {
    player: { id: "5", name: "Santiago", lastName: "Martínez" },
    globalPosition: 5,
    points: 2320,
    tournamentsPlayed: 13,
    tournamentsWon: 2,
    category: "2da",
  },
  {
    player: { id: "6", name: "Tomás", lastName: "García" },
    globalPosition: 6,
    points: 2180,
    tournamentsPlayed: 9,
    tournamentsWon: 1,
    category: "3ra",
  },
  {
    player: { id: "7", name: "Agustín", lastName: "Fernández" },
    globalPosition: 7,
    points: 2050,
    tournamentsPlayed: 11,
    tournamentsWon: 0,
    category: "3ra",
  },
  {
    player: { id: "8", name: "Joaquín", lastName: "Díaz" },
    globalPosition: 8,
    points: 1920,
    tournamentsPlayed: 8,
    tournamentsWon: 1,
    category: "4ta",
  },
  {
    player: { id: "9", name: "Franco", lastName: "Sánchez" },
    globalPosition: 9,
    points: 1780,
    tournamentsPlayed: 10,
    tournamentsWon: 0,
    category: "4ta",
  },
  {
    player: { id: "10", name: "Matías", lastName: "Torres" },
    globalPosition: 10,
    points: 1650,
    tournamentsPlayed: 7,
    tournamentsWon: 0,
    category: "5ta",
  },
  {
    player: { id: "11", name: "Bruno", lastName: "Ramírez" },
    globalPosition: 11,
    points: 1520,
    tournamentsPlayed: 9,
    tournamentsWon: 1,
    category: "5ta",
  },
  {
    player: { id: "12", name: "Lautaro", lastName: "Suárez" },
    globalPosition: 12,
    points: 1380,
    tournamentsPlayed: 6,
    tournamentsWon: 0,
    category: "6ta",
  },
  {
    player: { id: "13", name: "Gonzalo", lastName: "Núñez" },
    globalPosition: 13,
    points: 1250,
    tournamentsPlayed: 8,
    tournamentsWon: 0,
    category: "4ta",
  },
  {
    player: { id: "14", name: "Emiliano", lastName: "Ríos" },
    globalPosition: 14,
    points: 1120,
    tournamentsPlayed: 5,
    tournamentsWon: 0,
    category: "5ta",
  },
  {
    player: { id: "15", name: "Rodrigo", lastName: "Mendoza" },
    globalPosition: 15,
    points: 980,
    tournamentsPlayed: 7,
    tournamentsWon: 0,
    category: "6ta",
  },
];

const mockRankingsFemenino: RankingEntry[] = [
  {
    player: { id: "f1", name: "Valentina", lastName: "Morales" },
    globalPosition: 1,
    points: 2680,
    tournamentsPlayed: 11,
    tournamentsWon: 4,
    category: "1ra",
  },
  {
    player: { id: "f2", name: "Camila", lastName: "Romero" },
    globalPosition: 2,
    points: 2520,
    tournamentsPlayed: 13,
    tournamentsWon: 3,
    category: "1ra",
  },
  {
    player: { id: "f3", name: "Luciana", lastName: "Acosta" },
    globalPosition: 3,
    points: 2390,
    tournamentsPlayed: 10,
    tournamentsWon: 2,
    category: "1ra",
  },
  {
    player: { id: "f4", name: "Florencia", lastName: "Vega" },
    globalPosition: 4,
    points: 2210,
    tournamentsPlayed: 12,
    tournamentsWon: 1,
    category: "2da",
  },
  {
    player: { id: "f5", name: "Martina", lastName: "Castro" },
    globalPosition: 5,
    points: 2080,
    tournamentsPlayed: 9,
    tournamentsWon: 1,
    category: "2da",
  },
  {
    player: { id: "f6", name: "Sofía", lastName: "Ortiz" },
    globalPosition: 6,
    points: 1950,
    tournamentsPlayed: 8,
    tournamentsWon: 0,
    category: "3ra",
  },
  {
    player: { id: "f7", name: "Julieta", lastName: "Giménez" },
    globalPosition: 7,
    points: 1820,
    tournamentsPlayed: 10,
    tournamentsWon: 1,
    category: "3ra",
  },
  {
    player: { id: "f8", name: "Carolina", lastName: "Benítez" },
    globalPosition: 8,
    points: 1690,
    tournamentsPlayed: 7,
    tournamentsWon: 0,
    category: "4ta",
  },
  {
    player: { id: "f9", name: "Paula", lastName: "Medina" },
    globalPosition: 9,
    points: 1550,
    tournamentsPlayed: 9,
    tournamentsWon: 0,
    category: "4ta",
  },
  {
    player: { id: "f10", name: "Rocío", lastName: "Herrera" },
    globalPosition: 10,
    points: 1420,
    tournamentsPlayed: 6,
    tournamentsWon: 0,
    category: "5ta",
  },
];

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "1ra", label: "1ra" },
  { value: "2da", label: "2da" },
  { value: "3ra", label: "3ra" },
  { value: "4ta", label: "4ta" },
  { value: "5ta", label: "5ta" },
  { value: "6ta", label: "6ta" },
  { value: "7ma", label: "7ma" },
];

interface RankingTableProps {
  entries: RankingEntry[];
  isFiltered: boolean;
}

function RankingTable({ entries, isFiltered }: RankingTableProps) {
  // Recalculate positions within the filtered category
  const entriesWithCategoryPosition = useMemo(() => {
    return entries.map((entry, index) => ({
      ...entry,
      categoryPosition: index + 1,
    }));
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="p-12 text-center text-slate-400">
        No se encontraron jugadores con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="w-20 text-center text-xs font-semibold text-slate-400">
              {isFiltered ? "Pos. Cat." : "Pos."}
            </TableHead>
            {isFiltered && (
              <TableHead className="w-20 text-center text-xs font-semibold text-slate-400 hidden sm:table-cell">
                Global
              </TableHead>
            )}
            <TableHead className="text-xs font-semibold text-slate-400">
              Jugador
            </TableHead>
            <TableHead className="text-center text-xs font-semibold text-slate-400 hidden md:table-cell">
              Categoría
            </TableHead>
            <TableHead className="text-center text-xs font-semibold text-slate-400">
              Puntos
            </TableHead>
            <TableHead className="hidden text-center text-xs font-semibold text-slate-400 lg:table-cell">
              Torneos
            </TableHead>
            <TableHead className="hidden text-center text-xs font-semibold text-slate-400 lg:table-cell">
              Ganados
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entriesWithCategoryPosition.map((entry) => (
            <TableRow
              key={entry.player.id}
              className="border-white/5 transition-colors hover:bg-slate-800/50"
            >
              {/* Position (Category or Global) */}
              <TableCell className="text-center">
                {(isFiltered ? entry.categoryPosition : entry.globalPosition) <=
                3 ? (
                  <div
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm ${
                      (isFiltered
                        ? entry.categoryPosition
                        : entry.globalPosition) === 1
                        ? "bg-amber-500 text-slate-900"
                        : (isFiltered
                              ? entry.categoryPosition
                              : entry.globalPosition) === 2
                          ? "bg-slate-400 text-slate-900"
                          : "bg-orange-700 text-orange-100"
                    }`}
                  >
                    {isFiltered ? entry.categoryPosition : entry.globalPosition}
                  </div>
                ) : (
                  <span className="font-medium text-slate-400">
                    {isFiltered ? entry.categoryPosition : entry.globalPosition}
                  </span>
                )}
              </TableCell>

              {/* Global Position (when filtered) */}
              {isFiltered && (
                <TableCell className="text-center hidden sm:table-cell">
                  <span className="text-xs text-slate-500">
                    #{entry.globalPosition}
                  </span>
                </TableCell>
              )}

              {/* Player */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-blue-500/20 text-xs md:text-sm font-bold text-blue-400 shrink-0">
                    {entry.player.name.charAt(0)}
                    {entry.player.lastName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm md:text-base truncate">
                      {entry.player.name} {entry.player.lastName}
                    </p>
                    {/* Mobile: show category and tournaments */}
                    <div className="flex items-center gap-2 md:hidden">
                      <span className="text-xs text-slate-500">
                        {entry.category}
                      </span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">
                        {entry.tournamentsPlayed} torneos
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Category */}
              <TableCell className="text-center hidden md:table-cell">
                <Badge
                  variant="outline"
                  className="border-white/10 text-slate-300 text-xs"
                >
                  {entry.category}
                </Badge>
              </TableCell>

              {/* Points */}
              <TableCell className="text-center">
                <Badge className="bg-blue-500/20 text-blue-400 border-0 font-bold text-xs md:text-sm">
                  {entry.points}
                </Badge>
              </TableCell>

              {/* Tournaments Played */}
              <TableCell className="hidden text-center font-medium text-slate-400 lg:table-cell">
                {entry.tournamentsPlayed}
              </TableCell>

              {/* Tournaments Won */}
              <TableCell className="hidden text-center lg:table-cell">
                {entry.tournamentsWon > 0 ? (
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold text-amber-500">
                      {entry.tournamentsWon}
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-600">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function RankingPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const isFiltered = selectedCategory !== "all";

  // Filter logic
  const filteredMasculino = useMemo(() => {
    return mockRankingsMasculino
      .filter((entry) => {
        const matchesCategory =
          selectedCategory === "all" || entry.category === selectedCategory;
        const matchesSearch =
          searchQuery === "" ||
          `${entry.player.name} ${entry.player.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.points - a.points);
  }, [selectedCategory, searchQuery]);

  const filteredFemenino = useMemo(() => {
    return mockRankingsFemenino
      .filter((entry) => {
        const matchesCategory =
          selectedCategory === "all" || entry.category === selectedCategory;
        const matchesSearch =
          searchQuery === "" ||
          `${entry.player.name} ${entry.player.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.points - a.points);
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />

      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden border-b border-white/5 pt-20 md:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-16 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Ranking{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                  Oficial
                </span>
              </h1>
              <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-400">
                Clasificación actualizada de los mejores jugadores de nuestra
                asociación.
              </p>
            </div>

            {/* Stats Summary */}
            <div className="flex gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {mockRankingsMasculino.length + mockRankingsFemenino.length}
                </p>
                <p className="text-xs md:text-sm text-slate-400">Jugadores</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">7</p>
                <p className="text-xs md:text-sm text-slate-400">Categorías</p>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-amber-500">
                  {mockRankingsMasculino.filter((e) => e.tournamentsWon > 0)
                    .length +
                    mockRankingsFemenino.filter((e) => e.tournamentsWon > 0)
                      .length}
                </p>
                <p className="text-xs md:text-sm text-slate-400">Campeones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-10 lg:px-8 flex-1 w-full">
        {/* Filters */}
        <div className="mb-6 md:mb-8">
          {/* Mobile: Toggle Button */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between border-white/10 bg-slate-900 text-white hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
                {hasActiveFilters && (
                  <Badge className="bg-blue-600 text-white border-0 text-xs ml-2">
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
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Buscar jugador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-950 border-white/10 text-white h-11"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm text-slate-400 shrink-0">
                  Categorías:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                        selectedCategory === cat.value
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white shrink-0"
                >
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Rankings by Gender */}
        <Tabs defaultValue="masculino" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-2 h-12 bg-slate-900 rounded-lg p-1">
              <TabsTrigger
                value="masculino"
                className="flex items-center justify-center gap-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all h-full text-slate-400 hover:text-slate-200"
              >
                <Users className="h-4 w-4" />
                <span>Masculino</span>
                {/* {filteredMasculino.length > 0 && (
                  <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-400 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                    {filteredMasculino.length}
                  </span>
                )} */}
              </TabsTrigger>
              <TabsTrigger
                value="femenino"
                className="flex items-center justify-center gap-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all h-full text-slate-400 hover:text-slate-200"
              >
                <Users className="h-4 w-4" />
                <span>Femenino</span>
                {/* {filteredFemenino.length > 0 && (
                  <span className="ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-400 group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                    {filteredFemenino.length}
                  </span>
                )} */}
              </TabsTrigger>
            </TabsList>

            {isFiltered && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>Mostrando:</span>
                <Badge className="bg-blue-600/20 text-blue-400 border-0">
                  {selectedCategory} Categoría
                </Badge>
              </div>
            )}
          </div>

          <TabsContent value="masculino">
            <Card className="border-white/5 bg-slate-900/50 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-slate-800/30 px-4 md:px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-white text-base md:text-lg">
                  <Trophy className="h-5 w-5 text-blue-400" />
                  Ranking Masculino
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <RankingTable
                  entries={filteredMasculino}
                  isFiltered={isFiltered}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="femenino">
            <Card className="border-white/5 bg-slate-900/50 rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-white/5 bg-slate-800/30 px-4 md:px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-white text-base md:text-lg">
                  <Trophy className="h-5 w-5 text-blue-400" />
                  Ranking Femenino
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <RankingTable
                  entries={filteredFemenino}
                  isFiltered={isFiltered}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
