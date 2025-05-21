export type categoryType = {
  name: string;
}

export interface IProduct {
  loading: boolean;
  name: string;
  id: string;
  category: categoryType;
  status:string;
  hotSell: boolean;
  _id:string;
  slug:string;
  primaryImage: {
    publicId:string;
    url:string;
  };
  updatedAt?:string;
  attributes:  any[];
  images: string[]
}
