// User interface matching backend User model
export interface User {
  uid: string;
  name: string;
  email: string;
  mobile: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

// Cart item interface for processing orders
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  category?: string;
}

// Order interface matching backend Order model
export interface Order {
  orderId?: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
  status?: 'created' | 'paid' | 'failed';
}

// Declare Razorpay types for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
} 