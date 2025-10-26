
import React from 'react';
import { FEATURED_SHOES } from '../constants';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  openVideoModal: (url: string) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ openVideoModal }) => {
  return (
    <section id="featured" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-anton text-5xl md:text-7xl uppercase text-center animate-on-scroll">Always Iconic</h2>
        <p className="text-center mt-4 max-w-2xl mx-auto text-gray-300 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
          A pillar of sneaker culture, the Air Max continues to evolve, innovate, and inspire.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {FEATURED_SHOES.slice(0, 3).map((shoe, index) => (
            <ProductCard key={shoe.id} shoe={shoe} index={index} openVideoModal={openVideoModal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
