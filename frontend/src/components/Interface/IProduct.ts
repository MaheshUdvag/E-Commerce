export interface IProduct {
  items: IProduct[];
  _id: string;
  name: string;
  sku: string;
  buyable: 1;
  type: string;
  created: Date;
  lastUpdate: Date;
  description: IProductDescription[];
  price: IProductPrice;
  __v: number;
  path: string;
  attributes: IAttributes[];
  attachments: IAttachments[];
}

export interface IProductDescription {
  _id: string;
  shortDescription: string;
  longDescription: string;
  thumbnailImage: string;
  fullImage: string;
  language: ILanguage;
}

export interface IProductPrice {
  _id: string;
  listPrice: number;
  offerPrice: number;
  currency: string;
}

export interface IAttachments {
  _id: string;
  url: string;
  attachmentType: string;
  sequence: number;
}

export interface IAttributes {
  _id: string;
  name: string;
  value: string;
  type: string;
  sequence: number;
}

export interface ILanguage {
  _id: string;
  languageId: number;
  name: string;
  description: string;
  __v: number;
}
