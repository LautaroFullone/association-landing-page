import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import paulaImg from "@/assets/team/paula_relaxed.png";
import marielaImg from "@/assets/team/mariela_relaxed.png";
import marinaImg from "@/assets/team/marina_relaxed.png";
import federicoImg from "@/assets/team/federico_relaxed.png";

const team = [
  {
    name: "Paula Cassano",
    role: "Tesorera",
    phone: "5491138644241",
    image: paulaImg,
  },
  {
    name: "Mariela Barberis",
    role: "Vocal",
    phone: "5491138644241",
    image: marielaImg,
  },
  {
    name: "Marina Mastakas",
    role: "Vocal",
    phone: "5491138644241",
    image: marinaImg,
  },
  {
    name: "Federico Goy",
    role: "Vocal",
    phone: "5491138644241",
    image: federicoImg,
  },
];

export function Contact() {
  const message =
    "Hola, vengo desde la página de la asociación y me gustaría hacer una consulta!";

  return (
    <section id="contact" className="py-24 bg-slate-950 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Contacto
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Ante cualquier duda o consulta, nuestro equipo está a tu
            disposición. Por favor, no dudes en escribirnos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl group-hover:border-blue-600/50 transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {member.name}
              </h3>
              {/* <p className="text-sm text-blue-400 mb-4 uppercase tracking-wider font-medium">
                {member.role}
              </p> */}

              <Button
                size="sm"
                className="bg-[#25d365b0] hover:bg-[#20bd5c] text-white border-none rounded-full px-6 transition-all font-bold shadow-lg cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://wa.me/${member.phone}?text=${message}`,
                    "_blank",
                  )
                }
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
