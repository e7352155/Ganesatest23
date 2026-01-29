
import React, { useState, useMemo } from 'react';
import { Book } from '../../types';
import { db } from '../../lib/supabase';
import { useCategories } from '../../hooks/useCategories';

interface AdminDashboardProps {
  books: Book[];
  onClose: () => void;
  onUpdate: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ books, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog'>('catalog');
  const [isEditing, setIsEditing] = useState<Partial<Book> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { categories } = useCategories();

  const filteredBooks = useMemo(() => {
    return books.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [books, searchTerm]);

  const handleLogout = async () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari dashboard admin?")) {
      await db.auth.signOut();
      onClose();
    }
  };

  const handleSave = async () => {
    if (!isEditing?.title || !isEditing?.author) {
      alert("Judul dan Penulis wajib diisi!"); 
      return;
    }
    setIsSaving(true);
    try {
      const payload: Omit<Book, 'id'> = {
        title: isEditing.title || '',
        author: isEditing.author || '',
        category: isEditing.category || 'Umum',
        type: (isEditing.type as any) || 'Paperback',
        price: Number(isEditing.price) || 0,
        rating: Number(isEditing.rating) || 5,
        synopsis: isEditing.synopsis || '',
        image: isEditing.image || '',
        gallery: isEditing.gallery || [],
        publisher: isEditing.publisher || '',
        size: isEditing.size || '',
        pageCount: Number(isEditing.pageCount) || 0,
        coverMaterial: isEditing.coverMaterial || '',
        pageMaterial: isEditing.pageMaterial || '',
        binding: isEditing.binding || '',
        colorComposition: isEditing.colorComposition || ''
      };

      if (isEditing.id) {
        await db.books.update(isEditing.id, payload);
      } else {
        await db.books.create(payload);
      }
      setIsEditing(null);
      await onUpdate();
    } catch (e: any) {
      alert(`Gagal menyimpan: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Hapus buku "${title}" secara permanen?`)) {
      setIsActionLoading(true);
      try {
        await db.books.delete(id);
        await onUpdate();
      } catch (e: any) {
        alert(`Gagal menghapus: ${e.message}`);
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900 text-slate-300 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar Mobile-First */}
      <div className="w-full md:w-72 bg-[#1e293b] border-r border-slate-800 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <h2 className="text-xl font-black text-white tracking-tight">GANESA MAS</h2>
          <p className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.3em] mt-1">Admin Portal</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'hover:bg-slate-800'}`}
          >
            📊 Ikhtisar
          </button>
          <button 
            onClick={() => setActiveTab('catalog')} 
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'catalog' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'hover:bg-slate-800'}`}
          >
            📚 Katalog Buku
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <button onClick={onClose} className="w-full py-3 bg-slate-800 text-slate-400 rounded-xl font-bold text-xs hover:text-white transition-all">Kembali ke Situs</button>
          <button onClick={handleLogout} className="w-full py-3 bg-red-600/10 text-red-500 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition-all">LOGOUT</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#0f172a] relative">
        {(isSaving || isActionLoading) && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-[300] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold text-white tracking-widest uppercase">Memproses Data...</p>
          </div>
        )}

        <div className="p-6 md:p-12 max-w-6xl mx-auto">
          {activeTab === 'catalog' && !isEditing && (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <h1 className="text-3xl font-black text-white">Manajemen Katalog</h1>
                <div className="flex gap-4 w-full md:w-auto">
                  <input 
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-sm text-white focus:border-orange-500 outline-none" 
                    placeholder="Cari judul..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button 
                    onClick={() => setIsEditing({ title: '', author: '', category: 'Umum', price: 0 })} 
                    className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs uppercase shadow-lg hover:bg-teal-500 transition-all active:scale-95"
                  >
                    + Baru
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredBooks.map(book => (
                  <div key={book.id} className="bg-[#1e293b] p-5 rounded-3xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-5">
                      <img src={book.image} className="w-14 h-20 object-cover rounded-xl shadow-lg bg-slate-900" alt="" />
                      <div>
                        <p className="text-white font-bold text-lg mb-1">{book.title}</p>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-tight">{book.author} • {book.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setIsEditing(book)} className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(book.id, book.title)} className="p-3 bg-red-600/10 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="max-w-4xl mx-auto pb-24 animate-in slide-in-from-bottom-8 duration-500">
               <div className="flex items-center gap-6 mb-12">
                  <button onClick={() => setIsEditing(null)} className="p-4 bg-slate-800 text-white rounded-2xl hover:bg-slate-700 transition-all">← Batal</button>
                  <h1 className="text-2xl font-black text-white">{isEditing.id ? 'Edit Informasi Buku' : 'Tambah Buku Baru'}</h1>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Informasi Utama</label>
                       <input className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-orange-500" placeholder="Judul Buku" value={isEditing.title} onChange={e => setIsEditing({...isEditing, title: e.target.value})} />
                       <input className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none" placeholder="Penulis" value={isEditing.author} onChange={e => setIsEditing({...isEditing, author: e.target.value})} />
                       <div className="grid grid-cols-2 gap-4">
                         <input className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-white outline-none" placeholder="Kategori" value={isEditing.category} onChange={e => setIsEditing({...isEditing, category: e.target.value})} />
                         <input type="number" className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-orange-500 font-black outline-none" placeholder="Harga" value={isEditing.price} onChange={e => setIsEditing({...isEditing, price: Number(e.target.value)})} />
                       </div>
                    </div>

                    <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Sinopsis</label>
                       <textarea className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-slate-300 outline-none h-48 text-sm resize-none" value={isEditing.synopsis} onChange={e => setIsEditing({...isEditing, synopsis: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Gambar Cover</label>
                       <input className="w-full bg-[#0f172a] border border-slate-800 rounded-2xl px-5 py-4 text-teal-400 text-xs outline-none" placeholder="URL Gambar (https://...)" value={isEditing.image} onChange={e => setIsEditing({...isEditing, image: e.target.value})} />
                       {isEditing.image && (
                         <div className="bg-slate-900 rounded-3xl p-4 flex justify-center">
                            <img src={isEditing.image} className="h-40 object-contain rounded-lg shadow-xl" alt="Preview" />
                         </div>
                       )}
                    </div>

                    <div className="pt-6">
                      <button onClick={handleSave} className="w-full py-5 bg-orange-600 text-white rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-orange-500 transition-all active:scale-95">
                        {isSaving ? 'MENYIMPAN...' : 'SIMPAN PERUBAHAN'}
                      </button>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
