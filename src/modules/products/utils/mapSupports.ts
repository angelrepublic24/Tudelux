export type SupportItem = {
  id: number;
  name: string;
  price: number;
};

// utils/mapSupports.ts
export function mapSupports(rawSupports: any[]): SupportItem[] {
  return rawSupports.map((item) => {
    const values = item.values || {};
    return {
      id: item.id,
      name: values[1], // NAME
      price: Number(values[2]), // PRICE
    };
  }).filter(s => !!s.name && !isNaN(s.price));
}