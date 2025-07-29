'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/app/components/ProductCard';
import ProductFilters from '@/app/components/ProductFilters';
import { getProducts } from '@/app/data/products';
const products = await getProducts();
// import { products } from '@/data/products';
import { FilterOptions } from '@/app/types';


const CategoryPage: React.FC = () => {
  const params = useParams();
  const category = (params?.category as string) || 'all';

  
  const [filters, setFilters] = useState<FilterOptions>({
    category: category === 'toys' || category === 'appliances' ? category : 'all',
    priceRange: [0, 500],
    minRating: 0,
    sortBy: 'featured'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Rating filter
      if (product.rating < filters.minRating) {
        return false;
      }
      
      return true;
    });

    // Sort products
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
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [filters]);

  const categoryInfo = {
    toys: {
      title: 'Kids Toys',
      emoji: '🧸',
      description: 'Educational and fun toys to spark creativity and learning'
    },
    appliances: {
      title: 'Home Appliances', 
      emoji: '🏠',
      description: 'Essential appliances to make your home life easier and more convenient'
    }
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || {
    title: 'All Products',
    emoji: '🌟', 
    description: 'Discover our complete range of products'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="text-6xl mb-4">{currentCategory.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            productsCount={filteredProducts.length}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <p className="text-gray-600 font-medium">
                {filteredProducts.length} products found in {currentCategory.title.toLowerCase()}
              </p>
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
                  Try adjusting your filters or browse our other categories
                </p>
                <motion.button
                  onClick={() => setFilters({
                    category: filters.category,
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
  );
};

export default CategoryPage;