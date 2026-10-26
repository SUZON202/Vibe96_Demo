import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Function to delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = products.filter((p) => p._id !== id);
            setProducts(remaining);
            alert("Product deleted successfully!");
          }
        })
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12 font-sans">
      
      {/* Header with Add Product Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Menu Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all your restaurant products and dishes here.</p>
        </div>
        <Link 
          to="/dashboard/add-product"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-10">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-10 rounded-2xl border border-white/[0.08] bg-[#101a2f]">
          No products found in the database.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product._id} className="rounded-2xl border border-white/[0.08] bg-[#101a2f] overflow-hidden flex flex-col justify-between transition-all hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-950/10">
              <div>
                {/* Product Image */}
                <div className="h-48 w-full bg-[#0a0f1e] overflow-hidden relative group">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-600 text-sm">No Image</div>
                  )}
                  <span className="absolute top-3 right-3 rounded-lg bg-[#0a0f1e]/80 border border-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-orange-400 backdrop-blur-md">
                    {product.category}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                  <p className="text-orange-400 font-bold text-base">৳{product.price}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{product.description || "No description provided."}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
                <span className="text-[10px] font-mono text-gray-500">ID: {product._id.slice(-6).toUpperCase()}</span>
                <div className="flex gap-2">
                  
                  {/* Edit Button with Link */}
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="p-2 rounded-lg bg-white/[0.04] text-gray-400 hover:text-white hover:bg-blue-500/20 hover:text-blue-400 transition cursor-pointer" title="Edit">
                      <Edit size={16} />
                    </button>
                  </Link>

                  {/* Delete Button with onClick */}
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer" title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}