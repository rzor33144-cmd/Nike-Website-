import React from 'react';
import { FEATURED_SHOES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Shoe } from '../types';

interface CategoryPageProps {
  title: string;
  audience: 'Men' | 'Women' | 'Kids';
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, audience }) => {
  const filteredShoes = FEATURED_SHOES.filter(shoe => shoe.audience === audience || shoe.audience === 'Unisex');

  return (
    <section className="py-20 md:py-32 bg-black min-h-screen pt-32">
      <div className="container mx-auto px-6">
        <div className="animate-on-scroll is-visible">
          <h1 className="font-anton text-5xl md:text-7xl uppercase text-center mb-16">{title}</h1>
        </div>
        {filteredShoes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredShoes.map((shoe, index) => (
              <ProductCard key={shoe.id} shoe={shoe} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-xl">
            No products found for this category yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
