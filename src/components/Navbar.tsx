import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Asociate", href: "#membership" },
    { name: "Historia", href: "#history" },
    { name: "Torneos", href: "#tournaments" },
    { name: "Merch", href: "#merch" },
    { name: "Contacto", href: "#contact" },
    { name: "Acceso", href: "/admin/login" },
  ];

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => (window.location.href = "#hero")}
          >
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-lg group overflow-hidden">
              <img
                src={logo}
                alt="Logo Padel MdP"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-white text-lg font-bold tracking-wider leading-none">
              ASOCIACIÓN <br />
              PÁDEL MDP
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors uppercase tracking-widest"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors uppercase tracking-widest"
                  >
                    {item.name}
                  </a>
                ),
              )}
              {/* <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 font-semibold shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]">
                Inscribirse
              </Button> */}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ),
            )}
            {/* <div className="px-3 py-2">
              <Button className="w-full bg-blue-600 text-white rounded-full">
                Inscribirse
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}
