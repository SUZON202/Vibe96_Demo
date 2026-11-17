import React from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor, FiSmartphone, FiCreditCard, FiSettings, FiLayout, FiCode } from 'react-icons/fi';

const PromoLanding = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar (Clean, No links other than Demo) */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto border-b border-gray-800">
        <div className="text-2xl font-black tracking-wider text-orange-500">
          SWAD<span className="text-white">GRILL</span>
        </div>
        <Link to="/demo" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg shadow-orange-500/30">
          Live Demo
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="px-6 md:px-12 py-24 max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-semibold mb-6 border border-orange-500/20">
          Premium Restaurant Management System
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
          Complete Restaurant <br className="hidden md:block"/> Management Solution
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          A premium, full-stack web application built with the MERN stack. Features online ordering, secure Stripe payments, and a powerful admin dashboard.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/demo" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg shadow-orange-500/30">
            View Live Demo
          </Link>
          {/* এই লিংকেই সমস্যা ছিল, /login এর বদলে /demo/login করে দিয়েছি */}
          <Link to="/demo/login" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-lg border border-gray-700 transition-all duration-300">
            Admin Panel Demo
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <FiLayout className="text-4xl text-orange-500 mb-4" />, title: "Modern UI/UX", desc: "Dark glassmorphic design with fully responsive and stunning layouts." },
            { icon: <FiCreditCard className="text-4xl text-orange-500 mb-4" />, title: "Secure Payments", desc: "Integrated with Stripe for safe, reliable, and fast online transactions." },
            { icon: <FiSettings className="text-4xl text-orange-500 mb-4" />, title: "Admin Dashboard", desc: "Manage orders, menu items, and users easily from the backend." },
            { icon: <FiSmartphone className="text-4xl text-orange-500 mb-4" />, title: "Fully Responsive", desc: "Looks perfect and functions smoothly on mobile, tablet, and desktop." },
            { icon: <FiMonitor className="text-4xl text-orange-500 mb-4" />, title: "Real-time Operations", desc: "Smooth user experience with React Router and fast state management." },
            { icon: <FiCode className="text-4xl text-orange-500 mb-4" />, title: "Clean Codebase", desc: "Well-structured MERN stack code, easily customizable for buyers." },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-orange-500/50 transition-colors duration-300">
              {feature.icon}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-12">Built With Modern Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Firebase', 'Stripe'].map((tech, idx) => (
            <span key={idx} className="px-6 py-3 rounded-full bg-gray-800 text-gray-300 font-semibold border border-gray-700">
              {tech}
            </span>
          ))}
        </div>
      </section>
      
      {/* Footer (No Contact Info as per Vibe96 rule) */}
      <footer className="text-center py-8 border-t border-gray-800 text-gray-500">
        <p>© {new Date().getFullYear()} Swad Grill. All rights reserved. Created for Vibe96 Marketplace.</p>
      </footer>
    </div>
  );
};

export default PromoLanding;