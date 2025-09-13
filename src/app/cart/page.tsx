'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { coupons } from '@/app/data/coupons';

type Coupon = {
  code: string;
  type: 'percentage' | 'fixed';
  discount: number;
  minOrder?: number;
};

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (coupon.minOrder && totalPrice < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponError('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const discount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? (totalPrice * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;

  const finalTotal = Math.max(0, totalPrice - discount);

  // Build full image URL helper
  const buildImageURL = (path: string) =>
    path.startsWith('/') ? `https://fictilecore.com${path}` : path;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up.
            </p>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Shopping Cart ({totalItems} items)
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Cart Items</h2>
              <div className="space-y-6">
                <AnimatePresence>
                  {items.map(item => {
                    const { product, quantity, selectedColor } = item;
                    if (!product) return null;

                    // Build image array
                    const imagesArray = product.imagePaths
                      ? Array.isArray(product.imagePaths)
                        ? product.imagePaths
                        : String(product.imagePaths)
                            .split(',')
                            .map(img => img.trim())
                      : [];

                    const imageUrl = imagesArray[0] ? buildImageURL(imagesArray[0]) : '/placeholder.png';

                    return (
                      <motion.div
                        key={`${product.id}-${selectedColor || 'default'}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {selectedColor && `Color: ${selectedColor}`}
                          </p>
                          <p className="text-lg font-bold text-primary">₹{product.price}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                            <motion.button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <span className="px-4 py-2 font-bold">{quantity}</span>
                            <motion.button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <motion.button
                            onClick={() => removeFromCart(product.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag className="h-5 w-5 text-accent1" />
                  <span className="font-bold text-gray-800">Coupon Code</span>
                </div>
                {!appliedCoupon ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                    <motion.button
                      onClick={applyCoupon}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-accent1 text-gray-800 py-2 rounded-xl font-bold hover:bg-accent1/90 transition-all"
                    >
                      Apply Coupon
                    </motion.button>
                    {couponError && (
                      <p className="text-red-500 text-sm">{couponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-accent2/10 border border-accent2 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-accent2">
                        {appliedCoupon.code} Applied!
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {appliedCoupon.type === 'percentage'
                        ? `${appliedCoupon.discount}% discount`
                        : `₹${appliedCoupon.discount} off`}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-accent2">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-accent2">FREE</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  🔒 Secure checkout with 256-bit SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
