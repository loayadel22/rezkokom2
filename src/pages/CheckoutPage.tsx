import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { BillingDetails } from '../types';
import { AlertCircle, CheckCircle, CreditCard, Truck, Shield } from 'lucide-react';

interface CheckoutApiResponse {
  success: boolean;
  message: string;
  orderId?: string;
  errors?: string[];
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setBillingDetails(prev => ({ ...prev, emailAddress: email }));
    }

    // Redirect to login if cart is empty
    if (cartItems.length === 0 && !orderSuccess) {
      window.location.href = '/cart';
    }
  }, [cartItems.length, orderSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!billingDetails.firstName.trim()) {
      newErrors.push('First name is required');
    }
    
    if (!billingDetails.streetAddress.trim()) {
      newErrors.push('Street address is required');
    }
    
    if (!billingDetails.townCity.trim()) {
      newErrors.push('Town/City is required');
    }
    
    if (!billingDetails.phoneNumber.trim()) {
      newErrors.push('Phone number is required');
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(billingDetails.phoneNumber)) {
      newErrors.push('Please enter a valid phone number');
    }
    
    if (!billingDetails.emailAddress.trim()) {
      newErrors.push('Email address is required');
    } else if (!/\S+@\S+\.\S+/.test(billingDetails.emailAddress)) {
      newErrors.push('Please enter a valid email address');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      return;
    }
    
    // Simulate coupon validation
    const validCoupons = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FIRST15': 15
    };
    
    const discountPercent = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons];
    
    if (discountPercent) {
      setDiscount(discountPercent);
      alert(`Coupon applied! ${discountPercent}% discount`);
    } else {
      alert('Invalid coupon code');
    }
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors([]);
    
    try {
      // Prepare order data
      const orderData = {
        billingDetails,
        paymentMethod,
        items: cartItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
          total: (item.product.salePrice || item.product.price) * item.quantity
        })),
        subtotal: getCartTotal(),
        discount: discount,
        discountAmount: (getCartTotal() * discount) / 100,
        total: calculateTotal(),
        couponCode: couponCode || null
      };

      // Get auth token
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      // Simulate API call (replace with your actual checkout endpoint)
      const response = await fetch('https://ecommerceloay22.runasp.net/api/Order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(orderData)
      });
      
      const data: CheckoutApiResponse = await response.json();
      
      if (data.success) {
        // Order successful
        setOrderSuccess(true);
        setOrderId(data.orderId || 'ORD-' + Date.now());
        clearCart();
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Handle API errors
        if (data.errors && data.errors.length > 0) {
          setErrors(data.errors);
        } else {
          setErrors([data.message || 'Order failed. Please try again.']);
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  // Success page
  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-800 mb-4">Order Confirmed!</h1>
            <p className="text-green-700 mb-6">
              Thank you for your order. Your order has been successfully placed and is being processed.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              <p className="text-gray-600">Order ID: <span className="font-mono font-medium">{orderId}</span></p>
              <p className="text-gray-600">Total: <span className="font-semibold">${calculateTotal().toFixed(2)}</span></p>
              <p className="text-gray-600">Email: {billingDetails.emailAddress}</p>
            </div>
            
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors"
              >
                Continue Shopping
              </a>
              <div>
                <a
                  href="/orders"
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  View Order Status
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Authentication Notice */}
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700">
                <a href="/login" className="font-medium underline">Sign in</a> to your account for faster checkout and order tracking.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Billing Details Form */}
        <div className="lg:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Billing Details</h1>
          
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h3>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={billingDetails.companyName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address*
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={billingDetails.streetAddress}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={billingDetails.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Town/City*
              </label>
              <input
                type="text"
                name="townCity"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={billingDetails.townCity}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={billingDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address*
              </label>
              <input
                type="email"
                name="emailAddress"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={billingDetails.emailAddress}
                onChange={handleInputChange}
                readOnly={isLoggedIn}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveInfo"
                id="saveInfo"
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                checked={billingDetails.saveInfo}
                onChange={handleInputChange}
              />
              <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
                Save this information for faster check-out next time
              </label>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Payment Method</h2>
              
              <div className="space-y-3">
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                  />
                  <label htmlFor="card" className="ml-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">Credit/Debit Card</span>
                  </label>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
                  />
                  <label htmlFor="cod" className="ml-3 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Order...
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%):</span>
                    <span>-${((getCartTotal() * discount) / 100).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-500">Free</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Security Notice */}
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;