"use client";

import { motion } from 'framer-motion';

export default function ClientsMarquee({ clients }: { clients: any[] }) {
  if (!clients || clients.length === 0) return null;

  // Duplicate items slightly to ensure seamless looping if there are few
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-12 border-y border-neutral-200 overflow-hidden relative bg-[#F8F7F4] w-full max-w-[100vw]">
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-widest text-neutral-500 font-bold">Worked With</h2>
      </div>

      {/* Gradient masks for smooth fade in/out on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#F8F7F4] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#F8F7F4] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-fit">
        <motion.div
          className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((client, idx) => (
            <a 
              key={`${client.id}-${idx}`} 
              href={client.link || "#"} 
              target={client.link ? "_blank" : "_self"}
              className="flex items-center justify-center transition-transform hover:scale-105 duration-300 min-w-max"
            >
              {client.image_url ? (
                <img 
                  src={client.image_url} 
                  alt={client.name} 
                  className="h-12 md:h-16 w-auto object-cover rounded-xl shadow-sm mix-blend-multiply"
                />
              ) : (
                <span className="font-bold text-xl uppercase tracking-widest text-neutral-800">
                  {client.name}
                </span>
              )}
            </a>
          ))}
        </motion.div>
        
        {/* Duplicate container for seamless loop */}
        <motion.div
          className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24"
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((client, idx) => (
            <a 
              key={`dup-${client.id}-${idx}`} 
              href={client.link || "#"} 
              target={client.link ? "_blank" : "_self"}
              className="flex items-center justify-center transition-transform hover:scale-105 duration-300 min-w-max"
            >
              {client.image_url ? (
                <img 
                  src={client.image_url} 
                  alt={client.name} 
                  className="h-12 md:h-16 w-auto object-cover rounded-xl shadow-sm mix-blend-multiply"
                />
              ) : (
                <span className="font-bold text-xl uppercase tracking-widest text-neutral-800">
                  {client.name}
                </span>
              )}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
