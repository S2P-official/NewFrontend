import { Product } from '@/app/types';

const API_URL = 'http://localhost:8080/products';

/**
 * Fetch all products from backend
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, 6);
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.isNew);
}

export async function getSaleProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.isOnSale);
}
