'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Truck } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

type AddressForm = {
  customerId: string;
  addressId:string;
  name: string;
  phone: string;
  alternatePhone?: string;
  pincode: string;
  locality: string;
  street: string;
  city: string;
  state: string;
  landmark?: string;
  addressType: 'Home' | 'Work';
};

export default function AddressSection() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>();

  // Fetch address
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8080/api/customers/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            reset({
              customerId: user.id,
              name: data.name || '',
              addressId:data.id || '',
              phone: data.phone || '',
              alternatePhone: data.alternatePhone || '',
              pincode: data.pincode || '',
              locality: data.locality || '',
              street: data.street || '',
              city: data.city || '',
              state: data.state || '',
              landmark: data.landmark || '',
              addressType: data.addressType || 'Home',
            });
          }
        })
        .catch(err => console.error('Failed to fetch address:', err));
    }
  }, [user, reset]);

  const onSubmit = async (data: AddressForm) => {
    if (!user?.id) return console.error('User not logged in');

    try {
      const res = await fetch(`http://localhost:8080/api/address/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, customerId: user.id }),
      });

      if (res.ok) {
        alert('Address saved successfully!');
      } else {
        console.error('Error saving address:', await res.text());
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="p-2 bg-blue-100 text-blue-600 rounded-full">
              <Truck size={20} />
            </span>
            Add a New Address
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold mb-1">10-digit Mobile Number</label>
              <input
                type="tel"
                {...register('phone', { required: 'Mobile number is required' })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                maxLength={10}
                pattern="\d{10}"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Pincode + Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Pincode</label>
                <input
                  type="text"
                  {...register('pincode', { required: 'Pincode is required' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Locality</label>
                <input
                  type="text"
                  {...register('locality', { required: 'Locality is required' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-semibold mb-1">Street / Area</label>
              <input
                type="text"
                {...register('street', { required: 'Street is required' })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">City/District/Town</label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">State</label>
                <select
                  {...register('state', { required: 'State is required' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select state</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  {/* Add more states */}
                </select>
              </div>
            </div>

            {/* Landmark + Alternate Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  {...register('landmark')}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Alternate Phone (Optional)</label>
                <input
                  type="text"
                  {...register('alternatePhone')}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            {/* Address Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">Address Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="Home" {...register('addressType', { required: true })} />
                  <span>Home</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="Work" {...register('addressType', { required: true })} />
                  <span>Work</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
