"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react"; 

import { useRouter } from "next/navigation";
import {
  User,
  Order,
  Address,
  fetchUser,
  fetchOrders,
  fetchAddresses,
} from "../lib/userprofileapi";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!user?.id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [fetchedUser, fetchedOrders, fetchedAddresses] =
        await Promise.all([
          fetchUser(user.id),
          fetchOrders(user.id),
          fetchAddresses(user.id),
        ]);

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

  useEffect(() => {
    loadProfile();
  }, [user]);

  const handleReload = () => {
    loadProfile();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!profileUser)
    return <div className="text-center text-gray-500 py-10">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-8 relative">
      {/* Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
    
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        User Profile
      </h2>

      <section>
        <h3 className="text-xl font-semibold mb-2">Basic Info</h3>
        <div>First Name: {profileUser.firstName}</div>
        <div>Last Name: {profileUser.lastName}</div>
        <div>Email: {profileUser.email}</div>
        <div>Phone: {profileUser.phoneNumber}</div>
      </section>

      {/* Orders */}


<section>
  <h3 className="text-xl font-semibold mb-4">Orders</h3>
  {orders.length > 0 ? (
    <div className="space-y-8">
      {orders.map((order, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">
              <span className="font-semibold">Order Date:</span> {order.orderDate}
            </p>
            <p className="text-gray-800 font-bold">
              Total: ₹{order.totalAmount?.toFixed(2)}
            </p>
          </div>

          {Array.isArray(order.items) && order.items.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {order.items.map((item, idx) => {
                  // build image URL if your backend provides product image paths
                  const imageUrl = item.imageUrl || "/placeholder.png";

                  return (
                    <motion.div
                      key={`${order.id}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Quantity: {item.quantity}
                        </p>
                        {/* you can add color or other metadata here */}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <p className="text-gray-500">No items in this order</p>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No orders found.</p>
  )}
</section>


      {/* Addresses */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Address</h3>
        {addresses.length > 0 ? (
          <ul>
            {addresses.map((addr, index) => (
              <li key={index} className="p-4 border rounded mb-2">
                <p>{addr.type} Address</p>
                <p>{addr.name}</p>
                <p>{addr.street}, {addr.city}, {addr.state}</p>
                <p>{addr.pincode}, {addr.country}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No addresses found.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
