
import { Book, Testimonial, Partner } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Mengenal Diri',
    author: 'Nyoman Lisnawa',
    category: 'Pengembangan Diri',
    type: 'Paperback',
    price: 85000,
    rating: 4.9,
    synopsis: 'Buku ini merupakan kumpulan tulisan tentang pengalaman, perjalanan, dan rasa yang didapat penulis dalam proses mengenal diri. Buku ini bermakna bahwa setiap langkah, perbuatan, dan kejadian dalam perjalanan dapat dimaknai dan menjadi pembelajaran untuk lebih mengenal diri.',
    image: 'https://picsum.photos/seed/mengenal-diri/400/600',
    gallery: [
      'https://picsum.photos/seed/mengenal-diri-1/400/600',
      'https://picsum.photos/seed/mengenal-diri-2/400/600'
    ],
    publisher: 'PT. Percetakan Bali',
    size: 'A5',
    pageCount: 121,
    coverMaterial: 'Laminasi Glossy / AP 260 gr',
    pageMaterial: 'HVS 70 gr',
    binding: 'Lem Samping',
    colorComposition: 'Warna isi 1'
  },
  {
    id: '2',
    title: 'Pikiran Algoritmik',
    author: 'Marcus Chen',
    category: 'Teknologi',
    type: 'E-Book',
    price: 125000,
    rating: 4.9,
    synopsis: 'Sebuah pendalaman tentang bagaimana jaringan saraf mengubah dunia kita. Marcus Chen mengeksplorasi implikasi etis, praktis, dan filosofis dari hidup di masyarakat yang digerakkan oleh AI.',
    image: 'https://picsum.photos/seed/book2/400/600',
    gallery: [
      'https://picsum.photos/seed/book2-1/400/600',
    ],
    publisher: 'Ganesa Tech Press',
    size: 'Digital',
    pageCount: 350,
    coverMaterial: 'Digital',
    pageMaterial: 'E-Ink Optimized',
    binding: 'Digital',
    colorComposition: 'RGB'
  },
  {
    id: '3',
    title: 'Kepemimpinan Sunyi',
    author: 'Sarah Jenkins',
    category: 'Bisnis',
    type: 'Paperback',
    price: 110000,
    rating: 4.7,
    synopsis: 'Kepemimpinan tidak selalu tentang menjadi orang yang paling vokal di ruangan. Sarah Jenkins mengungkapkan bagaimana pemimpin introvert sering mencapai kesuksesan yang lebih berkelanjutan melalui mendengarkan dan empati strategis.',
    image: 'https://picsum.photos/seed/book3/400/600',
    gallery: [],
    publisher: 'Bali Business Media',
    size: 'B5',
    pageCount: 210,
    coverMaterial: 'Doff / AP 230 gr',
    pageMaterial: 'Bookpaper 72 gr',
    binding: 'Jahit Kawat',
    colorComposition: 'BW'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Wayan Sudarta',
    role: 'Pustakawan',
    content: 'Distribusi dari Ganesa Mas sangat cepat dan buku selalu dalam kondisi prima.',
    avatar: 'https://i.pravatar.cc/150?u=wayan'
  },
  {
    id: 2,
    name: 'Ni Made Ayu',
    role: 'Pemilik Toko Buku',
    content: 'Katalog yang lengkap dan sistem pemesanan yang sangat transparan.',
    avatar: 'https://i.pravatar.cc/150?u=made'
  }
];

export const PARTNERS: Partner[] = [
  { name: 'Penguin Books', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Penguin_Books_logo.svg/1200px-Penguin_Books_logo.svg.png' },
  { name: 'HarperCollins', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/HarperCollins_Logo.svg/1200px-HarperCollins_Logo.svg.png' },
  { name: 'Scholastic', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Scholastic_logo.svg/2560px-Scholastic_logo.svg.png' }
];
