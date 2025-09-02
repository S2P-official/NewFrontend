import { Product } from '@/app/types';

const API_URL = 'http://localhost:8080/products';

/**
 * Fetch all products from backend
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get first 6 featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 6);
}

/**
 * Get products marked as new
 */
export async function getNewProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.isNew === true);
}

/**
 * Get products that are on sale
 */
export async function getSaleProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.isOnSale === true);
}
