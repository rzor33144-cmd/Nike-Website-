import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="font-anton text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] uppercase tracking-tighter text-shadow-custom">
          <span className="text-stroke">FEEL THE</span>
          <br />
          <span className="text-white">UNREAL AIR</span>
        </h1>
        <p className="mt-4 max-w-xl text-base md:text-lg text-gray-200">
          Engineered to the exact specifications of championship athletes. The future of Air is here.
        </p>
        <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300">
          Explore Air Max
        </button>
      </div>
    </section>
  );
};

export default Hero;
