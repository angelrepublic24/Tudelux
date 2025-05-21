"use client";

import { useEffect, useState } from "react";
import { MaterialItemTable, RenderState } from "@/types";
import { StepTitle } from "@/components/ui/StepTitle/StepTitle";

type Props = {
  renderState: RenderState;
  setMaterialsData: React.Dispatch<React.SetStateAction<MaterialItemTable[]>>;
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen?: (open: boolean) => void;
  onContinue: () => void;
};

export const StepSize = ({
  renderState,
  setRenderState,
  setIsRenderOpen,
  onContinue,
}: Props) => {
  const shape = renderState.shape;
  const isFrontHex = shape === "Front Hex";
  const isLeftWall = shape === "Left Wall";
  const isRightWall = shape === "Right Wall";
  const isRectangular = shape === "Rectangular";

  const [width, setWidth] = useState(10);
  const [projection, setProjection] = useState(10);
  const [frontWidth, setFrontWidth] = useState(10);
  const [backWidth, setBackWidth] = useState(9);
  const [corners, setCorners] = useState(1);
  const [middleWidthFrame, setMiddleWidthFrame] = useState(1);
  const [sideProjection, setSideProjection] = useState(9);
  const [middleProjection, setMiddleProjection] = useState(1);

  const MIN_INCHES = 1;
  const MIN_DIFF = 1; // 12 inches

  useEffect(() => {
    if (isFrontHex) {
      const calculatedFront = backWidth - (2 * corners) / 2;
      setFrontWidth(parseFloat(calculatedFront.toFixed(2)));
    }
  }, [backWidth, corners]);

  useEffect(() => {
    if (isLeftWall || isRightWall) {
      const expected = frontWidth;
      const newMiddle = Math.max(expected - backWidth, MIN_DIFF / 12);
      if (Math.abs(newMiddle - middleWidthFrame) > 0.001) {
        setMiddleWidthFrame(newMiddle);
      }
    }
  }, [frontWidth]);

  useEffect(() => {
    const max = projection - MIN_DIFF / 12;
    const total = sideProjection + middleProjection;

    if (total > max) {
      if (sideProjection > middleProjection) {
        const adjusted = max - middleProjection;
        if (Math.abs(sideProjection - adjusted) > 0.001) setSideProjection(adjusted);
      } else {
        const adjusted = max - sideProjection;
        if (Math.abs(middleProjection - adjusted) > 0.001) setMiddleProjection(adjusted);
      }
    }
  }, [projection]);

  const handleContinue = () => {
    if (isFrontHex) {
      setRenderState((prev) => ({
        ...prev,
        dimensions: {
          frontWidth: frontWidth.toString(),
          backWidth: backWidth.toString(),
          projection: projection.toString(),
          corners: corners.toString(),
          frontWidthInches: frontWidth * 12,
          backWidthInches: backWidth * 12,
          projectionInches: projection * 12,
          cornersInches: corners * 12,
        },
      }));
    } else if (isLeftWall) {
      setRenderState((prev) => ({
        ...prev,
        dimensions: {
          frontWidth: frontWidth.toString(),
          backWidth: backWidth.toString(),
          middleWidthFrame: middleWidthFrame.toString(),
          projection: projection.toString(),
          leftProjectionInches: projection * 12,
          rightProjectionInches: sideProjection * 12,
          middleProjectionInches: middleProjection * 12,
          frontWidthInches: frontWidth * 12,
          backWidthInches: backWidth * 12,
          middleWidthInches: middleWidthFrame * 12,
          projectionInches: projection * 12,
        },
      }));
    } else if (isRightWall) {
      setRenderState((prev) => ({
        ...prev,
        dimensions: {
          frontWidth: frontWidth.toString(),
          backWidth: backWidth.toString(),
          middleWidthFrame: middleWidthFrame.toString(),
          projection: projection.toString(),
          leftProjectionInches: sideProjection * 12,
          rightProjectionInches: projection * 12,
          middleProjectionInches: middleProjection * 12,
          frontWidthInches: frontWidth * 12,
          backWidthInches: backWidth * 12,
          middleWidthInches: middleWidthFrame * 12,
          projectionInches: projection * 12,
        },
      }));
    } else if (isRectangular) {
      setRenderState((prev) => ({
        ...prev,
        dimensions: {
          width: width.toString(),
          projection: projection.toString(),
          widthInches: width * 12,
          projectionInches: projection * 12,
        },
      }));
    }

    setIsRenderOpen?.(true);
    onContinue();
  };

  return (
    <section className="py-10">
      <StepTitle step={5} title="Give your dimensions" />
      <div className="flex flex-col gap-8 py-10">
        {isFrontHex && (
          <>
            <DimensionInput label="Front Width" value={frontWidth} onChange={setFrontWidth} />
            <DimensionInput label="Back Width" value={backWidth} onChange={setBackWidth} />
            <DimensionInput label="Corners" value={corners} onChange={setCorners} />
            <DimensionInput label="Projection" value={projection} onChange={setProjection} />
          </>
        )}

        {isRectangular && (
          <>
            <DimensionInput label="Width" value={width} onChange={setWidth} />
            <DimensionInput label="Projection" value={projection} onChange={setProjection} />
          </>
        )}

        {isLeftWall && (
          <>
            <DimensionInput label="Front Width" value={frontWidth} onChange={setFrontWidth} />
            <DimensionInput label="Back Width" value={backWidth} onChange={setBackWidth} />
            <DimensionInput label="Middle Width Frame" value={middleWidthFrame} onChange={setMiddleWidthFrame} />
            <DimensionInput label="Side Projection" value={sideProjection} onChange={setSideProjection} />
            <DimensionInput label="Middle Projection" value={middleProjection} onChange={setMiddleProjection} />
            <DimensionInput label="Total Projection" value={projection} onChange={setProjection} />
          </>
        )}

        {isRightWall && (
          <>
            <DimensionInput label="Front Width" value={frontWidth} onChange={setFrontWidth} />
            <DimensionInput label="Back Width" value={backWidth} onChange={setBackWidth} />
            <DimensionInput label="Middle Width Frame" value={middleWidthFrame} onChange={setMiddleWidthFrame} />
            <DimensionInput label="Side Projection" value={sideProjection} onChange={setSideProjection} />
            <DimensionInput label="Middle Projection" value={middleProjection} onChange={setMiddleProjection} />
            <DimensionInput label="Total Projection" value={projection} onChange={setProjection} />
          </>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          className="mt-10 bg-[#ff5100] text-yellow-300 font-bold px-10 py-4 rounded-2xl hover:bg-orange-600 transition"
        >
          Continue
        </button>
      </div>
    </section>
  );
};

const DimensionInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => (
  <div className="flex flex-col lg:flex-row items-center space-x-4">
    <label className="mb-2 text-lg w-40">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 text-center py-3 bg-gray-100 rounded-xl text-lg font-semibold"
      />
      <span className="text-base font-medium">ft</span>
      <input
        type="number"
        placeholder={`${(value * 12).toFixed(0)}`}
        disabled
        className="w-32 text-center py-3 bg-gray-100 rounded-xl text-gray-400 text-lg font-semibold"
      />
      <span className="text-base font-medium">in</span>
    </div>
  </div>
);
