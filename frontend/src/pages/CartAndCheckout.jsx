import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Flame,
  Clock,
  Sparkles,
  UtensilsCrossed,
  ChefHat,
  PackageCheck,
  ShoppingBag,
  CreditCard,
  Leaf,
  X,
} from "lucide-react";

const photo = (id, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const money = (amount) => "৳" + amount.toLocaleString("en-BD");

const inputClass =
  "mt-2.5 w-full rounded-xl border border-white/[0.09] bg-[#0c1424] px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/[0.08]";

const initialCustomer = {
  name: "",
  phone: "",
  address: "",
  notes: "",
  delivery: "home",
};

function SectionLabel({ children }) {
  return (
    <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-orange-400 sm:text-xs">
      <span className="h-px w-6 bg-orange-500" />
      {children}
    </p>
  );
}

function QuantityControl({ qty, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a1020] p-1.5">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-orange-500 hover:text-white"
      >
        <Minus size={13} />
      </button>

      <span className="min-w-4 text-center text-xs font-bold text-white">
        {qty}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-orange-500 hover:text-white"
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

function OrderTotals({ subtotal, deliveryFee, total }) {
  return (
    <div className="space-y-4 border-t border-white/[0.08] pt-5">
      <div className="flex justify-between text-sm text-slate-400">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm text-slate-400">
        <span>Delivery fee</span>
        <span className={deliveryFee === 0 ? "text-emerald-400" : "text-white"}>
          {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-5">
        <div>
          <p className="text-sm font-semibold text-white">Grand total</p>
          <p className="mt-1 text-[10px] text-slate-500">
            {deliveryFee === 0 ? "No delivery charge" : "Including delivery"}
          </p>
        </div>

        <p className="font-serif text-3xl font-bold tracking-tight text-orange-400">
          {money(total)}
        </p>
      </div>
    </div>
  );
}

export default function CartAndCheckout() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("swad-grill-cart");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [page, setPage] = useState("checkout"); 
  const [notice, setNotice] = useState("");
  const [customer, setCustomer] = useState(initialCustomer);
  const [reference, setReference] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("swad-grill-cart", JSON.stringify(cart));
    } catch {
      // Cart remains usable if browser storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const quantity = cart.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee =
    subtotal === 0 || customer.delivery === "pickup" ? 0 : 60;

  const total = subtotal + deliveryFee;

  const addItem = (dish) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === dish.id);

      if (existing) {
        return items.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...items, { ...dish, qty: 1 }];
    });
  };

  const changeQty = (id, change) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    setNotice("Item removed from cart");
  };

  const updateCustomer = (event) => {
    const { name, value } = event.target;
    setCustomer((previous) => ({ ...previous, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes,
      deliveryMethod: customer.delivery,
      items: cart.map((item) => `${item.name} (x${item.qty})`).join(", "),
      totalPrice: total,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setReference("SG-" + data.insertedId.slice(-6).toUpperCase());
          setPage("success");
          window.scrollTo({ top: 0, behavior: "smooth" });

          setCart([]);
          localStorage.removeItem("swad-grill-cart");
        }
      })
      .catch((err) => {
        console.warn("Backend not found. Running in Demo Mode.");
        // Demo mode success (for marketplace preview)
        setReference("SG-" + Math.floor(100000 + Math.random() * 900000));
        setPage("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCart([]);
        localStorage.removeItem("swad-grill-cart");
      });
  };

  const resetOrder = () => {
    setCart([]);
    setCustomer(initialCustomer);
    setReference("");
    window.location.href = "/menu";
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d18] font-sans text-slate-200 selection:bg-orange-500/30">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-48 top-40 h-96 w-96 rounded-full bg-orange-600/[0.06] blur-[130px]" />
        <div className="absolute -right-48 top-[45%] h-96 w-96 rounded-full bg-amber-500/[0.04] blur-[130px]" />
      </div>

      {/* Toast notification */}
      {notice && (
        <div
          role="status"
          className="fixed right-4 top-5 z-50 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-orange-500/25 bg-[#111a2c] px-4 py-3.5 text-sm text-white shadow-2xl shadow-black/40 sm:right-8"
        >
          <CheckCircle2 size={19} className="shrink-0 text-orange-400" />
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-2 text-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative border-b border-white/[0.08] bg-[#0c1423]">
        <div className="absolute inset-0 opacity-[0.12]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${photo(
                "photo-1555939594-58d7cb561ad1",
                1500
              )}")`,
            }}
          />
          <div className="absolute inset-0 bg-[#080d18]/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <Link to="/" className="group flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                <Flame size={26} />
              </span>
              <span>
                <span className="block font-serif text-xl font-black tracking-wide text-white">
                  SWAD <span className="text-orange-500">GRILL</span>
                </span>
                <span className="mt-1 block text-[9px] tracking-[0.23em] text-slate-500">
                  THE ART OF CHARCOAL
                </span>
              </span>
            </Link>

            <Link
              to="/menu"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-orange-500/40 hover:text-orange-400"
            >
              <UtensilsCrossed size={15} />
              Explore Menu
            </Link>
          </div>

          <div className="mt-12 max-w-3xl sm:mt-16">
            <SectionLabel>GOOD FOOD. GREAT MOMENTS.</SectionLabel>

            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {page === "checkout" && (
                <>
                  One Step
                  <br />
                  <span className="italic text-orange-500">From Delicious.</span>
                </>
              )}

              {page === "success" && (
                <>
                  Made With Fire.
                  <br />
                  <span className="italic text-orange-500">Ordered With Love.</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {page === "checkout" &&
                "Your handpicked favourites are almost ready. Just a few details and your order is complete."}
              {page === "success" &&
                "Thank you for choosing Swad Grill. Here is a summary of your order."}
            </p>
          </div>
        </div>
      </section>

      {/* CHECKOUT PAGE */}
      {page === "checkout" && (
        <section className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-14">
          <Link
            to="/menu"
            className="mb-8 inline-flex items-center gap-2 rounded-lg text-xs font-semibold text-slate-400 transition hover:text-orange-400"
          >
            <ArrowLeft size={16} />
            BACK TO MENU
          </Link>

          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
            <div>
              <SectionLabel>ALMOST READY</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
                Delivery Details<span className="text-orange-500">.</span>
              </h2>

              <form onSubmit={placeOrder} className="mt-8 space-y-6">
                <div className="rounded-2xl border border-white/[0.08] bg-[#101827] p-5 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <User size={19} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">
                        Personal Information
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Who are we preparing this order for?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <label className="block text-xs font-medium text-slate-300">
                      Full Name <span className="text-orange-400">*</span>
                      <div className="relative">
                        <User
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                          required
                          minLength={2}
                          name="name"
                          value={customer.name}
                          onChange={updateCustomer}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </label>

                    <label className="block text-xs font-medium text-slate-300">
                      Phone Number <span className="text-orange-400">*</span>
                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={customer.phone}
                          onChange={updateCustomer}
                          placeholder="01XXXXXXXXX"
                          autoComplete="tel"
                          className={`${inputClass} pl-11`}
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#101827] p-5 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <Truck size={19} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">
                        Delivery Preferences
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Choose how you want to receive your order.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        value: "home",
                        title: "Home Delivery",
                        desc: "Delivered to your address",
                        price: "৳60 fee",
                        Icon: Truck,
                      },
                      {
                        value: "pickup",
                        title: "Restaurant Pickup",
                        desc: "Collect it yourself",
                        price: "FREE",
                        Icon: ShoppingBag,
                      },
                    ].map(({ value, title, desc, price, Icon }) => {
                      const active = customer.delivery === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setCustomer((prev) => ({
                              ...prev,
                              delivery: value,
                            }))
                          }
                          className={`rounded-xl border p-4 text-left transition ${
                            active
                              ? "border-orange-500/60 bg-orange-500/[0.07]"
                              : "border-white/[0.08] bg-[#0c1424] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon
                              size={21}
                              className={
                                active ? "text-orange-400" : "text-slate-500"
                              }
                            />
                            <span
                              className={`h-4 w-4 rounded-full border ${
                                active
                                  ? "border-orange-500 bg-orange-500 ring-2 ring-orange-500/20"
                                  : "border-slate-600"
                              }`}
                            />
                          </div>
                          <p className="mt-4 text-sm font-semibold text-white">
                            {title}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-500">
                            {desc}
                          </p>
                          <p
                            className={`mt-3 text-xs font-bold ${
                              active ? "text-orange-400" : "text-slate-400"
                            }`}
                          >
                            {price}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {customer.delivery === "home" && (
                    <label className="mt-6 block text-xs font-medium text-slate-300">
                      Delivery Address{" "}
                      <span className="text-orange-400">*</span>
                      <div className="relative">
                        <MapPin
                          size={17}
                          className="absolute left-4 top-4 text-slate-500"
                        />
                        <textarea
                          required
                          minLength={5}
                          name="address"
                          value={customer.address}
                          onChange={updateCustomer}
                          rows={3}
                          placeholder="House, road, area and city"
                          className={`${inputClass} resize-y pl-11`}
                        />
                      </div>
                    </label>
                  )}

                  <label className="mt-5 block text-xs font-medium text-slate-300">
                    Special Instructions{" "}
                    <span className="text-slate-500">(Optional)</span>
                    <textarea
                      name="notes"
                      value={customer.notes}
                      onChange={updateCustomer}
                      rows={3}
                      placeholder="Extra spicy, no onions, or other requests..."
                      className={`${inputClass} resize-y`}
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.045] p-5">
                  <div className="flex items-start gap-3">
                    <CreditCard
                      size={20}
                      className="mt-0.5 shrink-0 text-orange-400"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Payment on Delivery
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-slate-400">
                        Cash on Delivery is available for your order. You can pay when you receive the food.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className={`flex w-full items-center justify-center gap-3 rounded-xl py-4 text-xs font-bold tracking-[0.12em] text-white shadow-xl transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
                    cart.length === 0
                      ? "bg-slate-700 cursor-not-allowed opacity-70"
                      : "bg-orange-500 shadow-orange-950/20 hover:bg-orange-400"
                  }`}
                >
                  PLACE ORDER
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

            {/* CHECKOUT SUMMARY */}
            <aside className="h-fit overflow-hidden rounded-2xl border border-white/10 bg-[#101827] lg:sticky lg:top-24">
              <div className="border-b border-white/[0.08] p-5 sm:p-6">
                <SectionLabel>YOUR SELECTION</SectionLabel>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                  Order Summary
                </h3>
              </div>

              <div className="p-5 sm:p-6">
                <div className="space-y-5">
                  {cart.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-5">Your cart is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 rounded-xl object-cover bg-slate-800"
                          />
                          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-bold text-white">
                            {item.qty}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold leading-5 text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-500">
                            {money(item.price)} each
                          </p>
                        </div>

                        <p className="shrink-0 text-xs font-bold text-orange-400">
                          {money(item.price * item.qty)}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6">
                  <OrderTotals
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    total={total}
                  />
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#0a1020] p-4">
                  <Clock
                    size={18}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Prepared fresh
                    </p>
                    <p className="mt-1 text-[10px] leading-5 text-slate-500">
                      Estimated preparation time is usually 30-45 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* SUCCESS PAGE */}
      {page === "success" && (
        <section className="relative mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-14 text-center sm:py-20">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/[0.08]">
            <div className="absolute inset-2 rounded-full border border-orange-500/15" />
            <CheckCircle2 size={43} className="text-orange-400" />
          </div>

          <SectionLabel>SWAD GRILL</SectionLabel>

          <h2 className="mt-5 font-serif text-3xl font-bold text-white sm:text-5xl">
            Thank You, <span className="text-orange-400">{customer.name}!</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
            Your order has been successfully placed and is now being prepared by our chefs.
          </p>

          <div className="mt-9 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#101827] text-left">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] p-5 sm:p-6">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-slate-500">
                  ORDER REFERENCE
                </p>
                <p className="mt-2 font-bold tracking-wider text-orange-400">
                  {reference}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <PackageCheck size={23} />
              </span>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-slate-400">Total items</span>
                <span className="font-semibold text-white">{quantity}</span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-slate-400">Delivery method</span>
                <span className="text-right font-semibold text-white">
                  {customer.delivery === "pickup"
                    ? "Restaurant Pickup"
                    : "Home Delivery"}
                </span>
              </div>

              {customer.delivery === "home" && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-400">Address</span>
                  <span className="max-w-[65%] text-right text-slate-300">
                    {customer.address}
                  </span>
                </div>
              )}

              <OrderTotals
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
              />
            </div>

            <div className="flex items-start gap-3 border-t border-orange-500/15 bg-orange-500/[0.04] p-5">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-orange-400"
              />
              <p className="text-[10px] leading-5 text-slate-400">
                Your order is confirmed. You will receive a call shortly for confirmation.
              </p>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={resetOrder}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-4 text-xs font-bold tracking-wider text-white transition hover:bg-orange-400"
            >
              <ShoppingBag size={16} />
              ORDER MORE FOOD
            </button>

            <Link
              to="/dashboard/orders"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-7 py-4 text-xs font-bold text-slate-300 transition hover:border-orange-500/40 hover:text-orange-400"
            >
              VIEW DASHBOARD
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}