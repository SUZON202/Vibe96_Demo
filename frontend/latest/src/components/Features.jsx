import React from "react";
import { ShieldCheck, QrCode, Smartphone, Sparkles } from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <Smartphone size={34} />,
      title: "Seamless Online Ordering",
      description:
        "Give your customers a smooth ordering experience with our intuitive cart system and real-time order tracking.",
      badge: "Popular",
    },
    {
      id: 2,
      icon: <QrCode size={34} />,
      title: "Smart Digital QR Menu",
      description:
        "Modernize your dine-in experience. Customers can simply scan the QR code on their table to browse and order.",
      badge: "Trending",
    },
    {
      id: 3,
      icon: <ShieldCheck size={34} />,
      title: "Role-Based SwadPanel",
      description:
        "Powerful admin dashboard with secure, role-based access control for Admins, Managers, and Staff.",
      badge: "Secure",
    },
  ];

  return (
    <section className="bg-[#0a0f1e] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Sparkles size={16} />
            Why Choose Swad Grill
          </div>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-5xl">
            Everything you need to <br className="hidden sm:block" />
            <span className="italic text-orange-500">manage your restaurant.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#10182a] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/20"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/10 blur-[60px] transition-all duration-500 group-hover:bg-orange-500/20" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400 transition-transform duration-500 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  {feature.icon}
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    {feature.badge}
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}