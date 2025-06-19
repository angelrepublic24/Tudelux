"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RenderState } from "@/shared/types";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { ContinueButton } from "@/shared/components/ui/continueButton/ContinueButton";

type Props = {
  renderState: RenderState;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen: (val: boolean) => void;
  onContinue: () => void;
};

export default function DimensionStep({
  renderState,
  setRenderState,
  setIsRenderOpen,
  onContinue,
}: Props) {
  const [width, setWidth] = useState(10); // ft
  const [height, setHeight] = useState(8); // ft
  const [errors, setErrors] = useState({ width: "", height: "" });

  const handleWidthChange = (val: number) => {
    if (val >= 10 && val <= 80) {
      setWidth(val);
      setErrors((prev) => ({ ...prev, width: "" }));
    } else {
      setErrors((prev) => ({ ...prev, width: "Min 10' - Max 80'" }));
    }
  };

  const handleHeightChange = (val: number) => {
    if (val >= 3 && val <= 16) {
      setHeight(val);
      setErrors((prev) => ({ ...prev, height: "" }));
    } else {
      setErrors((prev) => ({ ...prev, height: "Min 3' - Max 16'" }));
    }
  };

  const handleContinue = () => {
    if (errors.width || errors.height) return;

    setRenderState((prev) => ({
      ...prev,
      dimensionWall: {
        width: width.toString(),
        height: height.toString(),
        widthInc: (width * 12).toString(),
        heightIn: (height * 12).toString(),
      },
    }));

    setIsRenderOpen(true);
    onContinue();
  };

  return (
    <div className="w-[90%] py-10">
      <StepTitle step={3} title="Give your dimensions" />
      <a
        href="#"
        className="text-gray-500 underline block mb-8 text-sm hover:text-gray-700"
      >
        Help Me Measure
      </a>

      <div className="flex justify-around">
        {/* Width */}
        <div className="flex justify-around">
          <p className="text-xl font-medium w-1/3">
            The <span className="text-orange-500">overall linear</span> width of
            my opening is
          </p>
          <div className="flex gap-4 mt-4">
            <div>
              <Input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                placeholder="ft"
                className="w-24 h-16 rounded-2xl bg-gray-100 text-center"
              />
              <p className="text-xs text-gray-500 mt-2">Min 10' - Max 80'</p>
              {errors.width && (
                <span className="text-red-500 text-sm">{errors.width}</span>
              )}
            </div>
            <div>
              <Input
                placeholder={`${(width * 12).toFixed(0)} in`}
                disabled
                className="w-24 h-16 text-gray-300 rounded-2xl bg-gray-100 text-center"
              />
            </div>
          </div>
        </div>

        {/* Height */}
        <div className=" border-l border-gray-300 pl-6 flex justify-between">
          <p className="text-xl font-medium w-1/3">
            The <span className="text-orange-500">overall vertical</span> height
            of my opening is
          </p>
          <div className="flex gap-4 mt-4">
            <div>
              <Input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                placeholder="ft"
                className="w-24 h-16 rounded-2xl bg-gray-100 text-center"
              />
              <p className="text-xs text-gray-500 mt-2">Min 3' - Max 16'</p>
              {errors.height && (
                <span className="text-red-500 text-sm">{errors.height}</span>
              )}
            </div>
            <div>
              <Input
                placeholder={`${(height * 12).toFixed(0)} in`}
                disabled
                className="w-24 h-16 text-gray-400 rounded-2xl bg-gray-100 text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ContinueButton onContinue={handleContinue} />
      </div>
    </div>
  );
}
