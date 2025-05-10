import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
// Import product images
const p1 = "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442887/p1_gpual1.png";
const p2 = "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442888/p2_gyf7si.png";
const p3 = "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442888/p3_bwxirr.png";
const p4 = "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442889/p4_dzskzw.png";
const p6 = "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442889/p6_zzuukn.png";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-8 sm:py-20 bg-[#1a1f2c]"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div 
            className={`space-y-4 md:space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h5 className="font-medium text-xs sm:text-sm tracking-widest uppercase text-gray-400">
              Our Story
            </h5>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Redefining Eyewear Since 2012
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">
            TSonic Eyewear Labs was born from a bold vision: to seamlessly blend premium audio with everyday eyewear — delivering high-quality sound without sacrificing comfort, style, or convenience.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">
            Founded by passionate engineers and designers, we've dedicated years to refining our technology, creating an immersive audio experience that fits right into your lifestyle — so your world sounds as good as it looks.
            </p>
            <Button className="bg-white text-[#1a1f2c] hover:bg-white/90 rounded-full px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base mt-2">
              Learn More About Us
            </Button>
          </div>

          <div 
            className={`grid grid-cols-2 gap-2 sm:gap-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-2 sm:space-y-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm h-32 sm:h-48 md:h-64">
                <img 
                  src={p6}
                  alt="TSonic Eyewear Front View"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm h-24 sm:h-36 md:h-48">
                <img 
                  src={p2}
                  alt="TSonic Eyewear Side View"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4 pt-5 sm:pt-10">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm h-24 sm:h-36 md:h-48">
                <img 
                  src={p3}
                  alt="TSonic Eyewear Detail View"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm h-32 sm:h-48 md:h-64">
                <img 
                  src={p4}
                  alt="TSonic Eyewear Perspective View"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
