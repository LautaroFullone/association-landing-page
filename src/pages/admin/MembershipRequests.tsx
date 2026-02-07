import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Trash2,
  X,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  UserPlus,
  Loader2,
  Save,
  Globe,
  Pencil,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import type { MembershipRequest } from "@/model/MembershipRequest.model";
import { MOCK_REQUESTS } from "@/mock/membershipRequests.mock";
import { Button } from "@/components/ui/button";

interface NewMemberFormData {
  nombre: string;
  dni: string;
  fechaNacimiento: string;
  localidad: string;
  direccion: string;
  telefono: string;
  email: string;
  instagram: string;
  categoria: string;
  prenda: string;
  talle: string;
  fechaAltaOriginal: string;
}

const INITIAL_FORM_DATA: NewMemberFormData = {
  nombre: "",
  dni: "",
  fechaNacimiento: "",
  localidad: "Mar del Plata",
  direccion: "",
  telefono: "",
  email: "",
  instagram: "",
  categoria: "",
  prenda: "",
  talle: "",
  fechaAltaOriginal: "",
};

const AVAILABLE_CATEGORIES = ["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"];

export function MembershipRequests() {
  const [requests, setRequests] = useState<MembershipRequest[]>(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "todos" | "pendiente" | "aprobado" | "rechazado"
  >("todos");
  const [sourceFilter, setSourceFilter] = useState<"todos" | "web" | "manual">(
    "todos",
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("todas");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal State
  const [selectedRequest, setSelectedRequest] =
    useState<MembershipRequest | null>(null);
  const [requestToDelete, setRequestToDelete] =
    useState<MembershipRequest | null>(null);

  // New Member Modal State
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);
  const [isSubmittingNewMember, setIsSubmittingNewMember] = useState(false);
  const [newMemberForm, setNewMemberForm] =
    useState<NewMemberFormData>(INITIAL_FORM_DATA);

  const confirmDelete = () => {
    if (requestToDelete) {
      setRequests((prev) =>
        prev.filter((req) => req.id !== requestToDelete.id),
      );
      if (selectedRequest?.id === requestToDelete.id) setSelectedRequest(null);
      setRequestToDelete(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.dni.includes(searchTerm) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.fechaSolicitud.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "todos" || req.estado === statusFilter;

    const matchesSource =
      sourceFilter === "todos" || req.registrationSource === sourceFilter;

    const matchesCategory =
      categoryFilter === "todas" || req.categoria === categoryFilter;

    return matchesSearch && matchesStatus && matchesSource && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleStatusChange = (
    id: string,
    newStatus: "aprobado" | "rechazado" | "pendiente",
  ) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, estado: newStatus } : req)),
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("todos");
    setSourceFilter("todos");
    setCurrentPage(1);
  };

  const handleNewMemberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewMemberForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMemberSelectChange = (name: string, value: string) => {
    setNewMemberForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewMember(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create new member as approved
    const newMember: MembershipRequest = {
      id: `manual-${Date.now()}`,
      nombre: newMemberForm.nombre,
      dni: newMemberForm.dni,
      fechaNacimiento: newMemberForm.fechaNacimiento,
      localidad: newMemberForm.localidad,
      direccion: newMemberForm.direccion,
      telefono: newMemberForm.telefono,
      email: newMemberForm.email,
      instagram: newMemberForm.instagram,
      categoria: newMemberForm.categoria,
      prenda: newMemberForm.prenda,
      talle: newMemberForm.talle,
      fechaSolicitud:
        newMemberForm.fechaAltaOriginal ||
        new Date().toLocaleDateString("es-AR"),
      estado: "aprobado",
      registrationSource: "manual",
    };

    setRequests((prev) => [newMember, ...prev]);
    setIsSubmittingNewMember(false);
    setIsNewMemberModalOpen(false);
    setNewMemberForm(INITIAL_FORM_DATA);
  };

  const closeNewMemberModal = () => {
    setIsNewMemberModalOpen(false);
    setNewMemberForm(INITIAL_FORM_DATA);
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Socios</h1>
          <p className="text-slate-400 mt-1">
            Gestiona las nuevas solicitudes de alta y los socios existentes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewMemberModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-600/20 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Socio
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20 cursor-pointer">
            <Download className="w-4 h-4" />
            Exportar Lista
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 flex-1 w-full">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI, email o fecha..."
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Estado:</span>
            <select
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none flex-1 md:flex-none"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | "todos"
                    | "pendiente"
                    | "aprobado"
                    | "rechazado",
                )
              }
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendientes</option>
              <option value="aprobado">Aprobados</option>
              <option value="rechazado">Rechazados</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Origen:</span>
            <select
              className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 outline-none flex-1 md:flex-none"
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

        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Limpiar Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-xl flex flex-col min-h-[500px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-slate-950/50">
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Solicitante
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  DNI
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Categoría
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Fecha Solicitud
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Origen
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300">
                  Estado
                </th>
                <th className="p-4 text-sm font-semibold text-slate-300 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-white">{req.nombre}</p>
                        <p className="text-xs text-slate-500">{req.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 font-mono text-sm">
                      {req.dni}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-white/5">
                        {req.categoria}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">
                      {req.fechaSolicitud}
                    </td>
                    <td className="p-4">
                      {req.registrationSource === "web" ? (
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
                        value={req.estado}
                        onValueChange={(value) =>
                          handleStatusChange(
                            req.id,
                            value as "pendiente" | "aprobado" | "rechazado",
                          )
                        }
                      >
                        <SelectTrigger
                          className={`w-[140px] border-0 h-8 text-xs font-medium ${
                            req.estado === "aprobado"
                              ? "bg-green-500/10 text-green-400 focus:ring-green-500/50"
                              : req.estado === "rechazado"
                                ? "bg-red-500/10 text-red-400 focus:ring-red-500/50"
                                : "bg-yellow-500/10 text-yellow-400 focus:ring-yellow-500/50"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10">
                          <SelectItem
                            value="pendiente"
                            className="text-yellow-400! focus:bg-yellow-500/10 focus:text-yellow-400"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-current" />
                              <span>Pendiente</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="aprobado"
                            className="text-green-400 focus:bg-green-500/10 focus:text-green-400"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-current" />
                              <span>Aprobado</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="rechazado"
                            className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                          >
                            <div className="flex items-center gap-2">
                              <XCircle className="w-3 h-3 text-current" />
                              <span>Rechazado</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <Button
                          onClick={() => {
                            setSelectedRequest(req);
                          }}
                          className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="Ver Detalle"
                        >
                          <Eye className="w-4 h-4" />
                          Ver Detalle
                        </Button>

                        <Button
                          onClick={() => setRequestToDelete(req)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No se encontraron solicitudes que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/5 bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400 gap-4">
          <div className="flex items-center gap-4">
            <span>
              Mostrando {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredRequests.length)} de{" "}
              {filteredRequests.length}
            </span>
            <div className="flex items-center gap-2">
              <span>Filas por página:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-white text-xs outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                    : "hover:bg-white/5 text-slate-400"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* New Member Modal */}
      {isNewMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={closeNewMemberModal}
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
                    Agregar Socio Manualmente
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Carga un socio existente al sistema
                  </p>
                </div>
              </div>
              <button
                onClick={closeNewMemberModal}
                className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleNewMemberSubmit}
              className="p-6 overflow-y-auto custom-scrollbar space-y-6"
            >
              {/* Personal Data */}
              <div>
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
                  Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Nombre y Apellido *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="nombre"
                        required
                        value={newMemberForm.nombre}
                        onChange={handleNewMemberInputChange}
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
                        name="dni"
                        required
                        value={newMemberForm.dni}
                        onChange={handleNewMemberInputChange}
                        placeholder="12345678"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Fecha de Nacimiento *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="date"
                        name="fechaNacimiento"
                        required
                        value={newMemberForm.fechaNacimiento}
                        onChange={handleNewMemberInputChange}
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        name="telefono"
                        required
                        value={newMemberForm.telefono}
                        onChange={handleNewMemberInputChange}
                        placeholder="223 123 4567"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={newMemberForm.email}
                        onChange={handleNewMemberInputChange}
                        placeholder="email@ejemplo.com"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={newMemberForm.instagram}
                      onChange={handleNewMemberInputChange}
                      placeholder="@usuario"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Dirección *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        name="direccion"
                        required
                        value={newMemberForm.direccion}
                        onChange={handleNewMemberInputChange}
                        placeholder="Calle 123"
                        className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Localidad *
                    </label>
                    <input
                      type="text"
                      name="localidad"
                      required
                      value={newMemberForm.localidad}
                      onChange={handleNewMemberInputChange}
                      placeholder="Mar del Plata"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Data */}
              <div>
                <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">
                  Datos de Suscripción
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Categoría *
                    </label>
                    <Select
                      value={newMemberForm.categoria}
                      onValueChange={(value) =>
                        handleNewMemberSelectChange("categoria", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-slate-950 border-white/10 text-white">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {["1ra", "2da", "3ra", "4ta", "5ta", "6ta", "7ma"].map(
                          (cat) => (
                            <SelectItem
                              key={cat}
                              value={cat}
                              className="text-white focus:bg-slate-800 focus:text-white"
                            >
                              {cat} Categoría
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Fecha de Alta Original
                    </label>
                    <input
                      type="date"
                      name="fechaAltaOriginal"
                      value={newMemberForm.fechaAltaOriginal}
                      onChange={handleNewMemberInputChange}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Fecha en que el socio se dio de alta originalmente
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Prenda de Regalo
                    </label>
                    <Select
                      value={newMemberForm.prenda}
                      onValueChange={(value) =>
                        handleNewMemberSelectChange("prenda", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-slate-950 border-white/10 text-white">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        <SelectItem
                          value="remera"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          Remera
                        </SelectItem>
                        <SelectItem
                          value="musculosa"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          Musculosa
                        </SelectItem>
                        <SelectItem
                          value="ninguna"
                          className="text-white focus:bg-slate-800 focus:text-white"
                        >
                          Sin prenda
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Talle
                    </label>
                    <Select
                      value={newMemberForm.talle}
                      onValueChange={(value) =>
                        handleNewMemberSelectChange("talle", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-slate-950 border-white/10 text-white">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {["S", "M", "L", "XL", "XXL"].map((talle) => (
                          <SelectItem
                            key={talle}
                            value={talle}
                            className="text-white focus:bg-slate-800 focus:text-white"
                          >
                            {talle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-sm text-green-400">
                  <strong>Nota:</strong> El socio se creará automáticamente con
                  estado "Aprobado" ya que es una carga manual de un socio
                  existente.
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-slate-900 sticky bottom-0 z-10 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeNewMemberModal}
                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="new-member-form"
                disabled={isSubmittingNewMember}
                onClick={handleNewMemberSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmittingNewMember ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar Socio
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRequest && !requestToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => {
              setSelectedRequest(null);
            }}
          />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Detalles de Solicitud
                </h2>
                <p className="text-slate-400 text-sm">
                  ID Solicitud: #{selectedRequest.id}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                }}
                className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
              {/* Header Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center shrink-0">
                  <User className="w-10 h-10 text-slate-500" />
                  {/* If fotoUrl exists, we would show an img tag here */}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {selectedRequest.nombre}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400">
                        <CreditCard className="w-4 h-4" />
                        <span>DNI: {selectedRequest.dni}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select
                        value={selectedRequest.estado}
                        onValueChange={(value) =>
                          handleStatusChange(
                            selectedRequest.id,
                            value as "pendiente" | "aprobado" | "rechazado",
                          )
                        }
                      >
                        <SelectTrigger
                          className={`w-[140px] border-0 h-8 text-xs font-medium ${
                            selectedRequest.estado === "aprobado"
                              ? "bg-green-500/10 text-green-400 focus:ring-green-500/50"
                              : selectedRequest.estado === "rechazado"
                                ? "bg-red-500/10 text-red-400 focus:ring-red-500/50"
                                : "bg-yellow-500/10 text-yellow-400 focus:ring-yellow-500/50"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10">
                          <SelectItem
                            value="pendiente"
                            className="text-yellow-400! focus:bg-yellow-500/10 focus:text-yellow-400"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-current" />
                              <span>Pendiente</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="aprobado"
                            className="text-green-400 focus:bg-green-500/10 focus:text-green-400"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-current" />
                              <span>Aprobado</span>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="rechazado"
                            className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                          >
                            <div className="flex items-center gap-2">
                              <XCircle className="w-3 h-3 text-current" />
                              <span>Rechazado</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                    Datos Personales
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-slate-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">
                          Fecha de Nacimiento
                        </p>
                        <p className="text-white">
                          {selectedRequest.fechaNacimiento}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Dirección</p>
                        <p className="text-white">
                          {selectedRequest.direccion},{" "}
                          {selectedRequest.localidad}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-slate-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Teléfono</p>
                        <p className="text-white">{selectedRequest.telefono}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-slate-500 mt-1" />
                      <div>
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="text-white">{selectedRequest.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                    Suscripción
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-slate-500 mb-1">
                        Categoría Solicitada
                      </p>
                      <p className="text-white font-medium">
                        {selectedRequest.categoria} Categoría
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-slate-500 mb-1">
                        Prenda de Regalo
                      </p>
                      <p className="text-white font-medium capitalize">
                        {selectedRequest.prenda} - Talle {selectedRequest.talle}
                      </p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                      <p className="text-xs text-slate-500 mb-1">
                        Fecha de Solicitud
                      </p>
                      <p className="text-white font-medium">
                        {selectedRequest.fechaSolicitud}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info Mock */}
              {/* <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">
                    Estado del Pago
                  </h4>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                    Acreditado
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Pagado</span>
                  <span className="text-xl font-bold text-white">$50.000</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Transacción ID: #MP-{selectedRequest.id.padStart(8, "0")}
                </div>
              </div> */}
            </div>

            <div className="p-6 border-t border-white/5 bg-slate-900 sticky bottom-0 z-10 flex justify-end gap-3">
              <button
                onClick={() => setRequestToDelete(selectedRequest)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg font-medium transition-colors"
              >
                Eliminar Solicitud
              </button>
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-200 rounded-lg font-medium transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {requestToDelete && (
        <ConfirmActionModal
          isOpen={!!requestToDelete}
          title={
            <>
              ¿Estás seguro que querés eliminar la solicitud de{" "}
              <span className="font-bold">{requestToDelete?.nombre}</span>?
            </>
          }
          description="Se eliminará permanentemente la solicitud. Esta acción no se puede deshacer."
          confirmButton={{
            icon: Trash2,
            label: "Eliminar solicitud",
            variant: "destructive",
            onConfirm: confirmDelete,
          }}
          cancelButton={{
            label: "No, mantener",
            variant: "outline",
            onCancel: () => setRequestToDelete(null),
          }}
        />
      )}
    </div>
  );
}
