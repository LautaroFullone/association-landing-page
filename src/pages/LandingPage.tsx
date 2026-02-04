import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { Tournaments } from "@/components/Tournaments";
import { Competition } from "@/components/Competition";
import { History } from "@/components/History";
import { Merch } from "@/components/Merch";
import { Membership } from "@/components/Membership";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { InstagramSection } from "@/components/InstagramSection";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-100">
      <Navbar />
      <Hero />
      <AboutUs />
      <Membership />
      <History />
      <Tournaments />
      <Competition />
      <Merch />
      <Contact />
      <InstagramSection />

      <Footer />
    </div>
  );
}
