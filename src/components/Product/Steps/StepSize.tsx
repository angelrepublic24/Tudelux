"use client";

import { useState } from "react";
import { Title } from "@/components/ui/title/Title";
import { RenderState } from "@/types";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepSize = ({ setRenderState, setIsRenderOpen }: Props) => {
  const [width, setWidth] = useState(10);
  const [projection, setProjection] = useState(10);

  const handleContinue = () => {
    setRenderState((prev) => ({
      ...prev,
      dimensions: {
        width: width.toString(),
        projection: projection.toString(),
      },
    }));

    setIsRenderOpen?.(true);
  };

  return (
    <section className="py-10">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">5</span>
          Give your dimensions
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="flex items-center justify-center w-full py-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full justify-start">
          {/* Width */}
          <div className="flex items-center space-x-4">
            <label className="mb-2 text-lg">The Canopies width</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-32 text-center py-3 bg-gray-100 rounded-xl text-lg font-semibold"
              />
              <span className="text-base font-medium">ft</span>
              <input
                type="number"
                placeholder="in"
                disabled
                className="w-32 text-center py-3 bg-gray-100 rounded-xl text-gray-400 text-lg font-semibold"
              />
              <span className="text-base font-medium">in</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block border-l border-gray-400 h-12" />

          {/* Projection */}
          <div className="flex space-x-4 items-center">
            <label className="mb-2 text-lg">The Canopies Projection</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={projection}
                onChange={(e) => setProjection(Number(e.target.value))}
                className="w-32 text-center py-3 bg-gray-100 rounded-xl text-lg font-semibold"
              />
              <span className="text-base font-medium">ft</span>
              <input
                type="number"
                placeholder="in"
                disabled
                className="w-32 text-center py-3 bg-gray-100 rounded-xl text-lg text-gray-400 font-semibold"
              />
              <span className="text-base font-medium">in</span>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div className="h-44 flex items-end">
          <button
            onClick={handleContinue}
            className="mt-10 bg-[#ff5100] text-yellow-300 font-bold px-10 py-4 rounded-2xl hover:bg-orange-600 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};
