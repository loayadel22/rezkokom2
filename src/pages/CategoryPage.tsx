import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
  categoryId: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryId }) => {
  const categoryNames: { [key: string]: string } = {
    '1': "Men's Fashion",
    '2': 'Electronics'
  };

  const categoryName = categoryNames[categoryId] || 'Category';
  const products = getProductsByCategory(categoryName);
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">{categoryName}</h1>
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

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="price-1" className="mr-2" />
                  <label htmlFor="price-1">Under $50</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-2" className="mr-2" />
                  <label htmlFor="price-2">$50 - $100</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-3" className="mr-2" />
                  <label htmlFor="price-3">$100 - $200</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price-4" className="mr-2" />
                  <label htmlFor="price-4">Over $200</label>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
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

            {/* Availability */}
            <div>
              <h3 className="font-medium mb-4">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="in-stock" className="mr-2" />
                  <label htmlFor="in-stock">In Stock</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="on-sale" className="mr-2" />
                  <label htmlFor="on-sale">On Sale</label>
                </div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;