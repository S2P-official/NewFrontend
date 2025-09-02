"use client";


import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const AddToyProduct = () => {

  const { user } = useAuth();
  const router = useRouter();
 



  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    ageGroup: "",
    facebook:"",
    amazon:"",
    meesho:"",
    youtube:"",
    mrp:"",
    tax:"",
    aboutItem1:"",
    aboutItem2:"",
    aboutItem3:"",
    aboutItem4:"",
    aboutItem5:"",
    brand:"",
    ToyFigureType:"",
    character:"",
    modelName:"",
    modelNumber:"",
    manufacturer:"",
    theme:"",
    colour:"",
    occasion:"",
    material:"",
    additionalFeatures:"",
    areBatteriesRequired:"",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...newFiles]);
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];

    newImages.splice(index, 1);
    URL.revokeObjectURL(newPreviews[index]); // cleanup
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("Inventory", JSON.stringify(formData)); // This matches your backend key
      images.forEach((file) => data.append("images", file));

      const response = await fetch("http://localhost:8080/add", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Data Submitted successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
          ageGroup: "",
           facebook:"",
    amazon:"",
    meesho:"",
    youtube:"",
    mrp:"",
    tax:"",
    aboutItem1:"",
    aboutItem2:"",
    aboutItem3:"",
    aboutItem4:"",
    aboutItem5:"",
    brand:"",
    ToyFigureType:"",
    character:"",
    modelName:"",
    modelNumber:"",
    manufacturer:"",
    theme:"",
    colour:"",
    occasion:"",
    material:"",
    additionalFeatures:"",
    areBatteriesRequired:"",
        });
        setImages([]);
        setPreviewImages([]);
      } else {
        alert("Failed .");
      }
    } catch (error) {
      console.error("Error submitting toy product:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Toy Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Toy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Toy Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl "
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              <option value="Soft Toy">Soft Toy</option>
              <option value="Puzzle">Puzzle</option>
             
              <option value="Remote Controlled">Remote Controlled</option>
              <option value="Action Figures">Action </option>
              <option value="Dolls">Dolls</option>
              <option value="Collectible ">Collectible </option>
              <option value="DIY / Assembly">DIY / Assembly </option>
              <option value="D Robot or Mecha ">D Robot or Mecha </option>
              <option value="Educational / Role Play ">Educational / Role Play </option>
              <option value="Animal ">Animal </option>
              <option value="Vehicle-Attachable ">Vehicle-Attachable </option>
              <option value="Customizable / Interchangeable ">Customizable / Interchangeable </option>

            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
              />
            </div>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age Group
            </label>
            <select
              name="ageGroup"
              required
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            >
              <option value="">Select Age Group</option>
              <option value="0-2">0–2 years</option>
              <option value="3-5">3–5 years</option>
              <option value="6-8">6–8 years</option>
              <option value="9+">9+ years</option>
            </select>
          </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook Link
            </label>
            <input
              type="text"
              name="facebook"
              required
              value={formData.facebook}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Amazon Link
            </label>
            <input
              type="text"
              name="amazon"
              required
              value={formData.amazon}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Meeshoo Link
            </label>
            <input
              type="text"
              name="meesho"
              required
              value={formData.meesho}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>


          
        <div>
            <label className="block text-sm font-medium text-gray-700">
              youtube Link
            </label>
            <input
              type="text"
              name="youtube"
              required
              value={formData.youtube}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>


                  <div>
            <label className="block text-sm font-medium text-gray-700">
              Description 1
            </label>
            <input
              type="text"
              name="aboutItem1"
              required
              value={formData.aboutItem1}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Description 2
            </label>
            <input
              type="text"
              name="aboutItem2"
              required
              value={formData.aboutItem2}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Description 3
            </label>
            <input
              type="text"
              name="aboutItem3"
              required
              value={formData.aboutItem3}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Description 4
            </label>
            <input
              type="text"
              name="aboutItem4"
              required
              value={formData.aboutItem4}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Description 5
            </label>
            <input
              type="text"
              name="aboutItem5"
              required
              value={formData.aboutItem5}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              required
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <input
              type="text"
              name="theme"
              required
              value={formData.theme}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>
          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Name
            </label>
            <input
              type="text"
              name="modelName"
              required
              value={formData.modelName}

              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Number
            </label>
            <input
              type="number"
              name="modelNumber"
              required
              value={formData.modelNumber}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Colour
            </label>
            <input
              type="text"
              name="colour"
              required
              value={formData.colour}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Occation
            </label>
            <input
              type="text"
              name="occasion"
              required
              value={formData.occasion}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              Material
            </label>
            <input
              type="text"
              name="material"
              required
              value={formData.material}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
                    <div>
            <label className="block text-sm font-medium text-gray-700">
              AdditionalFeatures
            </label>
            <input
              type="text"
              name="additionalFeatures"
              required
              value={formData.additionalFeatures}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          
              <div>
            <label className="block text-sm font-medium text-gray-700">
              AreBatteriesRequired
            </label>
            <select
              name="areBatteriesRequired"
              required
              value={formData.areBatteriesRequired}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            >
            <option value="select">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
                   
            </select>
          </div>

       

          


















          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 text-black dark:text-white">
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl text-black dark:text-white"
            />
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewImages.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-full h-32 object-cover rounded-xl border shadow text-black dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-700"
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Add Toy Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToyProduct;
