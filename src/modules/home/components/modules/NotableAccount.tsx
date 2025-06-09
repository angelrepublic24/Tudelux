'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

const logos = [
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/AZ_State_Troopers.png?width=225&height=225&name=AZ_State_Troopers.png',
    alt: 'AZ Troopers',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/MichiganState.png?width=250&height=171&name=MichiganState.png',
    alt: 'Michigan State',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/us-army-logo-png-transparent.png?width=250&height=250&name=us-army-logo-png-transparent.png',
    alt: 'US Army',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/Marines.png?width=225&height=228&name=Marines.png',
    alt: 'Marines',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/HolidayInnExpress.png?width=225&height=225&name=HolidayInnExpress.png',
    alt: 'Holiday Inn',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/Prudential.png?width=225&height=225&name=Prudential.png',
    alt: 'Prudential',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/BrownUniversity.png?width=225&height=225&name=BrownUniversity.png',
    alt: 'Brown',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/EliLilly.png?width=225&height=225&name=EliLilly.png',
    alt: 'Eli Lilly',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/FloridaGulfCostUniversity.png?width=225&height=225&name=FloridaGulfCostUniversity.png',
    alt: 'FGCU',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/DCChamberofCommerce.png?width=225&height=225&name=DCChamberofCommerce.png',
    alt: 'DC Chamber',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/CryptoArena.png?width=225&height=225&name=CryptoArena.png',
    alt: 'CryptoArena',
  },
  {
    src: 'https://tudelu.com/hs-fs/hubfs/Logo%20Slider-Partners/US_Air_Force_Logo_Solid_Colour.svg.png?width=250&height=195&name=US_Air_Force_Logo_Solid_Colour.svg.png',
    alt: 'US Air Force',
  },
];

export default function NotableAccounts() {
  return (
    <section className="relative py-12 h-[60vh] mb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <span className="block text-[#ff5100] font-semibold text-lg md:text-xl mb-2">
            Notable Accounts
          </span>
          <h5 className="text-4xl font-bold mb-4 text-center">Giants we call clients</h5>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={120}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="overflow-visible"
        >
          {logos.map((logo, i) => (
            <SwiperSlide key={i} className="flex justify-center items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={200}
                className="h-44 w-auto object-contain rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination spacing */}
        <div className="swiper-pagination mt-16 flex justify-center gap-2" />
      </div>
    </section>
  );
}
