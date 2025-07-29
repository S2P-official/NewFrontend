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
}

export interface CartItem {
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