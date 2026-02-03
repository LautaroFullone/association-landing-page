import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-slate-950 border-t border-white/5 pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-white text-2xl font-bold uppercase tracking-wider block mb-4">
              Asociación Padel MdP
            </span>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              La comunidad oficial de pádel en Mar del Plata. Organizando
              torneos, fomentando el deporte y uniendo jugadores desde 2010.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#tournaments"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Torneos
                </a>
              </li>
              <li>
                <a
                  href="#merch"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Merchandising
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Mar del Plata, Buenos Aires</li>
              <li>info@asociacionpadelmdp.com.ar</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 text-center md:text-left">
          <p>
            © 2026 Asociación Padel Mar del Plata. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">
              Políticas de Privacidad
            </a>
            <a href="#" className="hover:text-slate-300">
              Términos y Condiciones
            </a>
            <Link to="/admin/login" className="hover:text-slate-300">
              Acceso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
