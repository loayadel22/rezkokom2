import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/product/${product.id}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const calculateDiscount = () => {
    if (!product.salePrice) return 0;
    return Math.round(((product.price - product.salePrice) / product.price) * 100);
  };

  return (
    <a href={`/product/${product.id}`} className="block">
      <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Product image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Sale badge */}
          {product.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{calculateDiscount()}%
            </div>
          )}
          
          {/* New badge */}
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              NEW
            </div>
          )}
          
          {/* Quick actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={toggleWishlist}
              className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} shadow hover:scale-105 transition-transform`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
            </button>
            
            <button 
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white text-gray-700 shadow hover:scale-105 transition-transform"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({product.totalReviews})</span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center">
            {product.salePrice ? (
              <>
                <span className="text-red-500 font-semibold">${product.salePrice}</span>
                <span className="ml-2 text-gray-500 text-sm line-through">${product.price}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price}</span>
            )}
          </div>
        </div>
        
        {/* Add to cart button */}
        {showAddToCart && (
          <div className="px-4 pb-4">
            <button 
              onClick={handleAddToCart}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} className="mr-2" />
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProductCard;