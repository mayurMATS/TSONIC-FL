import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShopForm } from './ShopForm';
// Import the video from assets
import heroVideo from '@/assets/videos/hero/editedTSonic.mp4';
import heroVideoBuffer from '@/assets/images/products/p1.png';

export function HeroSection() {
  const [isShopFormOpen, setIsShopFormOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [useYouTube, setUseYouTube] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleVideoError = () => {
    setUseYouTube(true);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919512550029', '_blank');
  };

  return (
    <section className="w-full py-6 sm:py-12 md:py-20 lg:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 sm:bg-gradient-to-b sm:from-blue-50 sm:to-white">
      <div className="container px-3 sm:px-4 md:px-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 mt-16 sm:mt-0 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mx-auto lg:mx-0 max-w-[300px] sm:max-w-[400px] md:max-w-[600px] text-white sm:text-gray-900">
                <span className="block sm:hidden">TSonic v1.0 BT</span>
                <span className="hidden sm:block">v1.0 - Smart Eyewear like Never Before</span>
              </h1>
              <p className="block sm:hidden text-sm font-medium text-gray-300 mt-2">
                Ease of Bluetooth with versatile clip-on lenses.
              </p>
              <p className="max-w-[300px] sm:max-w-[400px] md:max-w-[600px] text-sm sm:text-base md:text-lg text-muted-foreground mx-auto lg:mx-0 hidden sm:block">
                Our premium Bluetooth Eyewear with Clip-On ensures audio quality, comfort, and style. Elevate your daily life.
              </p>
            </div>
            <div className="flex flex-col min-[400px]:flex-row gap-2 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => setIsShopFormOpen(true)}
                className={cn(
                  "text-sm sm:text-base py-4 px-6 w-full min-[400px]:w-auto relative overflow-hidden transition-all duration-500",
                  "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                  "shadow-lg hover:shadow-xl",
                  "transform hover:scale-105",
                  isVisible && "animate-fade-up [--animation-delay:200ms]"
                )}
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={cn(
                  "text-sm sm:text-base py-4 px-6 w-full min-[400px]:w-auto relative overflow-hidden",
                  "border-2 border-green-500 bg-transparent hover:bg-green-50",
                  "text-green-600 hover:text-green-700",
                  "shadow-lg hover:shadow-xl",
                  "transform hover:scale-105 transition-all duration-500",
                  isVisible && "animate-fade-up [--animation-delay:400ms]"
                )}
                onClick={openWhatsApp}
              >
                <span className="relative z-10">WhatsApp Us</span>
                <div className="absolute inset-0 bg-green-500 opacity-10 animate-pulse"></div>
              </Button>
            </div>
          </div>
          <div className={cn(
            "mx-auto w-full max-w-[300px] sm:max-w-none sm:w-10/12 lg:w-full overflow-hidden rounded-xl bg-muted order-first lg:order-last",
            isVisible && "animate-fade-down [--animation-delay:600ms]"
          )}>
            <div className="relative" style={{ paddingBottom: '159.4%' }}>
              {useYouTube ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/7dwDOYcf-RM?autoplay=1&mute=1&loop=1&playlist=7dwDOYcf-RM&modestbranding=1&controls=0"
                  title="TSonic Smart Glasses"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  poster="https://res.cloudinary.com/dynwaflwt/image/upload/v1744442887/p1_gpual1.png"
                  preload="auto"
                  onError={handleVideoError}
                >
                  <source 
                    src="https://res.cloudinary.com/dynwaflwt/video/upload/v1744531082/editedTSonic_f6ojhs.mp4" 
                    type="video/mp4" 
                  />
                  <source 
                    src="https://res.cloudinary.com/dynwaflwt/video/upload/f_webm/v1744531082/editedTSonic_f6ojhs" 
                    type="video/webm" 
                  />
                  {/* Fallback text */}
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShopForm 
        isOpen={isShopFormOpen} 
        onClose={() => setIsShopFormOpen(false)} 
      />
    </section>
  );
}
