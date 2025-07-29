'use client';

import Link from 'next/link';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

interface OrdersProps {
  orders: Order[];
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex space-x-4 mb-4">
        <Link href="/orders/track" className="text-blue-600 hover:underline">
          Track and manage your orders
        </Link>
        <Link href="/orders/buy-again" className="text-blue-600 hover:underline">
          Buy again
        </Link>
        <Link href="/support" className="text-blue-600 hover:underline">
          Customer service
        </Link>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-600">No recent orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}