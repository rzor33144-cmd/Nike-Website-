import React, { useState } from 'react';
import { useCart } from '../CartContext';

interface PaymentPageProps {
  setPage: (page: string) => void;
}

interface Address {
    fullName: string;
    countryCode: string;
    phone: string;
    email: string;
    address: string;
    landmark: string;
    zip: string;
}

const COUNTRY_CODES = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'India', code: '+91' },
  // Add other common countries here to shorten the list
];

const PaymentPage: React.FC<PaymentPageProps> = ({ setPage }) => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState<Address>({
    fullName: '',
    countryCode: '+1',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    zip: '',
  });

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);
  
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Payment successful! (This is a demo)');
    setPage('home'); 
  };

  return (
    <section className="py-20 md:py-32 bg-black min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll is-visible">
          <h1 className="font-anton text-4xl md:text-7xl uppercase text-center mb-12 md:mb-16">Checkout</h1>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          <div className="flex-grow bg-[#1a1a1a] p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleInputChange} required className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                <select name="countryCode" value={address.countryCode} onChange={handleInputChange} className="bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white sm:w-1/3">
                  {COUNTRY_CODES.map(c => <option key={c.name} value={c.code}>{c.name} ({c.code})</option>)}
                </select>
                <input type="tel" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleInputChange} required className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              </div>
              <input type="email" name="email" placeholder="Email Address" value={address.email} onChange={handleInputChange} required className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="text" name="address" placeholder="Address" value={address.address} onChange={handleInputChange} required className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="text" name="landmark" placeholder="Apartment, suite, etc. (optional)" value={address.landmark} onChange={handleInputChange} className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              <input type="text" name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleInputChange} required className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
              
              <h2 className="text-2xl md:text-3xl font-bold pt-8 mb-6">Payment</h2>
              <div className="space-y-3">
                <button type="button" className="w-full bg-white py-3 rounded-lg flex items-center justify-center font-bold transition-all duration-200 ease-in-out hover:bg-gray-200 active:scale-95">
                    <img src="https://1000logos.net/wp-content/uploads/2023/03/Apple-Pay-logo-500x281.png" alt="Apple Pay" className="h-8" />
                </button>
                <button type="button" className="w-full bg-white py-3 rounded-lg flex items-center justify-center font-bold transition-all duration-200 ease-in-out hover:bg-gray-200 active:scale-95">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-6" />
                </button>
                <div className="text-center text-gray-500 py-2">OR</div>
                <input type="text" placeholder="Card Number" className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
                <div className="flex space-x-2">
                  <input type="text" placeholder="MM / YY" className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
                  <input type="text" placeholder="CVC" className="w-full bg-[#333] p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-300 transition-colors">
                Pay ${total.toFixed(2)}
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/3 bg-[#1a1a1a] p-6 md:p-8 rounded-xl self-start">
             <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Summary</h2>
             {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-700">
                    <div className="flex items-center space-x-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain bg-black rounded-md" />
                        <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-bold">{item.price}</p>
                </div>
             ))}
             <div className="space-y-2 mt-6">
                <div className="flex justify-between text-gray-300"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                <div className="flex justify-between text-gray-300"><p>Taxes</p><p>${taxes.toFixed(2)}</p></div>
                <div className="flex justify-between font-bold text-xl pt-2 mt-2 border-t border-gray-700"><p>Total</p><p>${total.toFixed(2)}</p></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;