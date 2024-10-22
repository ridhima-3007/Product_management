export interface ProductForm {
    name: string;
    category: string;
    subcategory: string;
    description: string;
    price: Number;
    discount: string;
    quantity: string;
    coverImage: string;
    images: string[];
}

export interface Product {
    name: string;
    category: string;
    subcategory: string;
    description: string;
    price: Number;
    discount: string;
    quantity: string;
    coverImage: string;
    images: string[];
    _id: string,
    createdBy: string,
    seller: string,
    isActive: boolean,
}