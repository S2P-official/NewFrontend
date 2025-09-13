'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star, Heart, ShoppingCart, Minus, Plus, ZoomIn } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/types";

const ProductPage: React.FC = () => {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState(false);

  // --- Fetch product by ID from backend ---
  useEffect(() => {
    if (!params?.id) return;

    fetch(`https://fictilecore.com/api/checkout/${params.id}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data);

        // Split comma-separated imagePaths safely
        const imgs = data.imagePaths
          ? Array.isArray(data.imagePaths)
            ? data.imagePaths
            : String(data.imagePaths)
                .split(',')
                .map(img => img.trim())
          : [];

        setImagesArray(imgs);
        setSelectedImage(imgs[0] || '');
      })
      .catch(err => console.error('Failed to fetch product:', err));
  }, [params?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const buildImageURL = (path: string) =>
    path.startsWith('/') ? `https://fictilecore.com${path}` : path;

  const increaseQuantity = () => {
    if (product && quantity < (product.stockCount || 1)) setQuantity(q => q + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1);
  };

  const handleAddToCart = () => {
    if (product) addToCart({ ...product, quantity });
  };

  const handleToggleWishlist = () => setIsWishlisted(!isWishlisted);

  return (
    <div className="container mx-auto p-5 flex flex-col md:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex flex-col md:flex-row gap-5 relative">
        {/* Thumbnails */}
        {imagesArray.length > 1 && (
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
            {imagesArray.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-12 h-12 rounded border overflow-hidden ${
                  selectedImage === img ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <Image
                  src={buildImageURL(img)}
                  alt={`thumb-${i}`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div
          className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] border p-2 rounded-lg cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={selectedImage ? buildImageURL(selectedImage) : '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain"
          />
          <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md">
            <ZoomIn className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <button onClick={handleToggleWishlist} className="p-2 bg-white rounded-full shadow-md">
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-gray-600 text-sm">({product.reviews || 0} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && <span className="text-gray-500 line-through">₹{product.originalPrice}</span>}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button onClick={decreaseQuantity} className="px-3 py-2 border-r"><Minus className="h-4 w-4" /></button>
            <span className="px-4">{quantity}</span>
            <button onClick={increaseQuantity} className="px-3 py-2 border-l"><Plus className="h-4 w-4" /></button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.stockCount}
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-4 border-b">
            <button
              className={`pb-2 ${activeTab === 'description' ? 'border-b-2 border-primary font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-2 ${activeTab === 'reviews' ? 'border-b-2 border-primary font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews || 0})
            </button>
          </div>
         <div className="mt-4 text-gray-700">
  {activeTab === 'description' ? (
    <>
      <p>{product.description || 'No description available.'}</p>
      <p className="mt-4 text-gray-500">{product.aboutItem1 || 'No description available.'}</p>
      <p className="mt-4 text-gray-500">{product.aboutItem2 || 'No description available.'}</p>
      <p className="mt-4 text-gray-500">{product.aboutItem3 || 'No description available.'}</p>
      <p className="mt-4 text-gray-500">{product.aboutItem4 || 'No description available.'}</p>
      <p className="mt-4 text-gray-500">{product.aboutItem5 || 'No description available.'}</p>
    </>
  ) : (
    <p>Reviews section coming soon.</p>
  )}
</div>

        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-4/5 h-4/5">
            <Image
              src={selectedImage ? buildImageURL(selectedImage) : '/placeholder.png'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
