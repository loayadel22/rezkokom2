import React from 'react';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Car } from 'lucide-react';

const AutomotivePage: React.FC = () => {
  const products = getProductsByCategory('Automotive');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-red-100 rounded-lg">
          <Car className="w-6 h-6 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">Automotive</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Car className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Automotive Products Found</h3>
            <p className="text-gray-500">Check back later for new automotive products.</p>
          </div>
        )}
      </div>

      {products.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded">1</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded hover:bg-gray-50">Next</button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AutomotivePage;