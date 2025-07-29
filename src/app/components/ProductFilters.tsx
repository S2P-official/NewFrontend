'use client';

import React from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterOptions } from '@/app/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  productsCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle,
  productsCount
}) => {
  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      priceRange: [0, 500],
      minRating: 0,
      sortBy: 'featured'
    });
  };

  return (
    <div className="lg:w-80">
      {/* Mobile Filter Toggle */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="lg:hidden w-full bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-md"
      >
        <span className="flex items-center space-x-2">
          <SlidersHorizontal className="h-5 w-5 text-secondary" />
          <span className="font-bold text-gray-800">Filters</span>
          <span className="text-sm text-gray-500">({productsCount} products)</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-5 w-5 text-gray-600" /> : <Filter className="h-5 w-5 text-gray-600" />}
        </motion.div>
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 1 : 0, 
            height: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'auto' : 0 
          }}
          exit={{ opacity: 0, height: 0 }}
          className={`bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden ₹{
            isOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Filter className="h-5 w-5 text-secondary" />
                <span>Filters</span>
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-secondary hover:text-secondary/80 transition-colors font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Category</h4>
              <div className="space-y-3">
                {[
                  { value: 'all', label: 'All Products', emoji: '🌟' },
                  { value: 'toys', label: 'Kids Toys', emoji: '🧸' },
                  { value: 'appliances', label: 'Home Appliances', emoji: '🏠' }
                ].map((category) => (
                  <motion.label 
                    key={category.value} 
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={filters.category === category.value}
                      onChange={() => handleCategoryChange(category.value)}
                      className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded-full"
                    />
                    <span className="ml-3 text-gray-700 font-medium group-hover:text-primary transition-colors">
                      {category.emoji} {category.label}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Price Range</h4>
              <div className="space-y-3">
                {[
                  [0, 50, '₹0 - ₹50', '💰'],
                  [50, 100, '₹50 - ₹100', '💵'],
                  [100, 200, '₹100 - ₹200', '💳'],
                  [200, 500, '₹200+', '💎']
                ].map(([min, max, label, emoji]) => (
                  <motion.label 
                    key={`₹{min}-₹{max}`} 
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                <input
  type="radio"
  name="priceRange"
  checked={filters.priceRange[0] === Number(min) && filters.priceRange[1] === Number(max)}
  onChange={() => handlePriceRangeChange(Number(min), Number(max))}
  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded-full"
/>

                    <span className="ml-3 text-gray-700 font-medium group-hover:text-primary transition-colors">
                      {emoji} {label}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Minimum Rating</h4>
              <div className="space-y-3">
                {[4, 3, 2, 1, 0].map((rating) => (
                  <motion.label 
                    key={rating} 
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded-full"
                    />
                    <span className="ml-3 text-gray-700 font-medium group-hover:text-primary transition-colors">
                      {rating === 0 ? '⭐ Any Rating' : `₹{'⭐'.repeat(rating)}+ Stars`}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-lg">Sort By</h4>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-medium"
              >
                <option value="featured">🌟 Featured</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="newest">🆕 Newest First</option>
              </select>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;