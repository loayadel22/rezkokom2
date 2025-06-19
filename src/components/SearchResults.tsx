import React from 'react';
import { Product } from '../types';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  results: Product[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg p-4 z-50">
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Search size={24} className="mr-2" />
          <span>No results found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white mt-2 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {results.map(product => (
        <a
          key={product.id}
          href={`/product/${product.id}`}
          className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
          onClick={onClose}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="ml-4">
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-red-500 font-medium">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SearchResults;