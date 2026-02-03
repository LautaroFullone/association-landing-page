import { Users, FileText, Trophy, DollarSign } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      name: "Solicitudes Pendientes",
      value: "12",
      icon: FileText,
      change: "+2 hoy",
      color: "bg-blue-500",
    },
    {
      name: "Inscriptos Totales",
      value: "156",
      icon: Users,
      change: "+12% mes",
      color: "bg-green-500",
    },
    {
      name: "Torneos Activos",
      value: "3",
      icon: Trophy,
      change: "En curso",
      color: "bg-purple-500",
    },
    {
      name: "Ingresos Mes",
      value: "$450k",
      icon: DollarSign,
      change: "+8% vs mes anterior",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2 rounded-lg ${stat.color} bg-opacity-10 text-${stat.color.split("-")[1]}-600`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>

            <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">
            Inscripciones Recientes
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                    JP
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Juan Pérez
                    </p>
                    <p className="text-xs text-slate-500">
                      Torneo Apertura 2026
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Pendiente
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Estado de Torneos</h3>
          <div className="space-y-4">
            {/* Mock Content */}
            <div className="p-3 border border-slate-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">
                  Apertura 2026
                </span>
                <span className="text-xs text-slate-500">80% Lleno</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="p-3 border border-slate-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">
                  Master Fin de Año
                </span>
                <span className="text-xs text-slate-500">45% Lleno</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
