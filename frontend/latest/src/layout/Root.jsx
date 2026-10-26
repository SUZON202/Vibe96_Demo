import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Root = () => {
    return (
        <div>
            {/* Header will stay at the very top */}
            <Header />
            
            {/* Other pages will load in the middle (min-h-screen is given so that the footer stays at the very bottom even if content is less) */}
            <div className="min-h-[calc(100vh-288px)]">
                <Outlet />
            </div>

            {/* Footer will stay at the very bottom */}
            <Footer />
        </div>
    );
};

export default Root;