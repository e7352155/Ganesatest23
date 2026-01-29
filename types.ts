
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  type: 'Hardcover' | 'Paperback' | 'E-Book';
  price: number;
  rating: number;
  synopsis: string;
  image: string;
  gallery: string[];
  publisher?: string;
  size?: string;
  pageCount?: number;
  coverMaterial?: string;
  pageMaterial?: string;
  binding?: string;
  colorComposition?: string;
}

export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Partner {
  name: string;
  logo: string;
}
