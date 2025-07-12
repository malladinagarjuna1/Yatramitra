import { useEffect, useState } from 'react';
import axios from 'axios';

function CheckoutButton({ email }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:5000/api/create-checkout-session', { 
        email: email 
      });
      
      
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={isLoading}
      className="checkout-button"
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>
  );
}

export default CheckoutButton;
