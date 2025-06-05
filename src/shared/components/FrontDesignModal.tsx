// components/modals/FrontDesignModal.tsx
import React from "react";
import { ImageRender } from "./Render/3dRender";
import { RenderState } from "@/shared/types";

type Props = {
  isOpen: boolean;
  renderState: RenderState
  onClose: () => void;
  onSelectOption: (option: string) => void;
};

const options = ["Tube", "Channel", "Crown", `3" Extender`];

export const FrontDesignModal = ({
  isOpen,
  renderState,
  onClose,
  onSelectOption,
}: Props) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-gray-300/50 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Choose Front Add-On</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelectOption(option);
                  onClose();
                }}
                className="bg-[#ff5100] text-white py-2 px-4 rounded-lg hover:bg-white hover:text-[#ff5100] border border-[#ff5100] transition"
              >
                {option}
              </button>
            ))}
          </div>
          <ImageRender url={renderState.renderUrl!} />
        </div>
        <button
          className="mt-6 text-sm text-gray-500 underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
