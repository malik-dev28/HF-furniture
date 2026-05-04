import React from 'react';
import Title from '../components/Title';

// CHANGE THIS LINK TO UPDATE THE VIDEO
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/embedc";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/";

const HowToUse = () => {
  const openYouTube = () => {
    window.open(YOUTUBE_WATCH_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            How to Use <span className="text-indigo-600 italic">HF</span>
          </h1>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            A minimalist guide to navigating your premium furniture shopping experience.
          </p>
        </div>

        {/* Video Section with Glassmorphism */}
        <div className="relative group mb-20 animate-in zoom-in-95 duration-1000 delay-200">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-blue-50 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <div className="aspect-video w-full bg-gray-100">
              <iframe
                title="Tutorial video"
                src={YOUTUBE_VIDEO_URL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-gray-50">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Interactive Tutorial</h3>
                <p className="text-gray-500 text-sm">Experience the full guide with high-quality playback.</p>
              </div>
              <button 
                onClick={openYouTube} 
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-indigo-600 shadow-lg hover:shadow-indigo-200"
              >
                <span className="relative z-10">Watch on YouTube</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist Steps */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-12">
            {[
              { id: '01', title: 'Curated Browsing', desc: 'Explore our hand-picked collections with high-resolution previews and intelligent search filters.' },
              { id: '02', title: 'Personalized Selection', desc: 'Choose from a variety of premium materials and color swatches tailored to your interior needs.' },
              { id: '03', title: 'Seamless Checkout', desc: 'Finalize your purchase through our streamlined, secure payment and delivery gateway.' },
              { id: '04', title: 'Live Tracking', desc: 'Monitor every stage of your furniture&apos;s journey from our workshop to your doorstep.' },
            ].map((step, index) => (
              <div 
                key={step.id} 
                className={`flex gap-8 group animate-in slide-in-from-left-8 duration-700`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors duration-300">
                    <span className="text-lg font-bold text-gray-400 group-hover:text-indigo-600 transition-colors">{step.id}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in-from-left-8 { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes zoom-in-95 { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        
        .animate-in {
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .slide-in-from-left-8 { animation-name: slide-in-from-left-8; }
        .zoom-in-95 { animation-name: zoom-in-95; }
        
        .delay-200 { animation-delay: 200ms; }
        .duration-700 { animation-duration: 700ms; }
        .duration-1000 { animation-duration: 1000ms; }
      `}</style>
    </div>
  );
};

export default HowToUse;
