"use client";
import { useState } from "react";
import { RenderState } from "@/types";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen?: (open: boolean) => void;
  onContinue: () => void;
};

export const StepSize = ({
  setRenderState,
  setIsRenderOpen,
  onContinue,
}: Props) => {
  const [width, setWidth] = useState(10);
  const [projection, setProjection] = useState(10);

 const handleContinue = () => {
  const widthInches = width * 12;
  const projectionInches = projection * 12;

  setRenderState((prev) => ({
    ...prev,
    dimensions: {
      width: width.toString(), // en ft
      projection: projection.toString(), // en ft
      widthInches, // en in
      projectionInches, // en in
    },
  }));
  setIsRenderOpen?.(true);
  onContinue();
};

  return (
    <section className="py-10">
      <StepTitle step={5} title={"Give your dimensions"} />

      <div className="flex flex-col lg:flex-row items-center justify-center w-full py-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 w-full justify-start">
          {/* Width */}
          <div className="flex flex-col lg:flex-row items-center space-x-4">
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
          <div className="flex flex-col lg:flex-row space-x-4 items-center">
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
        <div className="lg:h-44 flex items-end">
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
