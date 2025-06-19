import React, { useState } from 'react';
import { Heart, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';
import { getProductById } from '../data/products';

interface ProductPageProps {
  productId?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const [selectedColor, setSelectedColor] = useState<'white' | 'pink'>('white');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('');
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const { addToCart } = useCart();

  // Get product data
  const product = getProductById(Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/checkout';
  };

  const handleDeliveryCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDeliveryInfo(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span 
        key={index}
        className={`text-lg ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="border rounded-lg p-2 cursor-pointer hover:border-red-500">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${index}`}
                    className="w-full h-20 object-cover rounded"
                  />
                </div>
              ))}
            </div>
            <div className="col-span-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-600">({product.totalReviews} Reviews)</span>
            </div>
            <div className="mx-4 text-gray-300">|</div>
            <span className="text-green-500">In Stock</span>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">${product.salePrice}</span>
                  <span className="ml-4 text-xl text-gray-500 line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Colors</h3>
            <div className="flex space-x-4 mt-2">
              <button
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === 'white' ? 'border-red-500' : 'border-gray-300'
                } bg-white`}
                onClick={() => setSelectedColor('white')}
              />
              <button
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === 'pink' ? 'border-red-500' : 'border-gray-300'
                } bg-pink-300`}
                onClick={() => setSelectedColor('pink')}
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex space-x-4 mt-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? 'border-red-500 text-red-500'
                      : 'border-gray-300 text-gray-700 hover:border-red-500'
                  }`}
                  onClick={() => setSelectedSize(size as any)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-4">
            <div className="flex items-center border rounded">
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            
            <button
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              <Heart size={20} className="mr-2" />
              Wishlist
            </button>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-8 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Buy Now
            </button>
            
            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-8 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-8 border rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Truck size={24} className="text-gray-600" />
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <form onSubmit={handleDeliveryCheck} className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Enter your postal code"
                    className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white rounded-r hover:bg-gray-800"
                  >
                    Check
                  </button>
                </form>
                {showDeliveryInfo && (
                  <p className="text-sm text-green-500 mt-2">
                    Free delivery available for your location!
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <RotateCcw size={24} className="text-gray-600" />
              <div>
                <h3 className="font-medium">Return Delivery</h3>
                <p className="text-sm text-gray-600">
                  Free 30 Days Delivery Returns. <a href="#details" className="text-red-500">Details</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;