
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi API Call ke Sender Email Service (misal: Formspree / SendGrid)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      title: 'WhatsApp Admin',
      value: '+62 812-3456-789',
      desc: 'Respon cepat (Jam Kerja)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    },
    {
      title: 'Email Distribusi',
      value: 'info@ganesamas.com',
      desc: 'Penawaran & Kerja Sama',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Halaman */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-teal-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Kontak Ganesa Mas</span>
          <h1 className="text-4xl md:text-6xl font-bold serif text-gray-900 mb-6">Mari Berkolaborasi.</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Kami siap melayani kebutuhan pengadaan buku literasi, kemitraan sekolah, dan layanan distribusi eksklusif di wilayah Bali dan sekitarnya.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Kolom Kiri: Informasi Kontak & Alamat */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-teal-500 pl-4">Informasi Kontak</h2>
              <div className="grid gap-6">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl hover:border-teal-100 transition-all group">
                    <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{info.title}</h4>
                      <p className="text-teal-600 font-medium text-lg mb-0.5">{info.value}</p>
                      <p className="text-gray-400 text-xs">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-teal-500 pl-4">Alamat Kantor</h2>
              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative overflow-hidden">
                <div className="relative z-10 flex gap-6">
                   <div className="text-teal-600 shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                   </div>
                   <div>
                      <p className="text-gray-900 font-bold text-xl mb-3">Pusat Distribusi Bali</p>
                      <address className="not-italic text-gray-500 leading-relaxed text-lg mb-6">
                        Jl. Tukad Badung No. XX, Renon, <br />
                        Kec. Denpasar Selatan, Kota Denpasar, <br />
                        Bali 80226, Indonesia
                      </address>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        className="inline-flex items-center gap-2 text-teal-600 font-bold hover:underline"
                      >
                        Lihat di Google Maps 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                   </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Kontak */}
          <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-teal-500 pl-4">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-teal-500 px-6 py-4 rounded-2xl outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Alamat Email</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    placeholder="budi@example.com"
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-teal-500 px-6 py-4 rounded-2xl outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Subjek Pesan</label>
                <input 
                  type="text" 
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  placeholder="Contoh: Pengajuan Kerjasama Sekolah"
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-teal-500 px-6 py-4 rounded-2xl outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Pesan Anda</label>
                <textarea 
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  rows={5}
                  placeholder="Tuliskan detail pertanyaan atau penawaran Anda di sini..."
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-teal-500 px-6 py-4 rounded-2xl outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
                  submitted 
                    ? 'bg-green-500 text-white shadow-green-100' 
                    : 'bg-teal-600 text-white shadow-teal-100 hover:bg-teal-700'
                }`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : submitted ? (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    Pesan Berhasil Terkirim!
                  </>
                ) : 'Kirim Pesan Sekarang'}
              </button>
              
              <p className="text-center text-xs text-gray-400">
                Pesan akan langsung diteruskan ke tim administrasi Ganesa Mas.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Full Width Maps Section */}
      <section className="h-[500px] w-full border-t border-gray-100">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.02613134637!2d115.2285!3d-8.6744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e3851%3A0x1030bf4371846c0!2sRenon%2C%20Denpasar%20City%2C%20Bali!5e0!3m2!1sen!2sid!4v1625061543212!5m2!1sen!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          className="grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
          title="Ganesa Mas Location"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;
