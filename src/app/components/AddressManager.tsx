'use client';

import { useState } from 'react';

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  country: string;
}

interface AddressManagerProps {
  addresses: Address[];
  userId: string;
}

export default function AddressManager({ addresses, userId }: AddressManagerProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleManageAddress = () => {
    setIsEditing(!isEditing);
    // In a real app, this could trigger a modal or redirect to a form
  };

  const shippingAddress = addresses.find((addr) => addr.type === 'shipping');
  const billingAddress = addresses.find((addr) => addr.type === 'billing');

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Addresses</h3>
        <button
          onClick={handleManageAddress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Save Changes' : 'Manage Address'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Shipping Address</h4>
          {shippingAddress ? (
            <p className="text-gray-600">
              {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.country}
            </p>
          ) : (
            <p className="text-gray-600">No shipping address set</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold">Billing Address</h4>
          {billingAddress ? (
            <p className="text-gray-600">
              {billingAddress.street}, {billingAddress.city}, {billingAddress.country}
            </p>
          ) : (
            <p className="text-gray-600">No billing address set</p>
          )}
        </div>
      </div>
    </div>
  );
}