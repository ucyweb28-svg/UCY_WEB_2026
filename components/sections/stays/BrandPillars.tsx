'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const PILLARS = [
  {
    letter: 'U',
    wordKey: 'pillars_u_word',
    captionKey: 'pillars_u_caption',
    image: '/images/stays/pillar-u.png',
    imageAlt: 'Résidence unique — UCY Stays',
  },
  {
    letter: 'C',
    wordKey: 'pillars_c_word',
    captionKey: 'pillars_c_caption',
    image: '/images/stays/pillar-c.png',
    imageAlt: 'Confiance — UCY Stays',
  },
  {
    letter: 'Y',
    wordKey: 'pillars_y_word',
    captionKey: 'pillars_y_caption',
    image: '/images/stays/pillar-y.png',
    imageAlt: 'Yonathan Chetrit — UCY Stays',
  },
] as const;

export function BrandPillars() {
  const t = useTranslations('stays');

  return (
    <div>
      {PILLARS.map(({ letter, wordKey, captionKey, image, imageAlt }) => (
        <section
          key={letter}
          className="relative flex flex-col"
          style={{ minHeight: '80vh', backgroundColor: '#000807' }}
        >
          {/* Background image */}
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Brand-tint colour wash — same dual-overlay as hero */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              background:
                'linear-gradient(135deg, rgba(222,84,30,0.12), rgba(223,87,188,0.10), rgba(54,38,167,0.15))',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Dark gradient — bottom legibility veil */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,8,7,0.85) 100%)',
            }}
          />

          {/* Content — top-left */}
          <div
            className="relative w-full max-w-7xl mx-auto px-6 lg:px-8"
            style={{ zIndex: 3, paddingTop: 80, paddingBottom: 80 }}
          >
            <ScrollReveal>
              <div className="flex flex-col items-start gap-3 max-w-xl">
                {/* Giant letter */}
                <span
                  className="font-trap font-extrabold leading-none select-none"
                  style={{
                    fontSize: 'clamp(96px, 13vw, 176px)',
                    color: '#FBF9FF',
                    textShadow: '0 4px 40px rgba(0,0,0,0.45)',
                  }}
                >
                  {letter}
                </span>

                {/* Word */}
                <span
                  className="font-trap font-bold"
                  style={{
                    fontSize: 'clamp(26px, 3.5vw, 46px)',
                    color: '#FBF9FF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t(wordKey)}
                </span>

                {/* Caption */}
                <p
                  className="font-montserrat leading-relaxed"
                  style={{
                    fontSize: 'clamp(15px, 1.7vw, 18px)',
                    color: 'rgba(251,249,255,0.72)',
                    maxWidth: 460,
                  }}
                >
                  {t(captionKey)}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}
    </div>
  );
}
