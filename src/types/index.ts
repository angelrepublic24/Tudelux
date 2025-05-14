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
  frontDesign?: string
  // Puedes ir agregando más: profile, color, etc.
};
