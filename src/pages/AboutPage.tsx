import React from 'react';
import { ShoppingBag, Truck, Headphones, CreditCard } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">Our Story</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to Rezkokom, your number one source for all things electronics
          and fashion. We're dedicated to providing you the very best of
          products, with an emphasis on quality, service, and uniqueness.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <img
            src="http://static1.squarespace.com/static/5f95a2988b73fb2d14874ce3/5ff128f2ef2f3400f085df34/5ff128f9ef2f3400f085e2bc/1609640185464/5-Engagement-Tips.jpg?format=original"
            alt="Team working"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, Rezkokom has come a long way from its beginnings in
            Cairo. When we first started out, our passion for providing quality
            products drove us to start this business.
          </p>
          <p className="text-gray-600 mb-4">
            We now serve customers all over Egypt, and are thrilled to be a part
            of the eco-friendly, fair trade wing of the fashion and electronics
            industry.
          </p>
          <p className="text-gray-600">
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-4">
            <ShoppingBag size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">10K</h3>
          <p className="text-gray-600">Products for Sale</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-4">
            <Truck size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">5K+</h3>
          <p className="text-gray-600">Successful Deliveries</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-4">
            <Headphones size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7</h3>
          <p className="text-gray-600">Customer Support</p>
        </div>

        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <div className="inline-block p-4 bg-red-100 rounded-full text-red-500 mb-4">
            <CreditCard size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">100%</h3>
          <p className="text-gray-600">Secure Payments</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img
              src="https://pbs.twimg.com/profile_images/1895159526829015040/anm1eitN_400x400.jpg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Loay Adel</h3>
            <p className="text-gray-600">Front End Developer</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img
              src="https://pbs.twimg.com/profile_images/1895159526829015040/anm1eitN_400x400.jpg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Loay Adel </h3>
            <p className="text-gray-600">Front End Developer</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <img
              src="https://pbs.twimg.com/profile_images/1895159526829015040/anm1eitN_400x400.jpg"
              alt="Team member"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Loay Adel </h3>
            <p className="text-gray-600">Front End Developer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-red-500 text-white py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
        <p className="mb-8">
          Discover our amazing collection of products today!
        </p>
        <a
          href="/shop"
          className="inline-block bg-white text-red-500 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
