import { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/themeContext';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Scroll listener for floating effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    setVisible(false);
    setProfileOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-sidebar') && !e.target.closest('.hamburger-btn') && visible) {
        setVisible(false);
      }
      if (!e.target.closest('.profile-dropdown') && profileOpen) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible, profileOpen]);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/collection', label: 'PRODUCTS'},
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    ...(token ? [{ path: '/orders', label: 'ORDERS' }] : [])
  ];

  return (
    <header 
      className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 w-[96%] sm:w-[90%] max-w-7xl flex items-center justify-between px-3 sm:px-10 py-2.5 sm:py-4 rounded-[1.25rem] sm:rounded-[2rem] border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] ${
        scrolled 
        ? 'bg-white/80 backdrop-blur-xl' 
        : 'bg-white/40 backdrop-blur-md'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5 sm:gap-3 group">
        <img
          src={assets.logo}
          alt="HF Logo"
          className="h-6 sm:h-10 transition-all duration-500 group-hover:scale-110"
        />
        <div className="flex flex-col">
          <span className="text-xs sm:text-lg font-black tracking-tighter sm:tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight whitespace-nowrap">
            Hamad <span className="text-indigo-600">Furniture</span>
          </span>
          <span className="hidden xs:block text-[6px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 font-bold leading-none -mt-0.5">The Art of Living</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex gap-6 xl:gap-10">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-xs xl:text-sm font-black tracking-widest transition-all duration-300 hover:text-indigo-600 ${
                    isActive ? 'text-indigo-600' : 'text-gray-600'
                  } relative after:absolute after:bottom-[-4px] after:left-1/2 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 ${
                    isActive ? 'after:w-full after:left-0' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="flex items-center gap-0.5 sm:gap-2">
        {/* Search - Icon only on mobile */}
        <button
          onClick={() => { setShowSearch(true); navigate('/collection'); }}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl hover:bg-white/40 text-gray-600 hover:text-indigo-600 transition-all duration-300"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>

        {/* Profile */}
        <div className="relative profile-dropdown">
          <button
            onClick={() => (token ? setProfileOpen(!profileOpen) : navigate('/login'))}
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl hover:bg-white/40 text-gray-600 hover:text-indigo-600 transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          
          {token && profileOpen && (
            <div className="absolute right-0 mt-4 bg-white/95 backdrop-blur-3xl border border-white/40 rounded-[1.5rem] sm:rounded-[2rem] py-4 w-48 sm:w-64 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <button onClick={() => { navigate('/profile'); setProfileOpen(false); }} className="flex items-center gap-3 sm:gap-4 w-full text-left px-6 sm:px-8 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Account
              </button>
              <button onClick={() => { navigate('/orders'); setProfileOpen(false); }} className="flex items-center gap-3 sm:gap-4 w-full text-left px-6 sm:px-8 py-3 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                Orders
              </button>
              <button onClick={logout} className="flex items-center gap-3 sm:gap-4 w-full text-left px-6 sm:px-8 py-3 text-red-500 hover:bg-red-50 transition-all font-black text-[10px] sm:text-xs uppercase tracking-widest mt-1 border-t border-gray-50 pt-3">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl hover:bg-white/40 text-gray-600 hover:text-indigo-600 transition-all duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          {getCartCount() > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[7px] sm:text-[9px] font-black rounded-full w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 flex items-center justify-center shadow-lg">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile Menu */}
        <button
          onClick={() => setVisible(true)}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl hover:bg-white/40 text-gray-600 lg:hidden hamburger-btn"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-0 z-[200] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setVisible(false)} />
        <div 
          className={`mobile-sidebar absolute top-0 right-0 h-full w-[300px] bg-white/20 backdrop-blur-[40px] shadow-2xl border-l border-white/20 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform ${
            visible ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
        >
          <div className="p-10 flex flex-col h-full">
            <button onClick={() => setVisible(false)} className="self-end p-3 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 rounded-2xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <nav className="mt-16">
              <ul className="space-y-8">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setVisible(false)}
                      className={({ isActive }) =>
                        `text-2xl font-black tracking-tight transition-all duration-300 ${
                          isActive ? 'text-indigo-600 scale-105 inline-block' : 'text-gray-400 hover:text-gray-900'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto pb-10 border-t border-gray-100 pt-10">
              {token ? (
                <button onClick={logout} className="text-red-500 font-black tracking-widest text-xs uppercase bg-red-50 w-full py-4 rounded-2xl">Logout Account</button>
              ) : (
                <button onClick={() => navigate('/login')} className="text-indigo-600 font-black tracking-widest text-xs uppercase bg-indigo-50 w-full py-4 rounded-2xl">Client Login</button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in-95 { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-in { animation-fill-mode: forwards; }
        .fade-in { animation-name: fade-in; }
        .zoom-in-95 { animation-name: zoom-in-95; }
      `}</style>
    </header>
  );
};

export default Navbar;