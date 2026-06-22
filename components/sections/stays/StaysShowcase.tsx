import Image from 'next/image';

export function StaysShowcase() {
  return (
    <div className="grid grid-cols-12 gap-6 max-w-[1472px] mx-auto px-6 lg:px-[5.5%] pb-16 lg:h-[520px]">
      <div className="col-span-12 lg:col-span-7 h-[300px] lg:h-full">
        <Image
          src="/images/stays/hero-bg.png"
          alt=""
          width={960}
          height={520}
          className="w-full h-full object-cover object-center rounded-2xl"
          priority
        />
      </div>
      <div className="col-span-12 lg:col-span-5 h-[300px] lg:h-full">
        {/* TODO: remplacer par un vrai <video> en crossfade une fois tes vidéos prêtes,
            même logique que VideoCarousel sur Studio (AnimatePresence, overlay gradient, dot indicators) */}
        <Image
          src="/images/stays/hero-bg.png"
          alt=""
          width={680}
          height={520}
          className="w-full h-full object-cover object-center rounded-2xl"
        />
      </div>
    </div>
  );
}
