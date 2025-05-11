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
    // Set initial styles
    document.body.style.overflowX = "hidden";
    
    // Cleanup function to ensure scrolling is properly reset
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  // Add a separate effect to handle cleanup of any payment-related classes
  useEffect(() => {
    // Cleanup function to ensure all payment-related classes are removed
    return () => {
      // Remove any payment-related classes that might prevent scrolling
      document.body.classList.remove('payment-in-progress');
      document.body.classList.remove('razorpay-payment-active');
      
      // Ensure overflow is not disabled
      document.body.style.overflow = "";
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
