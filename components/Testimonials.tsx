
import React from 'react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold serif mb-4">Umpan Balik Mitra</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 hover:border-orange-200 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-orange-600 text-sm font-medium">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg italic leading-relaxed">"{t.content}"</p>
              <div className="mt-6 flex text-amber-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
