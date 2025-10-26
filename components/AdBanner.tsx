
import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <section 
      className="py-40 bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="container mx-auto px-6 text-center bg-black/60 backdrop-blur-sm py-16 rounded-xl animate-on-scroll">
        <h2 className="font-anton text-5xl md:text-7xl uppercase text-white">The Revolution Never Ends</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-200">
          Discover the full collection of Nike Air, from the classics that started it all to the latest drops pushing the boundaries of design and technology.
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
          Shop All Air Max
        </button>
      </div>
    </section>
  );
};

export default AdBanner;
