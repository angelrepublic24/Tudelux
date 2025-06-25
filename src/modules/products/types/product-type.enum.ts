// enums/product-type.enum.ts
export enum ProductTypeEnum {
  PARTITION_WALL = 'Partition Wall',
  CANOPY = 'Canopy',
  PERGOLA = 'Pergola',
}

// types/product-type.type.ts
export type ProductType = {
  label: string;
  value: ProductTypeEnum;
};
