import React from "react";
import { TrendingUp, DollarSign, ShoppingBag, Users, BarChart3 } from "lucide-react";

export default function Analytics() {
  const stats = [
    { title: "Total Revenue", value: "$48,294", change: "+12.8%", icon: DollarSign },
    { title: "Total Orders", value: "2,840", change: "+8.2%", icon: ShoppingBag },
    { title: "Active Customers", value: "1,864", change: "+16.4%", icon: Users },
    { title: "Growth Rate", value: "24.5%", change: "+4.1%", icon: TrendingUp },
  ];

  return (
    <div className="mx-auto max-w-[1200px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Analytics & Reports</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor your restaurant's performance metrics and growth insights.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">{stat.title}</span>
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <span className="inline-flex items-center text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Revenue Statistics</h3>
            <BarChart3 className="text-gray-400" size={20} />
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.08] rounded-xl text-gray-500 text-sm">
            Interactive Revenue Chart & Graph Overview
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <h3 className="text-lg font-bold text-white">Top Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Grill Items</span>
              <span className="text-orange-400 font-semibold">45%</span>
            </div>
            <div className="w-full bg-[#0a0f1e] h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[45%]"></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Fast Food & Burgers</span>
              <span className="text-orange-400 font-semibold">30%</span>
            </div>
            <div className="w-full bg-[#0a0f1e] h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[30%]"></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Beverages & Desserts</span>
              <span className="text-orange-400 font-semibold">25%</span>
            </div>
            <div className="w-full bg-[#0a0f1e] h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[25%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}