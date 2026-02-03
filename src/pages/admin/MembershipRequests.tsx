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

export function MembershipRequests() {
  const [requests, setRequests] = useState<MembershipRequest[]>(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "todos" | "pendiente" | "aprobado" | "rechazado"
  >("todos");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal State
  const [selectedRequest, setSelectedRequest] =
    useState<MembershipRequest | null>(null);
  const [requestToDelete, setRequestToDelete] =
    useState<MembershipRequest | null>(null);

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
    return matchesSearch && matchesStatus;
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
    setCurrentPage(1);
  };

  return (
    <div className="animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Solicitudes de Socios
          </h1>
          <p className="text-slate-400 mt-1">
            Gestiona las nuevas solicitudes de alta
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20">
          <Download className="w-4 h-4" />
          Exportar Lista
        </button>
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
                        <button
                          onClick={() => {
                            setSelectedRequest(req);
                          }}
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="Ver Detalle"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setRequestToDelete(req)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
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
              <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
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
              </div>
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
