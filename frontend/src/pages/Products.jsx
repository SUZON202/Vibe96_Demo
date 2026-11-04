import React, { useState, useContext } from "react";
import { Plus, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../providers/AuthProvider"; 
import toast from "react-hot-toast";

export default function Products() {
  // Demo Products for Vibe96 Marketplace Preview with Working Image Links
  const [products, setProducts] = useState([
    {
      _id: "6addc9fea67e0fa253bc3b8",
      name: "Special Grilled Chicken",
      price: 350,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
      description: "Delicious and spicy special grilled chicken served with salad and sauce."
    },
    {
      _id: "6addc9fea67e0fa253bc3b9",
      name: "Juicy Beef Burger",
      price: 500,
      category: "Fast Food",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      description: "Cheesy and juicy beef burger with special spicy sauce."
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  
  // Get user from context to check if it's demo admin
  const { user } = useContext(AuthContext);
  const isDemoAdmin = user?.email === "admin@swad.com";

  // Function to delete product
  const handleDelete = (id) => {
    // Block Demo Admin from deleting
    if (isDemoAdmin) {
      toast.error("Read-Only Mode: Demo Admin cannot delete products!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      const remaining = products.filter((p) => p._id !== id);
      setProducts(remaining);
      toast.success("Product deleted successfully!");
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
          to={isDemoAdmin ? "#" : "/dashboard/add-product"}
          onClick={(e) => {
            if (isDemoAdmin) {
              e.preventDefault();
              toast.error("Read-Only: Cannot add new products.");
            }
          }}
          className={`inline-flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition ${
            isDemoAdmin 
              ? "bg-gray-700 cursor-not-allowed text-gray-400 shadow-none" 
              : "bg-orange-500 hover:bg-orange-600 shadow-orange-950/20"
          }`}
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
                  
                  {/* Edit Button */}
                  <Link 
                    to={isDemoAdmin ? "#" : `/dashboard/update-product/${product._id}`}
                    onClick={(e) => {
                      if (isDemoAdmin) {
                        e.preventDefault();
                        toast.error("Read-Only: Cannot edit products.");
                      }
                    }}
                  >
                    <button 
                      disabled={isDemoAdmin}
                      className={`p-2 rounded-lg transition ${
                        isDemoAdmin 
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                          : "bg-white/[0.04] text-gray-400 hover:text-white hover:bg-blue-500/20 hover:text-blue-400 cursor-pointer"
                      }`} 
                      title={isDemoAdmin ? "Read Only" : "Edit"}
                    >
                      <Edit size={16} />
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDelete(product._id)}
                    disabled={isDemoAdmin}
                    className={`p-2 rounded-lg transition ${
                      isDemoAdmin 
                        ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                        : "bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
                    }`} 
                    title={isDemoAdmin ? "Read Only" : "Delete"}
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