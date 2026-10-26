import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  Star,
  Minus,
  Plus,
  ShieldCheck,
  Heart,
} from "lucide-react";

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const today = new Date();
const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  requests: "",
};

const openingHours = [
  { day: "Monday – Thursday", hours: "11:00 AM – 10:00 PM" },
  { day: "Friday – Saturday", hours: "11:00 AM – 11:30 PM" },
  { day: "Sunday", hours: "Closed", closed: true },
];

const diningFeatures = [
  {
    icon: ChefHat,
    title: "Chef-crafted cuisine",
    desc: "Thoughtfully prepared dishes with bold, memorable flavors.",
  },
  {
    icon: Heart,
    title: "Made for moments",
    desc: "The perfect setting for dates, celebrations and family dinners.",
  },
  {
    icon: ShieldCheck,
    title: "A personal touch",
    desc: "Tell us your preferences and let us help make your visit special.",
  },
];

export default function Reservation() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
    setError("");
    setSubmitted(false);
  };

  const changeGuests = (amount) => {
    setFormData((previous) => ({
      ...previous,
      guests: Math.min(20, Math.max(1, Number(previous.guests) + amount)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.date < localDate) {
      setError("Please choose today or a future date.");
      return;
    }

    setError("");

    // Demo behavior: no reservation is sent to a server.
    setSubmitted(true);

    // To connect a real booking system, submit formData to your backend here.
  };

  const resetForm = () => {
    setFormData(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#090d18] font-sans text-slate-200">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-orange-500/[0.12] blur-[130px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-amber-500/[0.07] blur-[120px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-32 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-300 sm:text-xs">
                An extraordinary dining experience
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[82px]">
              Your table.
              <br />
              Your moment.
              <br />
              <span className="italic text-orange-500">
                Your story.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Some moments deserve more than an ordinary meal.
              Reserve your place at Swad Grill and make room for
              beautiful food, meaningful conversations and memories
              worth keeping.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#reservation-form"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-orange-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-400"
              >
                Reserve Your Table
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-4 text-sm font-semibold text-slate-300 transition-colors hover:border-orange-500/40 hover:text-white"
              >
                Explore Experience
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/[0.08] pt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-orange-400">
                  <UtensilsCrossed size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Crafted with care
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Every single plate
                  </p>
                </div>
              </div>

              <div className="hidden h-10 w-px bg-white/10 sm:block" />

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-orange-400">
                  <Sparkles size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Memorable moments
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Made around the table
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-orange-500/20" />

            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#111827] p-2 shadow-2xl shadow-black/40">
              <img
                src={photo("photo-1414235077428-338989a2e8c0", 1100)}
                alt="Elegant restaurant table prepared for a special dinner"
                fetchPriority="high"
                className="h-[390px] w-full rounded-[1.3rem] object-cover sm:h-[480px]"
              />

              <div className="absolute inset-x-2 bottom-2 rounded-b-[1.3rem] bg-gradient-to-t from-black/95 via-black/60 to-transparent px-6 pb-7 pt-24 sm:px-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300">
                      Welcome to Swad Grill
                    </p>
                    <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                      Gather. Dine. Enjoy.
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                      An inviting atmosphere for life's most delicious moments.
                    </p>
                  </div>

                  <div className="hidden rounded-2xl border border-white/20 bg-white/10 p-3 text-orange-300 backdrop-blur-md sm:block">
                    <ChefHat size={27} />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-9 hidden rounded-2xl border border-white/10 bg-[#131a2a]/95 p-4 shadow-xl backdrop-blur-xl sm:block md:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
                  <Star size={20} className="fill-orange-400/20" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    A table for you
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Your moment starts here
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-5 hidden rounded-2xl border border-orange-500/20 bg-[#151d30] px-5 py-4 shadow-xl sm:block md:-right-5">
              <div className="flex items-center gap-3">
                <CalendarDays size={22} className="text-orange-400" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Your evening, elevated
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Book your next visit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section
        id="experience"
        className="border-y border-white/[0.07] bg-[#0d1220]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 md:gap-10 md:py-12">
          {diningFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/[0.08] text-orange-400">
                  <Icon size={22} />
                </div>

                <div>
                  <p className="font-serif text-lg font-bold text-white">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.desc}
                  </p>
                </div>

                {index < diningFeatures.length - 1 && (
                  <div className="ml-auto hidden h-12 w-px bg-white/[0.08] md:block" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* RESERVATION SECTION */}
      <section
        id="reservation-form"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
            <span className="h-px w-8 bg-orange-500" />
            Make it memorable
          </div>

          <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Let's save you
            <br />
            <span className="italic text-orange-500">
              a seat.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Choose your preferred date, time and party size.
            Share any special requests with us, and prepare for
            a dining experience worth looking forward to.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* FORM CARD */}
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#101726] shadow-2xl shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600" />

            <div className="border-b border-white/[0.07] px-6 py-7 sm:px-9 sm:py-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                  <CalendarDays size={23} />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Reservation Details
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Tell us a little about your visit.
                  </p>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="px-6 py-14 text-center sm:px-10 sm:py-20">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={40} />
                </div>

                <h3 className="mt-6 font-serif text-3xl font-bold text-white">
                  Thank you, {formData.name}!
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400">
                  Your reservation details have been prepared.
                  This demo has not sent your request to the restaurant.
                  Connect a booking backend to receive real reservations.
                </p>

                <div className="mx-auto mt-7 max-w-md rounded-2xl border border-white/10 bg-[#0b1120] p-5 text-left">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                    Your selected details
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Date</span>
                      <span className="font-semibold text-white">
                        {formData.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Time</span>
                      <span className="font-semibold text-white">
                        {formData.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-semibold text-white">
                        {formData.guests}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                >
                  Make Another Reservation
                  <ArrowRight size={17} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-7 p-6 sm:p-9"
              >
                {/* DATE, TIME, GUESTS */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-orange-500" />
                    <h4 className="text-sm font-bold text-white">
                      When are you visiting?
                    </h4>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="min-w-0">
                      <label
                        htmlFor="date"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Reservation Date <span className="text-orange-400">*</span>
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                        />

                        <input
                          type="date"
                          id="date"
                          name="date"
                          required
                          min={localDate}
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full min-w-0 rounded-xl border border-white/10 bg-[#0a0f1e] py-3.5 pl-11 pr-2 text-sm text-white outline-none transition-colors focus:border-orange-500 [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label
                        htmlFor="time"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Preferred Time <span className="text-orange-400">*</span>
                      </label>

                      <div className="relative">
                        <Clock
                          size={17}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                        />

                        <select
                          id="time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-white/10 bg-[#0a0f1e] py-3.5 pl-11 pr-3 text-sm text-white outline-none transition-colors focus:border-orange-500"
                        >
                          <option value="" disabled>
                            Select time
                          </option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                          <option value="07:00 PM">07:00 PM</option>
                          <option value="08:00 PM">08:00 PM</option>
                          <option value="09:00 PM">09:00 PM</option>
                          <option value="10:00 PM">10:00 PM</option>
                          <option value="10:30 PM">10:30 PM</option>
                          <option value="11:00 PM">11:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="min-w-0 sm:col-span-2 xl:col-span-1">
                      <label
                        htmlFor="guests"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Number of Guests
                      </label>

                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f1e] p-1.5">
                        <button
                          type="button"
                          onClick={() => changeGuests(-1)}
                          disabled={Number(formData.guests) <= 1}
                          aria-label="Remove a guest"
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus size={16} />
                        </button>

                        <div className="flex items-center gap-2">
                          <Users size={17} className="text-orange-400" />
                          <span
                            id="guests"
                            className="min-w-6 text-center text-sm font-bold text-white"
                          >
                            {formData.guests}
                          </span>
                          <span className="text-xs text-slate-500">
                            guests
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => changeGuests(1)}
                          disabled={Number(formData.guests) >= 20}
                          aria-label="Add a guest"
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTACT DETAILS */}
                <div className="border-t border-white/[0.07] pt-7">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-orange-500" />
                    <h4 className="text-sm font-bold text-white">
                      How can we reach you?
                    </h4>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Full Name <span className="text-orange-400">*</span>
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Phone Number <span className="text-orange-400">*</span>
                      </label>

                      <div className="relative">
                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          required
                          maxLength={25}
                          placeholder="+880 1XXXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold text-slate-300"
                      >
                        Email Address{" "}
                        <span className="text-slate-500">(Optional)</span>
                      </label>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          maxLength={254}
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-[#0a0f1e] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SPECIAL REQUESTS */}
                <div className="border-t border-white/[0.07] pt-7">
                  <label
                    htmlFor="requests"
                    className="mb-2 block text-xs font-semibold text-slate-300"
                  >
                    Special Requests{" "}
                    <span className="text-slate-500">(Optional)</span>
                  </label>

                  <textarea
                    id="requests"
                    name="requests"
                    rows={4}
                    maxLength={1000}
                    placeholder="Birthday celebration, anniversary, dietary preferences..."
                    value={formData.requests}
                    onChange={handleChange}
                    className="w-full resize-y rounded-xl border border-white/10 bg-[#0a0f1e] px-4 py-4 text-sm leading-6 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-orange-500"
                  />

                  <p className="mt-2 text-right text-[11px] text-slate-600">
                    {formData.requests.length}/1000
                  </p>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-sm font-extrabold tracking-[0.12em] text-white shadow-lg shadow-orange-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-orange-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
                >
                  REQUEST A RESERVATION
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-slate-500">
                  <ShieldCheck size={14} className="shrink-0 text-emerald-400" />
                  Demo form only. Your request is not sent until a booking
                  service is connected.
                </p>
              </form>
            )}
          </div>

          {/* SIDE PANEL */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-[#101726]">
              <div className="relative h-56 overflow-hidden sm:h-64 lg:h-56">
                <img
                  src={photo("photo-1517248135467-4c7edcad34c4", 900)}
                  alt="Warm and inviting restaurant interior"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101726] via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200 backdrop-blur-md">
                    <Sparkles size={12} />
                    The Swad Experience
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    An evening to remember.
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Clock size={21} />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      Opening Hours
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Plan your next visit
                    </p>
                  </div>
                </div>

                <div className="space-y-0">
                  {openingHours.map((item, index) => (
                    <div
                      key={item.day}
                      className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${
                        index !== openingHours.length - 1
                          ? "border-b border-white/[0.07]"
                          : ""
                      }`}
                    >
                      <span className="text-sm text-slate-400">
                        {item.day}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          item.closed ? "text-orange-400" : "text-white"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-orange-500/15 bg-orange-500/[0.06] p-4">
                  <p className="text-xs leading-6 text-slate-400">
                    <span className="font-bold text-orange-300">
                      Planning a special occasion?
                    </span>{" "}
                    Add your requests in the form and share your preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT CARD */}
            <div className="rounded-[1.7rem] border border-white/[0.09] bg-[#101726] p-6 sm:p-7">
              <h3 className="font-serif text-2xl font-bold text-white">
                Need a hand?
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Have a question about your visit? Reach out to our team.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="tel:+8801234567890"
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-orange-500/30 hover:bg-orange-500/[0.04]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Phone size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      Give us a call
                    </p>
                    <p className="mt-1 break-words text-sm font-bold text-white transition-colors group-hover:text-orange-400">
                      +880 1234 567 890
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="ml-auto shrink-0 text-slate-500 transition-colors group-hover:text-orange-400"
                  />
                </a>

                <a
                  href="mailto:reserve@swadgrill.com"
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-orange-500/30 hover:bg-orange-500/[0.04]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Mail size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      Send an email
                    </p>
                    <p className="mt-1 break-all text-sm font-bold text-white transition-colors group-hover:text-orange-400">
                      reserve@swadgrill.com
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="ml-auto shrink-0 text-slate-500 transition-colors group-hover:text-orange-400"
                  />
                </a>
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-white/[0.07] pt-5">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-orange-400"
                />
                <p className="text-xs leading-6 text-slate-500">
                  Restaurant address and contact details can be customized
                  for the final client website.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 pb-16 sm:px-8 md:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.7rem] border border-orange-500/20 bg-[#111827] px-6 py-12 sm:px-10 md:px-16 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-orange-500/[0.10] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-amber-500/[0.06] blur-[100px]" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                <Sparkles size={15} />
                Your table is waiting
              </p>

              <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Make time for
                <span className="italic text-orange-500">
                  {" "}something delicious.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Good food. Great company. A setting that makes
                every gathering feel a little more special.
              </p>
            </div>

            <a
              href="#reservation-form"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-orange-400"
            >
              Book Your Table
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}