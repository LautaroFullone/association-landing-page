import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/padel-mdp.png";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Partido de padel en acción"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <span className="text-blue-400 font-semibold tracking-wide uppercase text-sm">
              La comunidad oficial de Mar del Plata
            </span>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
            Más que un deporte, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              una pasión compartida.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
            Uníte a la Asociación de Padel de la ciudad. Torneos de primer
            nivel, encuentros sociales y una comunidad que vive el pádel como
            vos.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button
              size="lg"
              onClick={() => (window.location.href = "#membership")}
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-lg px-8 py-7 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all"
            >
              Inscribirse Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => (window.location.href = "#competition")}
              variant="outline"
              className="text-lg px-8 py-7 rounded-full backdrop-blur-sm transition-all text-black cursor-pointer"
            >
              Competencias
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
