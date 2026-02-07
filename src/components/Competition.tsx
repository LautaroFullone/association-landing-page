import { Trophy, Radio, Calendar, Medal, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Radio,
    title: "Seguí los Partidos",
    description:
      "Enterate de los resultados al instante y mirá quiénes avanzan en cada torneo. Viví el minuto a minuto desde donde estés.",
    //  highlight: "Resultados en vivo",
  },
  {
    icon: Calendar,
    title: "Próximas Fechas",
    description:
      "No te quedes afuera. Consultá el calendario de torneos, fechas de inscripción y organizá tu agenda deportiva.",
    //  highlight: "Inscripciones",
  },
  {
    icon: Medal,
    title: "Ranking Anual",
    description:
      "¿Querés saber en qué puesto estás? Mirá la tabla actualizada y seguí tu progreso torneo a torneo.",
    //  highlight: "Sumá puntos",
  },
];

export function Competition() {
  return (
    <section id="competition" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">
              Competencia Oficial
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Toda la emoción,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              En un solo lugar
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ya sea que juegues o vengas a alentar, acá tenés todo lo necesario
            para no perderte nada del circuito local.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-purple-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlight badge */}
                {/* <span className="inline-flex items-center text-xs font-medium text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20">
                  {feature.highlight}
                </span> */}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/torneos"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <span className="text-lg">Fixture Oficial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/ranking"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <span className="text-lg">Ranking</span>
            <Medal className="w-5 h-5 group-hover:scale-110 transition-transform text-yellow-500" />
          </Link>
        </div>

        {/* <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Información siempre disponible para toda la comunidad
          </p>
        </div> */}
      </div>
    </section>
  );
}
