import React, { useState } from 'react';
// import AuthLayout from './assets/AuthLayout.jsx'; // removed duplicate import
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const LoginView = ({
    onLoginSuccess,
    onSwitchToRegister,
    onGoToDashboard,
    onGoToRegister,
   
    handleLogout
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleStandardLogin = async () => {
        setIsLoading(true);
        setMessage('Authenticating with backend API...');
        try {
            const response = await fetch('https://cdsback-backend.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe })
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setMessage(data.message || 'Login successful!');
                if (data.token) localStorage.setItem('authToken', data.token);
                setTimeout(() => { onLoginSuccess(data.user || { email }); }, 1000);
            } else {
                setMessage(data.error || 'Login failed. Please try again.');
            }
        } catch {
            setMessage('Unable to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const handleForgotCredentials = () => {
        setMessage('');
        if (!email) {
            setMessage('Please enter your email address first, then click "Forgot Username or Password?" to receive recovery instructions.');
            return;
        }
        setMessage('Recovery instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your credentials.');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
            {/* Header */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0 z-10">
                <div className="flex items-center w-full gap-4">
                    {/* Centered Title - perfectly aligned with card */}
                    <div className="w-full flex justify-start items-center pl-64">
                        <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-wider text-center mx-auto w-full">
                            Cassandra's Digital Solutions
                        </h1>
                    </div>
                    {/* Header Navigation Buttons*/}
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={onGoToDashboard} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Dashboard</button>
                        <button onClick={handleLogout} className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors">Logout</button>
                        <button onClick={onGoToRegister} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center p-4 pt-24 pb-20 fade-in">
                {/* Logo Section */}
                <div className="mb-8 text-center">
                    <div className="relative inline-block">
                        <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                            <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                    </div>
                </div>
                {/* Login Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                    <form onSubmit={e => { e.preventDefault(); handleStandardLogin(); }} className="space-y-4">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-slate-800">Login</h2>
                        </div>
                        {message && (
                            <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</p>
                        )}
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email or Username</label>
                            <input id="login-email" type="text" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500" placeholder="Enter your email or username" />
                        </div>
                        <div className="relative">
                            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input id="login-password" type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500" placeholder="Enter your password" />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2" />
                                <span className="ml-2 text-sm text-slate-600">Remember Me</span>
                            </label>
                            <a href="#" onClick={e => { e.preventDefault(); handleForgotCredentials(); }} className="text-sm text-amber-600 hover:text-amber-700 hover:underline font-medium">Forgot Username or Password?</a>
                        </div>
                        <div className="mt-6">
                            <button type="submit" disabled={isLoading} className="bg-slate-700 text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 active:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 shadow-md flex items-center justify-center w-full">{isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}{isLoading ? 'Authenticating...' : 'Login'}</button>
                        </div>
                        <p className="text-center text-sm text-slate-600 pt-4">Don't have an account?<a href="#" onClick={e => { e.preventDefault(); onSwitchToRegister(); }} className="font-medium text-amber-600 hover:text-amber-700 ml-1">Register</a></p>
                    </form>
                </div>
            </main>
        {/* Footer */}
        <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0 z-10">
            <p className="text-gray-300 text-center text-sm font-medium font-sans">
                &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
            </p>
        </footer>
    </div>
    );
}

export default LoginView;