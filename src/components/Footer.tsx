import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, PhoneCall } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Rezkokom</h3>
            <button className="border border-white px-4 py-2 mt-2 hover:bg-white hover:text-black transition-colors">
              Subscribe
            </button>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <address className="not-italic">
              <p className="mb-2">23 July Street Cairo</p>
              <p className="mb-2">Egypt</p>
              <p className="mb-2">rezkokom@gmail.com</p>
              <p className="flex items-center mb-2">
                <PhoneCall size={16} className="mr-2" />
                <span>+201023662778</span>
              </p>
            </address>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-xl font-bold mb-4">Account</h3>
            <ul className="space-y-2">
              <li><a href="/login" className="hover:underline">My Account</a></li>
              <li><a href="/signup" className="hover:underline">Login / Register</a></li>
              <li><a href="/cart" className="hover:underline">Cart</a></li>
              <li><a href="/home" className="hover:underline">Shop</a></li>
            </ul>
          </div>
          
          {/* Download app */}
          <div>
            <h3 className="text-xl font-bold mb-4">Download App</h3>
            <div className="flex space-x-4 mt-4">
              <div className="bg-white p-2 rounded">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                  alt="QR Code" 
                  className="w-24 h-24"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <a href="#" className="block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-10"
                  />
                </a>
                <a href="#" className="block">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social links */}
        <div className="flex justify-center space-x-6 mt-12 pt-8 border-t border-gray-800">
          <a href="https://www.facebook.com/" className="hover:text-purple-400 transition-colors">
            <Facebook size={24} />
          </a>
          <a href="x.https://x.com" className="hover:text-purple-400 transition-colors">
            <Twitter size={24} />
          </a>
          <a href="https://www.instagram.com/" className="hover:text-purple-400 transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/" className="hover:text-purple-400 transition-colors">
            <Linkedin size={24} />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Rezkokom. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;