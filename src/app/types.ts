export interface User {
  username: string;
  role: 'admin' | 'user';
}


export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'toys' | 'appliances';
  subcategory: string;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isOnSale?: boolean;
  colors?: string[];
  features?: string[];


    ageGroup:number;
    facebook:string;
    amazon:string;
    meesho:string;
    youtube:string;
    mrp:number;
    tax:number;
    aboutItem1:string;
    aboutItem2:string;
    aboutItem3:string;
    aboutItem4:string;
    aboutItem5:string;
    brand:string;
    toyFigureType:string;
    characteroftoy:string;
    modelName:string;
    modelNumber:string;
    manufacturer:string;
    theme:string;
    colour:string;
    occasion:string;
    material:string;
    additionalFeatures:string;
    status:string;
    areBatteriesRequired:string

}
export interface CartItem {
  id: string; // or number, depending on your backend
  name: string;
  price: number;
  product: Product;
  quantity: number;
  selectedColor?: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: string;
}