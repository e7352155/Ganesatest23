
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Book, CartItem } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProductServices from './components/ProductServices';
import BookCard from './components/BookCard';
import BookDetail from './components/BookDetail';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SearchFilters from './components/SearchFilters';
import WhatsAppButton from './components/WhatsAppButton';
import CartDrawer from './components/CartDrawer';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/CMS/AdminDashboard';
import LoginPage from './components/CMS/LoginPage';
import { useBooks } from './hooks/useBooks';
import { db, supabase } from './lib/supabase';
import { TESTIMONIALS } from './data';
import { askAiAssistant } from './geminiService';

const App: React.FC = () => {
  const { books, loading, refresh } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeType, setActiveType] = useState<string>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'contact' | 'admin'>('home');
  
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // AI State
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    // Check session on mount
    db.auth.getSession().then(session => {
      setSession(session);
      setCheckingAuth(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
      const matchesType = activeType === 'All' || book.type === activeType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [books, searchTerm, activeCategory, activeType]);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(books.map(b => b.category)))];
  }, [books]);

  const types = useMemo(() => {
    return ['All', ...Array.from(new Set(books.map(b => b.type)))];
  }, [books]);

  const navigateTo = (view: any) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiLoading) return;
    const userMessage = aiInput;
    setAiInput('');
    setAiHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsAiLoading(true);
    try {
      const response = await askAiAssistant(userMessage, books);
      setAiHistory(prev => [...prev, { role: 'ai', text: response || 'No response.' }]);
    } catch (err) {
      setAiHistory(prev => [...prev, { role: 'ai', text: 'Error.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {currentView === 'admin' ? (
        session ? (
          <AdminDashboard 
            books={books} 
            onClose={() => navigateTo('home')} 
            onUpdate={refresh} 
          />
        ) : (
          <LoginPage onLogin={() => navigateTo('admin')} onCancel={() => navigateTo('home')} />
        )
      ) : (
        <>
          <Header 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
            currentView={currentView}
            navigateTo={navigateTo}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <main className="flex-grow">
            {currentView === 'home' && (
              <div className="animate-in fade-in duration-700">
                <Hero onExplore={() => navigateTo('catalog')} onContact={() => navigateTo('contact')} />
                <AboutSection />
                <section className="max-w-7xl mx-auto px-4 py-20">
                  <h2 className="text-3xl font-bold serif text-center mb-12">Koleksi Terbaru</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.slice(0, 3).map(book => (
                      <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} onAddToCart={addToCart} />
                    ))}
                  </div>
                </section>
                <Testimonials testimonials={TESTIMONIALS} />
              </div>
            )}

            {currentView === 'catalog' && (
              <section className="max-w-7xl mx-auto px-4 py-20">
                <ProductServices />
                <div className="mb-12">
                  <SearchFilters 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    activeType={activeType}
                    setActiveType={setActiveType}
                    categories={categories}
                    types={types}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} onAddToCart={addToCart} />
                  ))}
                </div>
              </section>
            )}

            {currentView === 'contact' && <ContactPage />}
          </main>

          <Footer navigateTo={navigateTo} />
          <WhatsAppButton />
          
          <div className="fixed bottom-24 right-6 z-[90]">
            <button onClick={() => setIsAiOpen(true)} className="bg-teal-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </button>
          </div>

          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cart}
            onUpdateQuantity={(id, d) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
            onRemove={(id) => setCart(prev => prev.filter(i => i.id !== id))}
          />

          {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} onAddToCart={addToCart} />}
        </>
      )}
    </div>
  );
};

export default App;
