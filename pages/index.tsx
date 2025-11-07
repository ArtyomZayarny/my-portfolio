import { NavBarContextProvider } from "@/context/navbar-context";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Email from "@/components/Email";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <NavBarContextProvider>
        <Navbar />
      </NavBarContextProvider>
      <div className="container mt-24 mx-auto px-12 py-4">
        <Hero />
        <About />
        <Projects />
        <Email />
      </div>
      <Footer />
    </main>
  );
}
