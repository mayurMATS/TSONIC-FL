import { useState, useEffect, useRef, memo, useCallback } from "react";
import { 
  MicIcon, 
  Feather, 
  Glasses, 
  Droplets, 
  Battery, 
  Bluetooth, 
  Fingerprint, 
  Smartphone, 
  Shield, 
  Layers, 
  Speaker 
} from "lucide-react";

type FeatureCategory = "Design" | "Technology" | "Comfort" | "Audio";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: FeatureCategory;
}

const features: Feature[] = [
  {
    icon: <Glasses className="w-6 h-6" />,
    title: "Prescription Ready",
    description: "Compatible with prescription lenses - simply take to your optician for fitting",
    category: "Design"
  },
  {
    icon: <Feather className="w-6 h-6" />,
    title: "Lightweight Design",
    description: "Weighing just 45g, you'll forget you're wearing them",
    category: "Comfort"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Materials",
    description: "Lightweight TR90 frame, polarized shade",
    category: "Design"
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Water Resistant",
    description: "IPX4 rating protects against sweat and light rain, perfect for active lifestyles",
    category: "Technology"
  },
  {
    icon: <Battery className="w-6 h-6" />,
    title: "Battery Life",
    description: "8+ hours playback, 2 hours charging time",
    category: "Technology"
  },
  {
    icon: <Bluetooth className="w-6 h-6" />,
    title: "Connectivity",
    description: "Bluetooth 5.0, 10m range",
    category: "Technology"
  },
  {
    icon: <Fingerprint className="w-6 h-6" />,
    title: "Controls",
    description: "Touch controls on temple",
    category: "Technology"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Compatibility",
    description: "iOS, Android, Windows",
    category: "Technology"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Sweat proof",
    description: "Dust and Sweat proof",
    category: "Comfort"
  },
  {
    icon: <MicIcon className="w-6 h-6" />,
    title: "SIRI Support",
    description: "Virtual Assistant while driving, makes sure you stay safe",
    category: "Technology"
  },
  {
    icon: <Speaker className="w-6 h-6" />,
    title: "Audio",
    description: "Open-ear audio, dual microphones",
    category: "Audio"
  }
];

const categories: FeatureCategory[] = ["Design", "Technology", "Comfort", "Audio"];

const FeatureCard = memo(({ feature, index }: { feature: Feature; index: number }) => (
  <div 
    className="flex items-start space-x-3 transition-all duration-500 contain-content"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
      {feature.icon}
    </div>
    <div>
      <h3 className="text-base font-bold mb-1">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  </div>
));

const CategoryButton = memo(({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: FeatureCategory; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-xs font-medium rounded-full m-1 transition-all ${
      isActive
        ? 'bg-green-500 text-white shadow-md'
        : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
    }`}
  >
    {category}
  </button>
));

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>("Technology");

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
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = useCallback((category: FeatureCategory) => {
    setActiveCategory(category);
  }, []);

  const filteredFeatures = features.filter(feature => feature.category === activeCategory);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-8 sm:py-16 bg-gradient-to-b from-white to-green-50 contain-layout"
    >
      <div className="container mx-auto px-3 md:px-6">
        <div 
          className={`max-w-3xl mx-auto text-center mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">
            Smart Features
          </h2>
          <p className="text-sm md:text-base text-gray-700">
            Experience the perfect blend of style and functionality
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            className={`flex flex-wrap justify-center mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryChange(category)}
              />
            ))}
          </div>

          <div 
            className={`relative bg-white rounded-xl shadow-lg p-4 md:p-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {filteredFeatures.map((feature, index) => (
                <FeatureCard 
                  key={feature.title} 
                  feature={feature} 
                  index={index}
                />
              ))}
            </div>
            
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-1 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FeaturesSection);
