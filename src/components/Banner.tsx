import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  url: string;
  align?: 'left' | 'right' | 'center';
}

const Banner: React.FC = () => {
  const slides: BannerSlide[] = [
    {
      id: 1,
      image:
        'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'iPhone 14 Series',
      subtitle: 'Up to 10% off Voucher',
      cta: 'Shop Now',
      url: '/products',
      align: 'left',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1584060622420-0673aad46076?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Browse premium related',
      subtitle: 'Performance that exceeds expectations',
      cta: 'View Collection',
      url: '/automotive',
      align: 'right',
    },
    {
      id: 3,
      image:
        'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Latest Laptops',
      subtitle: 'Time for an upgrade',
      cta: 'Explore Now',
      url: '/gaming',
      align: 'center',
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <div className="relative h-64 md:h-96 lg:h-[500px] w-full overflow-hidden">
      {/* Previous button */}
      <button
        className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-white/50 rounded-full p-1 backdrop-blur hover:bg-white/80 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      {/* Next button */}
      <button
        className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-white/50 rounded-full p-1 backdrop-blur hover:bg-white/80 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      {/* Slides */}
      <div className="h-full relative">
        {slides.map((slide, index) => {
          const isActive = index === current;

          // Determine text alignment class based on the slide's align property
          const alignClass =
            slide.align === 'right'
              ? 'text-right items-end'
              : slide.align === 'center'
              ? 'text-center items-center'
              : 'text-left items-start';

          return (
            <div
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                  <div className={`flex flex-col ${alignClass} max-w-md`}>
                    <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-white text-sm md:text-lg mb-4 md:mb-6">
                      {slide.subtitle}
                    </p>
                    <a
                      href={slide.url}
                      className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded text-sm md:text-base font-medium inline-flex items-center hover:bg-gray-100 transition-colors self-start"
                    >
                      {slide.cta}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
