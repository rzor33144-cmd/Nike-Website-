
import React from 'react';
import { useCart } from '../CartContext';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} aria-label="Close cart">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

const TrashIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-white transition-colors" aria-label="Remove item">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    </button>
);

const Cart: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, removeFromCart, totalItems, goToPayment } = useCart();

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#1a1a1a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Your Bag ({totalItems})</h2>
            <CloseIcon onClick={closeCart} />
          </header>

          {cartItems.length > 0 ? (
            <div className="flex-grow p-6 overflow-y-auto">
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-black rounded-lg p-2 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      <p className="font-bold mt-1">{item.price}</p>
                    </div>
                    <TrashIcon onClick={() => removeFromCart(item.id)} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-400">Your bag is empty.</p>
            </div>
          )}

          <footer className="p-6 border-t border-gray-700">
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={goToPayment}
              className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" 
              disabled={cartItems.length === 0}
            >
              Go To Payment
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Cart;
