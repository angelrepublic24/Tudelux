'use client';

import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/css';

const videos = [
  {
    id: 1,
    video: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Edit%20Canopy.mp4",
    product_name: "Tudelu Canopies",
    subtitle: "Shades That Brighten You",
    description: "Elegant customizable shade solution.",
    button_text: "Canopy Series",
    link: "https://example.com/canopy",
  },
  {
    id: 2,
    video: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Product%20Lines/CANOPY.mp4",
    product_name: "Sunshades",
    subtitle: "Shades That Brighten You",
    description: "High-performance retractable systems.",
    button_text: "Explore Canopy",
    link: "https://example.com/explore-canopy",
  },
  {
    id: 3,
    video: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Product%20Lines/PARTITION.mp4",
    product_name: "Tudelu Paritions",
    subtitle: "The Walls That Move You",
    description: "Remote-controlled, retractable, sound-blocking wall.",
    button_text: "Partition Series",
    link: "https://example.com/partition",
  },
  {
    id: 4,
    video: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Product%20Lines/PERGOLA.mp4",
    product_name: "Tudelu Pergolas",
    subtitle: "Spaces That Free You",
    description:
      "Customizable, sleek outdoor structures designed to provide flexible shade and shelter.",
    button_text: "Discover Pergola",
    link: "https://example.com/pergola",
  },
];

export default function HomeItem() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiper = new Swiper('.productSwiper', {
      slidesPerView: 1.2,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      speed: 1200,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.1,
        },
        768: {
          slidesPerView: 1.3,
        },
        1024: {
          slidesPerView: 1.7,
        },
      },
      on: {
        slideChangeTransitionStart: function () {
          const videos = document.querySelectorAll('.swiper-slide video');
          videos.forEach((video) => {
            video.pause();
            video.currentTime = 0;
          });
        },
        slideChangeTransitionEnd: function () {
          const activeVideo = document.querySelector('.swiper-slide-active video');
          if (activeVideo) activeVideo.play().catch(() => {});
        },
      },
    });

    const firstVideo = document.querySelector('.swiper-slide-active video');
    if (firstVideo) firstVideo.play().catch(() => {});
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 mb-2 block text-lg font-semibold">OUR PRODUCTS</span>
          <h2 className="text-black text-3xl md:text-5xl font-bold">
            Functional innovation, inside and out
          </h2>
        </div>

        <div className="swiper productSwiper">
          <div className="swiper-wrapper">
            {videos.map((item) => (
              <div key={item.id} className="swiper-slide group w-[90vw]">
                <div className="relative overflow-hidden rounded-xl shadow-lg h-[70vh]">
                  <video
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={`${item.video}#t=0.5`} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bottom-4 flex justify-center items-end group-hover:hidden z-10">
                    <div className="flex justify-center py-4">
                      <a
                        href={item.link}
                        className="inline-block text-[#ece83a] bg-[#ff5100] font-bold px-5 py-3 rounded-xl hover:bg-orange-600 transition"
                        aria-label={`Go to ${item.product_name}`}
                      >
                        {item.button_text}
                      </a>
                    </div>
                  </div>

                  <div className="absolute inset-0">
                    <div className="bg-white/50 h-full rounded-xl text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 md:p-16">
                      <div className="text-lg font-medium leading-relaxed space-y-10">
                        <span className="rounded-full py-3 px-4 bg-[#ece83a] text-2xl text-[#ff5100]">
                          {item.id}.
                        </span>
                        <div>
                          <h5 className="text-2xl md:text-4xl lg:text-7xl text-[#ff5100] my-4">
                            {item.product_name}
                          </h5>
                          <span className="font-bold text-base md:text-2xl block">
                            {item.subtitle}
                          </span>
                          <p className="text-base md:text-xl mt-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
