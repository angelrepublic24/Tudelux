'use client';
import { useEffect, useRef } from 'react';

const videos = [
  "https://res.cloudinary.com/dd3wigmdk/video/upload/v1740990158/fromkitchenett-compress_zenhnp.mp4",
  "https://res.cloudinary.com/dd3wigmdk/video/upload/v1740990398/WhatsApp_20Video_202022-11-23_20at_208.24.16_20AM_20_1_-1_c98sw4.mp4",
  "https://res.cloudinary.com/dd3wigmdk/video/upload/v1740990551/Tudelu_20Confrence_20room_20_1_i3v9t6.mov",
  "https://res.cloudinary.com/dd3wigmdk/video/upload/v1740990618/Closure-top-Banner_f6xh3m.mov",
  "https://res.cloudinary.com/dd3wigmdk/video/upload/v1740990817/Comp_201_20_vumehs.mov",
];

export const Banner = () => {
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    // Auto loop de videos con fade
    let current = 0;

    const showVideo = (index: number) => {
      videoRefs.current.forEach((vid, i) => {
        if (vid) {
          vid.style.opacity = i === index ? '1' : '0';
        }
      });
    };

    showVideo(current);

    const interval = setInterval(() => {
      current = (current + 1) % videos.length;
      showVideo(current);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-white overflow-hidden h-[100vh]">
      {/* Background videos */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <div className="w-full h-full flex">
            {videos.map((src, i) => (
              <video
                key={i}
                muted
                playsInline
                preload="auto"
                loop
                autoPlay
                className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-1000"
                ref={(el) => {
                  if (el) videoRefs.current[i] = el;
                }}
              >
                <source src={`${src}#t=0.5`} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl lg:ml-16 px-6 md:px-16 py-32 lg:py-40">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Design it in real time.
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Quote it in no time.
          </h2>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight text-[#ff5100]">
            Get it Right On Time.
          </h2>
        </div>

        {/* Contact: reemplazar con componente real o contenido estático si se desea */}
        <div className="mb-8">
          <ul className="text-white font-semibold mb-4 list-disc pl-6">
            <li className="text-lg">Motorized Wall</li>
            <li className="text-lg">Modular Canopies</li>
            <li className="text-lg">Freestanding Pergolas</li>
            <li className="text-lg">Architectural Elements</li>
          </ul>
          <span className="text-2xl font-semibold">
            Designed and quoted right here, right now
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#ff5100] hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-xs md:text-lg transition font-semibold"
          >
            Start Designing
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white px-6 py-3 rounded-xl font-semibold transition hover:bg-white text-xs md:text-lg hover:text-orange-500"
          >
            How it Works
          </a>
        </div>
      </div>
    </section>
  );
};
