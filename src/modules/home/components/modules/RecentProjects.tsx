'use client';

import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const images = [
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/OFFICE_STORMCLOUD%20(1).png" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/B7D49379-467B-4EF1-B5EB-572248A8B101%20(1)%20(1).jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Office_1%20(1).png" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Studio%20(3).png" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Secluded_2.png" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/20220828_205326.jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Copy%20of%20613-4TH-AVE-02-ARRIVAL%202.jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/PSX_20211119_092724-2-scaled.jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Mute_3%20(1).png" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Copy%20of%20PSX_20211212_202546.jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/Secluded_1%20(1).jpg" },
  { src: "https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Get%20Your%20Vision/MARYMOUNT%20COMPLETED%201-11-24%20(4).jpg" }
];

export default function RecentProjects() {
  useEffect(() => {
    new Swiper('.slider-1', {
      slidesPerView: 3,
      spaceBetween: 5,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1.2 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }, []);

  return (
    <section className="relative bg-gray-100 py-16">
      <div className="w-[95%] mx-auto px-4">
        <div className="w-full flex flex-col items-center mb-8">
          <span className="text-xl text-[#ff5100] text-center font-semibold mb-2">PROJECT GALLERY</span>
          <h2 className="text-center text-3xl md:text-5xl mb-8">
            Get the look or get your vision.
          </h2>
        </div>

        <div className="swiper slider-1 overflow-hidden">
          <div className="swiper-wrapper">
            {images.map((img, index) => (
              <div key={index} className="swiper-slide">
                <a href={img.src} target="_blank" rel="noopener noreferrer">
                  <img
                    loading="lazy"
                    src={img.src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-[280px] object-cover object-top rounded-xl shadow-sm transition-transform duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="swiper-pagination !bottom-0"></div>
        </div>
      </div>
    </section>
  );
}
