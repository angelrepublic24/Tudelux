export type LouverVariant = {
  id: number;
  pricePerInch: number;
  color: string;
  cuts: number;
};

export type GroupedLouver = {
  name: string; // ej: "1x3"
  variants: LouverVariant[];
};

export function mapLouvers(rawLouvers: any[]): GroupedLouver[] {
  const groups: Record<string, GroupedLouver> = {};

  rawLouvers.forEach((item) => {
    const values = item.values || {};
    const name = values[1];
    const pricePerInch = values[2];
    const color = values[3];
    const cuts = values[4];

    if (!name || isNaN(pricePerInch)) return;

    const variant: LouverVariant = {
      id: item.id,
      pricePerInch,
      color,
      cuts,
    };

    if (!groups[name]) {
      groups[name] = {
        name,
        variants: [variant],
      };
    } else {
      groups[name].variants.push(variant);
    }
  });

  return Object.values(groups);
}
