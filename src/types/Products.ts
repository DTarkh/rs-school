export type Data = {
  products: ProductItem[];
  total: number;
};

export type ProductItem = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};
