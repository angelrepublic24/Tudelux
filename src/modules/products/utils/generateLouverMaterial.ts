import { RenderState, MaterialItemTable } from "@/shared/types";

export function getLengthForLouvers(renderState: RenderState): number {
  const { dimensions, shape, directions } = renderState;
  if (!dimensions || !directions) return 0;

  const isWidth = directions === "Width";

  switch (shape) {
    case "Rectangular":
    case "Front Hex":
      return isWidth ? dimensions.widthInches ?? 0 : dimensions.projectionInches ?? 0;
    case "Left Wall":
      return isWidth ? dimensions.frontWidthInches ?? 0 : dimensions.leftProjectionInches ?? 0;
    case "Right Wall":
      return isWidth ? dimensions.backWidthInches ?? 0 : dimensions.rightProjectionInches ?? 0;
    case "U Shape":
      return isWidth ? dimensions.middleWidthInches ?? 0 : dimensions.middleProjectionInches ?? 0;
    default:
      return 0;
  }
}

export function generateLouversMaterial(renderState: RenderState): MaterialItemTable | null {
  const {
    spacingLouver,
    details,
    directions,
    profileAddedProjection,
    selectedLouverVariant,
  } = renderState;

  if (
    spacingLouver === undefined || isNaN(spacingLouver) ||
    !details || !directions || !selectedLouverVariant ||
    profileAddedProjection === undefined || isNaN(profileAddedProjection)
  ) {
    return null;
  }

  let totalLength = getLengthForLouvers(renderState);
  if (!totalLength || totalLength === 0) return null;

  // 🟠 Fórmulas base
  const usableInches = totalLength - 2 * profileAddedProjection;
  const quantity = Math.ceil(usableInches / spacingLouver);
  const pricePerInch = selectedLouverVariant.pricePerInch;
  const total = usableInches * quantity * pricePerInch;

  // 🟡 Cálculo de cortes
  const cuts = selectedLouverVariant.cutPrice * 2 * quantity;
  const cutCost = cuts * selectedLouverVariant.cutPrice;

  const louverSizeMatch = details.match(/\d+x\d+/);
  if (!louverSizeMatch) return null;

  const [_, heightStr] = louverSizeMatch[0].split("x");
  const louverWidth = Number(heightStr);
  if (isNaN(louverWidth)) return null;

  return {
    name: `Louver ${details}`,
    color: selectedLouverVariant.color,
    inches: Math.round(usableInches),
    quantity,
    pricePerInch,
    total: parseFloat(total.toFixed(2)),
    cutPrice: parseFloat(cutCost.toFixed(2)), // ✅ lo agregas al resumen de cortes
    sourceStep: "Louvers",
  };
}



