// utils/handleAddOnSelection.ts
import { MaterialItemTable, RawAddOn, RenderState } from "@/types";

export function getAddOnMaterials(
  addOn: RawAddOn,
  selectedButtons: string[],
  renderState: RenderState
): MaterialItemTable[] {
  const name = addOn.values[1];
  const color = addOn.values[2];
  const pricePerInch = parseFloat(String(addOn.values[3]));

  const shape = renderState.shape;
  const width = renderState.dimensions?.widthInches || 0;
  const projection = renderState.dimensions?.projectionInches || 0;
  const corners = renderState.dimensions?.cornersInches || 0;
  const front = renderState.dimensions?.frontWidthInches || 0;

  const leftP = renderState.dimensions?.leftProjectionInches || 0;
  const rightP = renderState.dimensions?.rightProjectionInches || 0;
  const middleP = renderState.dimensions?.middleProjectionInches || 0;
  const frontW = renderState.dimensions?.frontWidthInches || 0;
  const backW = renderState.dimensions?.backWidthInches || 0;
  const middleW =
    renderState.dimensions?.middleWidthInches || Math.max(frontW - backW, 12);

  const newMaterials: MaterialItemTable[] = [];

  selectedButtons.forEach((btn) => {
    if (shape === "Rectangular") {
      newMaterials.push({
        name: `${name} - ${btn} Width`,
        color,
        inches: width,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * width).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Projection`,
        color,
        inches: projection,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * projection * 2).toFixed(2)),
      });
    } else if (shape === "Front Hex") {
      newMaterials.push({
        name: `${name} - ${btn} Projection`,
        color,
        inches: projection,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * projection * 2).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Corner`,
        color,
        inches: corners,
        quantity: 2,
        pricePerInch,
        total: parseFloat((pricePerInch * corners * 2).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Front`,
        color,
        inches: front,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * front).toFixed(2)),
      });
    } else if (shape === "Left Wall" || shape === "Right Wall") {
      newMaterials.push({
        name: `${name} - ${btn} Projection Left`,
        color,
        inches: leftP,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * leftP).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Projection Right`,
        color,
        inches: rightP,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * rightP).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Projection Middle`,
        color,
        inches: middleP,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * middleP).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Width Front`,
        color,
        inches: frontW,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * frontW).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Width Middle`,
        color,
        inches: middleW,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * middleW).toFixed(2)),
      });

      newMaterials.push({
        name: `${name} - ${btn} Width Back`,
        color,
        inches: backW,
        quantity: 1,
        pricePerInch,
        total: parseFloat((pricePerInch * backW).toFixed(2)),
      });
    }
  });

  return newMaterials;
}
