import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        
        // Fast loading message
        const toastId = toast.loading('Logging in...');

        // Log in via Firebase
        signIn(email, password)
            .then((result) => {
                toast.dismiss(toastId); // Remove loading message
                toast.success('Successfully Logged In!', { duration: 2000 }); // Fast success pop-up
                navigate('/');
            })
            .catch((err) => {
                toast.dismiss(toastId);
                console.error(err);
                toast.error('Login Failed!');
                setError('Invalid email or password. Please try again.');
            });
    };

    const inputClass = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pl-11 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

    return (
        <div className="min-h-[calc(100vh-288px)] bg-[#0a0f1e] flex items-center justify-center p-5 sm:p-10 selection:bg-orange-500 selection:text-white">
            <div className="w-full max-w-md relative">
                {/* Background Glow Effect */}
                <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/10 blur-2xl -z-10" />

                <div className="bg-[#101a2f] rounded-[2rem] border border-white/10 p-7 sm:p-9 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white mb-5 shadow-lg shadow-orange-500/25">
                            <UtensilsCrossed size={28} />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-white tracking-wide">Welcome Back</h1>
                        <p className="text-sm text-gray-400 mt-2">Sign in to your Swad Grill account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@swadgrill.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <a href="#" className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-sm font-bold text-white transition hover:bg-orange-600 mt-6"
                        >
                            Sign In
                            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;