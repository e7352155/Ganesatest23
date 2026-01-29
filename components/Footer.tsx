
import React from 'react';

interface FooterProps {
  navigateTo: (view: 'home' | 'catalog' | 'contact' | 'admin') => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 md:py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Branding & Tagline */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none tracking-tight">Ganesa Mas</span>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">Penerbit & Distributor Bali</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 font-medium max-w-xs">
              Membangun peradaban melalui buku. Kami membantu menerbitkan karya orisinil dan mendistribusikannya ke seluruh penjuru Nusantara.
            </p>
            
            <div className="space-y-4 pt-4">
              <h5 className="text-white font-bold text-sm uppercase tracking-widest border-l-2 border-orange-600 pl-3">Jam Operasional</h5>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>Senin - Jumat</span>
                  <span className="text-gray-200">08:00 - 17:00 WITA</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>Sabtu</span>
                  <span className="text-gray-200">08:00 - 13:00 WITA</span>
                </li>
                <li className="flex justify-between text-orange-400/60 italic">
                  <span>Minggu & Hari Libur</span>
                  <span>Tutup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:pl-12">
            <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-orange-600 pl-3">Tautan Cepat</h5>
            <ul className="flex flex-col gap-4 text-sm font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>›</span> Beranda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>›</span> Katalog Koleksi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>›</span> Hubungi Kami
                </button>
              </li>
              <li className="pt-4 border-t border-white/5 mt-2">
                <button onClick={() => navigateTo('admin')} className="text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Dashboard Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-6">
            <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest border-l-2 border-orange-600 pl-3">Kontak & Alamat</h5>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-900 border border-white/5 flex items-center justify-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <p className="text-sm leading-relaxed">
                  Jl. Tukad Badung No. XX, Renon, Denpasar Selatan, Bali 80226
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-900 border border-white/5 flex items-center justify-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-sm">info@ganesamas.com</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                {['FB', 'IG', 'LI'].map((social) => (
                  <button key={social} className="w-9 h-9 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium tracking-wider uppercase opacity-60">
          <p>© 2024 Ganesa Mas Bali. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat Layanan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
