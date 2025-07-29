'use client'
import Link from 'next/link'
import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';


function Footer1() {
  return (
    <div>
       <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="text-2xl font-bold">FictileCore</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted destination for quality kids toys and home appliances. 
              Bringing joy and convenience to families worldwide with carefully curated products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors p-2 rounded-full hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent1">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent1 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-accent1 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-accent1 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-accent1 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-accent1 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-accent1 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent2">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/toys" className="text-gray-400 hover:text-accent2 transition-colors">
                  🧸 Kids Toys
                </Link>
              </li>
              <li>
                <Link href="/category/appliances" className="text-gray-400 hover:text-accent2 transition-colors">
                  🏠 Kitchen Appliances
                </Link>
              </li>
          
              <li>
                <Link href="/category/seasonal" className="text-gray-400 hover:text-accent2 transition-colors">
                  🎄 Seasonal Items
                </Link>
              </li>
              <li>
                <Link href="/category/educational" className="text-gray-400 hover:text-accent2 transition-colors">
                  📚 Educational Toys
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary">Stay Connected</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Subscribe to get updates on new products and special offers!
            </p>
            <div className="mb-6">
              <div className="flex rounded-full overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary text-white placeholder-gray-400"
                />
                <button className="px-4 py-3 bg-primary text-white hover:bg-primary/90 transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@fictilecore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+91 9353003316</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Plot 10, Vishwakarma Colony, Rani Channamma Nagar, Belgaum, Karnataka-590006</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 FictileCore. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer1
