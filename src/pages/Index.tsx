import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Testimonials } from "@/components/Testimonials";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <Testimonials />
        {/* <ProductsSection /> */}
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
