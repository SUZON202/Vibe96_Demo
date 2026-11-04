import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  ChefHat,
  Clock,
  Star,
  Award,
  Heart,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Quote,
} from "lucide-react";
// Features কম্পোনেন্টটি ইমপোর্ট করা হলো
import Features from "../components/Features";

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const dishes = [
  {
    name: "Signature Beef Steak",
    category: "HOUSE SIGNATURE",
    price: 2200,
    rating: "4.9",
    desc: "Perfectly grilled beef steak with seasonal vegetables and rich house sauce.",
    image: photo("photo-1558030006-450675393462", 700),
  },
  {
    name: "Spicy Grilled Chicken",
    category: "GUEST FAVORITE",
    price: 450,
    rating: "4.8",
    desc: "Tender chicken marinated in bold spices and finished over open charcoal.",
    image:
      "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  {
    name: "Mixed Kebab Platter",
    category: "CHEF'S SPECIAL",
    price: 550,
    rating: "4.9",
    desc: "A generous platter of smoky kebabs, fresh salad and our signature chutney.",
    image: photo("photo-1561758033-d89a9ad46330", 700),
  },
  {
    name: "Charcoal Mutton Ribs",
    category: "PREMIUM GRILL",
    price: 2490,
    rating: "5.0",
    desc: "Slow-cooked mutton ribs glazed with our unforgettable smoky BBQ sauce.",
    image: photo("photo-1544025162-d76694265947", 700),
  },
];

const featuresList = [
  {
    icon: Flame,
    number: "01",
    title: "Real Charcoal Fire",
    text: "Every grill carries the unmistakable smoky flavor of real charcoal.",
  },
  {
    icon: ChefHat,
    number: "02",
    title: "Crafted by Chefs",
    text: "Passionate chefs turn fresh ingredients into unforgettable meals.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Made with Love",
    text: "From our signature marinades to the final plate, quality comes first.",
  },
  {
    icon: Clock,
    number: "04",
    title: "Fresh Every Day",
    text: "Fresh ingredients, careful preparation and food served at its best.",
  },
];

const testimonials = [
  {
    name: "A Happy Guest",
    occasion: "DINING EXPERIENCE",
    rating: 5,
    text: "The smoky flavor of the grilled food was fantastic. Everything arrived beautifully presented and full of flavor.",
  },
  {
    name: "A Food Lover",
    occasion: "SIGNATURE GRILL",
    rating: 5,
    text: "The kebab platter was delicious, and the atmosphere made dinner feel extra special. Definitely worth a visit.",
  },
  {
    name: "A Returning Guest",
    occasion: "FAMILY DINNER",
    rating: 5,
    text: "A lovely place for a family meal. The menu has great variety, and the grilled dishes are the highlight.",
  },
];

const Eyebrow = ({ children, light = false }) => (
  <div
    className={`flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase ${
      light ? "text-orange-400" : "text-orange-500"
    }`}
  >
    <span className="h-px w-8 bg-orange-500" />
    {children}
  </div>
);

const SectionHeading = ({ eyebrow, title, accent, description }) => (
  <div className="max-w-2xl">
    <Eyebrow>{eyebrow}</Eyebrow>

    <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
      {title} <span className="italic text-orange-500">{accent}</span>
    </h2>

    {description && (
      <p className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-slate-400">
        {description}
      </p>
    )}
  </div>
);

