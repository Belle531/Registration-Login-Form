import React, { useState } from 'react';
import { LucideUserPlus } from 'lucide-react';

// Props passed from App.jsx:
// - onRegisterSuccess: function to call when registration works
// - onSwitchToLogin: function to call when user clicks 'Login' link
const RegisterView = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage('');

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Passwords do not match!');
            return;
        }

        if (formData.password.length < 6) {
            setMessage('Error: Password must be at least 6 characters long!');
            return;
        }

        // CAPSTONE PROJECT: Replace this with your AWS Lambda /register API call
        console.log('Attempting to register user:', formData);
        setMessage('Registration successful! Please check your email to verify your account.');

        // Mock success action
        setTimeout(() => {
            onRegisterSuccess();
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            {/* Header (Slate 800) */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <h1 className="text-3xl font-extrabold text-white text-center tracking-wider">
                    Cassandra's Digital Solutions
                </h1>
            </header>

            {/* Authentication Card Container */}
            <div className="mt-20 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                
                {/* --- Register Form Starts Here --- */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                        <LucideUserPlus className="inline w-6 h-6 mr-2" /> Create Account
                    </h2>

                    {message && (
                        <p className={`p-3 rounded-lg text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                            <input 
                                id="firstName" 
                                name="firstName"
                                type="text" 
                                required 
                                value={formData.firstName} 
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                            <input 
                                id="lastName" 
                                name="lastName"
                                type="text" 
                                required 
                                value={formData.lastName} 
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="register-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            id="register-email" 
                            name="email"
                            type="email" 
                            required 
                            value={formData.email} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="register-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            id="register-password" 
                            name="password"
                            type="password" 
                            required 
                            value={formData.password} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <input 
                            id="confirm-password" 
                            name="confirmPassword"
                            type="password" 
                            required 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                        />
                    </div>

                    <button type="submit"
                            className="w-full bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md mt-6">
                        Create Account
                    </button>

                    <p className="text-center text-sm text-slate-600 pt-4">
                        Already have an account? 
                        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}
                           className="font-medium text-amber-600 hover:text-amber-700 ml-1">
                            Sign In
                        </a>
                    </p>
                </form>
                {/* --- Register Form Ends Here --- */}

            </div>
            
            {/* Footer (Slate 800) */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default RegisterView;