import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetching the product of this ID from the backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false); // Stop loading when data arrives
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  // Function to submit form and update data
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      image: form.image.value,
      description: form.description.value,
    };

    // Sending a PUT request to the backend to update in the database
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Product updated successfully!");
          navigate("/dashboard/products"); // Return to product list after updating
        } else {
          alert("You made no changes!");
        }
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-10 text-xl">Loading product details...</div>;
  }

  return (
    <div className="mx-auto max-w-[800px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Update Product</h1>
        <p className="mt-1 text-sm text-gray-500">Edit your product details below.</p>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 sm:p-8">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Product Name</label>
              <input
                type="text"
                name="name"
                defaultValue={product.name}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0a0f1e] p-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Price (৳)</label>
              <input
                type="number"
                name="price"
                defaultValue={product.price}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0a0f1e] p-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <select
                name="category"
                defaultValue={product.category}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0a0f1e] p-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              >
                <option value="Grill & BBQ">Grill & BBQ</option>
                <option value="Starters">Starters</option>
                <option value="Mains & Salads">Mains & Salads</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={product.image || ""}
                className="w-full rounded-xl border border-white/[0.1] bg-[#0a0f1e] p-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows="4"
              className="w-full rounded-xl border border-white/[0.1] bg-[#0a0f1e] p-3 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 p-3 font-bold text-white transition hover:bg-orange-600 sm:w-auto sm:px-8"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;