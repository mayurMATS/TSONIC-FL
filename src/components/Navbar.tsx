import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NavLink = memo(({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    className="font-medium text-sm text-gray-700 hover:text-gray-900 transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
));

const PriceDisplay = memo(() => (
  <div className="flex items-center gap-2">
    <span className="text-green-600 font-bold">₹4290</span>
    <span className="text-gray-400 line-through text-sm">₹5790</span>
  </div>
));

const MobileMenu = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  isOpen && (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md p-4 animate-fade-in">
      <nav className="flex flex-col space-y-4">
        <NavLink href="#products" onClick={onClose}>Products</NavLink>
        <NavLink href="#features" onClick={onClose}>Features</NavLink>
        <NavLink href="#about" onClick={onClose}>About</NavLink>
        <NavLink href="#contact" onClick={onClose}>Contact</NavLink>
        <div className="pt-2 flex justify-between">
          <Button size="sm" variant="outline" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50">
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

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-slate-800 to-zinc-900 sm:bg-white/80 text-white sm:text-gray-900 backdrop-blur-md shadow-sm' 
          : 'bg-gradient-to-r from-slate-800/90 to-zinc-900/90 sm:bg-gradient-to-r sm:from-blue-500/10 sm:via-purple-500/10 sm:to-pink-500/10 text-white sm:text-gray-900 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="/" className="font-display font-bold text-2xl tracking-tight">
          TSonic Glasses
        </a>

        <nav className="hidden md:flex space-x-8 items-center">
          <NavLink href="#products">Features</NavLink>
          <NavLink href="#features">Testimonials</NavLink>
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <div className="flex items-center gap-4">
            <PriceDisplay />
            <Button size="icon" variant="ghost" className="text-inherit hover:text-gray-300 sm:hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <PriceDisplay />
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={toggleMobileMenu} 
            className="text-inherit hover:text-gray-300 sm:hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default memo(Navbar);
