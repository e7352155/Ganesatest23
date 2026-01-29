
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const phoneNumber = '628123456789';
    let message = 'Halo Ganesa Mas, saya ingin memesan buku berikut:\n\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.title}* (${item.quantity}x) - ${formatIDR(item.price * item.quantity)}\n`;
    });
    
    message += `\n*Total Pesanan: ${formatIDR(totalPrice)}*\n\nMohon informasi ketersediaan stok dan metode pengirimannya. Terima kasih!`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Keranjang Belanja</h2>
            <p className="text-sm text-gray-500">{items.length} jenis buku</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4">🛒</div>
              <p className="text-gray-400 font-medium">Keranjang Anda masih kosong.</p>
              <button onClick={onClose} className="mt-4 text-orange-600 font-bold hover:underline">Mulai Belanja</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-28 shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">{item.title}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.author}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-orange-600 text-sm">{formatIDR(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-gray-900">{formatIDR(totalPrice)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Lanjutkan ke WhatsApp
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
