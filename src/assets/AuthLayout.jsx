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
            {/* Header - Unified style */}
            <header className="w-full bg-slate-800 p-4 shadow-xl fixed top-0 left-0">
                <div className="flex items-center justify-between w-full gap-4">
                    {/* Spacer to help center title with card */}
                    <div style={{ width: '112px' }}></div>
                    {/* Centered Title */}
                    <h1 className="text-3xl font-extrabold text-white text-center tracking-wider flex-1">
                        Cassandra's Digital Solutions
                    </h1>
                    {/* Header Navigation Buttons (far right) */}
                    <div className="flex space-x-2 text-xs sm:text-sm">
                        <button onClick={onSwitchToLogin} className="bg-amber-500 text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Login</button>
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