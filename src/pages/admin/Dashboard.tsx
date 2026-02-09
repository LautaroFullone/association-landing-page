import {
  Users,
  FileText,
  Trophy,
  ChevronRight,
  Clock,
  UserPlus,
  ClipboardList,
  Calendar,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Save,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
  const [subscriptionCost, setSubscriptionCost] = useState("15000");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveCost = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const stats = [
    {
      name: "Solicitudes Pendientes",
      value: "12",
      subtitle: "3 pendientes",
      icon: FileText,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      name: "Socios Activos",
      value: "156",
      subtitle: "+8 este mes",
      icon: Users,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      name: "Torneos Activos",
      value: "3",
      subtitle: "2 próximamente",
      icon: Trophy,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: UserPlus,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      dotColor: "bg-blue-400",
      title: "Nueva solicitud de socio",
      subtitle: "Juan Pérez solicitó ser socio",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      icon: CheckCircle,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      dotColor: "bg-green-400",
      title: "Inscripción confirmada",
      subtitle: "María García - Torneo Apertura",
      time: "Hace 5 horas",
    },
    {
      id: 3,
      icon: AlertCircle,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      dotColor: "bg-amber-400",
      title: "Solicitud pendiente",
      subtitle: "Carlos López - Esperando aprobación",
      time: "Hace 1 día",
    },
    {
      id: 4,
      icon: Trophy,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      dotColor: "bg-purple-400",
      title: "Torneo actualizado",
      subtitle: "Gran Abierto de Verano - 32 parejas",
      time: "Hace 2 días",
    },
  ];

  const quickActions = [
    {
      id: 1,
      icon: UserPlus,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      title: "Nueva Solicitud",
      subtitle: "Registrar nuevo socio",
      href: "/admin/requests",
    },
    {
      id: 2,
      icon: Calendar,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      title: "Nuevo Torneo",
      subtitle: "Crear torneo",
      href: "/admin/tournaments/new",
    },
    {
      id: 3,
      icon: ClipboardList,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      title: "Ver Solicitudes",
      subtitle: "Gestionar solicitudes",
      href: "/admin/requests",
    },
    {
      id: 4,
      icon: Trophy,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
      title: "Ver Torneos",
      subtitle: "Gestionar torneos",
      href: "/admin/tournaments",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Panel de Control
        </h1>
        <p className="text-slate-400 mt-1">Resumen general de la plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <p className="text-slate-400 text-sm font-medium">
                  {stat.name}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-sm">{stat.subtitle}</p>
              </div>
              <div
                className={`p-3 md:p-4 rounded-xl ${stat.iconBg} ${stat.iconColor}`}
              >
                <stat.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Activity */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Actividad Reciente</h3>
          </div>

          <div className="space-y-0">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${activity.dotColor}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.title}</span>
                    <span className="text-slate-400">
                      {" "}
                      · {activity.subtitle}
                    </span>
                  </p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Configuration */}
        <div className="space-y-6 md:space-y-8">
          {/* Subscription Cost Configuration */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-white/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <CardTitle className="text-white">
                  Costo de Suscripción
                </CardTitle>
              </div>
              <CardDescription className="text-slate-400">
                Define el valor de la cuota social mensual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="cost" className="text-slate-300">
                    Monto actual
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <Input
                      id="cost"
                      type="number"
                      value={subscriptionCost}
                      onChange={(e) => setSubscriptionCost(e.target.value)}
                      className="pl-7 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSaveCost}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
                >
                  {isSaving ? (
                    "Guardando..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <ChevronRight className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Acciones Rápidas</h3>
            </div>
            <p className="text-slate-500 text-sm -mt-4 mb-6">
              Tareas frecuentes
            </p>

            <div className="space-y-3">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 hover:bg-slate-900 transition-colors group cursor-pointer"
                >
                  <div
                    className={`p-2 rounded-lg ${action.iconBg} ${action.iconColor} shrink-0`}
                  >
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {action.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {action.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Status */}
      {/* <div className="bg-slate-800/50 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Estado de Torneos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-white">Gran Abierto de Verano</p>
                <p className="text-xs text-slate-500 mt-1">15 - 17 Feb 2026</p>
              </div>
              <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                Abierto
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Inscripciones</span>
                <span className="text-white font-medium">26/32 parejas</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all"
                  style={{ width: "81%" }}
                />
              </div>
            </div>
          </div>

 
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-white">
                  Copa Ciudad de Mar del Plata
                </p>
                <p className="text-xs text-slate-500 mt-1">1 - 3 Mar 2026</p>
              </div>
              <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                Próximamente
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Inscripciones</span>
                <span className="text-white font-medium">12/24 parejas</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </div>

      
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-white">
                  Master de Maestros 2025
                </p>
                <p className="text-xs text-slate-500 mt-1">10 - 15 Dic 2025</p>
              </div>
              <span className="text-xs font-medium text-slate-400 bg-slate-500/10 px-2 py-1 rounded-full">
                Finalizado
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Inscripciones</span>
                <span className="text-white font-medium">16/16 parejas</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-slate-500 to-slate-400 h-2 rounded-full transition-all"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
