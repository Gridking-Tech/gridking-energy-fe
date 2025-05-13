export type categoryType = {
  name: string;
}

export interface IProduct {
  name: string;
  id: string;
  primaryImage: { url: string };
  category: categoryType;
}
