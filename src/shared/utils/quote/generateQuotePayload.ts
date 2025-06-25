import {
  CreateQuotePayload,
  QuoteClientInfoPayload,
} from "@/modules/quotes/schema/quote.schema";
import { CartItem } from "@/shared/types";
import { uniq } from "lodash";

export function generateQuotePayload(
  formData: QuoteClientInfoPayload,
  items: CartItem[]
) {
  const itemsToSend: CreateQuotePayload[] = items.map((item) => {
    const isPartitionWall = item.product === "Partition Walls";
    const isCanopy = item.product === "Architectural Canopy";

    let dimensions: Record<string, number> = {};

    if (isCanopy) {
      item.materials?.forEach((m) => {
        const name = m.name.toLowerCase();
        if (name.includes("front") && name.includes("width"))
          dimensions.frontWidth = m.inches;
        else if (name.includes("back") && name.includes("width"))
          dimensions.backWidth = m.inches;
        else if (name.includes("middle") && name.includes("width"))
          dimensions.middleWidth = m.inches;
        else if (name.includes("left") && name.includes("projection"))
          dimensions.leftProjection = m.inches;
        else if (name.includes("right") && name.includes("projection"))
          dimensions.rightProjection = m.inches;
        else if (name.includes("middle") && name.includes("projection"))
          dimensions.middleProjection = m.inches;
        else if (
          name.includes("fascia") &&
          name.includes("width") &&
          !dimensions.width
        )
          dimensions.width = m.inches;
        else if (
          name.includes("fascia") &&
          name.includes("projection") &&
          !dimensions.projection
        )
          dimensions.projection = m.inches;
      });
    }

    if (isPartitionWall && item.dimensionsWall) {
      dimensions.width = Number(item.dimensionsWall.width);
      dimensions.height = Number(item.dimensionsWall.height);
    }

    const validAddOns = [
      "Crown",
      "Tube",
      "Channel",
      '1" In',
      '1" Out',
      '3" Extender',
    ];

    const derivedAddOns = uniq(
      item.materials
        ?.filter((m) =>
          validAddOns.some((addon) =>
            m.name.toLowerCase().includes(addon.toLowerCase())
          )
        )
        .map((m) =>
          validAddOns.find((addon) =>
            m.name.toLowerCase().includes(addon.toLowerCase())
          )
        )
        .filter(Boolean)
    );

    return {
      product: item.product,
      product_type: isPartitionWall
        ? item.selectedSTC
        : item.productType || "Custom Type",
      shape: item.shape || "",
      addOns: derivedAddOns as string[],
      dimensions,
      materials:
        item.materials?.map((m) => ({
          material: m.name,
          color: m.color,
          size: `${m.inches} in`,
          qty: m.quantity,
          price: m.total,
        })) || [],
      materialCost: item.costSummary?.materialCost || 0,
      cutCost: item.costSummary?.cutsCost || 0,
      markup: item.costSummary?.finalMarkup || 0,
      subtotal: item.costSummary?.pricePlus15Markup || 0,
      total: item.price,
      color: isPartitionWall ? item.color : undefined,
      quantity: item.quantity ?? 1,
      additionalInfo: {},
    };
  });

  const payload = {
    customerName: formData.customerName,
    customerLastName: formData.customerLastName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    address_street: formData.address_street,
    address_city: formData.address_city,
    address_state: formData.address_state,
    address_zip: formData.address_zip,
    total: itemsToSend.reduce((acc, item) => acc + item.total, 0),
    items: itemsToSend,
  };

  return payload;
}
