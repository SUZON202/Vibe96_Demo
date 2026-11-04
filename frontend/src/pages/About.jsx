import React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  Flame,
  Heart,
  Leaf,
  Star,
  UtensilsCrossed,
  Users,
  Award,
  Sparkles,
} from "lucide-react";

const photo = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const stats = [
  { number: "12+", label: "Years of Experience", icon: Award },
  { number: "40+", label: "Signature Recipes", icon: UtensilsCrossed },
  { number: "50K+", label: "Happy Customers", icon: Users },
  { number: "100%", label: "Fresh Ingredients", icon: Leaf },
];

const values = [
  {
    number: "01",
    icon: Flame,
    title: "Authentic Charcoal Fire",
    description:
      "Real fire, rich smoky aromas, and carefully perfected cooking techniques create a taste worth coming back for.",
  },
  {
    number: "02",
    icon: Leaf,
    title: "Freshness First",
    description:
      "Fresh ingredients, aromatic herbs, and thoughtfully selected spices bring natural flavor to every plate.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Made with Passion",
    description:
      "From our signature marinades to the final presentation, every detail is shaped by our love of great food.",
  },
];

const highlights = [
  "Freshly prepared dishes",
  "Carefully selected ingredients",
  "Warm and welcoming service",
];

const Eyebrow = ({ children, center = false }) => (
  <div
    className={`mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-orange-400 sm:text-xs ${
      center ? "justify-center" : ""
    }`}
  >
    <span className="h-px w-8 bg-orange-500" />
    {children}
    <span className="h-px w-8 bg-orange-500/50" />
  </div>
);

