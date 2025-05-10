
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "SOUNDWAVE X1",
    category: "Over-Ear",
    price: 349,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "Matte Black"
  },
  {
    id: 2,
    name: "SOUNDWAVE AIR",
    category: "In-Ear",
    price: 199,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "Silver White"
  },
  {
    id: 3,
    name: "SOUNDWAVE PRO",
    category: "Over-Ear",
    price: 449,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "Midnight Blue"
  },
  {
    id: 4,
    name: "SOUNDWAVE LITE",
    category: "On-Ear",
    price: 249,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: "Rose Gold"
  }
];

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="group relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>
      <div className="p-6">
        <div className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {product.category} • {product.color}
          </span>
          <h3 className="font-display font-bold text-xl">{product.name}</h3>
          <p className="font-medium">${product.price}</p>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${
          isHovered ? 'max-h-20 opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
          <Button className="w-full bg-black hover:bg-black/90 text-white rounded-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
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
      id="products" 
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Collection
          </h2>
          <p className={`text-lg text-gray-700 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Discover our lineup of premium headphones designed for every lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className={`border-black hover:bg-black/5 rounded-full px-8 py-6 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
