import { RenderState, MaterialItemTable } from "@/shared/types";

export function generateMaterialsFromDimensions(renderState: RenderState): MaterialItemTable[] {
  const { dimensions, shape, color, profile } = renderState;
  if (!dimensions) return [];

  const PRICE_PER_INCH = 1.25;
    const cutPrice = renderState.cutPrice ?? 15; // 👈 AQUÍ

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
        cutPrice
      });

    if (dimensions.backWidthInches)
      items.push({
        name: `Width Back Frame ${p}`,
        color: c,
        inches: dimensions.backWidthInches,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.backWidthInches * PRICE_PER_INCH,
        cutPrice

      });

    if (dimensions.frontWidthInches)
      items.push({
        name: `Width Front Frame ${p}`,
        color: c,
        inches: dimensions.frontWidthInches,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.frontWidthInches * PRICE_PER_INCH,
        cutPrice

      });

    if (dimensions.cornersInches)
      items.push({
        name: `Corners ${p}`,
        color: c,
        inches: dimensions.cornersInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.cornersInches * 2 * PRICE_PER_INCH,
        cutPrice
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
        cutPrice
      });

    if (dimensions.projectionInches)
      items.push({
        name: `Projection ${p}`,
        color: c,
        inches: dimensions.projectionInches,
        quantity: 2,
        pricePerInch: PRICE_PER_INCH,
        total: dimensions.projectionInches * 2 * PRICE_PER_INCH,
        cutPrice
      });
  }

  else if (shape === "Left Wall") {
    const fw = dimensions.frontWidthInches || 0;
    const bw = dimensions.backWidthInches || 0;
    const mw = dimensions.middleWidthInches || Math.max(fw - bw, 12);

    const lp = dimensions.leftProjectionInches || 0; // left wall is the longest side
    const rp = dimensions.rightProjectionInches || 0;
    const mp = dimensions.middleProjectionInches || Math.max(lp - rp, 12);

    // Widths
    if (fw)
      items.push({
        name: `Width Front Frame ${p}`,
        color: c,
        inches: fw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: fw * PRICE_PER_INCH,
        cutPrice
      });

    if (bw)
      items.push({
        name: `Width Back Frame ${p}`,
        color: c,
        inches: bw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: bw * PRICE_PER_INCH,
        cutPrice
      });

    items.push({
      name: `Width Middle ${p}`,
      color: c,
      inches: mw,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mw * PRICE_PER_INCH,
      cutPrice
    });

    // Projections
    if (lp)
      items.push({
        name: `Projection Left ${p}`,
        color: c,
        inches: lp,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: lp * PRICE_PER_INCH,
        cutPrice
      });

    if (rp)
      items.push({
        name: `Projection Right ${p}`,
        color: c,
        inches: rp,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: rp * PRICE_PER_INCH,
        cutPrice
      });

    items.push({
      name: `Projection Middle ${p}`,
      color: c,
      inches: mp,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mp * PRICE_PER_INCH,
      cutPrice
    });
  }

  else if (shape === "Right Wall") {
    const fw = dimensions.frontWidthInches || 0;
    const bw = dimensions.backWidthInches || 0;
    const mw = dimensions.middleWidthInches || Math.max(fw - bw, 12);

    const rp = dimensions.rightProjectionInches || 0; // right wall is the longest side
    const lp = dimensions.leftProjectionInches || 0;
    const mp = dimensions.middleProjectionInches || Math.max(rp - lp, 12);

    // Widths
    if (fw)
      items.push({
        name: `Width Front Frame ${p}`,
        color: c,
        inches: fw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: fw * PRICE_PER_INCH,
        cutPrice
      });

    if (bw)
      items.push({
        name: `Width Back Frame ${p}`,
        color: c,
        inches: bw,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: bw * PRICE_PER_INCH,
        cutPrice
      });

    items.push({
      name: `Width Middle ${p}`,
      color: c,
      inches: mw,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mw * PRICE_PER_INCH,
      cutPrice
    });

    // Projections
    if (rp)
      items.push({
        name: `Projection Right ${p}`,
        color: c,
        inches: rp,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: rp * PRICE_PER_INCH,
        cutPrice
      });

    if (lp)
      items.push({
        name: `Projection Left ${p}`,
        color: c,
        inches: lp,
        quantity: 1,
        pricePerInch: PRICE_PER_INCH,
        total: lp * PRICE_PER_INCH,
        cutPrice
      });

    items.push({
      name: `Projection Middle ${p}`,
      color: c,
      inches: mp,
      quantity: 1,
      pricePerInch: PRICE_PER_INCH,
      total: mp * PRICE_PER_INCH,
      cutPrice
    });
  }

  return items.map(item => ({
    ...item,
    total: parseFloat(item.total.toFixed(2)),
  }));
}
