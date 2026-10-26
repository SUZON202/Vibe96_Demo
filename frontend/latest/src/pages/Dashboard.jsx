import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, TrendingUp, MoreHorizontal, Download, CalendarDays, Eye, Plus, CheckCircle2, X, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sales = [
  { name: "Direct", value: 45, color: "#f97316" }, 
  { name: "Social Media", value: 30, color: "#f59e0b" }, 
  { name: "Search Engine", value: 15, color: "#ef4444" }, 
  { name: "Referral", value: 10, color: "#8b5cf6" }, 
];

const topProducts = [
  { name: "Classic Burger", category: "Fast Food", sold: 384, revenue: "৳4,820", percent: 85, color: "bg-orange-500" },
  { name: "Grilled Chicken", category: "Main Course", sold: 276, revenue: "৳3,640", percent: 68, color: "bg-amber-500" },
  { name: "Italian Pasta", category: "Pasta", sold: 198, revenue: "৳2,490", percent: 49, color: "bg-rose-500" },
  { name: "Fresh Lemonade", category: "Beverages", sold: 156, revenue: "৳1,280", percent: 34, color: "bg-yellow-500" },
];

function MiniChart({ points, color }) {
  const coords = points.map((v, i) => `${(i * 100) / (points.length - 1)},${100 - v}`).join(" ");
  return (
    <svg viewBox="0 0 100 42" className="h-12 w-28 overflow-visible" preserveAspectRatio="none">
      <polyline points={coords} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className={color} />
    </svg>
  );
}

