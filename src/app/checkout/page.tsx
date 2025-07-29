'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CreditCard, Truck, Shield, Check, ArrowLeft, MapPin } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { Address } from '@/app/types';
import Link from 'next/link';
import Image from 'next/image';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>();
  const paymentMethod = watch('paymentMethod', 'card');

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <Link href="/">
            <button className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white rounded-3xl shadow-xl p-12"
          >
            <div className="w-24 h-24 bg-accent2 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
            <div className="space-y-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 transition-all"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/cart" className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Cart</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Checkout
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span>Contact Information</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-xl p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-accent2" />
                  <span>Shipping Address</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      {...register('address.street', { required: 'Street address is required' })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...register('address.city', { required: 'City is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        {...register('address.state', { required: 'State is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        {...register('address.zipCode', { required: 'ZIP code is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        {...register('address.country', { required: 'Country is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl p-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Payment Method</span>
                </h2>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="paypal"
                      {...register('paymentMethod')}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">P</div>
                    <span className="font-medium">PayPal</span>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        {...register('cardNumber', { required: 'Card number is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          {...register('expiryDate', { required: 'Expiry date is required' })}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          {...register('cvv', { required: 'CVV is required' })}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        {...register('cardName', { required: 'Name on card is required' })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}
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
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">{item.product.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6 border-t pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-accent2">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-bold">₹{(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{(totalPrice + totalPrice * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </motion.button>

                {/* Security Info */}
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-accent2" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;