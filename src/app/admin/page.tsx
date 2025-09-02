"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Eye,
  Upload,
  Save,
  X,
  Route,
  Router,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

import { Product } from "@/app/types";
import Image from "next/image";
import { getProducts } from "@/app/data/products";
import { useRouter } from "next/navigation";

import router from "next/router";

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "customers", label: "Customers", icon: Users },
] as const;

type TabId = (typeof tabs)[number]["id"];

const products = await getProducts();

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { user, logout } = useAuth();
  const router = useRouter();

  const [tabData, setTabData] = useState<any>(null);

  const handleTabClick = async (tabId: TabId) => {
    setActiveTab(tabId);
    try {
      const res = await fetch(`http://localhost:8080/api/${tabId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTabData(data);
    } catch (err) {
      console.error(err);
      setTabData(null);
    }
  };
  const Customer_length = Array.isArray(tabData) ? tabData.length : 0;

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/order/getall") // your backend API
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  useEffect(() => {
    if (!user) {
      // Not logged in
      router.push("/signin");
    } else if (user.role !== "admin") {
      // Logged in but not admin
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductForm: React.FC<{ product?: Product; onClose: () => void }> = ({
    product,
    onClose,
  }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const handleLogout = () => {
    logout(); // clear auth context/session
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your FictileCore store</p>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all"
          >
            Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div>
          <div className="flex space-x-6 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                whileHover={{ y: -2 }}
                className={`pb-4 font-bold transition-all flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
 
          {/* Display the fetched data */}
          {activeTab === "customers" && Array.isArray(tabData) && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
                <thead className=" bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border-b">S.No</th>{" "}
                    {/* Serial number column */}
                    <th className="px-4 py-2 border-b">ID</th>
                    <th className="px-4 py-2 border-b">First Name</th>
                    <th className="px-4 py-2 border-b">Last Name</th>
                    <th className="px-4 py-2 border-b">Email</th>
                    <th className="px-4 py-2 border-b">Phone</th>
                    <th className="px-4 py-2 border-b">Role</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {tabData.map((user: any, index: number) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{index + 1}</td>{" "}
                      {/* Serial number */}
                      <td className="px-4 py-2 border-b">{user.id}</td>
                      <td className="px-4 py-2 border-b">{user.firstName}</td>
                      <td className="px-4 py-2 border-b">{user.lastName}</td>
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      <td className="px-4 py-2 border-b">{user.phoneNumber}</td>
                      <td className="px-4 py-2 border-b">{user.role || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Total Products",
                    value: products.length,
                    color: "primary",
                    icon: Package,
                  },
                  {
                    title: "Total Orders",
                    value: orders.length,
                    color: "secondary",
                    icon: ShoppingCart,
                  },
                  {
                    title: "Customers",
                    value: "2",
                    color: "accent1",
                    icon: Users,
                  },
                  {
                    title: "Revenue",
                    value: "₹12,345",
                    color: "accent2",
                    icon: TrendingUp,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-${stat.color}/10 rounded-full flex items-center justify-center`}
                      >
                        <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">{stat.title}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "products" && (
              <div>
                {/* Products Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <motion.button
                    onClick={() => router.push("/addProduct")} // Correct navigation here
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center space-x-2 shadow-lg"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Product</span>
                  </motion.button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    >
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          {product.isNew && (
                            <span className="bg-accent2 text-white px-2 py-1 rounded-full text-xs font-bold">
                              NEW
                            </span>
                          )}
                          {product.isOnSale && (
                            <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                              SALE
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-bold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <span className="text-sm text-gray-600">
                            Stock: {product.stockCount}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => setEditingProduct(product)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-secondary text-white py-2 rounded-full font-medium hover:bg-secondary/90 transition-all flex items-center justify-center space-x-1"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Recent Orders
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl font-bold text-gray-800 mb-2">
                      No orders yet
                    </p>
                    <p className="text-gray-600">
                      Orders will appear here once customers start purchasing.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                          <th className="py-3 px-4 border-b">Customer</th>
                          <th className="py-3 px-4 border-b">Email</th>
                          <th className="py-3 px-4 border-b">Order Date</th>
                          <th className="py-3 px-4 border-b">Items</th>
                          <th className="py-3 px-4 border-b">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(
                          (
                            order: {
                              customerName:
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | Promise<React.AwaitedReactNode>
                                | null
                                | undefined;
                              email:
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | Promise<React.AwaitedReactNode>
                                | null
                                | undefined;
                              orderDate: string | number | Date;
                              items: any[];
                              totalAmount: number;
                            },
                            index: React.Key | null | undefined
                          ) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="py-3 px-4 border-b">
                                {order.customerName}
                              </td>
                              <td className="py-3 px-4 border-b">
                                {order.email}
                              </td>
                              <td className="py-3 px-4 border-b">
                                {order.orderDate
                                  ? new Date(
                                      order.orderDate
                                    ).toLocaleDateString()
                                  : "—"}
                              </td>
                              <td className="py-3 px-4 border-b">
                                {order.items.length > 0 ? (
                                  <ul className="list-disc list-inside">
                                    {order.items.map((item, i) => (
                                      <li key={i}>
                                        {item.productName} × {item.quantity}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  "No items"
                                )}
                              </td>
                              <td className="py-3 px-4 border-b">
                                ₹{order.totalAmount.toFixed(2)}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* {activeTab === 'customers' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Management</h2>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No customers yet</h3>
                  <p className="text-gray-600">Customer data will appear here once users register.</p>
                </div>
              </div>
            )} */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Form Modal */}
      {/* <AnimatePresence>
        {(isAddingProduct || editingProduct) && (
          <ProductForm
            product={editingProduct || undefined}
            onClose={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default AdminDashboard;
