import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

const NikeLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} aria-label="Go to homepage">
    <svg className="h-7 w-auto text-white" viewBox="0 0 293.4 103.3" fill="currentColor">
      <path d="M281.3,12.5c-20.9-10.3-43.2-12.2-64.6-12.2c-42.3,0-76.3,13.4-76.3,42.9c0,23,22,34.8,55,34.8c22.3,0,40.4-4,52-7.8
        l-1.9-18.2c-11,3.4-26.6,6.3-42.9,6.3c-14.7,0-29-4.2-29-18.4c0-13.4,18.4-19.1,34.4-19.1c11.7,0,21.8,1.3,31.2,3.8L281.3,12.5z
        M293.4,103.3L293.4,103.3C216.9,103.3,158,48.2,158,0l26.2,0c0,35.3,46.1,81.7,109.2,81.7V103.3z"/>
    </svg>
  </button>
);

const BagIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} aria-label="Open cart" className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    </button>
);

const MenuIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} aria-label="Open menu" className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
    </button>
);

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageName: string) => {
    setPage(pageName);
    setIsMenuOpen(false);
  };
  
  const scrollToFeatured = () => {
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NikeLogo onClick={() => handleNavClick('home')} />
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`transition-colors ${page === 'home' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              New & Featured
            </button>
            <button 
              onClick={() => handleNavClick('men')} 
              className={`transition-colors ${page === 'men' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Men
            </button>
            <button 
              onClick={() => handleNavClick('women')} 
              className={`transition-colors ${page === 'women' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Women
            </button>
            <button 
              onClick={() => handleNavClick('kids')} 
              className={`transition-colors ${page === 'kids' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Kids
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <button onClick={scrollToFeatured} className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors hidden sm:block">
                Shop Now
            </button>
             <div className="relative">
                <BagIcon onClick={openCart} />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </div>
            <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 h-full w-full bg-black z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
         <div className="container mx-auto px-6 pt-24">
             <nav className="flex flex-col items-start space-y-6 text-2xl">
                 <button onClick={() => handleNavClick('home')} className="font-bold">New & Featured</button>
                 <button onClick={() => handleNavClick('men')} className="font-bold">Men</button>
                 <button onClick={() => handleNavClick('women')} className="font-bold">Women</button>
                 <button onClick={() => handleNavClick('kids')} className="font-bold">Kids</button>
             </nav>
         </div>
      </div>
    </>
  );
};

export default Header;
