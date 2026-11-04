import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Store, Bell, Save, CreditCard } from "lucide-react";

export default function Settings() {
  const [storeName, setStoreName] = useState("Swad Grill");
  const [currency, setCurrency] = useState("USD ($)");
  const [adminName, setAdminName] = useState("Shafiq Suzon");
  const [adminEmail, setAdminEmail] = useState("admin@swadgrill.com");
  const [notifications, setNotifications] = useState(true);
  const [stripePublishableKey, setStripePublishableKey] = useState("");
  const [stripeSecretKey, setStripeSecretKey] = useState("");

  // Fetch previously saved settings and Stripe keys from the database when the page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.storeName) setStoreName(data.storeName);
          if (data.currency) setCurrency(data.currency);
          if (data.adminName) setAdminName(data.adminName);
          if (data.adminEmail) setAdminEmail(data.adminEmail);
          if (data.notifications !== undefined) setNotifications(data.notifications);
          setStripePublishableKey(data.stripePublishableKey || "");
          setStripeSecretKey(data.stripeSecretKey || "");
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const settingsData = {
      storeName,
      currency,
      adminName,
      adminEmail,
      notifications,
      stripePublishableKey,
      stripeSecretKey,
    };

    // API call to save settings to the backend
    fetch("http://localhost:5000/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Settings and Stripe Keys updated successfully!");
        } else {
          alert("Failed to update settings.");
        }
      })
      .catch((err) => {
        console.error("Error saving settings:", err);
        alert("Failed to update settings. Check backend connection.");
      });
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/25">
          <SettingsIcon size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-gray-400">Manage your restaurant preferences, profile, and system configuration.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Information */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
            <Store className="text-orange-400" size={20} />
            <h3 className="text-lg font-bold text-white">Restaurant Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Restaurant Name</label>
              <input 
                type="text" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="BDT (৳)">BDT (৳)</option>
                <option value="EUR (€)">EUR (€)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
            <User className="text-orange-400" size={20} />
            <h3 className="text-lg font-bold text-white">Admin Profile</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Admin Name</label>
              <input 
                type="text" 
                value={adminName} 
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Admin Email</label>
              <input 
                type="email" 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway (Stripe) */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
            <CreditCard className="text-orange-400" size={20} />
            <h3 className="text-lg font-bold text-white">Payment Gateway (Stripe Configuration)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Stripe Publishable Key</label>
              <input 
                type="text" 
                value={stripePublishableKey} 
                onChange={(e) => setStripePublishableKey(e.target.value)}
                placeholder="pk_test_..." 
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Stripe Secret Key</label>
              <input 
                type="password" 
                value={stripeSecretKey} 
                onChange={(e) => setstripeSecretKey(e.target.value)}
                placeholder="sk_test_..." 
                className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f1e] px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
            <Bell className="text-orange-400" size={20} />
            <h3 className="text-lg font-bold text-white">Notifications & Security</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">Order Notifications</h4>
              <p className="text-xs text-gray-400">Receive alerts when a new customer order is placed.</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-orange-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}