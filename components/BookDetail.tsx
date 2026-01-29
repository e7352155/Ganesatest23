
import React, { useEffect, useState } from 'react';
import { Book } from '../types';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onClose, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeImage, setActiveImage] = useState(book.image);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(book);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const shareUrl = window.location.href;
  const shareText = `Lihat buku "${book.title}" karya ${book.author} di Ganesa Mas Bali!`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const SpecRow = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <div className="flex py-4 border-b border-gray-100 last:border-0 items-center">
      <div className="w-1/3 md:w-5/12 text-gray-500 text-sm md:text-base font-light">{label}</div>
      <div className="w-2/3 md:w-7/12 text-gray-800 text-sm md:text-base">{value || '-'}</div>
    </div>
  );

  const gallery = [book.image, ...book.gallery];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 transition-colors text-gray-500 shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="overflow-y-auto flex flex-col md:flex-row">
          <div className="md:w-2/5 p-6 bg-gray-50 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-[2/3] overflow-hidden rounded-3xl shadow-xl border border-white">
                <img src={activeImage} alt={book.title} className="w-full h-full object-cover animate-in fade-in duration-500" />
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-20 aspect-[2/3] rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-teal-500 scale-105 shadow-md' : 'border-transparent grayscale opacity-70 hover:grayscale-0 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
               <button 
                  onClick={handleAddToCart}
                  className={`w-full py-5 text-white rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${isAdding ? 'bg-teal-500 shadow-teal-100' : 'bg-orange-600 shadow-orange-100 hover:bg-orange-700'}`}
                >
                  {isAdding ? 'Berhasil Masuk!' : 'Tambah ke Keranjang'}
                </button>
            </div>
          </div>

          <div className="md:w-3/5 p-8 md:p-12 bg-white">
            <div className="mb-10">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Sinopsis</h3>
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-widest">{book.category}</span>
               </div>
               <div className="text-gray-600 text-lg leading-relaxed font-light whitespace-pre-line">
                 {book.synopsis}
               </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-8 border-b-[6px] border-b-[#2bb673]">
              <div className="bg-white p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="text-[#2bb673]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-gray-700 font-bold">Spesifikasi Buku</h4>
              </div>
              
              <div className="p-6">
                <SpecRow label="Penulis" value={book.author} />
                <SpecRow label="Penerbit" value={book.publisher} />
                <SpecRow label="Ukuran Buku" value={book.size} />
                <SpecRow label="Jumlah Halaman" value={book.pageCount} />
                <SpecRow label="Bahan Kertas Cover" value={book.coverMaterial} />
                <SpecRow label="Bahan Kertas Isi" value={book.pageMaterial} />
                <SpecRow label="Jilid" value={book.binding} />
                <SpecRow label="Komposisi Warna" value={book.colorComposition} />
                <SpecRow label="Tipe / Format" value={book.type} />
                
                <div className="flex pt-6 pb-2 items-center">
                  <div className="w-1/3 md:w-5/12 text-gray-500 text-sm md:text-base font-light">Harga</div>
                  <div className="w-2/3 md:w-7/12 text-orange-600 font-bold text-2xl">{formatIDR(book.price)}</div>
                </div>
              </div>
            </div>

            <div className="md:hidden mt-4 pb-8">
               <button 
                  onClick={handleAddToCart}
                  className={`w-full py-5 text-white rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 ${isAdding ? 'bg-teal-500 shadow-teal-100' : 'bg-orange-600 shadow-orange-100 hover:bg-orange-700'}`}
                >
                  {isAdding ? 'Berhasil Masuk!' : 'Tambah ke Keranjang'}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
