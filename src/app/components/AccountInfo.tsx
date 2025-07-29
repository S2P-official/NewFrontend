'use client';

import { useState } from 'react';

interface User {
  id: string;
  firstname:string,
  lastname:string,
  email: string;
  phone: string;
}

interface AccountInfoProps {
  user: User;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [firstname,setFirstName]=useState(user.firstname);
  const [lastname,setLastName]=useState(user.lastname);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname,lastname,email, phone }),
      });
      if (!res.ok) throw new Error('Failed to update account info');
      setIsEditing(false);
    } catch (err) {
      alert('Error updating account info');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Account Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {isEditing ? (
        <div className="space-y-4">
             <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-2">
           <p><strong>Name:</strong> {firstname}</p>
          <p><strong>LastName:</strong> {lastname}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
         
        </div>
      )}
    </div>
  );
}