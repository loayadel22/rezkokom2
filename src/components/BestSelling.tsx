import React from 'react';
import { Award } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import { getBestSellingProducts } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BestSelling: React.FC = () => {
  const products = getBestSellingProducts();

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <SectionTitle
            title="Best Selling Products"
            subtitle="This Month"
            icon={<Award size={20} />}
            actionLabel="View All"
            actionUrl="/products"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showAddToCart={false}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="hidden sm:flex items-center space-x-4">
            <button
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <a
            href="/products"
            className="sm:ml-auto inline-block px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
