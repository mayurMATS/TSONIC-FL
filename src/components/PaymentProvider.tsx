import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order } from '@/types/api';
import { initializeRazorpay } from '@/services/api';
import { toast } from 'sonner';

interface PaymentContextType {
  initiatePayment: (orderData: Order, prefill?: any) => Promise<any>;
  isPaymentActive: boolean;
  resetPaymentState: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  // Function to reset payment state and cleanup classes
  const resetPaymentState = () => {
    setIsPaymentActive(false);
    document.body.classList.remove('payment-in-progress');
    document.body.classList.remove('razorpay-payment-active');
    document.body.style.overflow = "";
  };

  useEffect(() => {
    // Add global styles for Razorpay
    const style = document.createElement('style');
    style.id = 'global-razorpay-styles';
    
    if (!document.getElementById('global-razorpay-styles')) {
      style.innerHTML = `
        /* Razorpay modal should always appear on top */
        iframe[src*="razorpay"],
        .razorpay-container,
        .razorpay-checkout-frame,
        .razorpay-backdrop {
          z-index: 99999 !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: fixed !important;
        }
        
        /* Block other UI when Razorpay is active */
        body.payment-in-progress {
          pointer-events: none;
        }
        
        /* But allow Razorpay iframe to receive events */
        body.payment-in-progress iframe[src*="razorpay"] {
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Detect Razorpay iframe
    const observer = new MutationObserver(() => {
      const razorpayFrame = document.querySelector('iframe[src*="razorpay"]');
      if (razorpayFrame) {
        document.body.classList.add('payment-in-progress');
        setIsPaymentActive(true);
      } else {
        resetPaymentState();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
      resetPaymentState();
    };
  }, []);
  
  const initiatePayment = async (orderData: Order, prefill?: any) => {
    try {
      const paymentOptions = {
        ...orderData,
        prefill: prefill || {},
        modal: {
          backdropclose: false,
          escape: false,
          handleback: true,
          animation: true,
          confirm_close: true,
          ondismiss: function() {
            // Ensure cleanup on dismiss
            setTimeout(resetPaymentState, 300);
            return Promise.reject(new Error('Payment cancelled'));
          },
        },
      };
      
      setIsPaymentActive(true);
      document.body.classList.add('payment-in-progress');
      
      const result = await initializeRazorpay(paymentOptions);
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
      throw error;
    } finally {
      // Ensure cleanup with a slight delay to allow UI to settle
      setTimeout(resetPaymentState, 300);
    }
  };
  
  return (
    <PaymentContext.Provider value={{ initiatePayment, isPaymentActive, resetPaymentState }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider; 