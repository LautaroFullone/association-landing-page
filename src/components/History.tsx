import historyImage from "@/assets/history.png";
import { Users, Trophy, Target } from "lucide-react";

export function History() {
  const milestones = [
    {
      year: "2010",
      title: "El Comienzo",
      description:
        "Un grupo de amigos funda la asociación con una sola cancha y mucha pasión.",
      icon: <Target className="w-5 h-5 text-blue-400" />,
    },
    {
      year: "2015",
      title: "Crecimiento Exponencial",
      description:
        "Alcanzamos los 500 socios activos y lanzamos el primer torneo inter-ciudades.",
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      year: "2023",
      title: "Consolidación Regional",
      description:
        "Referente absoluto en la Costa Atlántica con más de 200 torneos realizados.",
      icon: <Trophy className="w-5 h-5 text-blue-400" />,
    },
  ];

  return (
    <section
      id="history"
      className="py-24 bg-slate-900 relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Nuestra <span className="text-blue-500">Trayectoria</span>
            </h2>

            <div className="space-y-12">
              {milestones.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                      {item.icon}
                    </div>
                    {index !== milestones.length - 1 && (
                      <div className="w-px h-full bg-linear-to-b from-blue-500/50 to-transparent mt-4" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-1 block">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            {/* Marco decorativo */}
            <div className="absolute -inset-4 bg-linear-to-br from-blue-600/20 to-indigo-600/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />

            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={historyImage}
                alt="Historia del Padel MdP"
                className="w-full h-auto object-cover transform group-hover:scale-110 transition duration-1000 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

              <div className="absolute bottom-10 left-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-xs">
                  <p className="text-white font-medium text-lg italic leading-snug">
                    "El pádel no es solo un deporte, es el tejido que une a
                    nuestra comunidad."
                  </p>
                  <p className="text-blue-400 text-sm mt-4 font-bold uppercase tracking-wider">
                    — Fundadores 2010
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
