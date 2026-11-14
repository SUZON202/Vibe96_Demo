import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            
            {/* Top Navbar */}
            <header className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">Swad Grill</div>
                    {/* Live Demo Button (Links to your restaurant app) */}
                    <Link to="/demo" className="bg-emerald-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition duration-300 shadow-md">
                        Live Demo
                    </Link>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Modern Restaurant POS & <br/> Online Ordering System
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        A complete full-stack solution built with React, Node.js, Express, MongoDB, and Firebase Auth. Seamlessly manage your menu, track real-time orders, and analyze sales.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/demo" className="bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1">
                            View Live Demo
                        </Link>
                        {/* Admin Demo Button for Reviewers */}
                        <Link to="/demo/login" className="bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl text-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-all">
                            Admin Login
                        </Link>
                    </div>
                </section>

                {/* Main Screenshot/Preview Area */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="bg-gray-200 rounded-2xl h-[400px] md:h-[600px] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                        {/* 
                          এখানে আপনার 1080x1080 বা 16:9 সাইজের একটি প্রজেক্টের স্ক্রিনশট দিতে পারেন। 
                          ইমেজ থাকলে নিচের <img> ট্যাগ আনকমেন্ট করে ব্যবহার করুন:
                          <img src="/your-screenshot-image.png" alt="Dashboard Preview" className="w-full h-full object-cover" /> 
                        */}
                        <p className="text-gray-500 font-medium">[Upload/Place your awesome project screenshot here]</p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Everything you need to run your restaurant</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 bg-slate-50">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Powerful Admin Dashboard</h3>
                                <p className="text-gray-600">A multi-role dashboard allowing main admins and sub-admins to manage products, customers, and overall analytics.</p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 bg-slate-50">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Order Tracking</h3>
                                <p className="text-gray-600">Give your customers the best experience with live order status updates directly from the kitchen.</p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 bg-slate-50">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments Setup</h3>
                                <p className="text-gray-600">Built-in integration for secure online transactions using modern payment gateways and Firebase Authentication.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer - No Contact Details allowed by Vibe96 */}
            <footer className="bg-gray-900 py-10 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-2xl font-bold text-emerald-500 mb-4">Swad Grill</div>
                    <p className="text-gray-400">© 2026 Swad Grill Software. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;