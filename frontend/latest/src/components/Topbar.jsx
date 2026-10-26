import { useState } from "react";
import { Search, Bell, Menu, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar({ setSidebarOpen }) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  
  // Extract page name from URL
  const getPageName = () => {
    const path = location.pathname.split('/').pop();
    if (path === "dashboard" || path === "") return "Overview";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const activePage = getPageName();

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0a0f1e]/95 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} aria-label="Open navigation" className="rounded-lg border border-white/10 p-2 text-gray-300 lg:hidden"><Menu size={20} /></button>
        <div className="min-w-0">
          <p className="truncate text-xs text-gray-500">Workspace / <span className="text-orange-400">{activePage}</span></p>
          <h2 className="mt-1 truncate text-lg font-bold sm:text-xl">{activePage}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-[#101a2f] px-3 py-2.5 md:flex">
          <Search size={17} className="text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." className="w-32 bg-transparent text-xs outline-none text-white placeholder:text-gray-500 lg:w-40" />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">⌘ K</kbd>
        </div>
        <div className="relative">
          <button aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-xl border border-white/[0.08] p-2.5 text-gray-400 transition hover:bg-white/[0.05] hover:text-white">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-[#0a0f1e] bg-orange-500" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-white/10 bg-[#101a2f] p-4 shadow-2xl">
              <p className="font-semibold text-white">Notifications</p>
              <p className="mt-3 text-sm text-gray-400">You have 12 orders awaiting review.</p>
              <button onClick={() => setShowNotifications(false)} className="mt-3 text-sm font-semibold text-orange-400 hover:text-orange-300">View orders →</button>
            </div>
          )}
        </div>
        <div className="hidden h-8 w-px bg-white/10 sm:block" />
        <button className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-white/[0.04]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 text-sm font-bold text-white">A</div>
          <div className="hidden text-left sm:block"><p className="text-xs font-semibold text-white">Admin</p><p className="text-[10px] text-gray-500">Super Admin</p></div>
          <ChevronDown size={15} className="hidden text-gray-500 sm:block" />
        </button>
      </div>
    </header>
  );
}