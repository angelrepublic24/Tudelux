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
  };
  frontDesign?: string;
  fontTypeDesign?: string
  profile?:string;
  extraF?: string;
  directions?: string;
  details?: string;
  spacingLouver?: number;
  support?: string;
  lighting?: string;
  color?: string;
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
  cuts: number;
};

export type GroupedProfile = {
  name: string;
  variants: ProfileVariant[];
};

export type MaterialItem = {
  name: string;
  color: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
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
  materials: MaterialItem[];
  costSummary: CostSummary;
  dimensions?: {
    width?: string;
    projection?: string;
  };
  color?: string;
  image?: string;
};