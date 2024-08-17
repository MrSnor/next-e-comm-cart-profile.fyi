export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface Discount {
  code: string;
  discountType: string;
  discount: number;
}
