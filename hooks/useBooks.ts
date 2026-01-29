
import { useState, useEffect } from 'react';
import { Book } from '../types';
import { db } from '../lib/supabase';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await db.books.getAll();
      // JIKA database memberikan respon array (meskipun kosong []), gunakan data tersebut.
      if (Array.isArray(data)) {
        setBooks(data);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, refresh: fetchBooks };
};
