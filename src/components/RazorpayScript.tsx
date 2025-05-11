import { useEffect, useState } from 'react';

interface RazorpayScriptProps {
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export function RazorpayScript({ onLoad, onError }: RazorpayScriptProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Add global styles for Razorpay
    const style = document.createElement('style');
    style.id = 'razorpay-styles';
    
    // Only add if not already added
    if (!document.getElementById('razorpay-styles')) {
      style.innerHTML = `
        /* Ensure Razorpay modal displays correctly */
        iframe[src*="razorpay"],
        .razorpay-container,
        .razorpay-checkout-frame,
        .razorpay-backdrop {
          z-index: 99999 !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        /* Prevent scrolling of background content */
        body.razorpay-payment-active {
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setLoaded(true);
      onLoad?.();
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      // Script exists but might still be loading
      existingScript.addEventListener('load', () => {
        setLoaded(true);
        onLoad?.();
      });
      existingScript.addEventListener('error', (e) => {
        const error = new Error('Failed to load Razorpay script');
        setError(error);
        onError?.(error);
      });
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setLoaded(true);
      onLoad?.();
    };
    
    script.onerror = () => {
      const error = new Error('Failed to load Razorpay script');
      setError(error);
      onError?.(error);
    };

    // Add script to document
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Don't remove the script on unmount as it might be used elsewhere
    };
  }, [onLoad, onError]);

  // Add/remove class to body when payment is active
  useEffect(() => {
    const bodyClass = 'razorpay-payment-active';
    
    const observer = new MutationObserver((mutations) => {
      // Check if Razorpay iframe is added to the DOM
      const hasRazorpayFrame = document.querySelector('iframe[src*="razorpay"]');
      
      if (hasRazorpayFrame) {
        document.body.classList.add(bodyClass);
      } else {
        document.body.classList.remove(bodyClass);
      }
    });
    
    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      observer.disconnect();
      document.body.classList.remove(bodyClass);
    };
  }, []);

  return null; // This is a utility component, doesn't render anything
}

export default RazorpayScript; 