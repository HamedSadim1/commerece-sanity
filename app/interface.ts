export interface IProducts {
  _id: string;
  imageUrl: string;
  price: number;
  slug: string;
  categoryName: string;
  name: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  slug: string;
  description: string;
  image: any[];
  categoryName: string;
}
