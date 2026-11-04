import React, { useState } from "react";
import { ArrowLeft, Plus, Image as ImageIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUploading(true);
      let imageUrl = "";

      // 1. If an image is selected, it will first be uploaded to ImgBB
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=4a596d3fde5250bc965dd4812f35146f`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imgbbData = await imgbbResponse.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.url; // Live image link received from ImgBB
        } else {
          alert("Image upload failed!");
          setUploading(false);
          return;
        }
      }

      // 2. Preparing all product data and image link together
      const finalProductData = {
        ...productData,
        price: parseFloat(productData.price),
        image: imageUrl,
      };

      // 3. Sending data to our backend API
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalProductData),
      });

      const data = await response.json();
      setUploading(false);

      if (data.acknowledged) {
        alert("Product and Image added successfully to Database!");
        // Resetting form and states
        setProductData({
          name: "",
          category: "",
          price: "",
          description: "",
        });
        setImageFile(null);
        setImagePreview("");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error:", error);
      alert("Server error! Make sure backend is running.");
    }
  };

  return (
    <div className="mx-auto max-w-[1000px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#101a2f] text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Add New Product</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the details to add a new product to your menu.</p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        
        {/* Left Column: Basic Details */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6">
            <h2 className="text-lg font-bold text-white mb-5">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  placeholder="e.g. Classic Beef Burger" 
                  className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-orange-500/30 focus:border-orange-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Category</label>
                  <select 
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition hover:border-orange-500/30 focus:border-orange-500/50 cursor-pointer"
                    required
                  >
                    <option value="" className="text-gray-500">Select Category</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Price ($)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="0.00" 
                    className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-orange-500/30 focus:border-orange-500/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
                <textarea 
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="Type product description here..." 
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-orange-500/30 focus:border-orange-500/50"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6">
            <h2 className="text-lg font-bold text-white mb-5">Product Image</h2>
            
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-[#0a0f1e] py-8 px-4 transition hover:border-orange-500/40 hover:bg-orange-500/5 text-center">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-28 w-28 object-cover rounded-xl mb-3 border border-white/10 shadow-md" />
              ) : (
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-gray-400">
                  <ImageIcon size={24} />
                </div>
              )}
              <p className="text-sm font-medium text-white">
                {imageFile ? imageFile.name : "Click to upload image"}
              </p>
              <p className="mt-1 text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Uploading & Saving...
              </>
            ) : (
              <>
                <Plus size={18} /> Publish Product
              </>
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
}