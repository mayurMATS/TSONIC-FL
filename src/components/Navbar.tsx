import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ShopForm } from './ShopForm';

const NavLink = memo(({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    className="font-medium text-sm text-blue-100 hover:text-white transition-all duration-300 relative px-2 py-1 rounded-md hover:bg-white/10"
    onClick={onClick}
  >
    {children}
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-200 rounded-full transition-all duration-300 group-hover:w-full" />
  </a>
));

const PriceDisplay = memo(() => (
  <div className="flex items-center gap-2">
    <span className="text-green-300 font-bold">₹4290</span>
    <span className="text-blue-200 line-through text-sm">₹5790</span>
  </div>
));

const MobileMenu = memo(({ isOpen, onClose, onCartClick }: { isOpen: boolean; onClose: () => void; onCartClick: () => void }) => (
  isOpen && (
    <div 
      className="md:hidden absolute top-full left-0 right-0 bg-blue-800/95 backdrop-blur-md shadow-md p-4 transition-all duration-300 animate-in fade-in slide-in-from-top-5"
    >
      <nav className="flex flex-col space-y-4">
        <NavLink href="#products" onClick={onClose}>Products</NavLink>
        <NavLink href="#features" onClick={onClose}>Features</NavLink>
        <NavLink href="#about" onClick={onClose}>About</NavLink>
        <NavLink href="#contact" onClick={onClose}>Contact</NavLink>
        <div className="pt-2 flex justify-between">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full rounded-full text-blue-100 border-blue-200 hover:bg-white/20 hover:border-white hover:text-white transition-all duration-300"
            onClick={() => {
              onClose();
              onCartClick();
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
        </div>
      </nav>
    </div>
  )
));

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopFormOpen, setIsShopFormOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const openShopForm = useCallback(() => {
    setIsShopFormOpen(true);
  }, []);

  // Handle clicks outside of the mobile menu
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) &&
          menuButtonRef.current && 
          !menuButtonRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className="fixed top-0 w-full z-50 transition-all duration-500 bg-blue-900 text-blue-50 shadow-lg animate-in slide-in-from-top"
      >
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <a 
            href="/" 
            className="font-display font-bold text-2xl tracking-tight text-white hover:opacity-80 transition-opacity duration-300"
          >
            TSonic Glasses
          </a>

          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink href="#products">Features</NavLink>
            <NavLink href="#features">Testimonials</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <div className="flex items-center gap-4">
              <PriceDisplay />
              <Button 
                size="icon" 
                variant="outline"
                className="rounded-full border-blue-200 text-blue-100 hover:bg-white/20 hover:border-white hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={openShopForm}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-4">
            <PriceDisplay />
            <Button 
              ref={menuButtonRef}
              size="icon" 
              variant="outline" 
              onClick={toggleMobileMenu} 
              className="rounded-full border-blue-200 text-blue-100 hover:bg-white/20 hover:border-white hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div ref={mobileMenuRef}>
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
            onCartClick={openShopForm}
          />
        </div>
      </header>

      <ShopForm 
        isOpen={isShopFormOpen} 
        onClose={() => setIsShopFormOpen(false)} 
      />
    </>
  );
};

export default memo(Navbar);
