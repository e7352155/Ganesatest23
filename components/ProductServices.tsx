
import React from 'react';

const ProductServices: React.FC = () => {
  const servicePhotos = [
    { url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800', label: 'Buku Sekolah Internasional' },
    { url: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=800', label: 'Koleksi Sastra Lokal' },
    { url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800', label: 'Referensi Teknologi & Bisnis' },
    { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', label: 'Pengembangan Diri' },
  ];

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block">Layanan & Produk</span>
          <h2 className="text-4xl font-bold serif mb-6 text-gray-900">Lebih dari Sekadar Distributor Buku.</h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Kami menyediakan layanan pengadaan buku terintegrasi untuk sekolah, perpustakaan, dan kolektor pribadi di Bali. Mulai dari kurasi judul internasional hingga distribusi karya penulis lokal berbakat.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-700 font-medium">
              <span className="text-orange-500">✦</span> Kurasi Judul Eksklusif
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-medium">
              <span className="text-orange-500">✦</span> Pengadaan Skala Besar (Sekolah/Kantor)
            </li>
            <li className="flex items-center gap-3 text-gray-700 font-medium">
              <span className="text-orange-500">✦</span> Layanan Konsultasi Literasi
            </li>
          </ul>
        </div>
        
        <div className="md:w-1/2 w-full">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide">
            {servicePhotos.map((photo, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[240px] group">
                <div className="aspect-square rounded-3xl overflow-hidden mb-3 shadow-lg border-4 border-white">
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-center font-bold text-sm text-gray-700">{photo.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductServices;