const About = () => {
  return (
    <main className="overflow-hidden bg-[#090d16] font-sans text-white selection:bg-orange-500 selection:text-white">
      {/* HERO */}
      <section className="relative px-5 pb-24 pt-28 sm:px-8 sm:pt-36 lg:pb-32 lg:pt-40">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
          <div className="relative z-10">
            <Eyebrow>Welcome to Swad Grill</Eyebrow>

            <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[82px]">
              More Than Food.
              <span className="mt-2 block italic text-orange-500">
                It's an Experience.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              At Swad Grill, we believe great food brings people together.
              Discover authentic flavors, smoky charcoal grilling, fresh
              ingredients, and memorable moments made to be shared.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#our-story"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                Discover Our Story
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:rotate-45"
                />
              </a>

              <a
                href="#our-values"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition hover:border-orange-500/60 hover:bg-white/[0.04] hover:text-orange-400"
              >
                What Makes Us Special
              </a>
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-4 border-t border-white/10 pt-7">
              <div className="flex -space-x-3">
                {[
                  "photo-1500648767791-00dcc994a43e",
                  "photo-1534528741775-53994a69daeb",
                  "photo-1506794778202-cad84cf45f1d",
                ].map((id) => (
                  <img
                    key={id}
                    src={photo(id, 100)}
                    alt="Restaurant guest"
                    loading="lazy"
                    className="h-11 w-11 rounded-full border-2 border-[#090d16] object-cover"
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span>Made for Food Lovers</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Great taste. Beautiful memories.
                </p>
              </div>
            </div>
          </div>

          {/* HERO IMAGE COMPOSITION */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-orange-500/30 sm:-inset-5" />

            <div className="relative h-[420px] overflow-hidden rounded-[1.7rem] border border-white/10 sm:h-[540px] lg:h-[590px]">
              <img
                src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Delicious grilled specialties"
                className="h-full w-full object-cover transition duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-black/10 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2.5 text-xs font-semibold backdrop-blur-xl">
                <Sparkles size={14} className="text-orange-400" />
                Crafted with Passion
              </div>

              <div className="absolute bottom-8 left-6 right-6 sm:bottom-10 sm:left-9 sm:right-9">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300">
                  The Swad Grill Experience
                </p>
                <h2 className="max-w-sm font-serif text-3xl font-bold leading-tight sm:text-5xl">
                  The Art of
                  <span className="block italic text-orange-400">
                    Real Flavor.
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Fresh ingredients. Perfect fire. Unforgettable taste.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-2 max-w-[270px] rounded-2xl border border-white/10 bg-[#151b29]/95 p-4 shadow-2xl backdrop-blur-xl sm:-left-8 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                  <Flame size={25} />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold">
                    Flavor That Lasts
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    A passion in every bite
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-24 hidden h-20 w-20 items-center justify-center rounded-full border border-orange-400/30 bg-[#111725]/90 text-center shadow-xl backdrop-blur-lg sm:flex">
              <div>
                <Flame
                  size={21}
                  className="mx-auto mb-1 text-orange-400"
                />
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  Grill
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#our-story"
          className="mx-auto mt-20 hidden w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 transition hover:text-orange-400 lg:flex"
        >
          Scroll to discover
          <ArrowDownRight size={16} />
        </a>
      </section>

      {/* STATS */}
      <section className="relative border-y border-white/[0.07] bg-[#101522] px-5 py-12 sm:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group flex flex-col items-center px-3 text-center ${
                  index !== 0 ? "md:border-l md:border-white/10" : ""
                }`}
              >
                <Icon
                  size={22}
                  className="mb-3 text-orange-500 transition duration-300 group-hover:-translate-y-1"
                />
                <h3 className="font-serif text-4xl font-bold text-white transition group-hover:text-orange-400 sm:text-5xl">
                  {stat.number}
                </h3>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="scroll-mt-20 px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative mx-auto w-full max-w-xl pb-12 pr-7 sm:pr-12">
            <div className="absolute left-0 top-8 h-[75%] w-[72%] rounded-3xl border border-orange-500/30" />

            <div className="relative ml-4 h-[390px] overflow-hidden rounded-3xl sm:ml-7 sm:h-[490px]">
              <img
                src={photo("photo-1555396273-367ea4eb4db5", 1100)}
                alt="Welcoming restaurant interior"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            <div className="absolute -bottom-1 right-0 w-[57%] overflow-hidden rounded-2xl border-4 border-[#090d16] shadow-2xl sm:right-2">
              <img
                src={photo("photo-1555939594-58d7cb561ad1", 650)}
                alt="Freshly grilled food"
                loading="lazy"
                className="h-44 w-full object-cover sm:h-60"
              />
            </div>

            <div className="absolute left-0 top-0 rounded-2xl border border-white/10 bg-[#151b29] px-5 py-4 shadow-xl sm:px-6 sm:py-5">
              <span className="font-serif text-2xl font-bold text-orange-400 sm:text-3xl">
                Our Story
              </span>
              <p className="mt-1 text-xs text-slate-400">
                A journey of flavor
              </p>
            </div>

            <div className="absolute bottom-10 left-1 hidden items-center gap-2 rounded-full border border-white/10 bg-[#151b29]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex">
              <Heart size={16} className="text-orange-400" />
              <span className="text-xs font-semibold">
                Made with love
              </span>
            </div>
          </div>

          <div>
            <Eyebrow>Who We Are</Eyebrow>

            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-[58px]">
              A Love for Food.
              <span className="mt-2 block italic text-orange-500">
                A Passion for People.
              </span>
            </h2>

            <p className="mt-7 text-base leading-8 text-slate-400">
              Swad Grill was created with one simple idea: food should be
              more than something we eat. It should be something we remember.
              Our passion for rich flavors, quality ingredients, and
              authentic grilling inspires everything we do.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-400">
              From our signature marinades to the moment a dish leaves the
              grill, we focus on freshness, flavor, and attention to detail.
              Every meal is an opportunity to bring people closer and create
              something special.
            </p>

            <div className="mt-7 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40">
                <UtensilsCrossed
                  size={25}
                  className="mb-4 text-orange-400 transition group-hover:scale-110"
                />
                <h3 className="font-bold text-white">Exceptional Taste</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Thoughtfully prepared dishes with unforgettable flavor.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40">
                <Heart
                  size={25}
                  className="mb-4 text-orange-400 transition group-hover:scale-110"
                />
                <h3 className="font-bold text-white">Warm Hospitality</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Making every guest feel welcome at our table.
                </p>
              </div>
            </div>

            <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 font-serif text-2xl font-bold italic text-orange-400">
                S
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">
                  Shafiq Suzon
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">
                  Founder, Swad Grill
                </p>
              </div>
              <div className="ml-auto hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 text-orange-400 sm:flex">
                <ArrowUpRight size={21} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section
        id="our-values"
        className="scroll-mt-20 border-y border-white/[0.07] bg-[#101522] px-5 py-24 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Eyebrow center>Our Philosophy</Eyebrow>

            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              The Secret Behind
              <span className="mt-2 block italic text-orange-500">
                Every Great Bite.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400">
              Great food doesn't happen by accident. It comes from dedication,
              quality, and a genuine love for what we do.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#151b29] p-7 transition duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/[0.06] sm:p-9"
                >
                  <span className="pointer-events-none absolute -right-2 -top-10 font-serif text-[110px] font-bold text-white/[0.035] transition duration-500 group-hover:text-orange-500/[0.09]">
                    {item.number}
                  </span>

                  <div className="relative flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400 transition duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-orange-500/20">
                      <Icon size={29} strokeWidth={1.6} />
                    </div>
                    <span className="text-xs font-bold tracking-[0.25em] text-slate-600">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 font-serif text-2xl font-bold transition group-hover:text-orange-400 sm:text-3xl">
                    {item.title}
                  </h3>

                  <p className="relative mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                    {item.description}
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-orange-400">
                    Our promise
                    <span className="h-px w-8 bg-orange-500 transition-all duration-500 group-hover:w-16" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHEF SECTION */}
      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111725]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[360px] overflow-hidden sm:min-h-[480px] lg:min-h-[600px]">
                <img
                  src={photo("photo-1577219491135-ce391730fb2c", 1200)}
                  alt="Chef preparing a restaurant dish"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111725] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111725]" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                      <ChefHat size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        Passion on Every Plate
                      </p>
                      <p className="mt-1 text-xs text-slate-300">
                        Quality in every detail
                      </p>
                    </div>
                  </div>
                  <Sparkles
                    size={20}
                    className="shrink-0 text-orange-400"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                <Eyebrow>Meet Our Culinary Team</Eyebrow>

                <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Crafted by
                  <span className="mt-2 block italic text-orange-500">
                    Passionate Hands.
                  </span>
                </h2>

                <p className="mt-7 text-base leading-8 text-slate-400">
                  Behind every memorable meal is a team that cares about the
                  little things. Our culinary team brings creativity,
                  dedication, and a love of authentic flavors to every dish
                  we prepare.
                </p>

                <p className="mt-5 text-base leading-8 text-slate-400">
                  We believe the best food begins with respect for ingredients,
                  a commitment to quality, and the courage to create something
                  extraordinary.
                </p>

                <div className="mt-9 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <Flame size={22} className="mb-3 text-orange-400" />
                    <p className="font-bold">Rich Flavor</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Crafted with care
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <Leaf size={22} className="mb-3 text-orange-400" />
                    <p className="font-bold">Fresh Quality</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Thoughtful ingredients
                    </p>
                  </div>
                </div>

                <div className="mt-9 border-t border-white/10 pt-7">
                  <p className="font-serif text-2xl font-bold text-white">
                    Every Dish Has a Story.
                  </p>
                  <p className="mt-2 text-sm text-orange-400">
                    Let us make yours delicious.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#11121b] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400">
              <Flame size={32} />
            </div>

            <Eyebrow center>Your Table Is Waiting</Eyebrow>

            <h2 className="font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
              Good Food.
              <span className="italic text-orange-500">
                {" "}Great Company.
              </span>
              <span className="mt-2 block">Unforgettable Moments.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Your next favorite meal is waiting for you. Come hungry, leave
              happy, and experience the taste of Swad Grill.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a
                href="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-500/15 transition duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Our Menu
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="/reservation"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-orange-500/50 hover:text-orange-400"
              >
                Book a Table
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-7 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-orange-400" />
                Freshly Prepared
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-orange-400" />
                Full of Flavor
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-orange-400" />
                Made for Sharing
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;