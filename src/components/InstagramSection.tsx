import { Instagram } from "lucide-react";
import { Button } from "./ui/button";

export function InstagramSection() {
  return (
    <div className="bg-slate-900 border-t border-white/5 py-24">
      <div className="flex flex-col items-center justify-center space-y-8 ">
        <div
          className="cursor-pointer p-px rounded-2xl bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 max-w-md w-full"
          onClick={() =>
            window.open("https://instagram.com/padelmardelplata", "_blank")
          }
        >
          <div className="bg-slate-900 rounded-2xl p-8 text-center backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Instagram className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Seguinos en Instagram
            </h3>
            <p className="text-slate-400 mb-6">
              Enterate de todas las novedades, fechas y resultados al instante.
            </p>
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold w-full ">
              @padelmardelplata
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
