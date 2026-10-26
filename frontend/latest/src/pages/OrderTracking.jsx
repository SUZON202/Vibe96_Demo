import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Flame, ArrowLeft, CheckCircle2, Clock, Package, MapPin, Phone, User, Truck, UtensilsCrossed } from "lucide-react";

const money = (amount) => "৳" + amount.toLocaleString("en-BD");

export default function OrderTracking() {
  const [searchId, setSearchId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError("");
    setSearchedOrder(null);

    // Fetch all orders and match from there
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Customers can search using the full ID or the last 6 digits
          const found = data.find(
            (order) =>
              order._id.toLowerCase().includes(searchId.trim().toLowerCase()) ||
              order._id.slice(-6).toLowerCase() === searchId.trim().toLowerCase()
          );

          if (found) {
            setSearchedOrder(found);
          } else {
            setError("No order found with this ID. Please check and try again.");
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error tracking order:", err);
        setError("Failed to fetch order data. Please check your backend.");
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-[#080d18] font-sans text-slate-200 selection:bg-orange-500/35">
      {/* Hero / Header */}
      <section className="relative border-b border-white/[0.08] bg-[#0c1423] px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-orange-500/40 hover:text-orange-400 mb-6">
            <ArrowLeft size={15} /> Back to Home
          </Link>
          
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 mb-4">
            <Package size={28} />
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Track Your <span className="text-orange-500">Order</span>
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Enter your order ID below to check its real-time preparation and delivery status.
          </p>

          {/* Search Box */}
          <form onSubmit={handleTrack} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g., 5e9f63)"
                className="w-full rounded-2xl border border-white/[0.1] bg-[#0c1424] px-4 py-4 pl-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/[0.08]"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 text-xs font-bold tracking-wider text-white shadow-xl shadow-orange-950/30 transition hover:bg-orange-400"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </form>
        </div>
      </section>

      {/* Result Section */}
      <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {searchedOrder && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101827] shadow-2xl">
            {/* Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] p-6 bg-[#0c1424]">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase">Order ID</p>
                <p className="mt-1 font-mono text-base font-bold text-orange-400">#{searchedOrder._id}</p>
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                  searchedOrder.status === "Completed" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : 
                  searchedOrder.status === "Processing" ? "bg-blue-500/15 text-blue-400 border border-blue-500/30" : 
                  searchedOrder.status === "Cancelled" ? "bg-red-500/15 text-red-400 border border-red-500/30" : 
                  "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                }`}>
                  <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
                  {searchedOrder.status || "Pending"}
                </span>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                <div className="rounded-xl border border-white/[0.06] bg-[#0c1424] p-4">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5"><User size={14} className="text-orange-400" /> Customer Name</p>
                  <p className="mt-1.5 font-semibold text-white">{searchedOrder.customerName}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-[#0c1424] p-4">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5"><Phone size={14} className="text-orange-400" /> Phone Number</p>
                  <p className="mt-1.5 font-semibold text-white">{searchedOrder.phone}</p>
                </div>
              </div>

              {searchedOrder.deliveryMethod === "home" && (
                <div className="rounded-xl border border-white/[0.06] bg-[#0c1424] p-4 text-sm">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin size={14} className="text-orange-400" /> Delivery Address</p>
                  <p className="mt-1.5 text-slate-300">{searchedOrder.address}</p>
                </div>
              )}

              <div className="rounded-xl border border-white/[0.06] bg-[#0c1424] p-4 text-sm">
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5"><UtensilsCrossed size={14} className="text-orange-400" /> Ordered Items</p>
                <p className="font-medium text-white">{searchedOrder.items}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="text-sm text-slate-400">Total Bill (Including Delivery)</span>
                <span className="font-serif text-2xl font-bold text-orange-400">{money(searchedOrder.totalPrice || 0)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-orange-500/15 bg-orange-500/[0.04] p-4 text-xs text-slate-400">
              <Clock size={16} className="text-orange-400 shrink-0" />
              <span>Estimated preparation time is 30-45 minutes. For any queries, call our support hotline.</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}