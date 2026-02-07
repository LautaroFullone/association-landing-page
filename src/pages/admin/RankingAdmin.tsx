import { useState } from "react";
import { Trophy, Search, Users, Pencil, Filter, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { rankings as initialRankings } from "@/data/tournaments-pro.data";
import type { RankingEntry, Category } from "@/model/TournamentPro.model";

const categories: Category[] = [
  "1ra",
  "2da",
  "3ra",
  "4ta",
  "5ta",
  "6ta",
  "7ma",
];

export function RankingAdmin() {
  const [activeTab, setActiveTab] = useState("masculino");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );

  const [rankings, setRankings] = useState(initialRankings);

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<RankingEntry | null>(null);
  const [editForm, setEditForm] = useState({
    points: 0,
    tournamentsPlayed: 0,
    tournamentsWon: 0,
  });

  const handleEditClick = (entry: RankingEntry) => {
    setEditingPlayer(entry);
    setEditForm({
      points: entry.points,
      tournamentsPlayed: entry.tournamentsPlayed,
      tournamentsWon: entry.tournamentsWon,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveModal = () => {
    if (!editingPlayer) return;

    const genderKey = activeTab as "masculino" | "femenino";

    setRankings((prev) => ({
      ...prev,
      [genderKey]: prev[genderKey].map((entry) =>
        entry.player.id === editingPlayer.player.id
          ? {
              ...entry,
              points: editForm.points,
              tournamentsPlayed: editForm.tournamentsPlayed,
              tournamentsWon: editForm.tournamentsWon,
            }
          : entry,
      ),
    }));

    setIsEditModalOpen(false);
    setEditingPlayer(null);
  };

  const currentRankings =
    activeTab === "masculino" ? rankings.masculino : rankings.femenino;

  const filteredRankings = currentRankings
    .filter((entry) => {
      const fullName =
        `${entry.player.name} ${entry.player.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Administrar Ranking</h1>
          <p className="text-slate-400 mt-1">
            Gestiona los puntos y estadísticas de los jugadores.
          </p>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex items-start gap-3">
        <Star className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-blue-400 mb-1">
            Nota sobre el cálculo automático
          </h4>
          <p className="text-sm text-blue-300/70 leading-relaxed">
            El ranking se calcula automáticamente al finalizar cada torneo
            oficial, asignando los puntos correspondientes a los jugadores.
            También podes realizar ajustes manuales desde esta pantalla si es
            necesario; estos cambios no sobrescriben los datos históricos, sino
            que actualizan el puntaje total sobre el cual se sumarán los
            resultados de futuros torneos.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-slate-900 border-white/5 shadow-xl">
        <CardHeader className="border-b border-white/5 pb-4 space-y-4">
          {/* Top Bar: Tabs & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full lg:w-auto"
            >
              <TabsList className="bg-slate-800/50 border border-white/5 w-full lg:w-auto">
                <TabsTrigger
                  value="masculino"
                  className="gap-2 flex-1 lg:flex-none data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 hover:text-slate-200"
                >
                  <Users className="w-4 h-4" />
                  Masculino
                </TabsTrigger>
                <TabsTrigger
                  value="femenino"
                  className="gap-2 flex-1 lg:flex-none data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 hover:text-slate-200"
                >
                  <Users className="w-4 h-4" />
                  Femenino
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="relative w-full sm:w-[180px]">
                <Select
                  value={selectedCategory}
                  onValueChange={(v) =>
                    setSelectedCategory(v as Category | "all")
                  }
                >
                  <SelectTrigger className="bg-slate-950 border-white/10 text-white focus:ring-blue-500/50">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <SelectValue placeholder="Categoría" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem
                      value="all"
                      className="focus:bg-slate-800 focus:text-white"
                    >
                      Todas las Categorías
                    </SelectItem>
                    {categories.map((cat) => (
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

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Buscar jugador..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-slate-950 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 bg-slate-950/30 hover:bg-slate-950/30">
                  <TableHead className="w-16 text-center text-slate-400 font-semibold">
                    Pos.
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold">
                    Jugador
                  </TableHead>
                  <TableHead className="w-32 text-center text-slate-400 font-semibold">
                    Categoría
                  </TableHead>
                  <TableHead className="w-32 text-center text-slate-400 font-semibold">
                    Puntos
                  </TableHead>
                  <TableHead className="w-24 text-center text-slate-400 font-semibold">
                    Torneos
                  </TableHead>
                  <TableHead className="w-24 text-center text-slate-400 font-semibold">
                    Ganados
                  </TableHead>
                  <TableHead className="w-16 text-center text-slate-400 font-semibold">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRankings.length > 0 ? (
                  filteredRankings.map((entry, index) => (
                    <TableRow
                      key={entry.player.id}
                      className="border-white/5 hover:bg-slate-800/30 transition-colors group"
                    >
                      <TableCell className="font-medium text-center text-slate-300">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm font-bold shadow-lg ${
                            index < 3
                              ? index === 0
                                ? "bg-amber-500 text-slate-950"
                                : index === 1
                                  ? "bg-slate-300 text-slate-900"
                                  : "bg-orange-600 text-slate-100"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-white/5">
                            {entry.player.name.charAt(0)}
                            {entry.player.lastName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">
                              {entry.player.name} {entry.player.lastName}
                            </p>
                            <p className="text-xs text-slate-500">
                              ID: {entry.player.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="bg-slate-800/50 border-white/10 text-slate-300"
                        >
                          {entry.category || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-sm">
                          {entry.points}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-slate-400">
                        {entry.tournamentsPlayed}
                      </TableCell>
                      <TableCell className="text-center text-slate-400">
                        {entry.tournamentsWon > 0 ? (
                          <span className="flex items-center justify-center gap-1 text-amber-500 font-medium">
                            <Trophy className="w-3 h-3" />
                            {entry.tournamentsWon}
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(entry)}
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-blue-600/20"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="w-8 h-8 text-slate-700" />
                        <p>
                          No se encontraron jugadores con los filtros
                          seleccionados.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-400" />
              Editar Jugador
            </DialogTitle>
          </DialogHeader>

          {editingPlayer && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg border border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 border border-white/5">
                  {editingPlayer.player.name.charAt(0)}
                  {editingPlayer.player.lastName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {editingPlayer.player.name} {editingPlayer.player.lastName}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>ID: {editingPlayer.player.id}</span>
                    <span>•</span>
                    <Badge
                      variant="outline"
                      className="h-5 px-1.5 border-white/10 text-slate-400 text-[10px]"
                    >
                      {editingPlayer.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="points" className="text-right text-slate-400">
                    Puntos
                  </Label>
                  <Input
                    id="points"
                    type="number"
                    value={editForm.points}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        points: Number(e.target.value),
                      })
                    }
                    className="col-span-3 bg-slate-950 border-white/10 text-white focus-visible:ring-blue-500/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="tournaments"
                    className="text-right text-slate-400"
                  >
                    Torneos
                  </Label>
                  <Input
                    id="tournaments"
                    type="number"
                    value={editForm.tournamentsPlayed}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        tournamentsPlayed: Number(e.target.value),
                      })
                    }
                    className="col-span-3 bg-slate-950 border-white/10 text-white focus-visible:ring-blue-500/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="won" className="text-right text-slate-400">
                    Ganados
                  </Label>
                  <Input
                    id="won"
                    type="number"
                    value={editForm.tournamentsWon}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        tournamentsWon: Number(e.target.value),
                      })
                    }
                    className="col-span-3 bg-slate-950 border-white/10 text-white focus-visible:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsEditModalOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-white/5"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveModal}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
