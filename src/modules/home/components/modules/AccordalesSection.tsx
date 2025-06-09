'use client';

import Image from 'next/image';

export default function AccoladesSection() {
  return (
    <section className="bg-white py-16">
      <div className="w-[90%] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 space-y-12 md:space-y-0">
        
        {/* Izquierda: Título */}
        <div className="w-full">
          <span className="inline-block text-[#ff5100] text-2xl font-semibold px-4 py-1 mb-8">
            Accolades
          </span>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight text-black text-center md:text-left">
            Tudelü wins<br />
            patents, awards,<br />
            and hearts.
          </h2>
        </div>

        {/* Derecha: Dos ítems */}
        <div className="flex flex-col lg:flex-row justify-between items-center md:items-end gap-8">
          
          {/* Elemento 1 */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <Image
              src="https://tudelu.com/hs-fs/hubfs/img-1.png?width=328&height=135&name=img-1.png"
              alt="USPTO"
              width={200}
              height={100}
              className="mb-4 object-contain"
            />
            <p className="text-xl text-gray-800">
              Tudelü holds a number of<br />
              United States patents across<br />
              both utility and design.
            </p>
          </div>

          {/* Elemento 2 */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <Image
              src="https://tudelu.com/hubfs/img-1.svg"
              alt="Award"
              width={120}
              height={80}
              className="mb-4 object-contain"
            />
            <p className="text-xl text-gray-800">
              For nearly a decade, Tudelü<br />
              has seen a winning streak of<br />
              design awards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
