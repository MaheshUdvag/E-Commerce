export interface IAddress {
  _id: string;
  firstName?: string;
  lastName: string;
  street1: string;
  street2?: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  addressType: string;
  isPrimary: string;
  phone: string;
}

export interface IUser {
  _id: string;
  loginId: string;
  name: string;
  email: string;
  store: string;
  address?: IAddress[];
}
