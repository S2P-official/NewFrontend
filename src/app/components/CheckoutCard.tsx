'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { Product } from '@/app/types';

interface ProductDetailPageProps {
  params: { id: string };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    fetch(`https://fictilecore.com/api/${id}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data);
        const imagesArray = Array.isArray(data.imagePaths) ? data.imagePaths : [data.imagePaths];
        setSelectedImage(selectedImage[0]);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const imagesArray: string[] = product.imagePaths
    ? Array.isArray(product.imagePaths)
      ? product.imagePaths
      : [product.imagePaths]
    : [];

  return (
    <div className="container mx-auto p-5 flex flex-col md:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex gap-5">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
          {imagesArray.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`border rounded-lg cursor-pointer ${selectedImage === img ? 'border-blue-500' : 'border-gray-200'}`}
            >
              <Image
                src={img.startsWith('/') ? `https://fictilecore.com${img}` : img}
                alt={`thumb-${i}`}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] border p-2 rounded-lg">
          <Image
            src={selectedImage.startsWith('/') ? `https://fictilecore.com${selectedImage}` : selectedImage}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {/* Ratings */}
        <p className="text-green-600 font-medium">
          4★ 7,032 Ratings & 1,535 Reviews
        </p>
        {/* Price & Discount */}
        <p className="text-xl font-semibold">
          ₹{product.price}{' '}
          <span className="line-through text-gray-400 ml-2">₹{product.mrp}</span>{' '}
          <span className="text-green-600 ml-2">{product.discount || '44%'} off</span>
        </p>
        {/* Coupons */}
        <div className="border p-2 rounded-lg bg-yellow-50 text-sm">
          <p>Special Price: Get extra ₹400 off on 1 items (price inclusive of cashback/coupon)</p>
        </div>
        {/* Offers */}
        <div className="text-sm mt-2">
          <p className="font-semibold">Available offers</p>
          <ul className="list-disc list-inside">
            <li>Bank Offer 10% Off on Supermoney UPI. Max discount of ₹50. Min order ₹250.</li>
            <li>Bank Offer 5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter.</li>
            <li>Bank Offer 5% cashback on Flipkart SBI Credit Card upto ₹4,000 per calendar quarter.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
          >
            Add to Cart
          </button>
          <button className="bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500">
            Buy Now
          </button>
        </div>

        {/* Extra Product Info */}
        <div className="mt-5 text-sm">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Subcategory:</strong> {product.subcategory}</p>
          <p><strong>Material:</strong> {product.material}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
