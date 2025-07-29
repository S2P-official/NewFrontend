"use client";

import React, { useEffect, useState } from "react";
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
  const { user, logout } = useAuth(); // added logout
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleLogout = () => {
    logout(); // clear auth context/session
    router.push("/"); // redirect after logout
  };

  if (loading)
    return <div className="text-center py-10">Loading user profile...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!profileUser)
    return (
      <div className="text-center text-gray-500 py-10">User not found.</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-8 relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        User Profile
      </h2>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Basic Info</h3>
        <p className="text-gray-600">
          <span className="font-medium">First Name:</span>
          <p
            className="font-extrabold
"
          >
            {profileUser.firstName}
          </p>{" "}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Last Name:</span>
          <p
            className="font-extrabold
"
          >   {profileUser.lastName}
            </p>{" "}
       
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Email:</span>
          <p
            className="font-extrabold
"
          >   {profileUser.email}</p>{" "}
       
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Phone:</span>
          <p
            className="font-extrabold
"
          >  {profileUser.phoneNumber}</p>{" "}
        
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Orders</h3>
        {orders.length > 0 ? (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order.id}
                className="p-4 bg-gray-50 border rounded shadow-sm"
              >
                <p>
                  <span className="font-semibold">ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {order.date}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> $
                  {order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Addresses</h3>
        {addresses.length > 0 ? (
          <ul className="space-y-2">
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className="p-4 bg-gray-50 border rounded shadow-sm"
              >
                <p>
                  <span className="font-semibold capitalize">{addr.type}:</span>
                </p>
                <p>
                  {addr.street}, {addr.city}, {addr.country}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No addresses found.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
