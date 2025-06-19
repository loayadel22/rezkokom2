import React, { useState } from 'react';
import { Package, Filter, SlidersHorizontal } from 'lucide-react';
import { getAllProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const products = getAllProducts();
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Package className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold">All Products</h1>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 text-gray-600"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input type="checkbox" id={category} className="mr-2" />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="price-1" className="mr-2" />
                  <label htmlFor="price-1">Under $100</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-2" className="mr-2" />
                  <label htmlFor="price-2">$100 - $300</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-3" className="mr-2" />
                  <label htmlFor="price-3">$300 - $500</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-4" className="mr-2" />
                  <label htmlFor="price-4">Over $500</label>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-medium mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                    <label htmlFor={`rating-${rating}`} className="flex items-center">
                      {[...Array(rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">★</span>
                      ))}
                      <span className="ml-2">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default ProductsPage;