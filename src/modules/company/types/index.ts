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




export type CompanyFormType = Omit<CompanyType, 'id' | 'users'>;