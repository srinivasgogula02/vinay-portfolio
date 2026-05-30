"use client";

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function TestimonialGrid({ testimonials }: { testimonials: any[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {testimonials.map((test) => (
        <motion.div 
          key={test.id}
          variants={item}
          className="relative group rounded-3xl bg-white border border-neutral-200 p-8 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-500"
        >
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-orange-50 blur-3xl group-hover:bg-orange-100 transition-colors duration-700"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < test.rating ? 'text-orange-400' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg md:text-xl text-neutral-800 font-serif italic leading-relaxed">
                "{test.content}"
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden shrink-0">
                {test.image_url ? (
                  <img src={test.image_url} alt={test.client_name} className="w-full h-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }} />
                ) : null}
                <span className={`text-xs font-bold text-neutral-900 uppercase ${test.image_url ? 'hidden' : ''}`}>{test.client_name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold text-sm text-neutral-900 uppercase tracking-wider">{test.client_name}</p>
                {test.company && <p className="text-xs text-neutral-500 uppercase tracking-widest mt-0.5">{test.company}</p>}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
