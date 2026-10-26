import React, { useState, useEffect } from "react";
import { Search, Filter, Eye, Clock, ChefHat, CheckCircle2, ShoppingBag, XCircle, Loader2 } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetching orders from the database
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  // Set color and icon based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: Clock };
      case "Processing":
        return { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", icon: ChefHat };
      case "Completed":
        return { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle2 };
      case "Cancelled":
        return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", icon: XCircle };
      default:
        return { color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30", icon: Clock };
    }
  };

  // Function to update order status
  const handleStatusUpdate = (id, newStatus) => {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          setOrders(
            orders.map((order) =>
              order._id === id ? { ...order, status: newStatus } : order
            )
          );
        }
      })
      .catch((err) => {
        console.error("Error updating order status:", err);
        alert("Failed to update status.");
      });
  };

  const money = (amount) => `৳${amount?.toLocaleString("en-BD") || 0}`;

  return (
    <div className="min-h-screen bg-[#080d18] p-5 sm:p-8 lg:p-10 font-sans text-slate-200">
      
      {/* Header & Stats */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white">Orders Management</h1>
          <p className="mt-2 text-sm text-slate-400">View, update, and manage all customer orders.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="rounded-xl border border-white/10 bg-[#101827] px-4 py-2.5 text-center">
            <p className="text-xs text-slate-400">Total Orders</p>
            <p className="font-bold text-white">{orders.length}</p>
          </div>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2.5 text-center">
            <p className="text-xs text-orange-400">Active Orders</p>
            <p className="font-bold text-orange-500">
              {orders.filter(o => o.status === "Pending" || o.status === "Processing").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#101827] p-4 sm:flex-row sm:items-center">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by Customer Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#080d18] py-2.5 pl-11 pr-4 text-sm text-white outline-none focus:border-orange-500/50"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-slate-400" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#080d18] py-2.5 px-4 text-sm font-semibold text-slate-300 outline-none focus:border-orange-500/50"
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="whitespace-nowrap px-6 py-4">Order ID</th>
                <th className="whitespace-nowrap px-6 py-4">Customer Info</th>
                <th className="whitespace-nowrap px-6 py-4">Order Type</th>
                <th className="whitespace-nowrap px-6 py-4">Total Amount</th>
                <th className="whitespace-nowrap px-6 py-4">Live Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-orange-500 mb-3" />
                    Loading latest orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 bg-[#0a0f1e]/50">
                    No orders found in the database.
                  </td>
                </tr>
              ) : (
                orders
                  .filter(order => filterStatus === "All" || order.status === filterStatus)
                  .filter(order => order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((order) => {
                    const style = getStatusStyle(order.status || "Pending");
                    const StatusIcon = style.icon;

                    return (
                      <tr key={order._id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="font-bold text-white uppercase">#{order._id.slice(-6)}</span>
                          <p className="mt-1 text-[10px] text-slate-500">{order.date || "Today"}</p>
                        </td>
                        
                        <td className="whitespace-nowrap px-6 py-5">
                          <p className="font-semibold text-white">{order.customerName || "Unknown Guest"}</p>
                          <p className="mt-1 text-xs text-slate-500">{order.phone || "No phone provided"}</p>
                        </td>
                        
                        <td className="px-6 py-5">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                            {order.deliveryMethod === "pickup" ? "Pickup" : "Home Delivery"}
                          </span>
                        </td>
                        
                        <td className="whitespace-nowrap px-6 py-5 font-bold text-orange-400">
                          {money(order.totalPrice)}
                        </td>
                        
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-3">
                            {/* Status update dropdown */}
                            <select
                              value={order.status || "Pending"}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold outline-none cursor-pointer appearance-none transition-all ${style.bg} ${style.border} ${style.color}`}
                            >
                              <option value="Pending" className="bg-[#101a2f] text-amber-500">Pending</option>
                              <option value="Processing" className="bg-[#101a2f] text-blue-500">Processing</option>
                              <option value="Completed" className="bg-[#101a2f] text-emerald-500">Completed</option>
                              <option value="Cancelled" className="bg-[#101a2f] text-red-500">Cancelled</option>
                            </select>
                            <StatusIcon size={18} className={style.color} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}