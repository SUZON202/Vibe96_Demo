import React, { useContext } from 'react';
import { ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../providers/AuthProvider';

const DemoLoginButton = ({ onSuccessRedirect = '/demo/dashboard', onFillCredentials }) => {
    const { signIn } = useContext(AuthContext);

    const isDemoEnabled = import.meta.env.VITE_ENABLE_DEMO === 'true';
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;

    if (!isDemoEnabled || !demoEmail) {
        return null;
    }

    const handleDemoLogin = async () => {
        const toastId = toast.loading('Logging into Demo Account...');
        try {
            const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
            const response = await fetch(`${baseUrl}/api/auth/demo-credentials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Demo login is not available');
            }

            const data = await response.json();
            const emailToUse = data?.email || demoEmail;
            const passwordToUse = data?.password;

            if (!emailToUse || !passwordToUse) {
                throw new Error('Invalid demo credentials response');
            }

            if (typeof onFillCredentials === 'function') {
                onFillCredentials(emailToUse, passwordToUse);
            }

            await signIn(emailToUse, passwordToUse);
            toast.dismiss(toastId);
            toast.success('Demo Login Successful!', { icon: '🚀', duration: 2000 });

            setTimeout(() => {
                window.location.href = onSuccessRedirect;
            }, 500);
        } catch (err) {
            toast.dismiss(toastId);
            console.error(err);
            toast.error('Demo Login is disabled or unavailable.');
        }
    };

    return (
        <>
            <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or</span>
                <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
                type="button"
                onClick={handleDemoLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-orange-500 bg-orange-500/10 py-3.5 text-sm font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white"
            >
                <ShieldCheck size={18} />
                One-Click Admin Demo
            </button>
        </>
    );
};

export default DemoLoginButton;