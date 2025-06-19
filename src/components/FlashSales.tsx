import React from 'react';
import { Clock } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ProductCard from './ProductCard';
import CountdownTimer from './CountdownTimer';
import { getFlashSaleProducts } from '../data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlashSales: React.FC = () => {
  const products = getFlashSaleProducts();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <SectionTitle
            title="Flash Sales"
            subtitle="Today's"
            icon={<Clock size={20} />}
          />

          <CountdownTimer />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4">
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
        </div>

        <div className="mt-8 text-center">
          <a
            href="/products"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
