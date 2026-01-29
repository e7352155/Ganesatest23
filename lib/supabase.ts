
import { createClient } from '@supabase/supabase-js';
import { Book, Category } from '../types';

/**
 * Konfigurasi Database Ganesa Mas
 * Menggunakan kredensial yang disediakan pengguna sebagai fallback utama.
 */
const SUPABASE_URL_DEFAULT = 'https://xlzrwgdoqxwgcufsgxor.supabase.co';
const SUPABASE_ANON_KEY_DEFAULT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsenJ3Z2RvcXh3Z2N1ZnNneG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NTkzNTAsImV4cCI6MjA4NTIzNTM1MH0.ev-2NdKEslUD67eQUXMbjcn954rBx7SWo-CrD6vPU1Q';

const getEnvVar = (key: string, fallback: string): string => {
  try {
    // Cek di import.meta.env (Vite/ESM)
    // Gunakan try-catch dan pengecekan tipe untuk mencegah "import.meta.env is undefined"
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      const val = (import.meta as any).env[key];
      if (val) return val;
    }
    
    // Cek di process.env (Node/CommonJS fallback)
    if (typeof process !== 'undefined' && process.env) {
      const val = process.env[key];
      if (val) return val;
    }
  } catch (e) {
    // Silently ignore access errors
  }
  return fallback;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', SUPABASE_URL_DEFAULT);
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', SUPABASE_ANON_KEY_DEFAULT);

// Inisialisasi Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper untuk konversi CamelCase (App) ke snake_case (DB)
 */
const toSnake = (obj: any) => {
  const mapped: any = {};
  if (obj.title !== undefined) mapped.title = obj.title;
  if (obj.author !== undefined) mapped.author = obj.author;
  if (obj.category !== undefined) mapped.category = obj.category;
  if (obj.type !== undefined) mapped.type = obj.type;
  if (obj.price !== undefined) mapped.price = obj.price;
  if (obj.rating !== undefined) mapped.rating = obj.rating;
  if (obj.synopsis !== undefined) mapped.description = obj.synopsis; 
  if (obj.image !== undefined) mapped.image = obj.image;
  if (obj.gallery !== undefined) mapped.gallery = obj.gallery;
  if (obj.publisher !== undefined) mapped.publisher = obj.publisher;
  if (obj.size !== undefined) mapped.size = obj.size;
  if (obj.binding !== undefined) mapped.binding = obj.binding;
  if (obj.pageCount !== undefined) mapped.page_count = obj.pageCount;
  if (obj.coverMaterial !== undefined) mapped.cover_material = obj.coverMaterial;
  if (obj.pageMaterial !== undefined) mapped.page_material = obj.pageMaterial;
  if (obj.colorComposition !== undefined) mapped.color_composition = obj.colorComposition;
  return mapped;
};

const fromSnake = (record: any): Book => ({
  id: record.id,
  title: record.title || '',
  author: record.author || '',
  category: record.category || 'Umum',
  type: record.type || 'Paperback',
  price: record.price || 0,
  rating: record.rating || 0,
  synopsis: record.description || '', 
  image: record.image || '',
  gallery: record.gallery || [],
  publisher: record.publisher || '',
  size: record.size || '',
  pageCount: record.page_count || 0,
  coverMaterial: record.cover_material || '',
  pageMaterial: record.page_material || '',
  binding: record.binding || '',
  colorComposition: record.color_composition || ''
});

export const db = {
  auth: {
    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    async getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    }
  },
  books: {
    async getAll() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(fromSnake);
    },
    async create(book: Omit<Book, 'id'>) {
      const payload = toSnake(book);
      const { data, error } = await supabase.from('books').insert([payload]).select();
      if (error) throw error;
      return fromSnake(data[0]);
    },
    async update(id: string, updates: Partial<Book>) {
      const payload = toSnake(updates);
      const { data, error } = await supabase.from('books').update(payload).eq('id', id).select();
      if (error) throw error;
      return fromSnake(data[0]);
    },
    async delete(id: string) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
  },
  categories: {
    async getAll() {
      const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });
      if (error) throw error;
      return data as Category[];
    }
  }
};
