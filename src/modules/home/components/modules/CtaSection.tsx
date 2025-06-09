'use client';

export const EstimateBanner = () => {
  return (
    <section className="bg-[#ff5100] w-[85%] mx-auto rounded-xl my-16 px-8 py-20 relative">
      <div className="flex flex-col md:flex-row items-center justify-around gap-4">
        {/* Texto grande */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5ec35]">
          Got 30 seconds?
        </h2>

        {/* Botón blanco */}
        <a
          href="#"
          className="bg-white text-[#ff5100] font-semibold text-lg px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Instant Estimate
        </a>
      </div>
    </section>
  );
};
