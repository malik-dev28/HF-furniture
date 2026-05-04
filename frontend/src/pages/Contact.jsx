import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const locations = [
  {
    title: 'Hamad Furniture Factory',
    address: 'Bole Sub City, Zone 5, Addis Ababa, Ethiopia',
    phone: '(+251) 11 123 4567',
    email: 'factory@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.523188349578!2d38.79412141469094!3d9.01320219351355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16470b46d6ca7781%3A0xba0aec0d0bdec930!2sAbubaker%20Furnitures!5e1!3m2!1sam!2set!4v1698259200000!5m2!1sam!2set',
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    title: 'Hamad Shop 1',
    address: 'Friendship Building, Ground Floor, Addis Ababa, Ethiopia',
    phone: '(+251) 11 234 5678',
    email: 'shop1@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.523188349578!2d38.79412141469094!3d9.01320219351355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16470b46d6ca7781%3A0xba0aec0d0bdec930!2sAbubaker%20Furnitures!5e1!3m2!1sam!2set!4v1698259200000!5m2!1sam!2set',
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    title: 'Hamad Shop 2',
    address: 'Edna Mall, 2nd Floor, Addis Ababa, Ethiopia',
    phone: '(+251) 11 345 6789',
    email: 'shop2@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.523188349578!2d38.79412141469094!3d9.01320219351355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16470b46d6ca7781%3A0xba0aec0d0bdec930!2sAbubaker%20Furnitures!5e1!3m2!1sam!2set!4v1698259200000!5m2!1sam!2set',
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  },
];

const Contact = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-28 pt-28 md:pt-36 pb-16 bg-gradient-to-r from-indigo-50 via-white to-purple-50 min-h-screen relative overflow-hidden">
      <style>{styles}</style>
      
      <div className="text-center mb-16 animate-fade-in">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-16 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 sm:gap-16 animate-slide-in">
        <div className="w-full lg:w-1/2 flex justify-center relative group">
          <img
            className="w-full max-w-[500px] rounded-[2rem] shadow-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            src={assets.contact_img}
            alt="Contact"
          />
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-6">
          <p className="font-black text-3xl md:text-4xl text-gray-800 tracking-tight">Get in Touch</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
            We'd love to hear from you. Whether you're looking to visit our factory or shop at one of our retail locations,
            find the details below.
          </p>
          <button className="mt-4 border-2 border-indigo-600 px-8 py-4 text-sm font-bold text-indigo-600 uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-1">
            Explore Careers
          </button>
        </div>
      </div>

      <div className="space-y-16 max-w-7xl mx-auto mt-24">
        {locations.map((loc, index) => (
          <div key={index} className="animate-slide-in" style={{ animationDelay: `${index * 150}ms` }}>
            <div className="bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 p-8 sm:p-10 flex flex-col lg:flex-row gap-10 items-center border border-gray-100">
              
              <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-6">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">{loc.title}</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="text-xl">📍</span>
                    <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-xl">📞</span>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">{loc.phone}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-xl">✉️</span>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">{loc.email}</p>
                  </div>
                </div>

                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-xs font-bold text-white bg-indigo-600 px-6 py-3.5 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-center w-max"
                >
                  Open in Maps
                </a>
              </div>

              <div className="w-full lg:w-2/3">
                <iframe
                  src={loc.mapSrc}
                  className="w-full h-72 sm:h-80 md:h-[400px] rounded-2xl shadow-inner border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen=""
                  loading="lazy"
                  title={loc.title}
                ></iframe>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 max-w-4xl mx-auto">
        <NewsletterBox />
      </div>
    </div>
  );
};

// Custom Tailwind animations
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slide-in {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .animate-slide-in {
    animation: slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;

export default Contact;