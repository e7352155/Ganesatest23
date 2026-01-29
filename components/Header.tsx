
import React, { useState } from 'react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
  currentView: 'home' | 'catalog' | 'contact' | 'admin';
  navigateTo: (view: 'home' | 'catalog' | 'contact' | 'admin') => void;
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  currentView, 
  navigateTo, 
  cartCount, 
  onOpenCart,
  searchTerm,
  setSearchTerm
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navLinks = [
    { label: 'Beranda', view: 'home' as const },
    { label: 'Katalog', view: 'catalog' as const },
    { label: 'Kontak', view: 'contact' as const },
    { label: 'Admin', view: 'admin' as const },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (currentView !== 'catalog' && currentView !== 'admin') {
      navigateTo('catalog');
    }
  };

  const handleLinkClick = (e: React.MouseEvent, view: 'home' | 'catalog' | 'contact' | 'admin') => {
    e.preventDefault();
    navigateTo(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex justify-between items-center gap-4">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => navigateTo('home')} className="flex flex-col group text-left outline-none">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 leading-none group-hover:text-orange-600 transition-colors">Ganesa Mas</span>
              <span className="text-[9px] md:text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">Penerbit & Distributor Bali</span>
            </button>
          </div>

          {/* Search Input - Desktop & Tablet */}
          <div className={`hidden md:flex relative flex-1 max-w-md transition-all duration-500 ${isSearchExpanded ? 'max-w-lg' : 'max-w-xs'}`}>
            <input 
              type="text"
              placeholder="Cari buku atau penulis..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => setIsSearchExpanded(false)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-2xl outline-none transition-all text-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-6">
            <div className="flex gap-6 mr-2">
              {navLinks.map((link) => (
                <button 
                  key={link.label} 
                  onClick={(e) => handleLinkClick(e, link.view)} 
                  className={`font-bold transition-all relative py-2 text-sm uppercase tracking-wider ${
                    currentView === link.view ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'
                  } ${link.view === 'admin' ? 'text-teal-600 hover:text-teal-700' : ''}`}
                >
                  {link.label}
                  {currentView === link.view && (
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full animate-in fade-in slide-in-from-left-2 duration-300 ${link.view === 'admin' ? 'bg-teal-600' : 'bg-orange-600'}`}></span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>

            <button 
              onClick={onOpenCart}
              className="relative p-2.5 bg-gray-100 text-gray-700 hover:bg-orange-600 hover:text-white rounded-xl transition-all group outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 text-gray-700 bg-gray-100 rounded-xl active:scale-95 transition-all outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className={`p-2.5 rounded-xl transition-all active:scale-95 ${isMenuOpen ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 left-0 w-full bg-white shadow-2xl transition-all duration-500 ease-out border-b border-gray-100 transform ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } pt-20 md:pt-24 pb-8 px-4`}
        >
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
               <input 
                  type="text"
                  placeholder="Cari buku..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 border-2 border-transparent focus:border-orange-500 rounded-2xl outline-none transition-all"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4 mb-1">Navigasi Utama</p>
              {navLinks.map((link) => (
                <button 
                  key={link.label} 
                  onClick={(e) => handleLinkClick(e, link.view)}
                  className={`text-xl font-bold px-6 py-4 rounded-2xl transition-all text-left flex justify-between items-center ${
                    currentView === link.view 
                    ? (link.view === 'admin' ? 'bg-teal-600 text-white shadow-lg' : 'bg-orange-600 text-white shadow-lg shadow-orange-200') 
                    : 'text-gray-700 hover:bg-orange-50'
                  } ${link.view === 'admin' && currentView !== 'admin' ? 'text-teal-600' : ''}`}
                >
                  {link.label}
                  {currentView === link.view && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Tutup Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
