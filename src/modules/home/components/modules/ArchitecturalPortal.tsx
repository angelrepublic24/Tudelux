'use client';

import React from 'react';

const steps = [
  { label: 'Design', icon: 'https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Group-1.png' },
  { label: 'Quote/Tweak', icon: 'https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Group%20(1).png' },
  { label: 'Approve', icon: 'https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Group-1.png' },
  { label: 'Manufacture', icon: 'https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Group-1.png' },
  { label: 'Ship/Install', icon: 'https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/Group-1.png' },
];

export default function ArchitectsPortalSection() {
  return (
    <section className="bg-white lg:h-[65vh] flex items-center justify-center py-10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-4">
        {/* Left content */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10">Architect's Portal</h2>

          <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center gap-2 space-y-8 md:space-y-0">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative w-1/2 lg:w-[18%] h-[175px] bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-end pt-12"
              >
                <div className="absolute -top-8 w-[72px] h-[72px] bg-[#ff5100] rounded-full flex items-center justify-center shadow-md">
                  <img
                    src={step.icon}
                    alt={step.label}
                    className="w-[56px] h-[56px]"
                  />
                </div>
                <p className="text-sm font-medium text-center py-2">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right video */}
        <div className="w-full lg:w-1/3 h-[320px] lg:h-[90%]">
          <video
            muted
            autoPlay
            playsInline
            loop
            className="w-full h-full object-contain rounded-xl"
            src="https://22465736.fs1.hubspotusercontent-na1.net/hubfs/22465736/CANOPY.mp4"
          />
        </div>
      </div>
    </section>
  );
}
