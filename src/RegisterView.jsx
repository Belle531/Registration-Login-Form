import React, { useState } from 'react';
import { LucideUserPlus } from 'lucide-react';
import AuthLayout from './assets/AuthLayout.jsx';

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
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setMessage('Error: Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setMessage('Error: Password must be at least 6 characters long');
            return;
        }

        // CAPSTONE PROJECT: Replace this with your AWS Lambda /register API call
        console.log('Attempting to register user:', formData);
        setMessage('Registration successful! Please check your email for verification.');

        // Mock success action
        setTimeout(() => {
            onRegisterSuccess();
        }, 1500);
    };

    return (
        <AuthLayout>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
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
                                placeholder="First name"
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
                                placeholder="Last name"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input 
                            id="email" 
                            name="email"
                            type="email" 
                            required 
                            value={formData.email} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            id="password" 
                            name="password"
                            type="password" 
                            required 
                            value={formData.password} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder="Create a password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password" 
                            required 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                            placeholder="Confirm your password"
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
            </div>
        </AuthLayout>
    );
};

export default RegisterView;