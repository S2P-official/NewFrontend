'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X
} from 'lucide-react';
import { useAuth } from "@/app/context/AuthContext";

import { Product } from '@/app/types';
import Image from 'next/image';
import { getProducts } from '@/app/data/products';
import { useRouter } from 'next/navigation';
import router from 'next/router';



const products = await getProducts();

const AdminDashboard: React.FC = () => {

      const [activeTab, setActiveTab] = useState('overview');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');


const { user, logout } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (!user) {
      // Not logged in
      router.push('/signin');
    } else if (user.role !== 'admin') {
      // Logged in but not admin
      router.push('/');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') return null; 



  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductForm: React.FC<{ product?: Product; onClose: () => void }> = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      price: product?.price || 0,
      category: product?.category || 'toys',
      subcategory: product?.subcategory || '',
      description: product?.description || '',
      stockCount: product?.stockCount || 0,
      isNew: product?.isNew || false,
      isOnSale: product?.isOnSale || false,
    });

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
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'toys' | 'appliances' })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="toys">Kids Toys</option>
                  <option value="appliances">Home Appliances</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="e.g., Educational, Kitchen"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Stock Count
                </label>
                <input
                  type="number"
                  value={formData.stockCount}
                  onChange={(e) => setFormData({ ...formData, stockCount: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-secondary transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload images or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-5 h-5 text-accent2 focus:ring-accent2 border-gray-300 rounded"
                />
                <span className="font-medium text-gray-700">Mark as New</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isOnSale}
                  onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="font-medium text-gray-700">Mark as Sale</span>
              </label>
            </div>

            <div className="flex space-x-4 pt-6">
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>{product ? 'Update Product' : 'Add Product'}</span>
              </motion.button>
            </div>
          </form>
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
        <div className="flex space-x-6 mb-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'customers', label: 'Customers', icon: Users }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              className={`pb-4 font-bold transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
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
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Products', value: products.length, color: 'primary', icon: Package },
                  { title: 'Total Orders', value: '1,234', color: 'secondary', icon: ShoppingCart },
                  { title: 'Customers', value: '567', color: 'accent1', icon: Users },
                  { title: 'Revenue', value: '₹12,345', color: 'accent2', icon: TrendingUp }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${stat.color}/10 rounded-full flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                    <p className="text-gray-600">{stat.title}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'products' && (
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
                    onClick={() => setIsAddingProduct(true)}
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
                        <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-primary">₹{product.price}</span>
                          <span className="text-sm text-gray-600">Stock: {product.stockCount}</span>
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

            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                  <p className="text-gray-600">Orders will appear here once customers start purchasing.</p>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Management</h2>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No customers yet</h3>
                  <p className="text-gray-600">Customer data will appear here once users register.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {(isAddingProduct || editingProduct) && (
          <ProductForm
            product={editingProduct || undefined}
            onClose={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

