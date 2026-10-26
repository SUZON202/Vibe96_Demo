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
                <Link to="/" className="link link-hover">Home</Link>
                <Link to="/menu" className="link link-hover">Our Menu</Link>
                <Link to="/reservation" className="link link-hover">Book a Table</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Contact Us</h6>
                <p>Buddibalghoria Diarpara, Natore</p>
                <p>Phone: +880 1234 567890</p>
                <p>Email: info@swadgrill.com</p>
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