
import React from 'react';

interface HeroProps {
  onExplore?: () => void;
  onContact?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onContact }) => {
  return (
    <section id="about" className="relative bg-white pt-10 pb-16 md:pt-20 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Penerbit & Distributor Premium</span>
          <h1 className="text-5xl md:text-7xl font-bold serif leading-tight mb-6">
            Menerbitkan Mimpi,<br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Mendistribusikan Ilmu.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Ganesa Mas adalah rumah kreatif bagi penulis lokal dan mitra strategis distribusi buku berkualitas tinggi di seluruh Bali.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 hover:-translate-y-1"
            >
              Jelajahi Katalog
            </button>
            <button 
              onClick={onContact}
              className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all"
            >
              Terbitkan Karyamu
            </button>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="relative group">
             <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-8">
                <div className="snap-center shrink-0 w-[260px] md:w-[320px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02] duration-500">
                  <img src="https://picsum.photos/seed/bali-publisher-1/600/900" alt="Penerbitan 1" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="snap-center shrink-0 w-[260px] md:w-[320px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02] duration-500 delay-75">
                  <img src="https://picsum.photos/seed/bali-publisher-2/600/900" alt="Penerbitan 2" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="snap-center shrink-0 w-[260px] md:w-[320px] aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02] duration-500 delay-150">
                  <img src="https://picsum.photos/seed/bali-publisher-3/600/900" alt="Penerbitan 3" className="w-full h-full object-cover" loading="lazy" />
                </div>
             </div>
             <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold">✒️</div>
                <div>
                  <p className="font-bold text-gray-900">Original & Eksklusif</p>
                  <p className="text-xs text-gray-400 italic">Karya Penulis Bali</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
