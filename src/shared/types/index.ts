import { Material } from "@/modules/materials/schemas/materials.schema";

export type BaseProduct = {
  name: string;
  image: string;
  description: string;
  cta?: string;
  about: {
    text: string;
    benefits: string[];
  };
  type?: {
    name: string;
    description: string;
    image: string;
    render: string;
    about: {
      text: string;
      benefits: string[];
    };
  }[];
};

export type ProductWithTypes = BaseProduct & {
  type: {
    name: string;
    description: string;
    image: string;
    render: string;
    about: {
      text: string;
      benefits: string[];
    };
  }[];
};

export type RenderState = {
  title?: string;
  productType?: string;
  renderUrl?: string;
  shape?: string;
  dimensions?: {
    width?: string;
    projection?: string;
    widthInches?: number; // ✅ nuevo campo en in
    projectionInches?: number;

    frontWidth?: string;
    backWidth?: string;
    corners?: string;
    frontWidthInches?: number;
    backWidthInches?: number;
    cornersInches?: number;

    leftProjectionInches?: number;
    rightProjectionInches?: number;
    middleProjectionInches?: number;
    middleWidthInches?: number;
  };
  frontDesign?: string;
  fontTypeDesign?: string;
  profile?: string;
  profileAddedProjection?: number;
  extraF?: string;
  directions?: string;
  details?: string;
  selectedLouverVariant?: {
    id: string;
    color: string;
    pricePerInch: number;
    unitLength: string;
    roofProjection: number;
    cutPrice: number;
  };
  spacingLouver?: number;
  support?: string;
  lighting?: string;
  color?: string;
  cutPrice?: number;

  // Partition Wall
  // 🔽 Nuevos campos para Partition Walls
  selectedSTC?: "36 STC" | "48 STC";
  dimensionWall?: {
    width?: string;
    height?: string;
    widthInc?: string;
    heightIn?: string;
  };
  selectedMaterial?: Material;
  selectedVariant?: {
    color: string;
    unit: string;
    pricePerUnit: number;
    cutPrice?: number;
  };
};

export type PartitionState = {
  stcType?: "36 STC" | "48 STC";
  width?: number; // en ft
  height?: number; // en ft
  widthInches?: number;
  heightInches?: number;
  selectedColor?: string;
  selectedMaterial?: Material;
  selectedVariant?: {
    color: string;
    unit: string;
    pricePerUnit: number;
  };
  addons?: string[];
};

export type RawAddOn = {
  id: number;
  values: {
    1: string;
    2: string;
    3: number;
    4: number;
    5: number;
    [key: number]: any; // para flexibilidad adicional
  };
};

export type ParsedAddOn = {
  name: string;
  color: string;
  pricePerInch: number;
  quantity: number;
  total: number;
  image?: string;
  description?: string;
};

export type ProfileVariant = {
  id: number;
  name: string;
  color: string;
  pricePerInch: number;
  unitLength: number;
  roofProjection: number;
  cutPrice: number;
  addedProjection?: number;
};

export type GroupedProfile = {
  name: string;
  variants: ProfileVariant[];
};

export type MaterialItem = {
  name: string;
  color: string;
  quantity: number;
  totalPrice: number;
  unit?: string;
  pricePerUnit?: number;
};

export type MaterialItemTable = {
  name: string;
  color: string;
  inches: number;
  quantity: number;
  total: number;
  pricePerInch?: number;
  cutPrice?: number;
  sourceStep?: string;
};

export type MaterialQuote = {
  material: string;
  color: string;
  size: number;
  qty: number;
  pricePerInch: number;
  price: number;
  sourceStep?: string;
};

export type CostSummary = {
  materialCost: number;
  cutsCost: number;
  combinedCost: number;
  markup: number;
  pricePlus15Markup: number;
  finalMarkup: number;
  finalTotal: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  materials: MaterialItemTable[];
  costSummary?: CostSummary;
  dimensions?: {
    frontWidth?: string;
    width?: string;
    projection?: string;
  };
  dimensionsWall?: {
    width?: string;
    height?: string;
  };
  color?: string;
  image?: string;

  product?: string; // Ej: 'Canopy'
  productType?: string; // Ej: 'Custom Canopy'
  shape?: string;
  selectedSTC?: string; // ✅ nuevo campo para Partition Walls
};
export interface ConfigState {
  width: string;
  projection: string;
  slot1: string;
  slot2: string;
  fasciaColor: string;
  slot1Color: string;
  slot2Color: string;
  coverColor: string;
  topRoofColor: string;
  louverColor: string;
  spacing: string;
  tilt: string;
  louverType: string;
}

// export type IUser = {
//   id: number,
//   name: string,
//   lName: string,
//   email: string,
//   password: string,
//   roles?: string[]
// }

// export type RegisterDistributorFormType = Omit<IUser, 'id'> & {
//   password_confirmation: string;
//   phone: string;
//   company: string;
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     zip: string;
//   };
//   roles: ['distributor']; // opcional si ya está fijo desde el backend
// };
