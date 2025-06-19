import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, User, LogOut, Package, Settings } from 'lucide-react';
import CategorySidebar from './CategorySidebar';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { getAllProducts } from '../data/products';
import SearchResults from './SearchResults';
import { Product } from '../types';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
      
      if (token && email) {
        setIsLoggedIn(true);
        setUserEmail(email);
        
        // Try to get user name from profile data
        try {
          const profileData = localStorage.getItem('userProfile');
          if (profileData) {
            const profile = JSON.parse(profileData);
            setUserName(profile.name || email.split('@')[0]);
          } else {
            setUserName(email.split('@')[0]);
          }
        } catch (error) {
          setUserName(email.split('@')[0]);
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail('');
        setUserName('');
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userProfile');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    
    // Update state
    setIsLoggedIn(false);
    setUserEmail('');
    setUserName('');
    setShowUserDropdown(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const products = getAllProducts();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top notification bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Summer Sale For All Swim Suits And Free Express Delivery - Off 50%! 
        <a href="/products" className="ml-2 font-bold hover:underline">ShopNow</a>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden flex items-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800 flex-shrink-0">
            Rezkokom
          </a>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-800 hover:text-purple-600 transition-colors">Home</a>
            <a href="/contact" className="text-gray-800 hover:text-purple-600 transition-colors">Contact</a>
            <a href="/about" className="text-gray-800 hover:text-purple-600 transition-colors">About</a>
            {!isLoggedIn && (
              <a href="/signup" className="text-gray-800 hover:text-purple-600 transition-colors">Sign Up</a>
            )}
          </nav>
          
          {/* Search, wishlist, cart, user */}
          <div className="flex items-center space-x-4">
            <div ref={searchRef} className="hidden md:block relative">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
              {showSearchResults && (
                <SearchResults 
                  results={searchResults} 
                  onClose={() => setShowSearchResults(false)} 
                />
              )}
            </div>
            
            <a
              href="/wishlist"
              className="text-gray-700 hover:text-purple-600 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={24} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </a>
            
            <a 
              href="/cart"
              className="text-gray-700 hover:text-purple-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </a>

            {/* User Authentication */}
            {isLoggedIn ? (
              <div ref={userDropdownRef} className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <User size={24} />
                  <span className="hidden lg:block text-sm font-medium">{userName}</span>
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </a>
                    
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <Package size={16} className="mr-2" />
                      My Orders
                    </a>
                    
                    <a
                      href="/wishlist"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <Heart size={16} className="mr-2" />
                      Wishlist
                    </a>
                    
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                    
                    <div className="border-t">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a 
                href="/login" 
                className="hidden lg:inline-block px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${showMenu ? 'block' : 'hidden'} px-4 pb-4`}>
        <div className="mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="What are you looking for?"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
          {showSearchResults && (
            <SearchResults 
              results={searchResults} 
              onClose={() => setShowSearchResults(false)} 
            />
          )}
        </div>
        
        <nav className="flex flex-col space-y-4">
          <a href="/" className="text-gray-800 hover:text-purple-600 transition-colors">Home</a>
          <a href="/contact" className="text-gray-800 hover:text-purple-600 transition-colors">Contact</a>
          <a href="/about" className="text-gray-800 hover:text-purple-600 transition-colors">About</a>
          
          {isLoggedIn ? (
            <>
              <a href="/profile" className="text-gray-800 hover:text-purple-600 transition-colors">My Profile</a>
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/signup" className="text-gray-800 hover:text-purple-600 transition-colors">Sign Up</a>
              <a href="/login" className="text-gray-800 hover:text-purple-600 transition-colors">Login</a>
            </>
          )}
        </nav>
        
        <CategorySidebar isMobile={true} />
      </div>
    </header>
  );
};

export default Header;