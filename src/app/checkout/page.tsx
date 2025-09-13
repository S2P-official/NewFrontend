"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  CreditCard,
  Truck,
  Shield,
  Check,
  ArrowLeft,
  MapPin,
  Plus,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddressSection from "./address/page";
import {
  User,
  Order,
  Address,
  fetchUser,
  fetchOrders,
  fetchAddresses,
} from "../lib/userprofileapi";
import { button } from "framer-motion/client";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  paymentMethod: "card" | "paypal" | "cod";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}


const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const paymentMethod = watch("paymentMethod", "card");

  useEffect(() => {
    // if (loading) return;
    if (!user) {
      router.push("/signin");
      return;
    }
    
    setLoading(true);
    setError(null);

    setValue("email", user.email || "");
    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");

    const loadProfile = async () => {
      try {
        const [fetchedUser, fetchedOrders, fetchedAddresses] =
          await Promise.all([
            fetchUser(user.id),
            fetchOrders(user.id),
            fetchAddresses(user.id),
          ]);

        console.log("Fetched addresses:", fetchedAddresses);

        setProfileUser(fetchedUser);
        setOrders(fetchedOrders);
        setAddresses(fetchedAddresses);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, router, setValue, logout]);

 const onSubmit = async (data: CheckoutForm) => {
  setIsSubmitting(true);

  try {
    const fullName = `${data.firstName} ${data.lastName}`;

    const payload = {
      customerId: user?.id,
      customerName: fullName,
      email: data.email,
      orderDate: new Date().toISOString().split("T")[0],
      totalAmount: totalPrice,
      addressId: selectedAddressId || null,
      items: items.map((item) => ({
        productName: item.product.name,
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    console.log("Final Payload:", payload);

    const response = await fetch("https://fictilecore.com/order/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    setOrderPlaced(true);
    clearCart();
    reset();

    // ✅ Show alert and redirect
    alert("Order placed successfully!");
    window.location.href = "/"; // Redirect to home page

  } catch (error) {
    console.error("Error placing order:", error);
  } finally {
    setIsSubmitting(false);
  }
};


 

  // function setSelectedAddressId(id: any): void {
  //   throw new Error('Function not implemented.');
  // }
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/cart"
            className="inline-flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors mb-4"
          >
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
                      {...register("email", { required: "Email is required" })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
            <section>
  {/* Address List */}
  <ul className="space-y-3">
    {addresses.map((addr) => (
      <li
        key={addr.id}
        onClick={() => setSelectedAddressId(addr.id)}
        className={`flex items-center p-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
          selectedAddressId === addr.id
            ? "bg-blue-50 border-blue-500 ring-2 ring-blue-300"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        {/* Radio Button */}
        <input
          type="radio"
          name="selectedAddress"
          checked={selectedAddressId === addr.id}
          onChange={() => setSelectedAddressId(addr.id)}
          onClick={(e) => e.stopPropagation()} // stop li click when clicking radio
          className="mr-4 transform scale-150 cursor-pointer accent-blue-600"
        />

        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4">
          <MapPin size={20} />
        </div>

        {/* Address Info */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold capitalize text-gray-800">
              {addr.name}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                addr.addressType?.toLowerCase() === "home"
                  ? "bg-green-100 text-green-700"
                  : addr.addressType?.toLowerCase() === "work"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {addr.addressType || "Other"}
            </span>
          </div>

          <div className="text-sm text-gray-600 leading-snug mt-1">
            {addr.phone}
            {addr.alternatePhone && ` / ${addr.alternatePhone}`} <br />
            {addr.street}, {addr.locality ? addr.locality + ", " : ""}
            {addr.city}, {addr.state} – {addr.pincode}, {addr.country || "India"}
            {addr.landmark && ` (Landmark: ${addr.landmark})`}
          </div>
        </div>
      </li>
    ))}
  </ul>

  {/* Add New Address Button */}
  <div className="mt-4">
    <button
      onClick={() => router.push("/checkout/address")}
      className="w-fit pl-3 pr-3 bg-primary text-white py-1 rounded-full font-bold text-l hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      + Add New Address
    </button>
  </div>
</section>


              {/* <motion.div 
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
              </motion.div> */}

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
                  {/* Card */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      {...register("paymentMethod")}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>

                  {/* PayPal */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="paypal"
                      {...register("paymentMethod")}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      P
                    </div>
                    <span className="font-medium">PayPal</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      value="cod"
                      {...register("paymentMethod")}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <div className="w-5 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                      ₹
                    </div>
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>

                {/* Card Details Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        {...register("cardNumber", {
                          required: "Card number is required",
                        })}
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
                          {...register("expiryDate", {
                            required: "Expiry date is required",
                          })}
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
                          {...register("cvv", { required: "CVV is required" })}
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
                        {...register("cardName", {
                          required: "Name on card is required",
                        })}
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
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-3"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Qty: {item.quantity}
                        </p>
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
                    <span className="font-bold">
                      ₹{(totalPrice * 0.08).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">
                        Total
                      </span>
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
                  {isSubmitting ? "Processing..." : "Place Order"}
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
