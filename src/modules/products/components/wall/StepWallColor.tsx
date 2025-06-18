import { getWallColor } from "@/api/HubspotAPi";
import { StepTitle } from "@/shared/components/ui/StepTitle/StepTitle";
import { RenderState } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

type ColorProps = {
  colorName: string;
  image: string;
  description: string;
};

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  onContinue: () => void;
  setIsRenderOpen?: (open: boolean) => void;
};

export const StepWallColor = ({
  setRenderState,
  onContinue,
  setIsRenderOpen,
}: Props) => {
  const {
    data: colors,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getWallColor,
    queryKey: ["colors"],
  });
  if (isLoading) return "Loading....";
  if (isError) return "Error loading";

  const groupColors: ColorProps[] = colors.map((color: any) => {
    const colorValue = color.values;
    return {
      colorName: colorValue[1],
      image: colorValue[2].url,
      description: colorValue[3] || "",
    };
  });

  groupColors.filter((c) => c.colorName !== "Snow");
  return (
    <section>
      <StepTitle step={4} title="Choose your colors" />

      <div className="py-16">
        <h5>Fabric Color</h5>

        <div className="flex gap-4">
          {groupColors.filter((c) => c.colorName !== "Snow").map((color) => (
            <button
              className="flex flex-col items-center w-62"
              onClick={() => {
                onContinue();
              }}
            >
              <Image
                src={color.image}
                alt={color.colorName}
                width={200}
                height={200}
                className="rounded-full w-44 h-44 mb-4 hover:w-48 border hover:h-48 transition-all focus:border-[#ff5100]"
              />
              <div className="">
                <p className="text-center">{color.colorName}</p>
                <span className="text-xs text-left w-10">
                  {color.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
