import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.product.id, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement coupon logic here
    console.log('Applying coupon:', couponCode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
              <a href="/" className="text-red-500 hover:text-red-600 mt-4 inline-block">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">Unit Price: ${item.product.salePrice || item.product.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="font-medium">
                      ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Cart Total</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-500">Free</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Apply
                </button>
              </form>
              
              <a
                href="/checkout"
                className="block w-full text-center px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Proceed to Checkout
              </a>
              
              <a
                href="/"
                className="block w-full text-center px-6 py-3 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;