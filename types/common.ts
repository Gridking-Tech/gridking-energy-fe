export type CartItem = {
    productName: string;
    productId: string;
    quantity: number;
    productImage?: string;
  };
  
  export interface Product {
    productId: string;
    name: string;
    slug: string;
    imageUrl?: string;
    quantity: number;
  }