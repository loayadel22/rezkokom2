import React from 'react';
import {
  ChevronRight,
  Gamepad,
  Package,
  Car,
  ShoppingBasket,
} from 'lucide-react';

interface CategorySidebarProps {
  isMobile?: boolean;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  isMobile = false,
}) => {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: <Gamepad size={16} />,
      items: 125,
      path: '/gaming',
    },
    {
      id: 2,
      name: 'Products',
      icon: <Package size={16} />,
      items: 243,
      path: '/products',
    },
    {
      id: 3,
      name: 'Automotive',
      icon: <Car size={16} />,
      items: 84,
      path: '/automotive',
    },
    {
      id: 4,
      name: 'Sports',
      icon: <ShoppingBasket size={16} />,
      items: 165,
      path: '/sports',
    },
  ];

  const baseClasses = isMobile
    ? 'mt-4 pt-4 border-t border-gray-200'
    : 'hidden lg:block w-64 pr-8';

  return (
    <div className={baseClasses}>
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={category.path}
              className="flex items-center justify-between px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-400 group-hover:text-purple-600 transition-colors">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>({category.items})</span>
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
