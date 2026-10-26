import React from "react";
import { Users } from "lucide-react";

export default function Customers() {
  // Dummy customer data
  const customers = [
    { id: "1", name: "Shafiq Suzon", email: "shafiq@swadgrill.com", role: "Admin", joined: "Oct 2026" },
    { id: "2", name: "Rahim Ahmed", email: "rahim@gmail.com", role: "Customer", joined: "Oct 2026" },
    { id: "3", name: "Karim Ullah", email: "karim@gmail.com", role: "Customer", joined: "Sep 2026" }
  ];

  return (
    <div className="mx-auto max-w-[1200px] space-y-7 p-4 sm:p-7 lg:p-9 pb-12">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
          <Users size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all registered customers and user roles.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[#101a2f] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0a0f1e] text-xs uppercase text-gray-400 border-b border-white/[0.08]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-6 py-4 font-medium text-white">{cust.id}</td>
                  <td className="px-6 py-4">{cust.name}</td>
                  <td className="px-6 py-4 text-gray-400">{cust.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400">
                      {cust.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{cust.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}