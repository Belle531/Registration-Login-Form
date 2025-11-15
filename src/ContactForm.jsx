
import React from 'react';

/**
 * ContactForm Component
 * Shows the contact form after successful login
 */
const ContactForm = ({ onGoToDashboard }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between">
                    {/* Spacer to balance the layout */}
                    <div className="flex space-x-2 opacity-0 pointer-events-none">
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Dashboard</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Logout</button>
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Login</button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <h1 className="text-3xl font-extrabold text-white text-center tracking-wider mx-auto">
                            Cassandra's Digital Solutions
                        </h1>
                    </div>
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={onGoToDashboard}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => { localStorage.removeItem('authToken'); window.location.href = '/'; }}
                            className="bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-md transition-colors text-xs"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            {/* Logo Section */}
            <div className="mt-8 mb-8 text-center">
                <div className="relative inline-block">
                    <div className="w-40 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white">
                        <span className="text-white font-bold text-4xl tracking-wider">CDS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 opacity-20 animate-ping"></div>
                </div>
            </div>

                {/* Card removed as requested. */}

            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default ContactForm;