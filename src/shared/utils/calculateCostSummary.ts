import { CostSummary, MaterialItemTable } from "@/shared/types";

export const calculateCostSummary = (
  materials: MaterialItemTable[],
  fixedFinalMarkup = 0
): CostSummary => {
  const materialCost = materials.reduce((acc, item) => acc + item.total, 0);

  const cutsCost = materials.reduce((acc, item) => {
    const qty = item.quantity ?? 1;
    const cutPrice = item.cutPrice ?? 0;
    return acc + 2 * qty * cutPrice;
  }, 0); // ✅ total de cortes sin mostrar en tabla

  const combinedCost = materialCost + cutsCost;
  const markup = combinedCost * 0.15;
  const pricePlus15Markup = combinedCost + markup;
  const finalTotal = pricePlus15Markup + fixedFinalMarkup;

  return {
    materialCost,
    cutsCost,
    combinedCost,
    markup,
    pricePlus15Markup,
    finalMarkup: fixedFinalMarkup,
    finalTotal,
  };
};
