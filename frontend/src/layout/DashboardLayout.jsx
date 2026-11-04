import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1e] font-sans text-gray-100 selection:bg-orange-500 selection:text-white flex overflow-hidden">
      
      {/* Sidebar Component */}
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] transition-all duration-300 h-screen overflow-hidden">
        
        {/* Topbar Component */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Dynamic Pages Area */}
        <main className="flex-1 overflow-y-auto bg-[#0a0f1e]">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;