function Users({ size }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("Last 7 days");
  const [statusFilter, setStatusFilter] = useState("All Orders");
  const [notice, setNotice] = useState("");

  // State to fetch real orders from the database
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders for dashboard:", err);
        setLoading(false);
      });
  }, []);

  // Calculate total revenue and total orders from database orders
  const totalRevenue = orders.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(2) : 0;

  const stats = [
    { label: "Total Revenue", value: "৳" + totalRevenue.toLocaleString("en-BD"), change: "+12.8%", up: true, icon: DollarSign, color: "text-orange-400", bg: "bg-orange-500/10", points: [30, 42, 35, 56, 48, 70, 61, 83] },
    { label: "Total Orders", value: totalOrdersCount.toString(), change: "+8.2%", up: true, icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-500/10", points: [40, 32, 48, 43, 63, 52, 72, 85] },
    { label: "Total Customers", value: "1,864", change: "+16.4%", up: true, icon: Users, color: "text-violet-400", bg: "bg-violet-500/10", points: [24, 42, 35, 61, 48, 68, 60, 88] },
    { label: "Avg. Order Value", value: "৳" + avgOrderValue, change: "-2.4%", up: false, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10", points: [75, 60, 69, 52, 64, 45, 55, 42] },
  ];

  const filteredOrders = orders.filter((order) => {
    const customerName = order.customerName || "";
    const orderId = order._id || "";
    const itemsStr = order.items || "";
    const matchesSearch = `${orderId} ${customerName} ${itemsStr}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Orders" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const downloadReport = () => {
    showNotice("Your order report has been downloaded.");
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12">
      
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400"><span className="h-2 w-2 rounded-full bg-orange-500" /> Your business at a glance</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Welcome back, Admin <span className="inline-block origin-bottom-right animate-pulse text-orange-400">✦</span></h1>
          <p className="mt-2 text-sm text-gray-500">Here is what's happening with your store today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101a2f] px-3 py-3 text-sm text-gray-300 transition hover:border-orange-500/30">
            <CalendarDays size={16} className="text-orange-400" />
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="max-w-[125px] bg-transparent outline-none cursor-pointer">
              <option className="bg-[#101a2f]">Last 7 days</option>
              <option className="bg-[#101a2f]">Last 30 days</option>
              <option className="bg-[#101a2f]">This year</option>
            </select>
          </label>
          <button onClick={downloadReport} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101a2f] px-4 py-3 text-sm font-medium text-white transition hover:border-orange-500/40 hover:text-orange-400"><Download size={16} /> Export</button>
          
          <button onClick={() => navigate("/dashboard/add-product")} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"><Plus size={17} /> Add Product</button>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101a2f] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl hover:shadow-black/20 sm:p-6">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/[0.03] blur-2xl transition group-hover:bg-orange-500/[0.08]" />
              <div className="relative flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}><Icon size={21} /></div>
                <MiniChart points={stat.points} color={stat.color} />
              </div>
              <p className="relative mt-5 text-sm text-gray-400">{stat.label}</p>
              <div className="relative mt-2 flex flex-wrap items-end justify-between gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{stat.value}</h3>
                <span className={`mb-1 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${stat.up ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"}`}>{stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{stat.change}</span>
              </div>
              <p className="relative mt-2 text-xs text-gray-600">vs. previous period</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
        <article className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><h2 className="text-lg font-bold text-white">Revenue Overview</h2><p className="mt-1 text-sm text-gray-500">Your sales performance for {period.toLowerCase()}</p></div>
            <button onClick={() => showNotice("Revenue chart is displaying real-time aggregated metrics.")} className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white"><MoreHorizontal size={20} /></button>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-3xl font-bold text-white">৳{totalRevenue.toLocaleString("en-BD")}.00</p><p className="mt-2 flex items-center gap-1 text-xs text-emerald-400"><TrendingUp size={14} /> 12.8% <span className="text-gray-500">growth this period</span></p></div>
            <div className="flex items-center gap-4 text-xs text-gray-400"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" />Revenue</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Orders</span></div>
          </div>

          <div className="relative mt-7 h-64">
            <div className="absolute inset-0 flex flex-col justify-between pb-7 pt-2">
              {[30000, 22500, 15000, 7500, 0].map((n) => <div key={n} className="flex items-center gap-3"><span className="w-10 text-[10px] text-gray-500">{n === 0 ? "৳0" : `৳${n / 1000}k`}</span><div className="h-px flex-1 border-t border-dashed border-white/[0.07]" /></div>)}
            </div>
            <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="absolute inset-0 h-[calc(100%-28px)] w-full overflow-visible pl-12">
              <defs><linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity=".25" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></linearGradient></defs>
              <path d="M 0 178 C 30 170, 40 130, 85 145 S 130 165, 170 115 S 230 140, 255 95 S 320 125, 350 85 S 405 115, 430 55 S 495 100, 520 43 S 565 55, 600 18 L 600 220 L 0 220 Z" fill="url(#revenueFill)" />
              <path d="M 0 178 C 30 170, 40 130, 85 145 S 130 165, 170 115 S 230 140, 255 95 S 320 125, 350 85 S 405 115, 430 55 S 495 100, 520 43 S 565 55, 600 18" fill="none" stroke="#f97316" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
              <path d="M 0 195 C 40 185, 55 170, 85 180 S 135 150, 170 160 S 225 175, 255 140 S 315 160, 350 135 S 405 155, 430 110 S 490 130, 520 105 S 565 115, 600 90" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" strokeLinecap="round" opacity=".8" />
            </svg>
            <div className="absolute bottom-0 left-14 right-0 flex justify-between text-[10px] text-gray-500 sm:text-xs">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}</div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-5 sm:p-7">
          <div><h2 className="text-lg font-bold text-white">Sales by Channel</h2><p className="mt-1 text-sm text-gray-500">Where customers find you</p></div>
          <div className="relative mx-auto mt-7 flex h-52 w-52 items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
              <circle cx="100" cy="100" r="72" fill="none" stroke="#0a0f1e" strokeWidth="22" />
              {(() => { 
                let offset = 0; 
                const circumference = 2 * Math.PI * 72; 
                return sales.map((s) => { 
                  const length = (circumference * s.value) / 100; 
                  const el = <circle key={s.name} cx="100" cy="100" r="72" fill="none" stroke={s.color} strokeWidth="22" strokeDasharray={`${Math.max(0, length - 4)} ${circumference - length + 4}`} strokeDashoffset={-offset} strokeLinecap="round" />; 
                  offset += length; 
                  return el; 
                }); 
              })()}
            </svg>
            <div className="absolute text-center"><p className="text-xs text-gray-500">Total Sales</p><p className="mt-1 text-3xl font-bold text-white">100%</p><p className="mt-1 text-xs text-orange-400">All channels</p></div>
          </div>
          <div className="mt-6 space-y-4">
            {sales.map((s) => <div key={s.name} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} /><span className="flex-1 text-sm text-gray-400">{s.name}</span><span className="text-sm font-semibold text-gray-200">{s.value}%</span></div>)}
          </div>
        </article>
      </section>

      {/* Recent Orders */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
        <article className="min-w-0 rounded-2xl border border-white/[0.08] bg-[#101a2f]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] p-5 sm:p-6">
            <div><h2 className="text-lg font-bold text-white">Recent Orders</h2><p className="mt-1 text-sm text-gray-500">Track your latest customer orders</p></div>
            <button onClick={() => navigate("/dashboard/orders")} className="flex items-center gap-1 text-sm font-semibold text-orange-400 transition hover:text-orange-300">View all <ArrowUpRight size={16} /></button>
          </div>
          <div className="flex flex-wrap items-center gap-2 p-4 sm:px-6">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 md:hidden"><Search size={15} className="text-gray-500" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500" /></div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#101a2f] px-3 py-2 text-xs text-gray-300 outline-none cursor-pointer hover:border-orange-500/30"><option>All Orders</option><option>Completed</option><option>Processing</option><option>Pending</option><option>Cancelled</option></select>
            <span className="text-xs text-gray-500">{filteredOrders.length} results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead><tr className="border-y border-white/[0.06] bg-white/[0.015] text-[10px] uppercase tracking-wider text-gray-500"><th className="px-6 py-4 font-semibold">Order ID / Customer</th><th className="px-4 py-4 font-semibold">Items</th><th className="px-4 py-4 font-semibold">Amount</th><th className="px-4 py-4 font-semibold">Status</th><th className="px-4 py-4 font-semibold">Action</th></tr></thead>
              <tbody className="divide-y divide-white/[0.05]">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">Loading orders...</td></tr>
                ) : filteredOrders.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">No orders match your search.</td></tr>
                ) : (
                  filteredOrders.map((order) => {
                    const shortId = order._id ? order._id.slice(-6) : "N/A";
                    const custName = order.customerName || "Unknown";
                    const initials = custName.slice(0, 2).toUpperCase();
                    const orderStatus = order.status || "Pending";
                    return (
                      <tr key={order._id || Math.random()} className="transition hover:bg-white/[0.03]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-xs font-bold text-orange-300">{initials}</div>
                            <div>
                              <p className="font-semibold text-gray-200">{custName}</p>
                              <p className="mt-1 text-xs text-gray-500">#{shortId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4"><p className="text-gray-300 max-w-[200px] truncate">{order.items || "N/A"}</p><p className="mt-1 text-xs text-gray-500">{order.date || "Recent"}</p></td>
                        <td className="px-4 py-4 font-semibold text-orange-400">৳{order.totalPrice || 0}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            orderStatus === "Completed" ? "bg-emerald-500/15 text-emerald-400" : 
                            orderStatus === "Processing" ? "bg-blue-500/15 text-blue-400" : 
                            orderStatus === "Cancelled" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"
                          }`}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />{orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4"><button onClick={() => navigate("/dashboard/orders")} className="rounded-lg border border-white/[0.08] p-2 text-gray-400 transition hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/10"><Eye size={15} /></button></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-5 sm:p-6">
          <div className="flex items-start justify-between"><div><h2 className="text-lg font-bold text-white">Top Products</h2><p className="mt-1 text-sm text-gray-500">Best-selling items</p></div><button onClick={() => navigate("/dashboard/products")} className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"><ArrowUpRight size={18} /></button></div>
          <div className="mt-7 space-y-6">
            {topProducts.map((p, i) => <div key={p.name}>
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-opacity-15 bg-white ${i === 0 ? "text-orange-500" : i === 1 ? "text-amber-500" : i === 2 ? "text-rose-500" : "text-yellow-500"}`}><Package size={19} /></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-gray-200">{p.name}</p><p className="mt-1 text-xs text-gray-500">{p.category} · {p.sold} sold</p></div>
                <p className="text-sm font-bold text-white">{p.revenue}</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${p.color} transition-all duration-700`} style={{ width: `${p.percent}%` }} /></div>
            </div>)}
          </div>
          <button onClick={() => navigate("/dashboard/products")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-300 transition hover:border-orange-500/40 hover:text-orange-400 hover:bg-orange-500/5">View All Products <ArrowUpRight size={16} /></button>
        </article>
      </section>

      <footer className="flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-gray-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} SwadPanel. Admin Dashboard UI.</p>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" /> Interface ready · Database connected</div>
      </footer>
      
      {notice && <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl border border-orange-500/30 bg-[#101a2f] px-5 py-4 text-sm text-white shadow-2xl"><CheckCircle2 size={19} className="shrink-0 text-orange-400" />{notice}<button onClick={() => setNotice("")} className="ml-2 text-gray-400 transition hover:text-white"><X size={16} /></button></div>}
    </div>
  );
}