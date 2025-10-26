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

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState('home');

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

  return (
    <CartProvider goToPayment={() => setPage('payment')}>
      <div ref={scrollRef} className="bg-[#111] text-white overflow-x-hidden">
        <Header page={page} setPage={setPage} />
        <Cart />
        <main>
          {page === 'home' && (
            <>
              <Hero />
              <FeaturedProducts />
              <AdBanner />
              <BenefitsSection />
            </>
          )}
          {page === 'men' && <CategoryPage title="Men's Shoes & Apparel" audience="Men" />}
          {page === 'women' && <CategoryPage title="Women's Shoes & Apparel" audience="Women" />}
          {page === 'kids' && <CategoryPage title="Kids' Shoes & Apparel" audience="Kids" />}
          {page === 'payment' && <PaymentPage setPage={setPage} />}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
