"use client";
import { useEffect, useRef } from "react";

export const Banner = () => {
  return (
    <section className="h-[80vh] relative flex">
      {/* Content */}
      <div className="w-[35%] lg:ml-16 px-6 py-32 ">
        <div className="mb-6 space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Design it in real time.
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Quote it in no time.
          </h2>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-[#ff5100]">
            Get it Right On Time.
          </h2>
        </div>

        {/* Contact: reemplazar con componente real o contenido estático si se desea */}
        <div className="mb-8">
          <ul className="font-semibold mb-4 list-disc pl-6">
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
      {/* Background videos */}
        <div className=" p-16 w-[65%]">
          <video
            muted
            playsInline
            preload="auto"
            loop
            autoPlay
            className="w-full object-cover  rounded-2xl"
          >
            <source
              src="https://tudelu.com/hubfs/PROOF%20CONTENT(1).mp4#t=0.5"
              type="video/mp4"
            />
          </video>
      </div>
    </section>
  );
};
