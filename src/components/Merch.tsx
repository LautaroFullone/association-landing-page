import { useState, useEffect } from "react";
import merchBlueJersey from "@/assets/merch_blue_jersey.png";
import merchBlueBottle from "@/assets/merch_blue_bottle.png";
import merchWhiteJersey from "@/assets/merch_white_jersey.png";
import merchWhiteJerseyFolded from "@/assets/merch_white_jersey_folded.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const images = [
  { src: merchBlueJersey, alt: "Camiseta Oficial Titular Azul" },
  { src: merchWhiteJersey, alt: "Camiseta Oficial Suplente Blanca" },
  { src: merchBlueBottle, alt: "Botella Térmica Premium" },
  { src: merchWhiteJerseyFolded, alt: "Indumentaria Oficial Padel MdP" },
];

export function Merch() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="merch"
      className="py-24 bg-slate-900 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 border border-white/5 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center order-2 md:order-1">
              <div className="inline-flex items-center space-x-2 text-blue-400 font-medium tracking-wider uppercase text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Exclusivo para Socios</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Vestite con los colores de{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                  Tu Pasión
                </span>
              </h2>

              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Descubrí nuestra línea oficial de indumentaria. Diseñada para
                alto rendimiento y con el estilo único de nuestra asociación.
                Disponible solo para miembros activos.
              </p>

              <Button
                size="lg"
                onClick={() => (window.location.href = "#contact")}
                className="w-fit bg-white text-slate-950 hover:bg-slate-200 font-semibold px-8 py-6 rounded-full cursor-pointer transition-all hover:scale-105"
              >
                Consultanos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="relative h-full min-h-[500px] bg-slate-800 order-1 md:order-2 overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay z-10" />

              {/* Carousel Images */}
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImage
                      ? "opacity-100 z-0"
                      : "opacity-0 -z-10"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-10000 ease-linear"
                    style={{
                      transform:
                        index === currentImage ? "scale(1.1)" : "scale(1.0)",
                    }}
                  />
                </div>
              ))}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent md:bg-linear-to-l opacity-60 z-20" />

              {/* Carousel Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "bg-white w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
