import { RenderState } from "@/types";
import { chooseShape } from "@/utils/chooseShape";
import Image from "next/image";
import React from "react";

type Props = {
  setRenderState: React.Dispatch<React.SetStateAction<RenderState>>;
  setIsRenderOpen: (open: boolean) => void;
};
export const StepChooseShape = ({ setRenderState, setIsRenderOpen }: Props)=> {
  return (
    <section className="py-16">
      <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">4</span>
          Choose a shape
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {chooseShape.map((shape, i) => (
          <button
            onClick={() => {
              setRenderState((prev) => ({
                ...prev,
                shape: shape.name,
              }));
              setIsRenderOpen(true);
            }}
            className="flex flex-col border border-transparent  focus:border-[#ff5100]  rounded-xl items-center bg-gray-100 hover:bg-gray-200 py-8"
          >
            <Image
              src={shape.image}
              alt={shape.name}
              width={300}
              height={300}
            />
            <span className="text-center text-[19px] text-[#ff5100]">
              {shape.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
