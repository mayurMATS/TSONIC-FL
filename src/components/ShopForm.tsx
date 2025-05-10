import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus, CreditCard } from "lucide-react";

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
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
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

  const renderProducts = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4 space-y-4">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
          <div>
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category} • {product.color}</p>
            <p className="font-bold mt-2">₹{product.price.toLocaleString()} </p>
          </div>
          {product.id === 5 ? (
            <Button 
              onClick={() => toast.info('You will be notified when this product is available.')}
              className="w-full text-sm py-2"
            >
              Notify Me
            </Button>
          ) : (
            <Button 
              onClick={() => addToCart(product)}
              className="w-full text-sm py-2"
            >
              Add to Cart
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  const renderCart = () => (
    <div className="space-y-4">
      {cart.map(item => (
        <div key={item.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">₹{item.price.toLocaleString()} </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center pt-4">
        <span className="font-bold">Total:</span>
        <span className="font-bold">₹{calculateTotal().toLocaleString()} </span>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
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
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
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
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Shipping Address *
          </label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full shipping address"
            required
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Additional Notes
          </label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions or requirements?"
            className="min-h-[80px]"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Order Total:</span>
          <span className="font-bold">₹{calculateTotal().toLocaleString()} </span>
        </div>
      </div>
    </form>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-4 w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            {step === 'products' && 'Select Products'}
            {step === 'cart' && 'Shopping Cart'}
            {step === 'checkout' && 'Checkout'}
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            {step === 'products' && 'Choose from our selection of premium TSonic Smart Glasses.'}
            {step === 'cart' && 'Review your cart before proceeding to checkout.'}
            {step === 'checkout' && 'Complete your order details and payment information.'}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 overflow-y-auto">
          {step === 'products' && renderProducts()}
          {step === 'cart' && renderCart()}
          {step === 'checkout' && renderCheckout()}
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {step === 'products' && (
            <Button
              onClick={() => setStep('cart')}
              className="w-full"
              disabled={cart.length === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Cart ({cart.length})
            </Button>
          )}
          
          {step === 'cart' && (
            <>
              <Button
                variant="outline"
                onClick={() => setStep('products')}
                className="w-full"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => setStep('checkout')}
                className="w-full"
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
                className="w-full"
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-black hover:bg-black/90"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </>
          )}
          
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 