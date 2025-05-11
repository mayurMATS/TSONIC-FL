import { User, Order, CartItem } from '../types/api';


// Base API URL - from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

/**
 * Create a new user or update existing one
 */
export async function createOrUpdateUser(userData: Omit<User, 'uid'>): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error creating/updating user');
    }
    
    return data.data;
  } catch (error) {
    console.error('User API error:', error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/users/${email}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error fetching user');
    }
    
    return data.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
}

/**
 * Create a payment order
 */
export async function createOrder(userId: string, amount: number, items?: CartItem[]): Promise<Order> {
  try {
    console.log('Creating order with:', { userId, amount, items });
    
    const orderData = {
      userId,
      amount,
      items, // Optional cart items for order details
    };

    const response = await fetch(`${API_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    const data = await response.json();
    console.log('Order creation response:', data);
    
    if (!data.success) {
      throw new Error(data.message || 'Error creating order');
    }
    
    return data.data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

/**
 * Initialize Razorpay payment
 */
export function initializeRazorpay(orderData: Order): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('Razorpay SDK not loaded'));
      return;
    }

    // Ensure Razorpay modal appears on top of everything
    // Add CSS to increase z-index of Razorpay modal
    const style = document.createElement('style');
    style.innerHTML = `
      .razorpay-payment-button, .razorpay-checkout-frame, .razorpay-backdrop {
        z-index: 10000 !important;
      }
      .razorpay-checkout-frame {
        opacity: 1 !important;
        visibility: visible !important;
        position: fixed !important;
      }
    `;
    document.head.appendChild(style);

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'TSONIC',
      description: 'Purchase of TSONIC Smart Glasses',
      order_id: orderData.razorpayOrderId,
      handler: function (response: any) {
        // Handle successful payment
        verifyPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        })
          .then(result => resolve(result))
          .catch(error => reject(error));
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#2563eb',
      },
      modal: {
        // Prevent clicks from bleeding through to elements behind the modal
        backdropclose: false,
        escape: false,
        handleback: true,
        animation: true,
        confirm_close: true,
        ondismiss: function() {
          reject(new Error('Payment cancelled'));
        },
      },
    };
    
    // Initialize Razorpay in a slight delay to ensure correct rendering
    setTimeout(() => {
      const rzp = new window.Razorpay(options);
      
      // Open Razorpay payment window
      rzp.open();
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response);
        reject(new Error('Payment failed'));
      });
    }, 100);
  });
}

/**
 * Verify payment with backend
 */
export async function verifyPayment(paymentData: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }
    
    return data.data;
  } catch (error) {
    console.error('Verify payment error:', error);
    throw error;
  }
}

/**
 * Get payment status
 */
export async function getPaymentStatus(orderId: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/payments/${orderId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error fetching payment status');
    }
    
    return data.data;
  } catch (error) {
    console.error('Get payment status error:', error);
    throw error;
  }
} 