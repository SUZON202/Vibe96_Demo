import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Flame,
  ChefHat,
  ArrowRight,
  UtensilsCrossed,
  X,
  SlidersHorizontal,
  Star,
  Clock,
  Sparkles,
  Leaf,
  RotateCcw,
  Coffee
} from "lucide-react";

const CHECKOUT_PATH = "/cart-checkout";

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Starters", icon: "🥗" },
  { name: "Grill & BBQ", icon: "🔥" },
  { name: "Mains & Salads", icon: "🍛" },
  { name: "Beverages", icon: "🍹" },
];

const menuItems = [
  {
    id: 1,
    category: "Grill & BBQ",
    name: "Saffron Chicken Kebab",
    price: 1450,
    desc: "Tender chicken pieces marinated in yogurt, lemon, and premium saffron, grilled over open flames.",
    tags: ["Signature"],
    image: "https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.9",
    time: "20–25 min",
  },
  {
    id: 2,
    category: "Grill & BBQ",
    name: "Classic Beef Koobideh",
    price: 1650,
    desc: "Two skewers of juicy minced beef blended with traditional Persian spices and grated onions.",
    tags: ["Popular"],
    image: "https://images.pexels.com/photos/11115801/pexels-photo-11115801.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.8",
    time: "15–20 min",
  },
  {
    id: 3,
    category: "Grill & BBQ",
    name: "Charcoal Mutton Ribs",
    price: 2490,
    desc: "Premium mutton ribs slow-cooked and glazed with our secret smoky BBQ sauce.",
    tags: ["Chef's Pick"],
    image: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "5.0",
    time: "25–35 min",
  },
  {
    id: 4,
    category: "Grill & BBQ",
    name: "Persian Lamb Chops",
    price: 2800,
    desc: "Perfectly charred lamb chops marinated in garlic, olive oil, and fresh rosemary.",
    tags: ["Signature"],
    image: "https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.9",
    time: "20–30 min",
  },
  {
    id: 5,
    category: "Starters",
    name: "Smoky BBQ Wings",
    price: 850,
    desc: "Crispy chicken wings tossed in a rich, smoky, and slightly spicy charcoal sauce.",
    tags: ["Spicy"],
    image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.7",
    time: "15–20 min",
  },
  {
    id: 6,
    category: "Starters",
    name: "Classic Hummus & Pita",
    price: 550,
    desc: "Creamy homemade hummus drizzled with extra virgin olive oil, served with warm pita bread.",
    tags: ["Vegetarian"],
    image: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.8",
    time: "5–10 min",
  },
  {
    id: 7,
    category: "Starters",
    name: "Stuffed Grape Leaves",
    price: 450,
    desc: "Tender grape leaves filled with aromatic rice, fresh herbs and lemon.",
    tags: ["Vegetarian"],
    image: "https://images.pexels.com/photos/4398188/pexels-photo-4398188.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.6",
    time: "10–15 min",
  },
  {
    id: 8,
    category: "Mains & Salads",
    name: "Persian Shirazi Salad",
    price: 420,
    desc: "A refreshing mix of diced cucumbers, tomatoes, and red onions with a zesty lemon-mint dressing.",
    tags: ["Fresh"],
    image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.7",
    time: "5–10 min",
  },
  {
    id: 9,
    category: "Mains & Salads",
    name: "Grilled Salmon Salad",
    price: 1850,
    desc: "Fresh Atlantic salmon grilled to perfection, served over a colorful Mediterranean salad.",
    tags: ["Fresh"],
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.9",
    time: "20–25 min",
  },
  {
    id: 10,
    category: "Mains & Salads",
    name: "Signature Beef Steak",
    price: 2200,
    desc: "Flavorful grilled steak paired with seasonal vegetables and garlic herb butter.",
    tags: ["Signature"],
    // This image link has been changed
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
    rating: "4.9",
    time: "25–30 min",
  },
  {
    id: 11,
    category: "Beverages",
    name: "Mint Lemonade Cooler",
    price: 350,
    desc: "A thirst-quenching blend of freshly squeezed lemons, crushed mint leaves, and a hint of honey.",
    tags: ["Fresh"],
    image: "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.8",
    time: "5 min",
  },
  {
    id: 12,
    category: "Beverages",
    name: "Saffron Rose Tea",
    price: 250,
    desc: "Traditional hot tea brewed with premium saffron threads and a touch of rose water.",
    tags: ["Popular"],
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=700",
    rating: "4.9",
    time: "5–10 min",
  },
];

const money = (amount) => `৳${amount.toLocaleString("en-US")}`;

