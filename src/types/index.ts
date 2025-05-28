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

export type MaterialItemTable = {
  name: string;
  color: string;
  inches: number;
  quantity: number;
  pricePerInch: number;
  total: number;
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
  costSummary: CostSummary;
  dimensions?: {
    width?: string;
    projection?: string;
  };
  color?: string;
  image?: string;
};

// export type IUser = {
//   id: number,
//   name: string,
//   lName: string,
//   email: string,
//   password: string,
//   roles?: string[]
// }

export interface IUser {
  id: string;
  name: string;
  lName: string;
  email: string;
  password: string;
  roles: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone?: string;
  company?: {
    name: string;
  }
}


export type RegisterFormType = Omit<IUser, 'id' >& {
  password_confirmation: string
}

export type RegisterDistributorFormType = Omit<IUser, 'id'> & {
  password_confirmation: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  roles: ['distributor']; // opcional si ya está fijo desde el backend
};

export type CompanyType = {
  id: number;
  name: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  phone?: string;
  users?: {
    id: string;
    name: string;
    email: string;
  }[];
};


export type ProfileType = Omit<IUser, 'id' | 'password' | 'roles' | 'email'> & {
  phone: string;
  address: {
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip: string;
  };
};

export type LoginFormType = Pick<IUser, 'email' | 'password'>
 export type CompanyFormType = Omit<CompanyType, "id">

export type DistributorAndSeller = Pick<IUser, 'id' | 'name' | 'email' | 'address' | 'company' | 'createdAt' | 'status'>;
