import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus, CreditCard, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

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
    name: "v1.0 BT Glass",
    category: "Over-Ear",
    price: 4290,
    image: "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442887/p1_gpual1.png",
    color: "Matte Black"
  },
  {
    id: 5,
    name: "v2.0 AUGMx Glass",
    category: "Futuristic",
    price: 76999,
    image: "https://res.cloudinary.com/dynwaflwt/image/upload/v1744442887/p7_qgkrwv.jpg",
    color: "Jet Black"
  }
];

interface CartItem extends Product {
  quantity: number;
}

interface ShopFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShopForm({ isOpen, onClose }: ShopFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState<'products' | 'cart' | 'checkout'>('products');
  const [cartHighlight, setCartHighlight] = useState(false);
  
  // Ref for the View Cart button
  const viewCartButtonRef = useRef<HTMLButtonElement>(null);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // toast.success(`${product.name} added to cart`);
    
    // Scroll to View Cart button for mobile users
    if (viewCartButtonRef.current) {
      viewCartButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    // toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Here you would typically integrate with a payment gateway
    // For example, using Stripe:
    try {
      // Simulate payment processing
      toast.loading("Processing payment...");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      toast.success("Payment successful! Order placed.");
      
      // Reset form and cart
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: ""
      });
      setCart([]);
      setStep('products');
      onClose();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to get item quantity in cart
  const getItemQuantity = (productId: number): number => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    // Highlight the View Cart button whenever cart changes
    if (cart.length > 0) {
      setCartHighlight(true);
      const timer = setTimeout(() => setCartHighlight(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const renderProducts = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {products.map(product => {
        const quantity = getItemQuantity(product.id);
        const isInCart = quantity > 0;
        
        return (
          <div 
            key={product.id} 
            className={`relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${product.id === 5 ? 'opacity-80' : ''} ${product.id !== 5 ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (product.id === 5) return; // Don't add coming soon products
              
              const quantity = getItemQuantity(product.id);
              if (quantity === 0) {
                addToCart(product);
              } else {
                updateQuantity(product.id, quantity + 1);
              }
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${product.id === 5 ? 'filter grayscale' : ''}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity hover:opacity-100"></div>
              
              {product.id === 5 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-black/80 text-white px-4 py-2 rounded-lg font-bold text-lg rotate-[-10deg] shadow-xl border border-white/20">
                    COMING SOON
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-5" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
              <div className="flex items-center mt-1 mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{product.color}</span>
              </div>
              <p className="font-bold text-lg text-blue-800 mb-4">₹{product.price.toLocaleString()}</p>
              
              <div className="h-[44px]">
                <AnimatePresence mode="wait">
                  {product.id === 5 ? (
                    <motion.div 
                      key="notify"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button 
                        onClick={() => toast.info('You will be notified when this product is available.')}
                        className="w-full rounded-full bg-blue-400 hover:bg-blue-500 transition-colors"
                        disabled={product.id === 5}
                      >
                        Notify Me
                      </Button>
                    </motion.div>
                  ) : isInCart ? (
                    <motion.div 
                      key="quantity-controls"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-full text-rose-500 border-rose-200 hover:bg-rose-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                      
                      <div className="flex items-center bg-blue-50 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-blue-700 hover:bg-blue-200"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          disabled={quantity <= 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <motion.span 
                          key={quantity}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          className="mx-3 font-medium min-w-[20px] text-center text-blue-900"
                        >
                          {quantity}
                        </motion.span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-blue-700 hover:bg-blue-200"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="add-button"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button 
                        onClick={() => addToCart(product)}
                        className="w-full rounded-full bg-blue-800 hover:bg-blue-900 transition-all"
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {isInCart && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full"
              >
                In Cart
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderCart = () => (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <ShoppingCart className="mx-auto h-12 w-12 text-blue-300 mb-3" />
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button 
            variant="outline" 
            onClick={() => setStep('products')}
            className="rounded-full px-6 border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            Continue Shopping
          </Button>
        </div>
      ) : cart.map(item => (
        <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg overflow-hidden bg-blue-50 ring-2 ring-purple-200">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.color}</p>
              <p className="font-semibold text-blue-800 mt-1">₹{item.price.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-50 rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-blue-700 hover:bg-blue-200"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="mx-3 font-medium min-w-[20px] text-center text-blue-900">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-blue-700 hover:bg-blue-200"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      {cart.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-500">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t mt-3">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-bold text-lg text-blue-800">₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            required
            className="rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Shipping Address *
          </label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full shipping address"
            required
            className="min-h-[100px] rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions or requirements?"
            className="min-h-[80px] rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t mt-3 mb-6">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-bold text-lg text-blue-800">₹{calculateTotal().toLocaleString()}</span>
        </div>
      </div>
    </form>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 w-[95vw] max-h-[90vh] flex flex-col rounded-xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-blue-900 text-white">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white">
            {step === 'products' && 'Select Products'}
            {step === 'cart' && 'Shopping Cart'}
            {step === 'checkout' && 'Checkout'}
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base text-blue-100">
            {step === 'products' && 'Choose from our selection of premium TSonic Smart Glasses. Click on a product to add to cart.'}
            {step === 'cart' && 'Review your cart before proceeding to checkout.'}
            {step === 'checkout' && 'Complete your order details and payment information.'}
          </DialogDescription>
        </DialogHeader>

        {/* Content area with scrolling */}
        <div className="flex-grow overflow-y-auto p-6">
          {step === 'products' && renderProducts()}
          {step === 'cart' && renderCart()}
          {step === 'checkout' && renderCheckout()}
        </div>

        {/* Fixed button area at the bottom */}
        <div className="flex flex-wrap gap-2 p-6 bg-blue-50 border-t">
          {step === 'products' && (
            <motion.div 
              className="w-full"
              animate={cartHighlight ? { 
                scale: [1, 1.02, 1],
                boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 8px rgba(0,0,0,0.2)", "0px 0px 0px rgba(0,0,0,0)"]
              } : {}}
              transition={{ duration: 0.7 }}
            >
              <Button
                ref={viewCartButtonRef}
                onClick={() => setStep('cart')}
                className={cn(
                  "w-full py-6 rounded-full transition-all duration-300 text-base", 
                  cartHighlight ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-800 hover:bg-blue-900"
                )}
                disabled={cart.length === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Cart ({cart.length})
              </Button>
            </motion.div>
          )}
          
          {step === 'cart' && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep('products')}
                className="w-full py-6 rounded-full text-base border-blue-300 text-blue-700"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => setStep('checkout')}
                className="w-full py-6 rounded-full bg-blue-800 hover:bg-blue-900 text-base"
              >
                Proceed to Checkout
              </Button>
            </>
          )}
          
          {step === 'checkout' && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep('cart')}
                className="w-full py-6 rounded-full text-base border-blue-300 text-blue-700"
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-6 rounded-full bg-blue-800 hover:bg-blue-900 text-base"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Pay Now
              </Button>
            </>
          )}
          
          {step !== 'products' && (
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="w-full text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 