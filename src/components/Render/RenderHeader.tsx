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
      <h2 className="text-lg lg:text-2xl font-bold text-[#ff5100] mb-2">Your {renderState.title}</h2>
      <ul className="text-sm space-y-1">
        {renderState.title && renderState.shape && (
          <li>
            <strong>Product:</strong> {renderState.productType}
            {" - "}
            <strong>Shape:</strong> {renderState.shape}
          </li>
        )}
        {renderState.dimensions?.width && renderState.dimensions?.projection && (
          <li>
            <strong>Width:</strong> {renderState.dimensions.width}
            {" - "}
            <strong>Projection:</strong> {renderState.dimensions.projection}
          </li>
        )}

        {renderState.frontDesign && (
          <li>
            <strong>Front Design:</strong> {renderState.frontDesign}
          </li>
        )}
        {renderState.fontTypeDesign && (
          <li>
            <strong>Type Front Design:</strong> {renderState.fontTypeDesign}
          </li>
        )}
        {renderState.profile && (
          <li>
            <strong>Profile:</strong> {renderState.profile}
          </li>
        )}
        {renderState.extraF && (
          <li>
            <strong>Extra Features:</strong> {renderState.extraF}
          </li>
        )}
        {renderState.directions && (
          <li>
            <strong>{renderState.extraF} directions:</strong> {renderState.directions}
          </li>
        )}
        {renderState.directions && (
          <li>
            <strong>{renderState.extraF} details:</strong> {renderState.details}
          </li>
        )}
        {renderState.spacingLouver && (
          <li>
            <strong>Spacing Between Louvers:</strong> {renderState.spacingLouver}
          </li>
        )}
        {renderState.support && (
          <li>
            <strong>Support:</strong> {renderState.support}
          </li>
        )}
        {renderState.lighting && (
          <li>
            <strong>Lighting:</strong> {renderState.lighting}
          </li>
        )}
        {renderState.color && (
          <li>
            <strong>Color:</strong> {renderState.color}
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
