export interface ProductForm {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  coverImage: string;
  images: string[];
}

export interface Product {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  coverImage: string;
  images: string[];
  _id: string;
  createdBy: string;
  seller: string;
  isActive: boolean;
  discountedPrice:number
}

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Response {
  msg: string;
}

export interface CustomError {
  error?: {
    msg?: string;
  };
}
