import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer grid-cols-2 md:grid-cols-4 p-6 bg-neutral text-neutral-content mt-10">
            <aside>
                <h2 className="text-3xl font-bold text-orange-500">Swad Grill</h2>
                <p>Premium Restaurant & Catering Services.<br />Providing authentic taste to satisfy your cravings.</p>
            </aside>
            <nav>
                <h6 className="footer-title">Quick Links</h6>
                <Link to="/demo" className="link link-hover">Home</Link>
                <Link to="/demo/menu" className="link link-hover">Our Menu</Link>
                <Link to="/demo/reservation" className="link link-hover">Book a Table</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Navigation</h6>
                <Link to="/demo/about" className="link link-hover">About Us</Link>
                <Link to="/demo/contact" className="link link-hover">Contact</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
            </nav>
        </footer>
    );
};

export default Footer;