const Home = () => {
  return (
    <main className="overflow-hidden bg-[#0a0f1e] font-sans text-slate-200">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[760px] lg:min-h-[850px] items-center overflow-hidden">
        <img
          src={photo("photo-1517248135467-4c7edcad34c4", 1920)}
          alt="Elegant Swad Grill restaurant interior"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080c17]/95 via-[#080c17]/75 to-[#080c17]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-black/25" />

        <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-24 left-1/4 h-56 w-56 rounded-full bg-amber-500/10 blur-[100px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-black/25 px-4 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-orange-200">
                WELCOME TO SWAD GRILL
              </span>
            </div>

            <h1 className="mt-8 font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold leading-[0.96] tracking-tight text-white">
              Taste the
              <span className="mt-2 block italic text-orange-500">
                Real Fire.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-8 text-slate-300">
              Discover the magic of charcoal-grilled perfection. Bold spices,
              fresh ingredients and unforgettable flavors come together at
              your table.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-orange-950/30 transition hover:bg-orange-600"
              >
                EXPLORE OUR MENU
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/reservation"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/[0.06] px-8 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition hover:border-orange-500 hover:bg-orange-500/10"
              >
                <CalendarDays size={17} />
                RESERVE A TABLE
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10">
                  <Flame size={19} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Real Charcoal</p>
                  <p className="mt-1 text-xs text-slate-400">Authentic flavor</p>
                </div>
              </div>

              <div className="hidden sm:block h-9 w-px bg-white/15" />

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10">
                  <ChefHat size={19} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Chef Crafted</p>
                  <p className="mt-1 text-xs text-slate-400">Made with passion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-4 text-[10px] tracking-[0.3em] text-slate-400">
          <span className="h-px w-12 bg-orange-500" />
          FLAVOR THAT BRINGS US TOGETHER
        </div>
      </section>

      {/* ================= QUICK HIGHLIGHTS ================= */}
      <section className="relative z-10 -mt-1 border-y border-white/[0.07] bg-[#0d1425]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4 px-5 sm:px-8">
          {[
            { value: "Fresh", label: "Ingredients Daily" },
            { value: "Bold", label: "Signature Flavors" },
            { value: "Live", label: "Charcoal Grilling" },
            { value: "Warm", label: "Hospitality" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`px-4 py-7 sm:px-8 sm:py-9 ${
                index < 3 ? "lg:border-r border-white/[0.08]" : ""
              } ${index % 2 === 0 ? "border-r border-white/[0.08] lg:border-r" : ""} ${
                index > 1 ? "border-t border-white/[0.08] lg:border-t-0" : ""
              }`}
            >
              <p className="font-serif text-3xl sm:text-4xl font-bold text-orange-500">
                {item.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <Features />

      {/* ================= SIGNATURE DISHES ================= */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7">
          <SectionHeading
            eyebrow="Made to be remembered"
            title="Straight from"
            accent="the Grill."
            description="Discover the dishes that make every visit special, prepared with bold seasoning and the unmistakable taste of charcoal."
          />

          <Link
            to="/menu"
            className="group inline-flex shrink-0 items-center gap-3 self-start md:self-auto border-b border-orange-500/50 pb-3 text-sm font-bold text-orange-400 transition hover:text-orange-300"
          >
            VIEW FULL MENU
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dishes.map((dish, index) => (
            <article
              key={dish.name}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10182a] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="relative h-64 overflow-hidden bg-slate-800">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10182a] via-transparent to-black/10" />

                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[9px] font-bold tracking-[0.15em] text-white backdrop-blur-md">
                  {dish.category}
                </span>

                <div className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-[#0a0f1e]/90 px-3 py-2 text-xs font-bold text-amber-400 backdrop-blur-md">
                  <Star size={13} fill="currentColor" />
                  {dish.rating}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-orange-400">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 text-base font-bold text-orange-400">
                    ৳{dish.price}
                  </span>
                </div>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                  {dish.desc}
                </p>

                <Link
                  to="/menu"
                  className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-bold tracking-[0.13em] text-slate-300 transition-colors hover:text-orange-400"
                >
                  ORDER THIS DISH
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </div>

              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-orange-500 transition-transform duration-500 ${
                  index === 0 ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* ================= ABOUT / WHY US ================= */}
      <section className="relative border-y border-white/[0.06] bg-[#0d1425]">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-500/[0.05] blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div className="relative max-w-xl">
            <div className="relative overflow-hidden rounded-t-[150px] rounded-b-2xl border border-white/10">
              <img
                src={photo("photo-1555396273-367ea4eb4db5", 1000)}
                alt="Restaurant kitchen and chefs preparing food"
                loading="lazy"
                className="h-[420px] sm:h-[550px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Crafted with fire.
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Finished with passion.
                </p>
              </div>
            </div>

            <div className="absolute -right-3 sm:-right-6 top-20 rounded-2xl border border-orange-500/30 bg-[#111a2d] p-4 sm:p-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15">
                  <Award size={23} className="text-orange-400" />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-white">
                    Quality First
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    In every detail
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="The Swad Difference"
              title="More than food."
              accent="An experience."
              description="At Swad Grill, we believe the best memories are made around a table. Our approach combines authentic grilling, carefully selected ingredients and genuine hospitality."
            />

            <div className="mt-10 space-y-7">
              {featuresList.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.number} className="group flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-orange-400 transition-all group-hover:border-orange-500/40 group-hover:bg-orange-500/10">
                      <Icon size={24} />
                    </div>

                    <div className="flex-1 border-b border-white/[0.08] pb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-widest text-orange-500">
                          {feature.number}
                        </span>
                        <h3 className="text-lg font-bold text-white">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm leading-7 text-slate-400">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full border border-orange-500/50 px-6 py-3.5 text-sm font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white"
            >
              GET TO KNOW US
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CHEF'S SPECIAL ================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#111a2d]">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[80px]" />

          <div className="relative grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <Eyebrow>FROM OUR CHEF</Eyebrow>

              <div className="mt-7 flex items-center gap-2 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
                <span className="ml-2 text-xs font-medium text-slate-400">
                  A house favorite
                </span>
              </div>

              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Meet the
                <span className="block italic text-orange-500">
                  Signature Grill.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm sm:text-base leading-8 text-slate-400">
                Bold seasoning, careful preparation and the warmth of a real
                charcoal fire. Discover a signature selection made for people
                who love big flavor and memorable meals.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-slate-300">
                  <Flame size={14} className="mr-2 inline text-orange-400" />
                  Charcoal grilled
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-slate-300">
                  <Sparkles size={14} className="mr-2 inline text-orange-400" />
                  Chef crafted
                </span>
              </div>

              <Link
                to="/menu"
                className="group mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                DISCOVER THE MENU
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="relative min-h-[330px] lg:min-h-[580px]">
              <img
                src={photo("photo-1544025162-d76694265947", 1100)}
                alt="Delicious freshly grilled meat"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111a2d] via-transparent to-black/10 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#111a2d]/20" />

              <div className="absolute bottom-5 right-5 rounded-2xl border border-white/15 bg-[#0a0f1e]/85 px-5 py-4 backdrop-blur-lg">
                <p className="text-[10px] font-bold tracking-[0.2em] text-orange-400">
                  FLAVOR IN EVERY BITE
                </p>
                <p className="mt-1 font-serif text-xl font-bold text-white">
                  The Grill Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="border-y border-white/[0.06] bg-[#0d1425]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow>GUEST EXPERIENCES</Eyebrow>
            </div>

            <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Good food. <span className="italic text-orange-500">Good memories.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base leading-7 text-slate-400">
              Great meals are even better when shared. Here's the kind of
              experience we aim to create for every guest.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-white/[0.08] bg-[#10182a] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/30 sm:p-8"
              >
                <Quote size={30} className="text-orange-500/70" />

                <div className="mt-5 flex gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  “{review.text}”
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
                    <Heart size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.15em] text-slate-500">
                      {review.occasion}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Sample testimonials for design preview. Replace with genuine
            customer reviews before publishing.
          </p>
        </div>
      </section>

      {/* ================= RESERVATION CTA ================= */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <img
          src={photo("photo-1555939594-58d7cb561ad1", 1800)}
          alt="Barbecue food prepared for a memorable meal"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#080c17]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c17]/50 via-transparent to-[#080c17]/50" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex justify-center">
            <Eyebrow>YOUR TABLE IS WAITING</Eyebrow>
          </div>

          <h2 className="mt-8 font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-white">
            Make tonight
            <span className="block italic text-orange-500">
              unforgettable.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-8 text-slate-300">
            Bring your favorite people, discover your favorite flavors and
            let Swad Grill make your next meal a special occasion.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/reservation"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <CalendarDays size={18} />
              BOOK YOUR TABLE
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/[0.05] px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-orange-500 hover:text-orange-400"
            >
              CONTACT US
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-400" />
              Freshly prepared food
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-400" />
              Warm hospitality
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-400" />
              Memorable experiences
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;