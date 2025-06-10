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
  const { spacingLouver, details, directions } = renderState;

  console.log("🔎 Validating inputs", { spacingLouver, details, directions });

  if (spacingLouver === undefined || spacingLouver === null || isNaN(spacingLouver) || !details || !directions) {
    return null;
  }

  const totalLength = getLengthForLouvers(renderState);
  if (!totalLength || totalLength === 0) return null;

  const louverSizeMatch = details.match(/\d+x\d+/);
  if (!louverSizeMatch) return null;

  const [widthStr, heightStr] = louverSizeMatch[0].split("x");
  const louverWidth = Number(heightStr);
  if (isNaN(louverWidth)) return null;

  const unitSpacing = spacingLouver + louverWidth;
  const quantity = Math.floor(totalLength / unitSpacing);
  const pricePerInch = 0.35;
  const total = quantity * louverWidth * pricePerInch;

  console.log("🧩 Louver Details:", {
    details,
    spacingLouver,
    directions,
    louverWidth,
    quantity,
    totalLength,
  });

  return {
    name: `${details} Louvers`,
    color: "Standard",
    inches: louverWidth,
    quantity,
    pricePerInch,
    total: parseFloat(total.toFixed(2)),
    sourceStep: "Louvers",
  };
}