const tagStyle = {
  Vegetarian: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  Fresh: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  Popular: "text-orange-300 bg-orange-400/10 border-orange-400/20",
  Spicy: "text-red-300 bg-red-400/10 border-red-400/20",
  "Chef's Pick": "text-amber-300 bg-amber-400/10 border-amber-400/20",
  Signature: "text-purple-300 bg-purple-400/10 border-purple-400/20",
};

function MenuCard({ item, qty, onAdd, onRemove }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#10182a] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/20">
      <div className="relative h-56 overflow-hidden bg-slate-800 sm:h-64">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.opacity = "0.35";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#10182a] via-black/5 to-black/20" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {item.tags[0] && (
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                tagStyle[item.tags[0]] ||
                "border-white/20 bg-black/30 text-white"
              }`}
            >
              {item.tags[0]}
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {item.rating}
        </div>

        <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-[#0a0f1e]/90 px-4 py-2.5 shadow-xl backdrop-blur-md">
          <span className="text-xl font-extrabold text-orange-400">
            {money(item.price)}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-medium text-white/90">
          <Clock size={13} className="text-orange-300" />
          {item.time}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">
          {item.category}
        </p>

        <h3 className="font-serif text-xl font-bold text-white transition-colors group-hover:text-orange-400 sm:text-2xl">
          {item.name}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
          {item.desc}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            {item.category === "Beverages" ? (
               <Coffee size={15} className="text-orange-500" />
            ) : (
               <Flame size={15} className="text-orange-500" />
            )}
            {item.category === "Beverages" ? "Freshly made" : "Charcoal grilled"}
          </span>

          {qty === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-xs font-extrabold tracking-wide text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95"
            >
              <Plus size={15} />
              ADD TO ORDER
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full border border-orange-500/40 bg-orange-500/10 p-1">
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove one ${item.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-orange-500/20"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-4 text-center text-sm font-bold text-orange-400">
                {qty}
              </span>

              <button
                type="button"
                onClick={onAdd}
                aria-label={`Add one ${item.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-orange-500/20"
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Menu() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [cart, setCart] = useState({});

  const add = (id) => {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  };

  const remove = (id) => {
    setCart((previous) => {
      const next = { ...previous };

      if ((next[id] || 0) <= 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }

      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setActive("All");
    setSortOrder("default");
  };

  const visibleItems = useMemo(() => {
    const search = query.trim().toLowerCase();

    const result = menuItems.filter((item) => {
      const matchesCategory =
        active === "All" || item.category === active;

      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.desc.toLowerCase().includes(search) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search));

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [active, query, sortOrder]);

  const itemCount = Object.values(cart).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const total = menuItems.reduce(
    (sum, item) => sum + item.price * (cart[item.id] || 0),
    0
  );

  useEffect(() => {
    const cartArray = menuItems
      .filter((item) => cart[item.id])
      .map((item) => ({
        ...item,
        qty: cart[item.id],
      }));
    localStorage.setItem("swad-grill-cart", JSON.stringify(cartArray));
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#0a0f1e] pb-32 font-sans text-slate-200">
      {/* HERO SECTION */}
      <header className="relative isolate overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-orange-500/15 blur-[110px]" />
          <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-amber-500/[0.08] blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.08),transparent_50%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-32">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-orange-400 sm:text-xs">
              The Swad Grill Experience
            </span>
            <Sparkles size={15} className="text-orange-400" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h1 className="font-serif text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl">
                A Taste of
                <br />
                <span className="italic text-orange-500">
                  Fire & Flavor.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Discover handcrafted dishes, bold spices and the
                irresistible taste of charcoal-grilled perfection.
                Every plate is made to bring people together.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#our-menu"
                  className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-950/20 transition-all hover:-translate-y-1 hover:bg-orange-600"
                >
                  Explore Our Menu
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="rounded-full bg-orange-500/15 p-2 text-orange-400">
                    <ChefHat size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Made with passion
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Fresh ingredients, bold flavors
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-7 border-t border-white/10 pt-7">
                <div>
                  <p className="font-serif text-3xl font-bold text-white">
                    12<span className="text-orange-500">+</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Signature dishes
                  </p>
                </div>

                <div className="h-12 w-px bg-white/10" />

                <div>
                  <p className="flex items-center gap-1.5 font-serif text-3xl font-bold text-white">
                    4.9
                    <Star
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Guest favorite
                  </p>
                </div>

                <div className="h-12 w-px bg-white/10" />

                <div>
                  <p className="font-serif text-3xl font-bold text-white">
                    100%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Made with care
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -inset-4 rotate-3 rounded-[2rem] border border-orange-500/20" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10182a] p-2 shadow-2xl shadow-black/40">
                <img
                  src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Swad Grill charcoal barbecue platter"
                  fetchPriority="high"
                  className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[390px]"
                />

                <div className="absolute inset-x-2 bottom-2 rounded-b-[1.5rem] bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 pb-6 pt-20">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-200">
                        <Flame size={12} />
                        Signature Grill
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                        The Art of Fire
                      </h2>
                      <p className="mt-2 text-sm text-slate-300">
                        Smoky. Juicy. Unforgettable.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/20 bg-black/40 p-3 text-orange-400 backdrop-blur-md">
                      <UtensilsCrossed size={25} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-3 top-8 hidden rounded-2xl border border-white/10 bg-[#151d30] p-4 shadow-xl sm:block md:-left-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
                    <Leaf size={21} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Fresh Ingredients
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Quality in every bite
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MENU SECTION */}
      <main
        id="our-menu"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 pt-16 sm:px-8 md:pt-24"
      >
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              <span className="h-px w-7 bg-orange-500" />
              Explore the Flavors
            </div>

            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Our{" "}
              <span className="italic text-orange-500">
                Menu
              </span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              From delicious starters to smoky signature grills,
              discover the dishes made to satisfy every craving.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 md:self-auto">
            <div className="rounded-xl bg-orange-500/15 p-3 text-orange-400">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                {visibleItems.length} dishes
              </p>
              <p className="text-xs text-slate-500">
                Made fresh to order
              </p>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8 rounded-3xl border border-white/[0.08] bg-[#10182a] p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActive(category.name)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all ${
                    active === category.name
                      ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/15"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-orange-500/50 hover:text-white"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center">
              <label className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes, ingredients..."
                  aria-label="Search dishes"
                  className="w-full rounded-full border border-white/10 bg-[#0a0f1e] py-3.5 pl-12 pr-11 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-orange-500"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                  >
                    <X size={17} />
                  </button>
                )}
              </label>

              <label className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0f1e] px-4">
                <SlidersHorizontal
                  size={17}
                  className="shrink-0 text-orange-400"
                />

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  aria-label="Sort dishes by price"
                  className="w-full bg-transparent py-3.5 text-sm text-slate-300 outline-none sm:w-auto"
                >
                  <option className="bg-[#10182a]" value="default">
                    Featured
                  </option>
                  <option className="bg-[#10182a]" value="low">
                    Price: Low to High
                  </option>
                  <option className="bg-[#10182a]" value="high">
                    Price: High to Low
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            Showing{" "}
            <span className="font-bold text-white">
              {visibleItems.length}
            </span>{" "}
            {visibleItems.length === 1 ? "dish" : "dishes"}
          </p>

          {(query || active !== "All" || sortOrder !== "default") && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 transition-colors hover:text-orange-300"
            >
              <RotateCcw size={14} />
              Reset filters
            </button>
          )}
        </div>

        {/* FOOD CARDS */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                qty={cart[item.id] || 0}
                onAdd={() => add(item.id)}
                onRemove={() => remove(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#10182a] px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
              <Search size={30} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-white">
              No dishes found
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              We couldn't find a dish matching your search.
              Try another keyword or explore our full menu.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
            >
              <RotateCcw size={15} />
              Show All Dishes
            </button>
          </div>
        )}

        {/* BOTTOM PROMO */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-orange-500/20 bg-[#10182a] p-7 sm:p-10 md:mt-20 md:p-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-[80px]" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-300">
                <Sparkles size={14} />
                Your next favorite meal awaits
              </div>

              <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                Great food brings
                <span className="italic text-orange-500">
                  {" "}people together.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Explore our selection of freshly prepared dishes and
                find something special for your next meal.
              </p>
            </div>

            <a
              href="#our-menu"
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-orange-500/40 px-6 py-4 text-sm font-bold text-orange-300 transition-all hover:bg-orange-500 hover:text-white"
            >
              Find Your Favorite
              <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>

      {/* FLOATING ORDER BAR */}
      {itemCount > 0 && (
        <div className="fixed inset-x-3 bottom-4 z-40 sm:bottom-6 sm:inset-x-0">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-white/15 bg-[#151d30]/95 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl sm:rounded-full sm:px-6">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your order
              </p>
              <p className="mt-1 text-lg font-extrabold text-orange-400">
                {money(total)}
              </p>
            </div>

            <Link
              to={CHECKOUT_PATH}
              state={{
                items: menuItems
                  .filter((item) => cart[item.id])
                  .map((item) => ({
                    ...item,
                    qty: cart[item.id],
                  })),
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-3.5 text-xs font-extrabold tracking-wide text-white transition-all hover:bg-orange-600 sm:px-7 sm:text-sm"
            >
              REVIEW ORDER
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}