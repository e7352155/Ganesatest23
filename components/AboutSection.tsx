
import React from 'react';

const AboutSection: React.FC = () => {
  const features = [
    { title: 'Penerbitan Mandiri', description: 'Pendampingan penuh dari ide hingga pengurusan ISBN untuk melahirkan karya yang berdaya saing.', icon: '✍️' },
    { title: 'Distribusi Nasional', description: 'Jaringan distribusi yang kuat memastikan setiap judul menjangkau toko buku dan perpustakaan terbaik.', icon: '🌍' },
    { title: 'Kualitas Premium', description: 'Standar cetak dan kurasi konten tinggi untuk kepuasan pembaca dan prestise bagi penulis.', icon: '⭐' }
  ];

  return (
    <section id="about-company" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&q=80&w=1000" 
                alt="Proses Kreatif Ganesa Mas" 
                className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-orange-600 text-white p-10 rounded-[2.5rem] hidden md:block shadow-xl">
                <p className="text-4xl font-black mb-1">500+</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Judul Diterbitkan</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Tentang Ganesa Mas</span>
            <h2 className="text-4xl md:text-5xl font-bold serif mb-8 text-gray-900 leading-tight">Rumah bagi Kreativitas dan Pengetahuan.</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Ganesa Mas bukan sekadar distributor; kami adalah inkubator literasi. Kami membantu penulis lokal Bali mewujudkan impian mereka melalui layanan penerbitan profesional, sekaligus menghadirkan referensi dunia terbaik melalui kanal distribusi kami yang eksklusif.
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
