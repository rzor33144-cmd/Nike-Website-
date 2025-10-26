import React, { useState, useRef, useEffect } from 'react';
import { Shoe } from '../types';
import { useCart } from '../CartContext';

const PlayIcon: React.FC = () => (
  <svg className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

interface ProductCardProps {
  shoe: Shoe;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ shoe, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay was prevented, this is a common browser policy.
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const handleAddToCart = () => {
    addToCart(shoe);
  };

  return (
    <div
      className="bg-[#1a1a1a] rounded-xl overflow-hidden group animate-on-scroll"
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => shoe.videoUrl && setIsHovered(true)}
      onMouseLeave={() => shoe.videoUrl && setIsHovered(false)}
    >
      <div className="overflow-hidden relative h-64 sm:h-72">
        <img
          src={shoe.imageUrl}
          alt={shoe.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out product-card-image"
        />
        {shoe.videoUrl && (
          <>
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={shoe.videoUrl} type="video/mp4" />
            </video>
            { !isHovered &&
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center backdrop-blur-sm cursor-pointer">
                <PlayIcon />
                <span>Hover for video</span>
              </div>
            }
          </>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold">{shoe.name}</h3>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{shoe.category}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg sm:text-xl font-bold">{shoe.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
