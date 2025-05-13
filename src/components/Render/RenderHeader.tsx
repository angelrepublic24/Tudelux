"use client"
import { RenderState } from "@/types";
import { ImageRender } from "./3dRender";

type Props = {
  renderState: RenderState;
  onToggle: () => void;
};

export const RenderHeader = ({ renderState }: Props) => (
  <div className="sticky top-0 z-40 bg-white p-4 shadow-md flex items-center justify-center w-full h-[30vh] overflow-hidden gap-10">
    <div className="">
      <h2 className="text-lg lg:text-2xl font-bold text-[#ff5100] mb-2">Your Selection</h2>
      <ul className="text-sm space-y-1">
        {renderState.title && (
          <li>
            <strong>Product:</strong> {renderState.title}
          </li>
        )}
        {renderState.shape && (
          <li>
            <strong>Shape:</strong> {renderState.shape}
          </li>
        )}
        {renderState.dimensions?.width && (
          <li>
            <strong>Width:</strong> {renderState.dimensions.width}
          </li>
        )}
        {renderState.dimensions?.projection && (
          <li>
            <strong>Projection:</strong> {renderState.dimensions.projection}
          </li>
        )}
        {renderState.frontDesign && (
          <li>
            <strong>Front Design:</strong> {renderState.frontDesign}
          </li>
        )}
      </ul>
    </div>

    {renderState.renderUrl && (
      <div className="w-1/2 lg:w-1/3 p-4  rounded overflow-hidden border border-gray-100">
        <ImageRender url={renderState.renderUrl} />
      </div>
    )}
  </div>
);
