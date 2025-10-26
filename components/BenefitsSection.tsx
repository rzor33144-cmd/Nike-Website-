
import React from 'react';

const FeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-white"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mb-4 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);


const benefits = [
  {
    icon: <FeatherIcon />,
    title: 'Lightweight Cushioning',
    description: 'Nike Air technology consists of pressurized air inside a tough, yet flexible bag, providing more spring without compromising structure.'
  },
  {
    icon: <ZapIcon />,
    title: 'Energy Return',
    description: 'The cushioning absorbs impact and then returns to its original shape to provide a responsive, energetic feel with every step you take.'
  },
  {
    icon: <ShieldIcon />,
    title: 'Lasting Durability',
    description: 'Air soles are designed to provide cushioning that lasts for the life of the shoe, ensuring consistent performance from day one.'
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-[#111]">
      <div className="container mx-auto px-6">
        <h2 className="font-anton text-5xl md:text-7xl uppercase text-center animate-on-scroll">Engineered for Excellence</h2>
        <p className="text-center mt-4 max-w-2xl mx-auto text-gray-300 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
          More than just an aesthetic, Nike Air is a revolutionary technology that changed the game.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 text-center">
          {benefits.map((benefit, cardIndex) => (
            <div 
              key={cardIndex} 
              className="flex flex-col items-center"
            >
              <div className="animate-on-scroll" style={{ transitionDelay: `${cardIndex * 150}ms` }}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold mt-2 animate-on-scroll" style={{ transitionDelay: `${cardIndex * 150 + 100}ms` }}>{benefit.title}</h3>
              <p className="text-gray-400 mt-4 animate-on-scroll" style={{ transitionDelay: `${cardIndex * 150 + 200}ms` }}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;