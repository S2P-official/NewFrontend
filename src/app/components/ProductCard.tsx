'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/app/types";
import { useCart } from "@/app/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={selectedImage}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-16 left-3 flex space-x-1">
              {product.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImage(img);
                  }}
                  className="w-6 h-6 rounded border border-gray-200 overflow-hidden"
                >
                  <Image src={img} alt={`thumb-${i}`} width={24} height={24} />
                </button>
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.isNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-accent2 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                NEW
              </motion.span>
            )}
            {product.isOnSale && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                SALE
              </motion.span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleToggleWishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted ? "fill-primary text-primary" : "text-gray-600"
              }`}
            />
          </motion.button>

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-2 rounded-full font-medium hover:bg-white transition-all flex items-center justify-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                setQuickViewOpen(true);
              }}
            >
              <Eye className="h-4 w-4" />
              <span>Quick View</span>
            </button>
          </motion.div>
        </div>

        <div className="p-5">
          <div className="mb-3">
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
              {product.subcategory}
            </span>
          </div>

          <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors text-lg">
            {product.name}
          </h3>

          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent1 text-accent1"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2 font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent2 rounded-full"></div>
              <span className="text-xs text-gray-600 font-medium">
                {product.stockCount} left
              </span>
            </div>
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <div className="flex space-x-2">
                {product.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 border-gray-200 ${
                      color === "Black"
                        ? "bg-black"
                        : color === "White"
                        ? "bg-white"
                        : color === "Red"
                        ? "bg-red-500"
                        : color === "Blue"
                        ? "bg-blue-500"
                        : color === "Green"
                        ? "bg-green-500"
                        : color === "Pink"
                        ? "bg-pink-500"
                        : "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
                    }`}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-gray-500 flex items-center">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5">
        <motion.button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
