'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const WishlistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white"> {/* Changed from bg-background to bg-white */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Save your favorite items to your wishlist so you can easily find them later!
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Start shopping"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg inline-flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Start Shopping</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;
