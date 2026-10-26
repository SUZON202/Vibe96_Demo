import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Send,
  MessageCircle,
  CheckCircle2,
  Flame,
  Sparkles,
  Headphones,
  CalendarDays,
  UtensilsCrossed,
  ChevronRight,
} from "lucide-react";

const CONTACT = {
  phone: "+880 1XXX-XXXXXX",
  whatsapp: "8801XXXXXXXXX",
  email: "hello@swadgrill.com",
  address: "Rajshahi, Bangladesh",
  maps: "https://maps.google.com/?q=Swad+Grill+Rajshahi",
};

const hours = [
  { day: "Saturday – Thursday", time: "12 PM – 10:30 PM" },
  { day: "Friday", time: "2 PM – 11 PM" },
];

const photo = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const inputStyle =
  "w-full rounded-xl border border-white/10 bg-[#0b1120] px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("success");

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatusType("error");
      setStatus("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatusType("error");
      setStatus("Please enter a valid email address.");
      return;
    }

    setStatusType("success");
    setStatus(
      "Your form is valid! Connect an email service or backend to deliver this message."
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#090d16] font-sans text-white selection:bg-orange-500 selection:text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -right-48 -top-32 h-[450px] w-[450px] rounded-full bg-orange-500/[0.09] blur-[130px]" />
        <div className="absolute -left-48 top-[42%] h-[420px] w-[420px] rounded-full bg-amber-500/[0.05] blur-[130px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.92fr] lg:gap-20">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/[0.07] px-4 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-orange-300 sm:text-xs">
                We'd Love to Hear from You
              </span>
            </div>

            <h1 className="max-w-2xl font-serif text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[82px]">
              Let's Start a
              <span className="mt-2 block italic text-orange-500">
                Conversation.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Have a question, planning a special occasion, or simply craving
              something delicious? We're here to help make your Swad Grill
              experience unforgettable.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/15 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/25"
              >
                Send Us a Message
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:rotate-45"
                />
              </a>

              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-6 py-4 text-sm font-semibold transition hover:border-orange-500/40 hover:bg-orange-500/[0.06]"
              >
                <MessageCircle size={18} className="text-orange-400" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-11 flex items-center gap-4 border-t border-white/[0.08] pt-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                <Headphones size={23} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  We're happy to help
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Questions, feedback, events and reservations.
                </p>
              </div>
            </div>
          </div>

          {/* Visual contact card */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-orange-500/20 sm:-inset-4" />

            <div className="relative h-[410px] overflow-hidden rounded-[1.7rem] border border-white/10 sm:h-[530px]">
              <img
                src={photo("photo-1517248135467-4c7edcad34c4", 1200)}
                alt="Restaurant dining atmosphere"
                className="h-full w-full object-cover transition duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-black/15 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 backdrop-blur-xl sm:left-7 sm:top-7">
                <Sparkles size={15} className="text-orange-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  The Swad Grill Experience
                </span>
              </div>

              <div className="absolute bottom-7 left-6 right-6 sm:bottom-9 sm:left-9 sm:right-9">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-300">
                  Every Visit Matters
                </p>
                <h2 className="mt-3 max-w-sm font-serif text-4xl font-bold leading-tight sm:text-5xl">
                  Great Food.
                  <span className="block italic text-orange-400">
                    Genuine Care.
                  </span>
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                  We're here to make every question, visit and occasion feel
                  special.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-2 flex max-w-[270px] items-center gap-3 rounded-2xl border border-white/10 bg-[#151b29]/95 p-4 shadow-2xl backdrop-blur-xl sm:-left-7 sm:p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                <UtensilsCrossed size={23} />
              </div>
              <div>
                <p className="font-serif text-lg font-bold">
                  Your Table Awaits
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Let's make it memorable
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT STRIP */}
      <section className="relative z-10 border-y border-white/[0.07] bg-[#101522] px-5 py-7 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          <a
            href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-white/10 hover:bg-white/[0.025]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
              <Phone size={21} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Call Our Team</p>
              <p className="mt-1 break-words text-sm font-semibold text-white">
                {CONTACT.phone}
              </p>
            </div>
            <ArrowUpRight
              size={17}
              className="ml-auto shrink-0 text-slate-600 transition group-hover:text-orange-400"
            />
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-white/10 hover:bg-white/[0.025]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
              <Mail size={21} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Email Us Anytime</p>
              <p className="mt-1 break-all text-sm font-semibold text-white">
                {CONTACT.email}
              </p>
            </div>
            <ArrowUpRight
              size={17}
              className="ml-auto shrink-0 text-slate-600 transition group-hover:text-orange-400"
            />
          </a>

          <a
            href={CONTACT.maps}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition hover:border-white/10 hover:bg-white/[0.025]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
              <MapPin size={21} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Find Our Location</p>
              <p className="mt-1 text-sm font-semibold text-white">
                {CONTACT.address}
              </p>
            </div>
            <ArrowUpRight
              size={17}
              className="ml-auto shrink-0 text-slate-600 transition group-hover:text-orange-400"
            />
          </a>
        </div>
      </section>

      {/* CONTACT FORM + DETAILS */}
      <section
        id="contact-form"
        className="relative z-10 scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
              <span className="h-px w-8 bg-orange-500" />
              Let's Talk
            </div>

            <h2 className="font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
              We're All Ears.
              <span className="mt-2 block italic text-orange-500">
                What's on Your Mind?
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              Tell us what you need. Whether it's a quick question, a special
              event or feedback about your experience, we'd love to hear from
              you.
            </p>
          </div>

          <div className="grid items-start gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-9">
            {/* FORM */}
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#101522] p-6 shadow-2xl shadow-black/10 sm:p-9 lg:p-10">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 sm:text-xs">
                    Drop Us a Line
                  </p>
                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                    Send a Message
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Fields marked with * are required.
                  </p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400 sm:flex">
                  <Send size={21} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={updateForm}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateForm}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={updateForm}
                      placeholder="+880 ..."
                      autoComplete="tel"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={updateForm}
                      className={inputStyle}
                    >
                      <option className="bg-[#101522]">
                        General Inquiry
                      </option>
                      <option className="bg-[#101522]">
                        Table Reservation
                      </option>
                      <option className="bg-[#101522]">
                        Events & Catering
                      </option>
                      <option className="bg-[#101522]">
                        Feedback
                      </option>
                      <option className="bg-[#101522]">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={updateForm}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className={`${inputStyle} resize-y`}
                  />
                </div>

                {status && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                      statusType === "error"
                        ? "border-red-500/20 bg-red-500/[0.07] text-red-300"
                        : "border-orange-500/20 bg-orange-500/[0.07] text-orange-200"
                    }`}
                  >
                    {statusType === "error" ? (
                      <MessageCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0"
                      />
                    )}
                    <p>{status}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/10 transition duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/20 sm:w-auto"
                >
                  Send Your Message
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-xs leading-5 text-slate-600">
                  Demo form: messages are not delivered until an email service
                  or backend is connected.
                </p>
              </form>
            </div>

            {/* SIDE INFORMATION */}
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/[0.08] bg-[#101522] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <Clock size={23} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Opening Hours</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Plan your next visit
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  {hours.map((item) => (
                    <div
                      key={item.day}
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] pb-4 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-slate-400">
                        {item.day}
                      </span>
                      <span className="text-sm font-semibold text-orange-300">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/[0.05] p-4">
                  <CalendarDays
                    size={19}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />
                  <p className="text-xs leading-6 text-slate-400">
                    Planning a group dinner or special occasion? Contact us
                    in advance to discuss your requirements.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#14131b] p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-[70px]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                    <MapPin size={24} />
                  </div>

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400">
                    Come Visit Us
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-bold">
                    Find Your Way to Swad Grill.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    Looking for a delicious meal? Check our location on
                    Google Maps and plan your visit.
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                    <MapPin
                      size={21}
                      className="shrink-0 text-orange-400"
                    />
                    <div>
                      <p className="text-xs text-slate-500">
                        Restaurant Location
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        {CONTACT.address}
                      </p>
                    </div>
                  </div>

                  <a
                    href={CONTACT.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-orange-500/30 px-5 py-4 text-sm font-bold text-orange-300 transition hover:bg-orange-500 hover:text-white"
                  >
                    Get Directions
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#11121b] px-6 py-14 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-amber-500/[0.08] blur-[100px]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
              <Flame size={31} />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400 sm:text-xs">
              A Little Taste of Something Special
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Good Food.
              <span className="italic text-orange-500">
                {" "}Great Company.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Have a seat at our table. Discover bold flavors, warm hospitality,
              and the joy of sharing a great meal.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Explore Our Menu
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="/reservation"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold transition hover:border-orange-500/40 hover:text-orange-400"
              >
                Reserve a Table
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#080b12]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-orange-500/20 bg-orange-500/10">
              <img
                src="/logo.png"
                alt="Swad Grill logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <Flame size={21} className="text-orange-400" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold tracking-wide">
                Swad <span className="text-orange-500">Grill</span>
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                Made for food lovers
              </p>
            </div>
          </a>

          <p className="text-xs leading-6 text-slate-600">
            © {new Date().getFullYear()} Swad Grill. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs text-slate-500">
            Made with care
            <span className="text-orange-500">♥</span>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Contact;