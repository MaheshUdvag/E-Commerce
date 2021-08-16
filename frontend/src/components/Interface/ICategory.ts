import { IProduct } from "./IProduct";

export interface ICategory {
  products: IProduct[];
  subCategories: ICategory[];
  _id: string;
  name: string;
  store: string;
  description: ICategoryDescription[];
  __v: Number;
  path: string;
}

export interface ICategoryDescription {
  _id: string;
  description: string;
  language: string;
  categoryImage: string;
}
