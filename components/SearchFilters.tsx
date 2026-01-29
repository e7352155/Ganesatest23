
import React from 'react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
  activeType: string;
  setActiveType: (val: string) => void;
  categories: string[];
  types: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  searchTerm, setSearchTerm, 
  activeCategory, setActiveCategory,
  activeType, setActiveType,
  categories, types 
}) => {
  return (
    <div className="flex flex-col gap-6 w-full lg:max-w-2xl">
      {/* Integrated Search Bar inside Filters */}
      <div className="relative group">
        <input 
          type="text"
          placeholder="Cari judul, penulis, atau topik..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-4 py-5 bg-white border-2 border-gray-100 rounded-[2rem] focus:outline-none focus:border-teal-500 transition-all shadow-xl shadow-gray-100/50"
        />
        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300 group-focus-within:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Kategori Buku</span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-100' : 'bg-white text-gray-500 border-gray-100 hover:border-teal-200 hover:text-teal-600'}`}
              >
                {cat === 'All' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Format / Tipe</span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${activeType === type ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100' : 'bg-white text-gray-500 border-gray-100 hover:border-orange-200 hover:text-orange-600'}`}
              >
                {type === 'All' ? 'Semua Format' : type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
