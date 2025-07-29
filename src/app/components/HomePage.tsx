'use client';
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import ProductFilters from '@/app/components/ProductFilters';
import { motion } from 'framer-motion';
import { FilterOptions, Product } from '@/app/types';
import { AuthProvider } from '@/app/context/AuthContext';

function HomePage() {
     const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    priceRange: [0, 500],
    minRating: 0,
    sortBy: 'featured'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // 🔄 Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8080/products'); // ✅ Update if needed
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (product.rating < filters.minRating) return false;
      return true;
    });

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, filters]);
  return (
      <div className="min-h-screen bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From playful toys to essential home appliances - find everything your family needs
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            productsCount={filteredProducts.length}
          />

          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <p className="text-gray-600 font-medium">
                {filteredProducts.length} products found
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All', emoji: '🌟' },
                  { value: 'toys', label: 'Toys', emoji: '🧸' },
                  { value: 'appliances', label: 'Appliances', emoji: '🏠' }
                ].map((category) => (
                  <motion.button
                    key={category.value}
                    onClick={() => setFilters(prev => ({ ...prev, category: category.value }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      filters.category === category.value
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-accent1/20 shadow-md'
                    }`}
                  >
                    {category.emoji} {category.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {filteredProducts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No products found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters to see more results or browse our featured products
                </p>
                <motion.button
                  onClick={() => setFilters({
                    category: 'all',
                    priceRange: [0, 500],
                    minRating: 0,
                    sortBy: 'featured'
                  })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
        </div>
  )
}

export default HomePage
