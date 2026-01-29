
import React from 'react';

const AboutSection: React.FC = () => {
  const features = [
    { title: 'Koleksi Eksklusif', description: 'Akses ke judul-judul buku yang hanya didistribusikan oleh Ganesa Mas di wilayah Bali.', icon: '📚' },
    { title: 'Pengiriman Cepat', description: 'Logistik terintegrasi untuk memastikan stok buku sampai tepat waktu di sekolah atau toko Anda.', icon: '🚚' },
    { title: 'Kemitraan Luas', description: 'Telah dipercaya oleh puluhan sekolah internasional dan perpustakaan daerah di Bali.', icon: '🤝' }
  ];

  return (
    <section id="about-company" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" 
                alt="Ganesa Mas Office" 
                className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-orange-600 text-white p-10 rounded-[2.5rem] hidden md:block shadow-xl">
                <p className="text-4xl font-black mb-1">10+</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Tahun Pengalaman</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Tentang Ganesa Mas</span>
            <h2 className="text-4xl md:text-5xl font-bold serif mb-8 text-gray-900 leading-tight">Membangun Masa Depan Bali Melalui Literasi.</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Ganesa Mas berdiri dengan satu visi utama: Menjadi jembatan antara ilmu pengetahuan dunia dan masyarakat Bali. Sebagai distributor buku eksklusif, kami berkomitmen menyediakan sumber daya pendidikan berkualitas tinggi yang relevan, inspiratif, dan mudah diakses.
            </p>
            
            <div className="grid gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                  <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{f.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
