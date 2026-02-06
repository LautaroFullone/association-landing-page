import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function RankingPage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 px-4 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Ranking
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Próximamente disponible.
        </p>
      </main>
      <Footer />
    </div>
  );
}
