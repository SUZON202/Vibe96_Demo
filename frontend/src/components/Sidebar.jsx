import React, { useState, useEffect } from "react";
import { Settings, CircleHelp, UtensilsCrossed, Sparkles, ArrowUpRight, MoreHorizontal, X, LayoutDashboard, ShoppingBag, Users, Package, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ open, close }) {
  const [orderCount, setOrderCount] = useState("0");

  // Fetch real-time order count from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrderCount(data.length.toString());
        }
      })
      .catch((err) => {
        console.error("Error fetching order count for sidebar:", err);
      });
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/dashboard/orders", icon: ShoppingBag, count: orderCount },
    { name: "Products", path: "/dashboard/products", icon: Package },
    { name: "Customers", path: "/dashboard/customers", icon: Users },
    { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {open && <button aria-label="Close navigation overlay" onClick={close} className="fixed inset-0 z-40 bg-black/60 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.07] bg-[#0a0f1e] transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[82px] items-center justify-between border-b border-white/[0.07] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
              <UtensilsCrossed size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Swad<span className="text-orange-500">Panel</span></h1>
              <p className="text-[10px] tracking-[0.2em] text-gray-500">ADMIN CONSOLE</p>
            </div>
          </div>
          <button onClick={close} className="text-gray-400 lg:hidden"><X size={20} /></button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-500">WORKSPACE</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  end={item.path === "/dashboard"}
                  key={item.name} 
                  to={item.path}
                  onClick={close} 
                  className={({ isActive }) => `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive ? "border border-orange-500/20 bg-orange-500/10 font-semibold text-orange-400" : "text-gray-400 hover:bg-white/[0.04] hover:text-white"}`}
                >
                  <Icon size={19} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.count !== undefined && <span className="rounded-md bg-orange-500/20 px-2 py-0.5 text-xs text-orange-400">{item.count}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="px-4 pt-8">
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-gray-500">PREFERENCES</p>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white">
            <CircleHelp size={19} /> Help Center
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.08] to-transparent p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400"><Sparkles size={18} /></div>
            <p className="text-sm font-semibold text-white">Need more insights?</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">Explore your business performance and grow smarter.</p>
            <NavLink to="/dashboard/analytics" onClick={close} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600">Explore Analytics <ArrowUpRight size={14} /></NavLink>
          </div>
          <button className="mt-4 flex w-full items-center gap-3 rounded-xl border border-white/[0.07] p-3 text-left transition hover:bg-white/[0.03]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-600 font-bold text-white">A</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">Admin User</p>
              <p className="truncate text-xs text-gray-500">admin@swadgrill.com</p>
            </div>
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>
      </aside>
    </>
  );
}