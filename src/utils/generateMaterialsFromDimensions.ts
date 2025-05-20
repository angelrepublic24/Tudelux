import { RenderState, MaterialItemTable } from "@/types";

export function generateMaterialsFromDimensions(renderState: RenderState): MaterialItemTable[] {
  const { dimensions, shape, color, profile } = renderState;
  if (!dimensions) return [];

  const PRICE_PER_INCH = 1.25;
  const c = color || "Standard";
  const p = profile?.trim() || "";

  const items: MaterialItemTable[] = [];

  if (shape === "Front Hex") {
    if (dimensions.projectionInches)
      items.push({
        name: `Projection ${p}`,
        color: c,
        inches: dimensions.projectionInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.projectionInches * PRICE_PER_INCH,
      });

    if (dimensions.backWidthInches)
      items.push({
        name: `Width Back Frame ${p}`,
        color: c,
        inches: dimensions.backWidthInches,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.backWidthInches * PRICE_PER_INCH,
      });

    if (dimensions.frontWidthInches)
      items.push({
        name: `Width Front Frame ${p}`,
        color: c,
        inches: dimensions.frontWidthInches,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.frontWidthInches * PRICE_PER_INCH,
      });

    if (dimensions.cornersInches)
      items.push({
        name: `Corners ${p}`,
        color: c,
        inches: dimensions.cornersInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.cornersInches * 2 * PRICE_PER_INCH,
      });
  }

  else if (shape === "Rectangular") {
    if (dimensions.widthInches)
      items.push({
        name: `Width ${p}`,
        color: c,
        inches: dimensions.widthInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.widthInches * 2 * PRICE_PER_INCH,
      });

    if (dimensions.projectionInches)
      items.push({
        name: `Projection ${p}`,
        color: c,
        inches: dimensions.projectionInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.projectionInches * 2 * PRICE_PER_INCH,
      });
  }

  else if (shape === "Left Wall" || shape === "Right Wall") {
    const fw = dimensions.frontWidthInches || 0;
    const bw = dimensions.backWidthInches || 0;
    const mw = dimensions.middleWidthInches || Math.max(fw - bw, 12);

    const leftP = dimensions.leftProjectionInches || 0;
    const rightP = dimensions.rightProjectionInches || 0;
    const mp = dimensions.middleProjectionInches || Math.max(dimensions.projectionInches! - leftP - rightP, 12);

    // Widths
    if (fw)
      items.push({
        name: `Width Front Frame ${p}`,
        color: c,
        inches: fw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: fw * PRICE_PER_INCH,
      });

    if (bw)
      items.push({
        name: `Width Back Frame ${p}`,
        color: c,
        inches: bw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: bw * PRICE_PER_INCH,
      });

    items.push({
      name: `Width Middle ${p}`,
      color: c,
      inches: mw,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mw * PRICE_PER_INCH,
    });

    // Projections
    if (leftP)
      items.push({
        name: `Projection Left ${p}`,
        color: c,
        inches: leftP,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: leftP * PRICE_PER_INCH,
      });

    if (rightP)
      items.push({
        name: `Projection Right ${p}`,
        color: c,
        inches: rightP,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: rightP * PRICE_PER_INCH,
      });

    items.push({
      name: `Projection Middle ${p}`,
      color: c,
      inches: mp,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mp * PRICE_PER_INCH,
    });
  }

  return items.map(item => ({
    ...item,
    total: parseFloat(item.total.toFixed(2)),
  }));
}
