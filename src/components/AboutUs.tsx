import { Users, Trophy, Calendar, Target, Heart, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutUs() {
  const stats = [
    {
      icon: <Calendar className="h-10 w-10 text-blue-500" />,
      value: "15+",
      label: "Años de Trayectoria",
      description: "Organizando los mejores eventos de la ciudad.",
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      value: "500+",
      label: "Socios Activos",
      description: "Una comunidad que no para de crecer día a día.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-blue-500" />,
      value: "200+",
      label: "Torneos Oficiales",
      description: "Competencia de alto nivel para todas las categorías.",
    },
  ];

  const values = [
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Excelencia Deportiva",
      description: "Buscamos elevar el nivel de juego en cada competencia.",
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      title: "Pasión por el Padel",
      description: "El motor que nos impulsa a seguir creciendo.",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Integridad y Respeto",
      description: "Los valores fundamentales de nuestra asociación.",
    },
  ];

  return (
    <section id="about" className="py-32 bg-slate-900 relative scroll-mt-20">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Forjando la historia del <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Pádel en Mar del Plata
              </span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Somos mucho más que una organización de torneos. Somos el punto de
              encuentro para quienes entienden que el pádel es un estilo de
              vida. Desde 2010, trabajamos incansablemente para profesionalizar
              y expandir este deporte en nuestra ciudad.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {values.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-900/20">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 group"
            >
              <CardContent className="flex flex-col items-start p-8">
                <div className="mb-6 p-4 rounded-2xl bg-slate-900/50 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xl font-medium text-slate-200 mb-2">
                  {stat.label}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
