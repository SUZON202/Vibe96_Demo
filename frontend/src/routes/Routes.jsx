import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import DashboardLayout from "../layout/DashboardLayout"; 
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Reservation from "../pages/Reservation";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CartAndCheckout from "../pages/CartAndCheckout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import UpdateProduct from "../pages/UpdateProduct";
import OrderTracking from "../pages/OrderTracking"; 
import ProtectedRoute from "../components/ProtectedRoute"; 
import AdminRoute from "../components/AdminRoute";
import PromoLanding from "../pages/PromoLanding"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <PromoLanding />,
    },
    {
        path: "/demo", 
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "menu",
                element: <Menu />,
            },
            {
                path: "reservation",
                element: <Reservation />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "cart-checkout",
                element: <CartAndCheckout />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "track-order",
                element: <OrderTracking />,
            }
        ],
    },
    {
        // ড্যাশবোর্ডকে একদম সেপারেট এবং সিকিউর পাথ দেওয়া হলো
        path: "/demo/dashboard",
        element: (
            <ProtectedRoute>
                <AdminRoute>
                    <DashboardLayout />
                </AdminRoute>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "", 
                element: <Dashboard />,
            },
            {
                path: "add-product", 
                element: <AddProduct />,
            },
            {
                path: "products", 
                element: <Products />,
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "customers",
                element: <Customers />,
            },
            {
                path: "analytics",
                element: <Analytics />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "update-product/:id", 
                element: <UpdateProduct />,
            },
        ]
    },
]);

export default router;