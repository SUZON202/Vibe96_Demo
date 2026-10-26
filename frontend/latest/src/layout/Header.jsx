import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const Header = () => {
    // Fetching user and logOut function from AuthContext
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    // State to hold cart item count
    const [cartCount, setCartCount] = useState(0);

    // Effect to fetch cart data from LocalStorage in real-time
    useEffect(() => {
        const updateCartCount = () => {
            try {
                const savedCart = localStorage.getItem("swad-grill-cart");
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    // Calculate total items by summing up the qty of all items in cart
                    const totalItems = parsedCart.reduce((sum, item) => sum + item.qty, 0);
                    setCartCount(totalItems);
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error("Error parsing cart data", error);
                setCartCount(0);
            }
        };

        // Check once when the page loads
        updateCartCount();

        // Check every 1 second to show real-time updates
        const interval = setInterval(updateCartCount, 1000);
        
        return () => clearInterval(interval);
    }, []);

    // Function to handle logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully Logged Out!'); // Logout success pop-up
                navigate('/'); // Redirect to home page after logout
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout failed!');
            });
    };

    const navLinks = (
        <>
            <li><Link to="/" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">Home</Link></li>
            <li><Link to="/menu" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">Menu</Link></li>
            <li><Link to="/reservation" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">Reservation</Link></li>
            <li><Link to="/track-order" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">Track Order</Link></li>
            <li><Link to="/about" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">About</Link></li>
            <li><Link to="/contact" className="text-gray-800 hover:text-black hover:bg-yellow-300 transition-all font-medium">Contact</Link></li>
        </>
    );

    return (
        <div className="navbar bg-yellow-400 shadow-md sticky top-0 z-50 px-4 sm:px-7">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    {/* Mobile Menu */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-yellow-400 rounded-box w-52 font-semibold text-gray-900">
                        {navLinks}
                    </ul>
                </div>
                {/* Website Logo / Name */}
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-gray-900 tracking-wide hover:bg-transparent">
                    Swad Grill
                </Link>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                {/* PC Menu */}
                <ul className="menu menu-horizontal px-1 font-semibold gap-1">
                    {navLinks}
                </ul>
            </div>
            
            <div className="navbar-end gap-2">
                {/* Cart Icon */}
                <Link to="/cart-checkout" className="btn btn-ghost btn-circle text-gray-900 hover:bg-yellow-300">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {/* Dynamic cart count is placed here */}
                        <span className="badge badge-sm indicator-item bg-gray-900 text-yellow-400 border-none font-bold">
                            {cartCount}
                        </span>
                    </div>
                </Link>
                
                {/* Conditional Dashboard / Login & Logout Button */}
                {user ? (
                    <>
                        <Link to="/dashboard" className="btn bg-gray-900 text-yellow-400 hover:bg-black border-none shadow-sm">
                            Dashboard
                        </Link>
                        <button onClick={handleLogOut} className="btn bg-red-600 text-white hover:bg-red-700 border-none shadow-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn bg-gray-900 text-yellow-400 hover:bg-black border-none shadow-sm">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;