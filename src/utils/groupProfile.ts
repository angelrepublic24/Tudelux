import { GroupedProfile, ProfileVariant } from "@/types";

export function groupProfilesByName(items: any[]): GroupedProfile[] {
  const groups: Record<string, GroupedProfile> = {};

  for (const item of items) {
    const name = item.values[1]; // name (ej: 6" fascia)
    const variant: ProfileVariant = {
      id: item.id,
      name,
      color: item.values[3],
      pricePerInch: item.values[4],
      unitLength: item.values[5],
      roofProjection: parseFloat(item.values[6]),
      cutPrice: item.values[7]
    };

    if (!groups[name]) {
      groups[name] = {
        name,
        variants: [variant],
      };
    } else {
      groups[name].variants.push(variant);
    }
  }

  return Object.values(groups);
}
