
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import AdBanner from './components/AdBanner';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import PaymentPage from './pages/PaymentPage';
import { CartProvider } from './CartContext';
import Cart from './components/Cart';
import Search from './components/Search';

const CloseIcon: React.FC<{ onClick: () => void, className?: string }> = ({ onClick, className }) => (
    <button onClick={onClick} aria-label="Close" className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = Array.from(document.querySelectorAll('.animate-on-scroll'));
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [page]); 

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalVideoUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [modalVideoUrl]);

  return (
    <CartProvider goToPayment={() => setPage('payment')}>
      <div ref={scrollRef} className="bg-[#111] text-white overflow-x-hidden">
        <Header page={page} setPage={setPage} openSearch={() => setIsSearchOpen(true)} />
        <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <Cart />
        <main>
          {page === 'home' && (
            <>
              <Hero />
              <FeaturedProducts openVideoModal={setModalVideoUrl} />
              <AdBanner />
              <BenefitsSection />
            </>
          )}
          {page === 'men' && <CategoryPage title="Men's Shoes & Apparel" audience="Men" openVideoModal={setModalVideoUrl} />}
          {page === 'women' && <CategoryPage title="Women's Shoes & Apparel" audience="Women" openVideoModal={setModalVideoUrl} />}
          {page === 'kids' && <CategoryPage title="Kids' Shoes & Apparel" audience="Kids" openVideoModal={setModalVideoUrl} />}
          {page === 'payment' && <PaymentPage setPage={setPage} />}
        </main>
        <Footer />
      </div>

      {/* Video Modal */}
      {modalVideoUrl && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center animate-fade-in"
          onClick={() => setModalVideoUrl(null)}
        >
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease-out;
            }
          `}</style>
          <div 
            className="relative w-full max-w-4xl aspect-video p-4"
            onClick={(e) => e.stopPropagation()} 
          >
            <video
              src={modalVideoUrl}
              autoPlay
              controls
              loop
              className="w-full h-full rounded-lg shadow-2xl shadow-white/10"
            />
             <CloseIcon 
               onClick={() => setModalVideoUrl(null)} 
               className="absolute top-0 right-0 text-white bg-black/50 rounded-full p-1.5 hover:bg-black/80 transition-colors"
             />
          </div>
        </div>
      )}
    </CartProvider>
  );
};

export default App;
