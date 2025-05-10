
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-black text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Stay in the Loop
            </h2>
            <p className="text-lg text-gray-300">
              Subscribe to our newsletter for exclusive deals, new product announcements, and audio tips.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full px-6 py-6 h-auto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 h-auto"
                >
                  Subscribe
                </Button>
              </div>
            </form>

            <div className="pt-12 border-t border-white/10 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="font-display font-bold text-xl mb-4">TSonic Eyewear</h3>
                  <p className="text-gray-300">
                    v1.0 Glass
                  </p>
                  <p className="text-gray-300">
                    v2.0 AUGMx Glass
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Contact Us</h3>
                  <p className="text-gray-300 mb-2">tsoniceye@gmail.com</p>
                  <p className="text-gray-300 mb-2">hello@TSonic.com</p>
                  <p className="text-gray-300">+91 951 255 0029</p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://www.youtube.com/shorts/nUabTtpdy70" className="text-white hover:text-gray-300 transition-colors">Youtube</a>
                    {/* <a href="#" className="text-white hover:text-gray-300 transition-colors">Twitter</a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">Facebook</a> */}
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm mt-12">
                © {new Date().getFullYear()} TSonic Eyewear. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
