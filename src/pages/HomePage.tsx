import React from 'react';
import Banner from '../components/Banner';
import CategorySidebar from '../components/CategorySidebar';
import FlashSales from '../components/FlashSales';
import BestSelling from '../components/BestSelling';
import ExploreProducts from '../components/ExploreProducts';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row py-4 gap-8">
          <CategorySidebar />
          <div className="flex-grow">
            <Banner />
          </div>
        </div>
      </div>
      
      <FlashSales />
      <BestSelling />
      <ExploreProducts />
    </div>
  );
};

export default HomePage;