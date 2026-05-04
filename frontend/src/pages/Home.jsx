import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => {
  return (
    <div className="bg-white relative overflow-hidden">
      <style>{styles}</style>
      
      {/* Hero Section - Full-bleed */}
      <section className="relative w-full min-h-screen flex items-center justify-center m-0 p-0">
        <Hero />
      </section>

      {/* Latest Collection Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-10 lg:px-16 bg-white z-10">
        <div className="max-w-7xl mx-auto w-full">
          <LatestCollection />
        </div>
      </section>

      {/* Best Seller Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-10 lg:px-16 bg-gradient-to-b from-gray-50/80 to-white z-10">
        <div className="max-w-7xl mx-auto w-full">
          <BestSeller />
        </div>
      </section>

      {/* Our Policy Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-10 lg:px-16 bg-white z-10 border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto w-full">
          <OurPolicy />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 px-4 sm:px-10 lg:px-16 bg-gradient-to-b from-white to-indigo-50/20 z-10">
        <div className="max-w-4xl mx-auto w-full">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
};

// Custom Tailwind animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out forwards;
  }

  .animate-slide-in {
    animation: slide-in 1s ease-out forwards;
  }
`;

export default Home;
