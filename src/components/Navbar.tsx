import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ShopForm } from './ShopForm';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = memo(({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    className="font-medium text-sm text-slate-200 hover:text-white transition-all duration-300 relative px-3 py-2 rounded-md hover:bg-slate-700"
    onClick={onClick}
  >
    {children}
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 rounded-full transition-all duration-300 group-hover:w-full" />
  </a>
));

const PriceDisplay = memo(() => {
  // Animation for highlighting the discount
  const containerVariants = {
    initial: { 
      backgroundColor: "rgba(30, 41, 59, 1)", // slate-800
      borderColor: "rgba(51, 65, 85, 0.5)" // slate-700
    },
    highlight: { 
      backgroundColor: ["rgba(30, 41, 59, 1)", "rgba(245, 158, 11, 0.15)", "rgba(30, 41, 59, 1)"],
      borderColor: ["rgba(51, 65, 85, 0.5)", "rgba(245, 158, 11, 0.5)", "rgba(51, 65, 85, 0.5)"],
      transition: { 
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 5
      }
    }
  };

  const discountVariants = {
    initial: { opacity: 0.7, scale: 1 },
    highlight: { 
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 5
      }
    }
  };

  return (
    <motion.div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-md border"
      variants={containerVariants}
      initial="initial"
      animate="highlight"
    >
      <span className="text-amber-400 font-bold">₹4290</span>
      <motion.span 
        className="text-slate-400 line-through text-sm relative"
        variants={discountVariants}
        initial="initial"
        animate="highlight"
      >
        ₹5790
        <motion.span 
          className="absolute -top-3 -right-8 text-xs text-white bg-amber-600 rounded-md px-1 py-0.5 whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
            transition: { 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 4.5
            }
          }}
        >
          Save 26%
        </motion.span>
      </motion.span>
    </motion.div>
  );
});

const MobileMenu = memo(({ isOpen, onClose, onCartClick }: { isOpen: boolean; onClose: () => void; onCartClick: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="md:hidden absolute top-full left-0 right-0 bg-slate-900 backdrop-blur-md shadow-xl border-t border-slate-800 p-4"
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
              className="w-full rounded-md text-white border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-amber-500 transition-all duration-300"
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
      </motion.div>
    )}
  </AnimatePresence>
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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800" 
            : "bg-slate-900"
        } text-slate-50 animate-in slide-in-from-top`}
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a 
            href="/" 
            className="font-display font-bold text-2xl tracking-tight text-white hover:text-amber-50 transition-colors duration-300"
          >
            TSonic Glasses
          </a>

          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink href="#products">Features</NavLink>
            <NavLink href="#features">Testimonials</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <div className="flex items-center gap-4">
              <PriceDisplay />
              <motion.div
                whileHover={{ rotate: [0, -10, 0], scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="icon" 
                  className="rounded-md bg-amber-500 text-slate-900 hover:bg-amber-400 transition-all duration-300 border-none"
                  onClick={openShopForm}
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </nav>

          <div className="flex md:hidden items-center gap-4">
            <PriceDisplay />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex"
            >
              <Button 
                ref={menuButtonRef}
                size="icon" 
                className="rounded-md bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-amber-500 transition-all duration-300"
                onClick={toggleMobileMenu} 
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </Button>
            </motion.div>
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
