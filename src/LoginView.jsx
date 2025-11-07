import React, { useState } from 'react';
import { LucideLogIn } from 'lucide-react';
import AuthLayout from './assets/AuthLayout.jsx';

const LoginView = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (!email || !password) {
            setMessage('Error: Please fill in all fields');
            return;
        }

        // CAPSTONE PROJECT: Replace this with your AWS Lambda /login API call
        console.log('Attempting to log in user:', { email, password });
        setMessage('Login successful! Redirecting to dashboard...');

        // Mock success action
        setTimeout(() => {
            onLoginSuccess();
        }, 1000);
    };

    return (
        <AuthLayout>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-gray-100">
                <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                        <LucideLogIn className="inline w-6 h-6 mr-2" /> Account Login
                    </h2>

                    {message && (
                        <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </p>
                    )}
                    
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            id="login-email" 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">Password</label>
                            <a href="#" onClick={(e) => { e.preventDefault(); alert('Forgot Password functionality coming soon!'); }}
                               className="text-sm text-slate-500 hover:text-amber-600">
                                Forgot Password?
                            </a>
                        </div>
                        <input 
                            id="login-password" 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit"
                            className="w-full bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md mt-6">
                        Log In
                    </button>

                    <p className="text-center text-sm text-slate-600 pt-4">
                        Don't have an account? 
                        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}
                           className="font-medium text-amber-600 hover:text-amber-700 ml-1">
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default LoginView;