'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, Heart, User, Home } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  
const handleAdminClick = () => {
  console.log("Navbar.handleAdminClick — user:", user);
  if (!user) {
    console.log("→ redirect to /signin");
    router.push("/signin");
  } else if (user.role === "admin") {
    console.log("→ redirect to /admin");
    router.push("/admin");
  } else {
    console.log("→ redirect to /profile");
    router.push("/profile");
  }
};


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FC</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              FictileCore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors flex items-center space-x-1 ${
                isActive("/")
                  ? "text-primary"
                  : "text-gray-700 hover:text-primary"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary font-medium transition-colors">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                <Link
                  href="/category/toys"
                  className="block px-4 py-3 text-gray-700 hover:bg-accent1/20 hover:text-primary rounded-t-xl transition-colors"
                >
                  🧸 Kids Toys
                </Link>
                <Link
                  href="/category/appliances"
                  className="block px-4 py-3 text-gray-700 hover:bg-accent1/20 hover:text-primary rounded-b-xl transition-colors"
                >
                  🏠 Home Appliances
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for toys, appliances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/wishlist"
              className="p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* User Button */}
            {user ? (
              <button 
                onClick={handleAdminClick} 
                className="px-4 flex py-2 rounded-full font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User className="h-6 w-6 mr-2"/>
                
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : "Account"}
              </button>
            ) : (
              <button
                onClick={handleAdminClick}
                className="p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
              >
                <User className="h-6 w-6" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                href="/category/toys"
                className="block text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🧸 Kids Toys
              </Link>
              <Link
                href="/category/appliances"
                className="block text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Home Appliances
              </Link>
              <Link
                href="/wishlist"
                className="block text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ❤️ Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
