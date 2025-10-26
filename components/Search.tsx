
import React, { useState, useEffect, useRef } from 'react';
import { FEATURED_SHOES } from '../constants';
import { Shoe } from '../types';
import { useCart } from '../CartContext';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} aria-label="Close search" className="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Shoe[]>([]);
  const { addToCart } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filteredResults = FEATURED_SHOES.filter(
      shoe =>
        shoe.name.toLowerCase().includes(lowercasedQuery) ||
        shoe.category.toLowerCase().includes(lowercasedQuery) ||
        shoe.audience.toLowerCase().includes(lowercasedQuery)
    );
    setResults(filteredResults);
  }, [query]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the input when the search opens
      setTimeout(() => inputRef.current?.focus(), 300); // timeout matches transition
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  const handleAddToCart = (shoe: Shoe) => {
    addToCart(shoe);
    handleClose();
  };

  return (
    <div
        className={`fixed inset-0 bg-[#111] z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-heading"
    >
        <div className="container mx-auto px-6 h-full flex flex-col">
            <header className="flex-shrink-0 flex items-center justify-between py-6">
                <h2 id="search-heading" className="font-anton text-3xl uppercase">Search</h2>
                <CloseIcon onClick={handleClose} />
            </header>
            <div className="relative mb-6">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for Air Max, VaporMax, etc."
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 rounded-full py-4 pl-6 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <div className="flex-grow overflow-y-auto pb-6">
                {query.trim() !== '' && results.length > 0 && (
                    <p className="text-gray-400 mb-4">Showing {results.length} results for "{query}"</p>
                )}
                {results.length > 0 ? (
                    <ul className="space-y-4">
                        {results.map(shoe => (
                            <li key={shoe.id} className="flex items-center space-x-4 bg-[#1a1a1a] p-3 rounded-lg">
                                <div className="w-20 h-20 bg-black rounded-md p-1 flex-shrink-0">
                                    <img src={shoe.imageUrl} alt={shoe.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold">{shoe.name}</h3>
                                    <p className="text-gray-400 text-sm">{shoe.category}</p>
                                    <p className="font-bold mt-1">{shoe.price}</p>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(shoe)}
                                    className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors flex-shrink-0"
                                >
                                    Add to Bag
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    query.trim() !== '' ? (
                        <div className="text-center pt-16">
                            <p className="text-gray-400 text-lg">No results found for "{query}"</p>
                            <p className="text-gray-500 mt-2">Try checking your spelling or searching for something else.</p>
                        </div>
                    ) : (
                         <div className="text-center pt-16">
                            <p className="text-gray-400 text-lg">Find your next pair of Nikes.</p>
                            <p className="text-gray-500 mt-2">Search by name, category, or style.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
  );
};

export default Search;
