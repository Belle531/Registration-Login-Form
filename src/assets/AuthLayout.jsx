import React from 'react';

/**
 * AuthLayout Component
 * Provides a consistent header and footer for the Login and Register views.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content (Login or Register form) to display inside the layout.
 * @param {Function} props.onSwitchToLogin - Function to switch to login view.
 */
const AuthLayout = ({ children, onSwitchToLogin }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            {/* Header (Slate 800) */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between">
                    {/* Spacer to balance the layout */}
                    <div className="flex space-x-2 opacity-0 pointer-events-none">
                        <button className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs">Sign In</button>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider font-sans">
                        Cassandra's Digital Solutions
                    </h1>
                    
                    {/* Header Navigation Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={onSwitchToLogin}
                            className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-md transition-colors text-xs"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </header>

            {/* Content Card Container (Login/Register Forms go here) */}
            <div className="mt-24 mb-20 w-full flex justify-center">
                {children}
            </div>
            
            {/* Footer (Slate 800) */}
            <footer className="w-full bg-slate-800 p-4 shadow-xl fixed bottom-0 left-0">
                <p className="text-gray-300 text-center text-sm font-medium font-sans">
                    &copy; 2025 Cassandra's Digital Solutions. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;