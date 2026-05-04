import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            About <span className="text-indigo-600 italic">HF</span>
          </h1>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Crafting the future of office environments with luxury, ergonomics, and timeless design.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2 relative group animate-in slide-in-from-left-8 duration-1000">
            <div className="absolute -inset-4 bg-indigo-50 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
            <img 
              className="relative w-full aspect-[4/3] object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
              src={assets.about_img} 
              alt="About HF" 
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-right-8 duration-1000">
            <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
              <p>
                Hamad Furniture is a premier importer and manufacturer of high-quality office furniture based in Addis Ababa, Ethiopia. With years of expertise, we specialize in luxury and ergonomic solutions designed to elevate professional environments.
              </p>
              <p>
                From executive desks to modular workstations, we ensure style, durability, and comfort in every piece. Whether for a corporate hub or a startup, HF is your partner in professional excellence.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <span className="text-indigo-600">🎯</span> Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering businesses with world-class furniture solutions that blend function, aesthetics, and well-being.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose HF?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: '💎',
              title: 'Premium Quality',
              desc: 'Every product is crafted from elite materials with rigorous quality control for long-lasting performance.',
            },
            {
              icon: '🎨',
              title: 'Elite Design',
              desc: 'We create furniture that looks sophisticated and supports workplace productivity through ergonomic innovation.',
            },
            {
              icon: '🤝',
              title: 'Trusted Partner',
              desc: 'Reliable delivery and tailored solutions for corporate, government, and private institutional projects.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${200 * index}ms` }}
            >
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <NewsletterBox />
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in-from-left-8 { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-from-right-8 { from { opacity: 0; transform: translateX(32px); } to { opacity: 1; transform: translateX(0); } }
        
        .animate-in {
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .slide-in-from-left-8 { animation-name: slide-in-from-left-8; }
        .slide-in-from-right-8 { animation-name: slide-in-from-right-8; }
        
        .duration-1000 { animation-duration: 1000ms; }
      `}</style>
    </div>
  );
};

export default About;
