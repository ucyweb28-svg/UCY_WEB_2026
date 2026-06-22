import Image from 'next/image';

export function StaysShowcase() {
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[1472px] mx-auto px-6 lg:px-[5.5%] pb-16">
      <div className="flex-1">
        <Image
          src="/images/stays/hero-bg.png"
          alt=""
          width={736}
          height={460}
          className="w-full h-[300px] md:h-[460px] object-cover rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <Image
          src="/images/stays/hero-bg.png"
          alt=""
          width={736}
          height={460}
          className="w-full h-[300px] md:h-[460px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
