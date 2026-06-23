'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_IMAGES = [
  '/images/stays/Studios_001.jpg',
  '/images/stays/Studios_005.jpg',
  '/images/stays/Studios_008.jpg',
  '/images/stays/Studios_015.jpg',
  '/images/stays/Studios_018.jpg',
  '/images/stays/Studios_023.jpg',
  '/images/stays/airbnb-3.jpg',
];

function ImageCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((v) => (v + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#000807' }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <Image
            src={CAROUSEL_IMAGES[active]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={active === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {CAROUSEL_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Photo ${i + 1}`}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 border-none p-0 ${
              i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function StaysShowcase() {
  return (
    <section>
    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-12 gap-6 lg:h-[440px]">
      <div className="col-span-12 lg:col-span-7 h-[280px] lg:h-full">
        <Image
          src="/images/stays/hero-bg.png"
          alt=""
          width={960}
          height={520}
          className="w-full h-full object-cover object-center rounded-2xl"
          priority
        />
      </div>
      <div className="col-span-12 lg:col-span-5 h-[280px] lg:h-full">
        <ImageCarousel />
      </div>
    </div>
    </section>
  );
}
