
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick: () => void;
  onAddToCart: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick, onAddToCart }) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(book);
  };

  return (
    <div 
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-transparent hover:border-orange-100 hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <button 
            onClick={handleAddToCart}
            className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-orange-700 mb-3"
          >
            Tambah ke Keranjang
          </button>
          <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">Lihat Detail</button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-sm">
            {book.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{book.title}</h3>
          <div className="flex items-center text-amber-500 text-sm shrink-0 ml-2">
            <span>★</span>
            <span className="ml-1 font-bold">{book.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{book.author}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-black text-orange-600">{formatIDR(book.price)}</span>
          <span className="text-[10px] font-bold text-gray-400 px-2 py-1 bg-gray-50 rounded-md border border-gray-100 uppercase tracking-tighter">{book.type}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
