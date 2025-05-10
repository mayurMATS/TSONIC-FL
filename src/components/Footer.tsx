import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919512550029', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 flex gap-4">
      <Button 
        size="icon" 
        className="rounded-full bg-green-500 text-white hover:bg-green-600 shadow-lg h-12 w-12"
        onClick={openWhatsApp}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      <Button 
        size="icon" 
        className="rounded-full bg-black text-white hover:bg-black/90 shadow-lg h-12 w-12"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Footer;
