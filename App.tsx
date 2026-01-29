
import React, { useState, useMemo } from 'react';
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
import { TESTIMONIALS } from './data';
import { CartItem, Book } from './types';

const App: React.FC = () => {
  const { books, refresh } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'contact' | 'admin'>('home');
  const [session, setSession] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
      const matchesType = activeType === 'All' || book.type === activeType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [books, searchTerm, activeCategory, activeType]);

  const navigateTo = (view: 'home' | 'catalog' | 'contact' | 'admin') => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {currentView === 'admin' ? (
        session ? (
          <AdminDashboard books={books} onClose={() => navigateTo('home')} onUpdate={refresh} />
        ) : (
          <LoginPage onLogin={() => setSession(true)} onCancel={() => navigateTo('home')} />
        )
      ) : (
        <>
          <Header 
            isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} 
            currentView={currentView} navigateTo={navigateTo}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
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
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    activeCategory={activeCategory} setActiveCategory={setActiveCategory}
                    activeType={activeType} setActiveType={setActiveType}
                    categories={['All', ...Array.from(new Set(books.map(b => b.category)))]}
                    types={['All', ...Array.from(new Set(books.map(b => b.type)))]}
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

          <CartDrawer 
            isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart}
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
